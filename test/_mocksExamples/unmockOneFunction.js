//  __mocks__/myModule.js
const moduleMock = jest.genMockFromModule('./../myModule');

// we don't want to mock `someFunction`
moduleMock.someFunction = jest.fn((...args) => require.requireActual('./../myModule').someFunction(...args));

module.exports = moduleMock;
