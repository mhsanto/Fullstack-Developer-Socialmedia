"use server";

import Question from "@/databases/question.modal";
import { connectToDatabase } from "./mongoose";
import { SearchParams } from "./shared.types";
import Answer from "@/databases/answer.modal";
import User from "@/databases/user.model";
import Tag from "@/databases/tag.model";
const searchableTypes = ["question", "answer", "tag", "user"];
export async function globalSearch(params: SearchParams) {
  try {
    await connectToDatabase();
    const { query, type } = params;
    const regexQuery = { $regex: query, $options: "i" };
    let results: any = [];
    const modelAndTypes = [
      { model: Question, searchField: "title", type: "question" },
      { model: Answer, searchField: "content", type: "answer" },
      { model: User, searchField: "name", type: "user" },
      { model: Tag, searchField: "name", type: "tag" },
    ];
    const typeLower = type?.toLowerCase();
    if (!typeLower || !searchableTypes.includes(typeLower)) {
      //search all type of model
      for (const { model, searchField, type } of modelAndTypes) {
        const queryResults = await model
          .find({
            [searchField]: regexQuery,
          })
          .limit(2);
        results.push(
          ...queryResults.map((item) => ({
            title:
              type === "answer"
                ? `Answers containing ${query}`
                : item[searchField],
            type,
            id:
              type === "user"
                ? item.clerkId
                : type === "answer"
                ? item.question
                : item._id,
          }))
        );
      }
    } else {
      //only search specified model type
      const modelInfo = modelAndTypes.find((item) => item.type == typeLower);
      if (!modelInfo) throw new Error("Please search valid types");
      const queryResults = await modelInfo.model
        .find({ [modelInfo.searchField]: regexQuery })
        .limit(8);

      results = queryResults.map((item) => ({
        title:
          type === "answer"
            ? `Answers containing ${query}`
            : item[modelInfo.searchField],
        type,
        id:
          type === "user"
            ? item.clerkId
            : type === "answer"
            ? item.question
            : item._id,
      }));
    }
    return JSON.stringify(results);
  } catch (error) {
    console.error(`global.action.tsx globalSearch ${error}`);
  }
}
