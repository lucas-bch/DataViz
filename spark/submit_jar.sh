JARS=`ls -mtrdS $(pwd)/lib/* | tr -d ' \n'`

spark-submit --jars $JARS --files config.json "$@"
