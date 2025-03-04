import React from "react";
import Product from "./Product";

export const ProductsList = ({ products }) => {
  return (
    <div className="flex gap-3">
      {products.map((product) => (
        <a key={product.id} href="">
          <Product product={product} />
        </a>
      ))}
    </div>
  );
};
