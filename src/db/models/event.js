const mongoose = require('mongoose');

const { Schema } = mongoose;

const EventsSchema = Schema({
  userID: Number,
  eventID: {
    type: String,
  },
  eventDetails: {
    subject: { type: String, trim: true },
  },
  rruleSet: [
    {
      type: String,
    },
  ],
  //   We can also use versioning
  //   active: {
  //     type: Boolean,
  //     default: true,
  //   },
  //   version: {
  //     type: Number,
  //     default: 1,
  //   },
});

const Events = mongoose.model('Events', EventsSchema);

module.exports = Events;
