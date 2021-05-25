const { getRRuleSetByUserID, createEvent, updateEvent } = require('../services/Calendar');
const RRUle = require('../utils/RRule');

class CalendarController {
  static async getCalendar({ userID, start, end }) {
    // eslint-disable-next-line no-useless-catch
    try {
      const rruleSets = await getRRuleSetByUserID({ userID });
      const data = rruleSets.map(({ rruleSet, eventID, eventDetails }) => {
        const datesArray = RRUle.between({ start, end, rruleSet });
        return {
          eventID,
          eventDetails,
          datesArray,
        };
      });
      console.log(rruleSets);
      return data;
    } catch (err) {
      throw err;
    }
  }

  static async createEvent({ userID, eventDetails, start, end, recurringDetails }) {
    const rruleSet = await RRUle.createRRule({ start, recurringDetails });
    const currentRRuleSets = await getRRuleSetByUserID({ userID });

    const isOverlapping = RRUle.isOverlapping({ rruleSet, currentRRuleSets });

    if (isOverlapping) {
      throw new Error('Time slot provided is overlapping with previous events');
    }

    const event = await createEvent({
      userID,
      eventDetails,
      rruleSet,
    });
    return event;
  }

  static async updateEvent({ userID, eventDetails, start, end, recurringDetails }) {
    // eslint-disable-next-line no-useless-catch
    try {
      const event = await updateEvent({
        userID,
        eventDetails,
        start,
        end,
        recurringDetails,
      });
      return event;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = CalendarController;
