// app/service/product.js
const Service = require("egg").Service;
const keys = require("lodash/keys");
const isNil = require("lodash/isNil");
const padStart = require("lodash/padStart");
const random = require("lodash/random");

class CheckoutService extends Service {
  constructor(ctx) {
    super(ctx);
    this.cartService = ctx.service.cart.cartService;
  }

  async getCheckoutInfo() {
    const cartData = await this.cartService.getCart();
    const selectedCartData = cartData.filter(
      cartItem => cartItem.selected === 1
    );

    console.log("=== 选中的购物车数据 ===");
    console.log(selectedCartData);

    return selectedCartData;
  }

  async submitOrder(address) {
    const selectedGoodsInCart = await this.cartService.getCart();

    // 解析地址
    const {
      cityName,
      countyName,
      detailInfo,
      nationalCode,
      postalCode,
      provinceName,
      telNumber,
      userName
    } = address;

    // 统计商品总价
    let goodsTotalPrice = 0.0;
    for (const cartItem of selectedGoodsInCart) {
      goodsTotalPrice += cartItem.amount * cartItem.price;
    }

    // 订单价格计算
    const freightPrice = 0.0; // 运费设置为0
    const couponPrice = 0.0; // 优惠券设置为0
    const orderTotalPrice = goodsTotalPrice + freightPrice - couponPrice; // 订单的总价
    const actualPrice = orderTotalPrice - 0.0; // 减去其它支付的金额后，要实际支付的金额
    const currentTime = new Date();

    const orderInfo = {
      order_sn: this.generateOrderNumber(),
      user_id: this.ctx.userInfo.user_id,

      // 收货地址和运费
      consignee: userName,
      mobile: telNumber,
      province: provinceName,
      city: cityName,
      district: countyName,
      address: detailInfo,
      // freight_price: 0.0,

      created_time: currentTime,
      goods_price: goodsTotalPrice,
      order_price: orderTotalPrice,
      actual_price: actualPrice
    };

    const addOrderResult = await this.app.mysql.insert(
      "zshop_tb_order",
      orderInfo
    );

    orderInfo.id = addOrderResult.insertId;
  }

  /**
   * 生成订单的编号order_sn
   * @returns {string}
   */
  generateOrderNumber() {
    const date = new Date();
    return (
      date.getFullYear() +
      padStart(date.getMonth(), 2, "0") +
      padStart(date.getDay(), 2, "0") +
      padStart(date.getHours(), 2, "0") +
      padStart(date.getMinutes(), 2, "0") +
      padStart(date.getSeconds(), 2, "0") +
      random(100000, 999999)
    );
  }
}

module.exports = CheckoutService;
