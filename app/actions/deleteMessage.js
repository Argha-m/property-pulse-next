"use server";

import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/geSessionUser";
import { revalidatePath } from "next/cache";

const deleteMessage = async (messageId) => {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    throw new Error("You must be logged in to mark a message as read");
  } else {
    const { userId } = sessionUser;
    const message = await Message.findById(messageId);

    if (!message) {
      throw new Error("Message not found");
    }

    if (message.recipient.toString() !== userId) {
      throw new Error("You are not authorized to mark this message as read");
    }

    await message.deleteOne();
  }
};

export default deleteMessage;
