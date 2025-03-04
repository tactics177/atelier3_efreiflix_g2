import React, { Suspense } from 'react';

// Remove header import
// const Header = React.lazy(() => import('header/Header'));
// We'll use the real MFEs instead of the skeleton
// const Skeleton = React.lazy(() => import('skeleton/Skeleton'));
const Catalogue = React.lazy(() => import('catalogue_G1/Catalogue'));
const Watchlist = React.lazy(() => import('watchlist/Watchlist'));
const Notation = React.lazy(() => import('notation/Notation'));

// Error boundary component for handling loading errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("MFE loading error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div style={{ padding: '1rem', backgroundColor: '#550000', borderRadius: '4px' }}>
        {this.props.fallback || "Une erreur est survenue lors du chargement du composant."}
      </div>;
    }

    return this.props.children;
  }
}

// Loading placeholder component
const LoadingPlaceholder = ({ text }) => (
  <div>
    <div className="netflix-row">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="netflix-card"></div>
      ))}
    </div>
    <div style={{ textAlign: 'center', marginTop: '1rem' }}>{text || 'Chargement...'}</div>
  </div>
);

const App = () => {
  return (
    <div style={{ 
      backgroundColor: '#141414', 
      color: 'white', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Netflix-like header */}
      <header style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ 
          color: '#E50914', 
          fontWeight: 'bold', 
          fontSize: '2rem' 
        }}>
          EFREIFlix
        </div>
        <nav style={{ marginLeft: 'auto' }}>
          <ul style={{ 
            display: 'flex', 
            listStyle: 'none', 
            gap: '1.5rem',
            margin: 0,
            padding: 0
          }}>
            <li style={{ cursor: 'pointer' }}>Accueil</li>
            <li style={{ cursor: 'pointer' }}>Films</li>
            <li style={{ cursor: 'pointer' }}>Séries</li>
            <li style={{ cursor: 'pointer' }}>Ma Liste</li>
          </ul>
        </nav>
      </header>

      <main style={{ padding: '2rem' }}>
        {/* Hero banner section */}
        <section style={{ 
          marginBottom: '3rem', 
          position: 'relative',
          height: '400px',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(20,20,20,1)), url("https://assets.nflxext.com/ffe/siteui/vlv3/c31c3123-3df7-4359-8b8c-475bd2d9925d/15feb590-3d73-45e9-9e4a-2eb334c33cbb/FR-en-20231225-popsignuptwoweeks-perspective_alpha_website_large.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '2rem'
        }}>
          <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0' }}>Bienvenue sur EFREIFlix</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '600px', marginBottom: '1.5rem' }}>
            Découvrez notre sélection de films et séries. Notez vos favoris et ajoutez-les à votre liste personnalisée.
          </p>
        </section>

        {/* Main content area with catalogue */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Catalogue</h2>
          <ErrorBoundary fallback="Erreur lors du chargement du catalogue.">
            <Suspense fallback={<LoadingPlaceholder text="Chargement du catalogue..." />}>
              <Catalogue />
            </Suspense>
          </ErrorBoundary>
        </section>

        {/* Watchlist section */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Ma Liste</h2>
          <ErrorBoundary fallback="Erreur lors du chargement de la watchlist.">
            <Suspense fallback={<LoadingPlaceholder text="Chargement de la watchlist..." />}>
              <Watchlist />
            </Suspense>
          </ErrorBoundary>
        </section>

        {/* Notation section */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Notations</h2>
          <ErrorBoundary fallback="Erreur lors du chargement des notations.">
            <Suspense fallback={<LoadingPlaceholder text="Chargement des notations..." />}>
              <Notation movieId={1} />
            </Suspense>
          </ErrorBoundary>
        </section>
      </main>

      {/* Netflix-like footer */}
      <footer style={{ 
        padding: '2rem', 
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: '#757575',
        fontSize: '0.9rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p>© 2023 EFREIFlix. Tous droits réservés.</p>
          <div style={{ 
            display: 'flex', 
            gap: '2rem',
            marginTop: '1rem'
          }}>
            <div>Conditions d'utilisation</div>
            <div>Confidentialité</div>
            <div>Aide</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;