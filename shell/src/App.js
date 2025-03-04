import React, { Suspense } from 'react';

// Wrap imports in try-catch to handle potential loading errors
const lazyLoad = (importFn, fallback) => {
  try {
    return React.lazy(importFn);
  } catch (error) {
    console.error("Failed to load module:", error);
    return () => fallback;
  }
};

// Only load Catalogue MFE
const Catalogue = lazyLoad(() => import('catalogue_G1/Catalogue'), 
  <div className="p-4 bg-red-900 rounded">Le catalogue n'a pas pu être chargé.</div>);

// Error boundary component for handling loading errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("MFE loading error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-900 rounded">
          <h3 className="text-xl font-bold mb-2">Erreur de chargement</h3>
          <p>{this.props.fallback || "Une erreur est survenue lors du chargement du composant."}</p>
          <button 
            className="mt-4 px-4 py-2 bg-white text-red-900 rounded font-bold"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Réessayer
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading placeholder component
const LoadingPlaceholder = ({ text }) => (
  <div>
    <div className="flex gap-4 overflow-x-auto py-5">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="min-w-[200px] h-[300px] bg-gray-800 rounded animate-pulse"></div>
      ))}
    </div>
    <div className="text-center mt-4">{text || 'Chargement...'}</div>
  </div>
);

const App = () => {
  return (
    <div className="bg-[#141414] text-white min-h-screen font-sans">
      {/* Simplified header */}
      <header className="bg-black/80 px-8 py-4 flex items-center sticky top-0 z-50 shadow-md">
        <div className="text-[#E50914] font-bold text-3xl">
          EFREIFlix
        </div>
      </header>

      <main className="p-8">
        {/* Hero banner section */}
        <section className="mb-12 relative h-[400px] rounded-lg overflow-hidden bg-gradient-to-b from-black/10 to-[#141414] bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/c31c3123-3df7-4359-8b8c-475bd2d9925d/15feb590-3d73-45e9-9e4a-2eb334c33cbb/FR-en-20231225-popsignuptwoweeks-perspective_alpha_website_large.jpg')] bg-cover bg-center flex flex-col justify-end p-8">
          <h1 className="text-5xl m-0 mb-4">Bienvenue sur EFREIFlix</h1>
          <p className="text-xl max-w-[600px] mb-6">
            Découvrez notre sélection de films et séries.
          </p>
        </section>

        {/* Catalogue section - only section displayed */}
        <section className="mb-12">
          <h2 className="text-2xl mb-6">Catalogue</h2>
          <ErrorBoundary fallback="Erreur lors du chargement du catalogue.">
            <Suspense fallback={<LoadingPlaceholder text="Chargement du catalogue..." />}>
              <Catalogue />
            </Suspense>
          </ErrorBoundary>
        </section>
      </main>

      {/* Simplified footer */}
      <footer className="p-8 bg-black/80 text-gray-400 text-sm">
        <div className="max-w-7xl mx-auto">
          <p>© 2023 EFREIFlix. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;