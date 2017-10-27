const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');

const config = require('../../config');

global.fixtures = {
  users: [],
};

const initUsers = async () => {
  // Users
  let newUser1 = new User({
    _id: '189b5b4aa79dff2f7fe6659d',
    email: 'user1@test.com',
    password: 'password',
    firstName: 'user1_name',
    lastName: 'user1_lastname',
  });
  let newUser2 = new User({
    _id: '289b5b4aa79dff2f7fe6759d',
    email: 'user2@test.com',
    password: 'password',
    firstName: 'user2_name',
    lastName: 'user2_lastname',
  });
  let newUser3 = new User({
    _id: '389b5b4aa79dff2f7fe6859d',
    email: 'user3@test.com',
    password: 'password',
    firstName: 'user3_name',
    lastName: 'user3_lastname',
  });

  newUser1 = await newUser1.save();
  newUser2 = await newUser2.save();
  newUser3 = await newUser3.save();

  newUser1.token = jwt.sign({
    sub: newUser1._id,
    timestamp: new Date().getTime(),
  }, config.JWT_SECRET_KEY, { expiresIn: config.JWT_EXPIRES_IN });
  newUser2.token = jwt.sign({
    sub: newUser2._id,
    timestamp: new Date().getTime(),
  }, config.JWT_SECRET_KEY, { expiresIn: config.JWT_EXPIRES_IN });
  newUser3.token = jwt.sign({
    sub: newUser3._id,
    timestamp: new Date().getTime(),
  }, config.JWT_SECRET_KEY, { expiresIn: config.JWT_EXPIRES_IN });
  newUser1.password = 'password';
  newUser2.password = 'password';
  newUser3.password = 'password';

  fixtures.users.push(newUser1);
  fixtures.users.push(newUser2);
  fixtures.users.push(newUser3);
};

const init = async () => {
  await initUsers();
};

const clear = async () => {
  await User.remove({}, () => {});
};

module.exports = {
  init,
  clear,
};
