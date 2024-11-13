explain query plan SELECT * from users 
where json_extract(data, '$.age') = 30;