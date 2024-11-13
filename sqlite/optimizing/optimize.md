# How to improve SQLite performance

## Journal mode

```
pragma journal_mode = wal;
```

## busy_timeout

```
pragma busy_timeout = 1000;
```

## syncchronous

https://www.sqlite.org/pragma.html#pragma_synchronous

```
pragma synchronous = NORMAL;
```

## cache_size

```
pragma cache_size = 10000;
```

## temp_store

```
pragma temp_store = MEMORY;
```

## foreign_keys

```
pragma foreign_keys = ON;
```

## vacuum

### optimize command

```sql

pragma optimize(0x03) -- 0x03 is the default value for dry run

pragma optimize

analyze table_name;

select * from sqlite_stat1;
```