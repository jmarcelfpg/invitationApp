import express from 'express';
import http from 'http';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('*', (req, res, next) => { res.sendFile(path.join(__dirname, 'public', 'index.html')); });

const serverHTTP = http.createServer(app);
serverHTTP.listen(3000, () => { console.log('server running on port 3000'); });
