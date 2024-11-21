insert into videos_fts(rowid, title, content) 
select id, title, content from videos;




INSERT into videos (title, content) VALUES ('How to make a youtube channel james', 'This is a video on how to make a youtube channel about james');

-- insert into videos_fts(videos_fts) values('rebuild');