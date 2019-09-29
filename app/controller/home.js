'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    const allProducts = await ctx.service.product.findAll()
    ctx.body = {
      code: 0,
      msg: 'ok',
      data: allProducts,
    }
  }
}

module.exports = HomeController
