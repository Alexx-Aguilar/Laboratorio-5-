const OpenAI = require('openai');

const client = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY
});

async function preguntar(texto, system) {
  const completion = await client.chat.completions.create({
    model: process.env.DEEPSEEK_MODEL || 'deepseek-v4-flash',
    max_tokens: 1024,
    messages: [
      { role: 'system', content: system ?? 'Eres un asistente útil. Responde en español.' },
      { role: 'user', content: texto }
    ]
  });
  return {
    respuesta: completion.choices[0]?.message?.content ?? '',
    uso: completion.usage
  };
}

module.exports = { preguntar };
