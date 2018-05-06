import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    confirmation: {
        required: true,
        type: Number,
    },
    contact: String,
    email: {
        required: true,
        type: String,
        set(value: string) {
            return value.trim().toLowerCase();
        },
        validate: [
            (email) => {
                return (email.match(
                    /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i
                ) != null);
            },
            'Invalid email',
        ],
    },
    lastname: {
        required: true,
        type: String,
    },
    name: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    role: {
        required: true,
        type: Number,
    },
    username: {
        required: true,
        type: String,
    },
    verification: {
        required: true,
        type: Boolean,
    },
});

interface IUserDocument extends mongoose.Document {
    email: string;
    role: string;
    password: boolean;
    verification: boolean;
    usernama: string;
    name: string;
    lastname: string;
    contact?: string;
}
type UserModel = mongoose.Model<IUserDocument>;

export const User: UserModel = mongoose.model<IUserDocument, UserModel>('User', userSchema);
