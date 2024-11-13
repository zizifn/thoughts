# Journal mode
`PRAGMA journal_mode;`

## Rollback Mode

1. Page is copied as a journal.
2. Data is written into the current page.
3. Copied data will be deleted/xx.
4. commit is done

If there is one writer, all reads must stop because the original page is being modified.

## WAL Mode

Write-Ahead Logging

1. every pages is untouched
2. create new sqlite-wal
4. appending 
