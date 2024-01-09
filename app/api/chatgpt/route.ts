import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const { question } = await req.json();
  try {
    const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a knowlegeable assistant  that provides answers to questions about the world.",
          },
          { role: "user", content: `Tell me ${question}` },
        ],
      }),
    });
    const responseJson = await response.json();
    const reply = responseJson.choices[0].message.content;
    console.log(response);
    return NextResponse.json({ reply });
  } catch (error) {
    console.log(` Post Route Error ${error}`);
  }
}
