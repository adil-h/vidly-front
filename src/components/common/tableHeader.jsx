import React, { Component } from "react";

class TableHeader extends Component {
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => {
            return (
              <th
                className="clickable"
                key={column.key}
                onClick={() => this.onSort(column.path)}
              >
                {column.label}
                {this.renderSortIcone(column)}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }

  renderSortIcone = column => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return "";

    if (sortColumn.order === "asc")
      return <i className="fa fa-sort-asc ml-1"></i>;
    else return <i className="fa fa-sort-desc ml-1"></i>;
  };

  onSort = column => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === column) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = column;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };
}

export default TableHeader;
