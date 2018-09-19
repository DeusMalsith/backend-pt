describe('Auth Controller Unit Tests', function() {

  // for making test requests
  const request = require('supertest');
  // for chai's expect BDD syntax
  const expect = require('chai').expect;
  // for creating test samples
  const db = require('../../models');

  // load server
  const server = request.agent('http://localhost:3000');

  //
  // setup
  //

  beforeEach(async function() {
    // create valid user
    await db.User.create({
      email: 'this@isOkay.org',
      name: 'a valid name',
      password: 'atleast6char',
      type: 'client'
    })
      .catch(function(err) {
        console.log('err in setup creating validUser:', err);
      });
  });

  //
  // teardown
  //

  afterEach(async function() {
    // remove valid user
    await db.User.deleteMany({})
      .then(function(success) {
        // console.log('successfully cleared db')
      })
      .catch(function(err) {
        // console.log('err clearing db:', err);
      });
  });

  //
  // login testing
  //

  describe('login with unregistered email', function() {
    it('should respond with 400', function(done) {
      server
        .post('/auth/login')
        .send({ email: 'this@isInvalid.org' })
        .expect(400)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.err).equal('That email is not registered');
          done();
        })
    });
  });

  describe('login with valid email, but wrong password', function() {
    it('should respond with 401', function(done) {
      server
        .post('/auth/login')
        .send({ email: 'this@isOkay.org', password: 'fail' })
        .expect(401)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.err).equal('Invalid credentials');
          done();
        })
    });
  });

  describe('login with valid email, but no password', function() {
    it('should respond with 401', function(done) {
      server
        .post('/auth/login')
        .send({ email: 'this@isOkay.org' })
        .expect(401)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.err).equal('Invalid credentials');
          done();
        })
    });
  });

  describe('login with valid data', function() {
    it('should respond with 200', function(done) {
      server
        .post('/auth/login')
        .send({ email: 'this@isOkay.org', password: 'atleast6char' })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.token).to.exist;
          done();
        })
    });
  });


  //
  // signup testing
  //

  describe('signup with email already in use', function() {
    it('should respond with 503', function(done) {
      server
        .post('/auth/signup')
        .send({ email: 'this@isOkay.org', password: 'whatever', type: 'client',
          name: 'doesnt matter' })
        .expect(503)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.err).to.be.equal('Email is already used');
          done();
        });
    });
  });

  describe('signup with valid data and no db conflict', function() {
    it('should respond with 201', function(done) {
      server
        .post('/auth/signup')
        .send({ email: 'this@shouldGo.org', password: 'atleast6char', type:
          'client', name: 'doesnt matter' })
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.err).to.not.exist;
          expect(res.body.token).to.exist;
          done();
        });
    });
  });

  //
  // auth from token testing
  //

  describe('login from token with invalid id', function() {
    it('should respond with 400', function(done) {
      server
        .post('/auth/me/from/token')
        .send({ id: 2018 })
        .expect(400)
        .end(function(err ,res) {
          if (err) return done(err);
          expect(res.body.err).to.be.equal('User not found');
          done();
        });
    });
  });

  describe('login from token with valid id', function() {
    it('should respond with 200', function(done) {
      // validUser should start undefined, because mongoose returns "null"
      let validUser;
      // get first User document
      db.User.findOne()
        .then(result => {
          if (result) {
          server
            .post('/auth/me/from/token')
            .send({ id: result.id })
            .expect(200)
            .end(function(err, res) {
              if (err) return done(err);
              expect(res.body.err).to.not.exist;
              /* NOTE the objects should not be equivalent, no password sent
               * back */
              expect(res.body.user.id).to.equal(validUser.id);
              done();
            });
          }
          else {
            return done('user not found');
          }
        })
        .catch(err => {
          console.log('err in auth from token');
        });
    });
  });
});
