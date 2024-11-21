-- sync table to videos_fts after videos table is update
-- Trigger to sync on INSERT
CREATE TRIGGER videos_fts_insert AFTER INSERT ON videos
BEGIN
  INSERT INTO videos_fts(rowid, title, content)
  VALUES (new.id, new.title, new.content);
END;

-- Trigger to sync on DELETE
CREATE TRIGGER videos_fts_delete AFTER DELETE ON videos
BEGIN
  DELETE FROM videos_fts WHERE rowid = old.id;
END;

-- Trigger to sync on UPDATE
CREATE TRIGGER videos_fts_update AFTER UPDATE ON videos
BEGIN
  DELETE FROM videos_fts WHERE rowid = old.id;
  INSERT INTO videos_fts(rowid, title, content)
  VALUES (new.id, new.title, new.content);
END;