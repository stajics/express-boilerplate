const errors = require('../../config/constants/errors.constant');

module.exports = async (req, res, next) => {
  if (process.env.NODE_ENV === 'test') {
    const token = req.headers.authorization.split(' ')[1];
    const uid = token;

    const userSnap = await firebaseDb.ref(`users/${uid}`).once('value');
    const user = userSnap.val();
    if (!user) return res.unauthorized(errors.invalidToken());

    req.user = user;
    req.user.uid = uid;
    req.user.firebaseUser = {};
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = await firebaseAuth.verifyIdToken(token);

    const { uid } = decodedToken;
    const userSnap = await firebaseDb.ref(`users/${uid}`).once('value');
    const user = userSnap.val();
    if (!user) return res.unauthorized(errors.invalidToken());

    const firebaseUser = await firebaseAuth.getUser(uid);

    req.user = user;
    req.user.uid = uid;
    req.user.firebaseUser = firebaseUser;
    return next();
  } catch (err) {
    return res.unauthorized(errors.invalidToken());
  }
};
