"use server";

import User from "@/databases/user.model";
import { connectToDatabase } from "./mongoose";

export async function getUserById(params: any) {
  await connectToDatabase();
  try {
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log("user.action.ts: getUserById: error: ", error);
  }
}
