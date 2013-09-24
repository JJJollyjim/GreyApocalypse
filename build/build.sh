node r.js -o build.js
sed 's/<script data-main="scripts\/main" src="scripts\/lib\/require.js"><\/script>/<script data-main="main-built.js" src="..\/GreyApocalypse\/scripts\/lib\/require.js"><\/script>/g' ../GreyApocalypse/index.html > index.html
cp ../GreyApocalypse/css/style.css ./css/style.css