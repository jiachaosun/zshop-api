// app/service/product.js
const Service = require('egg').Service
const keys = require('lodash/keys')

class UserService extends Service {
  async findByOpenId(id) {
    const user = await this.app.mysql.get('zshop_tb_user', {
      weixin_openid: id,
    })

    return user
  }
}

module.exports = UserService
