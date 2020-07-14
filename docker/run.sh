#!/bin/sh
docker run -v ${PWD}/../:/app -p 3001:3001 --rm -it sheff/osadmin
