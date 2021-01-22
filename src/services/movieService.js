import http from "./httpService";
// import { apiUrl } from "../config.json";

const apiEndpoint = "/movies";

export function getMovies() {
  return http.get(apiEndpoint);
}
export function getMovie(movieID) {
  return http.get(apiEndpoint + "/" + movieID);
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(apiEndpoint + "/" + movie._id, body);
  }
  return http.post(apiEndpoint, movie);
}
export function deleteMovie(movieID) {
  return http.delete(apiEndpoint + "/" + movieID);
}
