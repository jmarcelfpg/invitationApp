import * as bodyParser from 'body-parser';
import morgan from 'morgan';
import http from 'http';
import path from 'path';

import express from 'express';
import * as mongoose from 'mongoose';
import * as passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local';
import User from './models/user';

// import mongoService from './config/mongoose';
import expressService from './config/express';
import passportService from './config/passport';

Promise.all([
    expressService,
    passportService
])
.then((resolutions) => {
    if (resolutions.length) {
        console.log("App up and running");
    }
});

const app = express()
passport.use(userStrategy)
app.use(passport.initialize())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.set('port', (process.env.PORT || 3000));

// mongoose 
(<any>mongoose).Promise = global.Promise
const connection = mongoose.connect(
    (process.env.MONGODB_URI as string),
    { useMongoClient: true }
)

const server = http.createServer(app);
connection
    .then(() => {
        console.log('Connected to MongoDB')

        app.use('*', (req, res, next) => { 
            res.sendFile(path.join(__dirname, 'public', 'index.html'));
        });

        server.listen(app.get('port'), () => {
            console.log('Express listening on port ' + app.get('port'))
        })
    })
    .catch((e) => {
        console.log('connection error:')
    })

export { app }