"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
app.set('port', process.env.PORT || 3000);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/logout', (req, res, next) => { res.sendFile(path_1.default.join(__dirname, 'public', 'index.html')); });
app.get('/users', (req, res, next) => {
    res.send([{ name: 'Ronaldo', lastname: 'Perez', confirmation: 1, fee: 500 }]);
});
app.get('/role', (req, res, next) => {
    res.send('admin');
});
app.get('/confirmation', (req, res, next) => {
    res.send('0').status(200);
});
app.get('/board', (req, res, next) => { res.sendFile(path_1.default.join(__dirname, 'public', 'board.html')); });
app.get('/admin', (req, res, next) => { res.sendFile(path_1.default.join(__dirname, 'public', 'admin.html')); });
app.get('/profile', (req, res, next) => { res.sendFile(path_1.default.join(__dirname, 'public', 'profile.html')); });
app.get('/resetPass', (req, res, next) => { res.sendFile(path_1.default.join(__dirname, 'public', 'resetPass.html')); });
app.get('/registered', (req, res, next) => { res.sendFile(path_1.default.join(__dirname, 'public', 'registered.html')); });
app.get('/register', (req, res, next) => { res.sendFile(path_1.default.join(__dirname, 'public', 'register.html')); });
app.post('/register', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const lastName = req.body.lastName;
    const contact = req.body.contact;
    const confirmation = req.body.confirmation;
    console.log(email);
    console.log(password);
    console.log(name);
    console.log(lastName);
    console.log(contact);
    console.log(confirmation);
    res.send('Hi').status(200);
});
app.post('/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    console.log(password);
    res.send('Hi').status(200);
});
app.post('/confirmation', (req, res, next) => {
    const confirmation = req.body.confirmation;
    console.log(confirmation);
    res.send(confirmation).status(200);
});
app.use('*', (req, res, next) => { res.sendFile(path_1.default.join(__dirname, 'public', 'index.html')); });
// Catching all the routes
app.all('*', (req, res) => {
    res.status(404).send();
});
const serverHTTP = http_1.default.createServer(app);
serverHTTP.listen(app.get('port'), () => { console.log('server running on port ', app.get('port')); });
//# sourceMappingURL=index.js.map