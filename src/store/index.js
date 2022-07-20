import axios from "axios";
import { createStore, combineReducers, applyMiddleware } from "redux";
import loggingMiddleware from "redux-logger";
import thunk from "redux-thunk";

const initialState = {
  movies: [],
};

const moviesReducer = (state = [], action) => {
  if (action.type === "GET_MOVIES") {
    return action.movies;
  }
  if (action.type === "CREATE_MOVIE") {
    return [...state, action.movie];
  }
  if (action.type === "DELETE_MOVIE") {
    return state.filter((movie) => movie.id !== action.movie.id);
  }
  if (action.type === "UPDATE_MOVIE") {
    return state.map((movie) =>
      movie.id !== action.movie.id ? movie : action.movie
    );
  }

  return state;
};

const reducer = combineReducers({
  movies: moviesReducer,
});

export default createStore(reducer, applyMiddleware(thunk, loggingMiddleware));
