create table kv(
key text PRIMARY key,
value any) strict, without rowid;


SELECT * from kv;

INSERT into kv values ('key1', 1);


SELECT *, rowid from kv;