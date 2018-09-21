const errors = require('../../config/constants/errors.constant');
const { pickBy, identity } = require('lodash');

const createUser = async (req, res, next) => {
  let user = null;
  try {
    const {
      firstName, lastName, email, password,
    } = req.body;

    user = await firebaseAuth.createUser({
      email,
      password,
    });

    const newUserObject = {
      email,
      password,
      firstName,
      lastName,
    };
    firebaseDb.ref(`users/${user.uid}`).set(newUserObject);

    newUserObject.uid = user.uid;

    res.ok(newUserObject);
  } catch (err) {
    if (user) await firebaseAuth.deleteUser(user.uid);
    next(err);
  }
};

const editUser = async (req, res, next) => {
  try {
    const {
      firstName, lastName,
    } = req.body;
    const { uid } = req.params;

    if (uid !== req.user.uid) {
      throw errors.unauthorized();
    }

    const attributesToUpdate = pickBy({
      firstName,
      lastName,
    }, identity);

    await firebaseDb.ref(`users/${uid}`).update(attributesToUpdate);

    res.ok({
      text: 'Edited user.',
      changedAttributes: attributesToUpdate,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  editUser,
};
