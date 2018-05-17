"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const user_1 = __importDefault(require("../app/models/user"));
const local_1 = __importDefault(require("./strategies/local"));
function default_1() {
    passport_1.default.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport_1.default.deserializeUser((id, done) => {
        user_1.default.findOne({
            _id: id,
        }, '-password -salt', (err, user) => {
            if (user) {
                done(err, user);
            }
        });
    });
    local_1.default();
    return passport_1.default;
}
exports.default = default_1;
//# sourceMappingURL=passport.js.map