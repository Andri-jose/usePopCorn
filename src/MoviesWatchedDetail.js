import { average } from "./App";



export function MoviesWatchedDetail({ watched, handleMovie }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));


  return (
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
        </>)
        : (<h2>{watched.title}</h2>)}
    </div>
  );

}
