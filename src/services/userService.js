import http from "./httpService";
import config from "../config/config.json";

const apiUrlEndpoint = config.apiEndpoint + "/users";
export function register(user) {
  return http.post(apiUrlEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
