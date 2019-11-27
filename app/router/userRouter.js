'use strict'

module.exports = app => {
  const { router, controller } = app
  router.post('/auth/weixin', controller.user.authController.weixin)
}
