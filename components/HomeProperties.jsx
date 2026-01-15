import PropertyCard from "./PropertyCard";
import Link from "next/link";
import connectDB from "@/config/database";
import Property from "@/models/Property";

const HomeProperties = async () => {
  await connectDB();

  const properties = await Property.find({})
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

  return (
    <section className="px-4 py-6">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Recent Properties
        </h2>
        {properties.length === 0 ? (
          <p className="text-center text-gray-600">No properties available.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.slice(0, 3).map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
            <div className="m-auto max-w-lg my-10 px-6">
              <Link
                href="/properties"
                className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-800"
              >
                View All Properties
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default HomeProperties;
