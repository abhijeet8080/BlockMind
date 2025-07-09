// lib/ai/chatController.ts
import OpenAI from "openai";
import ChatHistory from "@/models/ChatHistory";
import { SYSTEM_PROMPT } from "@/constants/Prompt";
import {
  getTaskFromContract,
  getAllTasksFromContract,
} from "@/lib/contract/read";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function chatWithAI(
  prompt: string,
  user: { walletAddress: string }
) {
  const { walletAddress } = user;
  console.log("Got the walletAddress");

  let chatHistory = await ChatHistory.findOne({ walletAddress });
  if (!chatHistory) {
    chatHistory = new ChatHistory({ walletAddress, messages: [] });
  }

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...chatHistory.messages,
    {
      role: "user",
      content: `Wallet: ${walletAddress}, Message: ${prompt}`,
    },
  ];

  while (true) {
    const chat = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages,
      response_format: { type: "json_object" },
    });

    const result = chat.choices[0]?.message?.content;
    console.log("Got result from AI:", result);

    if (!result) {
      return { reply: JSON.stringify({ type: "output", output: "AI is speechless right now." }) };
    }

    const action = typeof result === "string" ? JSON.parse(result) : result;
    messages.push({ role: "assistant", content: JSON.stringify(action) });
    chatHistory.messages = messages.slice(-10);
    await chatHistory.save();

    if (action.type === "output") {
      return { reply: JSON.stringify({ type: "output", output: action.output || "No output generated." }) };
    }

    if (action.type === "action" && action.function) {
      const fn = action.function;
      const input = action.input || {};
      let observation = null;

      try {
        if (fn === "getTask") {
          if (!input.id || typeof input.id !== "number") {
            observation = { error: "Invalid task ID provided for getTask." };
          } else {
            observation = await getTaskFromContract(walletAddress as `0x${string}`, input.id);
            console.log("Observation from getTask:", observation);
          }
        } else if (fn === "allUserTasks") {
          observation = await getAllTasksFromContract(walletAddress as `0x${string}`);
          console.log("Observation from allUserTasks:", observation);

        } else {
          return { reply: JSON.stringify(action) };
        }

        const obs = { type: "observation", observation };
        const safeObservation = JSON.parse(
          JSON.stringify(obs, (_key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );

        messages.push({
          role: "assistant",
          content: JSON.stringify(safeObservation),
        });

        chatHistory.messages = messages.slice(-10);
        await chatHistory.save();
      } catch (error) {
        console.error("Error executing smart contract read:", error);
        return {
          reply: JSON.stringify({
            type: "output",
            output: `❌ Failed to execute ${fn}: ${error}`,
          }),
        };
      }
    }
  }
}
