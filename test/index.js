require('../index');
const ApiClient = require('./_testUtils/ApiClient.js');
const db = require('./_testUtils/db');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;

global.client = new ApiClient();
global.jestTest = (testName, testFunc) => {
  test(testName, (done) => {
    logger.silly('######################################################################################################################');
    logger.silly(testName);
    logger.silly('######################################################################################################################');
    testFunc(done);
  });
};

beforeEach(async () => {
  await db.clear();
  await db.init();
});
