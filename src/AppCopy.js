import { useEffect, useState } from "react";
import { tempMovieData, tempWatchedData } from "./tempMovieData";
import { Nav, NumResults, Search, Logo } from "./Nav";
import { Main, Box, WatchedList, MoviesDetail, MoviesWatchedDetail, MovieSelected } from "./Main";



export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export function Button({children, onClick}){
  return <button className="btn-toggle" onClick={onClick}>{children}</button>
}
 
export function Load(){
  return <p className="loader">Loading...</p>
}

const KEY = "456851c1";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setselectedId] = useState("");
 

function ErrorMessage({message}){
  return <p className="error"><span>❌</span> {message}</p>
}

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


  useEffect(function () {
    async function fetchMovies() {
     try {
      setloading(true)
      setError("")
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
      );

      if(!res.ok) 
        throw new Error("something went wrong");

      const data = await res.json();
      if(data.Response === "False") throw new Error("Movie not found!");
      setMovies(data.Search);
      console.log(data)
     

      } catch (error) {
        setError(error.message)
        
      } finally{
        setloading(false);
      }
    }

    if(!query.length){
      setMovies([]);
      setError("");
      return
    }

    fetchMovies();
  }, [query]);
  

  return (
    <>
       <Nav>
          <Logo />
          <Search query={query} setQuery={setQuery}/>
          <NumResults movies={movies} />  
       </Nav>
      <Main>
        <Box>
          {!loading && !error && <MoviesDetail movies={movies} handleMovie={handleMovie}/>}
          {loading && <Load/>}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          { selectedId ? <MovieSelected watched={watched} selectedId={selectedId} handleBackButton={handleBackButton} onAddWatched={handleAddWatched} /> 
            : 
          <>
            <MoviesWatchedDetail watched={watched} handleMovie={handleMovie} />
            <WatchedList watched={watched} onDeleteWatched={handleDeleteWatched}/>
          </> 
          }
          
        </Box>
      </Main>
      
    </>
  );
}

