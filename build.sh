#!/bin/sh
cd server
./mvnw package -DskipTests
./mvnw clean test jacoco:report coveralls:report
