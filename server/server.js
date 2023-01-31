const express = require('express');
const request = require('request');

const app = express();
const FLICKR_API_KEY = '4e6194266afdbd548ead578b7578c6ef';

app.get('/search', (req, res) => {
  const { query, page } = req.query;
  
  const options = {
    url: `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_API_KEY}&text=${query}&page=${page}&per_page=10&format=json&nojsoncallback=1`,
    json: true
  };
  
  request(options, (error, response, body) => {
    if (error) {
      return res.status(500).json({ error });
    }
    
    return res.status(200).json(body);
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});