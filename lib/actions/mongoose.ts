// import mongoose from "mongoose";

// let isConnected: boolean = false;
// export const connectToDatabase = async () => {
//   mongoose.set("strictQuery", true);
//   if (!process.env.NEXT_PUBLIC_MONGODB_URI) {
//     return console.log("MISSING MONGODB_URL");
//   }
//   if (isConnected) {
//     return console.log("ALREADY CONNECTED");
//   }
//   try {
//     await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI, {
//       dbName: "santo-developer-media",
//     });
//     isConnected = true;
//   } catch (error: any) {
//     console.log(error.message);
//   }
// };
