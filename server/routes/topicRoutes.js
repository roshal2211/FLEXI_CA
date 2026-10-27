const express = require('express');
const {
  getTopics,
  updateInterests,
  getSavedTopics,
  saveTopic,
  removeSavedTopic
} = require('../controllers/topicController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.get('/', getTopics);
router.put('/interests', updateInterests);
router.get('/saved', getSavedTopics);
router.post('/saved/:slug', saveTopic);
router.delete('/saved/:slug', removeSavedTopic);

module.exports = router;
