"use server";

import Question from "@/databases/question.modal";
import { connectToDatabase } from "./mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/databases/interaction.model";

export async function createInteraction(params: ViewQuestionParams) {
  try {
    await connectToDatabase();
    const { questionId, userId } = params;
    //update view by 1 when user view question

    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });
    if (userId) {
      const existingInteraction = await  Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });
      //if interaction already exist
      if(existingInteraction) return
      //create interaction
      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }

  } catch (error) {
    console.log(" error in createInteraction", error);
  }
}
