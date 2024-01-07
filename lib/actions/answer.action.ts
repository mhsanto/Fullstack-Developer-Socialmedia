"use server";

import Answer from "@/databases/answer.modal";
import { connectToDatabase } from "./mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import Question from "@/databases/question.modal";
import { revalidatePath } from "next/cache";
import Interaction from "@/databases/interaction.model";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    await connectToDatabase();
    const { content, author, question, path } = params;
    const newAnswer = await Answer.create({ content, author, question });

    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.error(`Error creating answer: ${error}`);
  }
}

// get all answers
export async function getAllAnswers(params: GetAnswersParams) {
  try {
    await connectToDatabase();
    const { questionId, sortBy, page = 1, pageSize = 10 } = params;
    const skipAmount = (page - 1) * pageSize;
    let sortOptions = {};
    switch (sortBy) {
      case "highestUpvotes":
        sortOptions = { upvotes: -1 };
        break;
      case "lowestUpvotes":
        sortOptions = { upvotes: 1 };
        break;
      case "recent":
        sortOptions = { createAt: -1 };
        break;
      case "old":
        sortOptions = { createAt: 1 };
        break;

      default:
        break;
    }
    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);
    const totalAnswers = await Answer.countDocuments({ question: questionId });
    const isNext = totalAnswers > page * pageSize;

    return { answers, isNext };
  } catch (error) {
    console.error(`Error getting all answers: ${error}`);
  }
}

// UpVote An Answer action
export async function upVoteAnswer(params: AnswerVoteParams) {
  try {
    await connectToDatabase();

    const { answerId, userId, hasUpvoted, hasDownvoted, path } = params;

    let updateQuery = {};

    if (hasUpvoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasDownvoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      console.error("Answer not found");
    }

    // await User.findByIdAndUpdate(userId, {
    //   $inc: { reputation: hasUpvoted ? -1 : 1 },
    // });

    // await User.findByIdAndUpdate(question.author, {
    //   $inc: { reputation: hasUpvoted ? -10 : 10 },
    // });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
// Downvote An Answer action
export async function downVoteAnswer(params: AnswerVoteParams) {
  try {
    await connectToDatabase();

    const { answerId, userId, hasUpvoted, hasDownvoted, path } = params;

    let updateQuery = {};

    if (hasDownvoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasUpvoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      console.error("Answer not found");
    }

    // await User.findByIdAndUpdate(userId, {
    //   $inc: { reputation: hasUpvoted ? -1 : 1 },
    // });

    // await User.findByIdAndUpdate(question.author, {
    //   $inc: { reputation: hasUpvoted ? -10 : 10 },
    // });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
//delete an answer by id
export async function deleteAnswer(params: DeleteAnswerParams) {
  try {
    await connectToDatabase();
    const { answerId, path } = params;
    const answer = await Answer.findById(answerId);
    if (!answer) throw new Error("Answer not found");

    await answer.deleteOne({ _id: answerId }); //delete all answers related to the answer

    await Question.updateMany(
      { _id: answer.question },
      { $pull: { answers: answerId } }
    ); //delete the answer from the tags
    await Interaction.deleteMany({ answer: answerId }); //delete all interactions related to the answer
    revalidatePath(path);
  } catch (error) {
    console.error(` answer.action.ts: deleteanswer: error: ${error}`);
  }
}
