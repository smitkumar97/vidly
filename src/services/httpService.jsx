import axios from "axios";
import { toast } from "react-toastify";
import Raven from "raven-js";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (error) => {
  const exError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!exError) {
    console.log("Logging the error", error);
    Raven.captureException(error);
    toast.error("Unexpected Error Occured.");
  }
  return Promise.reject(error);
});
export function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
