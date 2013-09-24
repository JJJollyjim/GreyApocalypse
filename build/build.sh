node r.js -o build.js
sed 's/<script data-main="scripts\/main" src="scripts\/lib\/require.js"><\/script>/<script type="test\/javascript" src="main-built.js"><\/script>/g' ../GreyApocalypse/index.html > index.html
cp ../GreyApocalypse/css/style.css ./css/style.css