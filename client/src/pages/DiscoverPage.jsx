import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import InterestPicker from '../components/InterestPicker';
import TopicCard from '../components/TopicCard';
import TopicIllustration from '../components/TopicIllustration';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export default function DiscoverPage() {
  const { user } = useAuth();
  const [topics, setTopics] = useState([]);
  const [categories, setCategories] = useState([]);
  const [interestOptions, setInterestOptions] = useState([]);
  const [interests, setInterests] = useState(user?.interests || []);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [showInterestPicker, setShowInterestPicker] = useState(false);
  const [loading, setLoading] = useState(true);
  const [savingInterests, setSavingInterests] = useState(false);
  const [savingSlug, setSavingSlug] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [surpriseTopic, setSurpriseTopic] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let active = true;
    const timer = setTimeout(async () => {
      setLoading(true);
      setError('');
      try {
        const params = new URLSearchParams();
        if (category !== 'All') params.set('category', category);
        if (search.trim()) params.set('q', search.trim());
        const response = await api.get(`/topics?${params.toString()}`);
        if (!active) return;
        setTopics(response.topics || []);
        setCategories(response.categories || []);
        setInterestOptions(response.interestOptions || []);
        setInterests(response.interests || []);
      } catch (requestError) {
        if (active) setError(requestError.message || 'Topics could not be loaded.');
      } finally {
        if (active) setLoading(false);
      }
    }, search ? 180 : 0);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [category, search, refreshKey]);

  const topicCountLabel = useMemo(() => {
    if (loading) return 'Finding your next rabbit hole…';
    return `${topics.length} rabbit hole${topics.length === 1 ? '' : 's'} to explore`;
  }, [loading, topics.length]);

  const featuredTopic = topics[0];
  const featuredConnections = useMemo(() => {
    if (!featuredTopic) return [];
    return topics
      .filter((topic) => topic.slug !== featuredTopic.slug)
      .map((topic) => ({
        ...topic,
        sharedTags: topic.tags.filter((tag) => featuredTopic.tags.includes(tag))
      }))
      .filter((topic) => topic.sharedTags.length)
      .sort((a, b) => b.sharedTags.length - a.sharedTags.length)
      .slice(0, 3);
  }, [featuredTopic, topics]);

  const saveInterests = async () => {
    setSavingInterests(true);
    setError('');
    setMessage('');
    try {
      const response = await api.put('/topics/interests', { interests });
      setInterests(response.interests || []);
      setRefreshKey((key) => key + 1);
      setShowInterestPicker(false);
      setMessage('Your interests are saved. Your feed is now tuned to you.');
    } catch (requestError) {
      setError(requestError.message || 'Interests could not be saved.');
    } finally {
      setSavingInterests(false);
    }
  };

  const toggleSaved = async (topic) => {
    setSavingSlug(topic.slug);
    setError('');
    setMessage('');
    try {
      if (topic.saved) {
        await api.delete(`/topics/saved/${topic.slug}`);
      } else {
        await api.post(`/topics/saved/${topic.slug}`, {});
      }
      setTopics((current) => current.map((item) => (
        item.slug === topic.slug ? { ...item, saved: !topic.saved } : item
      )));
      setMessage(topic.saved ? 'Removed from your saved topics.' : 'Saved for your next deep dive.');
    } catch (requestError) {
      setError(requestError.message || 'Topic could not be saved.');
    } finally {
      setSavingSlug('');
    }
  };

  const surpriseMe = () => {
    if (!topics.length) return;
    const nextOptions = surpriseTopic ? topics.filter((topic) => topic.slug !== surpriseTopic.slug) : topics;
    const options = nextOptions.length ? nextOptions : topics;
    setSurpriseTopic(options[Math.floor(Math.random() * options.length)]);
  };

  const exploreConnection = (tag) => {
    setCategory('All');
    setSearch(tag);
    setSurpriseTopic(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="discover-page">
      <section className="discover-hero">
        <div className="discover-hero-copy">
          <span className="section-kicker">Curiosity has a way of branching</span>
          <h1>One little question.<br /><span>A hundred new paths.</span></h1>
          <p>Follow what fascinates you, or let us pick the first thread.</p>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <span className="orbit orbit-one" />
          <span className="orbit orbit-two" />
          <span className="orbit orbit-three" />
          <span className="orbit-core">?</span>
          <i className="orbit-node node-one" />
          <i className="orbit-node node-two" />
          <i className="orbit-node node-three" />
        </div>
      </section>

      <section className="discovery-controls" aria-label="Find topics">
        <label className="topic-search">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            placeholder="Search a curiosity: deep sea, memory, ancient tech…"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setSurpriseTopic(null);
            }}
          />
        </label>
        <button type="button" className="surprise-button" onClick={surpriseMe} disabled={!topics.length}>
          Surprise me
          <span aria-hidden="true">↗</span>
        </button>
      </section>

      <section className="interest-section">
        <div className="interest-summary">
          <div>
            <span className="section-kicker">Your curiosity map</span>
            {interests.length ? (
              <div className="selected-interest-list">
                {interests.slice(0, 6).map((interest) => <span key={interest}>{interest}</span>)}
                {interests.length > 6 && <span>+{interests.length - 6}</span>}
              </div>
            ) : (
              <p>Pick a few interests and we’ll connect the dots.</p>
            )}
          </div>
          <button type="button" className="text-button" onClick={() => setShowInterestPicker((visible) => !visible)}>
            {showInterestPicker ? 'Close' : interests.length ? 'Edit interests' : 'Choose interests'}
          </button>
        </div>
        {showInterestPicker && (
          <InterestPicker
            options={interestOptions}
            selected={interests}
            onChange={setInterests}
            onSave={saveInterests}
            saving={savingInterests}
          />
        )}
      </section>

      {error && <div className="notice notice-error" role="alert">{error}</div>}
      {message && <div className="notice notice-success" role="status">{message}</div>}

      {surpriseTopic && (
        <section className="surprise-result">
          <div className="surprise-result-heading">
            <div>
              <span className="section-kicker">A thread to pull</span>
              <h2>Here’s your unexpected detour</h2>
            </div>
            <button type="button" className="text-button" onClick={() => setSurpriseTopic(null)}>Back to all topics</button>
          </div>
          <div className="topic-grid surprise-grid">
            <TopicCard
              topic={surpriseTopic}
              onToggleSaved={toggleSaved}
              saving={savingSlug === surpriseTopic.slug}
            />
          </div>
        </section>
      )}

      <section className="topic-section">
        <div className="topic-section-heading">
          <div>
            <span className="section-kicker">{interests.length ? 'Picked for your curiosity' : 'Curiosity, uncategorized'}</span>
            <h2>{category === 'All' ? 'The discovery desk' : `Explore ${category}`}</h2>
            <p>{topicCountLabel}</p>
          </div>
          <Link to="/saved" className="text-button saved-link">Your saved topics <span aria-hidden="true">→</span></Link>
        </div>

        <div className="category-filter" aria-label="Filter by topic category">
          <button type="button" className={`category-tab ${category === 'All' ? 'active' : ''}`} onClick={() => setCategory('All')}>
            <span className="category-tab-glyph">✳</span> Everything <small>{category === 'All' ? topics.length : '·'}</small>
          </button>
          {categories.map((item, index) => (
            <button type="button" key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>
              <span className={`category-tab-glyph category-glyph-${index}`}>{['❋', '◷', '✳', '⌁', '◉', '✦', '⌘'][index]}</span>
              {item}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="topic-loading">Following a few interesting threads…</div>
        ) : topics.length ? (
          <>
            {featuredTopic && (
              <section className="featured-thread">
                <div className={`featured-art featured-${featuredTopic.category.toLowerCase().replace(/[^a-z]+/g, '-')}`}>
                  <span className="featured-art-label">CURIO FIELD NOTES <i>NO. {String(topics.indexOf(featuredTopic) + 1).padStart(2, '0')}</i></span>
                  <TopicIllustration category={featuredTopic.category} variant="featured" />
                  <span className="featured-art-index"><i>FIELD GUIDE / {featuredTopic.category.toUpperCase()}</i><span>01 — 07</span></span>
                </div>
                <div className="featured-copy">
                  <div className="featured-meta">
                    <span className="featured-category">{featuredTopic.category}</span>
                    <span>{featuredTopic.readTime} MIN READ</span>
                  </div>
                  <span className="section-kicker">Editor’s first thread</span>
                  <h3>{featuredTopic.title}</h3>
                  <p>{featuredTopic.description}</p>
                  <div className="featured-tags">
                    {featuredTopic.tags.map((tag) => <span key={tag}>#{tag}</span>)}
                  </div>
                  <div className="featured-actions">
                    <a href={featuredTopic.sourceUrl} target="_blank" rel="noreferrer" className="primary-button">
                      Start reading <span aria-hidden="true">↗</span>
                    </a>
                    <button
                      type="button"
                      className={`featured-save ${featuredTopic.saved ? 'is-saved' : ''}`}
                      onClick={() => toggleSaved(featuredTopic)}
                      disabled={savingSlug === featuredTopic.slug}
                    >
                      {featuredTopic.saved ? 'Saved to your collection' : '＋ Save for later'}
                    </button>
                  </div>
                </div>
                <aside className="featured-connections">
                  <span className="section-kicker">Follow a connection</span>
                  <h4>Curiosity branches</h4>
                  {featuredConnections.length ? featuredConnections.map((topic, index) => (
                    <button
                      key={topic.slug}
                      type="button"
                      className="connection-item"
                      onClick={() => exploreConnection(topic.sharedTags[0])}
                    >
                      <span className="connection-number">0{index + 1}</span>
                      <span className="connection-copy">
                        <strong>{topic.title}</strong>
                        <small>via {topic.sharedTags.slice(0, 2).join(' · ')}</small>
                      </span>
                      <span className="connection-arrow" aria-hidden="true">↗</span>
                    </button>
                  )) : (
                    <p className="connection-empty">Search across topics to uncover a new connection.</p>
                  )}
                  <button type="button" className="connection-random" onClick={surpriseMe}>
                    Take an unexpected turn <span aria-hidden="true">⤴</span>
                  </button>
                </aside>
              </section>
            )}
            <div className="topic-grid">
              {topics.slice(1).map((topic) => (
                <TopicCard
                  key={topic.slug}
                  topic={topic}
                  onToggleSaved={toggleSaved}
                  saving={savingSlug === topic.slug}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="topic-empty">
            <h3>No trail found for that search.</h3>
            <p>Try a broader phrase or pick another category.</p>
            <button type="button" className="text-button" onClick={() => { setSearch(''); setCategory('All'); }}>Clear filters</button>
          </div>
        )}
      </section>
    </div>
  );
}
