"use strict";

const Controller = require("../../core/baseController");
const crypto = require("crypto");
const isEmpty = require("lodash/isEmpty");
const uuidv1 = require("uuid/v1");
const tokenUtils = require("../../utils/token");

class AuthController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.authService = ctx.service.common.authService;
    this.userService = ctx.service.common.userService;
  }

  async weixin() {
    const { ctx } = this;
    const { code, userInfo } = ctx.request.body;

    // 获取 session
    const result = await ctx.curl(
      "https://api.weixin.qq.com/sns/jscode2session",
      {
        dataType: "json",
        data: {
          grant_type: "authorization_code",
          js_code: code,
          secret: "76496b7e56983e2cbc7e3a0c8e56b9ea",
          appid: "wx87de1f9357bb4b2f"
        }
      }
    );

    const sessionData = result.data;
    // 验证用户信息完整性
    const sha1 = crypto
      .createHash("sha1")
      .update(userInfo.rawData.toString() + sessionData.session_key)
      .digest("hex");
    if (userInfo.signature !== sha1) {
      return null;
    }

    // 解析用户数据
    const wechatUserInfo = await this.decryptUserInfoData(
      sessionData.session_key,
      userInfo.encryptedData,
      userInfo.iv
    );
    if (isEmpty(wechatUserInfo)) {
      this.fail({ code: 1000, msg: "登录失败" });
    }

    const clientIp = this.ctx.socket.remoteAddress;
    let user = await this.userService.findByOpenId(wechatUserInfo.openId);
    let userId;
    console.log("找到 user 了没？ ", user != null);
    if (user == null) {
      userId = await this.userService.add({
        username: "微信用户" + uuidv1(),
        password: "",
        register_time: parseInt(new Date().getTime() / 1000),
        register_ip: clientIp,
        mobile: "",
        weixin_openid: wechatUserInfo.openId,
        avatar: wechatUserInfo.avatarUrl || "",
        gender: wechatUserInfo.gender || 1, // 性别 0：未知、1：男、2：女
        nickname: wechatUserInfo.nickName
      });
    } else {
      userId = user.id;
    }

    // 重新查出来
    const newUser = await this.userService.findUserById(userId);

    const token = await tokenUtils.create({ user_id: userId });
    console.log("token = " + token);

    // const allProducts = await ctx.service.product.findAll()
    this.success({ token, userInfo: newUser });
  }

  /**
   * 解析微信登录用户数据
   * @param sessionKey
   * @param encryptedData
   * @param iv
   * @returns {Promise.<string>}
   */
  async decryptUserInfoData(sessionKey, encryptedData, iv) {
    let decoded = "";
    try {
      const _sessionKey = Buffer.from(sessionKey, "base64");
      encryptedData = Buffer.from(encryptedData, "base64");
      iv = Buffer.from(iv, "base64");
      // 解密
      const decipher = crypto.createDecipheriv("aes-128-cbc", _sessionKey, iv);
      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true);
      decoded = decipher.update(encryptedData, "binary", "utf8");
      decoded += decipher.final("utf8");
      const userInfo = JSON.parse(decoded);

      // console.log(userInfo)

      if (userInfo.watermark.appid !== "wx87de1f9357bb4b2f") {
        return null;
      }

      // 解析后的数据格式
      // { openId: 'oILjs0JEDIZzaWVc_sJW2k3fhp1k',
      //   nickName: '明天',
      //   gender: 1,
      //   language: 'zh_CN',
      //   city: 'Shenzhen',
      //   province: 'Guangdong',
      //   country: 'China',
      //   avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/9Otwibfa5VXR0ntXdlX84dibbulWLJ0EiacHeAfT1ShG2A7LQa2unfbZVohsWQlmXbwQGM6NnhGFWicY5icdxFVdpLQ/132',
      //   watermark: { timestamp: 1542639764, appid: 'wx262f4ac3b1c477dd' } }
      return userInfo;
    } catch (err) {
      return null;
    }
  }
}

module.exports = AuthController;
