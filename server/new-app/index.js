import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const PORT = 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/v1', (req, res) => {
  res.json({ 'version': 'v1' });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/build/index.html'));
});

app.get('/food', (req, res) => {
  res.send('Food route yo');
});

app.post('/ingredients', (req, res) => {
  console.log(req.body);
});

app.post('/recipes', (req, res) => {
  console.log(req.body);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
