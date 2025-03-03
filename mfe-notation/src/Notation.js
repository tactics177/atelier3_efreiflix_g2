import React, {useEffect} from 'react';
import './styles.css';

const Notation = ({ movieId }) => {
    const [rating, setRating] = React.useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/movies/${movieId}`)
            .then((res) => res.json())
            .then((data) => {
                setRating(data.rating);
            });
    }, [movieId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notation MFE</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-700">
            {rating && <span>Rating: {rating}</span>}
        </p>
      </div>
    </div>
  );
};

export default Notation;