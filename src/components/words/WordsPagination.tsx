import React from "react";

type WordsPaginationProps = {
  currentPage: number;
  totalPages: number;
  pages: Array<number | string>;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (page: number) => void;
};

function WordsPagination({
  currentPage,
  totalPages,
  pages,
  onPrev,
  onNext,
  onSelect,
}: WordsPaginationProps) {
  return (
    <div className="words-pagination">
      <button
        type="button"
        className="pagination__btn"
        onClick={onPrev}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      <div className="pagination__pages">
        {pages.map((page) =>
          typeof page === "number" ? (
            <button
              key={page}
              type="button"
              className={`pagination__page ${
                page === currentPage ? "is-active" : ""
              }`}
              onClick={() => onSelect(page)}
            >
              {page}
            </button>
          ) : (
            <span key={page} className="pagination__ellipsis">
              ...
            </span>
          ),
        )}
      </div>

      <button
        type="button"
        className="pagination__btn"
        onClick={onNext}
        disabled={currentPage === totalPages || totalPages === 0}
      >
        Next
      </button>

      <span className="pagination__meta">
        Page {currentPage} of {Math.max(totalPages, 1)}
      </span>
    </div>
  );
}

export default WordsPagination;
