<<<<<<< HEAD
// Hell yeah
=======
// load environmental variables
require('dotenv').config();
// load web framework
const express = require('express');
// load req/res data formmater
const bodyParser = require('body-parser');
// load API route enabler
const cors = require('cors');
// for token security
const expressJWT = require('express-jwt');
// for more informative server feedback in console
const logger = require('morgan');
// start app
const app = express();

// activate body parser middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// helper function: this allows our server to parse incoming token from client
function fromRequest(req){
  if(req.body.headers.Authorization &&
    req.body.headers.Authorization.split(' ')[0] === 'Bearer'){
    return req.body.headers.Authorization.split(' ')[1];
  }
  return null;
}

// // for testing auth routes without tokens
// app.use('/auth', require('./controllers/AUth'));

// protect auth routes with token authentication, excluding not-logged-in
app.use('/auth', expressJWT({
  secret: process.env.JWT_SECRET,
  getToken: fromRequest
}).unless({
  path: [
    { url: '/auth/login', methods: ['POST'] },
    { url: '/auth/signup', methods: ['POST'] }
  ]
}), require('./controllers/Auth'));
app.use('/exercises', require('./controllers/Exercises'));
app.use('/prescriptions', require('./controllers/Prescriptions'));
app.use('/comments', require('./controllers/Comments'));
app.use('/users', require('./controllers/Users'));
// TODO ask jon if he wants /assignments instead
app.use('/assignedExcercises', require('./controllers/AssignedExcercises'));

// start listening
app.listen(3000, function() {
  console.log('Server listening');
});
>>>>>>> upstream/master
