import searchProperty from "@/app/actions/searchProperty";
import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";

const PropertySearchPage = async ({ searchParams }) => {
  const { location, propertyType } = await searchParams;

  const properties = await searchProperty(location, propertyType);

  return (
    <>
      <section className="bg-blue-700 px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <PropertySearchForm />
        </div>
      </section>
      <section className="bg-blue-100 min-h-[calc(100vh-300px)] px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-3">Search Results</h1>
          <p className="mb-6 text-xl border-b pb-3 border-blue-950">
            Showing results for "{location}" in "{propertyType}"
          </p>
          {properties.length === 0 ? (
            <p className="text-gray-600">
              There are no properties matching your search.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default PropertySearchPage;
