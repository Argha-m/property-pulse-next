"use server";

import connectDB from "@/config/database";
import User from "@/models/User";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/geSessionUser";
import { revalidatePath } from "next/cache";

const saveProperties = async () => {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User not authenticated");
  }
  const { userId } = sessionUser;

  const user = await User.findById(userId).populate("bookmarks");
  const savedProperties = user.bookmarks;
  return savedProperties;
};

export default saveProperties;
