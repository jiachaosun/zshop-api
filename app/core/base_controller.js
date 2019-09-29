const { Controller } = require('egg')
class BaseController extends Controller {
  get user() {
    return this.ctx.session.user
  }

  success(data) {
    this.ctx.body = {
      code: 0,
      msg: 'ok',
      data,
    }
  }

  fail({ code, msg }) {
    this.ctx.body = {
      code,
      msg,
    }
  }

  notFound(msg) {
    msg = msg || 'not found'
    this.ctx.throw(404, msg)
  }
}
module.exports = BaseController
