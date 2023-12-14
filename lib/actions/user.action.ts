"use server";

import User from "@/databases/user.model";
import Question from "@/databases/question.modal";
import { connectToDatabase } from "./mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetUserByIdParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
// If the event is user.created, create the user in the database
export async function getUserById(params: GetUserByIdParams) {
  try {
    await connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log("user.action.ts: getUserById: error: ", error);
  }
}
// If the event is user.created, create the user in the database
export async function createUser(userData: CreateUserParams) {
  try {
    await connectToDatabase();
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log("user.action.ts: getUserById: error: ", error);
  }
}

// If the event is user.updated, update the user in the database
export async function updateUser(params: UpdateUserParams) {
  try {
    await connectToDatabase();
    const { clerkId, updateData, path } = params;
    await User.findOneAndUpdate(
      {
        clerkId,
      },
      updateData,
      {
        new: true,
      }
    );
    revalidatePath(path);
  } catch (error) {
    console.log("user.action.ts: getUserById: error: ", error);
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    await connectToDatabase();
    const { clerkId } = params;
    const user = await User.findOneAndUpdate({
      clerkId,
    });

    if (!user) {
      console.error("user.action.ts: deleteUser: error: ");
    }
    //Delete user from database
    //and questions,answers, comments,etc
    const userQuestionIds = await Question.find({ author: user._id }).distinct(
      "_id"
    );
    //delete all questions
    await Question.deleteMany({ author: user._id });
    //TOdo delete user answers comments etc
    const deletedUser = await User.findByIdAndDelete(user._id);
    return deletedUser;
  } catch (error) {
    console.log("user.action.ts: getUserById: error: ", error);
  }
}
