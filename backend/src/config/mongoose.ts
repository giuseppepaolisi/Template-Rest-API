import { connect, set } from 'mongoose';

const MONGO_DB_URI = process.env.MONGO_DB_URI;

if (!MONGO_DB_URI) {
  throw new Error('MONGO_DB_URI is not defined');
}

// connection to db
export const connectToDB = async () => {
  try {
    set('strictQuery', false);
    const db = await connect(MONGO_DB_URI);
    console.log('MongoDB connected to', db.connection.name);
    // Emit an event when the connection is successful
  } catch (error) {
    console.error(error);
    // Emit an event when there's an error
  }
};
