create index delete_at on users(created_at);

-- select * from users where created_at > '2019-01-01' and delete_at is not null limit 5;

select * from users where deleted_at is null limit 5;