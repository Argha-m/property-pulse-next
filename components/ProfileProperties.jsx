"use client";

import deleteProperty from "@/app/actions/deleteProperty";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const ProfileProperties = ({ properties }) => {
  const [propertyItems, setPropertyItems] = useState(properties);

  const deletePropertyHandler = async (propertyId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmDelete) return;

    await deleteProperty(propertyId);

    const updateProperties = propertyItems.filter(
      (prop) => prop._id !== propertyId
    );

    setPropertyItems(updateProperties);
    toast.success("Property deleted successfully");
  };

  return propertyItems.map((propertyItem) => (
    <div key={propertyItem._id} className="mb-10 ">
      <Link href={`/properties/${propertyItem._id}`}>
        <Image
          className="h-32 w-full rounded-md object-cover border border-gray-400"
          src={propertyItem.images[0]}
          width={1000}
          height={200}
          alt={propertyItem.name}
        />
      </Link>
      <div className="mt-2">
        <p className="text-lg font-semibold">{propertyItem.name}</p>
        <p className="text-gray-600">
          Address: {propertyItem.location.street}, {propertyItem.location.city},{" "}
          {propertyItem.location.state} {propertyItem.location.zipcode}
        </p>
      </div>
      <div className="mt-2">
        <Link
          href={`properties/${propertyItem._id}/edit`}
          className="bg-blue-500 text-white px-3 py-2 rounded-md mr-2 hover:bg-blue-600"
        >
          Edit
        </Link>
        <button
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          type="button"
          onClick={() => deletePropertyHandler(propertyItem._id)}
        >
          Delete
        </button>
      </div>
    </div>
  ));
};

export default ProfileProperties;
