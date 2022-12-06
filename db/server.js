import express from 'express';
import cors from 'cors';
import users from './api/users.route.js';
import tickets from './api/tickets.route.js';
import theaters from './api/theaters.route.js';
import movies from './api/movies.route.js';
import reviews from './api/reviews.route.js';
import bank from './api/bank.route.js';
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

app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
});

app.use('/users', users);
app.use('/tickets', tickets);
app.use('/theaters', theaters);
app.use('/movies', movies);
app.use('/reviews', reviews);
app.use('/bank', bank);

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));
