import connectDB from "@/config/database";
import Property from "@/models/Property";
import Link from "next/link";
import Image from "next/image";
import { FaBath, FaBed, FaMoneyBill, FaRulerCombined } from "react-icons/fa";

const FeaturedProperties = async () => {
  await connectDB();
  const featuredProperties = await Property.find({ is_featured: true })
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

  const getRateDisplay = (property) => {
    const { rates } = property;
    if (rates.monthly) {
      return `$${rates.monthly.toLocaleString()}/mo`;
    } else if (rates.weekly) {
      return `$${rates.weekly.toLocaleString()}/wk`;
    } else if (rates.nightly) {
      return `$${rates.nightly.toLocaleString()}/night`;
    } else {
      return "Contact for rates";
    }
  };

  return (
    <section className="bg-gray-100 px-4 py-8 md:py-10 lg:py-12">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Featured Properties
        </h2>
        {featuredProperties.length === 0 ? (
          <p className="text-center text-gray-600">
            No properties featured yet.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredProperties.map((property) => (
                <div
                  key={property._id}
                  className="bg-white rounded-xl shadow-md relative flex flex-col md:flex-row"
                >
                  <Link
                    className="w-full md:w-2/5"
                    href={`/properties/${property._id}`}
                  >
                    <Image
                      src={property.images[0]}
                      width="0"
                      height="0"
                      sizes="100%"
                      alt=""
                      className="w-full h-full rounded-t-xl md:rounded-tr-none md:rounded-l-xl"
                    />
                  </Link>
                  <div className="w-full md:w-3/5 p-6">
                    <h3 className="text-xl font-bold">{property.name}</h3>
                    <div className="text-gray-600 mb-4">{property.type}</div>
                    <h3 className="absolute top-2.5 left-2.5 bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
                      {getRateDisplay(property)}
                    </h3>
                    <div className="flex justify-center gap-4 text-gray-500 mb-4">
                      <p>
                        <FaBed className="md:hidden lg:inline me-1" />{" "}
                        {property.beds}{" "}
                        <span className="md:hidden lg:inline">Beds</span>
                      </p>
                      <p>
                        <FaBath className="md:hidden lg:inline me-1" />{" "}
                        {property.baths}{" "}
                        <span className="md:hidden lg:inline">Baths</span>
                      </p>
                      <p>
                        <FaRulerCombined className="md:hidden lg:inline me-1" />
                        {property.area}{" "}
                        <span className="md:hidden lg:inline">sqft</span>
                      </p>
                    </div>

                    <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
                      <p>
                        <FaMoneyBill className="inline" /> Nightly
                      </p>
                      <p>
                        <FaMoneyBill className="inline" /> Weekly
                      </p>
                    </div>

                    <div className="border border-gray-200 mb-5"></div>

                    <div className="flex flex-col lg:flex-row justify-between">
                      <div className="flex align-middle gap-2 mb-4 lg:mb-0">
                        <i className="fa-solid fa-location-dot text-lg text-orange-700"></i>
                        <span className="text-orange-700">
                          {" "}
                          {property.location.street}{" "}
                        </span>
                      </div>
                      <Link
                        href={`/properties/${property._id}`}
                        className="h-9 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="m-auto max-w-lg mt-10 px-6">
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

export default FeaturedProperties;
