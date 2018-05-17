"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const { ObjectId, Date, Number, String } = mongoose_1.Schema.Types;
exports.feeSchema = {
    total: Number,
    current: new mongoose_1.Schema({
        ammout: Number,
        date: Date
    }),
    previous: [{
            ammout: Number,
            date: Date
        }]
};
const FeeSchema = new mongoose_1.Schema(exports.feeSchema, { _id: false, timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });
const Fee = mongoose_1.model('Fee', FeeSchema);
exports.default = Fee;
//# sourceMappingURL=fee.js.map