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
    let newOrderList = orders.map(order => {
      return {
        ...order,
        created_time: dayjs(order.created_time)
          .format("YYYY-MM-DD HH:mm:ss")
      };
    });

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
}

module.exports = OrderService;
