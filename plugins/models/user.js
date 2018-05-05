"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    confirmation: {
        required: true,
        type: Number,
    },
    contact: String,
    email: {
        required: true,
        type: String,
        set(value) {
            return value.trim().toLowerCase();
        },
        validate: [
            (email) => {
                return (email.match(/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i) != null);
            },
            'Invalid email',
        ],
    },
    lastname: {
        required: true,
        type: String,
    },
    name: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    role: {
        required: true,
        type: Number,
    },
    username: {
        required: true,
        type: String,
    },
    verification: {
        required: true,
        type: Boolean,
    },
});
exports.User = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=user.js.map