// app/service/product.js
const Service = require('egg').Service
const keys = require('lodash/keys')

class ProductService extends Service {
  async findById(id) {
    const goods = await this.app.mysql.get('zshop_tb_goods', { goods_id: id })
    // console.log(goods)
    const { goods_id, category_id } = goods

    const attrNames = await this.app.mysql.select('zshop_tb_goods_attrs', {
      where: { category_id },
      columns: ['attr_id', 'attr_name'],
    })

    const specs = {}
    for (let index in attrNames) {
      const { attr_id, attr_name } = attrNames[index]
      const attrValues = await this.app.mysql.select(
        'zshop_tb_goods_attrs_value',
        {
          where: { attr_id: attr_id },
          columns: ['id', 'attr_id', 'attr_value'],
        }
      )
      specs[attr_name] = attrValues.map(_attrValues => ({
        ..._attrValues,
        selected: false,
      }))
    }

    // console.log(attrNames)
    const specsUnderGoods = await this.app.mysql.select('zshop_tb_specs', {
      where: { goods_id: goods_id },
      columns: ['sku_spec_id', 'goods_attrs', 'stock', 'price', 'status'],
    })
    // console.log('specsUnderGoods = ' + JSON.stringify(specsUnderGoods))
    const result = {
      ...goods,
      specs,
      skus: specsUnderGoods,
    }
    console.log(result)
    return result
  }

  async findAll() {
    const goods = await this.app.mysql.select('zshop_tb_goods')
    // console.log(goods)
    return goods
  }
}

module.exports = ProductService
