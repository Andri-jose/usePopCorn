import { useState } from "react";
import { tempMovieData, tempWatchedData } from "./tempMovieData";
import { Nav } from "./Nav";
import { Movies } from "./Movies";
import { MoviesWatched } from "./MoviesWatched";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  

  return (
    <>
       <Nav movies={movies}/>
      <main className="main">
        <Movies movies={movies}/>
        <MoviesWatched watched={watched}/>
      </main>
    </>
  );
}



