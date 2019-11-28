/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80016
 Source Host           : localhost:3306
 Source Schema         : zshop-api

 Target Server Type    : MySQL
 Target Server Version : 80016
 File Encoding         : 65001

 Date: 28/11/2019 14:16:09
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for zshop_tb_banner
-- ----------------------------
DROP TABLE IF EXISTS `zshop_tb_banner`;
CREATE TABLE `zshop_tb_banner` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `ad_position_id` smallint(5) unsigned NOT NULL DEFAULT '0',
  `media_type` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `image_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `enabled` tinyint(3) unsigned NOT NULL DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for zshop_tb_brand
-- ----------------------------
DROP TABLE IF EXISTS `zshop_tb_brand`;
CREATE TABLE `zshop_tb_brand` (
  `brand_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '品牌主键',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '名称',
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '描述',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`brand_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for zshop_tb_cart
-- ----------------------------
DROP TABLE IF EXISTS `zshop_tb_cart`;
CREATE TABLE `zshop_tb_cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `goods_id` bigint(20) DEFAULT NULL,
  `goods_no` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sku_spec_id` int(11) DEFAULT NULL,
  `goods_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `amount` smallint(10) DEFAULT NULL,
  `selected` smallint(1) DEFAULT NULL,
  `pic_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='购物车表';

-- ----------------------------
-- Table structure for zshop_tb_category
-- ----------------------------
DROP TABLE IF EXISTS `zshop_tb_category`;
CREATE TABLE `zshop_tb_category` (
  `categroy_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `parent_category_id` int(11) DEFAULT NULL COMMENT '父级id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '分类名称',
  `status` smallint(6) DEFAULT NULL COMMENT '状态',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`categroy_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for zshop_tb_goods
-- ----------------------------
DROP TABLE IF EXISTS `zshop_tb_goods`;
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

-- ----------------------------
-- Table structure for zshop_tb_goods_attrs
-- ----------------------------
DROP TABLE IF EXISTS `zshop_tb_goods_attrs`;
CREATE TABLE `zshop_tb_goods_attrs` (
  `attr_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '属性key主键',
  `category_id` int(11) DEFAULT NULL COMMENT '属性所在分类id',
  `attr_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '属性名',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`attr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for zshop_tb_goods_attrs_value
-- ----------------------------
DROP TABLE IF EXISTS `zshop_tb_goods_attrs_value`;
CREATE TABLE `zshop_tb_goods_attrs_value` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '属性值id',
  `attr_id` int(11) DEFAULT NULL COMMENT '属性名关键id',
  `attr_value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '值',
  `sort` smallint(6) DEFAULT NULL COMMENT '排序',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for zshop_tb_order
-- ----------------------------
DROP TABLE IF EXISTS `zshop_tb_order`;
CREATE TABLE `zshop_tb_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_sn` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `order_status` smallint(1) DEFAULT NULL,
  `pay_status` smallint(1) DEFAULT NULL,
  `shipping_status` smallint(1) DEFAULT NULL,
  `consignee` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `province` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `district` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postal_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pay_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pay_id` int(11) DEFAULT NULL,
  `actual_price` decimal(10,2) DEFAULT NULL,
  `goods_price` decimal(10,2) DEFAULT NULL,
  `order_price` decimal(10,2) DEFAULT NULL,
  `created_time` timestamp NULL DEFAULT NULL,
  `pay_time` timestamp NULL DEFAULT NULL,
  `confirm_time` timestamp NULL DEFAULT NULL,
  `callback_status` smallint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for zshop_tb_order_goods
-- ----------------------------
DROP TABLE IF EXISTS `zshop_tb_order_goods`;
CREATE TABLE `zshop_tb_order_goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL,
  `goods_id` int(11) DEFAULT NULL,
  `goods_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sku_spec_id` int(11) DEFAULT NULL,
  `amount` int(10) DEFAULT NULL,
  `market_price` decimal(10,2) DEFAULT NULL,
  `retail_price` decimal(10,2) DEFAULT NULL,
  `sku_attrs_values` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pic_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for zshop_tb_specs
-- ----------------------------
DROP TABLE IF EXISTS `zshop_tb_specs`;
CREATE TABLE `zshop_tb_specs` (
  `sku_spec_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'sku规格id',
  `goods_id` int(11) DEFAULT NULL COMMENT 'goods商品id',
  `goods_attrs` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'sku商品规格',
  `stock` smallint(6) DEFAULT NULL COMMENT '库存',
  `price` decimal(10,2) DEFAULT NULL COMMENT '价格',
  `status` smallint(6) DEFAULT NULL COMMENT '状态',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`sku_spec_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for zshop_tb_user
-- ----------------------------
DROP TABLE IF EXISTS `zshop_tb_user`;
CREATE TABLE `zshop_tb_user` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `password` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `gender` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `birthday` int(11) unsigned NOT NULL DEFAULT '0',
  `register_time` int(11) unsigned NOT NULL DEFAULT '0',
  `last_login_time` int(11) unsigned NOT NULL DEFAULT '0',
  `last_login_ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `user_level_id` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `nickname` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `register_ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `weixin_openid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `user_name` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
