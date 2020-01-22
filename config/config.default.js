/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1568280213431_2688";

  // add your middleware config here
  config.middleware = [ "errorHandler", "authenticate" ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.security = {
    csrf: {
      enable: false
    }
  };

  config.weixin = {
    appid: "wx87de1f9357bb4b2f", // 小程序 appid
    secret: "76496b7e56983e2cbc7e3a0c8e56b9ea", // 小程序密钥
    mch_id: "1540600471", // 商户帐号ID
    partner_key: "zhimiaoshop66zhimiaoshop66zhimia", // 微信支付密钥
    notify_url: "https://s3.zhimiao-culture.com/zshop-api/pay/notify",
    refund_url: "https://s3.zhimiao-culture.com/zshop-api/pay/refund_notify"
  };

  config.bodyParser = {
    enable: true,
    queryString: {
      arrayLimit: 100,
      depth: 5,
      parameterLimit: 1000
    },
    enableTypes: [ "json", "form", "text" ],
    extendTypes: {
      text: [ "text/xml", "application/xml" ]
    }
  };

  // config.onerror = {
  //   all(err, ctx) {
  //     // 在此处定义针对所有响应类型的错误处理方法
  //     // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
  //     ctx.body = { message: "error" };
  //     ctx.status = 500;
  //   }
  // };

  return {
    ...config,
    ...userConfig
  };
};
