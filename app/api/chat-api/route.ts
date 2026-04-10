import { messageSchema } from "@/app/constants/interfaces";
import { SYSTEM_INSTRUCTION } from "@/app/constants/systemInstruction";
import { GoogleGenAI } from "@google/genai";
import z from "zod";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  const { message } = await request.json();

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: message,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseJsonSchema: z.toJSONSchema(messageSchema),
    },
  });

  const parsed = JSON.parse(response.text ?? "{}");
  return Response.json(parsed);
}
