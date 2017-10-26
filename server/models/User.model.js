const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'User email required'],
      unique: [true, 'Email in use'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'User password required'],
      trim: true,
    },
    firstName: {
      type: String,
      required: [true, 'User first name required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'User last name required'],
      trim: true,
    },
  },
  {
    strict: true,
  },
);

class UserClass {
  comparePassword(password) {
    return bcrypt.compare(password, this.password);
  }

  toResponse() {
    const responseObj = this.toObject();
    delete responseObj.password;

    return responseObj;
  }
}

User.pre('save', async function beforeSave(next) {
  try {
    const user = this;
    if (!user.isModified('password')) return next();
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;

    return next();
  } catch (err) {
    next(err);
  }
});

User.loadClass(UserClass);
module.exports = mongoose.model('User', User);
