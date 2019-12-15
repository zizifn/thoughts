package com.james.demo.transaction;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.List;
import java.util.Map;

@Slf4j
@SpringBootApplication
public class ProgrammaticTransactionDemoApplication implements CommandLineRunner {

    @Autowired
    private TransactionTemplate transactionTemplate;

    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public static void main(String... args){
        SpringApplication.run(ProgrammaticTransactionDemoApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        log.info("COUNT BEFORE TRANSACTION: {}", getCount());
        transactionTemplate.execute(
                (TransactionStatus transactionStatus) -> {
                    jdbcTemplate.execute("INSERT INTO FOO (ID, BAR) VALUES (2, 'aaa')");
                    log.info("COUNT IN TRANSACTION: {}", getCount());
                    transactionStatus.setRollbackOnly();
                    return null;
                }
        );

        log.info("COUNT AFTER TRANSACTION: {}", getCount());
    }

    private long getCount(){
        List<Map<String, Object>> maps = jdbcTemplate.queryForList("select count(*) as CNT from FOO");

        return (long) maps.get(0).get("CNT");
    }
}
