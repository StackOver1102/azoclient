import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}) => {
  return (
    <div className="flex justify-between mt-4">
      <button
        className={`px-4 py-2 bg-gray-200 rounded ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={onPrevPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <p className="text-gray-500">
        Page {currentPage} of {totalPages}
      </p>
      <button
        className={`px-4 py-2 bg-gray-200 rounded ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={onNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
