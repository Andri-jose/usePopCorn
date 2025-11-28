import { useEffect, useState } from "react";
import { Nav } from "./Nav";
import { MovieSelected } from "./MovieSelected";
import {WatchedList} from "./WatchedList";
import { MoviesWatchedDetail } from "./MoviesWatchedDetail";
import { Box } from "./Box";
import MovieList from "./MovieList";



export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export function Button({children, onClick}){
  return <button className="btn-toggle" onClick={onClick}>{children}</button>
}

 

export default function App() {
  const [movies, setMovies] = useState([]);
  const [selectedId, setselectedId] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(false);
  const [watched, setWatched] = useState([]);
  
function handleMovie(movie) {
  setselectedId((x) => (x === movie ? "" : movie));
}  

function handleBackButton(){
  setselectedId(null);
}

function handleAddWatched(x) {
  setWatched(watched => [...watched, x]); 
}

function handleDeleteWatched(id) {
  setWatched(watched => watched.filter((movie) => movie.imdbID !== id));
}

useEffect(function() {
  document.addEventListener("keydown", function (e) {
    if (e.code === "Escape") {
      handleBackButton();
    }
  });
}, []);


  return (
    <>
      <Nav movies={movies} query={query} setQuery={setQuery}/>
      <main className="main">
        <MovieList 
        query={query}
        movies={movies} 
        setMovies={setMovies} 
        loading={loading}
        setloading={setloading}
        error={error}
        setError={setError}
        handleMovie={handleMovie}
        />
        <Box>
          { selectedId ? <MovieSelected watched={watched} selectedId={selectedId} handleBackButton={handleBackButton} onAddWatched={handleAddWatched} /> 
            : 
          <>
            <MoviesWatchedDetail watched={watched} handleMovie={handleMovie} />
            <WatchedList watched={watched} onDeleteWatched={handleDeleteWatched}/>
          </> 
          }
          
        </Box>
      </main>
      
    </>
  );
}

