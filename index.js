"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
app.set('port', process.env.PORT || 3000);
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/board', (req, res, next) => { res.sendFile(path_1.default.join(__dirname, 'public', 'board.html')); });
app.use('/resetPass', (req, res, next) => { res.sendFile(path_1.default.join(__dirname, 'public', 'resetPass.html')); });
app.use('/register', (req, res, next) => { res.sendFile(path_1.default.join(__dirname, 'public', 'register.html')); });
app.use('*', (req, res, next) => { res.sendFile(path_1.default.join(__dirname, 'public', 'index.html')); });
// Catching all the routes
app.all('*', (req, res) => {
    res.status(404).send();
});
const serverHTTP = http_1.default.createServer(app);
serverHTTP.listen(app.get('port'), () => { console.log('server running on port ', app.get('port')); });
//# sourceMappingURL=index.js.map