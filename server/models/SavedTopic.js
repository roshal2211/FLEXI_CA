const mongoose = require('mongoose');

const savedTopicSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    topicSlug: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

savedTopicSchema.index({ user: 1, topicSlug: 1 }, { unique: true });

module.exports = mongoose.model('SavedTopic', savedTopicSchema);
