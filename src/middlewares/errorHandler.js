const OpenAI = require('openai');
const { AppError } = require('../utils/errors');

module.exports = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({ error: err.message });
  }

  if (err instanceof OpenAI.APIError) {
    // Do not log the provider's raw message; it may contain credential fragments.
    console.error('DeepSeek API error with status:', err.status);
    const status = err.status === 429 ? 429 : err.status === 503 ? 503 : 502;
    return res.status(status).json({ error: 'IA_NO_DISPONIBLE' });
  }

  console.error(err);
  return res.status(500).json({ error: 'Error interno' });
};
