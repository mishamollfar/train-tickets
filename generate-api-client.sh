#!/usr/bin/env bash

#wget --no-clobber http://central.maven.org/maven2/io/swagger/swagger-codegen-cli/2.3.1/swagger-codegen-cli-2.3.1.jar -O swagger-codegen-cli.jar
wget --no-clobber https://oss.sonatype.org/content/repositories/snapshots/io/swagger/swagger-codegen-cli/2.4.0-SNAPSHOT/swagger-codegen-cli-2.4.0-20180627.132127-273.jar -O swagger-codegen-cli.jar

java -jar swagger-codegen-cli.jar generate \
-i http://localhost:3000/api-docs.json \
-l typescript-angular \
-o src/app/api \
--additional-properties ngVersion=6 \
--additional-properties modelPropertyNaming=original
