"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_hbs_1 = __importDefault(require("express-hbs"));
function default_1() {
    express_hbs_1.default.registerHelper('list', function (context, options) {
        let ret = '<ul class="navigator">';
        for (let i = 0, j = context.length; i < j; i++) {
            ret = ret + options.fn(context[i]);
        }
        return ret + '</ul>';
    });
}
exports.default = default_1;
//# sourceMappingURL=handlebars.js.map