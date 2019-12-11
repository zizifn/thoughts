package com.james.demo.samplejdbc;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@Repository
@Slf4j
public class FooDao {
    @Autowired
    private DataSource dataSource;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private SimpleJdbcInsert simpleJdbcInsert;

    public void insertData(){
        Arrays.asList("b", "c").forEach(
                value -> jdbcTemplate.update("insert into FOO (BAR) values(?)", value)
        );
        HashMap<String, String> row = new HashMap<>();
        row.put("BAR", "d");
        row.put("BAR1", "d1");

        Number id = simpleJdbcInsert.executeAndReturnKey(row);
        // Number id = simpleJdbcInsert.usingColumns("BAR").executeAndReturnKey(row);
        log.info("ID of d: {}", id.longValue());

    }

    public void listData(){
        log.info("list select BAR from FOO!");
        jdbcTemplate.queryForList("select BAR from FOO", String.class).forEach(log::info);
        jdbcTemplate.queryForList("select * from FOO").stream().map(String::valueOf).forEach(log::info);

        List<Foo> querys = jdbcTemplate.query("SELECT * FROM FOO", (ResultSet rs, int rowNum) -> Foo.builder()
                .id(rs.getLong(1))
                .bar(rs.getString(2))
                .build()
        );

        querys.forEach(f -> log.info("Foo: {}", f));
    }



}
