import { useEffect, useState } from "react";
import { average, Button, Load} from "./App";
import StarRating from "./StarRating";


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
    ))
    }
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
     <> 
     <h2>Movies you watched</h2>
      <div>
          <p>
            <span>#️⃣</span>
            <span>{watched.length} movies</span>
          </p>
          <p>
            <span>⭐️</span>
            <span>{avgImdbRating.toFixed(2)}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{avgUserRating.toFixed(2)}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{avgRuntime.toFixed(2)} min</span>
          </p>
      </div> 
      </> )
       : (<h2>{watched.title}</h2>)}
    </div>
  )
  
}


export function WatchedList({ watched, onDeleteWatched }) {

  return(
    <ul className="list">
      {watched.map((movie) => (
        <li key={movie.imdbID}>
          <img src={movie.poster} alt={`${movie.title} poster`} />
          <h3>{movie.title}</h3>
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
            <button className="btn-delete" onClick={() => onDeleteWatched(movie.imdbID)}> X </button>
          </div>
        </li>
      ))}
    </ul>
  )
  
}




export function MovieSelected({selectedId, handleBackButton, onAddWatched, watched}){
  const KEY = "456851c1";
  const [movie, setMovie] = useState({});
  const [loading, setloading] = useState(false);
  const [userRating, setuserRating] = useState("");
  

  function handleWatchedMovie(){
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split("").at(0)),
      userRating,
    }
    onAddWatched(newWatchedMovie);
    handleBackButton();
  }

  const exists = (watched.some(obj => Object.values(obj).includes(selectedId)));

  const userRatingFromWatched = watched.find((x) => x.imdbID === selectedId)?.userRating;

  
  const {
    Title: title, 
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    Awards: awards,
  } = movie;


 

  useEffect(function () {
    async function fetchSelectedID() {
      try {
        setloading(true)
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );

        const data = await res.json();

        setMovie(data);

      } finally{
        setloading(false);
      }
    }

    fetchSelectedID();
  }, [selectedId]);


  useEffect(function () {
    if(!title) return;
    document.title =`${title}` 

    return function () {
      document.title =`UsePopCorn`
    };
  }, [title])

  return ( 
    <div className="details">
       {
        loading ? <Load /> :
        <>
        <header>
            <button className="btn-back" onClick={handleBackButton}>&larr;</button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview ">
                <h2>{title}</h2>
                <p>
                  {released} &bull; {runtime}
                </p>
                <p>{genre}</p>
                  { exists  ?
                    (
                      <p>
                        <span>⭐</span>
                          {userRatingFromWatched} IMDb rating
                      </p>
                    )
                    : 
                    (
                      <p>
                        <span>⭐</span>
                          {imdbRating} IMDb rating
                      </p>
                    )
                  }  
            </div>
        </header>
         <section>
            { !exists &&
               <div className="rating">
                    <StarRating maxRating={10} size={24} onSetRating={setuserRating}/>
                   {userRating > 0 && <button className="btn-add" onClick={handleWatchedMovie}>+ Add to list</button>}
               </div>
            }
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
            <p>Awards: {awards}</p>
          </section> 
        </>   
      }
        {/* <div>{selectedId}</div> */}
    </div>
    
  ) 
}  