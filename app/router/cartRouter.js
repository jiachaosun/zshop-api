'use strict'

module.exports = app => {
  const { router, controller } = app
  router.get('/v1/cart/get_cart', controller.cart.cartController.getCart)
  router.post('/v1/cart/add_cart', controller.cart.cartController.addCart)
}
