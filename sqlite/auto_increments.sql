
CREATE TABLE auto_increments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

INSERT into auto_increments values (1, 'test');
INSERT into auto_increments values (3, 'test2');
INSERT into auto_increments (name) values ('test3');

SELECT * from auto_increments;
SELECT * from sqlite_sequence;
