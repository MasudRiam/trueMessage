// pages/api/suggest-messages.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = body.prompt || "Give me 3 fun open-ended questions separated by ||";

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ success: true, message: text }), {
      status: 200,
    });
  } catch (error: any) {
    console.error("Gemini error:", error);
    return new Response(JSON.stringify({
      success: false,
      message: error.message ?? "Gemini API error",
    }), { status: 500 });
  }
}
