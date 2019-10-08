// app/service/product.js
const Service = require('egg').Service
const keys = require('lodash/keys')
const isNil = require('lodash/isNil')

class CartService extends Service {
  async add(cartInfo) {
    const {
      specValues,
      goods_id,
      goods_no,
      sku_id,
      goods_name,
      price,
      amount,
    } = cartInfo

    // 先查询购物车中有没有相同商品和规格
    const cartInfoExisted = await this.app.mysql.get('zshop_tb_cart', {
      user_id: 1,
      goods_id,
      sku_spec_id: sku_id,
    })
    console.log('cart info in db ' + JSON.stringify(cartInfoExisted))
    let result = null
    if (cartInfoExisted == null) {
      result = await this.app.mysql.insert('zshop_tb_cart', {
        user_id: 1,
        goods_id,
        goods_no,
        sku_spec_id: sku_id,
        goods_name,
        price,
        amount,
        selected: 0,
        pic_url: '',
      })
    } else {
      result = await this.app.mysql.update('zshop_tb_cart', {
        ...cartInfoExisted,
        amount: cartInfoExisted.amount + 1,
      })
    }

    console.log(result)
    return result.insertId
  }
}

module.exports = CartService
