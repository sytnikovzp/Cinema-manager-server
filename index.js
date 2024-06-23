const fs = require('fs');
const path = require('path');
const os = require('os');
const http = require('http');

const pathToTextFile = './src/test/text';
const pathToAudioFile = './src/test/holy_diver.mp3';
const pathToCatalog = './src/test/test-1';

// Create server with HTTP module

const HOST_NAME = 'localhost';
const PORT = 5000;

const server = http.createServer((req, res) => {
  const url = req.url;
  console.log(`URL is ${url}`);
  console.log(`METHOD is ${req.method}`);

  // res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  // res.write('<h1>Hello server</h1>');
  // res.end();
  switch (url) {
    case '/':
      console.log('Home page');
      const homePage = fs.readFileSync('./public/index.html', 'utf8');
      res.write(homePage);
      res.end();
      break;
    case '/contact':
      console.log('Contact page');
      const contactPage = fs.readFileSync('./public/contact.html', 'utf8');
      res.write(contactPage);
      res.end();
      break;
    default:
      if (url.includes('/img')) {
        console.log('Images');
        fs.readFile(`./public${url}`, (err, data) => {
          if (err) {
            res.statusCode = 404;
            throw err;
          }
          res.setHeader('Content-Type', 'image/jpeg');
          res.write(data);
          res.end();
        });
      } else {
        res.write('<h1>Page not found</h1>');
      }
  }
});

server.listen(PORT, HOST_NAME, () =>
  console.log(`Server running at http://${HOST_NAME}:${PORT}`)
);
