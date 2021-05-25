const express = require('express');
const CalendarRouter = require('./Calendar');

const router = express.Router();

router.use('/calendars', CalendarRouter);

module.exports = router;
