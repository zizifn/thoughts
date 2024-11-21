-- SELECT * from videos;

-- sync data from videos to videos_fts
insert into videos_fts(videos_fts) values('rebuild');
SELECT * from videos_fts;

DELETE from videos where id = 17;


SELECT * from 
videos_fts join videos on videos_fts.rowid = videos.id

where videos_fts match 'youtube';