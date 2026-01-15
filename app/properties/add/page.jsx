import PropertyAddForm from "@/components/PropertyAddForm";

const AddPropertyPage = () => {
  return (
    <section className="bg-blue-100">
      <div className="container mx-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 rounded-md shadow-md border border-blue-400 m-4 md:m-0">
          <PropertyAddForm />
        </div>
      </div>
    </section>
  );
};

export default AddPropertyPage;
