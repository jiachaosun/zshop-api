const tenpay = require("tenpay");

module.exports = (options, app) => {
  return async function refund(ctx, next) {
    const { appid, secret, mch_id, partner_key, refund_url } = app.config.weixin;
    const api = new tenpay({
      appid: appid, // 微信小程序appid
      mchid: mch_id, // 商户帐号ID
      partnerKey: partner_key, // 秘钥
      refund_url: refund_url,
      pfx: require("fs")
        .readFileSync("./cert/apiclient_cert.p12")
    });
    await api.middleware("refund");
    await next();
  };
};
