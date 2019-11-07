const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 8080;

app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use((req, res, next) => {
  console.log(`received request: ${req.method} ${req.path}`)
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const email = req.body.email;
  const comment = req.body.comment;
  res.send(`
    <!DOCTYPE=html><html>
      <body>
        <div>name: ${name}</div>
        <div>email: ${email}</div>
        <div>comment: ${comment}</div>
      </body>
    </html>
  `);
});

app.listen(PORT, () => console.log(`🚀 Listening on port ${PORT}`))
