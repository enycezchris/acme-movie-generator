import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { deleteMovie, updateMovie } from "../store/movies";

const Movies = ({ movies, deleteMovie, increment }) => {
  const [rate, setRate] = useState(3);
  useEffect(() => {
    console.log("Clicked!", movies);
  }, [movies]);
  return (
    <div>
      <h1> Movies </h1>
      <ul>
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              {movie.name}
              <br></br>
              (Rating: {movie.rating})<br></br>
              <button
                className="increment-button"
                onClick={() => increment(movie, 1)}
              >
                {" "}
                +{" "}
              </button>
              <button
                className="increment-button"
                onClick={() => increment(movie, -1)}
              >
                {" "}
                -{" "}
              </button>
              <br></br>
              <button onClick={() => deleteMovie(movie)}> Delete </button>
            </li>
          );
        })}
      </ul>
      <div>
        <h3>
          {console.log("length", movies.length)}
          Average Rating of all Movies is : (
          {movies.reduce(
            (total, movie) => Math.floor(movie.rating + total / movies.length ),
            0
          )}
          )
        </h3>
      </div>
    </div>
  );
};
const mapState = (state) => {
  return {
    movies: state.movies,
  };
};
const mapDispatch = (dispatch) => {
  return {
    deleteMovie: (movie) => {
      dispatch(deleteMovie(movie));
    },
    updateMovie: (movie, movieId) => {
      movie = { ...movie, movieId: movieId * 1 };
      dispatch(updateMovie(movie));
    },
    increment: (movie, direction) => {
      movie = { ...movie, rating: movie.rating + direction };
      dispatch(updateMovie(movie));
    },
  };
};
export default connect(mapState, mapDispatch)(Movies);
