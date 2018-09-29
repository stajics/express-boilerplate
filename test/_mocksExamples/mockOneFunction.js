//  __mocks__/myModule.js
const myModule = require.requireActual('../myModule');

// we want to mock `someFunction`
myModule.someFunction = jest.fn();

module.exports = myModule;
