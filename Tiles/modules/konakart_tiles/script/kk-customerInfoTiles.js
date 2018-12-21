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
 * JavaScript for all tiles that manage customer information and addresses that
 * are typically available after login from the my account screen. They are>
 * <ul>
 * <li>manage password tile using the template managePasswordTile.html</li>
 * <li>manage email tile using the template manageEmailTile.html</li>
 * <li>manage personal information tile using the template
 * managePersonalInfoTile.html</li>
 * <li>insert address tile using the template insertAddressTile.html</li>
 * <li>edit address tile using the template editAddressTile.html</li>
 * <li>manage address book tile using the template manageAddressBookTile.htm</li>
 * <li>newsletter subscription tile using the template
 * manageNewsletterTile.html</li>
 * <li>product notification tile using the template
 * productNotificationTile.html</li>
 * </ul>
 */

var kkCustomerInfoTileContext = null;
var kkManagePasswordTileTemplate = null;
var kkManageEmailTileTemplate = null;
var kkManagePersonalInfoTileTemplate = null;
var kkInsertAddressTileTemplate = null;
var kkFirstAddressTileTemplate = null;
var kkEditAddressTileTemplate = null;
var kkManageAddressBookTileTemplate = null;
var kkNewsletterSubscriptionTileTemplate = null;
var kkProductNotificationTileTemplate = null;

/**
 * Returns a fully populated template context for customer information tiles
 */
kk.getCustomerInfoTemplateContext = function() {

	if (kkCustomerInfoTileContext == null) {
		kkCustomerInfoTileContext = kk.getTemplateContext();
		kkCustomerInfoTileContext.countries = null;
		kkCustomerInfoTileContext.zones = null;
		kkCustomerInfoTileContext.customer = null;
		kkCustomerInfoTileContext.addresses = null;
		kkCustomerInfoTileContext.orders = null;
		kkCustomerInfoTileContext.selectedAddr = null;
		kkCustomerInfoTileContext.goToCheckout = false;
		;
	}
	kkCustomerInfoTileContext.control = null;
	return kkCustomerInfoTileContext;
};

/**
 * Define the id of the div for the ManagePassword tile
 */
kk.setManagePasswordTileDivId = function(id) {
	kk.getCustomerInfoTemplateContext();
	kkCustomerInfoTileContext.managePasswordTileDivId = id;
};

/**
 * Define the id of the div for the ManageEmail tile
 */
kk.setManageEmailTileDivId = function(id) {
	kk.getCustomerInfoTemplateContext();
	kkCustomerInfoTileContext.manageEmailTileDivId = id;
};

/**
 * Define the id of the div for the ManagePersonalInfo tile
 */
kk.setManagePersonalInfoTileDivId = function(id) {
	kk.getCustomerInfoTemplateContext();
	kkCustomerInfoTileContext.managePersonalInfoTileDivId = id;
};

/**
 * Define the id of the div for the InsertAddress tile
 */
kk.setInsertAddressTileDivId = function(id) {
	kk.getCustomerInfoTemplateContext();
	kkCustomerInfoTileContext.insertAddressTileDivId = id;
};

/**
 * Define the id of the div for the FirstAddress tile
 */
kk.setFirstAddressTileDivId = function(id) {
	kk.getCustomerInfoTemplateContext();
	kkCustomerInfoTileContext.firstAddressTileDivId = id;
};

/**
 * Define the id of the div for the EditAddress tile
 */
kk.setEditAddressTileDivId = function(id) {
	kk.getCustomerInfoTemplateContext();
	kkCustomerInfoTileContext.editAddressTileDivId = id;
};

/**
 * Define the id of the div for the ManageAddressBook tile
 */
kk.setManageAddressBookTileDivId = function(id) {
	kk.getCustomerInfoTemplateContext();
	kkCustomerInfoTileContext.manageAddressBookTileDivId = id;
};

/**
 * Define the id of the div for the NewsletterSubscription tile
 */
kk.setNewsletterSubscriptionTileDivId = function(id) {
	kk.getCustomerInfoTemplateContext();
	kkCustomerInfoTileContext.newsletterSubscriptionTileDivId = id;
};

/**
 * Define the id of the div for the ProductNotification tile
 */
kk.setProductNotificationTileDivId = function(id) {
	kk.getCustomerInfoTemplateContext();
	kkCustomerInfoTileContext.productNotificationTileDivId = id;
};

/**
 * Render one of the customer information tiles
 */
kk.renderCustomerInfoTile = function(tile, forward) {
	kkCustomerInfoTileContext.forward = forward;
	kk.checkSession(function(customerId) {
		if (kkCustomerInfoTileContext.countries == null) {
			kkEng.getAllCountries(function(result, textStatus, jqXHR) {
				var countries = decodeJson(result);
				kkCustomerInfoTileContext.countries = countries;
				kk.getStatesForDefaultCountry(tile);
			}, null, kk.getKKEng());
		} else {
			kk.getStatesForDefaultCountry(tile);
		}
	});
};

/**
 * Get the states for the default country
 */
kk.getStatesForDefaultCountry = function(tile) {
	var countries = kkCustomerInfoTileContext.countries;
	if (countries != null) {
		var defaultCountryCode = kk.getDefaultCountryCode();
		for (var i = 0; i < countries.length; i++) {
			var country = countries[i];
			if (country.isoCode3 == defaultCountryCode) {
				kkEng.getZonesPerCountry(country.id, function(result, textStatus, jqXHR) {
					var zones = decodeJson(result);
					kkCustomerInfoTileContext.zones = zones;
					kk.renderCustomerInfoTilePrivate(tile);
				}, null, kk.getKKEng());
				break;
			}
		}
	}
};

/**
 * Renders the customer info tile once we have all of the required data
 */
kk.renderCustomerInfoTilePrivate = function(tile) {
	kk.setURL(tile);
	kkCustomerInfoTileContext.customer = kkAccountTileContext.customer;
	kkCustomerInfoTileContext.addresses = kkAccountTileContext.addresses;
	kkCustomerInfoTileContext.orders = kkAccountTileContext.orders;

	var tileHtml = "";
	var divId = "";
	switch (tile) {
	case "managePassword":
		if (kkManagePasswordTileTemplate == null) {
			kk.getTemplate("managePasswordTile", function(t) {
				kkManagePasswordTileTemplate = t;
				kk.renderCustomerInfoTilePrivate(tile);
			});
			return;
		}
		if (kkCustomerInfoTileContext == null || kkCustomerInfoTileContext.managePasswordTileDivId == null) {
			console.log(kk.getMsg("exception.render.tile", "kk.setManagePasswordTileDivId", "kk.renderCustomerInfoTile"));
			return;
		}
		tileHtml = kkManagePasswordTileTemplate(kkCustomerInfoTileContext);
		divId = kkCustomerInfoTileContext.managePasswordTileDivId;
		break;
	case "manageEmail":
		if (kkManageEmailTileTemplate == null) {
			kk.getTemplate("manageEmailTile", function(t) {
				kkManageEmailTileTemplate = t;
				kk.renderCustomerInfoTilePrivate(tile);
			});
			return;
		}
		if (kkCustomerInfoTileContext == null || kkCustomerInfoTileContext.manageEmailTileDivId == null) {
			console.log(kk.getMsg("exception.render.tile", "kk.setManageEmailTileDivId", "kk.renderCustomerInfoTile"));
			return;
		}
		tileHtml = kkManageEmailTileTemplate(kkCustomerInfoTileContext);
		divId = kkCustomerInfoTileContext.manageEmailTileDivId;
		break;
	case "managePersonalInfo":
		if (kkManagePersonalInfoTileTemplate == null) {
			kk.getTemplate("managePersonalInfoTile", function(t) {
				kkManagePersonalInfoTileTemplate = t;
				kk.renderCustomerInfoTilePrivate(tile);
			});
			return;
		}
		if (kkCustomerInfoTileContext == null || kkCustomerInfoTileContext.managePersonalInfoTileDivId == null) {
			console.log(kk.getMsg("exception.render.tile", "kk.setManagePersonalInfoTileDivId", "kk.renderCustomerInfoTile"));
			return;
		}
		tileHtml = kkManagePersonalInfoTileTemplate(kkCustomerInfoTileContext);
		divId = kkCustomerInfoTileContext.managePersonalInfoTileDivId;
		break;
	case "insertAddress":
		if (kkInsertAddressTileTemplate == null) {
			kk.getTemplate("insertAddressTile", function(t) {
				kkInsertAddressTileTemplate = t;
				kk.renderCustomerInfoTilePrivate(tile);
			});
			return;
		}
		if (kkCustomerInfoTileContext == null || kkCustomerInfoTileContext.insertAddressTileDivId == null) {
			console.log(kk.getMsg("exception.render.tile", "kk.setInsertAddressTileDivId", "kk.renderCustomerInfoTile"));
			return;
		}
		tileHtml = kkInsertAddressTileTemplate(kkCustomerInfoTileContext);
		divId = kkCustomerInfoTileContext.insertAddressTileDivId;
		break;
	case "firstAddress":
		if (kkFirstAddressTileTemplate == null) {
			kk.getTemplate("firstAddressTile", function(t) {
				kkFirstAddressTileTemplate = t;
				kk.renderCustomerInfoTilePrivate(tile);
			});
			return;
		}
		if (kkCustomerInfoTileContext == null || kkCustomerInfoTileContext.firstAddressTileDivId == null) {
			console.log(kk.getMsg("exception.render.tile", "kk.setFirstAddressTileDivId", "kk.renderCustomerInfoTile"));
			return;
		}
		tileHtml = kkFirstAddressTileTemplate(kkCustomerInfoTileContext);
		divId = kkCustomerInfoTileContext.firstAddressTileDivId;
		break;
	case "editAddress":
		if (kkEditAddressTileTemplate == null) {
			kk.getTemplate("editAddressTile", function(t) {
				kkEditAddressTileTemplate = t;
				kk.renderCustomerInfoTilePrivate(tile);
			});
			return;
		}
		if (kkCustomerInfoTileContext == null || kkCustomerInfoTileContext.editAddressTileDivId == null) {
			console.log(kk.getMsg("exception.render.tile", "kk.setEditAddressTileDivId", "kk.renderCustomerInfoTile"));
			return;
		}
		tileHtml = kkEditAddressTileTemplate(kkCustomerInfoTileContext);
		divId = kkCustomerInfoTileContext.editAddressTileDivId;
		break;
	case "manageAddressBook":
		if (kkManageAddressBookTileTemplate == null) {
			kk.getTemplate("manageAddressBookTile", function(t) {
				kkManageAddressBookTileTemplate = t;
				kk.renderCustomerInfoTilePrivate(tile);
			});
			return;
		}
		if (kkCustomerInfoTileContext == null || kkCustomerInfoTileContext.manageAddressBookTileDivId == null) {
			console.log(kk.getMsg("exception.render.tile", "kk.setManageAddressBookTileDivId", "kk.renderCustomerInfoTile"));
			return;
		}
		tileHtml = kkManageAddressBookTileTemplate(kkCustomerInfoTileContext);
		divId = kkCustomerInfoTileContext.manageAddressBookTileDivId;
		break;
	case "newsletterSubscription":
		if (kkNewsletterSubscriptionTileTemplate == null) {
			kk.getTemplate("manageNewsletterTile", function(t) {
				kkNewsletterSubscriptionTileTemplate = t;
				kk.renderCustomerInfoTilePrivate(tile);
			});
			return;
		}
		if (kkCustomerInfoTileContext == null || kkCustomerInfoTileContext.newsletterSubscriptionTileDivId == null) {
			console.log(kk.getMsg("exception.render.tile", "kk.setNewsletterSubscriptionTileDivId", "kk.renderCustomerInfoTile"));
			return;
		}
		tileHtml = kkNewsletterSubscriptionTileTemplate(kkCustomerInfoTileContext);
		divId = kkCustomerInfoTileContext.newsletterSubscriptionTileDivId;
		break;
	case "productNotification":
		if (kkProductNotificationTileTemplate == null) {
			kk.getTemplate("productNotificationTile", function(t) {
				kkProductNotificationTileTemplate = t;
				kk.renderCustomerInfoTilePrivate(tile);
			});
			return;
		}
		if (kkCustomerInfoTileContext == null || kkCustomerInfoTileContext.productNotificationTileDivId == null) {
			console.log(kk.getMsg("exception.render.tile", "kk.setProductNotificationTileDivId", "kk.renderCustomerInfoTile"));
			return;
		}
		kkEng.getProductNotificationsPerCustomerWithOptions(kk.getSessionId(), kk.getLangId(), kk.getFetchProdOptions(/* getImages */false),
				function(result, textStatus, jqXHR) {
					var pArray = decodeJson(result);
					kkCustomerInfoTileContext.customer.productNotifications = pArray;
					tileHtml = kkProductNotificationTileTemplate(kkCustomerInfoTileContext);
					divId = kkCustomerInfoTileContext.productNotificationTileDivId;
					kk.renderCustomerInfoTilePrivate1(divId, tileHtml);
				}, null, kk.getKKEng());

		break;
	default:
		alert("Tile with value " + tile + " passed to renderCustomerInfoTile() is not recognized");
		break;
	}

	kk.renderCustomerInfoTilePrivate1(divId, tileHtml);
};

/**
 * Method that actually does the rendering
 */
kk.renderCustomerInfoTilePrivate1 = function(divId, tileHtml) {
	kk.emptyBodyArea();
	$("#" + divId).html(tileHtml);
	kk.addCustomerInfoTileEventHandlers();
};

/**
 * Should be called after rendering the register tile.
 */
kk.addCustomerInfoTileEventHandlers = function(tile) {

	$('#kk-cust-info-back').off().on('click', function() {
		kk.renderAccountTile(/* fetchNewData */false);
		return false;
	});

	$('#kk-insert-address').off().on('click', function() {
		kk.getCustomerInfoTemplateContext();
		kk.renderCustomerInfoTile("insertAddress");
		return false;
	});

	$('#kk-insert-address-submit').off().on('click', function() {
		$('#kk-insert-address-form').submit();
		return false;
	});

	$('#kk-insert-address-form').submit(function() {
		kk.addAddressToCustomer();
		return false;
	});

	$('#kk-insert-first-address-submit').off().on('click', function() {
		$('#kk-insert-first-address-form').submit();
		return false;
	});

	$('#kk-insert-first-address-form').submit(function() {
		kk.insertFirstAddress();
		return false;
	});

	$('.kk-edit-address').off().on('click', function() {
		var addrId = (this.id).split('-')[1];
		kk.getCustomerInfoTemplateContext();
		kk.editAddress(addrId);
		return false;
	});

	$('#kk-edit-address-submit').off().on('click', function() {
		$('#kk-edit-address-form').submit();
		return false;
	});

	$('#kk-edit-address-form').submit(function() {
		kk.editAddressSubmit();
		return false;
	});

	$('.kk-delete-address').off().on('click', function() {
		var addrId = (this.id).split('-')[1];
		kk.deleteAddress(addrId);
		return false;
	});

	$('#kk-back-to-manage-address').off().on('click', function() {
		if (kkCustomerInfoTileContext.control == null) {
			kk.renderCustomerInfoTile("manageAddressBook");
		} else {
			kk.renderOPCTile(/* refresh */true);
		}
		return false;
	});

	$('#kk-manage-personal-info-submit').off().on('click', function() {
		$('#kk-manage-personal-info-form').submit();
		return false;
	});

	$('#kk-manage-personal-info-form').submit(function() {
		kk.editCustomer();
		return false;
	});

	$('#kk-manage-password').off().on('click', function() {
		$('#kk-manage-password-form').submit();
		return false;
	});

	$('#kk-manage-password-form').submit(function() {
		kk.managePassword();
		return false;
	});

	$('#kk-manage-email').off().on('click', function() {
		$('#kk-manage-email-form').submit();
		return false;
	});

	$('#kk-manage-email-form').submit(function() {
		kk.manageEmail();
		return false;
	});

	if (kkCustomerInfoTileContext.zones != null && kkCustomerInfoTileContext.zones.length > 0) {
		$("#kk-form-zone-select").show();
		$("#kk-form-zone-input").hide();
	} else {
		$("#kk-form-zone-select").hide();
		$("#kk-form-zone-input").show();
	}

	$('#kk-newsletter-subscription-submit').off().on('click', function() {
		kk.manageNewsletter();
		return false;
	});

	$('#kk-product-notification-submit').off().on('click', function() {
		kk.manageProductNotifications();
		return false;
	});

};

/**
 * Open the Edit Address Form
 */
kk.editAddress = function(addrId) {
	if (kkCustomerInfoTileContext.countries == null) {
		kkEng.getAllCountries(function(result, textStatus, jqXHR) {
			var countries = decodeJson(result);
			kkCustomerInfoTileContext.countries = countries;
			kk.editAddressAfterFetchingCountries(addrId);
		}, null, kk.getKKEng());
	} else {
		kk.editAddressAfterFetchingCountries(addrId);
	}
};

/**
 * Edit address once we have a list of countries
 */
kk.editAddressAfterFetchingCountries = function(addrId) {
	var addresses = kkCustomerInfoTileContext.addresses;
	for (var i = 0; i < addresses.length; i++) {
		var addr = addresses[i];
		if (addr.id == addrId) {
			kkCustomerInfoTileContext.selectedAddr = addr;
			kkEng.getZonesPerCountry(addr.countryId, function(result, textStatus, jqXHR) {
				var zones = decodeJson(result);
				kkCustomerInfoTileContext.zones = zones;
				kk.renderCustomerInfoTilePrivate("editAddress");
			}, null, kk.getKKEng());
			break;
		}
	}
};

/**
 * Edit the selected address
 */
kk.editAddressSubmit = function(addrId) {
	kk.checkSession(function(customerId) {

		var val = $('#kk-edit-address-form').validate(validationRules).form();
		if (val) {
			var defaultVal = "N/A";
			var addr = new Object();
			addr.id = kkCustomerInfoTileContext.selectedAddr.id;
			addr.city = kk.escape(this.kkCity.value);
			addr.company = kk.escape(this.kkCompany.value);
			addr.countryId = this.kkCountryId.value;
			addr.emailAddr = kk.escape(this.kkEmailAddrOptional.value);
			addr.firstName = kk.escape(this.kkFirstName.value);
			addr.gender = kk.escape($("input[name=kkGender]:checked").val(), "-");
			addr.lastName = kk.escape(this.kkLastName.value);
			addr.postcode = kk.escape(this.kkPostcode.value);
			addr.streetAddress = kk.escape(this.kkStreetAddress.value);
			addr.streetAddress1 = kk.escape(this.kkStreetAddress1.value);
			addr.suburb = kk.escape(this.kkSuburb.value);
			addr.telephoneNumber = kk.escape(this.kkTelephoneNumber.value);
			addr.telephoneNumber1 = kk.escape(this.kkTelephoneNumber1.value);
			addr.customerId = kkCustomerInfoTileContext.customer.id;

			var isPrimary = $("#kkSetAsPrimary").is(':checked');
			addr.isPrimary = isPrimary;

			if ($("#kk-form-zone-select").is(":visible")) {
				addr.state = this.kkStateList.value;
			} else {
				addr.state = kk.escape(this.kkState.value, defaultVal);
			}

			kkEng.editCustomerAddress(kk.getSessionId(), addr, function(result, textStatus, jqXHR) {
				decodeJson(result);
				if (kkCustomerInfoTileContext.control == null || kkCustomerInfoTileContext.control.length == 0) {
					kk.refreshManageAddressTile(kkCustomerInfoTileContext.getMsg('customer.info.addressupdated'), null);
				} else {
					kk.getCustomerInfo(function() {
						if (kkCustomerInfoTileContext.control == "billing") {
							kk.getOPCTileTemplateContext().billingAddrId = addr.id;
							kk.renderOPCTile(/* refresh */true);
						} else if (kkCustomerInfoTileContext.control == "delivery") {
							kk.getOPCTileTemplateContext().deliveryAddrId = addr.id;
							kk.renderOPCTile(/* refresh */true);
						}
					});
				}
			}, null, kk.getKKEng());
		}
	});
};

/**
 * Insert the address for the current customer
 */
kk.addAddressToCustomer = function() {
	kk.checkSession(function(customerId) {

		var val = $('#kk-insert-address-form').validate(validationRules).form();
		if (val) {

			var defaultVal = "N/A";
			var addr = new Object();
			addr.city = kk.escape(this.kkCity.value);
			addr.company = kk.escape(this.kkCompany.value);
			addr.countryId = this.kkCountryId.value;
			addr.emailAddr = kk.escape(this.kkEmailAddrOptional.value);
			addr.firstName = kk.escape(this.kkFirstName.value);
			addr.gender = kk.escape($("input[name=kkGender]:checked").val(), "-");
			addr.lastName = kk.escape(this.kkLastName.value);
			addr.postcode = kk.escape(this.kkPostcode.value);
			addr.streetAddress = kk.escape(this.kkStreetAddress.value);
			addr.streetAddress1 = kk.escape(this.kkStreetAddress1.value);
			addr.suburb = kk.escape(this.kkSuburb.value);
			addr.telephoneNumber = kk.escape(this.kkTelephoneNumber.value);
			addr.telephoneNumber1 = kk.escape(this.kkTelephoneNumber1.value);
			addr.customerId = kkCustomerInfoTileContext.customer.id;

			var isPrimary = $("#kkSetAsPrimary").is(':checked');
			addr.isPrimary = isPrimary;

			if ($("#kk-form-zone-select").is(":visible")) {
				addr.state = this.kkStateList.value;
			} else {
				addr.state = kk.escape(this.kkState.value, defaultVal);
			}

			kkEng.addAddressToCustomer(kk.getSessionId(), addr, function(result, textStatus, jqXHR) {
				var addrId = decodeJson(result);
				if (kkCustomerInfoTileContext.control == null || kkCustomerInfoTileContext.control.length == 0) {
					kk.refreshManageAddressTile(kkCustomerInfoTileContext.getMsg('customer.info.addressupdated'), null);
				} else {
					kk.getCustomerInfo(function() {
						if (kkCustomerInfoTileContext.control == "billing") {
							kk.getOPCTileTemplateContext().billingAddrId = addrId;
							kk.renderOPCTile(/* refresh */true);
						} else if (kkCustomerInfoTileContext.control == "delivery") {
							kk.getOPCTileTemplateContext().deliveryAddrId = addrId;
							kk.renderOPCTile(/* refresh */true);
						}
					});
				}

			}, null, kk.getKKEng());
		}
	});
};

/**
 * Insert the first address for the current customer. This is called when a
 * customer registers using partial information.
 */
kk.insertFirstAddress = function() {
	kk.checkSession(function(customerId) {

		var val = $('#kk-insert-first-address-form').validate(validationRules).form();
		if (val) {
			var defaultVal = "N/A";

			var addr;
			if (kkCustomerInfoTileContext.addresses != null && kkCustomerInfoTileContext.addresses.length > 0) {
				addr = kkCustomerInfoTileContext.addresses[0];
			} else {
				addr = new Object();
			}

			if (kk.isNoGender()) {
				addr.gender = kk.escape($("input[name=kkGender]:checked").val(), "-");
			} else {
				addr.gender = kkCustomerInfoTileContext.customer.gender;
			}

			if (kk.isNoName()) {
				addr.firstName = kk.escape(this.kkFirstName.value);
				addr.lastName = kk.escape(this.kkLastName.value);
			} else {
				addr.firstName = kkCustomerInfoTileContext.customer.firstName;
				addr.lastName = kkCustomerInfoTileContext.customer.lastName;
			}

			addr.city = kk.escape(this.kkCity.value);
			addr.company = kk.escape(this.kkCompany.value);
			addr.countryId = this.kkCountryId.value;
			addr.emailAddr = kk.escape(this.kkEmailAddrOptional.value);
			addr.postcode = kk.escape(this.kkPostcode.value);
			addr.streetAddress = kk.escape(this.kkStreetAddress.value);
			addr.streetAddress1 = kk.escape(this.kkStreetAddress1.value);
			addr.suburb = kk.escape(this.kkSuburb.value);
			addr.telephoneNumber = kk.escape(this.kkTelephoneNumber.value);
			addr.telephoneNumber1 = kk.escape(this.kkTelephoneNumber1.value);
			addr.customerId = kkCustomerInfoTileContext.customer.id;

			if ($("#kk-form-zone-select").is(":visible")) {
				addr.state = this.kkStateList.value;
			} else {
				addr.state = kk.escape(this.kkState.value, defaultVal);
			}

			/*
			 * If the customer never had a name or a gender then we have to add
			 * them to the customer
			 */
			var editCustomer = false;
			if (kk.isNoGender() || kk.isNoName() || kk.isNoTelephone()) {
				editCustomer = true;
				if (kk.isNoGender()) {
					kkCustomerInfoTileContext.customer.gender = addr.gender;
				}
				if (kk.isNoName()) {
					kkCustomerInfoTileContext.customer.firstName = addr.firstName;
					kkCustomerInfoTileContext.customer.lastname = addr.lastName;
				}
				if (kk.isNoTelephone()) {
					kkCustomerInfoTileContext.customer.telephoneNumber = addr.telephoneNumber;
				}
			}

			if (kkCustomerInfoTileContext.addresses != null && kkCustomerInfoTileContext.addresses.length > 0) {
				/* Edit existing address */
				kkEng.editCustomerAddress(kk.getSessionId(), addr, function(result, textStatus, jqXHR) {
					decodeJson(result);
					kk.insertFirstAddress1(editCustomer);
				}, null, kk.getKKEng());
			} else {
				/* Insert address */
				kkEng.addAddressToCustomer(kk.getSessionId(), addr, function(result, textStatus, jqXHR) {
					decodeJson(result);
					kk.insertFirstAddress1(editCustomer);
				}, null, kk.getKKEng());
			}
		}
	});
};

/**
 * Used to avoid code duplication
 */
kk.insertFirstAddress1 = function(editCustomer) {
	if (editCustomer) {
		kkEng.editCustomer(kk.getSessionId(), kkCustomerInfoTileContext.customer, function(result, textStatus, jqXHR) {
			decodeJson(result);
			if (kkCustomerInfoTileContext.forward != null) {
				kk.getCustomerInfo(function() {
					kkCustomerInfoTileContext.forward();
				});
			} else {
				kk.renderAccountTile(/* fetchNewData */true, "");
			}
		}, null, kk.getKKEng());
	} else {
		if (kkCustomerInfoTileContext.forward != null) {
			kk.getCustomerInfo(function() {
				kkCustomerInfoTileContext.forward();
			});
		} else {
			kk.renderAccountTile(/* fetchNewData */true, "");
		}
	}
};

/**
 * Delete the selected address
 */
kk.deleteAddress = function(addrId) {
	kk.checkSession(function(customerId) {
		kkEng.deleteAddressFromCustomer(kk.getSessionId(), addrId, function(result, textStatus, jqXHR) {
			decodeJson(result);
			kk.refreshManageAddressTile(kkCustomerInfoTileContext.getMsg('customer.info.removedok'), null);
		}, null, kk.getKKEng());
	}, null, kk.getKKEng());
};

/**
 * Fetches addresses and refreshes the tile
 */
kk.refreshManageAddressTile = function(msg, error) {
	kk.getCustomerInfo(function() {
		kk.renderCustomerInfoTilePrivate("manageAddressBook");
		if (msg) {
			kk.setMessage(msg);
		}
		if (error) {
			kk.setError(error);
		}
	}, null, kk.getKKEng());
};

/**
 * Edit the customer
 */
kk.editCustomer = function(addrId) {
	kk.checkSession(function(customerId) {

		var val = $('#kk-manage-personal-info-form').validate(validationRules).form();
		if (val) {
			var cust = kkCustomerInfoTileContext.customer;
			cust.gender = kk.escape($("input[name=kkGender]:checked").val(), "-");
			cust.firstName = kk.escape(this.kkFirstName.value);
			cust.lastName = kk.escape(this.kkLastName.value);
			cust.birthDate = kk.getDateFromString(this.kkDatepicker.value);
			cust.telephoneNumber = kk.escape(this.kkTelephoneNumber.value);
			cust.telephoneNumber1 = kk.escape(this.kkTelephoneNumber1.value);
			cust.faxNumber = kk.escape(this.kkFaxNumber.value);
			cust.taxIdentifier = kk.escape(this.kkTaxId.value);
			kkEng.editCustomer(kk.getSessionId(), cust, function(result, textStatus, jqXHR) {
				decodeJson(result);
				kkAccountTileContext.customer = cust;
				kk.renderAccountTile(/* fetchNewData */false, kkCustomerInfoTileContext.getMsg('customer.info.account.success'));
			}, null, kk.getKKEng());
		}
	});
};

/**
 * Change the password
 */
kk.managePassword = function(addrId) {
	kk.checkSession(function(customerId) {

		var val = $('#kk-manage-password-form').validate(validationRules).form();
		if (val) {
			var currentPassword = this.kkCurrentPassword.value;
			var newPassword = this.kkPassword.value;
			kkEng.changePassword(kk.getSessionId(), currentPassword, newPassword, function(result, textStatus, jqXHR) {
				if (result && result.e != null) {
					kk.renderAccountTile(/* fetchNewData */false, null, kkCustomerInfoTileContext.getMsg('customer.info.password.no.match'));
				} else {
					kk.renderAccountTile(/* fetchNewData */false, kkCustomerInfoTileContext.getMsg('customer.info.changepassword.ok'));
				}

			}, null, kk.getKKEng());
		}
	});
};

/**
 * Change the email address
 */
kk.manageEmail = function(addrId) {
	kk.checkSession(function(customerId) {

		var val = $('#kk-manage-email-form').validate(validationRules).form();
		if (val) {
			var email = this.kkEmailAddr.value;
			var password = this.kkPassword.value;
			var username = kk.escape(this.kkUsername.value);
			kkEng.validatePassword(kk.getSessionId(), password, function(result, textStatus, jqXHR) {
				var ret = decodeJson(result);
				if (ret == false) {
					kk.renderAccountTile(/* fetchNewData */false, null, kkCustomerInfoTileContext.getMsg('customer.info.password.no.match'));
				} else {
					var cust = kkCustomerInfoTileContext.customer;
					cust.emailAddr = email;
					cust.username = username;
					var options = new Object();
					options.usernameUnique = true;
					kkEng.editCustomerWithOptions(kk.getSessionId(), cust, options, function(result, textStatus, jqXHR) {
						var ret = decodeJson(result,/*alertOnException*/false, /*returnException*/true);
						if (ret != null && ret.e != null) {
							if (ret.code == 4) { // Duplicate username
								kk.renderAccountTile(/* fetchNewData */false, null, kkCustomerInfoTileContext.getMsg('customer.info.username.exists',cust.username));
							} else if (ret.code == 1) { // Duplicate email
								kk.renderAccountTile(/* fetchNewData */false, null, kkCustomerInfoTileContext.getMsg('customer.info.email.exists',cust.emailAddr));
							} else {
								kk.renderAccountTile(/* fetchNewData */false, null, ret.m);
							}
						} else {
							kkAccountTileContext.customer = cust;
							kk.renderAccountTile(/* fetchNewData */false, kkCustomerInfoTileContext.getMsg('customer.info.editemail.ok'));
						}
					}, null, kk.getKKEng());
				}
			}, null, kk.getKKEng());
		}

	});
};

/**
 * Manage the newsletter subscription
 */
kk.manageNewsletter = function() {
	kk.checkSession(function(customerId) {
		var edit = false;
		var newsletter = $("#kkNewsletter").is(':checked');
		var currentNewsletter = kkCustomerInfoTileContext.customer.newsletter;
		if (newsletter == true && currentNewsletter == 0) {
			kkCustomerInfoTileContext.customer.newsletter = 1;
			edit = true;
		} else if (newsletter == false && currentNewsletter == 1) {
			kkCustomerInfoTileContext.customer.newsletter = 0;
			edit = true;
		}
		if (edit == true) {
			kkEng.editCustomer(kk.getSessionId(), kkAccountTileContext.customer, function(result, textStatus, jqXHR) {
				decodeJson(result);
				kk.renderAccountTile(/* fetchNewData */false, kkCustomerInfoTileContext.getMsg('customer.info.newsletter.success'));
			}, null, kk.getKKEng());
		} else {
			kk.renderAccountTile(/* fetchNewData */false);
		}
	});
};

/**
 * Manage product notifications
 */
kk.manageProductNotifications = function() {
	kk.checkSession(function(customerId) {

		// Figure out whether we need to edit the customer global product
		// notification
		var edit = false;
		var globalNotifier = $("#kkGlobalNotification").is(':checked');
		var currentNotifier = kkCustomerInfoTileContext.customer.globalProdNotifier;
		if (globalNotifier == true && currentNotifier == 0) {
			kkCustomerInfoTileContext.customer.globalProdNotifier = 1;
			edit = true;
		} else if (globalNotifier == false && currentNotifier == 1) {
			kkCustomerInfoTileContext.customer.globalProdNotifier = 0;
			edit = true;
		}

		// Remove individual product notifications if checked
		var syncArray = [];
		$('.kkpn-products').each(function() {
			var prodId = (this.id).split('-')[1];
			var selected = this.checked;
			if (selected == true) {
				syncArray.push("");
				kkEng.deleteProductNotificationFromCustomer(kk.getSessionId(), prodId, function(result, textStatus, jqXHR) {
					syncArray.pop();
					if (syncArray.length == 0) {
						kk.manageProductNotificationsPrivate(edit);
					}
				}, null, kk.getKKEng());
			}
		});
		// If a notification was deleted then this will get called from callback
		if (syncArray.length == 0) {
			kk.manageProductNotificationsPrivate(edit);
		}
	});
};

/**
 * Common code to edit the customer
 */
kk.manageProductNotificationsPrivate = function(edit) {
	if (edit == true) {
		kkEng.editCustomer(kk.getSessionId(), kkAccountTileContext.customer, function(result, textStatus, jqXHR) {
			decodeJson(result);
			kk.renderCustomerInfoTilePrivate("productNotification");
		}, null, kk.getKKEng());
	} else {
		kk.renderCustomerInfoTilePrivate("productNotification");
	}
};
