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
// Server Modules
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const models_1 = require("./plugins/models");
const routes = __importStar(require("./routes"));
// Middleware modules
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorhandler_1 = __importDefault(require("errorhandler"));
const express_session_1 = __importDefault(require("express-session"));
const method_override_1 = __importDefault(require("method-override"));
const morgan_1 = __importDefault(require("morgan"));
// Database environment
mongoose_1.default.Promise = global.Promise;
const dbUrl = process.env.MONGOHQ_URL || 'mongodb://@localhost:27017/invitationapp';
const db = mongoose_1.default.connect(dbUrl);
const app = express_1.default();
app.locals.appTitle = 'uaglia8830';
// Using middlewares for database
app.use((req, res, next) => {
    if (!models_1.User) {
        return next(new Error('No models.'));
    }
    return next();
});
// Configuration of the server
app.set('appName', 'uaglila8830');
app.set('port', process.env.PORT || 3000);
// Using Middlewares
app.use(morgan_1.default('dev'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(method_override_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(cookie_parser_1.default('3CCC4ACD-6ED1-4844-9217-82131BDCB239'));
app.use(express_session_1.default({
    resave: true,
    saveUninitialized: true,
    secret: '2C44774A-D649-4D44-9535-46E296EF984F',
}));
// Authentication middleware
app.use((req, res, next) => {
    if (req.session && req.session.role === 'admin') {
        res.locals.role = 'admin';
    }
    next();
});
// Authorization
const authorize = (req, res, next) => {
    if (req.session && req.session.role) {
        return next();
    }
    else {
        return res.send(401);
    }
};
const authorizeAdmin = (req, res, next) => {
    if (req.session && req.session.role === 'admin') {
        return next();
    }
    else {
        return res.send(401);
    }
};
if (app.get('env') === 'development') {
    app.use(errorhandler_1.default());
}
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.get('/logout', routes.User.logout);
app.get('/', routes.board);
app.get('/admin', authorizeAdmin, routes.admin);
app.get('/profile', authorize, routes.profile);
app.get('/resetPass', routes.resetPass);
app.get('/registered', routes.registered);
app.get('/signup', routes.signup);
app.get('/registeradmin', routes.registerAdmin);
// Rest routes
app.post('/register', routes.User.register);
app.post('/login', routes.User.authenticate);
app.post('/resetPass', (req, res, next) => {
    const email = req.body.email;
    console.log(email);
    /* transporter.sendMail({
        subject: 'Message',
        text: `reset password Email`,
        to: email,
    }); */
    res.send(true).status(200);
});
app.get('/users', (req, res, next) => {
    res.send([{ name: 'Ronaldo', lastname: 'Perez', confirmation: 1, fee: 500 }]);
});
app.get('/role', (req, res, next) => {
    res.send('user');
});
app.get('/confirmation', (req, res, next) => {
    res.send('0').status(200);
});
app.post('/confirmation', (req, res, next) => {
    const confirmation = req.body.confirmation;
    console.log(confirmation);
    res.send(confirmation).status(200);
});
app.use('*', (req, res, next) => { res.sendFile(path_1.default.join(__dirname, 'public', 'signin.html')); });
// Catching all the routes
app.all('*', (req, res) => {
    res.status(404).send();
});
const serverHTTP = http_1.default.createServer(app);
serverHTTP.listen(app.get('port'), () => { console.log('server running on port ', app.get('port')); });
//# sourceMappingURL=indexdev.js.map