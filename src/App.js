import { useState } from "react";
import { tempMovieData, tempWatchedData } from "./tempMovieData";
import { Nav, NumResults, Search, Logo } from "./Nav";
import { Main, Movies, MoviesWatched, WatchedList, MoviesDetail, MoviesWatchedDetail } from "./Main";



export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export function Button({children, onClick}){
  return <button className="btn-toggle" onClick={onClick}>{children}</button>
}

export default function App() {
  
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  

  return (
    <>
       <Nav>
          <Logo />
          <Search />
          <NumResults movies={movies} />  
       </Nav>
      <Main>
        <Movies>
          <MoviesDetail movies={movies}/>
        </Movies>
        <MoviesWatched>
          <WatchedList watched={watched}/>
          <MoviesWatchedDetail watched={watched}/>
        </MoviesWatched>
      </Main>
      
    </>
  );
}



