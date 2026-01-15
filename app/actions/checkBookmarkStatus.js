"use server";

import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/geSessionUser";

const checkBookmarkStatus = async (propertyId) => {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User not authenticated");
  }
  const { userId } = sessionUser;

  const user = await User.findById(userId);

  const isBookmarked = user.bookmarks.includes(propertyId);

  return { isBookmarked };
};

export default checkBookmarkStatus;
