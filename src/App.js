import React from 'react'

import './app.css'
import firebase from './firebase'
import Movie from './components/Movie'

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
    const movieRef = firebase.database().ref(`/movies/${movieId}`)
    movieRef.remove()
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-4xl font-bold mb-4">Movie Tracker</h1>

        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-4">Add a movie</h2>

          <form
            className="text-sm"
            onSubmit={this.handleSubmit}
          >
            <div className="flex items-center mb-2">
              <label className="w-32" htmlFor="titleInput">Title</label>
              <input
                id="titleInput"
                className="px-2 leading-6 border border-black rounded focus:outline-none"
                name="movieTitle"
                type="text"
                value={this.state.movieTitle}
                onChange={this.handleChange}
              />
            </div>

            <div className="flex items-center mb-2">
              <label className="w-32" htmlFor="genreInput">Genre</label>
              <input
                id="genreInput"
                className="px-2 leading-6 border border-black rounded focus:outline-none"
                name="movieGenre"
                type="text"
                value={this.state.movieGenre}
                onChange={this.handleChange}
              />
            </div>

            <div className="flex items-center mb-2">
              <label className="w-32" htmlFor="ratingInput">Rating</label>
              <input
                id="ratingInput"
                className="px-2 leading-6 border border-black rounded focus:outline-none"
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
          <h2 className="text-2xl font-semibold">Your movies</h2>

          <ul>
            {this.state.movies.map(movie => {
              return (
                <Movie
                  key={movie.id}
                  movie={movie}
                  removeMovie={this.removeMovie}
                />
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}
