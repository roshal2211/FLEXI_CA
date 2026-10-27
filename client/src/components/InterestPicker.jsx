export default function InterestPicker({
  options,
  selected,
  onChange,
  onSave,
  saving,
  buttonLabel = 'Save interests'
}) {
  const toggleInterest = (interest) => {
    if (selected.includes(interest)) {
      onChange(selected.filter((item) => item !== interest));
    } else if (selected.length < 20) {
      onChange([...selected, interest]);
    }
  };

  return (
    <section className="interest-picker">
      <div className="interest-picker-heading">
        <div>
          <span className="section-kicker">Make it yours</span>
          <h2>What sends you down a rabbit hole?</h2>
          <p>Pick a few themes. We’ll bring the unexpected connections.</p>
        </div>
        <span className="interest-count">{selected.length} selected</span>
      </div>
      <div className="interest-options">
        {options.map((interest) => (
          <button
            type="button"
            key={interest}
            className={`interest-chip ${selected.includes(interest) ? 'selected' : ''}`}
            onClick={() => toggleInterest(interest)}
            aria-pressed={selected.includes(interest)}
          >
            {interest}
          </button>
        ))}
      </div>
      <div className="interest-picker-footer">
        <span>Your picks stay private to your account.</span>
        <button type="button" className="primary-button" disabled={saving} onClick={onSave}>
          {saving ? 'Saving…' : buttonLabel}
        </button>
      </div>
    </section>
  );
}
