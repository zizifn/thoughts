
CREATE table IF NOT EXISTS gen(
id integer PRIMARY key,
first_name text,
last_name text,
full_name text as (concat(first_name,' ', last_name)) stored
) strict;

INSERT into gen(first_name, last_name) VALUES ('james','yang');

SELECT id, first_name from gen;

update gen set first_name = 'james22' where id = 1;

SELECT id, first_name from gen;