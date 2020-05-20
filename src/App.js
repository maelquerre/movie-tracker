import React from 'react'

import './app.css'
import firebase from './firebase'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      movieTitle: '',
      movieGenre: '',
      movieRating: '',
      movies: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('movies')

    itemsRef.on('value', snapshot => {
      const movies = snapshot.val()
      const stateMovies = []

      for (const movie in movies) {
        stateMovies.push({
          id: movie,
          title: movies[movie].title,
          genre: movies[movie].genre,
          rating: movies[movie].rating
        })
      }
      this.setState({
        movies: stateMovies
      })
    })
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    const moviesRef = firebase.database().ref('movies')
    const movie = {
      title: this.state.movieTitle,
      genre: this.state.movieGenre,
      rating: this.state.movieRating
    }
    moviesRef.push(movie)

    this.setState({
      movieTitle: '',
      movieGenre: '',
      movieRating: ''
    })
  }

  removeMovie(movieId) {
    const movieRef = firebase.database().ref(`/movies/${movieId}`);
    movieRef.remove();
  }

  render() {
    return (
      <div className="container">
        <h1>Movie Tracker</h1>

        <div>
          <h2>Add a movie</h2>

          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Title</label>
              <input
                id="titleInput"
                name="movieTitle"
                type="text"
                value={this.state.movieTitle}
                onChange={this.handleChange}
              />
            </div>

            <div>
              <label>Genre</label>
              <input
                id="genreInput"
                name="movieGenre"
                type="text"
                value={this.state.movieGenre}
                onChange={this.handleChange}
              />
            </div>

            <div>
              <label>Rating</label>
              <input
                id="ratingInput"
                name="movieRating"
                type="text"
                value={this.state.movieRating}
                onChange={this.handleChange}
              />
            </div>

            <button type="submit">Add movie</button>
          </form>
        </div>

        <div>
          <ul>
            {this.state.movies.map(movie => {
              return (
                <li key={movie.id}>
                  <h3>{movie.title}</h3>
                  <div>{movie.genre}</div>
                  <div>{movie.rating}</div>

                  <button onClick={() => this.removeMovie(movie.id)}>Remove movie</button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}
