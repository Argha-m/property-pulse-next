"use server";

import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/geSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";

const addProperty = async (formData) => {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    throw new Error("User not authenticated");
  } else {
    const amenities = formData.getAll("amenities");
    const images = formData.getAll("images").filter((file) => file.name !== "");

    const propertyData = {
      owner: sessionUser.userId,
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: parseInt(formData.get("beds"), 10),
      baths: parseInt(formData.get("baths"), 10),
      square_feet: parseInt(formData.get("square_feet"), 10),
      amenities: amenities,
      rates: {
        nightly: formData.get("rates.nightly")
          ? formData.get("rates.nightly")
          : null,
        weekly: formData.get("rates.weekly")
          ? formData.get("rates.weekly")
          : null,
        monthly: formData.get("rates.monthly")
          ? formData.get("rates.monthly")
          : null,
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
    };

    const imageUrls = [];

    for (const imageFile of images) {
      const ImageBuffer = await imageFile.arrayBuffer();
      const ImageArray = Array.from(new Uint8Array(ImageBuffer));
      const imageData = Buffer.from(ImageArray);

      //COnvert to base64
      const image64 = imageData.toString("base64");

      //Make request to cloudinary
      const result = await cloudinary.uploader.upload(
        "data:image/jpeg;base64," + image64,
        {
          folder: "PropertyPlusArgha",
        }
      );

      imageUrls.push(result.secure_url);
    }

    propertyData.images = imageUrls;

    const newProperty = new Property(propertyData);
    await newProperty.save();
    revalidatePath("/", "layout");
    redirect(`/properties/${newProperty._id}`);
  }
};

export default addProperty;
