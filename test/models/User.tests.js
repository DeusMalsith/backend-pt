
// unit test suite for wish model
describe('User Model Unit Tests', function() {

  // for db connection
  const db = require('../../models');
  // for User model to test
  const User = db.User;
  // for chai's expect BDD syntax
  const expect = require('chai').expect;

  /* TODO remaining tests:
   * validate password
   * correct password matches hash
   * JSON excludes password
   * password is saved as a hash */

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
    await db.User.deleteOne({ email: 'this@isOkay.org' })
      .catch(function(err) {
        console.log('err in teardown deleting validUser:', err);
      });
  });

  // User.create tests
  describe('duplicate user may not be created', function() {
    it('should not allow a duplicate email to be added', async function() {
      await User.create({ email: 'this@isOkay.org', name: 'any', password:
        'thisisvalid', type: 'client' })
        .then(function(success) {
          expect(success).to.not.exist;
        })
        .catch(function(err) {
          expect(err).to.exist;
        });
    });
  });

  // User.name tests
  describe('name is required', function() {
    it('should reject an empty name', function() {
      let toReject = new User();
      toReject.name = '       ';
      toReject.validate(function(err) {
        expect(err.errors.name).to.exist;
      });
    });
    it('should accept a valid name', function() {
      let toAccept = new User();
      toAccept.name = 'abadra kensquke\'`el kzFour';
      toAccept.validate(function(err) {
        if (err) {
          expect(err.errors.name).to.not.exist;
        }
      });
    });
  });

  // User.email tests
  describe('email is a valid format', function() {
    it('should reject a missing @', function() {
      let toReject = new User();
      toReject.email = 'noAtSign';
      toReject.validate(function(err) {
        expect(err.errors.email).to.exist;
      });
    });
    it('should accept a valid email format', function() {
      let toAccept = new User();
      toAccept.email = 'this1@valid.org';
      toAccept.validate(function(err) {
        if (err) {
          expect(err.errors.email).to.not.exist;
        }
      });
    });
  });

  // Admins may not be created
  describe('admin creation is blocked', function() {
    it('should not allow an admin to be made', function() {
      let newAdmin = new User();
      newAdmin.admin = true;
      newAdmin.validate(function(err) {
        expect(err.errors.admin).to.exist;
      });
    });
    it('should allow defaulted non-admins to be made', function() {
      let newNormie = new User();
      newNormie.validate(function(err) {
        if (err) {
          expect(err.errors.admin).to.not.exist;
        }
      });
    });
  });

  // User.type tests
  describe('type is valid', function() {
    it('should reject no match', function() {
      let toReject = new User();
      toReject.type = 'wrong';
      toReject.validate(function(err) {
        expect(err.errors.type).to.exist;
      });
    });
    it('should accept client type', function() {
      let toAccept = new User();
      toAccept.type = 'client';
      toAccept.validate(function(err) {
        if (err) {
          expect(err.errors.type).to.not.exist;
        }
      });
    });
    it('should accept provider type', function() {
      let toAccept = new User();
      toAccept.type = 'provider';
      toAccept.validate(function(err) {
        if (err) {
          expect(err.errors.type).to.not.exist;
        }
      });
    });
  });
});
