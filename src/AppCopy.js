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
  const query = "interstellar";

  useEffect(function () {
    async function fetchMovies() {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
      );
      const data = await res.json();
      setMovies(data.Search);
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
          <MoviesDetail movies={movies}/>
        </Box>
        <Box>
          <MoviesWatchedDetail watched={watched}/>
          <WatchedList watched={watched}/> 
        </Box>
      </Main>
      
    </>
  );
}



