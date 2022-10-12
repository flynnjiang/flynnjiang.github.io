#/bin/bash
VI=
if [ -x /usr/bin/gvim ]; then
	VI=/usr/bin/gvim
elif [ -x /usr/bin/vim ]; then
	VI=/usr/bin/vim
elif [ -x /usr/bin/vi ]; then
	VI=/usr/bin/vi
else
	return 127
fi

FILE_NAME=`date --rfc-3339=date`-$*
FILE_NAME=${FILE_NAME//[^a-zA-Z0-9\-]/-}.md

$VI $FILE_NAME
