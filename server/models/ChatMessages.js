import mongoose from "mongoose";

const ChatMessagesSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
      required: true,
    },
    messages: {
      type: Array,
      required: true,
      default: [],
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("ChatMessages", ChatMessagesSchema);
