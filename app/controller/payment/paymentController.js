"use strict";

const Controller = require("../../core/baseController");
const xml2js = require("xml2js");

class PaymentController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.paymentService = ctx.service.payment.paymentService;
    this.orderService = ctx.service.order.orderService;
  }

  async prepay() {
    const { ctx } = this;
    const result = await this.paymentService.createPrepayInfo();
    this.success(result);
  }

  async notifyCallback() {
    const { ctx } = this;
    const xml = ctx.request.body;
    let xmlContent;
    try {
      xmlContent = await xml2js.parseStringPromise(xml);
      console.log(xmlContent);

      const { out_trade_no, transaction_id } = xmlContent.xml;
      const order = await this.orderService.getOrder({ order_sn: out_trade_no });
      const updateResult = await this.orderService.updateOrder({
        id: order.id,
        pay_id: transaction_id,
        pay_status: 2,
        order_status: 2
      });
      if (updateResult) {
        ctx.body = `<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>`;
      } else {

      }
    } catch (e) {
      ctx.body = `<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[支付失败]]></return_msg></xml>`;
    }
  }
}

module.exports = PaymentController;
