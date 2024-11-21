create VIRTUAL table videos_fts USING fts5(
title, 
content,
content='videos',
content_rowid='id'
);
