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
		category_id = 4
	) AS tb_attr_name
	LEFT JOIN zshop_tb_category_goods_attrs_value AS tb_attr_value ON tb_attr_name.common_attr_id = tb_attr_value.category_attr_id
	AND tb_attr_value.goods_id =4
