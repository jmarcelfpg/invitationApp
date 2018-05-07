import { Document, model, Model, Schema, SchemaDefinition } from 'mongoose';
import { prependListener } from 'cluster';
const { ObjectId, Date, Number, String } = Schema.Types;

type FeeType = { total: any } & Base.Versionable<{}>;
export const feeSchema: FeeType = {
    total: Number,
    current: new Schema({
        ammout: Number,
        date: Date
    }),
    previous: [{
        ammout: Number,
        date: Date
    }]
};
const FeeSchema = new Schema(
    (feeSchema as FeeType),
    { _id: false, timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

export type FeeDocumentType = { total: number } & Versionable<Model.IFee> & Document;
interface FeeSchemaMethods { }
type FeeSchemaType = FeeDocumentType & FeeSchemaMethods;
type FeeModelType = Model<FeeSchemaType>;

const Fee: FeeModelType = model<FeeSchemaType, FeeModelType>('Fee', FeeSchema);

export default Fee;
