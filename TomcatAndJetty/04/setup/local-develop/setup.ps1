docker run -it --rm `
  -e JPDA_ADDRESS=*:8000 ` # for debug
  -e JPDA_TRANSPORT=dt_socket `
  -p 8080:8080 `
  -p 8000:8000 `
  -v ${pwd}/local-develop/conf:/usr/local/tomcat/conf ` # for override tomcat conf, if need
  -v ${pwd}/target/setup:/usr/local/tomcat/webapps/setup ` # for applcaiiton
  -v ${pwd}/target/classes:/usr/local/tomcat/webapps/setup/WEB-INF/classes ` # for auto reload classes.IDE will auto build class to target.
  tomcat:9 `
  /usr/local/tomcat/bin/catalina.sh jpda run