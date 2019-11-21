// app/service/product.js
const Service = require('egg').Service
const { getCookie } = require('../../utils/requestTools.js')

class AuthService extends Service {
  /**
   * 根据token获取登录用户
   */
  async getLoginUserInfo() {
    // 获取cookie中token
    const ctx = this.ctx;
    let cookies = ctx.request.get('Cookie')
    const token = getCookie('token', cookies)
    console.log(`token = ` + token + `（未验证）`)

    return token
  }
}

module.exports = AuthService
