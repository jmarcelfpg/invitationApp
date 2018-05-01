"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('*', (req, res, next) => { res.sendFile(path_1.default.join(__dirname, 'public', 'index.html')); });
const serverHTTP = http_1.default.createServer(app);
serverHTTP.listen(3000, () => { console.log('server running on port 3000'); });
//# sourceMappingURL=index.js.map