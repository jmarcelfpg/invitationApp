"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const { ObjectId } = mongoose_1.Schema.Types;
const crypto_1 = __importDefault(require("crypto"));
const userSchema = {
    username: { type: String, unique: true, trim: true },
    email: { type: String, unique: true, lowercase: true, trim: true },
    comments: String,
    confirmation: { type: ObjectId, ref: "Confirmation" },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    password: String,
    phone: { type: String, lowercase: true },
    role: { type: Number, trim: true },
    salt: String,
    visits: Number,
    provider: String
};
const UserSchema = new mongoose_1.Schema(userSchema, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });
UserSchema.virtual('fullName')
    .get(function () { return this.firstName + ' ' + this.lastName; })
    .set(function (fullName) {
    const splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});
UserSchema.pre('save', function (next) {
    if (this.password) {
        this.salt = new Buffer(crypto_1.default.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});
UserSchema.methods.hashPassword = function (password) {
    return crypto_1.default.pbkdf2Sync(password, this.salt, 10000, 64, 'digest').toString('base64');
};
UserSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
};
UserSchema.set('toJSON', {
    getters: true,
    virtuals: true,
});
exports.User = mongoose_1.model('User', UserSchema);
exports.default = exports.User;
//# sourceMappingURL=user.js.map