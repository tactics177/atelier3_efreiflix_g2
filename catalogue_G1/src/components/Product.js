import React from 'react';

const Product = ({ product }) => {
  return (
    <div className="p-4 max-w-[400px]">
        <img className='w-full' src={product.image} alt={product.name} />   
        <h2 className="text-xl mb-4 text-center">{product.name}</h2>
    </div>
  );
};

export default Product;