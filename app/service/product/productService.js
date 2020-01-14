// app/service/product.js
const Service = require("egg").Service;
const keys = require("lodash/keys");

class ProductService extends Service {

  async findGoods(id) {
    return this.app.mysql.get("zshop_tb_goods", { goods_id: id });
  }

  async findById(id) {
    let goods = await this.findGoods(id);
    goods = {
      ...goods,
      main_imgs: goods.main_imgs.split(",")
    };
    const { goods_id, category_id } = goods;

    // 拿通用规格属性
    const commonAttrsValues = await this.app.mysql.query(`
    SELECT
        category_attr_id,
        attr_name,
        category_attr_value,
        created_at 
        FROM
        (
        SELECT
        id AS common_attr_id,
        attr_name 
        FROM
        zshop_tb_category_attrs 
        WHERE
        category_id = ${category_id}
        ) AS tb_attr_name
        LEFT JOIN zshop_tb_category_goods_attrs_value AS tb_attr_value ON tb_attr_name.common_attr_id = tb_attr_value.category_attr_id 
        AND tb_attr_value.goods_id = ${id}
        `);

    // 拿规格属性名
    const attrNames = await this.app.mysql.select("zshop_tb_goods_attrs", {
      where: { category_id },
      columns: [ "attr_id", "attr_name" ]
    });

    // 拿当前spu下的销售属性值得id
    const saleAttrs = await this.app.mysql.select("zshop_tb_specs_attrs", {
      where: { goods_id },
      columns: [ "goods_attr_id", "goods_attr_value_id" ]
    });

    // 处理销售属性数据结构
    const specs = {};
    for (let index in attrNames) {
      const { attr_id, attr_name } = attrNames[index]; //销售属性名的id
      const specsAllValuesList = [];
      for (let attrValueIndex in saleAttrs) {
        const { goods_attr_value_id } = saleAttrs[attrValueIndex];
        const specValue = await this.app.mysql.get("zshop_tb_goods_attrs_value", { id: goods_attr_value_id });
        specsAllValuesList.push({
          ...specValue,
          selected: false
        });
      }
      specs[attr_name] = specsAllValuesList;
    }

    // 拿sku
    const specsUnderGoods = await this.app.mysql.select("zshop_tb_specs", {
      where: { goods_id: goods_id },
      columns: [ "sku_spec_id", "goods_attrs", "stock", "price", "status" ]
    });
    const result = {
      ...goods,
      specs, // 销售属性
      skus: specsUnderGoods,
      common_attrs: commonAttrsValues // 展示的通用商品属性
    };
    return result;
  }

  /**
   * 获取首页的商品数据
   */
  async getHomePageProductList(homeProductIds) {
    const homeProducts = await this.app.mysql.select("zshop_tb_goods", {
      where: { goods_id: homeProductIds }
    });
    console.log("首页商品数据" + JSON.stringify(homeProducts));
    return homeProducts;
  }

  async getProductsByCategoryId(id) {
    let products = await this.app.mysql.select("zshop_tb_goods", {
      where: { category_id: id }
    });
    products = products.map(product => {
      if (product.main_imgs) {
        product = {
          ...product,
          main_imgs: product.main_imgs.split(",")
        };
      }
      return product;
    });

    return products;
  }

  async getSkuSpecValue(specId) {
    const specValue = await this.app.mysql.get("zshop_tb_specs", { sku_spec_id: specId });
    return specValue;
  }
}

module.exports = ProductService;
