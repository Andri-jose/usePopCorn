import { useEffect, useState } from "react";
import { Load } from "./Load";
import StarRating from "./StarRating";


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