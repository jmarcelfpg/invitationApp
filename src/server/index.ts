import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import path from 'path';

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/board', (req, res, next) => { res.sendFile(path.join(__dirname, 'public', 'board.html')); });
app.get('/resetPass', (req, res, next) => { res.sendFile(path.join(__dirname, 'public', 'resetPass.html')); });
app.get('/register', (req, res, next) => { res.sendFile(path.join(__dirname, 'public', 'register.html')); });
app.post('/register', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const lastName = req.body.lastName;
    const contact = req.body.contact;
    const confirmation = req.body.confirmation;
    console.log(email);
    console.log(password);
    console.log(name);
    console.log(lastName);
    console.log(contact);
    console.log(confirmation);
    res.send('Hi').status(200);
});
app.post('/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    console.log(password);
    res.send('Hi').status(200);
});
app.use('*', (req, res, next) => { res.sendFile(path.join(__dirname, 'public', 'index.html')); });

// Catching all the routes
app.all('*', (req, res) => {
    res.status(404).send();
});

const serverHTTP = http.createServer(app);
serverHTTP.listen(app.get('port'), () => { console.log('server running on port ', app.get('port')); });
