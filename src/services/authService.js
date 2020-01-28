import http from "./httpService";
import config from "../config/config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = config.apiEndpoint + "/auth";

http.setToken(getToken());

export async function login(email, password) {
  const { data: token } = await http.post(apiEndpoint, {
    email: email,
    password: password
  });
  localStorage.setItem("token", token);
}

export function loginWithJwt(token) {
  localStorage.setItem("token", token);
}

export function logout() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem("token");
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export function getToken() {
  return localStorage.getItem("token");
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getToken
};
