/* This model represents all logged in users for the app. For client user
 * types, it also provides quick access to their active prescription. */
// ORM
const mongoose = require('mongoose');
// for password hashing
const bcrypt = require('bcrypt');
// define createable account types
const types = ['client', 'provider'];

//
// validatation helper functions
// refer to https://mongoosejs.com/docs/api.html#schematype_SchemaType-validate
//

// returns true if format conforms to a broad email format, else false
const validateEmail = (email) => {
  // compare email against a regular expression to validate format
  let re = /^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i;
  return re.test(email);
}

// confirm type matches possible list
const validateType = (type) => types.includes(type) ? true : false;

// cannot create an admin
const validateNotAdmin = (admin) => admin ? false : true;

//
// schemas
//

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: 'Please provide an e-mail address',
    validate: [validateEmail, 'Please enter a valid e-mail address']
  },
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 2,
    maxlength: 40
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 24
  },
  type: {
    type: String,
    required: true,
    validate: [validateType, 'That account type does not exist.']
  },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  prescription: {
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' }
  },
  admin: {
    type: Boolean,
    default: false,
    validate: [validateNotAdmin, 'That action is not allowed.']
  }
});

// exclude password from being sent through API requests
userSchema.set('toJSON', {
  transform: function(doc, user, options) {
    const returnJson = {
      id: user._id,
      email: user.email,
      name: user.name,
      type: user.type,
      admin: user.admin
    };
    return returnJson;
  }
});

// method for verifying correct password
userSchema.methods.authenticated = function(password) {
  return bcrypt.compareSync(password, this.password);
}

// hash password before saving it to DB
userSchema.pre('save', function(next) {
  const hash = bcrypt.hashSync(this.password, 11);
  // store the hash as the user's password
  this.password = hash;
  next();
});

// let User model be used by other files
module.exports = mongoose.model('User', userSchema);
