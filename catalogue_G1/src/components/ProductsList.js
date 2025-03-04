import React, { useState } from "react";
import Product from "./Product";
import MovieCard from "../../../product_fiche/src/productPreview";
import './styles.css'

export const ProductsList = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (id) => {
    console.log(id);
    setSelectedProduct(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="flex gap-3">
      {products.map((product) => (
        <a
        className="cursor-pointer"
          key={product.id}
          onClick={(e) => {
            handleProductClick(product.id);
          }}
        >
          <Product product={product} />
        </a>
      ))}

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div>
            <MovieCard id={selectedProduct} />
            <button
              className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full"
              onClick={closeModal}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
