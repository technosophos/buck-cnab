FROM docker:dind

ENV HELM_VER 2.12.3 

RUN apk add \
    ca-certificates bash curl && \
    curl https://deislabs.blob.core.windows.net/porter/latest/install-linux.sh | bash && \
    mkdir -p /porter

ENV PATH="$PATH:/root/.porter"

WORKDIR /porter