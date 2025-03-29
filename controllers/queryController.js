const QueryService = require('../services/queryService');

exports.processQuery = async (req, res) => {
  try {
    const { question } = req.body;
    const { question: processedQuestion, sqlQuery } = QueryService.processQuery(question);
    res.json({ question: processedQuestion, sqlQuery });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.explainQuery = async (req, res) => {
  try {
    const { question } = req.body;
    const { question: processedQuestion, explanation } = QueryService.processQuery(question);
    res.json({ question: processedQuestion, explanation });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.validateQuery = async (req, res) => {
  try {
    const { question } = req.body;
    const result = QueryService.validateQuery(question);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};