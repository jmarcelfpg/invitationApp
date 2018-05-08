import { Document, model, Model, Schema } from 'mongoose';
import * as passport from 'passport';
const { ObjectId } = Schema.Types;
import crypto from 'crypto';
import async from './../../config/express';

type UserType = Base.IUser & { salt: any };
const userSchema: UserType = {
    comments: String,
    // confirmation: { type: ObjectId, ref: "Confirmation" },
    confirmation: { type: Number },
    email: { type: String, unique: true, lowercase: true, trim: true },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    password: String,
    phone: { type: String, lowercase: true },
    provider: String,
    role: { type: Number, trim: true },
    salt: String,
    username: { type: String, unique: true, trim: true },
    visits: Number,
};
const UserSchema = new Schema(
    (userSchema as UserType),
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

UserSchema.virtual('fullName')
    .get(function (this: UserType) { return this.firstName + ' ' + this.lastName; })
    .set(function (this: UserType, fullName: string) {
        const splitName = fullName.split(' ');
        this.firstName = splitName[0] || '';
        this.lastName = splitName[1] || '';
    });
UserSchema.pre<UserSchemaType>('save', function (next) {
    if (this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        debugger;
        this.password = this.hashPassword(this.password);
    }
    next();
});

UserSchema.methods.hashPassword = function (password: string) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
};
UserSchema.methods.authenticate = function (password: string) {
    return this.password === this.hashPassword(password);
};

UserSchema.set('toJSON', {
    getters: true,
    virtuals: true,
});

interface UserSchemaMethods {
    findOne(query: any): Promise<this>;
    findByUserName(username: string): boolean;
    hashPassword(password: string): string;
    authenticate(password: string): boolean;
}
export type UserDocumentType = UserType & Document;
type UserSchemaType = UserDocumentType & UserSchemaMethods;
type UserModelType = Model<UserSchemaType>;

export const User: UserModelType = model<UserSchemaType, UserModelType>('User', UserSchema);
export default User;
