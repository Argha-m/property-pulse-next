import PropertyEditForm from "@/components/PropertyEditForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";

const PropertyEditPage = async ({ params }) => {
  const { id } = await params;

  await connectDB();

  const propertyDoc = await Property.findById(id).lean();

  const property = JSON.parse(JSON.stringify(propertyDoc));

  if (!property) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property not found
      </h1>
    );
  }

  return (
    <section className="bg-blue-100">
      <div className="container mx-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 rounded-md shadow-md border border-blue-400 m-4 md:m-0">
          <PropertyEditForm property={property} />
        </div>
      </div>
    </section>
  );
};

export default PropertyEditPage;
