// removes attribute with attName recursevly
const removeAtt = (obj, attName) => {
  if (!obj || typeof obj !== 'object') return;
  if (obj.length) {
    obj.forEach(o => removeAtt(o, attName));
  }
  Object.keys(obj).forEach((prop) => {
    if (typeof obj[prop] === 'object') {
      return removeAtt(obj[prop], attName);
    }
    if (prop === attName) delete obj[prop];
  });
};

module.exports = { removeAtt };
