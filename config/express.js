"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = __importStar(require("body-parser"));
<<<<<<< HEAD
const morgan_1 = __importDefault(require("morgan"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const compression_1 = __importDefault(require("compression"));
const express_session_1 = __importDefault(require("express-session"));
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
function default_1() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = express_1.default();
        if (process.env.NODE_ENV === 'development') {
            app.use(morgan_1.default('dev'));
        }
        else if (process.env.NODE_ENV === 'production') {
            app.use(compression_1.default());
        }
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(express_session_1.default({
            saveUninitialized: true,
            resave: true,
            secret: "config.sessionSecret"
        }));
        app.use(passport_1.default.initialize());
        app.use(passport_1.default.session());
        app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
        app.set('port', (process.env.PORT || 3000));
        const server = http_1.default.createServer(app);
        app.use('*', (req, res, next) => {
            res.sendFile(path_1.default.join(__dirname, 'public', 'index.html'));
        });
        console.log('Starting Express Server');
        server.listen(app.get('port'), () => {
            console.log('Express listening on port ' + app.get('port'));
        });
        return server;
    });
}
exports.default = default_1;
;
=======
const compression_1 = __importDefault(require("compression"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const morgan_1 = __importDefault(require("morgan"));
const passport_1 = __importDefault(require("passport"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const path_1 = __importDefault(require("path"));
function default_1() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const app = express_1.default();
            if (process.env.NODE_ENV === 'development') {
                app.use(morgan_1.default('dev'));
            }
            else if (process.env.NODE_ENV === 'production') {
                app.use(compression_1.default());
            }
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use(bodyParser.json());
            app.use(express_session_1.default({
                resave: true,
                saveUninitialized: true,
                secret: 'config.sessionSecret',
            }));
            app.use(connect_flash_1.default());
            app.use(passport_1.default.initialize());
            app.use(passport_1.default.session());
            app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
            app.set('port', (process.env.PORT || 3000));
            app.get('/board', (req, res, next) => {
                res.sendFile(path_1.default.join(__dirname, '..', 'public', 'board.html'));
            });
            app.get('/resetPass', (req, res, next) => {
                res.sendFile(path_1.default.join(__dirname, '..', 'public', 'resetPass.html'));
            });
            app.get('/register', (req, res, next) => {
                res.sendFile(path_1.default.join(__dirname, '..', 'public', 'register.html'));
            });
            app.post('/register', (req, res, next) => {
                const { email, password, name, lastName, contact, confirmation } = req.body;
                console.log(JSON.stringify(req.body));
                res.status(200).send('Hi');
            });
            app.post('/login', (req, res, next) => {
                const { email, password } = req.body;
                console.log(email, password);
                res.send('Hi').status(200);
            });
            app.use('*', (req, res, next) => {
                res.sendFile(path_1.default.join(__dirname, '..', 'public', 'index.html'));
            });
            return app;
        }
        catch (_a) {
            throw new Error("error in the Express configuration");
        }
    });
}
exports.default = default_1;
>>>>>>> isaac
//# sourceMappingURL=express.js.map