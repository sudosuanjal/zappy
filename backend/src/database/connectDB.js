import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("connected to database. you are good to go!");
    return mongoose.connection;
  } catch (error) {
    console.log("error while connecting to database: " + error);
    throw error;
  }
}
