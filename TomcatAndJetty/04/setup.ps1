# build MyServlet
javac -cp ../lib/servlet-api.jar MyServlet.java `
-d .\MyWebApp\WEB-INF\classes
# build AnnotationServlet
javac -cp ../lib/servlet-api.jar AnnotationServlet.java `
-d .\MyWebAppAnnotation\WEB-INF\classes