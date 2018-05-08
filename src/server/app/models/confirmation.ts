import { Document, model, Model, Schema, SchemaDefinition } from 'mongoose';
const { ObjectId, Number, String } = Schema.Types;

type ConfirmationType = Base.Versionable<{}>;
export const confirmationSchema: ConfirmationType = {
    current: new Schema({
        status: Number,
        feedback: String,
    }),
    previous: [{
        status: Number, feedback: String
    }]
};
const ConfirmationSchema = new Schema(
    (confirmationSchema as ConfirmationType),
    { _id: false, timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

export type ConfirmationDocumentType = Versionable<Model.IConfirmation> & Document;
interface ConfirmationSchemaMethods { }
type ConfirmationSchemaType = ConfirmationDocumentType & ConfirmationSchemaMethods;
type ConfirmationModelType = Model<ConfirmationSchemaType>;
const Confirmation: ConfirmationModelType = model<ConfirmationSchemaType, ConfirmationModelType>('Confirmation', ConfirmationSchema);
export default Confirmation;
