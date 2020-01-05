/**
 * 获取cookie值
 */
const getCookie = (name, cookie) => {
  const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  const arr = cookie.match(reg);
  if (arr) {
    return arr[2];
  }
  return null;
};

module.exports = {
  getCookie
};
