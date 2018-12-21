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
 * JavaScript used by all form tiles. It contains form validation as well as
 * some other utilities.
 */

/**
 * Sets a global error message for the panel
 */
kk.setErrorMessage = function(msg) {
	$("#kk-error").html(msg);
};

/**
 * Sets a global message for the panel
 */
kk.setMessage = function(msg) {
	$("#kk-message").html(msg);
};
// Set jQuery validation rules
var validationRules = {
	rules : {
		kkGender : {
			required : true
		},
		kkFirstName : {
			required : true,
			minlength : 2,
			maxlength : 32
		},
		kkLastName : {
			required : true,
			minlength : 2,
			maxlength : 32
		},
		kkFirstName1 : {
			required : true,
			minlength : 2,
			maxlength : 32
		},
		kkLastName1 : {
			required : true,
			minlength : 2,
			maxlength : 32
		},
		kkUsername : {
			required : false,
			minlength : 3,
			maxlength : 64
		},
		kkBirthDateString : {
			required : true
		},
		kkLoginUsername : {
			required : true,
			minlength : 3,
			maxlength : 64
		},
		kkEmailAddr : {
			required : true,
			email : true,
			maxlength : 96
		},
		kkEmailAddrOptional : {
			email : true,
			maxlength : 96
		},
		kkCompany : {
			required : false,
			minlength : 2,
			maxlength : 32
		},
		kkTaxId : {
			required : false,
			minlength : 2,
			maxlength : 64
		},
		kkStreetAddress : {
			required : true,
			minlength : 2,
			maxlength : 64
		},
		kkStreetAddress1 : {
			required : false,
			minlength : 2,
			maxlength : 64
		},
		kkSuburb : {
			required : false,
			minlength : 2,
			maxlength : 32
		},
		kkPostcode : {
			required : true,
			minlength : 2,
			maxlength : 10
		},
		kkCity : {
			required : true,
			minlength : 2,
			maxlength : 32
		},
		kkState : {
			required : true,
			maxlength : 32
		},
		kkTelephoneNumber : {
			required : true,
			minlength : 3,
			maxlength : 32
		},
		kkTelephoneNumber1 : {
			required : false,
			minlength : 3,
			maxlength : 32
		},
		kkFaxNumber : {
			required : false,
			minlength : 3,
			maxlength : 32
		},
		kkPassword : {
			required : true,
			minlength : 8,
			maxlength : 40
		},
		kkCurrentPassword : {
			required : true,
			minlength : 8,
			maxlength : 40
		},
		kkPasswordConfirmation : {
			required : true,
			minlength : 8,
			maxlength : 40,
			equalTo : "#kkPassword"
		},
		kkReviewText : {
			required : true,
			maxlength : 10000
		},
		kkRating : {
			required : true
		},
		kkLinkURL : {
			required : false,
			minlength : 2,
			maxlength : 255
		},
		kkEventDateString : {
			required : true
		},
		kkRegistryName : {
			required : true,
			minlength : 2,
			maxlength : 128
		},
		kkCvv : {
			required : true,
			digits : true,
			minlength : 3,
			maxlength : 4
		},
		kkNumber : {
			required : true,
			creditcard : true
		},
		kkOwner : {
			required : true,
			minlength : 2,
			maxlength : 80
		},
		kkExpiryMonth : {
			notExpired : true
		},
		kkPriceFromStr : {
			number : true
		},
		kkPriceToStr : {
			number : true
		},
		kkSearchText : {
			maxlength : 100
		},
		kkCouponCode : {
			maxlength : 40
		},
		kkGiftCertCode : {
			maxlength : 40
		},
		kkOrderComment : {
			maxlength : 512
		},
		kkRewardPoints : {
			maxlength : 40,
			digits : true
		}
	},
	highlight : function(element, errorClass, validClass) {
		var reqElement = $(element).parent().children(".kk-required-icon");
		if (reqElement == null || reqElement.length == 0) {
			reqElement = $(element).parent().parent().children(".kk-required-icon");
		}
		if (reqElement != null) {
			reqElement.removeClass("kk-required-green").addClass("kk-required-blue");
		}
	},
	unhighlight : function(element, errorClass, validClass) {
		var reqElement = $(element).parent().children(".kk-required-icon");
		if (reqElement == null || reqElement.length == 0) {
			reqElement = $(element).parent().parent().children(".kk-required-icon");
		}
		if (reqElement != null) {
			reqElement.removeClass("kk-required-blue").addClass("kk-required-green");
		}
	},
	errorPlacement : function(error, element) {
		var val = error[0].innerHTML;
		if (val.length > 0) {
			var msgElement = element.parent().children(".kk-validation-msg");
			if (msgElement == null || msgElement.length == 0) {
				msgElement = element.parent().parent().children(".kk-validation-msg");
			}
			if (msgElement != null) {
				error.appendTo(msgElement);
			}
		}
	}
};

jQuery.validator.addMethod("kkCountry", function(countryId, element) {
	return this.optional(element) || countryId > -1;
});

jQuery.validator.addMethod("kkState", function(state, element) {
	return this.optional(element) || state != "-1";
});

kk.setValidationMsgs = function() {
	// Set jquery validation messages
	jQuery.validator.messages = {
		kkState : kk.getMsg('form.validate.required'),
		kkCountry : kk.getMsg('form.validate.required'),
		required : kk.getMsg('form.validate.required'),
		creditcard : kk.getMsg('form.validate.creditcard'),
		digits : kk.getMsg('form.validate.digits'),
		maxlength : jQuery.validator.format(kk.getMsg('form.validate.max')),
		minlength : jQuery.validator.format(kk.getMsg('form.validate.min')),
		expirydate : kk.getMsg('form.validate.exp.date'),
		email : kk.getMsg('form.validate.email'),
		url : kk.getMsg('form.validate.url'),
		number : kk.getMsg('form.validate.number'),
		equalTo : kk.getMsg('form.validate.password.match')
	};
};

/**
 * Called when the country is changed in a form
 */
kk.changeCountry = function() {
	var selectedCountryId = $("#kkCountryId").val();
	kkEng.getZonesPerCountry(selectedCountryId, function(result, textStatus, jqXHR) {
		$("#kkStateList option:gt(0)").remove().end();
		var zones = decodeJson(result);
		if (zones != null && zones.length > 0) {
			$("#kk-form-zone-select").show();
			$("#kk-form-zone-input").hide();
			var stateOptions = $("#kkStateList");
			for (var i = 0; i < zones.length; i++) {
				var zone = zones[i];
				stateOptions.append($('<option></option>').val(zone.zoneName).html(zone.zoneName));
			}
		} else {
			$("#kk-form-zone-select").hide();
			$("#kk-form-zone-input").show();
		}
	}, null, kk.getKKEng());
};

/**
 * Escape form input
 */
kk.escape = function(value, def) {
	if (def != null && value == null || value.length == 0) {
		return def;
	}
	return _.escape(value);
};

/**
 * Returns a date object from a string. If the string is empty or null it
 * returns a new Date
 */
kk.getDateFromString = function(dateStr) {
	if (dateStr != null && dateStr.length > 9) {
		// "dd/mm/yyyy"
		var year = dateStr.slice(6, 10);
		var day = dateStr.slice(0, 2);
		var month = dateStr.slice(3, 5) - 1;
		var d = new Date(year, month, day);
		return d;
	} else {
		return new Date();
	}
};

/**
 * Set the validation messages
 */
$(function() {
	kk.setValidationMsgs();
});

