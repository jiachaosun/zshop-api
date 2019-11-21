'use strict'

module.exports = app => {
  const { router, controller } = app
  router.post('/v1/auth/weixin', controller.user.authController.weixin)
}
