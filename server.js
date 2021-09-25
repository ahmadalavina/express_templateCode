require('app-module-path').addPath(__dirname)
const Server = require('./app');
require('dotenv').config();
global.config = require('./config');

new Server();