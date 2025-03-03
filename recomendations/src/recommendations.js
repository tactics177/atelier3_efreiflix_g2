import React from "react";

const Recommendations = ({ movieId, movies, recommendations }) => {
  // Trouver les recommandations du film
  const recommendedMovieIds = recommendations.find(
    (rec) => rec.movieId === movieId
  )?.recommendedMovieIds;

  // Récupérer les films recommandés
  const recommendedMovies = movies.filter((movie) =>
    recommendedMovieIds?.includes(movie.id)
  );

  const movie = movies.find((m) => m.id === movieId);

  return (
    <div className="recommendations">
      <h2>Recommandations pour {movie?.title}</h2>
      <div className="movie-list">
        {recommendedMovies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <img src={movie.posterUrl} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <a href={movie.trailerUrl} target="_blank" rel="noopener noreferrer">
              Voir la bande-annonce
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
