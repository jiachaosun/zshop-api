const { getCookie } = require("../utils/requestTools.js");

module.exports = options => {
  return async function authenticate(ctx, next) {
    ctx.request.token = ctx.get("token");
    await ctx.service.common.authService.authenticate();
    await next();
  };
};
