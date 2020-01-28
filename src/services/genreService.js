import http from "./httpService";
import config from "../config/config.json";

export const getGenres = () => {
  return http.get(config.apiEndpoint + "/genres");
};
