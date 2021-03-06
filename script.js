const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
var bodyParser = require('body-parser')
var cors = require('cors');
const database = {
    users: [{
        id: '123',
        name: 'Andrei',
        email: 'john@gmail.com',
        password: 'cookies',
        entries: 0,
        joined: new Date()
    }],
    secrets: {
        users_id: '123',
        hash: ''
    }
}
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => res.send(database.users))

app.post('/signin', (req, res) => {
    // var a         = JSON.parse(req.body);
    var a = req.body;
    if (a.email === database.users[0].email && a.password === database.users[0].password) {
        res.json('success');
    } else {
        res.json('access denied');
    }
})

app.post('/findface', (req, res) => {
    database.users.forEach(user => {
        if (user.email === req.body.email) {
            user.entries++
                res.json(user.entries)
        }
    });
    res.json('nope')
})

app.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, null, null, function(err, hash) {
        console.log(hash);
    })
    database.users.push({
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1])
})

app.get('/profile/:userId', (req, res) => {
    database.users.forEach(user => {
            if (user.id === req.params.userId) {
                return res.json(user);
            }
        })
        // res.json('no user')
})
app.listen(3000, () => console.log('Example app listening on port 3000!'))