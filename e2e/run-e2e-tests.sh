#!/bin/bash
DIR=$(pwd)

printf "Directory\tStatus\n" > e2e.out
for SUBDIR in $DIR/*; do
  if [ -d "$SUBDIR" ]; then
    if [ "$(basename $SUBDIR)" == "umd" ]; then
      continue
    fi
    cd "$SUBDIR"
    echo "Testing $(basename $SUBDIR)"
    rm -rf node_modules
    rm package-lock.json
    npm install
    npm list typescript-nedb-orm --depth=0
    npm start
    STATUS=$?
    cd "$DIR"
    if [ $STATUS -eq 0 ]; then
    printf "$(basename $SUBDIR)\tOK\n" >> e2e.out
    else
    printf "$(basename $SUBDIR)\tKO\n" >> e2e.out
    fi
  fi
done
echo "End of script"

cat e2e.out
