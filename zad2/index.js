const express = require('express');
const redis = require('redis');

const client = redis.createClient();

const app = express();
const port = 3000;

app.use(express.json());

app.post('/messages', (req, res) => {
  const { message } = req.body;

  client.lpush('messages', message, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Wystąpił błąd podczas dodawania wiadomości.' });
    } else {
      res.sendStatus(200);
    }
  });
});

app.get('/messages', (req, res) => {
  client.lrange('messages', 0, -1, (err, messages) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Wystąpił błąd podczas odczytywania wiadomości.' });
    } else {
      res.json(messages);
    }
  });
});

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
