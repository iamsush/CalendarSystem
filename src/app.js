const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const routes = require('./routes');

const { connectToDb } = require('./db/Connection');

const AccessEnv = require('./utils/AccessEnv');

connectToDb();
const app = express();

app.use(cors());
app.use(helmet());
app.enable('trust proxy');

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

app.use(compression());
app.use(express.json({ limit: '50mb', strict: false }));
app.use(
  express.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
  })
);

app.use('/api', routes);

// error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    status: 500,
    message: err.message || 'internal server error',
    error: {
      message: err,
      errors: null,
    },
  });
});

const port = AccessEnv('PORT', 3000);
app.listen(port, () => console.log(`App listening on port: ${port}`));

module.exports = app;
