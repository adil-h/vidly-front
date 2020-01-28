import React, { Component } from "react";
import Table from "./common/table";
import Like from "./common/like";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      key: "title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title} </Link>
    },
    { path: "genre.name", label: "Genre", key: "genre" },
    { path: "numberInStock", label: "Stock", key: "stock" },
    { path: "dailyRentalRate", label: "Rate", key: "rate" },
    {
      key: "like",
      content: movie => {
        return (
          <Like
            value={movie.liked}
            onLike={() => this.props.onLike(movie)}
          ></Like>
        );
      }
    },
    {
      key: "delete",
      content: movie => {
        return (
          this.props.user &&
          this.props.user.isAdmin && (
            <button
              className="btn btn-danger"
              onClick={() => this.props.onDelete(movie._id)}
            >
              delete
            </button>
          )
        );
      }
    }
  ];
  render() {
    const { movies, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={this.onSort}
      ></Table>
    );
  }

  onSort = sortColumn => {
    this.props.onSort(sortColumn);
  };
}

export default MoviesTable;
