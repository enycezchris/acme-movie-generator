import { faker } from "@faker-js/faker";
import axios from "axios";
import { connect } from "react-redux";

const CREATE_MOVIE = "CREATE_MOVIE";
const DELETE_MOVIE = "DELETE_MOVIE";
const UPDATE_MOVIE = "UPDATE_MOVIE";

const _createMovie = (movie) => {
  return {
    type: CREATE_MOVIE,
    movie,
  };
};

const _deleteMovie = (movie) => {
  return {
    type: DELETE_MOVIE,
    movie,
  };
};

const _updateMovie = (movie) => {
  return {
    type: UPDATE_MOVIE,
    movie,
  };
};

export const createMovie = () => {
  return async (dispatch) => {
    // console.log("Create_dispatch", dispatch);
    const response = await axios.post("/api/movies", {
      name: faker.music.songName(),
    });
    const movie = response.data;
    dispatch(_createMovie(movie));
  };
};

export const deleteMovie = (movie) => {
  return async (dispatch) => {
    // console.log("Delete_dispatch", dispatch);
    await axios.delete(`/api/movies/${movie.id}`);
    dispatch(_deleteMovie(movie));
  };
};

export const updateMovie = (movie) => {
  return async (dispatch) => {
    // console.log("Update_dispatch", dispatch);
    movie = (await axios.put(`/api/movies/${movie.id}`, movie)).data;
    dispatch(_updateMovie(movie));
  };
};
