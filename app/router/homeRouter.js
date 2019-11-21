'use strict'

module.exports = app => {
  const { router, controller } = app
  router.get('/v1/index', controller.home.homeController.index)
}
