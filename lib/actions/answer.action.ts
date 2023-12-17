"use server";

import Answer from "@/databases/answer.modal";
import { connectToDatabase } from "./mongoose";
import { CreateAnswerParams } from "./shared.types";
import Question from "@/databases/question.modal";
import { revalidatePath } from "next/cache";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    await connectToDatabase();
    const { content, author, question, path } = params;
    const newAnswer = new Answer({ content, author, question });
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.error(`Error creating answer: ${error}`);
  }
}
