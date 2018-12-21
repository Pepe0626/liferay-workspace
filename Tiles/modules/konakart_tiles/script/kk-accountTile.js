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
 * JavaScript for the account tile using template accountTile.html
 */

var kkAccountTileContext = null;
var kkAccountTileTemplate = null;

/**
 * Returns a fully populated template context for an account tile
 */
kk.getAccountTileTemplateContext = function() {
	if (kkAccountTileContext == null) {
		kkAccountTileContext = kk.getTemplateContext();
		kkAccountTileContext.customer = null;
		kkAccountTileContext.addresses = null;
		kkAccountTileContext.orders = null;
		kkAccountTileContext.downloads = null;
		kkAccountTileContext.loginType = null;
	}
	if (kkLoginTileContext != null) {
		kkAccountTileContext.loginType = kkLoginTileContext.loginType;
	}
};

/**
 * Define the id of the div for the account tile
 */
kk.setAccountTileDivId = function(id) {
	kk.getAccountTileTemplateContext();
	kkAccountTileContext.accountTileDivId = id;
};

/**
 * Renders the account tile
 */
kk.renderAccountTile = function(fetchNewData, successMsg, failureMsg) {
	kk.checkSession(function(customerId) {
		if (fetchNewData != null && fetchNewData == false && kkAccountTileContext.customer != null && kkAccountTileContext.addresses != null) {
			// Render the tile without fetching customer data
			kk.renderAccountTilePrivate(successMsg, failureMsg);
		} else {
			/*
			 * Get the customer and addresses, then get the orders and finally
			 * render the account tile
			 */
			kk.getCustomerInfo(function() {
				kk.getCustomerOrdersPrivate(successMsg, failureMsg);
			});
		}
	});
};

/**
 * Fetches the customer and addresses and populates the context
 */
kk.getCustomerInfo = function(callback) {
	kk.getAccountTileTemplateContext();
	kkEng.getCustomer(kk.getSessionId(), function(result, textStatus, jqXHR) {
		kkAccountTileContext.customer = decodeJson(result);
		if (kkAccountTileContext.customer == null) {
			console.log("Customer not found for session id - "+kk.getSessionId());
			return;
		}
		// Get the customer addresses
		kkEng.getAddressesPerCustomer(kk.getSessionId(), function(result, textStatus, jqXHR) {
			kkAccountTileContext.addresses = decodeJson(result);
			kk.setCustomerInfoOnContexts();
			kk.getDigitalDownloads(callback);
		}, null, kk.getKKEng());
	}, null, kk.getKKEng());
};

/**
 * Fetches the digital downloads for the customer
 */
kk.getDigitalDownloads = function(callback) {
	if (kkVersion == null || kkVersion.length == 0) {
		kkEng.getKonaKartVersion(function(result, textStatus, jqXHR) {
			kkVersion = decodeJson(result);
			kk.getDigitalDownloadsPrivate(callback);
		}, null, kk.getKKEng());
	} else {
		kk.getDigitalDownloadsPrivate(callback);
	}
};

/**
 * Called after knowing the engine version. If the version is greater than or
 * equal to 7.4 then we call getDigitalDownloadsWithOptions() which
 * automatically populates the digital downloads with products
 */
kk.getDigitalDownloadsPrivate = function(callback) {

	if (kkVersion != null) {
		var verNumbers = kkVersion.split("\.");
		if (verNumbers.length == 4) {
			if (verNumbers[0] >= 7 && verNumbers[1] >= 4) {
				var ddOptions = new Object();
				ddOptions.populateProducts = true;
				kkEng.getDigitalDownloadsWithOptions(kk.getSessionId(), kk.getLangId(), ddOptions, kk.getFetchProdOptions(/* getImages */false),
						function(result, textStatus, jqXHR) {
							var dds = decodeJson(result);
							kkAccountTileContext.downloads = dds;
							if (callback != null) {
								callback();
							}
						}, null, kk.getKKEng());
				return;
			}
		} else {
			console.log("KonaKart version " + kkVersion + " is not in the correct format.");
		}
	}

	kkEng.getDigitalDownloads(kk.getSessionId(), function(result, textStatus, jqXHR) {
		var dds = decodeJson(result);
		kkAccountTileContext.downloads = dds;
		if (dds == null || dds.length == 0) {
			if (callback != null) {
				callback();
			}
		} else {
			// Get products for dds
			var dataDesc = new DataDescriptor();
			dataDesc.limit = 1000;
			dataDesc.offset = 0;

			var prodIds = [];
			for (var i = 0; i < dds.length; i++) {
				var dd = dds[i];
				prodIds.push(dd.productId);
			}
			kkEng.getProductsFromIdsWithOptions(kk.getSessionId(), dataDesc, prodIds, kk.getLangId(), kk.getFetchProdOptions(/* getImages */false),
					function(result, textStatus, jqXHR) {
						var prods = decodeJson(result);
						if (prods != null && prods.length > 0) {
							for (var i = 0; i < prods.length; i++) {
								var prod = prods[i];
								for (var j = 0; j < dds.length; j++) {
									var dd = dds[j];
									if (dd.productId == prod.id) {
										dd.product = prod;
										break;
									}
								}
							}
							if (callback != null) {
								callback();
							}
						} else {
							if (callback != null) {
								callback();
							}
						}
					}, null, kk.getKKEng());
		}
	}, null, kk.getKKEng());
};

/**
 * Ensure that all the contexts are updated
 */
kk.setCustomerInfoOnContexts = function() {
	kk.getCustomerInfoTemplateContext();
	kkCustomerInfoTileContext.addresses = kkAccountTileContext.addresses;
	kkCustomerInfoTileContext.customer = kkAccountTileContext.customer;

	kk.getOPCTileTemplateContext();
	kkopcContext.addresses = kkAccountTileContext.addresses;
	kkopcContext.customer = kkAccountTileContext.customer;
};

/**
 * Gets the customer orders and then renders the account tile
 */
kk.getCustomerOrdersPrivate = function(successMsg, failureMsg) {
	// Get the customer's recent orders
	var dataDesc = new Object();
	dataDesc.offset = 0;
	dataDesc.limit = 3;
	kkEng.getOrdersPerCustomer(dataDesc, kk.getSessionId(), kk.getLangId(), function(result, textStatus, jqXHR) {
		var orders = decodeJson(result);
		kkAccountTileContext.orders = orders.orderArray;
		kk.renderAccountTilePrivate(successMsg, failureMsg);
	}, null, kk.getKKEng());
};

/**
 * Renders the account tile once we have all of the required data
 */
kk.renderAccountTilePrivate = function(successMsg, failureMsg) {
	if (kkAccountTileTemplate == null) {
		kk.getTemplate("accountTile", function(t) {
			kkAccountTileTemplate = t;
			kk.renderAccountTilePrivate(successMsg, failureMsg);
		});
		return;
	}
	kk.setURL("account");
	if (kkAccountTileContext == null || kkAccountTileContext.accountTileDivId == null) {
		console.log(kk.getMsg("exception.render.tile", "kk.setAccountTileDivId", "kk.renderAccountTile"));
		return;
	}
	var accountTile = kkAccountTileTemplate(kkAccountTileContext);
	kk.emptyBodyArea();
	$("#" + kkAccountTileContext.accountTileDivId).html(accountTile);
	kk.addAccountTileEventHandlers();
	if (successMsg) {
		kk.setMessage(successMsg);
	}
	if (failureMsg) {
		kk.setErrorMessage(failureMsg);
	}
};

/**
 * Should be called after rendering the account tile.
 */
kk.addAccountTileEventHandlers = function() {

	$('#kk-first-addr').off().on('click', function() {
		kk.renderCustomerInfoTile("firstAddress");
		return false;
	});

	$('#kk-manage-email').off().on('click', function() {
		kk.renderCustomerInfoTile("manageEmail");
		return false;
	});

	$('#kk-manage-password').off().on('click', function() {
		kk.renderCustomerInfoTile("managePassword");
		return false;
	});

	$('#kk-manage-personal-info').off().on('click', function() {
		kk.renderCustomerInfoTile("managePersonalInfo");
		return false;
	});

	$('#kk-manage-address-book').off().on('click', function() {
		kk.renderCustomerInfoTile("manageAddressBook");
		return false;
	});

	$('#kk-manage-newsletter').off().on('click', function() {
		kk.renderCustomerInfoTile("newsletterSubscription");
		return false;
	});

	$('#kk-manage-notifications').off().on('click', function() {
		kk.renderCustomerInfoTile("productNotification");
		return false;
	});

	$(".kkat-order-item-link").off().on('click', function() {
		var prodId = (this.id).split('-')[1];
		kk.renderProdDetailTile(prodId);
		return false;
	});

	$(".kkat-view-order").off().on('click', function() {
		var orderId = (this.id).split('-')[1];
		kk.renderOrderDetailTile(orderId);
		return false;
	});

	$(".kkat-repeat-order").off().on('click', function() {
		var orderId = (this.id).split('-')[1];
		kk.repeatOrder(orderId);
		return false;
	});

	$(".kkat-track-order").off().on('click', function() {
		var orderId = (this.id).split('-')[1];
		console.log("Order tracking for order id = " + orderId);
		return false;
	});

	$(".kkat-invoice-order").off().on('click', function() {
		var orderId = (this.id).split('-')[1];
		kk.downloadOrderInvoice(orderId);
		return false;
	});

	$("#kkat-all-orders").off().on('click', function() {
		kk.fetchAndRenderOrders();
		return false;
	});

	$(".kkat-download").off().on('click', function() {
		var ddId = (this.id).split('-')[1];
		kk.downloadProduct(ddId);
		return false;
	});

	$('#kkSendPasswordForm').submit(function(e) {
		var emailAddr = this.kkEmailAddr.value;
		var options = new Object();
		options.countryCode = kk.getLocale().substring(0, 2);
		options.templateName = KK_NEW_PASSWORD_TEMPLATE;
		kkEng.sendNewPassword1(emailAddr, options, function(result, textStatus, jqXHR) {
			decodeJson(result);
		}, null, kk.getKKEng());
		return false;
	});

};

/**
 * Called to download a digital product. It uses functionality present in the
 * standard KonaKart struts / JSP storefront application. If that isn't running,
 * you will need to implement similar functionality in a servlet.
 */
kk.downloadProduct = function(ddId) {
	kk.checkSession(function(customerId) {
		kkEng.getDigitalDownloadById(kk.getSessionId(), ddId, function(result, textStatus, jqXHR) {
			var dd = decodeJson(result);
			if (dd == null || dd.length == 0) {
				kk.getDigitalDownloads(function() {
					kk.renderAccountTile(/* fetchNewData */false);
				});
				return;
			}

			// Perform download from a hidden frame
			var iframe = kk.getHiddenIframe();
			iframe.src = kkRoot + "DigitalDownloadExt.action?ddId=" + ddId + "&sessionId=" + kk.getSessionId();

			setTimeout(function() {
				kk.refreshDigitalDownloads(ddId, dd.timesDownloaded + 1, 0);
			}, 2000);

		}, null, kk.getKKEng());
	});
};

/**
 * Called to refresh the digital downloads on the screen after an asynchronous
 * download. We may have to call this a few times.
 */
kk.refreshDigitalDownloads = function(ddId, expectedCount, loopCount) {

	kk.getDigitalDownloads(function() {
		var dds = kkAccountTileContext.downloads;
		if (dds == null || dds.length == 0) {
			kk.renderAccountTile(/* fetchNewData */false);
			return;
		}
		var found = false;
		for (var i = 0; i < dds.length; i++) {
			var dd = dds[i];
			if (dd.id == ddId) {
				found = true;
				if (dd.timesDownloaded == expectedCount) {
					kk.renderAccountTile(/* fetchNewData */false);
					return;
				}
				break;
			}
		}
		if (found == false) {
			kk.renderAccountTile(/* fetchNewData */false);
			return;
		}
		loopCount++;
		if (loopCount == 5) {
			kk.renderAccountTile(/* fetchNewData */false);
			return;
		} else {
			setTimeout(function() {
				kk.refreshDigitalDownloads(ddId, expectedCount, loopCount);
			}, 2000);
		}
	});

};

/**
 * Returns true if no customer address has been added
 */
kk.isNoAddress = function() {
	if (kkAccountTileContext.addresses == null || kkAccountTileContext.addresses.length == 0) {
		return true;
	}
	var addr = kkAccountTileContext.addresses[0];
	if (addr.city.length < 2 && addr.streetAddress.length < 2) {
		return true;
	}
	return false;
};

/**
 * Returns true if no customer name has been added
 */
kk.isNoName = function() {
	if (kkAccountTileContext.customer == null) {
		return true;
	}
	if (kkAccountTileContext.customer.firstName != null && kkAccountTileContext.customer.firstName.length > 1
			&& kkAccountTileContext.customer.lastName != null && kkAccountTileContext.customer.lastName.length > 1) {
		return false;
	}
	return true;
};

/**
 * Returns true if no customer birth date has been added
 */
kk.isNoBirthdate = function() {
	if (kkAccountTileContext.customer == null) {
		return true;
	}
	if (kkAccountTileContext.customer.birthDate != null && kkAccountTileContext.customer.birthDate.length > 1) {
		var d = new Date(kkAccountTileContext.customer.birthDate);
		if (d.getFullYear() == KK_DEFAULT_DOB_YEAR) {
			return true;
		}
		return false;
	}
	return true;
};

/**
 * Returns true if no customer telephone has been added
 */
kk.isNoTelephone = function() {
	if (kkAccountTileContext.customer == null) {
		return true;
	}
	if (kkAccountTileContext.customer.telephoneNumber != null && kkAccountTileContext.customer.telephoneNumber.length > 1) {
		return false;
	}
	return true;
};

/**
 * Returns true if no customer gender has been added
 */
kk.isNoGender = function() {
	if (kkAccountTileContext.customer == null) {
		return true;
	}
	if (kkAccountTileContext.customer.gender != null && kkAccountTileContext.customer.gender == KK_DEFAULT_STRING) {
		return true;
	}
	return false;
};
