/*
(c) 2015 DS Data Systems UK Ltd, All rights reserved.

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

/**
 * This Javascript manages the Backbone router and the breadcrumbs tile using
 * the template breadcrumbsTile.html
 */

// Breadcrumbs tile context and template
var kkbrContext = null;
var kkbrTemplate = null;

var kkRouter = null;

kk.startRouter = function() {

	if (typeof Backbone == 'undefined')
		return;

	var kkAppRouter = Backbone.Router.extend({
		routes : {
			"products/*control" : "products",
			"filterProducts/*control" : "filterProducts",
			"orderDetail/*control" : "orderDetail",
			"productDetail/*control" : "productDetail",
			"category/*control" : "category",
			"wishlist" : "wishlist",
			"cart" : "cart",
			"register" : "register",
			"account" : "account",
			"login" : "login",
			"managePassword" : "managePassword",
			"manageEmail" : "manageEmail",
			"managePersonalInfo" : "managePersonalInfo",
			"insertAddress" : "insertAddress",
			"firstAddress" : "firstAddress",
			"editAddress" : "editAddress",
			"manageAddressBook" : "manageAddressBook",
			"newsletterSubscription" : "newsletterSubscription",
			"productNotification" : "productNotification",
			"checkout" : "checkout",
			"writeReview" : "writeReview",
			"forgotPassword" : "forgotPassword",
			"orders" : "orders",
			"*actions" : "defaultRoute"
		}
	});
	// Initiate the router
	kkRouter = new kkAppRouter;

	kkRouter.on('route:productDetail', function(control) {
		try {
			kk.storeInit();
			var map = kk.getParms(control);
			var prodId = kk.checkInt(map["p"]);
			var showRevs = (map["r"] == 1) ? true : false;
			var url = kk.getProdDetailsURL(prodId);
			if (url == null) {
				var config = new Object();
				config.showReviewsTab = showRevs;
				kk.renderProdDetailTile(prodId, config);
			} else {
				kk.redirect(url);
			}
		} catch (e) {
			console.log("Invalid productDetail URL : " + control);
			kk.renderHomePage();
		}
	});

	kkRouter.on('route:products', function(control) {
		try {
			kk.storeInit();
			var map = kk.getParms(control);
			var search = map["s"];
			var dataDesc = map["d"];
			var catId = kk.checkIntOptional(map["c"]);
			var manuId = kk.checkIntOptional(map["m"]);
			if (search == null) {
				kkpsContext.prodSearch.forceUseSolr = kkpsContext.useSolr;
				kkpsContext.prodSearch.returnCategoryFacets = true;
				kkpsContext.prodSearch.returnManufacturerFacets = true;
				if (catId != null) {
					kkpsContext.prodSearch.categoryId = catId;
				} else {
					kkpsContext.prodSearch.categoryId = KK_SEARCH_ALL;
				}
				if (manuId != null) {
					kkpsContext.prodSearch.manufacturerId = manuId;
				} else {
					kkpsContext.prodSearch.manufacturerId = KK_SEARCH_ALL;
				}
			} else {
				kkpsContext.prodSearch = $.parseJSON(kk.base64Decode(search));
				if (dataDesc != null) {
					kkpsContext.dataDesc = $.parseJSON(kk.base64Decode(dataDesc));
				}
			}
			kk.fetchAndRenderProducts();
		} catch (e) {
			console.log("Invalid products URL : " + control);
			kk.renderHomePage();
		}
	});

	kkRouter.on('route:filterProducts', function(control) {
		try {
			kk.storeInit();
			var map = kk.getParms(control);
			var search = map["s"];
			var dataDesc = map["d"];
			if (search != null && dataDesc != null) {
				kkpsContext.prodSearch = $.parseJSON(kk.base64Decode(search));
				kkpsContext.dataDesc = $.parseJSON(kk.base64Decode(dataDesc));
			}
			kk.filterAndRenderProducts();
		} catch (e) {
			console.log("Invalid filterProducts URL : " + control);
			kk.renderHomePage();
		}
	});

	kkRouter.on('route:orderDetail', function(control) {
		try {
			kk.storeInit();
			var map = kk.getParms(control);
			var orderId = kk.checkInt(map["o"]);
			kk.renderOrderDetailTile(orderId);
		} catch (e) {
			console.log("Invalid orderDetail URL : " + control);
			kk.renderHomePage();
		}
	});

	kkRouter.on('route:category', function(control) {
		try {
			kk.storeInit();
			var map = kk.getParms(control);
			var catId = kk.checkInt(map["c"]);
			kk.selectCategory(catId);
		} catch (e) {
			console.log("Invalid category URL : " + control);
		}
	});

	kkRouter.on('route:wishlist', function(actions) {
		kk.storeInit();
		kk.refreshManageWishListTile();
	});

	kkRouter.on('route:cart', function(actions) {
		kk.storeInit();
		kk.refreshManageCartTile();
	});

	kkRouter.on('route:register', function(actions) {
		kk.storeInit();
		kk.renderRegisterTile();
	});

	kkRouter.on('route:login', function(actions) {
		kk.storeInit();
		kk.renderLoginTile();
	});

	kkRouter.on('route:account', function(actions) {
		kk.storeInit();
		kk.renderAccountTile();
	});

	kkRouter.on('route:managePassword', function(actions) {
		kk.storeInit();
		kk.renderCustomerInfoTile("managePassword");
	});

	kkRouter.on('route:manageEmail', function(actions) {
		kk.storeInit();
		kk.renderCustomerInfoTile("manageEmail");
	});

	kkRouter.on('route:managePersonalInfo', function(actions) {
		kk.storeInit();
		kk.renderCustomerInfoTile("managePersonalInfo");
	});

	kkRouter.on('route:insertAddress', function(actions) {
		kk.storeInit();
		kk.renderCustomerInfoTile("insertAddress");
	});

	kkRouter.on('route:firstAddress', function(actions) {
		kk.storeInit();
		kk.renderCustomerInfoTile("firstAddress");
	});

	kkRouter.on('route:editAddress', function(actions) {
		kk.storeInit();
		kk.renderCustomerInfoTile("editAddress");
	});

	kkRouter.on('route:manageAddressBook', function(actions) {
		kk.storeInit();
		kk.renderCustomerInfoTile("manageAddressBook");
	});

	kkRouter.on('route:newsletterSubscription', function(actions) {
		kk.storeInit();
		kk.renderCustomerInfoTile("newsletterSubscription");
	});

	kkRouter.on('route:productNotification', function(actions) {
		kk.storeInit();
		kk.renderCustomerInfoTile("productNotification");
	});

	kkRouter.on('route:checkout', function(actions) {
		kk.storeInit();
		kk.renderOPCTile();
	});

	kkRouter.on('route:writeReview', function(actions) {
		kk.storeInit();
		kk.renderWriteReviewTile();
	});

	kkRouter.on('route:forgotPassword', function(actions) {
		kk.storeInit();
		kk.renderForgotPasswordTile();
	});

	kkRouter.on('route:orders', function(actions) {
		kk.storeInit();
		kk.fetchAndRenderOrders();
	});

	kkRouter.on('route:defaultRoute', function(actions) {
		kk.storeInit();
		kk.renderHomePage();
	});

	// Start Backbone history a necessary step for bookmarkable URL's
	if (!Backbone.History.started) {
		Backbone.history.start();
	}
	
};

/**
 * Function to validate a positive integer
 */
kk.checkInt = function(data) {
	if (!isNaN(data) && data > -1) {
		return data;
	}
	throw -1;
};

/**
 * Function to validate an optional positive integer
 */
kk.checkIntOptional = function(data) {
	if (data == null) {
		return null;
	}
	return kk.checkInt(data);
};

/**
 * Sets the URL to the given value so that we can use the back button of the
 * browser
 */
kk.setURL = function(route, control) {

	// Return if we aren't using the router
	if (kkRouter == null) {
		return;
	}

	var r = null;
	if (route == "productDetail" && control != null) {
		r = route;
		if (control.catNames != null) {
			for (var i = control.catNames.length - 1; i > -1; i--) {
				var catName = control.catNames[i];
				r = kk.addToRoute(r, catName);
			}
		}
		r = kk.addToRoute(r, control.manu);
		r = kk.addToRoute(r, control.prodName);
		r = kk.addToRoute(r, control.prodModel);
		r += "/p/" + control.prodId;
		if (control.reviews != null) {
			r += "/r/1";
		}
	} else if ((route == "products") || (route == "filterProducts")) {
		var search = kk.base64Encode(JSON.stringify(kkpsContext.prodSearch));
		var dd = kk.base64Encode(JSON.stringify(kkpsContext.dataDesc));
		r = route;
		if (control.catNames != null) {
			for (var i = control.catNames.length - 1; i > -1; i--) {
				var catName = control.catNames[i];
				r = kk.addToRoute(r, catName);
			}
		}
		if (control.manu != null) {
			r = kk.addToRoute(r, control.manu);
		}
		if (control.search != null) {
			r = kk.addToRoute(r, control.search);
		}
		r = r + "/d/" + dd + "/s/" + search;
	} else if (route == "orderDetail" && control != null) {
		r = route + "/o/" + control.orderId;
	} else {
		r = route;
	}

	kk.setBreadcrumbs(route, control);

	kkRouter.navigate(r, {
		trigger : false,
		replace : false
	});

};

/*
 * Utility to add values to the route
 */
kk.addToRoute = function(route, val) {
	// Replace single quotes for FF problem which executes the route
	val = val.replace(/'/g, "%27");
	return route + "/" + encodeURIComponent(val);
};

/**
 * Define the id of the div for the Breadcrumbs tile
 */
kk.setBreadcrumbsTileDivId = function(id) {
	kk.getBreadcrumbsTileTemplateContext();
	kkbrContext.breadcrumbsDivId = id;
};

/**
 * Returns a fully populated template context for a breadcrumbs tiles
 */
kk.getBreadcrumbsTileTemplateContext = function() {
	if (kkbrContext == null) {
		kkbrContext = kk.getTemplateContext();
	}
};

/**
 * Renders the breadcrumbs tile
 */
kk.renderBreadcrumbsTile = function() {
	if (kkbrTemplate == null) {
		kk.getTemplate("breadcrumbsTile", function(t) {
			kkbrTemplate = t;
			kk.renderBreadcrumbsTile();
		});
		return;
	}
	if (kkbrContext == null || kkbrContext.breadcrumbsDivId == null) {
		console.log(kk.getMsg("exception.render.tile", "kk.setBreadcrumbsTileDivId", "kk.renderBreadcrumbsTile"));
		return;
	}
	var breadcrumbsArea = kkbrTemplate(kkbrContext);
	$("#" + kkbrContext.breadcrumbsDivId).html(breadcrumbsArea);
};

/**
 * Sets the breadcrumbs on the breadcrumb tile
 */
kk.setBreadcrumbs = function(routeName, control) {
	var separator = '<span class="kkbrt-separator"></span>';

	// Add home
	var nav = new Object();
	nav.title = kk.getMsg("breadcrumb.tile.home");
	nav.link = "";
	var navs = [ nav ];

	if (control != null) {

		var added = false;

		// Add categories
		if (control.catIds != null && control.catIds.length > 0) {
			for (var i = control.catIds.length - 1; i > -1; i--) {
				var catId = control.catIds[i];
				var nav = new Object();
				nav.title = _.escape(control.catNames[i]);
				nav.link = "category/c/" + catId;
				navs.push(nav);
			}
			added = true;
		}

		// Add product id
		if (control.prodId != null) {
			var nav = new Object();
			nav.title = _.escape(control.prodName);
			nav.link = "productDetail/p/" + control.prodId;
			navs.push(nav);
			added = true;
		}

		// Add Search Results
		if (control.search != null) {
			var nav = new Object();
			nav.title = kk.getMsg("breadcrumb.tile.search", control.search);
			nav.link = null;
			navs.push(nav);
			added = true;
		}

		if (added == false) {
			var msgKey = "breadcrumb.tile." + routeName;
			var msg = kk.getMsg(msgKey);
			if (msg != msgKey) {
				var nav = new Object();
				nav.title = msg;
				nav.link = routeName;
				navs.push(nav);
			}
		}
	} else {
		// Add route
		var nav = new Object();
		nav.title = kk.getMsg("breadcrumb.tile." + routeName);
		nav.link = routeName;
		navs.push(nav);
	}

	var crumbs = "";
	for (var i = 0; i < navs.length; i++) {
		if (i > 0) {
			crumbs += separator;
		}
		var nav = navs[i];
		if (nav.link != null) {
			crumbs = crumbs + '<a class="kkbrt-item" href="#' + nav.link + '">' + nav.title + "</a>";
		} else {
			crumbs = crumbs + '<span class="kkbrt-item">' + nav.title + "</span>";
		}

	}
	$("#kkbrt-breadcrumbs").html(crumbs);

};

/**
 * Returns a map of parameters
 */
kk.getParms = function(data) {
	var retMap = new Object();
	if (data != null && data.length > 0) {
		var parms = data.split("/");
		var val = null;
		var j = 0;
		for (var i = parms.length - 1; i > -1; i--) {
			var parm = parms[i];
			if (j == 0) {
				val = parm;
				j = 1;
			} else {
				retMap[parm] = val;
				j = 0;
			}
		}
	}
	return retMap;
};

var kk_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

/**
 * Used to encode the URL
 * 
 * @param input
 * @returns
 */
kk.base64Encode = function(input) {
	var output = "";
	var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	var i = 0;

	input = kk.utf8_encode(input);

	while (i < input.length) {

		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);

		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;

		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}

		output = output + kk_keyStr.charAt(enc1) + kk_keyStr.charAt(enc2) + kk_keyStr.charAt(enc3)
				+ kk_keyStr.charAt(enc4);

	}

	return output;
};

/**
 * Used to decode the URL
 * 
 * @param input
 * @returns {String}
 */
kk.base64Decode = function(input) {
	var output = "";
	var chr1, chr2, chr3;
	var enc1, enc2, enc3, enc4;
	var i = 0;

	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	while (i < input.length) {

		enc1 = kk_keyStr.indexOf(input.charAt(i++));
		enc2 = kk_keyStr.indexOf(input.charAt(i++));
		enc3 = kk_keyStr.indexOf(input.charAt(i++));
		enc4 = kk_keyStr.indexOf(input.charAt(i++));

		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;

		output = output + String.fromCharCode(chr1);

		if (enc3 != 64) {
			output = output + String.fromCharCode(chr2);
		}
		if (enc4 != 64) {
			output = output + String.fromCharCode(chr3);
		}
	}

	output = kk.utf8_decode(output);

	return output;

};

/**
 * private method for UTF-8 encoding
 */
kk.utf8_encode = function(string) {
	string = string.replace(/\r\n/g, "\n");
	var utftext = "";

	for (var n = 0; n < string.length; n++) {

		var c = string.charCodeAt(n);

		if (c < 128) {
			utftext += String.fromCharCode(c);
		} else if ((c > 127) && (c < 2048)) {
			utftext += String.fromCharCode((c >> 6) | 192);
			utftext += String.fromCharCode((c & 63) | 128);
		} else {
			utftext += String.fromCharCode((c >> 12) | 224);
			utftext += String.fromCharCode(((c >> 6) & 63) | 128);
			utftext += String.fromCharCode((c & 63) | 128);
		}

	}

	return utftext;
};

/**
 * private method for UTF-8 decodeing
 */
kk.utf8_decode = function(utftext) {
	var string = "";
	var i = 0;
	var c = c1 = c2 = 0;

	while (i < utftext.length) {

		c = utftext.charCodeAt(i);

		if (c < 128) {
			string += String.fromCharCode(c);
			i++;
		} else if ((c > 191) && (c < 224)) {
			c2 = utftext.charCodeAt(i + 1);
			string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
			i += 2;
		} else {
			c2 = utftext.charCodeAt(i + 1);
			c3 = utftext.charCodeAt(i + 2);
			string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
			i += 3;
		}

	}

	return string;
};