// lib/ai/observeController.ts
import OpenAI from "openai";
import ChatHistory from "@/models/ChatHistory";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function processObservation(observation: any, user: { walletAddress: string }) {
  const walletAddress = user.walletAddress;
  const chatHistory = await ChatHistory.findOne({ walletAddress });

  if (!chatHistory) {
    return { reply: "Hmm, no chat history found for this observation." };
  }

  const messages = [
    { role: "system", content: "You are an AI task manager who provides sarcastic, witty observations after actions are completed. Respond as if you've just watched the action being done." },
    ...chatHistory.messages,
    {
      role: "assistant",
      content: JSON.stringify({ type: "observation", observation }),
    }
  ];

  const chat = await openai.chat.completions.create({
    model: "gpt-4",
    messages,
  });

  const result = chat.choices[0]?.message?.content;

  messages.push({ role: "assistant", content: result });
  chatHistory.messages = messages.slice(-10);
  await chatHistory.save();

  return { reply: result || "AI observed something, but has no witty comment right now." };
}
