"use server";

import Answer from "@/databases/answer.modal";
import { connectToDatabase } from "./mongoose";
import { AnswerVoteParams, CreateAnswerParams, GetAnswersParams } from "./shared.types";
import Question from "@/databases/question.modal";
import { revalidatePath } from "next/cache";

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
    const { questionId } = params;

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });
    return { answers };
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