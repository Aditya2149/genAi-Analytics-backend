const express = require('express');
const router = express.Router();
const queryController = require('../controllers/queryController');
const authenticate = require('../middlewares/authMiddleware');

router.post('/query', authenticate, queryController.processQuery);
router.post('/explain', authenticate, queryController.explainQuery);
router.post('/validate', authenticate, queryController.validateQuery);

module.exports = router;