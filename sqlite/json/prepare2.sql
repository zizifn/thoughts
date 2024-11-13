
create table if not exists new_products (
    id integer primary key,
    name text,
    category text,
    price real
    tags json
);

delete from new_products;

insert into new_products (name, category, price, tags) values ('Apple', 'Fruit', 1.2,'["fresh", "organic"]');
insert into new_products (name, category, price, tags) values ('Banana', 'Fruit', 0.8,'["fresh", "organic"]');

-- alter table new_products add column tags json;
update new_products set tags = '["fresh", "organic"]' where name = 'Apple';
update new_products set tags = '["fresh", "organic"]' where name = 'Banana';

