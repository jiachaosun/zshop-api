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

  async findUserById(id) {
    const user = await this.app.mysql.get('zshop_tb_user', {
      id: id,
    })

    return user
  }

  async add(user) {
    const result = await this.app.mysql.insert('zshop_tb_user', {
      ...user
    })

    return result.insertId
  }
}

module.exports = UserService
