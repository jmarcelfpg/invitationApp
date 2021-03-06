import dotenv from 'dotenv';
import http from 'http';
import setAPIRoutes from './app/routes/apiRoutes';
import expressService from './config/express';
import initHBS from './config/handlebars';
import mailService from './config/mail';
import mongoService from './config/mongoose';
import initPassport from './config/passport';
dotenv.config({ path: '.env' });

(async () => {
    const db = await mongoService();
    const app = await expressService();
    const passport = initPassport();
    const tranporter = mailService();
    initHBS();
    setAPIRoutes(app, passport, tranporter);
    console.log('Starting Express Server'); http.createServer(app)
        .listen(app.get('port'), () => {
            console.log('Express listening on port ' + app.get('port'));
        });
})()
.catch(console.error);
