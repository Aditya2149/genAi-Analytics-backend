const QueryService = require('../services/queryService');

// Returns only question and SQL query
exports.processQuery = async (req, res) => {
  try {
    const { question } = req.body;
    const { question: processedQuestion, sqlQuery } = await QueryService.processQuery(question);
    res.json({ question: processedQuestion, sqlQuery });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Returns only question and explanation
exports.explainQuery = async (req, res) => {
  try {
    const { question } = req.body;
    const { question: processedQuestion, explanation } = await QueryService.processQuery(question);
    res.json({ question: processedQuestion, explanation });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Validate remains unchanged
exports.validateQuery = async (req, res) => {
  try {
    const { question } = req.body;
    const result = QueryService.validateQuery(question);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};