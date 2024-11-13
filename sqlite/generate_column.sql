
--  virtual column
-- CREATE table gen(
-- id integer PRIMARY key,
-- first_name text,
-- last_name text,
-- full_name text generated ALWAYS as (concat(first_name,' ', last_name))
-- ) strict;


-- INSERT into gen(first_name, last_name) VALUES ('james','yang');
-- INSERT into gen(first_name, last_name) VALUES ('james','yang');

-- INSERT into gen VALUES (5, 'james','yang');
-- INSERT into gen(first_name, last_name) VALUES ('james','yang2');

-- SELECT * from gen;

CREATE table gen(
id integer PRIMARY key,
first_name text,
last_name text,
full_name text as (concat(first_name,' ', last_name)) stored
) strict;


INSERT into gen(first_name, last_name) VALUES ('james','yang');
INSERT into gen(first_name, last_name) VALUES ('james','yang');

INSERT into gen VALUES (5, 'james','yang');
INSERT into gen(first_name, last_name) VALUES ('james2', unixepoch());

SELECT * from gen;