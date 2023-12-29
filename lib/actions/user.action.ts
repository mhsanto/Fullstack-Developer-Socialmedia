"use server";
import { FilterQuery } from "mongoose";
import User from "@/databases/user.model";
import Question from "@/databases/question.modal";
import { connectToDatabase } from "./mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Tag from "@/databases/tag.model";
import Answer from "@/databases/answer.modal";
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
//get all users
export async function getAllUsers(params: GetAllUsersParams) {
  try {
    await connectToDatabase();
    // const { page = 1, pageSize = 20, filter, searchQuery } = params;
    const users = await User.find({}).sort({ createdAt: -1 });
    return { users };
  } catch (error) {
    console.log("user.action .ts: getUserById: error: ", error);
  }
}
// Saved a question to user's saved questions

export async function toggleSavedQuestion(params: ToggleSaveQuestionParams) {
  try {
    await connectToDatabase();
    const { userId, questionId, path } = params;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(
        "user.action.ts: toggleSavedQuestion: error:User Not Found "
      );
    }
    const isQuestionSaved = user.saved.includes(questionId);
    if (isQuestionSaved) {
      await User.findByIdAndUpdate(
        userId,
        {
          $pull: { saved: questionId },
        },
        { new: true }
      );
    } else {
      //add question to saved
      await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: { saved: questionId },
        },
        { new: true }
      );
    }
    revalidatePath(path);
  } catch (error) {
    console.log("user.action .ts: savedQUestion: error: ", error);
  }
}
export async function getSavedQuestion(params: GetSavedQuestionsParams) {
  try {
    await connectToDatabase();
    const { clerkId, page = 1, pageSize = 10, filter, searchQuery } = params;
    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};
    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });
    if (!user) throw new Error("User not found");
    const savedQuestions = user.saved;
    return { questions: savedQuestions };
  } catch (error) {
    console.error("user.action.ts: getSavedQuestion: error: ", error);
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    await connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    if (!user) throw new Error("User not found");
    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Question.countDocuments({ author: user._id });
    return { user, totalQuestions, totalAnswers };
  } catch (error) {
    console.error("user.action.ts: getSavedQuestion: error: ", error);
  }
}

//Get Questions for specific user
export async function getUserQuestion(params: GetUserStatsParams) {
  try {
    await connectToDatabase();
    const { userId, page = 1, pageSize = 10 } = params;
    const totalQuestion = await Question.countDocuments({ author: userId });
    const userQuestions = await Question.find({ author: userId })
      .sort({ views: -1, upvotes: -1 })
      .populate("tags", "_id name")
      .populate("author", "_id clerkId name picture");
    return { totalQuestion, questions: userQuestions };
  } catch (error) {
    console.error("user.action.ts: getUserQuestion: error: ", error);
  }
}
//Get Answers for specific user
export async function getUserAnswers(params: GetUserStatsParams) {
  try {
    await connectToDatabase();
    const { userId, page = 1, pageSize = 10 } = params;
    const totalAnswers = await Answer.countDocuments({ author: userId });
    const userAnswers = await Answer.find({ author: userId })
      .sort({ upvotes: -1 })
      .populate("question", "_id title")
      .populate("author", "_id clerkId name picture");
    return { totalAnswers, answers: userAnswers };
  } catch (error) {
    console.error("user.action.ts: getUserAnswers: error: ", error);
  }
}
// export async function getSavedQuestion(){
//   try {
//     await connectToDatabase()
//   } catch (error) {
//     console.error("user.action.ts: getSavedQuestion: error: ", error)
//   }
// }
