import http from "./httpService";
import config from "../config/config.json";

export const saveMovie = async movie => {
  http.post(config.apiEndpoint + "/movies", movie);
};

export const updateMovie = async (movie, id) => {
  http.put(config.apiEndpoint + "/movies/" + id, movie);
};

export const getMovie = async movieId => {
  return http.get(config.apiEndpoint + "/movies/" + movieId);
};

export const getMovies = async () => {
  return await http.get(config.apiEndpoint + "/movies");
};

export const deleteMovie = async movieId => {
  console.log("delete ", movieId);
  return http.delete(config.apiEndpoint + "/movies/" + movieId);
};
