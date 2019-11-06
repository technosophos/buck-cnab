FROM debian:stretch

ARG BUNDLE_DIR

RUN apt-get update && apt-get install -y ca-certificates

RUN apt-get update && apt-get install -y cowsay
RUN ln -s /usr/games/cowsay /usr/bin/cowsay


COPY .cnab /cnab
COPY . $BUNDLE_DIR
RUN rm -fr $BUNDLE_DIR/.cnab
WORKDIR $BUNDLE_DIR
CMD ["/cnab/app/run"]