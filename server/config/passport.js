"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const user_1 = __importDefault(require("../models/user"));
const local_1 = __importDefault(require("./strategies/local"));
function default_1() {
    return __awaiter(this, void 0, void 0, function* () {
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
        return true;
    });
}
exports.default = default_1;
//# sourceMappingURL=passport.js.map