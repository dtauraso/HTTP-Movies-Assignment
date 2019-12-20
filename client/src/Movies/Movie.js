import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };
  componentDidUpdate(prevProps) {
    console.log("item was updated", prevProps)
    // Typical usage (don't forget to compare props):
    if (this.props.userID !== prevProps.userID) {
      // this.fetchData(this.props.userID);
    }
  }
  deleteMovie = (e, id) => {
    e.preventDefault();
    console.log(id)
    axios
      .delete(`http://localhost:5000/api/movies/${this.props.match.params.id}`)
      .then(res => {
        // have to reload the page
        console.log("deleted result", res.data)

        // console.log(this.props.match.params.id)
        // console.log(this.props.savedList)
        // this.props.savedList.forEach(savedMovie => {
        //   console.log(savedMovie.id, this.props.match.params.id, savedMovie.id === this.props.match.params.id)
        // })
        // console.log(newList)
        // console.log(x.filter(savedMovie => savedMovie.id < this.props.match.params.id))
        // this.props.match.params.id is a string and savedMovie.id is an int
        this.props.setSavedList(
            this.props.savedList.filter(savedMovie => savedMovie.id !== parseInt(this.props.match.params.id)))
        // this.props.setSavedList(newList)
        // console.log("delete saved list", this.props.savedList)
        this.props.updateMovies(res.data)
        // this.setState({movie: null})
        this.props.history.push(`/`);

      })
      .catch(err => {
        console.log(err)
      })

  }
  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <button className="md-button" onClick={(e) => {
          e.preventDefault();
          this.props.history.push(`/update-movie/${this.state.movie.id}`);
        }}>
        Edit
      </button>
      <button className="md-button" onClick={(e) => {
        this.deleteMovie(e, this.state.movie.id)
        }}>
        Delete
      </button>
      </div>
    );
  }
}
