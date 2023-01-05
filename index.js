require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const ValidUrl = require("valid-url");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});
const validurls = []
const shorturls = []

app.post("/api/shorturl", (req, res) => {
  const { url } = req.body
  const isValidUrl = ValidUrl.isWebUri(url)
  if (!isValidUrl) {
    return res.json({
      error: 'invalid url'
    })
  }
  validurls.push(url)
  shorturls.push(validurls.length - 1);
  const original_url = url;
  const short_url = validurls.length - 1
  res.json({ original_url, short_url })
});

app.get("/api/shorturl/:short_url", (req, res) => {
  const { short_url } = req.params
  const findUrl = validurls[short_url]
  // if (!findUrl) return res.json("url not found!")
  console.log(findUrl)
  res.redirect(findUrl)
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
