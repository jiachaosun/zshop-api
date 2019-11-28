const { failure, success } = require("../utils/response");

const { Controller } = require("egg");

class BaseController extends Controller {
  success(data) {
    this.ctx.body = success(data);
  }

  failure(data) {
    this.ctx.body = failure(data);
  }
}

module.exports = BaseController;
