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
 * JavaScript for the login tile using the template loginTile.html
 */

var kkLoginTileContext = null;
var kkLoginTileTemplate = null;
var kkForgotPasswordTileTemplate = null;

/**
 * Returns a fully populated template context for a login tile
 */
kk.getLoginTileTemplateContext = function() {

	if (kkLoginTileContext == null) {
		kkLoginTileContext = kk.getTemplateContext();
		kkLoginTileContext.allowFacebookLogin = false;
		kkLoginTileContext.facebookId = null;
		kkLoginTileContext.allowGooglePlusLogin = false;
		kkLoginTileContext.googlePlusId = null;
		kkLoginTileContext.liferayModuleClassName = null;
		kkLoginTileContext.loginType = null;
	}
};

/**
 * Define the id of the div for the login link
 */
kk.setLoginLinkDivId = function(id) {
	kk.getLoginTileTemplateContext();
	kkLoginTileContext.loginLinkDivId = id;
	var loginLink = $("#" + kkLoginTileContext.loginLinkDivId);
	loginLink.html(kkLoginTileContext.getMsg("login.link.my.account"));
	// Set login link event handler
	loginLink.off().on('click', function() {
		kk.checkSession(function(customerId) {
			kk.renderAccountTile(/* fetchNewData */false);
		},/* forward */null,/* forceCheck */true);
		return false;
	});
};

/**
 * Define the id of the div for the logout link
 */
kk.setLogoutLinkDivId = function(id) {
	kk.getLoginTileTemplateContext();
	kkLoginTileContext.logoutLinkDivId = id;
	var logoutLink = $("#" + kkLoginTileContext.logoutLinkDivId);
	logoutLink.html(kkLoginTileContext.getMsg("login.link.logout"));
	logoutLink.hide();
	logoutLink.off().on('click', function() {
		kkEng.logout(kk.getSessionId(), function(result, textStatus, jqXHR) {
			kk.afterLogout();
		}, null, kk.getKKEng());
		return false;
	});
};

/**
 * Hide the logout link
 */
kk.hideLogoutLink = function(id) {
	var logoutLink = $("#" + kkLoginTileContext.logoutLinkDivId);
	logoutLink.hide();
};

/**
 * Show the logout link
 */
kk.showLogoutLink = function(id) {
	if (kkLoginTileContext == null || kkLoginTileContext.logoutLinkDivId == null) {
		console.log(kk.getMsg("exception.render.tile", "kk.setLogoutLinkDivId", "kk.showLogoutLink"));
		return;
	}
	var logoutLink = $("#" + kkLoginTileContext.logoutLinkDivId);
	// Don't show link when using Liferay SSO
	if (kkAllowLiferaySSO == null || !kkAllowLiferaySSO) {
		logoutLink.show();
	}
};

/**
 * Define the id of the div for the login tile
 */
kk.setLoginTileDivId = function(id) {
	kk.getLoginTileTemplateContext();
	kkLoginTileContext.loginTileDivId = id;
};

/**
 * Renders the login tile
 */
kk.renderLoginTile = function(forward) {
	if (kkLoginTileTemplate == null) {
		kk.getTemplate("loginTile", function(t) {
			kkLoginTileTemplate = t;
			kk.renderLoginTile(forward);
		});
		return;
	}
	kk.setURL("login");
	if (kkLoginTileContext == null || kkLoginTileContext.loginTileDivId == null) {
		console.log(kk.getMsg("exception.render.tile", "kk.setLoginTileDivId", "kk.renderLoginTile"));
		return;
	}

	kkLoginTileContext.forward = forward;

	/*
	 * Get the configs either if the allow is undefined or if it's set to true
	 * and we haven't fetched them yet
	 */
	var getFacebookConfigs = (kkAllowFacebookLogin == null) || (kkAllowFacebookLogin == true && kkLoginTileContext.allowFacebookLogin == null);
	var getGoogleConfigs = (kkAllowGooglePlusLogin == null) || (kkAllowGooglePlusLogin == true && kkLoginTileContext.allowGooglePlusLogin == null);

	var callBackCount = 0;
	if (getFacebookConfigs) {
		callBackCount += 2;
	}
	if (getGoogleConfigs) {
		callBackCount += 2;
	}

	if (callBackCount > 0) {
		if (getFacebookConfigs) {
			kkEng.getConfigurationValueAsBool("MODULE_OTHER_FACEBOOK_LOGIN_STATUS", false, function(result, textStatus, jqXHR) {
				kkAllowFacebookLogin = decodeJson(result);
				kkLoginTileContext.allowFacebookLogin = kkAllowFacebookLogin;
				if (--callBackCount == 0)
					kk.renderLoginTilePrivate();
			}, null, kk.getKKEng());
			kkEng.getConfigurationValue("MODULE_OTHER_FACEBOOK_APP_ID", function(result, textStatus, jqXHR) {
				kkLoginTileContext.facebookId = decodeJson(result);
				if (--callBackCount == 0)
					kk.renderLoginTilePrivate();
			}, null, kk.getKKEng());
		}
		if (getGoogleConfigs) {
			kkEng.getConfigurationValueAsBool("MODULE_OTHER_GOOGLEPLUS_LOGIN_STATUS", false, function(result, textStatus, jqXHR) {
				kkAllowGooglePlusLogin = decodeJson(result);
				kkLoginTileContext.allowGooglePlusLogin = kkAllowGooglePlusLogin;
				if (--callBackCount == 0)
					kk.renderLoginTilePrivate();
			}, null, kk.getKKEng());
			kkEng.getConfigurationValue("MODULE_OTHER_GOOGLEPLUS_CLIENT_ID", function(result, textStatus, jqXHR) {
				kkLoginTileContext.googlePlusId = decodeJson(result);
				if (--callBackCount == 0)
					kk.renderLoginTilePrivate();
			}, null, kk.getKKEng());
		}
	} else {
		kk.renderLoginTilePrivate()
	}
};


/**
 * Renders the login tile after receiving configuration data
 */
kk.renderLoginTilePrivate = function() {
	var loginTile = kkLoginTileTemplate(kkLoginTileContext);
	kk.emptyBodyArea();
	$("#" + kkLoginTileContext.loginTileDivId).html(loginTile);
	kk.addLoginTileEventHandlers();
};


/**
 * Should be called after rendering the login tile.
 */
kk.addLoginTileEventHandlers = function() {

	$('#kk-continue-button').off().on('click', function() {
		$('#kk-login-form').submit();
		return false;
	});

	$('#kk-login-form').submit(function(e) {
		kk.setErrorMessage("");
		kkLoginTileContext.loginType = null;
		var val = $('#kk-login-form').validate(validationRules).form();
		if (val) {
			var loginInput = new Object();
			var email_check = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i;
			if(!email_check.test(this.kkLoginUsername.value)) {
				loginInput.username = this.kkLoginUsername.value;
            }else {
            	loginInput.emailAddr = this.kkLoginUsername.value;
			}
			loginInput.password = this.kkPassword.value;
			kkEng.loginWithOptions(loginInput, function(result, textStatus, jqXHR) {
				var ret = decodeJson(result,/* alertOnException */false);
				if (ret == null || ret.sessionId == null || ret.sessionId == '') {
					kk.setErrorMessage(kkLoginTileContext.getMsg("login.tile.login.error"));
				} else {
					kk.afterLogin(ret.sessionId);
				}
			}, null, kk.getKKEng());
		}
		return false;
	});

	$('#kk-sign-in-register').off().on('click', function() {
		kk.renderRegisterTile();
		return false;
	});

	$('#kk-forgot-password-link').off().on('click', function() {
		kk.renderForgotPasswordTile();
		return false;
	});

	$('#kk-ext-login-form').submit(function(e) {
		kk.setErrorMessage("");
		kkLoginTileContext.loginType = this.loginType.value;
		var loginInfo = new Object();
		if (this.loginType.value == 'GOOGLEPLUS') {
			loginInfo.moduleClassName = "com.konakart.bl.modules.others.googlepluslogin.GooglePlusLogin";
		} else if (this.loginType.value == 'FACEBOOK') {
			loginInfo.moduleClassName = "com.konakart.bl.modules.others.facebooklogin.FacebookLogin";
		}
		loginInfo.custom1 = this.loginToken.value;
		kkEng.externalLogin(loginInfo, function(result, textStatus, jqXHR) {
			var ret = decodeJson(result,/* alertOnException */false);
			if (ret == null || ret.sessionId == null || ret.sessionId == '') {
				kk.setErrorMessage(kkLoginTileContext.getMsg("login.tile.login.error"));
			} else {
				kk.afterLogin(ret.sessionId);
			}
		}, null, kk.getKKEng());
		return false;
	});

};

/**
 * Called to do activity after a successful login
 */
kk.afterLogin = function(session) {
	kk.setSessionId(session);
	kk.showLogoutLink();
	kk.fetchWishList();
	kk.mergeCarts(session, function() {
		if (kkLoginTileContext.forward == null) {
			kk.renderAccountTile();
		} else {
			kkLoginTileContext.forward();
		}
	});
};

/**
 * Merge carts when a customer logs in
 */
kk.mergeCarts = function(session, callback) {

	// Move basket items to logged in customer
	if (kkCustomerId != null && kkCustomerId < 0) {
		var tmpId = kkCustomerId;
		kkEng.mergeBasketsWithOptions(session, kkCustomerId, kk.getAddToBasketOptions(), function(result, textStatus, jqXHR) {
			// Fetch the cart items
			kk.fetchCart();
			// Remove basket items of temporary customer
			kkEng.removeBasketItemsPerCustomer(null, tmpId, function(result, textStatus, jqXHR) {
				decodeJson(result);
			}, null, kk.getKKEng());
		}, null, kk.getKKEng());
	} else {
		kk.fetchCart();
	}

	if (callback != null) {
		callback();
	}
};

/**
 * Called to do activity after a successful logout
 */
kk.afterLogout = function() {
	kk.setSessionId(null);
	kk.getTempCustomerId();
	kk.hideLogoutLink();
	kk.fetchCart();
	kk.fetchWishList();
	kk.renderLoginTile();
};

/*
 * Forgot Password Tile
 */

/**
 * Define the id of the div for the forgot password tile
 */
kk.setForgotPasswordTileDivId = function(id) {
	kk.getLoginTileTemplateContext();
	kkLoginTileContext.forgotPasswordTileDivId = id;
};

/**
 * Renders the forgot password tile
 */
kk.renderForgotPasswordTile = function() {
	if (kkForgotPasswordTileTemplate == null) {
		kk.getTemplate("forgotPasswordTile", function(t) {
			kkForgotPasswordTileTemplate = t;
			kk.renderForgotPasswordTile();
		});
		return;
	}
	kk.setURL("forgotPassword");
	if (kkLoginTileContext == null || kkLoginTileContext.forgotPasswordTileDivId == null) {
		console.log(kk.getMsg("exception.render.tile", "kk.setForgotPasswordTileDivId", "kk.renderForgotPasswordTile"));
		return;
	}
	var forgotPasswordTile = kkForgotPasswordTileTemplate(kkLoginTileContext);
	kk.emptyBodyArea();
	$("#" + kkLoginTileContext.forgotPasswordTileDivId).html(forgotPasswordTile);
	kk.addForgotPasswordTileEventHandlers();
};

/**
 * Ad event handlers to the forgot password tile
 */
kk.addForgotPasswordTileEventHandlers = function() {
	$('#kk-forgot-pw-send').off().on('click', function() {
		$('#kk-forgot-password-form').submit();
		return false;
	});

	$('#kk-forgot-password-form').submit(function(e) {
		kk.setErrorMessage("");
		var val = $('#kk-forgot-password-form').validate(validationRules).form();
		if (val) {
			var emailAddr = kk.escape(this.kkEmailAddr.value);

			var options = new Object();
			options.countryCode = kk.getLocale().substring(0, 2);
			options.templateName = "EmailNewPassword";
			kkEng.sendNewPassword1(emailAddr, options, function(result, textStatus, jqXHR) {
				var ret = decodeJson(result,/* alertOnException */false, /* returnException */
				true);
				if (ret != null && ret.e != null) {
					kk.setErrorMessage(kk.getMsg("forgot.pw.error.not.found"));
				} else {
					kk.setMessage(kk.getMsg("forgot.pw.sentpw"));
				}
			}, null, kk.getKKEng());
		}
		return false;
	});

	$('#kk-forgot-pw-back').off().on('click', function() {
		kk.renderLoginTile();
		return false;
	});
};
