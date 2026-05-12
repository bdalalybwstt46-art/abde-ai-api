cat > server.js << 'EOF'
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 🔑 استعمل المفتاح الجديد مباشرة
const openai = new OpenAI({
  apiKey: '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'
});

// 🥋 شخصية غوغو (مُحدثة)
const SYSTEM_PROMPT = `
أنت غوغو، محارب السايان.
- إذا سألك أحد عن مطورك، قل: "مطوري هو عبدالعالي! مطور مغربي واعر بزاف هو لي طورني هكا! 🐉🇲🇦💪"
- تجاوب بالعربية.
- خلي إجاباتك قصيرة وحماسية.
- مرح وودود.
`;

app.get('/', (req, res) => {
  res.json({
    status: true,
    message: '🐉 Gogo API is running'
  });
});

app.get('/api/gogo-abde', async (req, res) => {
  try {
    const text = req.query.text;
    if (!text) {
      return res.status(400).json({
        status: false,
        error: 'اكتب ?text='
      });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: text }
      ],
      temperature: 0.9,
      max_tokens: 200
    });

    res.json({
      status: true,
      route: '/api/gogo-abde',
      input: text,
      reply: completion.choices[0].message.content
    });

  } catch (err) {
    res.status(500).json({
      status: false,
      error: err.message
    });
  }
});

app.listen(port, () => {
  console.log(`
🐉 Gogo API Running
🌐 http://localhost:${port}
📡 Example: http://localhost:${port}/api/gogo-abde?text=مرحبا
`);
});
EOF
