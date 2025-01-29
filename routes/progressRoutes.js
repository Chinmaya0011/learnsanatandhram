const express = require('express');
const { canAccessLevel, markLevelAsCompleted, progressReport } = require('../controllers/progressController');
const router = express.Router();

router.post('/learn-sanatan-dharma/access-level', canAccessLevel);

router.post('/learn-sanatan-dharma/mark-level-completed', markLevelAsCompleted);

router.post('/learn-sanatan-dharma/progress-report', progressReport);

module.exports = router;
