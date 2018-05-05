import http from 'http';
import mongoService from './config/mongoose';
import expressService from './config/express';
import initPassport from './config/passport';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

(async () => {
    const db = await mongoService();
    const app = await expressService();
    initPassport();
    console.log('Starting Express Server'); http.createServer(app)
        .listen(app.get('port'), () => {
            console.log('Express listening on port ' + app.get('port'));
        });
})()
.catch(console.error);