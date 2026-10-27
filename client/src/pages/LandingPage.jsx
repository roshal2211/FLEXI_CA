import { Link } from 'react-router-dom';

const features = [
  'Follow your interests to unexpected discoveries',
  'Jump across science, history, nature, and more',
  'Save fascinating topics for another day',
  'Find a new thread whenever curiosity strikes'
];

export default function LandingPage() {
  return (
    <div className="landing-page">
      <header className="topbar">
        <Link to="/" className="topbar-brand">Curio</Link>
        <div className="topbar-actions">
          <Link to="/login" className="secondary-button">Sign in</Link>
          <Link to="/register" className="primary-button">Join Curio</Link>
        </div>
      </header>

      <main className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">A home for your curiosity</span>
          <h1>Follow a thought.<br />See where it leads.</h1>
          <p>
            Find fascinating ideas across science, history, nature, and culture. Start with what you
            love—or let a surprising connection pull you somewhere new.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="primary-button large">Start exploring <span aria-hidden="true">→</span></Link>
            <Link to="/login" className="secondary-button large">I have an account</Link>
          </div>
          <div className="landing-proof"><span className="proof-dot" /> Curiosity, without the endless scrolling</div>
        </div>

        <div className="hero-panel">
          <div className="preview-card">
            <div className="preview-card-header">
              <span className="preview-dot" />
              <span className="preview-dot" />
              <span className="preview-dot" />
              <span className="preview-heading">a trail worth following</span>
            </div>
            <div className="preview-welcome">
              <span className="preview-icon" aria-hidden="true">?</span>
              <div>
                <small>Nature · 7 min read</small>
                <strong>The hidden internet beneath a forest</strong>
              </div>
            </div>
            <div className="preview-branch" aria-hidden="true">
              <span>fungi</span><i>→</i><span>tree roots</span><i>→</i><span>forest</span>
            </div>
            <div className="preview-footer">
              <span>Follow a connection</span>
              <span aria-hidden="true">↗</span>
            </div>
          </div>
        </div>
      </main>

      <section className="feature-grid">
        {features.map((feature) => (
          <div key={feature} className="feature-card">
            <div className="feature-icon">↗</div>
            <p>{feature}</p>
          </div>
        ))}
      </section>
      <footer className="landing-footer">
        <span>Curio</span>
        <span>Made for curious minds.</span>
      </footer>
    </div>
  );
}
