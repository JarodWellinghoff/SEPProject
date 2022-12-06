import express from 'express';
import cors from 'cors';
import users from './api/users.route.js';
import tickets from './api/tickets.route.js';
import theaters from './api/theaters.route.js';
import movies from './api/movies.route.js';
import reviews from './api/reviews.route.js';
import bank from './api/bank.route.js';
import fs from 'fs';
import path from 'path';

const app = express();
const corsOptions = {
  // origin: 'https://mytechmap.netlify.app',
  // origin: 'localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
  AccessControlAllowOrigin: "*",
  // AccessControlAllowCredentials: false,

};


app.use(cors(corsOptions));
app.use(express.json());

// log in route
// check if the user exists in the database
// if the user exists, check if the password is correct
// if the password is correct, return a token
// if the password is incorrect, return an error
// if the user does not exist, return an error
app.post('/login', (req, res) => {
  function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const { username, password } = req.body;
  const data = fs.readFileSync(path.resolve() + '/collections/users.json');
  const users = JSON.parse(data);
  const user = users.find(u => u.username === username);

  if (user && user.password === password) {
    const token = { token: makeid(20) };
    // add the token to the user object
    user.current_token = token.token;
    // update the user in the database
    fs.writeFileSync(path.resolve() + '/collections/users.json', JSON.stringify(users, null, 2));
    res.json(token);
  } else {
    res.status(400).json({ error: 'Username or password is incorrect' });
  }
});

// log out route
// remove the token from the session storage
app.post('/logout', (req, res) => {
  // remove the token from the user object
  console.log(req.body.token);
  const token = req.body.token;
  const data = fs.readFileSync(path.resolve() + '/collections/users.json');
  const users = JSON.parse(data);
  const user = users.find(u => u.current_token === token);
  user.current_token = '';
  // update the user in the database
  fs.writeFileSync(path.resolve() + '/collections/users.json', JSON.stringify(users, null, 2));
  res.json({ message: 'User logged out' });
});


app.use('/users', users);
app.use('/tickets', tickets);
app.use('/theaters', theaters);
app.use('/movies', movies);
app.use('/reviews', reviews);
app.use('/bank', bank);

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));
