const { RRule, RRuleSet, rrulestr } = require('rrule');
const moment = require('moment');
// moment taking local tz = ASIA/KOLKATA

class UdayyRRule {
  static async createRRule({ start, recurringDetails: { isRecurring, end, recurringDays } }) {
    // eslint-disable-next-line no-useless-catch
    try {
      const rruleParams = {
        freq: RRule.WEEKLY,
        interval: 1,
        dtstart: moment(start).utc().toDate(),
      };
      if (isRecurring) {
        rruleParams.until = moment(end).utc().toDate();
        rruleParams.byweekday = recurringDays;
      } else {
        rruleParams.count = 1;
      }
      const rrule = new RRule(rruleParams);
      const result = rrule.toString().split('\n');
      console.log(RRule.fromString(result.join('\n')).all());
      return result;
    } catch (err) {
      throw err;
    }
  }

  static between({ start, end, rruleSet }) {
    // eslint-disable-next-line no-useless-catch
    try {
      // console.log(rruleSet);
      // console.log(start);
      // console.log(end);
      const dateArray = RRule.fromString(rruleSet.join('\n')).between(
        moment(parseInt(start)).utc().toDate(),
        moment(parseInt(end)).utc().toDate()
      );
      return dateArray;
      // return [];
    } catch (err) {
      throw err;
    }
  }

  static isOverlapping({ rruleSet, currentRRuleSets }) {
    // eslint-disable-next-line no-useless-catch
    try {
      return true;
      // return [];
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UdayyRRule;
