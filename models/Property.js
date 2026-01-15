import { Schema, model, models } from "mongoose";

const propertySchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: [true, "Property name is required"] },
    type: { type: String, required: [true, "Type is required"] },
    description: { type: String, required: true },
    location: {
      street: String,
      city: String,
      state: String,
      zipcode: String,
    },
    beds: {
      type: Number,
      required: true,
    },
    baths: {
      type: Number,
      required: true,
    },
    square_feet: {
      type: Number,
      required: true,
    },
    amenities: [
      {
        type: String,
      },
    ],
    rates: {
      nightly: Number,
      weekly: Number,
      monthly: Number,
    },
    seller_info: {
      name: String,
      email: String,
      phone: String,
    },
    images: [{ type: String }],
    is_featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Property = models.Property || model("Property", propertySchema);

export default Property;
