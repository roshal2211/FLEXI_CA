const SavedTopic = require('../models/SavedTopic');
const User = require('../models/User');
const { topics, categories } = require('../data/topics');

const interestOptions = [...new Set(topics.flatMap((topic) => topic.tags))].sort();
const topicBySlug = new Map(topics.map((topic) => [topic.slug, topic]));

exports.getTopics = async (req, res) => {
  try {
    const query = String(req.query.q || '').trim().toLowerCase();
    const category = String(req.query.category || '').trim();
    const userInterests = req.user.interests || [];
    const savedRecords = await SavedTopic.find({ user: req.user._id }).select('topicSlug');
    const savedSlugs = new Set(savedRecords.map((record) => record.topicSlug));

    const results = topics
      .filter((topic) => !category || topic.category === category)
      .filter((topic) => {
        if (!query) return true;
        const searchable = [topic.title, topic.description, topic.category, ...topic.tags].join(' ').toLowerCase();
        return searchable.includes(query);
      })
      .map((topic) => ({
        ...topic,
        saved: savedSlugs.has(topic.slug),
        interestScore: topic.tags.filter((tag) => userInterests.includes(tag)).length
      }))
      .sort((a, b) => b.interestScore - a.interestScore);

    return res.status(200).json({
      topics: results,
      categories,
      interests: userInterests,
      interestOptions,
      personalized: userInterests.length > 0
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Topics could not be loaded.' });
  }
};

exports.updateInterests = async (req, res) => {
  try {
    const { interests } = req.body;

    if (!Array.isArray(interests) || interests.length > 20 || interests.some((interest) => typeof interest !== 'string')) {
      return res.status(400).json({ message: 'Choose up to 20 valid interests.' });
    }

    const uniqueInterests = [...new Set(interests.map((interest) => interest.trim().toLowerCase()))];
    const invalidInterests = uniqueInterests.filter((interest) => !interestOptions.includes(interest));

    if (invalidInterests.length) {
      return res.status(400).json({ message: 'One or more selected interests are not available.' });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { interests: uniqueInterests },
      { new: true, runValidators: true }
    ).select('-password');

    return res.status(200).json({ interests: user.interests });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Your interests could not be saved.' });
  }
};

exports.getSavedTopics = async (req, res) => {
  try {
    const savedRecords = await SavedTopic.find({ user: req.user._id }).sort({ createdAt: -1 });
    const saved = savedRecords
      .map((record) => {
        const topic = topicBySlug.get(record.topicSlug);
        return topic ? { ...topic, saved: true, savedAt: record.createdAt } : null;
      })
      .filter(Boolean);

    return res.status(200).json({ topics: saved });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Saved topics could not be loaded.' });
  }
};

exports.saveTopic = async (req, res) => {
  try {
    const topic = topicBySlug.get(req.params.slug);

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found.' });
    }

    await SavedTopic.updateOne(
      { user: req.user._id, topicSlug: topic.slug },
      { $setOnInsert: { user: req.user._id, topicSlug: topic.slug } },
      { upsert: true }
    );

    return res.status(200).json({ message: 'Topic saved.', slug: topic.slug });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Topic could not be saved.' });
  }
};

exports.removeSavedTopic = async (req, res) => {
  try {
    const result = await SavedTopic.deleteOne({ user: req.user._id, topicSlug: req.params.slug });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Saved topic not found.' });
    }

    return res.status(200).json({ message: 'Topic removed from your saved list.' });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Saved topic could not be removed.' });
  }
};
