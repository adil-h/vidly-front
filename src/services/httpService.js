import axios from "axios";

axios.interceptors.response.use(
  success => {
    console.log(success);
    return Promise.resolve(success);
  },
  error => {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedErrors) {
      alert("an unexpected error occured");
      console.log("logging th error ", error);
    }
    return Promise.reject(error);
  }
);

function setToken(token) {
  axios.defaults.headers.common["x-auth-token"] = token;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setToken
};
