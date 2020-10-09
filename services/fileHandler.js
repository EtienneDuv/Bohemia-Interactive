const sha1 = require('sha1')

exports.getSHA1 = (string) => {
  return sha1(string)
};