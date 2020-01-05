const { getCookie } = require("../utils/requestTools.js");

module.exports = options => {
  return async function authenticate(ctx, next) {
    ctx.request.token = ctx.get("token");
    await ctx.service.common.authService.authenticate();
    await next();

    // ctx.userInfo = {
    //   user_id: 1
    // };
    // await next();
    // try {
    //   await ctx.service.common.authService.authenticate();
    //   await next();
    // } catch (e) {
    //   console.error(e);
    //   ctx.status = 401;
    //   ctx.body = {
    //     code: 1000,
    //     msg: "未登录"
    //   };
    // }
  };
};
