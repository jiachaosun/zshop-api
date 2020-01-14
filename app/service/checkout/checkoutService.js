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
    this.orderService = ctx.service.order.orderService;
    this.productService = ctx.service.product.productService;
  }

  async getCheckoutInfo() {
    const cartData = await this.cartService.getCart();
    let selectedCartData = cartData.filter(
      cartItem => cartItem.selected === 1
    );

    let newCartItemList = [];
    let totalGoodsCount = 0;
    for (let cartItem of selectedCartData) {
      const goods = await this.productService.findGoods(cartItem.goods_id);
      totalGoodsCount += cartItem.amount;
      const { main_imgs } = goods;
      newCartItemList.push({
        ...cartItem,
        main_imgs
      });
    }

    return {
      cart_items: newCartItemList,
      total_goods_price: this.calcTotalGoodsPrice(selectedCartData),
      totalGoodsCount
    };
  }

  async submitOrder(address) {
    // 购物车中选中的商品
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

    // 构造订单数据
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
      actual_price: actualPrice,

      order_status: 1 // 1：已生成订单，未支付
    };

    const orderId = await this.orderService.createOrder(orderInfo);
    orderInfo.id = orderId;

    for (const goodsItem of selectedGoodsInCart) {

      const specValueResult = await this.productService.getSkuSpecValue(goodsItem.sku_spec_id);

      await this.app.mysql.insert("zshop_tb_order_goods", {
        order_id: orderId,
        goods_id: goodsItem.goods_id,
        // goods_sn: goodsItem.goods_sn,
        sku_spec_id: goodsItem.sku_spec_id,
        amount: goodsItem.amount,
        goods_name: goodsItem.goods_name,
        pic_url: isNil(goodsItem.main_imgs) ? "" : goodsItem.main_imgs.split(",")[0],
        market_price: goodsItem.market_price,
        retail_price: goodsItem.price,
        sku_attrs_values: specValueResult.goods_attrs
      });
    }

    return orderInfo;
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

  calcTotalGoodsPrice(selectedGoodsInCart) {
    // 统计商品总价
    let goodsTotalPrice = 0.0;
    for (const cartItem of selectedGoodsInCart) {
      goodsTotalPrice += cartItem.amount * cartItem.price;
    }
    return goodsTotalPrice.toFixed(2);
  }
}

module.exports = CheckoutService;
