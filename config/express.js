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
const compression_1 = __importDefault(require("compression"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const express_1 = __importDefault(require("express"));
const express_hbs_1 = __importDefault(require("express-hbs"));
const express_session_1 = __importDefault(require("express-session"));
const morgan_1 = __importDefault(require("morgan"));
const passport_1 = __importDefault(require("passport"));
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
            app.set('port', (process.env.PORT || 3000));
            // configure the view engine
            app.engine('hbs', express_hbs_1.default.express4({
                // defaultLayout: path.join(__dirname, 'views', 'layouts', 'default.hbs'),
                layoutsDir: path_1.default.join(__dirname, '..', 'public', 'views', 'layouts'),
                partialsDir: path_1.default.join(__dirname, '..', 'public', 'views', 'partials'),
            }));
            // set the view engine
            app.set('view engine', 'hbs');
            // configure views path
            app.set('views', path_1.default.join(__dirname, '..', 'public', 'views'));
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
            return app;
        }
        catch (_a) {
            throw new Error('error in the Express configuration');
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=express.js.map