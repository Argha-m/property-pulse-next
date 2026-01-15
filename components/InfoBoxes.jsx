import Link from "next/link";
import InfoBox from "./InfoBox";

const InfoBoxes = () => {
  return (
    <section className="pt-6 pb-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 rounded-lg">
          <InfoBox
            title="For Renters"
            buttonText="Browse Properties"
            buttonHref="/properties"
          >
            Find your dream rental property. Bookmark properties and contact
            owners.
          </InfoBox>
          <InfoBox
            title="For Property Owners"
            buttonText="Add Property"
            buttonHref="/properties/add"
            backgroundColor="bg-blue-100"
            textColor="text-blue-800"
            buttonBgColor="bg-blue-500"
            buttonBgColorHover="bg-blue-600"
          >
            List your properties and reach potential tenants. Rent as an airbnb
            or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
