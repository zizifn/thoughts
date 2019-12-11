package com.james.demo;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.JdbcTemplateAutoConfiguration;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class,
		DataSourceTransactionManagerAutoConfiguration.class,
		JdbcTemplateAutoConfiguration.class})
@Slf4j
public class DemoApplication implements CommandLineRunner {

	@Autowired
	@Qualifier("fooJdbcTemplate")
	private JdbcTemplate fooJdbcTemplate;

	@Autowired
	@Qualifier("barJdbcTemplate")
	private JdbcTemplate barJdbcTemplate;


	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		log.info("command runner111");
		barJdbcTemplate.queryForList("SELECT * FROM test").forEach(
				value -> log.info(value.toString())
		);
	}
}
