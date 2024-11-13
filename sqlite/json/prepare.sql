create table products (
    id integer primary key,
    name text,
    category text,
    price real
);



insert into products (name, category, price) values ('Apple', 'Fruit', 1.2);
insert into products (name, category, price) values ('Banana', 'Fruit', 0.8);
insert into products (name, category, price) values ('Orange', 'Fruit', 1.0);
insert into products (name, category, price) values ('Carrot', 'Vegetable', 0.5);
insert into products (name, category, price) values ('Potato', 'Vegetable', 0.3);
insert into products (name, category, price) values ('Cucumber', 'Vegetable', 0.7);

alter table products add column tags json;
update products set tags = '["fresh", "organic"]' where name = 'Apple';
update products set tags = '["fresh", "organic"]' where name = 'Banana';
update products set tags = '["fresh", "organic"]' where name = 'Orange';
update products set tags = '["fresh", "organic"]' where name = 'Carrot';
update products set tags = '["fresh", "organic"]' where name = 'Potato';
update products set tags = '["fresh", "organic"]' where name = 'Cucumber';

