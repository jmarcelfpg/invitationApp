"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const { ObjectId, Number, String } = mongoose_1.Schema.Types;
exports.confirmationSchema = {
    current: new mongoose_1.Schema({
        feedback: String,
        status: Number,
    }),
    previous: [{
            feedback: String,
            status: Number,
        }],
};
const ConfirmationSchema = new mongoose_1.Schema(exports.confirmationSchema, { _id: false, timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });
const Confirmation = mongoose_1.model('Confirmation', ConfirmationSchema);
exports.default = Confirmation;
//# sourceMappingURL=confirmation.js.map