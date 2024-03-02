require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const MongoStore = require('connect-mongo');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.DB_URI);

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(
  session({
    secret: process.env.EXPRESS_SESSION,
    store: MongoStore.create(mongoose.connection),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV == 'production',
    },
  })
);

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/posts', require('./routes/posts.routes'));
app.use('/api/images', require('./routes/images.routes'));
app.use('/api/users', require('./routes/users.routes'));

app.get('*', (req, res) => {
  res.redirect('/');
});

app.get('/', (req, res) => {
  res.render('/client/build/index.html');
});

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});
