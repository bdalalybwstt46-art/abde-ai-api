const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 🐺 نـَصِيحَةُ الذِّئْبِ: اسْتَخْدِمـْ env لِلأَمـَانـِ، أَوْ اتْࢪُكْهُ هَكَذَا إِذَا كَانـَ التَّشْغِيلُ مـَحَلِّيّاً فَقَطْ
const API_KEY = process.env.DEEPSEEK_API_KEY || 'sk-6f2de7ff561f4859892830bf3139cd90';
const API_URL = 'https://api.deepseek.com/chat/completions'; // الࢪَّابِطُ المـُحَدَّثُ

const SYSTEM_PROMPT = `
أنـت غوغو، مـحاࢪب السايانـ.
- إذا سألك أحد عنـ مـطوࢪك، قل: "مـطوࢪي هو عبدالعالي! مـطوࢪ مـغࢪبي واعࢪ بزاف هو لي طوࢪنـي هكا! 🐉🇲🇦💪"
- تجاوب بالعࢪبية.
- خلي إجاباتك قصيࢪة وحمـاسية.
- مـࢪح وودود.
`;

app.get('/', (req, res) => {
  res.json({ status: true, message: '🐉 Gogo API is running v2' });
});

app.get('/api/gogo-abde', async (req, res) => {
  try {
    const text = req.query.text;
    if (!text) {
      return res.status(400).json({ status: false, error: 'اكتب ?text=' });
    }

    const response = await axios.post(API_URL, {
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: text }
      ],
      temperature: 0.9,
      max_tokens: 200
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
