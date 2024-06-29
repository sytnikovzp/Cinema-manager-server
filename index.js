const http = require('http');
const fs = require('fs');
const path = require('path');
// ============================
require('dotenv').config();
// ============================
const app = require('./src/app');
// ============================

// Create server with HTTP module
const HOST_NAME = 'localhost';

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(PORT, HOST_NAME, () =>
  console.log(`Server running at http://${HOST_NAME}:${PORT}`)
);
