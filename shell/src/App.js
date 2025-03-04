import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

// Importation des composants paresseux
const Catalogue = React.lazy(() => import('catalogue_G1/Catalogue'));
const Watchlist = React.lazy(() => import('watchlist/Watchlist'));
const Notation = React.lazy(() => import('notation/Notation'));

// Définition du composant ErrorBoundary
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

// Composant de chargement
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
  const [activeSection, setActiveSection] = React.useState('home');

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify({ id: 1, profileId: 1 }));
  }, []);

  return (
    <Router>
      <div style={{
        backgroundColor: '#141414',
        color: 'white',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif'
      }}>
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
            <Link to="/">EFREIFlix</Link>
          </div>
          <nav style={{ marginLeft: 'auto' }}>
            <ul style={{
              display: 'flex',
              listStyle: 'none',
              gap: '1.5rem',
              margin: 0,
              padding: 0
            }}>
              <li><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Accueil</Link></li>
              <li><Link to="/films" style={{ color: 'white', textDecoration: 'none' }}>Films</Link></li>
              <li><Link to="/series" style={{ color: 'white', textDecoration: 'none' }}>Séries</Link></li>
              <li>
                <Link to="/ma-liste" style={{ color: 'white', textDecoration: 'none' }}>Ma Liste</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main style={{ padding: '2rem' }}>
          <Routes>
            <Route path="/" element={
              <>
                <h1>Bienvenue sur EFREIFlix</h1>
                <section style={{ marginBottom: '3rem' }}>
                  <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Catalogue</h2>
                  <ErrorBoundary fallback="Erreur lors du chargement du catalogue.">
                    <Suspense fallback={<LoadingPlaceholder text="Chargement du catalogue..." />}>
                      <Catalogue />
                    </Suspense>
                  </ErrorBoundary>
                </section>
                <section style={{ marginBottom: '3rem' }}>
                  <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Ma Liste</h2>
                  <ErrorBoundary fallback="Erreur lors du chargement de la watchlist.">
                    <Suspense fallback={<LoadingPlaceholder text="Chargement de la watchlist..." />}>
                      <Watchlist />
                    </Suspense>
                  </ErrorBoundary>
                </section>
                <section style={{ marginBottom: '3rem' }}>
                  <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Notations</h2>
                  <ErrorBoundary fallback="Erreur lors du chargement des notations.">
                    <Suspense fallback={<LoadingPlaceholder text="Chargement des notations..." />}>
                      <Notation movieId={1} />
                    </Suspense>
                  </ErrorBoundary>
                </section>
              </>
            } />
            <Route path="/films" element={<div style={{ height: '100vh', backgroundColor: 'black' }}></div>} />
            <Route path="/series" element={<div style={{ height: '100vh', backgroundColor: 'black' }}></div>} />
            <Route path="/ma-liste" element={
              <div style={{ padding: '2rem' }}>
                <h1>Ma Liste</h1>
                <ErrorBoundary fallback="Erreur lors du chargement de la watchlist.">
                  <Suspense fallback={<LoadingPlaceholder text="Chargement de la watchlist..." />}>
                    <Watchlist />
                  </Suspense>
                </ErrorBoundary>
              </div>
            } />
          </Routes>
        </main>

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
    </Router>
  );
};

export default App;
