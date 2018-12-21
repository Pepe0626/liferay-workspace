/*!
(c) 2016 DS Data Systems UK Ltd, All rights reserved.

DS Data Systems and KonaKart and their respective logos, are
trademarks of DS Data Systems UK Ltd. All rights reserved.

The information in this document is free software;you can redistribute
it and/or modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This software is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
Lesser General Public License for more details.
 */
 
 /*!
Changes to kk-tile-gen.min.js to create kk-tile-gen.https.min.js used for 
Facebook Store

1)
Changed banner to full URL
https://www.konakart.com/konakart_tiles/gensrc/images/banners/kindle-fire-hd.jpg

2)
Changed kkRoot to HTTPS
var kkRoot="https://www.konakart.com/konakart/"

3)
changed www.konakart.com header link to no link (removed <a> tag completely
*/

/*
 * Start of configuration parameters
 */
// Change the root depending on where KK is running
// Define the root URL
//var kkRoot = 'http://localhost:8780/konakart_tiles/gensrc/';
var kkRoot = 'https://www.konakart.com/konakart_tiles/gensrc/';
// Use the script base to load the JavaScript
var kkScriptBase = kkRoot + "script/";

// Use the css base to load the css
var kkCSSBase = kkRoot + "styles/";

var kkJQuery = "https://code.jquery.com/jquery-3.3.1.min.js";
var kkTileGen = kkScriptBase + "kk-tile-gen.https.min.js";
//var kkTileGen = kkScriptBase + "kk-tile-gen.min.js";

var kkLibs = [];
kkLibs.push("https://code.jquery.com/ui/1.12.1/jquery-ui.min.js");
kkLibs.push("https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js");

var kkLibs1 = [];
kkLibs1.push("https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/jquery.validate.min.js");
kkLibs1.push("https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min.js");
kkLibs1.push("https://cdnjs.cloudflare.com/ajax/libs/accounting.js/0.4.1/accounting.min.js");
kkLibs1.push(kkScriptBase + "ddpowerzoomer.js");
kkLibs1.push(kkScriptBase + "jquery.jcarousel.min.js");
kkLibs1.push(kkScriptBase + "jquery.touchSwipe.min.js");
kkLibs1.push(kkScriptBase + "jquery.konakart.min.js");
kkLibs1.push(kkScriptBase + "jquery.ui.datepicker-en.js");
kkLibs1.push(kkScriptBase + "polyglot.js");


var kkCSS = [];
kkCSS.push("https://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css");
kkCSS.push(kkCSSBase+"kk-tile-gen.min.css");
kkCSS.push(kkCSSBase+"jcarousel.css");		
kkCSS.push("https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css");	

/*
 * End of configuration parameters
 */

// After jQuery load other libs and CSS
kkJQueryLoadedCallback = function () {
	kkLoadLibs();
};

// Callback from first set of libs loaded
var kkLibsLoaded = 0;
var kkLibsToLoad = parseInt(kkLibs.length);
kkLibLoadedCallback = function() {
	kkLibsLoaded += 1;
	if (kkLibsLoaded == kkLibsToLoad) {
		kkLoadLibs1();
	}
}

// Callback from second set of libs loaded
var kkLibs1Loaded = 0;
var kkLibs1ToLoad = parseInt(kkLibs1.length);
kkLibLoadedCallback1 = function() {
	kkLibs1Loaded += 1;
	if (kkLibs1Loaded == kkLibs1ToLoad) {
		kkLoadJS(kkTileGen,kkTileGenLoadedCallback);
	}
}

// After KKTileGen we can start the store app
kkTileGenLoadedCallback = function() {
	polyglot = new Polyglot({
		phrases : kkMsgMap[kkLocale]
	});
	try {
		kk.storeInit();
	}
	catch(err) {
		//console.log(err.message);
		// Try reloading
		kkLoadJS(kkTileGen,kkTileGenLoadedCallback);
	}		
}

// Start by loading jQuery
if (typeof jQuery == 'undefined') {
	kkLoadJS(kkJQuery,kkJQueryLoadedCallback);
} else {
	// This callback would normally get called once jQuery has been loaded
	kkJQueryLoadedCallback();
}

/*
 * Dynamically load any JavaScript file
 */
function kkLoadJS(filename, callback) {
	//console.log("load "+filename);
	var fileref = document.createElement('script');
	fileref.setAttribute("type", "text/javascript");
	fileref.setAttribute("src", filename);
	if (fileref.readyState) {
		fileref.onreadystatechange = function() { /* IE */
			if (fileref.readyState == "loaded"
					|| fileref.readyState == "complete") {
				fileref.onreadystatechange = null;
				callback();
			}
		};
	} else {
		fileref.onload = function() { /* Other browsers */
			callback();
		};
	}

	// Try to find the head, otherwise default to the documentElement
	if (typeof fileref != "undefined")
		(document.getElementsByTagName("head")[0] || document.documentElement)
				.appendChild(fileref);
}

/*
 * Dynamically load any CSS file
 */
function kkLoadCSS(filename) {
	var fileref = document.createElement('link');
	fileref.setAttribute("type", "text/css");
	fileref.setAttribute("href", filename);
	fileref.setAttribute("rel", "stylesheet");
	document.getElementsByTagName("head")[0].appendChild(fileref);
}


/*
 * First batch of libs to load after JQuery
 */
function kkLoadLibs() {

	for (var i = 0; i < kkLibs.length; i++) {
		var file = kkLibs[i];
		kkLoadJS(file, kkLibLoadedCallback);
	}
}

/*
 * Second batch of libs to load after JQuery
 */
function kkLoadLibs1() {

	for (var i = 0; i < kkCSS.length; i++) {
		var file = kkCSS[i];
		kkLoadCSS(file);
	}
	for (var i = 0; i < kkLibs1.length; i++) {
		var file = kkLibs1[i];
		kkLoadJS(file, kkLibLoadedCallback1);
	}
}


