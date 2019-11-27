const jwt = require("jsonwebtoken");
const secret = "zhuerlehaha6233@@";
const _ = require("lodash");

async function create(userInfo) {
  const token = jwt.sign(userInfo, secret);
  return token;
}

async function parse(token) {
  if (token) {
    try {
      return jwt.verify(token, secret);
    } catch (err) {
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
