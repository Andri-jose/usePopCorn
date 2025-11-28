import { useEffect } from 'react';
import { MoviesDetail } from './MoviesDetail';
import { Load } from './Load';
import { ErrorMessage } from './ErrorMessage';


const KEY = "456851c1";

export default function MovieList({movies, setMovies, query, loading, setloading, error, setError, handleMovie}) {
  

  useEffect(function () {
    const controller = new AbortController();
    async function fetchMovies() {
     try {
      setloading(true)
      setError("")
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
        {signal: controller.signal}
      );

      if(!res.ok) 
        throw new Error("something went wrong");

      const data = await res.json();
      if(data.Response === "False") throw new Error("Movie not found!");
      setMovies(data.Search);
      console.log(data)
     
      setError("")
      } catch (error) {

        if(error.name !== "AbortError"){
          setError(error.message); 
        }
        
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

    return function(){
      controller.abort();
    };

  }, [query]);

  
  
    return (
        <div className="box .firstBox">
            <div>
                {!loading && !error && <MoviesDetail movies={movies} handleMovie={handleMovie}/>}
                {loading && <Load/>}
                {error && <ErrorMessage message={error} />}
            </div>
        </div>
    );
}