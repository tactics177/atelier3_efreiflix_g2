import React, { useEffect, useState } from "react";
import axios from "axios";
import { ProductsList } from "./components/ProductsList";
import "./styles.css";

function groupMoviesByCategory(movies) {
  // Initialize an empty object to store movies by genre
  const moviesByGenre = {};

  // Loop through each movie
  movies.forEach((movie) => {
    // Loop through each genre of the movie
    movie.genres.forEach((genre) => {
      // If the genre doesn't exist as a key yet, create an empty array
      if (!moviesByGenre[genre]) {
        moviesByGenre[genre] = [];
      }

      // Add the movie to the array corresponding to the genre
      moviesByGenre[genre].push({
        id: movie.id,
        title: movie.title,
        year: movie.year,
        description: movie.description,
        posterUrl: movie.posterUrl,
        trailerUrl: movie.trailerUrl,
        rating: movie.rating,
        genres: movie.genres,
      });
    });
  });

  return moviesByGenre;
}

const Catalogue = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3001/movies")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, []);

  const moviesByGenre = groupMoviesByCategory(products);

  return (
    <div className="rounded-lg p-6">
      <div className="pb-6">
        <h1 className="text-2xl font-semibold">Only on Efreiflix</h1>
        <p>Efreiflix is the home of amazing original programming that you can’t find anywhere else. Movies, TV shows, specials and more, all tailored specifically to you.</p>
      </div>
      {Object.entries(moviesByGenre).map(([genre, movies]) => (
        <div key={genre}>
          <h2 className="text-2xl font-semibold mb-2">{genre}</h2>
          <ProductsList products={movies} />
        </div>
      ))}
    </div>
  );
};

export default Catalogue;
