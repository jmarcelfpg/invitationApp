import dotenv from 'dotenv';
import http from 'http';
import setAPIRoutes from './app/routes/apiRoutes';
import expressService from './config/express';
import mongoService from './config/mongoose';
import initPassport from './config/passport';
dotenv.config({ path: '.env' });

(async () => {
    const db = await mongoService();
    const app = await expressService();
    const passport = initPassport();
    setAPIRoutes(app, passport);
    console.log('Starting Express Server'); http.createServer(app)
        .listen(app.get('port'), () => {
            console.log('Express listening on port ' + app.get('port'));
        });
})()
.catch(console.error);
