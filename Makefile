
.PHONY: build
build:
	docker build -t technosophos/porter:latest .
	docker push technosophos/porter:latest