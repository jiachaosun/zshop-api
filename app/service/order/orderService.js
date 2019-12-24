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
    const orders = await this.app.mysql.select(ORDER_TABLE_NAME);

    //处理数据格式
    let newOrderList = [];
    for (let orderItem of orders) {
      // 获取订单下属的商品列表
      const orderGoods = await this.getOrderGoods(orderItem.id);
      newOrderList.push({
        ...orderItem,
        created_time: dayjs(orderItem.created_time) //转换时间
          .format("YYYY-MM-DD HH:mm:ss"),
        order_goods: orderGoods
      });
    }

    return newOrderList;
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

  async getOrderGoods(orderId) {
    const results = await this.app.mysql.select("zshop_tb_order_goods", {
      where: { order_id: orderId }
    });
    return results;
  }
}

module.exports = OrderService;
