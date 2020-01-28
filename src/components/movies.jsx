import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTables";
import { Link } from "react-router-dom";
import _ from "lodash";
import SearchBox from "./common/searchBox";
import { Redux } from "redux";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    selectedGenre: null,
    currentPage: 1,
    searchWord: "",
    pageSize: 5,
    sortColumn: { path: "title", order: "asc" }
  };
  async componentDidMount() {
    const { data: genres } = await getGenres();
    const { data: movies } = await getMovies();

    const allGenres = { name: "All Genres", _id: -1 };
    this.setState({
      movies: movies,
      genres: [allGenres, ...genres],
      selectedGenre: allGenres
    });

    console.log(Redux);
  }

  calculatePagination() {
    const {
      movies,
      currentPage,
      pageSize,
      selectedGenre,
      sortColumn,
      searchWord
    } = this.state;

    let filtredMovies =
      selectedGenre && selectedGenre._id !== -1
        ? movies.filter(movie => movie.genre._id === selectedGenre._id)
        : movies;

    filtredMovies = searchWord
      ? filtredMovies.filter(
          movie =>
            movie.title.toLowerCase().indexOf(searchWord.toLowerCase()) >= 0
        )
      : filtredMovies;

    filtredMovies = _.orderBy(filtredMovies, sortColumn.path, sortColumn.order);
    const paginatedMovies = paginate(filtredMovies, currentPage, pageSize);
    const moviesCount = filtredMovies.length;
    return { paginatedMovies, moviesCount };
  }

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies: movies });
  };

  handleDelete = async id => {
    const originalMovies = this.state.movies;
    try {
      await deleteMovie(id);
      const filteredMovies = originalMovies.filter(movie => movie._id !== id);
      this.setState({
        movies: [...filteredMovies]
      });
    } catch (ex) {
      console.log(ex);
      this.setState({ movies: originalMovies });
    }
  };

  handleSort = sortColumn => {
    this.setState({
      sortColumn: { ...sortColumn }
    });
  };

  handlePageChange = page => {
    const newState = { ...this.state };
    newState.currentPage = page;
    this.setState(newState);
  };

  handleSelect = genre => {
    this.setState({
      ...this.state,
      selectedGenre: genre,
      searchWord: "",
      currentPage: 1
    });
  };

  handleSearch = query => {
    this.setState({
      selectedGenre: null,
      currentPage: 1,
      searchWord: query
    });
  };

  render() {
    if (this.state.movies.length > 0) {
      const {
        currentPage,
        pageSize,
        genres,
        selectedGenre,
        searchWord,
        sortColumn
      } = this.state;

      const { user } = this.props;

      const { paginatedMovies, moviesCount } = this.calculatePagination();
      return (
        <React.Fragment>
          <div className="container">
            <div className="row">
              <div className="col-3">
                <ListGroup
                  groups={genres}
                  selectedGroup={selectedGenre}
                  onSelect={this.handleSelect}
                ></ListGroup>
              </div>
              <div className="col">
                {user && (
                  <Link className="btn btn-primary my-1" to={"/movies/new"}>
                    New movie{" "}
                  </Link>
                )}
                <span className="my-1">
                  Showing {moviesCount} movie(s) in the database
                </span>
                <SearchBox value={searchWord} onChange={this.handleSearch} />
                <MoviesTable
                  movies={paginatedMovies}
                  sortColumn={sortColumn}
                  onLike={this.handleLike}
                  onDelete={this.handleDelete}
                  onSort={this.handleSort}
                  user={user}
                ></MoviesTable>
              </div>
            </div>
            <div className="row">
              <div className="offset-3 col ">
                <Pagination
                  onPageChange={this.handlePageChange}
                  itemsCount={moviesCount}
                  currentPage={currentPage}
                  pageSize={pageSize}
                ></Pagination>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return <span>there are no movies in the databse</span>;
    }
  }
}

export default Movies;
