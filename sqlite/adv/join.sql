SELECT 
users.id, bookmarks.user_id, 
users.first_name, bookmarks.url

from 
   users -- left 
   inner join bookmarks -- right
   on users.id = bookmarks.user_id
limit 5;