'use strict'

module.exports = app => {
  const { router, controller } = app
  router.get('/home/index', controller.home.homeController.index) //首页
}
