'use strict'

module.exports = app => {
  const { router, controller } = app
  router.get('/v1/checkout', controller.checkout.checkoutController.checkout)
  router.post('/v1/order/submit', controller.checkout.checkoutController.submitOrder)
}
