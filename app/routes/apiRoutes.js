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
const express = __importStar(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const passport = __importStar(require("passport"));
function setAPIRoutes(app) {
    const api = express.Router();
    const userController = new userController_1.default();
    // Set up the 'signup' routes 
    api.route('/signup')
        .get(userController.renderSignup)
        .post(userController.signup);
    // Set up the 'signin' routes 
    api.route('/signin')
        .get(userController.renderSignin)
        .post(passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/signin',
        failureFlash: true
    }));
    // Set up the 'signout' route
    api.get('/signout', userController.signout);
    // Apply the routes to our application with the prefix /api
    app.use('/api', api);
}
exports.default = setAPIRoutes;
//# sourceMappingURL=apiRoutes.js.map