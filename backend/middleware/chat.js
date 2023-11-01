const express = require('express');
const router = express.Router();
const { OpenAIApi } = require('openai');

const openai = new OpenAIApi({
  apiKey: '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',
});

router.post('/user/chatbot', async (req, res) => {
    const { message } = req.body;
  try {
    const response = await openai.createCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: message }],
    });

    res.json({ response: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'Chatbot API request failed' });
  }
});
module.exports = router;