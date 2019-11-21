const { getCookie } = require('../utils/requestTools.js')

module.exports = options => {
  return async function authenticate(ctx, next) {
    const token = ctx.service.auth.getLoginUserInfo()

    if (token == null) {
      ctx.body = {
        code: -1,
      }
    } else await next()
  }
}
