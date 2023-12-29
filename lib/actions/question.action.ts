"use server";

import Question from "@/databases/question.modal";
import { connectToDatabase } from "./mongoose";
import Tag from "@/databases/tag.model";
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  QuestionVoteParams,
} from "./shared.types";
import User from "@/databases/user.model";
import { revalidatePath } from "next/cache";
import Answer from "@/databases/answer.modal";
import Interaction from "@/databases/interaction.model";

export async function getQuestions(params: GetQuestionsParams) {
  try {
    await connectToDatabase();
    const questions = await Question.find({})
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({
        path: "author",
        model: User,
      })
      .sort({ createdAt: -1 });
    return { questions };
  } catch (error) {
    console.log("QUestion.action.ts: getQuestion: error: ", error);
  }
}
export async function createQuestion(params: CreateQuestionParams) {
  try {
    await connectToDatabase();
    const { title, content, tags, author, path } = params;
    // Create question

    const question = await Question.create({
      title,
      content,
      author,
    });
    const tagDocuments = [];

    //   where: {
    //     name: { contains: tags, mode: 'insensitive' }
    //   },
    //   update: {
    //     name: tags,
    //     question: { connect: { id: question?.id } }
    //   },
    //   create: {
    //     name: tags,
    //     question: { connect: { id: question?.id } }
    //   }
    // });
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });
    revalidatePath(path);
  } catch (error) {
    console.log("question.action.ts: createQuestion: error: ", error);
  }
}

// get a specific question by id
export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    await connectToDatabase();
    const { questionId } = params;
    const question = await Question.findById(questionId)
      .populate({ path: "tags", model: Tag, select: "_id name" })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });
    return question;
  } catch (error) {
    console.log("question.action.ts: getQuestionById: error: ", error);
  }
}

// upvote a question
export async function upvoteQuestion(params: QuestionVoteParams) {
  try {
    await connectToDatabase();

    const { questionId, userId, hasUpvoted, hasDownvoted, path } = params;

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

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Question not found");
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

export async function downVoteQuestion(params: QuestionVoteParams) {
  try {
    await connectToDatabase();
    const { questionId, userId, hasUpvoted, hasDownvoted, path } = params;
    let updateQuery = {};

    if (hasDownvoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasUpvoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }
    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });
    if (!question) console.error("Question not found");
    //Increment author's reputation by +10 for upvote
    revalidatePath(path);
  } catch (error) {
    console.log("question.action.ts: getQuestionById: error: ", error);
  }
}

// delete a question
export async function deleteQuestion(params: DeleteQuestionParams) {
  try {
    await connectToDatabase();
    const { questionId, path } = params;
    await Question.deleteOne({ _id: questionId });
    await Answer.deleteMany({ question: questionId }); //delete all answers related to the question
    await Interaction.deleteMany({ question: questionId }); //delete all interactions related to the question
    await Tag.updateMany(
      { questions: questionId },
      { $pull: { questions: questionId } }
    );//delete the question from the tags
    revalidatePath(path);
  } catch (error) {
    console.error(` question.action.ts: deleteQuestion: error: ${error}`);
  }
}
