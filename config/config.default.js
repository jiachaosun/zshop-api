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
  config.middleware = [ "authenticate" ];

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
    notify_url: "https://s2.zhimiao-culture.com/zshop-api/pay/notify" // 微信异步通知，例：https://www.nideshop.com/api/pay/notify
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

  return {
    ...config,
    ...userConfig
  };
};
