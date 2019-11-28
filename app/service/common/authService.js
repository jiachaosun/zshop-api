// app/service/product.js
const Service = require("egg").Service;
const { getCookie } = require("../../utils/requestTools.js");
const { parse } = require("../../utils/token");
const { COMMON_PARAMETER_ERROR, AUTH_ERROR } = require("../../exception/exceptionCode");
const { Exception } = require("egg-gat-exception");

class AuthService extends Service {
  constructor(ctx) {
    super(ctx);
    this.userService = ctx.service.common.userService;
    this.filterList = [ "/auth/weixin" ]; // 不需要校验的请求
  }

  /**
   * 校验登录状态
   */
  async authenticate() {
    const { ctx } = this;
    // 过滤无需校验登录请求
    if (this.hasIncludes(ctx.request.url, this.notLoginUrlList())) return;
    const token = ctx.request.token;
    let user;
    try {
      const _token = await parse(token);
      const { user_id } = _token;
      console.log("user_id = " + user_id);
      user = await this.userService.findUserById(user_id);
      console.log(user);
    } catch (e) {
      ctx.status = 401;
      ctx.app.logger.error(e);
      throw new Exception(AUTH_ERROR);
    }
    ctx.userInfo = {
      user_id: user.id,
      name: user.name,
      mobile: user.mobile
    };
  }

  hasIncludes(requestUrl, array) {
    let url = requestUrl;
    if (url.includes("?")) {
      url = url.substring(0, url.lastIndexOf("?"));
    }
    return array.includes(url);
  }

  /**
   * 不需要校验header参数的请求
   * @returns {*[]}
   */
  notHeaderUrlList() {
    const array = [];
    return array.concat(this.filterList);
  }

  /**
   * 不需要校验登录的请求
   * @returns {*[]}
   */
  notLoginUrlList() {
    const array = [];
    return array.concat(this.filterList);
  }
}

module.exports = AuthService;
