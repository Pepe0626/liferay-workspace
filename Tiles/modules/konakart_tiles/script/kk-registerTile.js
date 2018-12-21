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
 * JavaScript for the customer registration tile using the template
 * registerTile.html
 */

var kkRegisterTileContext = null;
var kkRegisterTileTemplate = null;

/**
 * Returns a fully populated template context for a register tile
 */
kk.getRegisterTileTemplateContext = function() {

	if (kkRegisterTileContext == null) {
		kkRegisterTileContext = kk.getTemplateContext();
		kkRegisterTileContext.countries = null;
		kkRegisterTileContext.zones = null;
	}
};

/**
 * Define the id of the div for the register tile
 */
kk.setRegisterTileDivId = function(id) {
	kk.getRegisterTileTemplateContext();
	kkRegisterTileContext.registerTileDivId = id;
};

/**
 * Renders the register tile
 */
kk.renderRegisterTile = function() {
	if (kkRegisterTileContext == null || kkRegisterTileContext.registerTileDivId == null) {
		console.log(kk.getMsg("exception.render.tile", "kk.setRegisterTileDivId", "kk.renderRegisterTile"));
		return;
	}
	if (kkRegisterTileContext.countries == null) {
		kkEng.getAllCountries(function(result, textStatus, jqXHR) {
			var countries = decodeJson(result);
			kkRegisterTileContext.countries = countries;
			if (countries != null) {
				var defaultCountryCode = kk.getDefaultCountryCode();
				for (var i = 0; i < countries.length; i++) {
					var country = countries[i];
					if (country.isoCode3 == defaultCountryCode) {
						kkEng.getZonesPerCountry(country.id, function(result, textStatus, jqXHR) {
							var zones = decodeJson(result);
							kkRegisterTileContext.zones = zones;
							kk.renderRegisterTilePrivate();
						}, null, kk.getKKEng());
						break;
					}
				}
			}
		}, null, kk.getKKEng());
	} else {
		kk.renderRegisterTilePrivate();
	}
};

/**
 * Renders the register tile once we have all of the required data
 */
kk.renderRegisterTilePrivate = function() {
	if (kkRegisterTileTemplate == null) {
		kk.getTemplate("registerTile", function(t) {
			kkRegisterTileTemplate = t;
			kk.renderRegisterTilePrivate();
		});
		return;
	}
	kk.setURL("register");
	var registerTile = kkRegisterTileTemplate(kkRegisterTileContext);
	kk.emptyBodyArea();
	$("#" + kkRegisterTileContext.registerTileDivId).html(registerTile);
	kk.addRegisterTileEventHandlers();
};

/**
 * Should be called after rendering the register tile.
 */
kk.addRegisterTileEventHandlers = function() {

	if (kkRegisterTileContext.zones != null && kkRegisterTileContext.zones.length > 0) {
		$("#kk-form-zone-select").show();
		$("#kk-form-zone-input").hide();
	} else {
		$("#kk-form-zone-select").hide();
		$("#kk-form-zone-input").show();
	}

	$('#kk-register').off().on('click', function() {
		$('#kk-register-form').submit();
		return false;
	});

	$('#kk-register-form').submit(function(e) {
		kk.setErrorMessage("");
		var val = $('#kk-register-form').validate(validationRules).form();
		if (val) {
			var defaultVal = "N/A";
			var cr = new Object();
			cr.city = kk.escape(this.kkCity.value);
			cr.company = kk.escape(this.kkCompany.value);
			cr.taxIdentifier = kk.escape(this.kkTaxId.value);
			cr.countryId = this.kkCountryId.value;
			cr.emailAddr = kk.escape(this.kkEmailAddr.value);
			cr.faxNumber = kk.escape(this.kkFaxNumber.value);
			cr.firstName = kk.escape(this.kkFirstName.value);
			cr.gender = kk.escape(this.kkGender.value, "-");
			cr.lastName = kk.escape(this.kkLastName.value);
			cr.username = kk.escape(this.kkUsername.value);
			cr.usernameUnique = true;
			cr.password = this.kkPassword.value;
			cr.postcode = kk.escape(this.kkPostcode.value);
			cr.streetAddress = kk.escape(this.kkStreetAddress.value);
			cr.streetAddress1 = kk.escape(this.kkStreetAddress1.value);
			cr.suburb = kk.escape(this.kkSuburb.value);
			cr.telephoneNumber = kk.escape(this.kkTelephoneNumber.value);
			cr.telephoneNumber1 = kk.escape(this.kkTelephoneNumber1.value);

			if ($("#kk-form-zone-select").is(":visible")) {
				cr.state = this.kkStateList.value;
			} else {
				cr.state = kk.escape(this.kkState.value, defaultVal);
			}

			var newsletter = $("#kkNewsletter").is(':checked');
			if (newsletter == true) {
				cr.newsletter = "1";
			} else {
				cr.newsletter = "0";
			}

			cr.birthDate = kk.getDateFromString(this.kkBirthDateString.value);

			kkEng.registerCustomer(cr, function(result, textStatus, jqXHR) {
				var ret = decodeJson(result,/*alertOnException*/false, /*returnException*/true);
				if (ret != null && ret.e != undefined) {
					kk.setErrorMessage(kkRegisterTileContext.getMsg("register.tile.user.exists"));
					if (ret.code == 4) { // Duplicate username
						kk.setErrorMessage(kkRegisterTileContext.getMsg('customer.info.username.exists',cr.username));
					} else if (ret.code == 1) { // Duplicate email
						kk.setErrorMessage(kkRegisterTileContext.getMsg('customer.info.email.exists',cr.emailAddr));
					} else {
						kk.setErrorMessage(ret.m);
					}
				} else {
					kkEng.login(cr.emailAddr, cr.password, function(result, textStatus, jqXHR) {
						var session = decodeJson(result,/* alertOnException */false);
						if (session == null) {
							kk.setErrorMessage(kkRegisterTileContext.getMsg("register.tile.login.error"));
						} else {
							kk.afterLogin(session);
						}
					}, null, kk.getKKEng());
				}
			}, null, kk.getKKEng());
		}
		return false;
	});

};
