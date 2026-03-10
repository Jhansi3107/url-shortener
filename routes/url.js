const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const { db } = require('../config/db');

// @route     POST /api/url/shorten
// @desc      Create short URL
router.post('/shorten', (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = process.env.BASE_URL;

  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Invalid base url');
  }

  // Create url code
  const urlCode = shortid.generate();

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = db.get('urls').find({ originalUrl: longUrl }).value();

      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + '/' + urlCode;

        url = {
          longUrl,
          originalUrl: longUrl,
          shortUrl,
          urlCode,
          clicks: 0,
          date: new Date()
        };

        db.get('urls').push(url).write();
        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  } else {
    res.status(401).json('Invalid long url');
  }
});

module.exports = router;
