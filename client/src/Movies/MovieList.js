import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

// has to be functional component so the App's useEffect will work with it
const MovieList = (props) => {
  

  // componentDidMount() {
  //   console.log("movies from app", this.props.movieList)
  //   this.setState({movies: this.props.movieList})
  //   // axios
  //   //   .get("http://localhost:5000/api/movies")
  //   //   .then(res => this.setState({ movies: res.data }))
  //   //   .catch(err => console.log(err.response));
  // }

  // render() {
    // console.log("movies!", props.movieList)
    return (
      <div className="movie-list">
        {props.movieList.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
      </div>
    );
  // }
}

export default MovieList;

function MovieDetails({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} />
    </Link>
  );
}
