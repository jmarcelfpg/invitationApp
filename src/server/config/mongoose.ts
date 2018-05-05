import mongoose from 'mongoose';

export default async function() {// mongoose
    (mongoose as any).Promise = global.Promise;
    const connection = mongoose.connect(
        (process.env.MONGODB_URI as string),
        { useMongoClient: true },
    );

    connection
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((e) => {
        console.log('connection error:');
    });

    return true;
}
