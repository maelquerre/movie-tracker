import React from 'react'

export default function Movie(props) {
  return (
    <li className="flex items-center justify-between py-2 border-b border-gray-300">
      <div>
        <h3 className="text-lg font-medium leading-none">{props.movie.title}</h3>
        <div className="text-sm text-gray-600">{props.movie.genre}</div>
      </div>

      <div>{props.movie.rating}</div>

      <button className="px-2 leading-6 text-sm border border-gray-400 hover:border-black rounded"
              onClick={() => props.remove(props.movie.id)}>
        Remove
      </button>
    </li>
  )
}
