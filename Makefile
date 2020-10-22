CONTAINER_NAME=dream-trip
PWD=$(shell pwd)
APPDIR=/app
PORT=1234
STATIC_PORT=3000
CURRENT_TIMESTAMP=$(shell date +%Y%m%d%H%M%S)
MUID=$(shell id -u)
MGID=$(shell id -g)

build-dev:
	docker build . -t $(CONTAINER_NAME):latest \
		--build-arg	MUID=$(MUID) --build-arg MGID=$(MGID) --target development

run-dev:
	docker run --rm -it \
		-e APP_PORT=$(PORT) \
		-e STATIC_PORT=$(STATIC_PORT) \
		-v $(PWD):$(APPDIR):delegated \
		--network="host" --name $(CONTAINER_NAME) $(CONTAINER_NAME)

exec-dev:
	docker exec -it $(CONTAINER_NAME) bash

stop-dev:
	docker stop $(CONTAINER_NAME)
