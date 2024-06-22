// const sumFunc = require('./source');
// console.log(sumFunc(10, 30));

const fs = require('fs');
const path = require('path');
const os = require('os');
const http = require('http');

const pathToTextFile = './src/test/text1';
const pathToAudioFile = './src/test/holy_diver.mp3';
const pathToCatalog = './src/test/test-1';

// module FileSystem

// Check test catalog
// function checkTestCatalog() {
//   fs.existsSync(pathToCatalog)
//     ? console.log('Catalog exist')
//     : console.log('Catalog not exist');
// }
// checkTestCatalog();

// Check test file
// function checkTestFile() {
//   fs.existsSync(pathToTextFile)
//     ? console.log('File exist')
//     : console.log('File not exist');
// }
// checkTestFile();

// Get info
// const getFileInfo = () => fs.statSync(pathToAudioFile);
// console.log(getFileInfo().size);

// Get all from catalog
// const getAll = () => fs.readdirSync(pathToCatalog);
// console.log(getAll());

// Read file
// console.log(
//   fs.readFile(pathToTextFile, 'utf8', (err, data) => {
//     if (err) throw new Error(err.message);
//     console.log(data);
//   })
// );

// Write file
// fs.writeFileSync(pathToTextFile, 'I like websocket');

// Append file
// fs.appendFileSync(pathToTextFile, '\nI like Node.js', 'utf8');

// Remove file
// fs.unlinkSync(pathToTextFile);

// Remove catalog
// fs.rmdirSync(pathToCatalog);

// Module PATH
// console.log(path.basename(pathToAudioFile))
// console.log(path.dirname(pathToAudioFile))
// console.log(path.extname(pathToAudioFile))
// console.log(path.parse(pathToAudioFile))

// Get absolute path
// console.log(path.join(__dirname, 'src', 'test'));
// console.log(path.join(__filename)); // this file
// console.log(__dirname);
// console.log(path.resolve()); // instead of dirname
// console.log(path.resolve('src', 'test'));

// Module OS
// console.log(os.constants);
// console.log(os.homedir());
// console.log(os.hostname());
// console.log(os.platform());
// console.log(os.release());
// console.log(os.totalmem());
// console.log(os.type());
// console.log(os.userInfo());
// console.log(os.version());
// console.log(os.arch());

// Process
// console.log(process.env.SHELL);
// process.env.PORT = 5000;
// process.env.DB_PORT = 5432;
// console.log(process.env.PORT);
// console.log(process.env.DB_PORT);

// HTTP 