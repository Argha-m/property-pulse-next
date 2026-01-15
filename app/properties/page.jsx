import Pagination from "@/components/Pagination";
import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";

const PropertiesPage = async ({ searchParams }) => {
  await connectDB();

  const { page = 1 } = await searchParams;

  const skip = (page - 1) * 6;

  const totalProperties = await Property.countDocuments();
  const totalPages = Math.ceil(totalProperties / 6);

  const properties = await Property.find({}).skip(skip).limit(6);

  return (
    <section className="bg-blue-100 px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p className="text-center text-gray-600">No properties available.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
            <Pagination currentPage={Number(page)} totalPages={totalPages} />
          </>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
