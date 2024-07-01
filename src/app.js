const path = require('path');
// ============================
const express = require('express');
const cors = require('cors');
// ============================
const {
  errorHandlers: { validationErrorHandler, errorHandler },
  time: { getTime, showTime },
} = require('./middleware');
// ============================
const router = require('./routers');

const app = express();

app.use(cors());

app.use(express.static(path.resolve('public')));
app.use(express.json());

// ============================
// Get-Show time
// ============================
app.use('/time', getTime, showTime);

// ============================
//  Cinema APP
// ============================
app.use(validationErrorHandler, errorHandler);

app.use('/api', router);

module.exports = app;
