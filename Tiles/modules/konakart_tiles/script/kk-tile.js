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
 * JavaScript containing utility methods used by all tiles.
 */

/**
 * Returns the URL for going to the product details page
 */
kk.getProdDetailsURL = function(prodId) {
	if (kkProdDetailsURL == null || window.location.href == kkProdDetailsURL) {
		return null;
	}
	var url = kkProdDetailsURL.replace("{prodId}", prodId);
	return url;
};

/**
 * Get a temporary customer Id
 */
kk.getTempCustomerId = function(callback) {
	var cookie = kk.getKKCookie(KK_CUSTOMER_ID);
	if (cookie == null) {
		kkEng.getTempCustomerId(function(result, textStatus, jqXHR) {
			kkCustomerId = decodeJson(result);
			kk.setKKCookie(KK_CUSTOMER_ID, kkCustomerId, 30);
			if (callback != null) {
				callback(kkCustomerId);
			}
		}, null, kk.getKKEng());
	} else {
		kkCustomerId = cookie;
		if (callback != null) {
			callback(kkCustomerId);
		}
	}
};

/**
 * Get the customer id
 */
kk.getCustomerId = function(callback) {
	if (kkCustomerId == null && callback == null) {
		alert("Customer Id has not been initialised. Must supply a callback.");
	}

	if (kkCustomerId == null) {
		kk.getTempCustomerId(callback);
	} else {
		if (callback != null) {
			callback(kkCustomerId);
		} else {
			return kkCustomerId;
		}
	}
};

/**
 * Get a template
 */
kk.getTemplate = function(templateName, callback) {

	if (typeof kkTmplMap != 'undefined') {
		var tmpl = kkTmplMap[templateName];
		if (tmpl != null) {
			callback(_.template(tmpl));
			return;
		}
	}
	var templateFile = TEMPLATE_ROOT + templateName + TEMPLATE_EXT;
	console.log("Reading template from file - " + templateFile);
	$.get(templateFile, function(data) {
		callback(_.template(data));
	}, 'html').fail(function() {
		alert("Failed to open template - " + templateFile);
	});
};

/**
 * Get a kkEngine
 */
kk.getKKEng = function() {
	return kkEngine;
};

/**
 * Get a custom kkEngine
 */
kk.getKKEngCustom = function() {
	return kkEngineCustom;
};

/**
 * Get the session id
 */
kk.getSessionId = function() {

	// If we can't find a timestamp cookie return null
	kkSessionTime = kk.getKKCookie(KK_SESSION_TIME);
	if (kkSessionTime == null || kkSessionTime.length == 0) {
		kkSessionId = null;
		return null;
	}

	// 30 min expiry
	var timeSinceLastCheck = (new Date()).getTime() - kkSessionTime;
	if (timeSinceLastCheck > 30 * 60 * 1000) {
		kkSessionId = null;
		return null;
	}

	// Get session from cookie if null
	if (kkSessionId == null) {
		kkSessionId = kk.getKKCookie(KK_SESSION_ID);
		if (kkSessionId != null && kkSessionId.length == 0) {
			kkSessionId = null;
		}
	}

	return kkSessionId;
};

/**
 * Set the session id
 */
kk.setSessionId = function(sessionId) {
	kkSessionId = sessionId;
	kk.setKKCookie(KK_SESSION_ID, ((kkSessionId == null) ? "" : kkSessionId), 1);
	kk.setKKCookie(KK_SESSION_TIME, (new Date()).getTime(), 1);
};

/**
 * Checks that the session is valid and returns the customer id in a callback.
 * If not valid it goes to the login page. A check is also made to see whether
 * Liferay is being used and if so whether Liferay SSO is enabled.
 */
kk.checkSession = function(callback, forward, forceCheck) {

	if (typeof Liferay != "undefined") {
		if (kkAllowLiferaySSO == null) { // Not sure if should do SSO
			kkEng.getConfigurationValue("MODULE_OTHER_LIFERAY_LOGIN_CLASS", function(result, textStatus, jqXHR) {
				kkLoginTileContext.liferayModuleClassName = decodeJson(result);
				if (kkLoginTileContext.liferayModuleClassName != null) {
					console.log("CheckSession - Had to read config - SSO Enabled");
					kkAllowLiferaySSO = true;
					kk.liferaySSO(callback, forward, forceCheck);
				} else {
					console.log("CheckSession - Had to read config - SSO Disabled");
					kkAllowLiferaySSO = false;
					kk.checkSessionPrivate(callback, forward, forceCheck);
				}
				return;
			}, null, kk.getKKEng());
		} else if (kkAllowLiferaySSO == true) { // Should do SSO
			console.log("CheckSession - SSO Enabled");
			kk.liferaySSO(callback, forward, forceCheck);
		} else { // Should not do SSO
			console.log("CheckSession - SSO Disabled");
			kk.checkSessionPrivate(callback, forward, forceCheck);
		}
	} else {
		kk.checkSessionPrivate(callback, forward, forceCheck);
	}
};

/**
 * Checks that the session is valid and returns the customer id in a callback.
 * If not valid it goes to the login page.
 */
kk.checkSessionPrivate = function(callback, forward, forceCheck) {

	if (kk.getSessionId() == null) {
		kk.renderLoginTile(forward);
		return;
	}

	/*
	 * If we haven't logged out and the last time we checked the session was
	 * good was less than SESSION_CHECK_MILLIS ago then we don't check on the
	 * server for performance reasons. kkSessionTime was updated in the
	 * kk.getSessionId() method called previously.
	 */
	var timeSinceLastCheck = (new Date()).getTime() - kkSessionTime;
	if ((timeSinceLastCheck > SESSION_CHECK_MILLIS) || (kkCustomerId == null) || forceCheck) {
		kkEng.checkSession(kkSessionId, function(result, textStatus, jqXHR) {
			var id = decodeJson(result,/* alertOnException */false);
			if (id == null || id.length == 0) {
				kk.setSessionId(null);
				kk.renderLoginTile(forward);
			} else {
				kkCustomerId = id;
				kk.setSessionId(kkSessionId); // update timestamp
				kk.showLogoutLink();
				// Load customer information if not present
				if (kkAccountTileContext == null || kkAccountTileContext.customer == null) {
					kk.getCustomerInfo(function() {
						callback(id);
					});
				} else {
					callback(id);
				}
			}
		}, null, kk.getKKEng());
	} else {
		kk.showLogoutLink();
		// Load customer information if not present
		if (kkAccountTileContext == null || kkAccountTileContext.customer == null) {
			kk.getCustomerInfo(function() {
				callback(kkCustomerId);
			});
		} else {
			callback(kkCustomerId);
		}
	}
};

/**
 * Perform SSO in Liferay
 */
kk.liferaySSO = function(callback, forward, forceCheck) {

	// If not logged into Liferay then show login screen
	if (!Liferay.ThemeDisplay.isSignedIn()) {
		console.log("kk.liferaySSO - Liferay User not logged in");
		kk.setSessionId(null);
		kk.renderLoginTile(forward);
		return;
	}

	/*
	 * If we haven't logged out and the last time we checked the session was
	 * good was less than SESSION_CHECK_MILLIS ago then we don't check on the
	 * server for performance reasons. kkSessionTime is updated in the
	 * kk.getSessionId() method called just below.
	 */
	kk.getSessionId();
	var timeSinceLastCheck = (new Date()).getTime() - kkSessionTime;
	if ((timeSinceLastCheck > SESSION_CHECK_MILLIS) || (kkSessionId == null) || (kkCustomerId == null) || forceCheck) {
		// Check the session id if it isn't null
		if (kkSessionId != null) {
			console.log("kk.liferaySSO - Checking sessionId which isn't null");
			kkEng.checkSession(kkSessionId, function(result, textStatus, jqXHR) {
				var id = decodeJson(result,/* alertOnException */false);
				if (id == null || id.length == 0) {
					console.log("kk.liferaySSO - Session not valid");
					kk.setSessionId(null);
					// Login with Liferay user
					kk.liferaySSOLogin();
				} else {
					// Session id is valid but have to ensure it refers to
					// currently logged in Liferay user
					console.log("kk.liferaySSO - Session checked and valid");
					kk.getCustomerInfo(function() {
						if (kkAccountTileContext.customer != null) {
							// Get Liferay customer details
							Liferay.Service('/user/get-user-by-id', {
								userId : Liferay.ThemeDisplay.getUserId()
							}, function(obj) {
								var email = obj.emailAddress;
								// If email addresses match then the customer is
								// already logged in
								if (email.toUpperCase() === kkAccountTileContext.customer.emailAddr.toUpperCase()) {
									console.log("kk.liferaySSO - Liferay Email matches");
									kkCustomerId = id;
									// update timestamp
									kk.setSessionId(kkSessionId);
									callback(kkCustomerId);
								} else {
									console.log("kk.liferaySSO - Liferay Email doesn't match");
									kk.setSessionId(null);
									// Login with Liferay user
									kk.liferaySSOLogin();
								}
							});
						} else {
							// Should never reach here. Means that couldn't get
							// a user for a valid session id
							console.log("kk.liferaySSO - Should never reach here");
							kk.setSessionId(null);
							// Login with Liferay user
							kk.liferaySSOLogin();
						}
					});
				}
			}, null, kk.getKKEng());
		} else {
			console.log("kk.liferaySSO - Session Id is null");
			// Login with Liferay user
			kk.liferaySSOLogin();
		}
	} else {
		// We assume that the session is still valid
		// Load customer information if not present and call the callback
		console.log("kk.liferaySSO - Assuming session is valid");
		if (kkAccountTileContext == null || kkAccountTileContext.customer == null) {
			kk.getCustomerInfo(function() {
				callback(kkCustomerId);
			});
		} else {
			callback(kkCustomerId);
		}
	}
};

/**
 * Get the Liferay logged in user information and register the user in KonaKart
 * if the email doesn't exist.
 */
kk.liferaySSOLogin = function() {
	Liferay.Service('/user/get-user-by-id', {
		userId : Liferay.ThemeDisplay.getUserId()
	}, function(obj) {
		var email = obj.emailAddress;
		var firstName = obj.firstName;
		var lastName = obj.lastName;
		kkEng.doesCustomerExistForEmail(email, function(result, textStatus, jqXHR) {
			var exists = decodeJson(result);
			if (!exists) {
				console.log("kk.liferaySSOLogin - Registering new customer");
				var cr = new Object();
				cr.emailAddr = email;
				cr.enabled = true;
				cr.firstName = firstName;
				cr.lastName = lastName;
				cr.noGender = true;
				cr.noBirthDate = true;
				cr.noAddress = true;
				cr.noTelephone = true;
				cr.noPassword = true;
				kkEng.registerCustomer(cr, function(result, textStatus, jqXHR) {
					kk.liferaySSOLogin1(email);
				}, null, kk.getKKEng());
			} else {
				console.log("kk.liferaySSOLogin - Customer exists");
				kk.liferaySSOLogin1(email);
			}
		}, null, kk.getKKEng());
	});
}

/**
 * Login the Liferay customer using the KonaKart external login functionality
 */
kk.liferaySSOLogin1 = function(email) {
	var loginInfo = new Object();
	loginInfo.moduleClassName = kkLoginTileContext.liferayModuleClassName;
	loginInfo.emailAddr = email;
	kkEng.externalLogin(loginInfo, function(result, textStatus, jqXHR) {
		var ret = decodeJson(result);
		if (ret.error) {
			console.log(ret.message);
			kk.renderLoginTilePrivate1();
		} else {
			kk.afterLogin(ret.sessionId);
		}
	}, null, kk.getKKEng());
};

/**
 * Get the language id. If set to -1 (use default language) we asynchronously
 * look it up for the next call since it's faster to have the actual id.
 */
kk.getLangId = function() {
	if (kkLangId == -1) {
		kk.setDefaultLangId();
	}
	return kkLangId;
};

/**
 * Set the language id with the language matching the default locale.
 */
kk.setDefaultLangId = function() {
	kkEng.getAllLanguages(function(result, textStatus, jqXHR) {
		var langs = decodeJson(result);
		var found = false;
		for (var i = 0; i < langs.length; i++) {
			var lang = langs[i];
			if (lang.locale == kkLocale) {
				kkLangId = lang.id;
				found = true;
				break;
			}
		}
		if (!found && langs.length > 0) {
			kkLangId = langs[0].id;
			console.log("Language not found for default locale " + kkLocale + " . Setting default language id to " + kkLangId);
		}
	}, null, kk.getKKEng());
};

/**
 * Get the language code
 */
kk.getLangCode = function() {
	return kkLocale.slice(0, 2);
};

/**
 * Get the locale
 */
kk.getLocale = function() {
	return kkLocale;
};

/**
 * Get the default country ISO 3 code
 */
kk.getDefaultCountryCode = function() {
	return KK_DEFAULT_COUNTRY_CODE;
};

/**
 * Gets the message from the message catalog
 */
kk.getMsg = function(key, data0, data1) {
	var msg;
	if (data0 == null && data1 == null) {
		msg = polyglot.t(key);
	} else if (data1 != null) {
		msg = polyglot.t(key, {
			0 : _.escape(data0),
			1 : _.escape(data1)
		});
	} else {
		msg = polyglot.t(key, {
			0 : _.escape(data0)
		});
	}
	return msg;
};

/**
 * Set number and currency format parameters from the message catalog
 */
kk.setCurrencyFormatter = function() {

	var currency = kkCurrencyMap[kkCurrencyCode];
	if (currency == null) {
		console.log("No currency has been defined in kk-currencies.js for the currency code " + kkCurrencyCode);
		return;
	}
	accounting.settings = {
		currency : {
			symbol : currency.symbol,
			format : currency.format,
			precision : currency.precision,
			decimal : kk.getMsg("number.decimal"),
			thousand : kk.getMsg("number.thousand")
		},
		number : {
			precision : 0,
			thousand : kk.getMsg("number.thousand"),
			decimal : kk.getMsg("number.decimal")
		}
	};
};

/**
 * Called to change the locale. The locale passed in must be in the format
 * en_GB, es_ES etc. The language Id isn't mandatory but if it is passed then we
 * don't have to do a database lookup.
 */
kk.changeLocale = function(callback, locale, langId) {
	if (locale == null || locale.length != 5) {
		console.log("changeLocale API was passed an invalid locale - " + locale);
		return;
	}

	if (kkMsgMap[locale] == null) {
		console.log("A message catalog does not exist for the locale - " + locale);
		return;
	}

	kkLocale = locale;

	polyglot = new Polyglot({
		phrases : kkMsgMap[kkLocale]
	});

	if (langId == null) {
		kkEng.getAllLanguages(function(result, textStatus, jqXHR) {
			var langs = decodeJson(result);
			var found = false;
			for (var i = 0; i < langs.length; i++) {
				var lang = langs[i];
				if (lang.locale == locale) {
					kkLangId = lang.id;
					found = true;
					break;
				}
			}
			if (!found) {
				var langCode = kk.getLangCode();
				for (var i = 0; i < langs.length; i++) {
					var lang = langs[i];
					if (lang.code == langCode) {
						kkLangId = lang.id;
						found = true;
						break;
					}
				}
			}
			if (!found) {
				console.log("WARNING: No countries found in KonaKart database for locale " + locale);
			}
			if (callback != null) {
				callback();
			}
		}, null, kk.getKKEng());
	} else {
		kkLangId = langId;
		if (callback != null) {
			callback();
		}
	}

};

/**
 * Get the image base
 */
kk.getImageBase = function() {
	return kkImgBase;
};

/**
 * Determine whether to display prices with tax
 */
kk.isDisplayPriceWithTax = function() {
	return kkDisplayPriceWithTax;
};

/**
 * Calculate the product image base
 */
kk.getProdImageBase = function(prod, base, opts) {
	if (prod == null) {
		return "";
	}

	var combinedCodes = [];
	if (opts != null && opts.length > 0 && prod.images != null && prod.images.imgNames != null && prod.images.imgNames.length > 0) {
		for (var i = 0; i < opts.length; i++) {
			var opt = opts[i];
			if (opt.code != null && opt.code.length > 0 && opt.valueCode != null && opt.valueCode.length > 0) {
				var searchString = "_" + opt.code + "_" + opt.valueCode;
				combinedCodes.push(searchString);
			}
		}
	}
	if (combinedCodes.length == 0) {
		return base + prod.imageDir + prod.uuid;
	}

	// Search for an image and return the first one we find
	for (var i = prod.images.imgNames.length - 1; i > -1; i--) {
		var name = prod.images.imgNames[i];
		for (var j = 0; j < combinedCodes.length; j++) {
			var combinedCode = combinedCodes[j];
			if (name != null && name.indexOf(combinedCode) > 0) {
				return base + prod.imageDir + prod.uuid + combinedCode;
			}
		}
	}

	return base + prod.imageDir + prod.uuid;
};

/**
 * Calculate the product image extension
 */
kk.getProdImageExtension = function(prod) {
	if (prod.image) {
		var ret = prod.image.split('.');
		if (ret.length < 2) {
			return "";
		}
		return '.' + ret.pop();
	}
	return "";
};

/**
 * Used by the tiles to format numbers
 */
kk.formatNumber = function(number, precision) {
	return accounting.formatNumber(number, precision);

};

/**
 * Used by the tiles to format money amounts. You can also do conversion here by
 * detecting the currency code.
 */
kk.formatMoney = function(amount) {
	// if (kkCurrencyCode == "EUR") {
	// money = money * conversionRate;
	// }
	return accounting.formatMoney(amount);
};

/**
 * Get a partially filled context object
 */
kk.getTemplateContext = function() {

	var context = new Object();

	// Set the warn quantity level
	context.qtyWarn = kkQuantityWarn;

	// To format numbers and currency
	context.accounting = accounting;

	// Display prices with our without tax
	context.displayPriceWithTax = kk.isDisplayPriceWithTax();

	// Base path for images
	context.imageBase = kk.getImageBase();

	context.getMsg = kk.getMsg;

	context.formatMoney = kk.formatMoney;

	context.formatNumber = kk.formatNumber;

	context.formatDate = function(date) {
		return dateFormat(date, kk.getMsg("dateformat.date.format"));
	};

	context.locale = kk.getLocale();

	context.defaultCountryCode = kk.getDefaultCountryCode();

	context.removeCData = kk.removeCData;

	context.isDiscountModule = kk.isDiscountModule;

	context.displayCouponEntry = kkDisplayCouponEntry;

	context.displayGiftCertificateEntry = kkDisplayGiftCertificateEntry;

	return context;
};

/**
 * Determines whether the module is a discount module typically used to apply a
 * different style
 */
kk.isDiscountModule = function(module) {
	if (module != null
			&& (module == "ot_product_discount" || module == "ot_total_discount" || module == "ot_buy_x_get_y_free"
					|| module == "ot_gift_certificate" || module == "ot_redeem_points" || module == "ot_shipping_discount")) {
		return true;
	}
	return false;
};

/**
 * Write a cookie
 */
kk.setKKCookie = function(c_name, value, exdays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString()) + "; path=/";
	document.cookie = c_name + "=" + c_value;
};

/**
 * Read a cookie
 */
kk.getKKCookie = function(c_name) {
	var i, x, y, ARRcookies = document.cookie.split(";");
	for (i = 0; i < ARRcookies.length; i++) {
		x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
		y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
		x = x.replace(/^\s+|\s+$/g, "");
		if (x == c_name) {
			return unescape(y);
		}
	}
};

/**
 * Returns the string passed in as stringIn without the CData information. i.e.
 * It removes '<![CDATA[' from the start of the string and ']]>' from the end
 * of the string.
 * 
 */
kk.removeCData = function(stringIn) {

	var cDataStart = "<![CDATA[";
	var cDataEnd = "]]>";

	if (stringIn == null || stringIn.length < cDataStart.length + cDataEnd.length) {
		return stringIn;
	}

	var stringOut = stringIn;
	var origStringIn = stringIn;

	if (origStringIn.slice(0, cDataStart.length) == cDataStart) {
		stringOut = origStringIn.slice(cDataStart.length);
		origStringIn = stringOut;
	}

	if (origStringIn.slice(origStringIn.length - cDataEnd.length, origStringIn.length) == cDataEnd) {
		stringOut = origStringIn.slice(0, origStringIn.length - cDataEnd.length);
	}

	return stringOut;
};

/**
 * Utility to redirect to a page
 */
kk.redirect = function(redirectURL) {
	window.location = redirectURL;
	return false;
};

/**
 * Animation while loading a page
 */
kk.startLoading = function() {
	$("body").addClass("kk-loading");
};

/**
 * Animation while loading a page
 */
kk.stopLoading = function() {
	$("body").removeClass("kk-loading");
};

/**
 * Hidden iFrame used to download invoices and digital downloads
 */
kk.getHiddenIframe = function() {
	var hiddenIFrameID = 'kk-downloader';
	var iframe = document.getElementById(hiddenIFrameID);
	if (iframe == null) {
		iframe = document.createElement('IFRAME');
		iframe.id = hiddenIFrameID;
		iframe.style.display = 'none';
		document.body.appendChild(iframe);
	}
	return iframe;
};

/**
 * Instantiate the message catalog with default locale
 */
$(function() {
	polyglot = new Polyglot({
		phrases : kkMsgMap[kkLocale]
	});

	kk.setCurrencyFormatter();
});
