"use server"

import { connectToDatabase } from "./mongoose";
import { CreateAnswerParams } from "./shared.types";

export async function createAnswer(params:CreateAnswerParams){
    try {
        await connectToDatabase()

    } catch (error) {
        console.error(`Error creating answer: ${error}`)
    }
}