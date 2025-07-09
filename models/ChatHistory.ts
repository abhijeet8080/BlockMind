// models/ChatHistory.ts
import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  role: { type: String, enum: ["system", "user", "assistant"], required: true },
  content: { type: String, required: true },
});

const ChatHistorySchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  messages: [MessageSchema],
});

export default mongoose.models.ChatHistory || mongoose.model("ChatHistory", ChatHistorySchema);
