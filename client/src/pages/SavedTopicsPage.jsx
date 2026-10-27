import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TopicCard from '../components/TopicCard';
import { api } from '../services/api';

export default function SavedTopicsPage() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingSlug, setSavingSlug] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    api.get('/topics/saved')
      .then((response) => {
        if (active) setTopics(response.topics || []);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message || 'Saved topics could not be loaded.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, []);

  const removeSaved = async (topic) => {
    setSavingSlug(topic.slug);
    setError('');
    try {
      await api.delete(`/topics/saved/${topic.slug}`);
      setTopics((current) => current.filter((item) => item.slug !== topic.slug));
    } catch (requestError) {
      setError(requestError.message || 'Topic could not be removed.');
    } finally {
      setSavingSlug('');
    }
  };

  return (
    <div className="saved-page">
      <header className="saved-page-heading">
        <div>
          <span className="section-kicker">Your collection</span>
          <h1>Saved rabbit holes</h1>
          <p>Good questions are worth coming back to.</p>
        </div>
        <Link to="/discover" className="text-button">Find another trail <span aria-hidden="true">→</span></Link>
      </header>

      {error && <div className="notice notice-error" role="alert">{error}</div>}
      {loading ? (
        <div className="topic-loading">Gathering your saved trails…</div>
      ) : topics.length ? (
        <div className="topic-grid">
          {topics.map((topic) => (
            <TopicCard key={topic.slug} topic={topic} onToggleSaved={removeSaved} saving={savingSlug === topic.slug} />
          ))}
        </div>
      ) : (
        <div className="topic-empty saved-empty">
          <span className="empty-orbit" aria-hidden="true">?</span>
          <h2>Nothing tucked away yet.</h2>
          <p>Save a topic that catches your attention and it’ll be waiting here.</p>
          <Link to="/discover" className="primary-button">Explore topics</Link>
        </div>
      )}
    </div>
  );
}
