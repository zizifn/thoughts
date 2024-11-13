CREATE table IF NOT EXISTS gen(
id integer PRIMARY key,
first_name text,
last_name text,
full_name text as (concat(first_name,' ', last_name)) stored
) strict;

create index IF NOT EXISTS idx_gen_full_name on gen(full_name);

-- INSERT into gen(first_name, last_name) VALUES ('james','yang');

-- dedlete index
-- drop index idx_gen_full_name;