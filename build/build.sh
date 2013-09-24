#!/bin/bash

working_dir="`pwd`"
current_folder="${working_dir##/*/}"
if [ "$current_folder" == "build" ]
then

	node r.js -o build.js

	# Change <script> tag in HTML file to import the optimized file instead (main-built.js)
	old='<script data-main="scripts\/main" src="scripts\/lib\/require.js"><\/script>'
	new='<script data-main="main-built.js" src="..\/GreyApocalypse\/scripts\/lib\/require.js"><\/script>'
	sed "s/${old}/${new}/g" ../GreyApocalypse/index.html > index.html

	cp ../GreyApocalypse/css/style.css ./css/style.css
else
	echo "In order to use this build script, cd into the build directory"
fi