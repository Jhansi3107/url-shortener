const express = require('express');
const router = express.Router();
const { db } = require('../config/db');

// @route     GET /:code
// @desc      Redirect to long/original URL
router.get('/:code', (req, res) => {
  try {
    const url = db.get('urls').find({ urlCode: req.params.code }).value();

    if (url) {
        db.get('urls')
          .find({ urlCode: req.params.code })
          .assign({ clicks: url.clicks + 1 })
          .write();
        
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json('No url found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});

module.exports = router;
