import { useState } from "react";
import { average } from "./App";
import { Button } from "./App";


export function Main({children}){
  return(
    <main className="main">
      {children}
    </main>
  )
}


export function Movies({ children }){

  const [isOpen1, setIsOpen1] = useState(true);

  return(
      <div className="box">
            <Button
              onClick={() => setIsOpen1((open) => !open)}
            >
              {isOpen1 ? "–" : "+"}
            </Button>
            {isOpen1 && ( children
             
            )}
      </div>
  
  )
  
}


export function MoviesDetail({movies}){
  return(
    <ul className="list">
    {movies?.map((movie) => (
      <li key={movie.imdbID}>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>🗓</span>
            <span>{movie.Year}</span>
          </p>
        </div>
      </li>
    ))}
  </ul>
  )
  
}

export function MoviesWatched({ children, watched }) {

  const [isOpen2, setIsOpen2] = useState(true);

  

  return (
    <div className="box">
        <Button
          onClick={() => setIsOpen2((open) => !open)}
        >
          {isOpen2 ? "–" : "+"}
        </Button>
        {isOpen2 && (
          <>
            {children}
          </>
            )}
          </div>

  )
  
}

export function MoviesWatchedDetail({watched}){
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return(
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
          <p>
            <span>#️⃣</span>
            <span>{watched.length} movies</span>
          </p>
          <p>
            <span>⭐️</span>
            <span>{avgImdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{avgUserRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{avgRuntime} min</span>
          </p>
      </div>
  </div>
  )
  
}


export function WatchedList({ watched }) {

  return(
    <ul className="list">
      {watched.map((movie) => (
        <li key={movie.imdbID}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
  
}
