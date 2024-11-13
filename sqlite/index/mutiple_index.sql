create index IF NOT EXISTS mutiple on users (first_name, last_name, birthday);

-- List all indexes on the 'users' table
SELECT name FROM sqlite_master WHERE type='index' AND tbl_name='users';

-- Drop unwanted indexes`
DROP INDEX IF EXISTS email;
DROP INDEX IF EXISTS name;
DROP INDEX IF EXISTS bday;
DROP INDEX IF EXISTS delete_at;

