import React, { useState, useEffect } from "react";
import axios from "axios";

import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie"

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const [movies, setMovies] = useState([])
  useEffect(() => {
    axios
    .get("http://localhost:5000/api/movies")
    // no setState
    .then(res => {
      console.log(res)
      // the newly set movies is not getting sent to MovieList
      setMovies(res.data)})
    .catch(err => console.log(err.response));
  }, []);

  return (
    <>
      <SavedList list={savedList} />
      <Route
        exact path="/"
        // component={MovieList}
        render={props => {
          return <MovieList {...props} movieList={movies} />
        }}
        />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route
        path="/update-movie/:id"
        render={props => {
          return <UpdateMovie {...props} movies={movies} updateMovies={setMovies} />
        }}
      />
    </>
  );
};

export default App;
