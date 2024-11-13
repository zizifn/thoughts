-- SQLite
create TABLE kv (
    key integer,
    value any,
    time integer,
    bool integer,
    real real
) strict;

INSERT into kv VALUES(1, '1.256', unixepoch(), 1);

-- -- -- INSERT into strict_table VALUES('1.01', 'one2');



SELECT key, typeof(key), value, typeof(value), time, typeof(time), 
datetime(time, 'unixepoch') as format, bool from kv where bool=true;


-- SELECT strftime('%s', 'now') AS epoch_time;
-- SELECT datetime(1600000000, 'unixepoch') AS epoch_time;
-- SELECT datetime('2024-02-29', 'floor') AS epoch_time;
-- SELECT timediff('2024-02-29', '2024-02-28') AS epoch_time;

-- SELECT datetime(1600000000, 'unixepoch') AS epoch_time;