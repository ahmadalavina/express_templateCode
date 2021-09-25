const database = require('./database');
const session = require('./session');
const layout = require('./layout');
const service = require('./service');

module.exports = {
    database,
    session,
    layout,
    service,
    port : process.env.APPLICATION_PORT,
    cookie_secretkey : process.env.COOKIE_SECRETKEY ,
    debug : true ,
    site_url : process.env.WEBSITE_URL ,
    jwt :{
        secret_key : "d58*as3#$#@%$12#@%$565!#^%&165"
    }
};