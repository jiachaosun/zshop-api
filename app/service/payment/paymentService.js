// app/service/product.js
const Service = require("egg").Service;
const _ = require("lodash");
const crypto = require("crypto");
const md5 = require("md5");
const rp = require("request-promise");

class PaymentService extends Service {

  constructor(ctx) {
    super(ctx);
    this.userService = ctx.service.common.userService;
  }

  async createPrepayInfo(order_sn) {
    const orderInfo = await this.app.mysql.get("zshop_tb_order", { order_sn: order_sn });

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

  async createUnifiedOrder(prepayInfo) {
    const weixinConfig = this.config.weixin;
    const { appid, secret, mch_id, partner_key, notify_url } = weixinConfig;
    console.log("weixinConfig => " + JSON.stringify(weixinConfig));
    console.log("mch_id => " + mch_id);
    const WeiXinPay = require("weixinpay");
    const weixinpay = new WeiXinPay({
      appid: appid, // 微信小程序appid
      openid: prepayInfo.openid, // 用户openid
      mch_id: mch_id, // 商户帐号ID
      partner_key: partner_key // 秘钥
    });

    return new Promise((resolve, reject) => {
      weixinpay.createUnifiedOrder({
        body: prepayInfo.body,
        out_trade_no: prepayInfo.out_trade_no,
        total_fee: prepayInfo.total_fee,
        spbill_create_ip: prepayInfo.spbill_create_ip,
        notify_url: notify_url,
        trade_type: "JSAPI"
      }, (res) => {
        console.log(res);
        if (res.return_code === "SUCCESS" && res.result_code === "SUCCESS") {
          const returnParams = {
            "appid": res.appid,
            "timeStamp": parseInt(Date.now() / 1000) + "",
            "nonceStr": res.nonce_str,
            "package": "prepay_id=" + res.prepay_id,
            total_fee: prepayInfo.total_fee,
            "signType": "MD5"
          };
          const paramStr = `appId=${returnParams.appid}&nonceStr=${returnParams.nonceStr}&package=${returnParams.package}&signType=${returnParams.signType}&timeStamp=${returnParams.timeStamp}&key=` + weixinConfig.partner_key;
          returnParams.paySign = md5(paramStr)
            .toUpperCase();
          resolve(returnParams);
        } else {
          reject(res);
        }
      });
    });
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
      return false;
    }
    return notifyObj;
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
}

module.exports = PaymentService;
