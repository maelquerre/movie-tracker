import React from 'react'

export default function Movie(props) {
  return (
    <li>
      <h3 className="text-lg leading-none">{props.movie.title}</h3>
      <div className="text-sm text-gray-500">{props.movie.genre}</div>
      <div>{props.movie.rating}</div>

      <button onClick={() => props.removeMovie(props.movie.id)}>Remove</button>
    </li>
  )
}
