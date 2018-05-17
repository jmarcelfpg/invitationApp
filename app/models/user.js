"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const { ObjectId, String, Number } = mongoose_1.Schema.Types;
const crypto_1 = __importDefault(require("crypto"));
const confirmation_1 = require("./confirmation");
const fee_1 = require("./fee");
const userSchema = {
    comments: String,
    confirmation: confirmation_1.confirmationSchema,
    email: { type: String, unique: true, lowercase: true, trim: true },
    fee: fee_1.feeSchema,
    firstName: { type: String, trim: true },
    isNewer: Boolean,
    lastName: { type: String, trim: true },
    password: String,
    phone: { type: String, lowercase: true },
    provider: String,
    role: { type: Number, trim: true },
    salt: String,
    username: { type: String, unique: true, trim: true },
    visits: Number,
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
    if (this.isNewer && this.password) {
        this.salt = new Buffer(crypto_1.default.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
        this.isNewer = false;
    }
    next();
});
UserSchema.methods.hashPassword = function (password) {
    return crypto_1.default.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
};
UserSchema.methods.authenticate = function (password) {
    const result = this.password === this.hashPassword(password);
    return result;
};
UserSchema.set('toJSON', {
    getters: true,
    virtuals: true,
});
const User = mongoose_1.model('User', UserSchema);
exports.default = User;
//# sourceMappingURL=user.js.map