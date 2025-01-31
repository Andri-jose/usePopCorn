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


export function Box({ children }){

  const [isOpen, setIsOpen] = useState(true);

  return(
      <div className="box">
            <Button
              onClick={() => setIsOpen((open) => !open)}
            >
              {isOpen ? "–" : "+"}
            </Button>
            {isOpen && ( children
             
            )}
      </div>
  
  )
  
}




export function MoviesDetail({movies, handleMovie}){
  return(
    <ul className="list list-movies">
    {movies?.map((movie) => (
      <li key={movie.imdbID} onClick={() => handleMovie(movie.imdbID)}>
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



export function MoviesWatchedDetail({watched, handleMovie}){
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));




  return(
    <div className="summary">
      {handleMovie ? (
     <> <h2>Movies you watched</h2>
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
      </div> </> )
       : (<h2>{watched.title}</h2>)}
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
