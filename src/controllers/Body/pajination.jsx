import React from "react";

const Pagination = ({ currentPage, onPageChange }) => {
    const handlePrevPage = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };
  
    const handleNextPage = () => {
      onPageChange(currentPage + 1);
    };
  
    return (
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Prev</button>
        <span>Page {currentPage}</span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    );
  };

export default Pagination;
