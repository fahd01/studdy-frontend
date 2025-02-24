FROM openjdk:17
LABEL authors="kays"
ADD target/microservices-0.0.01-SNAPSHOT.jar application.jar
ENTRYPOINT ["java", "-jar", "application.jar"]
EXPOSE 8057