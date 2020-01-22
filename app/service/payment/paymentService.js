// app/service/product.js
const Service = require("egg").Service;
const _ = require("lodash");
const tenpay = require("tenpay");

class PaymentService extends Service {

  constructor(ctx) {
    super(ctx);
    this.userService = ctx.service.common.userService;
  }

  async createPrepayInfo(order_id) {
    console.log("order id " + order_id);
    const orderInfo = await this.app.mysql.get("zshop_tb_order", { id: order_id });

    const { user_id } = orderInfo;
    const user = await this.userService.findUserById(user_id);
    const { weixin_openid } = user;
    console.log("=== weixin_openid " + weixin_openid);

    const returnParams = await this.createUnifiedOrder({
      openid: weixin_openid,
      body: "订单编号：" + orderInfo.order_sn,
      out_trade_no: orderInfo.order_sn,
      total_fee: 1,
      spbill_create_ip: ""
    });
    return returnParams;
  }

  async refund(order_id) {
    console.log(order_id);
    const orderInfo = await this.app.mysql.get("zshop_tb_order", { id: order_id });

    const { user_id } = orderInfo;
    const user = await this.userService.findUserById(user_id);
    const { weixin_openid } = user;

    const weixinConfig = this.config.weixin;
    const { appid, secret, mch_id, partner_key, refund_url } = weixinConfig;
    const api = new tenpay({
      appid: appid, // 微信小程序appid
      mchid: mch_id, // 商户帐号ID
      partnerKey: partner_key, // 秘钥
      refund_url: refund_url,
      pfx: require("fs")
        .readFileSync("./cert/apiclient_cert.p12")
    });

    let result = await api.refund({
      out_trade_no: orderInfo.order_sn,
      out_refund_no: orderInfo.order_sn,
      total_fee: 1,
      refund_fee: 1
    });

    console.log(result);
    return result;
  }

  async createUnifiedOrder(prepayInfo) {
    const weixinConfig = this.config.weixin;
    const { appid, secret, mch_id, partner_key, notify_url } = weixinConfig;

    const api = new tenpay({
      appid: appid, // 微信小程序appid
      mchid: mch_id, // 商户帐号ID
      partnerKey: partner_key, // 秘钥
      notify_url: notify_url
    });

    let result = await api.getPayParams({
      out_trade_no: prepayInfo.out_trade_no,
      body: prepayInfo.body,
      total_fee: prepayInfo.total_fee,
      openid: prepayInfo.openid
    });

    console.log("微信支付参数");
    console.log(result);

    return result;
  }

  /**
   * 处理微信支付回调
   */
  payNotify(notifyData) {
    if (_.isEmpty(notifyData)) {
      return false;
    }

    const notifyObj = {};
    let sign = "";
    for (const key of Object.keys(notifyData)) {
      if (key !== "sign") {
        notifyObj[key] = notifyData[key][0];
      } else {
        sign = notifyData[key][0];
      }
    }
    if (notifyObj.return_code !== "SUCCESS" || notifyObj.result_code !== "SUCCESS") {
      return false;
    }
    const signString = this.signQuery(this.buildQuery(notifyObj));
    if (_.isEmpty(sign) || signString !== sign) {
      // 验证支付回调的签名！
      return false;
    }
    console.log("支付验证回调验签名通过~");
    return notifyObj;
  }

  refundNotify(notifyData) {
    if (_.isEmpty(notifyData)) {
      return false;
    }

    const notifyObj = {};
    let sign = "";
    for (const key of Object.keys(notifyData)) {
      if (key !== "sign") {
        notifyObj[key] = notifyData[key][0];
      } else {
        sign = notifyData[key][0];
      }
    }
    if (notifyObj.return_code !== "SUCCESS") {
      return false;
    }
    const signString = this.signQuery(this.buildQuery(notifyObj));
    if (_.isEmpty(sign) || signString !== sign) {
      // 验证支付回调的签名！
      return false;
    }
    console.log("退款验证回调验签名通过~");
    return notifyObj;
  }

  buildQuery(queryObj) {
    const sortPayOptions = {};
    for (const key of Object.keys(queryObj)
      .sort()) {
      sortPayOptions[key] = queryObj[key];
    }
    let payOptionQuery = "";
    for (const key of Object.keys(sortPayOptions)
      .sort()) {
      payOptionQuery += key + "=" + sortPayOptions[key] + "&";
    }
    payOptionQuery = payOptionQuery.substring(0, payOptionQuery.length - 1);
    return payOptionQuery;
  }

  /**
   * 对 query 进行签名
   */
  signQuery(queryStr) {
    queryStr = queryStr + "&key=" + this.config.weixin.partner_key;
    const md5 = require("md5");
    const md5Sign = md5(queryStr);
    return _.toUpper(md5Sign);
  }

  decrypt(encryptedData, key, iv = "") {
    let decipher = crypto.createDecipheriv("aes-256-ecb", key, iv);
    decipher.setAutoPadding(true);
    let decoded = decipher.update(encryptedData, "base64", "utf8");
    decoded += decipher.final("utf8");
    return decoded;
  }
}

module.exports = PaymentService;
