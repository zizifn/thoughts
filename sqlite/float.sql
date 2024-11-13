-- SQLite
create TABLE float (
    number real
) strict;

INSERT into float VALUES (0.1), (0.2), (-0.3);

-- -- -- INSERT into strict_table VALUES('1.01', 'one2');

SELECT * from float;
SELECT sum(number) from float;
SELECT decimal_sum(number) from float;

-- SELECT strftime('%s', 'now') AS epoch_time;
-- SELECT datetime(1600000000, 'unixepoch') AS epoch_time;
-- SELECT datetime('2024-02-29', 'floor') AS epoch_time;
-- SELECT timediff('2024-02-29', '2024-02-28') AS epoch_time;
-- SELECT datetime(1600000000, 'unixepoch') AS epoch_time;