"use server";

import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/geSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const editProperty = async (propertyId, formData) => {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    throw new Error("User not authenticated");
  }
  const { userId } = sessionUser;

  const existingProperty = await Property.findById(propertyId);
  console.log(existingProperty);

  if (!existingProperty) {
    throw new Error("Property not found");
  }

  if (existingProperty.owner.toString() !== userId) {
    throw new Error("User not authorized to edit this property");
  }

  const amenities = formData.getAll("amenities");

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
    is_featured: formData.get("is_featured") === "on",
  };

  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    propertyData
  );

  revalidatePath("/profile/properties");
  redirect("/properties" + `/${updatedProperty._id}`);
};

export default editProperty;
