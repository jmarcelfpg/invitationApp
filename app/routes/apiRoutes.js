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
function setAPIRoutes(app, passport, transporter) {
    const api = express.Router();
    const userController = new userController_1.default();
    // Set up the 'board' routes
    api.route('/board')
        .get(userController.renderBoard);
    // Set up the 'profile' routes
    api.route('/profile')
        .get(userController.renderProfile);
    // Set up the 'admin' routes
    api.route('/admin')
        .get(userController.renderAdmin);
    // Set up the 'signupAdmin' routes
    api.route('/signupAdmin')
        .get(userController.renderSignupAdmin);
    // Set up the 'signup' routes
    api.route('/signup')
        .get(userController.renderSignup)
        .post(userController.signup(transporter));
    // Set up the 'signup' routes
    api.route('/forgotPass')
        .get(userController.renderforgotPass)
        .post(userController.forgotPass(transporter));
    // Set up the 'signin' routes
    api.route('/signin')
        .get(userController.renderSignin)
        .post(passport.authenticate('local', {
        failureFlash: true,
        failureRedirect: '/signin',
        successRedirect: '/board',
    }));
    api.route('/confirmation')
        .get(userController.getConfirmation)
        .put(userController.setConfirmation);
    api.route('/addfee')
        .put(userController.addFee);
    // Set up the 'signout' route
    api.get('/signout', userController.signout);
    // Request for info
    // Set up the 'role' routes
    api.route('/role').get(userController.sendRole);
    // Set up the 'users' routes
    api.route('/users').get(userController.sendUsers);
    // Init the app
    api.route('*')
        .get(passport.authenticate('local', {
        failureFlash: true,
        failureRedirect: '/signin',
        successRedirect: '/board',
    }));
    // avoid api extra folder for resources
    app.use('/', express.static('public'));
    // Apply the routes to our application with the prefix /api
    app.use('/', api);
}
exports.default = setAPIRoutes;
//# sourceMappingURL=apiRoutes.js.map