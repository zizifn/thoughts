# how to improve insert performance

## synchronous

```sql
pragma synchronous = OFF;
```

## Transaction

    mutiple insert statements can be grouped in a transaction to improve performance.
    ```sql
    begin transaction;
    insert into table_name values (1, 'a');
    insert into table_name values (2, 'b');
    commit;
    ```
