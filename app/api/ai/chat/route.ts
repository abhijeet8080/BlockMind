// app/api/ai/chat/route.ts
import { NextRequest } from "next/server";
import { chatWithAI } from "@/lib/ai/chatController";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { message, user } = await req.json();
    const { reply } = await chatWithAI(message, user);

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Chat API Error:", err);
    return new Response(JSON.stringify({ error: "AI failed to respond." }), {
      status: 500,
    });
  }
}
