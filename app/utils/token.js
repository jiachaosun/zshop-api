const jwt = require("jsonwebtoken");
const secret = "zhuerlehaha6233@!";
const _ = require("lodash");

async function create(userInfo) {
  return jwt.sign(userInfo, secret, { expiresIn: 60 * 10 });
}

async function parse(token) {
  if (token) {
    try {
      return jwt.verify(token, secret);
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  return null;
}

async function verify(token) {
  const result = await this.parse(token);
  return !_.isEmpty(result);
}

module.exports = {
  create,
  parse,
  verify
};
