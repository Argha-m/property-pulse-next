"use server";

import connectDB from "@/config/database";
import Property from "@/models/Property";

const searchProperty = async (location, propertyType) => {
  await connectDB();

  const locationPartern = new RegExp(location, "i");
  const query = {
    $or: [
      { "location.street": locationPartern },
      { "location.city": locationPartern },
      { "location.state": locationPartern },
      { "location.zipcode": locationPartern },
      { name: locationPartern },
      { description: locationPartern },
    ],
  };

  if (propertyType && propertyType !== "All") {
    const propertyPattern = new RegExp(`^${propertyType}$`, "i");
    query.type = propertyPattern;
  }

  return await Property.find(query).lean();
};

export default searchProperty;
