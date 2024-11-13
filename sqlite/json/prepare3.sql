
create table if not exists users (
    id integer primary key,
    data json
);

--- gerenate 

alter table users add column name text generated always 
as (json_extract(data, '$.name')) virtual;

create index inx_name on users(name);

---

--- functional 
create index inx_age on users(json_extract(data, '$.age'));
----

delete from new_products;

insert into users (data) values ('{"name": "Alice", "age": 30, city: "New York"}');
insert into users (data) values ('{"name": "Bob", "age": 25, city: "Los Angeles"}');
-- insert more data
insert into users (data) values ('{"name": "Charlie", "age": 35, city: "Chicago"}');
insert into users (data) values ('{"name": "David", "age": 40, city: "Houston"}');
insert into users (data) values ('{"name": "Eve", "age": 45, city: "Phoenix"}');
insert into users (data) values ('{"name": "Frank", "age": 50, city: "Philadelphia"}');

