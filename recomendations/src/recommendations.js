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

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0 ? "⭐️" : "";
    return "⭐️".repeat(fullStars) + halfStar;
  };

  const movie = movies.find((m) => m.id === movieId);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white p-8 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6 border-l-4 border-red-600 pl-4">
        Recommandations pour {movie?.title}
      </h2>
      <div className="flex overflow-x-scroll space-x-6 scrollbar-hide py-4">
        {recommendedMovies.map((movie) => (
          <div 
            key={movie.id} 
            className="relative min-w-[200px] max-w-[200px] cursor-pointer transform transition-all duration-300 hover:scale-110 hover:shadow-xl"
          >
            <img 
              src={movie.posterUrl} 
              alt={movie.title} 
              className="rounded-lg shadow-md transition-opacity duration-500 hover:opacity-80"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 flex flex-col justify-end p-4 transition-opacity duration-300">
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              <p className="text-sm text-gray-400">{movie.year}</p>
              <p className="text-yellow-400 text-sm font-bold">
                {renderStars(movie.rating)} ({movie.rating})
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
