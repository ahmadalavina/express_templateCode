const express = require('express');//commit01
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
// const Helpers = require('./helpers');
const methodOverride = require('method-override');
// const firebaseAdmin  = require("firebase-admin");
// const serviceAccount = require("app/http/controllers/serviceAccountKey.json");
const fs = require('fs');

const rememberLogin = require('app/http/middleware/rememberLogin');

module.exports = class Application {
    constructor() {
        this.setupExpress();
        this.setMongoConnection();
        this.setConfig();
        this.setRouters();
    }


    setupExpress() {
        const server = http.createServer(app);
        server.listen(config.port , () => console.log(`Listening on port ${config.port}`));
    }

 

    setMongoConnection() {
        mongoose.Promise = global.Promise;
        const mongoURI = config.database.url;
        const option = {
            user: config.database.user,
            pass: config.database.pass,
            // reconnectTries: 30000,
            socketTimeoutMS: 45000,
            keepAlive: 30000,
            connectTimeoutMS: 30000,
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
        mongoose.connect(mongoURI, option).then(function () {
            console.log("mongoose connected successfully");
        }, function (err) {
            console.log("mongoose connected failed err=> " + err);
        });
    }

   

    /**
     * Express Config
     */
    setConfig() {
        //set you config options in this class and use them for your app configuration.
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        // require('app/passport/passport-local');
        // require('app/passport/passport-google');
        // require('app/passport/passport-jwt');

        app.use(express.static(config.layout.public_dir));
        app.set('view engine', config.layout.view_engine);
        app.set('views', config.layout.view_dir);
        app.use(config.layout.ejs.expressLayouts);
        app.set("layout extractScripts", config.layout.ejs.extractScripts);
        app.set("layout extractStyles", config.layout.ejs.extractStyles);
        app.set("layout" , config.layout.ejs.master);


        app.use(methodOverride('_method'));
        //app.use(validator());
        app.use(session({...config.session}));
        app.use(cookieParser(config.cookie_secretkey));
        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(rememberLogin.handle);
        //here you can see a simple example of use a helpers 
        
        // app.use((req , res , next) => {
        //     app.locals = new Helpers(req, res).getObjects();
        //     next();
        // });
    }

    setRouters() {
        //here you can set your routes for your app
        //just remember that you need to set your routes with index files in every paths
        //like the example below
        
        //app.use(require('app/routes/api'));

    }
}