const Pagination = ({ currentPage, totalPages }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center mt-8">
      <ul className="flex space-x-2">
        {pages.map((page) => (
          <li key={page}>
            <a
              href={`?page=${page}`}
              className={`px-4 py-2 rounded inline-block ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
