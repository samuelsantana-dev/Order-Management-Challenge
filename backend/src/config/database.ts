import mongoose from 'mongoose';

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

export const connectDatabase = async () => {
    try {
        const dbConection = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.mbtm2bs.mongodb.net/`);
        console.log('MongoDB connected: ', dbConection.connection.host);
        return dbConection;
    } catch (error) {
        console.error('Error connecting to MongoDB: ', error);
    }
}