import mongooes from "mongoose";

let connected = false;

const connectDB = async () => {
  mongooes.set("strictQuery", true);

  //If the database is already connected
  if (connected) {
    console.log("Database is already connected");
    return;
  }

  //If not connected, then connect to the database
  try {
    await mongooes.connect(process.env.MONGODB_URI);
    connected = true;
  } catch (error) {
    console.log("Error connecting to database:", error);
  }
};

export default connectDB;
