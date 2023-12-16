"use server";

import User from "@/databases/user.model";
import { connectToDatabase } from "./mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import Tag from "@/databases/tag.model";

export async function getTopInteractedTagsParams({
  userId,
}: GetTopInteractedTagsParams) {
  try {
    await connectToDatabase();
    const user = await User.findById(userId);
    if (!user) {
      console.error("User not found");
    }
    //find interactions of user group by tagId and sort by count
    return [
      { _id: "1", tag: "tag1", count: 1 },
      { _id: "2", tag: "tag2", count: 2 },
      { _id: "3", tag: "tag3", count: 3 },
    ];
  } catch (error) {
    console.error(` Error in getUserCreatedTags: ${error}`);
  }
}

// get all tags

export async function getAllTags(params: GetAllTagsParams) {
  try {
    await connectToDatabase();
    const tags = await Tag.find({});
    return { tags };
  } catch (error) {
    console.error(` Error in getUserCreatedTags: ${error}`);
  }
}
