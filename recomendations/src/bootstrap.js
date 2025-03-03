import React from 'react';
import { createRoot } from 'react-dom/client';
import Recommendations from './recommendations';
import data from "../../db/efreiflix-db.json";

const mount = (el) => {
  const root = createRoot(el);
  root.render(
    <div>
      {data.recommendations.map((rec) => (
        <Recommendations
          movieId={rec.movieId}
          movies={data.movies}
          recommendations={data.recommendations}
        />
      ))}
    </div>
  );
  return root;
};

// If we are in development and running in isolation,
// mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#root');
  if (devRoot) {
    mount(devRoot);
  }
}

// We are running through the shell
export { mount }; 