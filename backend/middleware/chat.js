const express = require('express');
const router = express.Router();
const OpenAI = require('openai')
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OpenAPI_Token,
});

router.post('/user/chatbot', async (req, res) => {
    const message = req.body.prompt;
    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "gpt-3.5-turbo-0613",
  });
  res.json({ response: response.choices[0].message.content });
});
module.exports = router;