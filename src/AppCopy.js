import { useEffect, useState } from "react";
import { tempMovieData, tempWatchedData } from "./tempMovieData";
import { Nav, NumResults, Search, Logo } from "./Nav";
import { Main, Box, WatchedList, MoviesDetail, MoviesWatchedDetail } from "./Main";



export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export function Button({children, onClick}){
  return <button className="btn-toggle" onClick={onClick}>{children}</button>
}

const KEY = "456851c1"

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const query = "fvvsd";
  const [loading, setloading] = useState(null);
  const [error, setError] = useState(false);

  useEffect(function () {
    async function fetchMovies() {
     try {setloading(true)
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
      );

      if(!res.ok) 
        throw new Error("something went wrong");

      const data = await res.json();
      if(data.Response === "False") throw new Error("Movie not found!");
      setMovies(data.Search);
      

      } catch (error) {
        setError(error.message)
        console.log(error.message)
      } finally{
        setloading(false);
      }
    }
    fetchMovies();
  }, []);
  

  return (
    <>
       <Nav>
          <Logo />
          <Search />
          <NumResults movies={movies} />  
       </Nav>
      <Main>
        <Box>
          {!loading && !error && <MoviesDetail movies={movies}/>}
          {loading && <Load/>}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          <MoviesWatchedDetail watched={watched}/>
          <WatchedList watched={watched}/> 
        </Box>
      </Main>
      
    </>
  );
}


function Load(){
  return <p className="loader">Loading...</p>
}

function ErrorMessage({message}){
  return <p className="error"><span>❌</span> {message}</p>
}