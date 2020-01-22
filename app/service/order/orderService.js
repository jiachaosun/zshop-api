// app/service/product.js
const Service = require("egg").Service;
const _ = require("lodash");
const dayjs = require("dayjs");

const ORDER_TABLE_NAME = "zshop_tb_order";

class OrderService extends Service {

  constructor(ctx) {
    super(ctx);
  }

  async list() {
    const { ctx } = this;
    const orders = await this.app.mysql.select(ORDER_TABLE_NAME, {
      where: { user_id: ctx.userInfo.user_id }
    });

    //处理数据格式
    let newOrderList = [];
    for (let orderItem of orders) {
      // 获取订单下属的商品列表
      const orderGoods = await this.getOrderGoods(orderItem.id);
      let totalGoodsCount = 0;
      orderGoods.forEach(goods => {
        totalGoodsCount += goods.amount;
      });
      newOrderList.push({
        ...orderItem,
        created_time: dayjs(orderItem.created_time) //转换时间
          .format("YYYY-MM-DD HH:mm:ss"),
        order_goods: orderGoods,
        totalGoodsCount,
        order_display_status: this.getOrderDisplayStatus(orderItem.order_status)
      });
    }

    return newOrderList;
  }

  getOrderDisplayStatus(status) {
    switch (parseInt(status)) {
      case 1:
        return "待支付";
      case 2:
        return "已支付";
      case 3:
        return "已取消";
      case 4:
        return "已退款";
    }
  }


  async getOrder(params) {
    const order = await this.app.mysql.get(ORDER_TABLE_NAME, { ...params });
    return order;
  }

  async createOrder(params) {
    const addOrderResult = await this.app.mysql.insert(
      ORDER_TABLE_NAME,
      params
    );
    return addOrderResult.insertId;
  }

  async updateOrder(params) {
    const result = await this.app.mysql.update(ORDER_TABLE_NAME, { ...params });
    return result.affectedRows === 1;
  }

  /**
   * 获取订单下的sku信息
   * @param orderId 订单编号
   */
  async getOrderGoods(orderId) {
    const results = await this.app.mysql.select("zshop_tb_order_goods", {
      where: { order_id: orderId }
    });
    return results;
  }

  /**
   * 订单详情
   * @param params
   */
  async getOrderDetail(params) {
    const { order_id } = params;
    const orderInfo = await this.getOrder({ id: order_id });
    let orderGoods = await this.getOrderGoods(order_id);
    orderGoods = orderGoods.map(orderGood => {
      return {
        ...orderGood,
        sku_attrs_values: JSON.parse(orderGood.sku_attrs_values)
      };
    });

    return {
      ...orderInfo,
      created_time: dayjs(orderInfo.created_time) //转换时间
        .format("YYYY-MM-DD HH:mm:ss"),
      order_goods: orderGoods
    };
  }
}

module.exports = OrderService;
