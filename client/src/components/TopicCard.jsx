import TopicIllustration from './TopicIllustration';

const categoryStyles = {
  Nature: 'nature',
  Science: 'science',
  Technology: 'technology',
  History: 'history',
  Psychology: 'psychology',
  Space: 'space',
  'Art & Culture': 'culture'
};

const categoryMarks = {
  Nature: 'N',
  Science: 'S',
  Technology: 'T',
  History: 'H',
  Psychology: 'P',
  Space: 'A',
  'Art & Culture': 'C'
};

export default function TopicCard({ topic, onToggleSaved, saving = false }) {
  const categoryClass = categoryStyles[topic.category] || 'science';

  return (
    <article className={`topic-card topic-${categoryClass}`}>
      <div className={`topic-art art-${categoryClass}`} aria-hidden="true">
        <TopicIllustration category={topic.category} />
        <span className="art-caption">CURIOSITY / {categoryMarks[topic.category] || 'R'}</span>
        <span className="art-side-note">{topic.tags[0]}</span>
      </div>
      <div className="topic-card-top">
        <span className="topic-category">
          <span className="category-mark" aria-hidden="true">{categoryMarks[topic.category] || 'R'}</span>
          {topic.category}
        </span>
        <span className="topic-duration">{topic.readTime} MIN</span>
        <button
          type="button"
          className={`save-topic-button ${topic.saved ? 'is-saved' : ''}`}
          onClick={() => onToggleSaved(topic)}
          disabled={saving}
          aria-label={topic.saved ? `Remove ${topic.title} from saved topics` : `Save ${topic.title}`}
          title={topic.saved ? 'Remove from saved topics' : 'Save topic'}
        >
          {topic.saved ? 'Saved' : 'Save'}
        </button>
      </div>

      <a className="topic-card-content" href={topic.sourceUrl} target="_blank" rel="noreferrer">
        <h2>{topic.title}</h2>
        <p>{topic.description}</p>
        <span className="topic-read-time">Open the source <span aria-hidden="true">↗</span></span>
      </a>

      <div className="topic-tags" aria-label="Related interests">
        <span className="topic-tags-label">THREADS</span>
        {topic.tags.slice(0, 3).map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </article>
  );
}
