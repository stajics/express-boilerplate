module.exports = {
  badCredentials: () => {
    const error = new Error();
    error.code = 1;
    error.message = 'Bad credentials';
    return error;
  },

  noAuthHeader: () => {
    const error = new Error();
    error.code = 2;
    error.message = 'Missing Authorization header';
    return error;
  },

  invalidToken: () => {
    const error = new Error();
    error.code = 3;
    error.message = 'Invalid token';
    return error;
  },

  unauthorized: () => {
    const error = new Error();
    error.code = 4;
    error.message = 'Unauthorized.';
    error.status = 401;
    return error;
  },
};
