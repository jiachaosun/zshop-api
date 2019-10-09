'use strict'

/**
 * @param {Egg.Application} app - egg application
 */

const API_PREFIX = '/api'

module.exports = app => {
  const { router, controller } = app
  router.get(API_PREFIX + '/', controller.home.index)
  router.get(API_PREFIX + '/goods/:goodsId', controller.product.find) 
  router.post(API_PREFIX + '/auth/weixin', controller.auth.weixin)
  router.post(API_PREFIX + '/cart/addCart', controller.cart.addCart)
  router.get(API_PREFIX + '/cart/getCart', controller.cart.getCart)
  router.get(API_PREFIX + '/checkout', controller.checkout.checkout)
  router.post(API_PREFIX + '/order/submit', controller.checkout.submitOrder)

}

