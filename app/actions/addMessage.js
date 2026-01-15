"use server";

import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/geSessionUser";

const addMessage = async (previousState, formData) => {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return { error: "You must be logged in to send a message" };
  } else {
    const { userId } = sessionUser;

    const recipient = formData.get("recipient");
    const property = formData.get("property");
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const body = formData.get("message");

    console.log(userId, recipient);

    if (userId === recipient) {
      return { error: "You cannot send message to yourself" };
    }

    const newMessage = new Message({
      sender: userId,
      recipient,
      property,
      name,
      email,
      phone,
      body,
    });

    await newMessage.save();

    return { submitted: true };
  }
};

export default addMessage;
