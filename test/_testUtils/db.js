const { isEmpty } = require('lodash');

global.fixtures = {
  users: [],
};

const initUsers = async () => {
  // Users
  const user1uid = 'user1';
  const newUser1 = {
    firstName: 'user1_name',
    lastName: 'user1_lastname',
    email: 'user1@test.com',
    password: 'password',
    token: 'user1',
  };
  await firebaseDb.ref(`users/${user1uid}`).set(newUser1);
  const user2uid = 'user2';
  const newUser2 = {
    firstName: 'user2_name',
    lastName: 'user2_lastname',
    email: 'user2@test.com',
    password: 'password',
    token: 'user2',
  };
  await firebaseDb.ref(`users/${user2uid}`).set(newUser2);
  const user3uid = 'user3';
  const newUser3 = {
    firstName: 'user3_name',
    lastName: 'user3_lastname',
    email: 'user3@test.com',
    password: 'password',
    token: 'user3',
  };
  await firebaseDb.ref(`users/${user3uid}`).set(newUser3);

  newUser1.uid = user1uid;
  newUser2.uid = user2uid;
  newUser3.uid = user3uid;

  fixtures.users.push(newUser1);
  fixtures.users.push(newUser2);
  fixtures.users.push(newUser3);
};

const init = async () => {
  await initUsers();
};

const clear = async () => {
  await firebaseDb.ref('users').set({});

  const usersList = await firebaseAuth.listUsers();
  if (!isEmpty(usersList.users)) {
    await Promise.all(usersList.users.map(user => firebaseAuth.deleteUser(user.uid)));
  }
};

module.exports = {
  init,
  clear,
};
