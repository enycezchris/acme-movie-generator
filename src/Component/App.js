import React, { Component } from "react";
import Movies from "./Movies";
import { connect } from "react-redux";
import axios from "axios";
import { createMovie } from "../store/movies";

class App extends Component {
  async componentDidMount() {
    this.props.load();
  }

  render() {
    return (
      <div>
        <Movies />
        <button onClick={this.props.createMovie}>Generate Movie</button>
      </div>
    );
  }
}

const mapState = ({ movies }) => {
  return {
    movies,
  };
};

const mapDispatch = (dispatch) => {
  return {
    load: async () => {
      const response = await axios.get("/api/movies");
      const movies = response.data;
      dispatch({ type: "GET_MOVIES", movies });
    },
    createMovie: () => {
      dispatch(createMovie());
    },
  };
};

export default connect(mapState, mapDispatch)(App);
