const express = require('express');

const CalendarController = require('../../controllers/Calendar');

const router = express.Router();

router.get(
  '/',
  // validationLayer
  async (req, res, next) => {
    try {
      const { userID, start, end } = req.query;
      const params = { userID, start, end };
      const calendar = await CalendarController.getCalendar(params);
      res.status(200).json({
        data: {
          calendar,
        },
        status: 200,
        message: 'success',
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/event',
  // validationLayer
  async (req, res, next) => {
    try {
      const { userID, eventDetails, start, end, recurringDetails } = req.body;
      const params = { userID, eventDetails, start, end, recurringDetails };
      const event = await CalendarController.createEvent(params);
      res.status(200).json({
        data: {
          event,
        },
        status: 200,
        message: 'success',
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/event',
  // validationLayer
  async (req, res, next) => {
    try {
      const { userID, eventDetails, start, end, recurringDetails } = req.body;
      const params = { userID, eventDetails, start, end, recurringDetails };
      const event = await CalendarController.updateEvent(params);
      res.status(200).json({
        data: {
          event,
        },
        status: 200,
        message: 'success',
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
