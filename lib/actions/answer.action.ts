"use server";

import Answer from "@/databases/answer.modal";
import { connectToDatabase } from "./mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
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
