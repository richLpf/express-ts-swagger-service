#!/bin/bash

timestamp=$(date +%Y%m%d%H%M%S)

docker build -t okr_backend\
		--platform linux/amd64\
		--target production-build-stage\
		-f Dockerfile .
