package com.james.demo;

import org.slf4j.Logger;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

import javax.annotation.Resource;
import javax.sql.DataSource;

/**
 * @author James
 */
@Configuration
public class MyConfig {

    private static final Logger log = org.slf4j.LoggerFactory.getLogger(MyConfig.class);

    @Bean
    @ConfigurationProperties("bar.datasource")
    public DataSourceProperties barDataSourceProperties(){
        log.info("bar barDataSourceProperties");
        return new DataSourceProperties();
    }

    @Bean
    public DataSource barDataSource() {
        log.info("bar barDataSource:1");
        DataSourceProperties dataSourceProperties = barDataSourceProperties();
        log.info("bar datasource: {}", dataSourceProperties.getUrl());
        return dataSourceProperties.initializeDataSourceBuilder().build();
    }

    @Bean
    @Resource
    public JdbcTemplate barJdbcTemplate(DataSource barDataSource){
        return new JdbcTemplate(barDataSource);
    }

    @Bean
    @Resource
    public PlatformTransactionManager barTxManager(DataSource barDataSource) {
        log.info("bar fooTxManager");
        return new DataSourceTransactionManager(barDataSource);
    }

    @Bean
    @ConfigurationProperties("foo.datasource")
    public DataSourceProperties fooDataSourceProperties(){
        log.info("foo barDataSourceProperties");
        return new DataSourceProperties();
    }

    @Bean
    public DataSource fooDataSource() {
        log.info("foo barDataSource:1");
        DataSourceProperties dataSourceProperties = fooDataSourceProperties();
        log.info("foo datasource: {}", dataSourceProperties.getUrl());
        return dataSourceProperties.initializeDataSourceBuilder().build();
    }

    @Bean
    @Resource
    public JdbcTemplate fooJdbcTemplate(DataSource fooDataSource){
        return new JdbcTemplate(fooDataSource);
    }

    @Bean
    @Resource // find bean base on param name, or you can use @Qualifier
    public PlatformTransactionManager fooTxManager(DataSource fooDataSource) {
        log.info("foo fooTxManager");
        return new DataSourceTransactionManager(fooDataSource);
    }
}
