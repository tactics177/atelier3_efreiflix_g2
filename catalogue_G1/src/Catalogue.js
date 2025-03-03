import React from 'react';
import './styles.css';
import Product from './components/Product';

const Catalogue = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Catalogue MFE</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <Product product={{name: "Product 1", image: "https://occ-0-56-55.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABS60wkIyJE-j7KLsjILo9JH9TWyJ4ZsVC5ZrJySxR_A4w3BQp4Ihccg4VTTzjctfOTTIzjXAty8qfY_gNTVM687gpFUVG9FEgSALaNrWldiGRHNuc2Ki_H0ukVvirydEoITJ.jpg?r=ea2"}} />
      </div>
    </div>
  );
};

export default Catalogue; 