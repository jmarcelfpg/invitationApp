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
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("./config/mongoose"));
const express_1 = __importDefault(require("./config/express"));
const passport_1 = __importDefault(require("./config/passport"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env' });
(() => __awaiter(this, void 0, void 0, function* () {
    const db = yield mongoose_1.default();
    const app = yield express_1.default();
    passport_1.default();
    console.log('Starting Express Server');
    http_1.default.createServer(app)
        .listen(app.get('port'), () => {
        console.log('Express listening on port ' + app.get('port'));
    });
}))()
    .catch(console.error);
//# sourceMappingURL=index.js.map