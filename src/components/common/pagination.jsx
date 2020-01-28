import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = props => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  let pages = Math.ceil(itemsCount / pageSize);
  const pagination = _.range(1, pages + 1);
  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li className={"page-item " + (currentPage === 1 ? "disabled" : "")}>
          <a
            className="page-link"
            tabIndex="-1"
            aria-disabled="true"
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </a>
        </li>
        {pagination.map(page => {
          return (
            <li
              className={"page-item " + (page === currentPage ? "active" : "")}
              key={page}
            >
              <a
                className="page-link "
                onClick={() => props.onPageChange(page)}
              >
                {page}
              </a>
            </li>
          );
        })}

        <li
          className={"page-item " + (currentPage === pages ? "disabled" : "")}
        >
          <a
            className="page-link"
            onClick={() => props.onPageChange(currentPage + 1)}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
