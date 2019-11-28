// app/service/product.js
const Service = require("egg").Service;
const _ = require("lodash");

class OrderService extends Service {

  constructor(ctx) {
    super(ctx);
  }

  async list() {
    const orders = await this.app.mysql.select("zshop_tb_order");
    return orders;
  }

  async getOrder(params) {
    const order = await this.app.mysql.get("zshop_tb_order", { ...params });
    return order;
  }

  async updateOrder(params) {
    const result = await this.app.mysql.update("zshop_tb_order", { ...params });
    return result.affectedRows === 1;
  }
}

module.exports = OrderService;
