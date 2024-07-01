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

const {
  getStudios,
  getStudioById,
  createStudio,
  updateStudio,
  deleteStudio,
} = require('./controllers/studioController');

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

app.get('/studios', getStudios);
app.get('/studios/:studioId', getStudioById);
app.post('/studios/', createStudio);
app.put('/studios/:studioId', updateStudio);
app.delete('/studios/:studioId', deleteStudio);

module.exports = app;
