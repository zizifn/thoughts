select * from products;
-- select * from new_products;

select * from products, json_each(products.tags);

-- select category, 
-- GROUP_CONCAT(name),
-- json_group_object(name, price) from products group by category;

-- select * , count(*), json_group_array(name),json_group_array(price) from products  group by category;