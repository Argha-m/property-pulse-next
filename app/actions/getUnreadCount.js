"use server";

import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/geSessionUser";

const getUnreadCount = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    throw new Error("You must be logged in to mark a message as read");
  }
  const { userId } = sessionUser;

  const unreadMessages = await Message.find({ recipient: userId, read: false })
    .sort({ createdAt: -1 })
    .lean();

  return unreadMessages.length;
};

export default getUnreadCount;
