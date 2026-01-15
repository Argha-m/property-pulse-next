import PropertyCard from "@/components/PropertyCard";
import saveProperties from "../actions/savedProperties";

const SavedPropertiesPage = async () => {
  const savedProperties = await saveProperties();
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Your Saved Properties</h1>
        {savedProperties.length === 0 ? (
          <p className="text-center text-gray-600">
            You have no saved properties.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
