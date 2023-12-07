"use server";

import { connectToDatabase } from "./mongoose";

export async function createQuestion(params: any) {
  await connectToDatabase();
}
