"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const confirmation_1 = __importDefault(require("../models/confirmation"));
const abstractController_1 = __importDefault(require("./abstractController"));
class ConfirmationController extends abstractController_1.default {
    constructor() {
        super(...arguments);
        this.model = confirmation_1.default;
    }
}
exports.default = ConfirmationController;
//# sourceMappingURL=confirmationController.js.map