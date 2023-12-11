"use server";

import Question from "@/databases/question.modal";
import { connectToDatabase } from "./mongoose";
import prisma from "../prisma";
import Tag from "@/databases/tag.model";

export async function createQuestion(params: any) {
  try {
    const { title, content, tags, author, path } = params;
    // Create question
    // const question = await prisma?.question.create({
    //   data:{
    //     title,content,author
    //   }
    // })
  const question  =await Question.create({
    title,
    content,
    author,
  });
    const tagDocuments = [];
    // const existingTag = await prisma?.tags.upsert({
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
    const existingTag = await Tag.findOneAndUpdate(
      { name: { $regex: new RegExp(`^${tags}$`, "i") } },
      { $setOnInsert: { name: tags }, $push: { question: question._id } },
      { upsert: true, new: true }
    );
    
    tagDocuments.push(existingTag.id);
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });
  } catch (error) {
    console.log("question.action.ts: createQuestion: error: ", error);
  }
}
