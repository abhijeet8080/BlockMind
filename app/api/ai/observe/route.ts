// app/api/ai/observe/route.ts
import { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import {processObservation} from "../../../../lib/ai/observeController"
export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { observation, user } = await req.json();
    const { reply } = await processObservation(observation, user);

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Observation API Error:", err);
    return new Response(JSON.stringify({ error: "AI failed to respond to observation." }), {
      status: 500,
    });
  }
}
