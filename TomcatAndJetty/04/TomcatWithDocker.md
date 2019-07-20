# Tomcat with Docker in local development workflow

## Sample Java Web Project

1. [Maven sample project](https://github.com/zizifn/thoughts/tree/master/TomcatAndJetty/04/setup)
    - Folder `webapp`, following the standard.
    - pom.xml for package `war`
    - Default tomcat will append application name into URI, if want use root path, need add below line into `server.xml`, under `<Host>`

        ``` xml
         <Context docBase="setup" path="" reloadable="true" source="org.eclipse.jst.jee.server:web">
          <WatchedResource>WEB-INF/web.xml</WatchedResource>
        </Context>
        ```

## How tomcat deploy war

Copy `*.war` to `$tomcatHome/webapps`. After start tomcat will auto deploy application.

## Deploy tomcat application hand by hand

Extract `*.war` and copy folder to `$tomcatHome/webapps`.

## Use Docker for local development

From auto or manually deploy application, you can easy come out below `powershell` command for Docker

``` powershell
docker run -it --rm `
  -e JPDA_ADDRESS=*:8000 ` # for debug, tomcat9 need use *:8000, tomcat8 just use 8000
  -e JPDA_TRANSPORT=dt_socket `
  -p 8080:8080 `
  -p 8000:8000 `
  -v ${pwd}/local-develop/conf:/usr/local/tomcat/conf ` # for override tomcat conf, if need
  -v ${pwd}/target/setup:/usr/local/tomcat/webapps/setup ` # for applcaiiton
  -v ${pwd}/target/classes:/usr/local/tomcat/webapps/setup/WEB-INF/classes ` # for auto reload classes.IDE will auto build class to target.
  tomcat:9 `
  /usr/local/tomcat/bin/catalina.sh jpda run
```
