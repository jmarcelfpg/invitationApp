import express from 'express';
import http from 'http';
import path from 'path';

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/board', (req, res, next) => { res.sendFile(path.join(__dirname, 'public', 'board.html')); });
app.use('/resetPass', (req, res, next) => { res.sendFile(path.join(__dirname, 'public', 'resetPass.html')); });
app.use('/register', (req, res, next) => { res.sendFile(path.join(__dirname, 'public', 'register.html')); });
app.use('*', (req, res, next) => { res.sendFile(path.join(__dirname, 'public', 'index.html')); });

// Catching all the routes
app.all('*', (req, res) => {
    res.status(404).send();
});

const serverHTTP = http.createServer(app);
serverHTTP.listen(app.get('port'), () => { console.log('server running on port ', app.get('port')); });
