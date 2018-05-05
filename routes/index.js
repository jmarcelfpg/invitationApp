"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const user = __importStar(require("./user"));
exports.User = user;
exports.board = (req, res, next) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'public', 'board.html'));
};
exports.admin = (req, res, next) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'public', 'admin.html'));
};
exports.profile = (req, res, next) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'public', 'profile.html'));
};
exports.resetPass = (req, res, next) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'public', 'resetPass.html'));
};
exports.registered = (req, res, next) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'public', 'registered.html'));
};
exports.register = (req, res, next) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'public', 'register.html'));
};
exports.registerAdmin = (req, res, next) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'public', 'registerAdmin.html'));
};
//# sourceMappingURL=index.js.map