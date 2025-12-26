import mongoose from 'mongoose';

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

// `mongodb+srv://samuelsantanadesenvolvedor_db_user:9uYGAg54cZ25nFt5@cluster0.mbtm2bs.mongodb.net/`
export const connectDatabase = async () => {
    try {
        const dbConection = await mongoose.connect(`mongodb+srv://samuelsantanadesenvolvedor_db_user:9uYGAg54cZ25nFt5@cluster0.mbtm2bs.mongodb.net/`);
        console.log('MongoDB connected: ', dbConection.connection.host);
        return dbConection;
    } catch (error) {
        console.error('Error connecting to MongoDB: ', error);
    }
}