const { v4: uuidv4 } = require('uuid');

const Events = require('../db/models/event');

const getRRuleSetByUserID = async ({ userID }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const rruleSet = await Events.find({ userID }).select('rruleSet eventDetails eventID -_id');
    return rruleSet;
    // return { userID, start, end };
  } catch (err) {
    throw err;
  }
};

const createEvent = async ({ userID, eventDetails, rruleSet }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const event = await Events.create({
      eventID: uuidv4(),
      userID,
      eventDetails,
      rruleSet,
    });
    return event;
  } catch (err) {
    throw err;
  }
};

const updateEvent = async ({ eventID, eventDetails, rruleSet }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const event = await Events.findOneAndUpdate({ eventID }, { eventDetails, rruleSet });
    return event;
  } catch (err) {
    throw err;
  }
};

module.exports = { getRRuleSetByUserID, createEvent, updateEvent };
