// write code for mongoose that connects to the mongodb database
import mongoose from "mongoose";

let isConnected: boolean = false;
export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URI) {
    return console.log("MISSING MONGODB_URL");
  }
  if (isConnected) {
    return console.log("ALREADY CONNECTED");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "santo-developer-media",
    });
    isConnected = true;
  } catch (error: any) {
    console.log(error.message);
  }
};
