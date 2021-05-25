const express = require('express');
const v1Routes = require('./v1');

const router = express.Router();

router.get('/health-check', (req, res) => {
  console.log('health-check');
  res.status(200).json({
    status: 200,
    message: 'I am alive! and healthy.',
  });
});

router.use('/v1', v1Routes);

module.exports = router;
