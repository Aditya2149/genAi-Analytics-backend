const db = require('../config/db');

class QueryService {
  static processQuery(question) {
    let sqlQuery, explanation;

    if (question.toLowerCase().includes('sales by region')) {
      sqlQuery = 'SELECT region, SUM(amount) as total_sales FROM sales GROUP BY region';
      explanation = "Groups sales data by region and calculates total sales per region.";
    } else if (question.toLowerCase().includes('top products')) {
      sqlQuery = 'SELECT product, SUM(amount) as revenue FROM sales GROUP BY product ORDER BY revenue DESC';
      explanation = "Groups sales by product, calculates total revenue, and sorts in descending order.";
    } else {
      throw new Error('Unsupported query type');
    }

    return { question, sqlQuery, explanation };
  }

  static validateQuery(question) {
    const isSupported = (
      question.toLowerCase().includes('sales by region') ||
      question.toLowerCase().includes('top products')
    );

    return {
      question,
      isValid: isSupported,
      message: isSupported ? "Query is valid" : "Query is not supported"
    };
  }
}

module.exports = QueryService;