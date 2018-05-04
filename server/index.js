"use strict";
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
const http_1 = __importDefault(require("http"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const mongoose = __importStar(require("mongoose"));
const passport = __importStar(require("passport"));
// import mongoService from './config/mongoose';
const express_2 = __importDefault(require("./config/express"));
const passport_1 = __importDefault(require("./config/passport"));
Promise.all([
    express_2.default,
    passport_1.default,
])
    .then((resolutions) => {
    if (resolutions.length) {
        console.log('App up and running');
    }
});
const app = express_1.default();
exports.app = app;
// passport.use(userStrategy);
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(morgan_1.default('dev'));
app.set('port', (process.env.PORT || 3000));
// mongoose
mongoose.Promise = global.Promise;
const connection = mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });
const server = http_1.default.createServer(app);
connection
    .then(() => {
    console.log('Connected to MongoDB');
    server.listen(app.get('port'), () => {
        console.log('Express listening on port ' + app.get('port'));
    });
})
    .catch((e) => {
    console.log('connection error:');
});
//# sourceMappingURL=index.js.map