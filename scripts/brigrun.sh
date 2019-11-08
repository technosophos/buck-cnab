#!/bin/bash
PROJECT=brigade-aea88cfd4231bc98fff08a51a6dad9256eb0f684fa3e9f0556a5a3
BRIG=$GOPATH/src/github.com/brigadecore/brigade/bin/brig-darwin-amd64

$BRIG run $PROJECT -f ../brigade.js -p ../examples/cowsay.json -e resource_added -r master