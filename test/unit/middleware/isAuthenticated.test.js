require('../../index');
const isAuthenticated = require('../../../server/middlewares/isAuthenticated.midleware');

const mockUnauthorized = jest.fn(err => err);
const mockNext = jest.fn();
const res = {};
res.unauthorized = mockUnauthorized;

describe(':isAuthenticated', () => {
  jestTest('Should authenticate', async (done) => {
    await isAuthenticated({ headers: { authorization: `Bearer ${fixtures.users[0].token}` } }, res, mockNext);
    expect(mockNext.mock.calls.length).toBe(1);
    done();
  });

  jestTest('Should error (bad token)', async (done) => {
    await isAuthenticated({ headers: { authorization: 'Bearer badToken' } }, res);
    expect(mockUnauthorized.mock.calls.length).toBe(1);
    done();
  });
});
