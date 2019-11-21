'use strict'

const Controller = require('egg-gat-common-modules').BasicController

class HomeController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.homeService = ctx.service.home.homeService
  }

  async index() {
    const { ctx } = this
    const allProducts = await this.homeService.findAll()
    this.success(allProducts)
  }
}

module.exports = HomeController
