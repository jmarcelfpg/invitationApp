"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const user_1 = __importDefault(require("../../models/user"));
function default_1() {
    passport_1.default.use(new passport_local_1.Strategy(function (username, password, done) {
        user_1.default.findOne({ username: username })
            .then((user) => {
            user
                ? user.authenticate(password)
                    ? done(null, user)
                    : done(null, false, { message: 'Invalid password' })
                : done(null, false, { message: 'Unknown user' });
        });
    }));
}
exports.default = default_1;
//# sourceMappingURL=local.js.map