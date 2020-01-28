import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { saveMovie, getMovie, updateMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

class Movieform extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      dailyRentalRate: "",
      numberInStock: ""
    },
    movieId: "",
    errors: {},
    genres: []
  };

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Rate"),
    numberInStock: Joi.number()
      .min(0)
      .required()
      .label("Stock")
  };

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

  async populateMovies() {
    if (this.props.match.params.id === "new") return;

    try {
      const { data } = await getMovie(this.props.match.params.id);
      console.log(data);
      this.setState({
        data: this.mapMovie(data),
        movieId: data._id
      });
    } catch (ex) {
      if (ex.response.status === "404") {
        return this.props.history.replace("/-not-found");
      }
    }
  }

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({
      genres: genres
    });
  }

  mapMovie(movie) {
    return {
      title: movie.title,
      genreId: movie.genre._id,
      dailyRentalRate: movie.dailyRentalRate,
      numberInStock: movie.numberInStock
    };
  }

  doSubmit = async () => {
    const movie = this.state.data;
    if (this.state.movieId) {
      await updateMovie(movie, this.state.movieId);
    } else {
      await saveMovie(movie);
    }
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          <label htmlFor="genre"> Genre</label>

          {
            <div className="form-group">
              <select
                name="genreId"
                id="genreId"
                value={this.state.data.genreId}
                onChange={this.handleChange}
                className="form-control"
              >
                <option value="">Choose...</option>
                {this.state.genres.map(genre => (
                  <option key={genre._id} value={genre._id}>
                    {genre.name}
                  </option>
                ))}
              </select>
              {this.state.errors.genre && (
                <div className="alert alert-danger">
                  {this.state.errors.genre}
                </div>
              )}
            </div>
          }
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderInput("numberInStock", "Stock", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}
export default Movieform;
