import React, { useState, useEffect } from "react";
import axios from "axios";

const apiKey = "15d2ea6d0dc1d476efbca3eba2b9bbfb";

const fetchMoviePoster = async (title) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}`
  );

  const posterPath = response.data.results[0]?.poster_path;
  return `http://image.tmdb.org/t/p/w500/${posterPath}`;
};

const Product = ({ product }) => {
  const [posterUrl, setPosterUrl] = useState(null);

  useEffect(() => {
    fetchMoviePoster(product.title).then((url) => setPosterUrl(url));
  }, [product.title]);

  return (
    <div>
      <div className="overflow-hidden w-[300px] aspect-[3/2]">
        <img
          className="w-full"
          src={posterUrl || ""}
          alt={product.title}
          loading="lazy"
        />
      </div>

      <h3 className="text-xl mb-4 text-center">{product.title}</h3>
    </div>
  );
};

export default Product;
