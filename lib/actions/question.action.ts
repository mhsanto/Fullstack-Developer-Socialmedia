"use server";

import Question from "@/databases/question.modal";
import { connectToDatabase } from "./mongoose";
import Tag from "@/databases/tag.model";
import prisma from "../prisma";

export async function createQuestion(params: any) {
  try {
    const { title, content, tags, author, path } = params;
    // Create question
    const question = await prisma.
    const question = await Question.create({
      title,
      content,
      author,
    });
    const tagDocuments = [];
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { question: question._id } },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id || existingTag);
    }
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });
  } catch (error) {
    console.log("question.action.ts: createQuestion: error: ", error);
  }
}
