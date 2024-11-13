select json_extract('{"a": {"a1": "a1"}, "b": 2}', '$.a');

select jsonb_extract('{"a": {"a1": "a1"}, "b": 2}', '$.a');


select jsonb_extract('{"a": ["a1", "a2", "a3"], "b": 2}', '$.a[#-1]');

select json('[1,2,3,4,5]')

select json_object('a', jsonb('[1,2,3,4]'), 'b', 2, 'c', 3)

select json_object('a', '[1,2,3,4]'->'$', 'b', 2, 'c', 3)

select json_object('a', json_array(1,2,3,4), 'b', 2, 'c', 3)

select json_array_length(jsonb('{f:[1]}'), '$.f')


select json_extract('{"a": {"a1": "a1"}, "b": 2}', '$.a.a1', '$.b')->0;


select json_insert('{"a": {"a1": "a1"}, "b": 2}', '$.c', 3);

select json_replace('{"a": {"a1": "a1"}, "b": 2}', '$.b', 3);

select json_remove('{"a": {"a1": "a1"}, "b": [2]}', '$.b[0]');

select json_patch('{"a": {"a1": "a1"}, "b": 2}', '{c:3}');

select json_set('{"a": {"a1": "a1"}, "b": [1,2,3,4]}', '$.b[#]', 32);



