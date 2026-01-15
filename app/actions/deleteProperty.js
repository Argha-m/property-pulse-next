"use server";

import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/geSessionUser";
import { revalidatePath } from "next/cache";
import cloudinary from "@/config/cloudinary";

const deleteProperty = async (propertyId) => {
  await connectDB();
  const sessionUser = await getSessionUser();

  const { userId } = sessionUser;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const property = await Property.findById(propertyId);

  if (!property) {
    throw new Error("Property not found");
  }

  if (property.owner.toString() !== userId) {
    throw new Error("Unauthorized action");
  }

  // Delete images from Cloudinary
  for (const imageUrl of property.images) {
    const publicId = imageUrl.split("/").pop().split(".").shift();

    await cloudinary.uploader.destroy("PropertyPlusArgha/" + publicId);
  }

  // Delete property from database
  await Property.findByIdAndDelete(propertyId);

  // Revalidate the profile page to reflect changes
  revalidatePath("/profile");
};

export default deleteProperty;
