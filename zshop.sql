-- Database export via SQLPro (https://www.sqlprostudio.com/allapps.html)
-- Exported by sunjiachao at 29-09-2019 13:54.
-- WARNING: This file may contain descructive statements such as DROPs.
-- Please ensure that you are running the script at the proper location.


-- BEGIN TABLE zshop_tb_banner
DROP TABLE IF EXISTS zshop_tb_banner;
CREATE TABLE `zshop_tb_banner` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `ad_position_id` smallint(5) unsigned NOT NULL DEFAULT '0',
  `media_type` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `name` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `link` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `image_url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `enabled` tinyint(3) unsigned NOT NULL DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserting 2 rows into zshop_tb_banner
-- Insert batch #1
INSERT INTO zshop_tb_banner (id, ad_position_id, media_type, name, link, image_url, content, enabled, created_at, updated_at) VALUES
(1, 0, 0, '首页banner-1', 'https://www.baidu.com', 'https://img1.guanaitong.com/grus-gfs/product/advertisement-provider/by-days/2019-09-06/c9a80fb84d752ae5cb61e04d80871274.png', '首页banner-1', 1, NULL, NULL),
(2, 0, 0, '首页banner-2', 'https://www.baidu.com', 'https://img1.guanaitong.com/grus-gfs/product/advertisement-provider/by-days/2019-09-06/c9a80fb84d752ae5cb61e04d80871274.png', '首页banner-2', 1, NULL, NULL);

-- END TABLE zshop_tb_banner

-- BEGIN TABLE zshop_tb_brand
DROP TABLE IF EXISTS zshop_tb_brand;
CREATE TABLE `zshop_tb_brand` (
  `brand_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '品牌主键',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '名称',
  `desc` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '描述',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`brand_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserting 3 rows into zshop_tb_brand
-- Insert batch #1
INSERT INTO zshop_tb_brand (brand_id, name, `desc`, created_at, updated_at) VALUES
(1, '荣耀', '华为旗下手机品牌', '2019-09-16 16:21:48', '2019-09-16 16:21:52'),
(2, '苹果', '牛逼的手机品牌', '2019-09-16 16:22:20', '2019-09-16 16:22:22'),
(3, '一加', '新牌子', '2019-09-16 16:23:37', '2019-09-16 16:23:39');

-- END TABLE zshop_tb_brand

-- BEGIN TABLE zshop_tb_category
DROP TABLE IF EXISTS zshop_tb_category;
CREATE TABLE `zshop_tb_category` (
  `categroy_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `parent_category_id` int(11) DEFAULT NULL COMMENT '父级id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '分类名称',
  `status` smallint(6) DEFAULT NULL COMMENT '状态',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`categroy_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserting 3 rows into zshop_tb_category
-- Insert batch #1
INSERT INTO zshop_tb_category (categroy_id, parent_category_id, name, status, created_at, updated_at) VALUES
(1, 0, '手机数码', NULL, NULL, NULL),
(2, 1, '手机通讯', NULL, NULL, NULL),
(3, 1, '手机配件', NULL, NULL, NULL);

-- END TABLE zshop_tb_category

-- BEGIN TABLE zshop_tb_goods
DROP TABLE IF EXISTS zshop_tb_goods;
CREATE TABLE `zshop_tb_goods` (
  `goods_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'spu主键',
  `goods_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'spu code',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '名称',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '标题',
  `main_imgs` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '主图',
  `category_id` int(11) DEFAULT NULL COMMENT '分类id',
  `brand_id` int(11) DEFAULT NULL COMMENT '品牌id',
  `detail_info` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '详情信息',
  `status` smallint(6) DEFAULT NULL COMMENT '状态id',
  `extra_info` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '额外信息',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`goods_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserting 3 rows into zshop_tb_goods
-- Insert batch #1
INSERT INTO zshop_tb_goods (goods_id, goods_no, name, title, main_imgs, category_id, brand_id, detail_info, status, extra_info, created_at, updated_at) VALUES
(1, 'test-0001', 'Apple iPhone XR', 'Liquid 视网膜高清显示屏', 'https://img13.360buyimg.com/evalpic/s240x240_jfs/t1/3405/18/3537/69901/5b997c0aE5dc8ed9f/a2c208410ae84d1f.jpg', 2, 2, 'detail', 0, NULL, '2019-09-16 16:38:39', '2019-09-16 16:38:41'),
(2, 'test-0002', '一加 OnePlus 7', '骁龙855旗舰性能4800万超清双摄', 'https://img10.360buyimg.com/evalpic/s240x240_jfs/t1/35032/13/9593/102096/5cf0c2ccE77dc890e/abde5c9a60044485.jpg', 2, 3, 'detail', 0, NULL, '2019-09-16 16:38:39', '2019-09-16 16:38:41'),
(3, 'test-0003', '荣耀20i', '3200万AI自拍', 'https://img13.360buyimg.com/evalpic/s240x240_jfs/t1/40586/1/11155/200870/5d49255fEa7738b29/b3e5895230af9915.jpg', 2, 1, 'detail', 0, NULL, '2019-09-16 16:38:39', '2019-09-16 16:38:41');

-- END TABLE zshop_tb_goods

-- BEGIN TABLE zshop_tb_goods_attrs
DROP TABLE IF EXISTS zshop_tb_goods_attrs;
CREATE TABLE `zshop_tb_goods_attrs` (
  `attr_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '属性key主键',
  `category_id` int(11) DEFAULT NULL COMMENT '属性所在分类id',
  `attr_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '属性名',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`attr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserting 3 rows into zshop_tb_goods_attrs
-- Insert batch #1
INSERT INTO zshop_tb_goods_attrs (attr_id, category_id, attr_name, created_at, updated_at) VALUES
(1, 2, '颜色', '2019-09-17 14:33:01', '2019-09-17 14:33:05'),
(2, 2, '内存', '2019-09-25 21:19:09', '2019-09-25 21:19:19'),
(3, 2, '存储空间', '2019-09-25 21:19:15', '2019-09-25 21:19:22');

-- END TABLE zshop_tb_goods_attrs

-- BEGIN TABLE zshop_tb_goods_attrs_value
DROP TABLE IF EXISTS zshop_tb_goods_attrs_value;
CREATE TABLE `zshop_tb_goods_attrs_value` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '属性值id',
  `attr_id` int(11) DEFAULT NULL COMMENT '属性名关键id',
  `attr_value` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '值',
  `sort` smallint(6) DEFAULT NULL COMMENT '排序',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserting 7 rows into zshop_tb_goods_attrs_value
-- Insert batch #1
INSERT INTO zshop_tb_goods_attrs_value (id, attr_id, attr_value, sort, created_at, updated_at) VALUES
(1, 1, '蓝色', NULL, NULL, NULL),
(2, 1, '红色', NULL, NULL, NULL),
(3, 2, '6G', NULL, NULL, NULL),
(4, 2, '8G', NULL, NULL, NULL),
(5, 3, '128G', NULL, NULL, NULL),
(6, 3, '256G', NULL, NULL, NULL),
(7, 3, '64G', NULL, NULL, NULL);

-- END TABLE zshop_tb_goods_attrs_value

-- BEGIN TABLE zshop_tb_specs
DROP TABLE IF EXISTS zshop_tb_specs;
CREATE TABLE `zshop_tb_specs` (
  `sku_spec_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'sku规格id',
  `goods_id` int(11) DEFAULT NULL COMMENT 'goods商品id',
  `goods_attrs` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'sku商品规格',
  `stock` smallint(6) DEFAULT NULL COMMENT '库存',
  `price` decimal(10,2) DEFAULT NULL COMMENT '价格',
  `status` smallint(6) DEFAULT NULL COMMENT '状态',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`sku_spec_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserting 12 rows into zshop_tb_specs
-- Insert batch #1
INSERT INTO zshop_tb_specs (sku_spec_id, goods_id, goods_attrs, stock, price, status, created_at, updated_at) VALUES
(1, 1, '{"颜色":"蓝色","内存":"6G","存储空间":"64G"}', 100, 1222, 0, NULL, NULL),
(2, 1, '{"颜色":"蓝色","内存":"6G","存储空间":"128G"}', 1, 3332, 0, NULL, NULL),
(3, 1, '{"颜色":"蓝色","内存":"6G","存储空间":"256G"}', 2, 1223, 0, NULL, NULL),
(4, 1, '{"颜色":"红色","内存":"6G","存储空间":"64G"}', 3, 3333, 0, NULL, NULL),
(5, 1, '{"颜色":"红色","内存":"6G","存储空间":"128G"}', 4, 5699, 0, NULL, NULL),
(6, 1, '{"颜色":"红色","内存":"6G","存储空间":"256G"}', 5, 4444, 0, NULL, NULL),
(7, 1, '{"颜色":"蓝色","内存":"8G","存储空间":"64G"}', 6, 5555, 0, NULL, NULL),
(8, 1, '{"颜色":"蓝色","内存":"8G","存储空间":"128G"}', 7, 6666, 0, NULL, NULL),
(9, 1, '{"颜色":"蓝色","内存":"8G","存储空间":"256G"}', 77, 7777, 0, NULL, NULL),
(10, 1, '{"颜色":"红色","内存":"8G","存储空间":"64G"}', 8, 8888, 0, NULL, NULL),
(11, 1, '{"颜色":"红色","内存":"8G","存储空间":"128G"}', 9, 9999, 0, NULL, NULL),
(12, 1, '{"颜色":"红色","内存":"8G","存储空间":"256G"}', 0, 5699, -1, NULL, NULL);

-- END TABLE zshop_tb_specs

-- BEGIN TABLE zshop_tb_user
DROP TABLE IF EXISTS zshop_tb_user;
CREATE TABLE `zshop_tb_user` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `password` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `gender` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `birthday` int(11) unsigned NOT NULL DEFAULT '0',
  `register_time` int(11) unsigned NOT NULL DEFAULT '0',
  `last_login_time` int(11) unsigned NOT NULL DEFAULT '0',
  `last_login_ip` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `user_level_id` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `nickname` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `register_ip` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `weixin_openid` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `user_name` (`username`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table zshop_tb_user contains no data. No inserts have been genrated.
-- Inserting 0 rows into zshop_tb_user


-- END TABLE zshop_tb_user

