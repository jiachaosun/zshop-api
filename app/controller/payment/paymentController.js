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
    const { order_id } = ctx.request.body;
    const result = await this.paymentService.createPrepayInfo(order_id);
    this.success(result);
  }

  async notifyCallback() {
    const { ctx } = this;
    const xml = ctx.request.body;
    let xmlContent;
    try {
      xmlContent = await xml2js.parseStringPromise(xml);
      const payResult = this.paymentService.payNotify(xmlContent.xml);
      if (!payResult) {
        return `<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[支付失败]]></return_msg></xml>`;
      }

      const { out_trade_no, transaction_id } = payResult;
      const order = await this.orderService.getOrder({ order_sn: out_trade_no });
      const updateResult = await this.orderService.updateOrder({
        id: order.id,
        pay_id: transaction_id,
        pay_status: 2, //支付回调成功
        order_status: 2 //已支付
      });
      if (updateResult) {
        ctx.body = `<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>`;
      } else {

      }
    } catch (e) {
      ctx.body = `<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[支付失败]]></return_msg></xml>`;
    }
  }

  async refund() {
    const { ctx } = this;
    const { order_id } = ctx.request.body;
    const result = await this.paymentService.refund(order_id);
    this.success(1);
  }

  async notifyRefundCallback() {
    const { ctx } = this;
    let info = ctx.request.weixin;
    console.log(info);

    const { out_trade_no, transaction_id } = info.req_info;
    const order = await this.orderService.getOrder({ order_sn: out_trade_no });
    const updateResult = await this.orderService.updateOrder({
      id: order.id,
      pay_id: transaction_id,
      pay_status: 4, //2支付成功，3退款成功
      order_status: 4 //2支付成功，3订单取消退款中，4订单取消已退款
    });

    this.success(updateResult);
  }
}

module.exports = PaymentController;
