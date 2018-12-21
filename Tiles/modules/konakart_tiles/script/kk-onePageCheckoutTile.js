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
 * JavaScript for the one page checkout tile using the template
 * onePageCheckoutTile.html
 */

var kkopcContext = null;
var kkopcTemplate = null;

/**
 * Returns a fully populated template context for a one page checkout tile
 */
kk.getOPCTileTemplateContext = function(clear) {

	if (kkopcContext == null) {
		kkopcContext = kk.getTemplateContext();
		kkopcContext.checkoutOrder = null;
		kkopcContext.couponCode = "";
		kkopcContext.giftCertCode = "";
	}
	if (clear != null && clear == true) {
		kkopcContext.billingAddrId = -1;
		kkopcContext.deliveryAddrId = -1;
		kkopcContext.selectedShippingCode = null;
		kkopcContext.selectedShippingServiceCode = null;
		kkopcContext.selectedPaymentCode = null;
		kkopcContext.selectedPaymentSubCode = null;
	}

	return kkopcContext;
};

/**
 * Define the id of the div where the one page checkout cart tile will be drawn
 */
kk.setOPCTileDivId = function(id) {
	kk.getOPCTileTemplateContext();
	kkopcContext.opcTileDivId = id;
};

/**
 * Render OPC Tile
 */
kk.renderOPCTile = function(refresh) {
	/*
	 * Redirect if the redirect URL is not null and the current URL doesn't
	 * begin with the redirect URL
	 */
	if (kkCheckoutURL != null && !(window.location.href.lastIndexOf(kkCheckoutURL, 0) === 0)) {
		kk.redirect(kkCheckoutURL);
		return;
	}

	kk.checkSession(function(customerId) {
		if (kk.isNoAddress()) {
			kk.renderCustomerInfoTile("firstAddress", function() {
				// This is called after adding an address
				kk.renderOPCTile();
			});
		} else {
			kk.startLoading();
			if (refresh != null && refresh == true) {
				kk.getOPCTileTemplateContext(/* clear */false);
			} else {
				kk.getOPCTileTemplateContext(/* clear */true);
			}
			if (kkopcContext.customer == null || kkopcContext.addresses == null) {
				kk.getCustomerInfo(function() {
					kk.renderOPCTilePrivate(customerId);
				});
			} else {
				kk.renderOPCTilePrivate(customerId);
			}
		}
	}, function() {
		// This is called after logging in
		kk.renderOPCTile();
	});
};

/**
 * Render OPC Tile once we have fetched the customer and address information
 */
kk.renderOPCTilePrivate = function(customerId) {
	kk.setURL("checkout");

	// Get the basket items
	kkEng.getBasketItemsPerCustomerWithOptions(kk.getSessionId(), customerId, kk.getLangId(), kk.getAddToBasketOptions(), function(result,
			textStatus, jqXHR) {
		var basketItems = decodeJson(result);
		if (basketItems != null && basketItems.length > 0) {
			/*
			 * Create an array of light basket items which we receive back with
			 * the quantity in stock populated
			 */
			var items = kk.createLightBasketItems(basketItems);

			kkEng.updateBasketWithStockInfoWithOptions(items, kk.getAddToBasketOptions(), function(result, textStatus, jqXHR) {
				/*
				 * Add the returned items to a map for easy lookup. Populate the
				 * current items with the quantity in stock and add them to a
				 * new array. The reason for this is that if a product no longer
				 * exists then it isn't returned so the number of basket items
				 * may be reduced. This is where any stock check code should be
				 * added.
				 */
				var retItems = decodeJson(result);
				var retMap = {};
				if (retItems != null) {
					for (var i = 0; i < retItems.length; i++) {
						var b = retItems[i];
						retMap[b.encodedProduct] = b;
					}
				}
				var qtyBasketItems = [];
				for (var i = 0; i < basketItems.length; i++) {
					var item = basketItems[i];
					var retItem = retMap[item.encodedProduct];
					if (retItem != null) {
						item.quantityInStock = retItem.quantityInStock;
						qtyBasketItems.push(item);
					}
				}
				basketItems = qtyBasketItems;

				// Create the checkout order
				kk.createCheckoutOrder(items);
			}, null, kk.getKKEng());
		} else {
			kk.stopLoading();
			kk.renderAccountTile(/* fetchNewData */false, /* successMsg */null,/* failureMsg */kk.getMsg("opc.tile.no.products"));
		}

	}, null, kk.getKKEng());

};

/**
 * Create the checkout order. If we don't have the version of KK, we need to get
 * it because the code changes depending on the version.
 */
kk.createCheckoutOrder = function(basketItems) {
	if (kkVersion == null || kkVersion.length == 0) {
		kkEng.getKonaKartVersion(function(result, textStatus, jqXHR) {
			kkVersion = decodeJson(result);
			kk.createCheckoutOrderPrivate(basketItems);
		}, null, kk.getKKEng());
	} else {
		kk.createCheckoutOrderPrivate(basketItems);
	}
};

/**
 * Create the checkout order
 */
kk.createCheckoutOrderPrivate = function(basketItems) {
	var options = kk.getCreateOrderOptions();
	options.useDefaultCustomer = false;
	options.billingAddrId = kkopcContext.billingAddrId;
	options.customerAddrId = -1;
	options.deliveryAddrId = kkopcContext.deliveryAddrId;

	if (kkVersion != null) {
		var verNumbers = kkVersion.split("\.");
		if (verNumbers.length == 4) {
			if (verNumbers[0] >= 7 && verNumbers[1] >= 4) {
				options.populateAvailableShippingQuotes = true;
				options.populateAvailablePaymentGateways = true;
				options.populateOrderTotals = true;
				options.couponCode = kkopcContext.couponCode;
				options.giftCertCode = kkopcContext.giftCertCode;
				options.shippingModuleCode = kkopcContext.selectedShippingCode;
				options.shippingServiceCode = kkopcContext.selectedShippingServiceCode;
				options.paymentModuleCode = kkopcContext.selectedPaymentCode;
				options.paymentModuleSubCode = kkopcContext.selectedPaymentSubCode;
			}
		} else {
			console.log("KonaKart version " + kkVersion + " is not in the correct format.");
		}
	}

	kkEng.createOrderWithOptions(kk.getSessionId(), basketItems, options, kk.getLangId(), function(result, textStatus, jqXHR) {
		var order = decodeJson(result);
		if (order != null && order != "") {
			if (order.orderTotals == null) {
				/*
				 * This code is run if KK server version is less than 7.4
				 */
				// Add coupon and gift certificate codes
				order.couponCode = kkopcContext.couponCode;
				order.giftCertCode = kkopcContext.giftCertCode;

				options.billingAddrId = order.billingAddrId;
				options.deliveryAddrId = order.deliveryAddrId;

				// Make the message lighter by removing products
				for (var i = 0; i < order.orderProducts.length; i++) {
					var orderProduct = order.orderProducts[i];
					orderProduct.product = null;
				}
				kkopcContext.checkoutOrder = order;

				// Get the shipping quotes
				kkEng.getShippingQuotes(kkopcContext.checkoutOrder, kk.getLangId(), function(result, textStatus, jqXHR) {
					var quotes = decodeJson(result);
					kkopcContext.shippingQuotes = quotes;
					if (quotes && quotes.length > 0) {
						// Pick the first quote
						kkopcContext.checkoutOrder.shippingQuote = quotes[0];
						if (kkopcContext.selectedShippingCode != null && kkopcContext.selectedShippingCode.length > 0) {
							for (var i = 0; i < quotes.length; i++) {
								var quote = quotes[i];
								if (quote.moduleCode == kkopcContext.selectedShippingCode) {
									if (kkopcContext.selectedShippingServiceCode != null && kkopcContext.selectedShippingServiceCode.length > 0) {
										if (quote.shippingServiceCode == kkopcContext.selectedShippingServiceCode) {
											kkopcContext.checkoutOrder.shippingQuote = quote;
											break;
										}
									} else {
										kkopcContext.checkoutOrder.shippingQuote = quote;
										break;
									}
								}
							}
						}
					} else {
						kkopcContext.checkoutOrder.shippingQuote = null;
					}
					// Get the payment details
					kkEng.getPaymentGateways(kkopcContext.checkoutOrder, kk.getLangId(), function(result, textStatus, jqXHR) {
						var paymentDetails = decodeJson(result);
						kkopcContext.paymentDetails = paymentDetails;
						if (kkopcContext.paymentDetails && kkopcContext.paymentDetails.length > 0) {
							if (kkopcContext.selectedPaymentCode != null) {
								for (var i = 0; i < kkopcContext.paymentDetails.length; i++) {
									var pd = kkopcContext.paymentDetails[i];
									if (pd.code == kkopcContext.selectedPaymentCode) {
										kk.addPaymentDetailsToCheckoutOrder(pd);
										break;
									}
								}
							} else {
								/*
								 * Pick first from list
								 */
								kk.addPaymentDetailsToCheckoutOrder(kkopcContext.paymentDetails[0]);
							}
						} else {
							kkopcContext.addPaymentDetailsToCheckoutOrder();
						}
						/*
						 * Get the order totals
						 */
						kkEng.getOrderTotals(kkopcContext.checkoutOrder, kk.getLangId(), function(result, textStatus, jqXHR) {
							kkopcContext.checkoutOrder = decodeJson(result);
							kk.renderOPCTileWithCurrentData();
						}, null, kk.getKKEng());
					}, null, kk.getKKEng());
				}, null, kk.getKKEng());
			} else {
				/*
				 * This code is run if KK server version is 7.4 or above. It
				 * runs much faster that the previous versions.
				 */
				kkopcContext.checkoutOrder = order;
				kkopcContext.shippingQuotes = order.availableShippingQuotes;
				kkopcContext.paymentDetails = order.availablePaymentGateways;
				kk.renderOPCTileWithCurrentData();
			}
		} else {
			console.log("Could not create a checkout order");
			kk.stopLoading();
		}
	}, null, kk.getKKEng());
};

/**
 * Method to add a payment details object to the checkout order
 */
kk.addPaymentDetailsToCheckoutOrder = function(paymentDetails) {
	if (paymentDetails == null) {
		kkopcContext.checkoutOrder.paymentDetails = null;
		kkopcContext.checkoutOrder.paymentMethod = null;
		kkopcContext.checkoutOrder.paymentModuleCode = null;
		kkopcContext.checkoutOrder.paymentModuleSubCode = null;
	} else {
		kkopcContext.checkoutOrder.paymentDetails = paymentDetails;
		kkopcContext.checkoutOrder.paymentMethod = paymentDetails.title;
		kkopcContext.checkoutOrder.paymentModuleCode = paymentDetails.code;
		kkopcContext.checkoutOrder.paymentModuleSubCode = paymentDetails.subCode;
	}
};

/**
 * Called when we have a checkout order, shipping quotes and payment details
 */
kk.renderOPCTileWithCurrentData = function() {

	if (kkopcTemplate == null) {
		kk.getTemplate("onePageCheckoutTile", function(t) {
			kkopcTemplate = t;
			kk.renderOPCTileWithCurrentData();
		});
		return;
	}
	
	// Add images to order products
	if (kkopcContext.checkoutOrder != null && kkopcContext.checkoutOrder.orderProducts != null) {
		for (var i = 0; i < kkopcContext.checkoutOrder.orderProducts.length; i++) {
			var op = kkopcContext.checkoutOrder.orderProducts[i];
			op.prodImage = kk.getProdImageBase(op.product, kkopcContext.imageBase, op.opts) + "_1_tiny" + kk.getProdImageExtension(op.product);		
		}
	}
	
	// Remove addr dialog box otherwise shows old data
	$('body').find("#kkopc-addr-dialog").remove();

	if (kkopcContext == null || kkopcContext.opcTileDivId == null) {
		console.log(kk.getMsg("exception.render.tile", "kk.setOPCTileDivId", "kk.renderOPCTile"));
		return;
	}
	var opcTile = kkopcTemplate(kkopcContext);
	kk.emptyBodyArea();
	$("#" + kkopcContext.opcTileDivId).html(opcTile);
	kk.addOPCTileEventHandlers();
	kk.stopLoading();
};

/**
 * Should be called after rendering the manage cart tile.
 */
kk.addOPCTileEventHandlers = function() {

	$("#kkopc-addr-dialog").dialog({
		autoOpen : false,
		width : "90%",
		modal : "true",
		hide : "blind",
		height : "500",
		overflow : "auto",
		open : function(event, ui) {
			var width = $("#kkopc-addr-dialog").width();
			if (width > 500) {
				$("#kkopc-addr-dialog").dialog("option", "width", 500);
			}
		}
	});

	$("#kkopc-error-dialog").dialog({
		autoOpen : false,
		width : "90%",
		modal : "true",
		hide : "blind"
	});

	$("#kkopc-abdelivery").off().on('click', function() {
		kk.getCustomerInfoTemplateContext().control = "delivery";
		$("#kkopc-addr-dialog").dialog("open");
		return false;
	});

	$("#kkopc-abbilling").off().on('click', function() {
		kk.getCustomerInfoTemplateContext().control = "billing";
		$("#kkopc-addr-dialog").dialog("open");
		return false;
	});

	$("#kkopc-error-dialog-close").off().on('click', function() {
		$("#kkopc-error-dialog").dialog("close");
		return false;
	});

	$("#kkopc-newDelivery").off().on('click', function() {
		kk.getCustomerInfoTemplateContext().control = "delivery";
		kk.renderCustomerInfoTile("insertAddress");
		return false;
	});

	$("#kkopc-editDelivery").off().on('click', function() {
		kk.getCustomerInfoTemplateContext().control = "delivery";
		kk.editAddress(kkopcContext.checkoutOrder.deliveryAddrId);
		return false;
	});

	$("#kkopc-newBilling").off().on('click', function() {
		kk.getCustomerInfoTemplateContext().control = "billing";
		kk.renderCustomerInfoTile("insertAddress");
		return false;
	});

	$("#kkopc-editBilling").off().on('click', function() {
		kk.getCustomerInfoTemplateContext().control = "billing";
		kk.editAddress(kkopcContext.checkoutOrder.billingAddrId);
		return false;
	});

	$(".kkopc-select-addr-button").off().on('click', function() {
		$("#kkopc-addr-dialog").dialog("close");
		var addrId = (this.id).split('-')[1];
		if (kkCustomerInfoTileContext.control == "billing") {
			kk.getOPCTileTemplateContext().billingAddrId = addrId;
			kk.renderOPCTile(/* refresh */true);
		} else if (kkCustomerInfoTileContext.control == "delivery") {
			kk.getOPCTileTemplateContext().deliveryAddrId = addrId;
			kk.renderOPCTile(/* refresh */true);
		}
		return false;
	});

	$("#kkopc-continue-button").off().on('click', function() {
		var val = $('#kk-opc-form').validate(validationRules).form();
		if (val) {
			$(this).removeClass().text("").addClass('kk-button-loading');
			kk.confirmOrder();
		}
		return false;
	});

	$(".kkopc-order-item-link").off().on('click', function() {
		var prodId = (this.id).split('-')[1];
		kk.renderProdDetailTile(prodId);
		return false;
	});

	/*
	 * Coupon and gift certificates
	 */
	var couponCode = null;
	$('#kkCouponCode').keydown(function() {
		var elem = $(this);
		if (couponCode == null) {
			couponCode = elem.val();
		}
	});

	$('#kkCouponCode').keyup(function() {
		var elem = $(this);
		var val = $('#kk-opc-form').validate(validationRules).form();
		if (val == true || elem.val() == "") {
			if (elem.val() != couponCode) {
				$('#kkopc-couponCodeUpdate').show();
			} else {
				$('#kkopc-couponCodeUpdate').hide();
			}
		} else {
			$('#kkopc-couponCodeUpdate').hide();
		}
	});

	var giftCertCode = null;
	$('#kkGiftCertCode').keydown(function() {
		var elem = $(this);
		if (giftCertCode == null) {
			giftCertCode = elem.val();
		}
	});

	$('#kkGiftCertCode').keyup(function() {
		var elem = $(this);
		var val = $('#kk-opc-form').validate(validationRules).form();
		if (val == true || elem.val() == "") {
			if (elem.val() != giftCertCode) {
				$('#kkopc-giftCertCodeUpdate').show();
			} else {
				$('#kkopc-giftCertCodeUpdate').hide();
			}
		} else {
			$('#kkopc-giftCertCodeUpdate').hide();
		}
	});

	$("#kkopc-couponCodeUpdate").off().on('click', function() {
		var val = $("#kkCouponCode").val();
		kk.setCouponCode(val);
		kk.renderOPCTile(/* refresh */true);
		return false;
	});

	$("#kkopc-giftCertCodeUpdate").off().on('click', function() {
		var val = $("#kkGiftCertCode").val();
		kk.setGiftCertificateCode(val);
		kk.renderOPCTile(/* refresh */true);
		return false;
	});
};

/**
 * Save the checkout order when it is confirmed
 */
kk.confirmOrder = function() {
	kk.checkSession(function(customerId) {

		// check the order
		if (kkopcContext.checkoutOrder.paymentDetails == null) {
			kk.opcErrorMessage(kkopcContext.getMsg('opc.tile.error.payment.details'));
			return;
		}

		// Set the locale of the customer
		kkopcContext.checkoutOrder.locale = kk.getLocale();

		// Create an order status history object to attach to order
		var comment = kk.escape($('#kkOrderComment').val());
		var osh = new Object();
		osh.comments = comment;
		var oshArray = [];
		oshArray.push(osh);
		kkopcContext.checkoutOrder.statusTrail = oshArray;

		// Figure out what to do based on type of payment and value of order
		var paymentType = kkopcContext.checkoutOrder.paymentDetails.paymentType;
		var orderTotal = kkopcContext.checkoutOrder.totalIncTax;
		if (orderTotal != null && orderTotal == 0) {

			// Set the order status
			kkopcContext.checkoutOrder.status = KK_PAYMENT_RECEIVED_STATUS;

			// Save the order
			kk.saveOrder(/* sendEmail */true, function(orderId) {
				// Update the inventory
				kkEng.updateInventoryWithOptions(kk.getSessionId(), orderId, kk.getCreateOrderOptions(), function(result, textStatus, jqXHR) {
					decodeJson(result);

					// If we received no exceptions, delete the basket
					kk.emptyCart();

					// Refresh orders and return
					kk.returnToAccountPage();

				}, null, kk.getKKEng());
			});

		} else if (paymentType == KK_COD) {

			// Set the order status
			kkopcContext.checkoutOrder.status = KK_PENDING_STATUS;

			// Set order attributes for the selected payment module
			kk.addPaymentDetailsToCheckoutOrder(kkopcContext.checkoutOrder.paymentDetails);

			// Save the order
			kk.saveOrder(/* sendEmail */true, function(orderId) {
				// Update the inventory
				kkEng.updateInventoryWithOptions(kk.getSessionId(), orderId, kk.getCreateOrderOptions(), function(result, textStatus, jqXHR) {
					decodeJson(result);

					// If we received no exceptions, delete the basket
					kk.emptyCart();

					// Refresh orders and return
					kk.returnToAccountPage();

				}, null, kk.getKKEng());
			});
		} else if (paymentType == KK_BROWSER_PAYMENT_GATEWAY) {
			kk.opcErrorMessage(kkopcContext.getMsg('opc.tile.error.payment.module.not.implemented'));
		} else if (paymentType == KK_BROWSER_IN_FRAME_PAYMENT_GATEWAY) {
			kk.opcErrorMessage(kkopcContext.getMsg('opc.tile.error.payment.module.not.implemented'));
		} else if (paymentType == KK_SERVER_PAYMENT_GATEWAY) {
			/**
			 * This is an example of how to use the standard KonaKart storefront
			 * code for managing the payment gateway. It works for payment
			 * gateways such as Authorize.net AIM. The action class called is
			 * CheckoutServerPaymentAction.java which has been slightly modified
			 * in KonaKart version 7.4.0.0 so that it will accept a sessionId
			 * and orderId parameter (note that they should be sent using
			 * HTTPS). The action class uses the sessionId to log the customer
			 * into the kkAppEng and looks up the order using the orderId. It
			 * then calls the KK engine to get a populated payment details
			 * object for the payment gateway defined by the paymentModuleCode
			 * attribute saved on the order.
			 * <p>
			 * Once the payment process has terminated you should modify the
			 * storefront code to redirect back to whatever page you'd like your
			 * customer to go to.
			 */
			// Set the order status
			kkopcContext.checkoutOrder.status = KK_WAITING_PAYMENT_STATUS;

			// Set order attributes for the selected payment module
			kk.addPaymentDetailsToCheckoutOrder(kkopcContext.checkoutOrder.paymentDetails);

			// Save the order
			kk.saveOrder(/* sendEmail */false, function(orderId) {
				// Call the KK standard storefront (should be HTTPS)
				kk.redirect(kkRoot + "CheckoutServerPayment.action?orderId=" + orderId + "&sessionId=" + kk.getSessionId());
			});
		}
	}, function() {
		// This is called after logging in
		kk.renderOPCTile();
	});
};

/**
 * Save the order in the database. An email is only sent if globally enabled in
 * kk-configure.js (kkSendOrderConfirmationMail == true) and the sendEmail
 * parameter is set to true.
 */
kk.saveOrder = function(sendEmail, callback) {

	/*
	 * Set the status on the OrderStatusHistory object in the StatusTrail array.
	 * There should only be one object in the array at this point.
	 */
	if (kkopcContext.checkoutOrder.statusTrail != null && kkopcContext.checkoutOrder.statusTrail.length > 0) {
		kkopcContext.checkoutOrder.statusTrail[0].orderStatusId = kkopcContext.checkoutOrder.status;
	}

	/*
	 * Set the customer notification attribute on the OrderStatusHistory object
	 * in the StatusTrail array. There should only be one object in the array at
	 * this point.
	 */
	if (kkSendOrderConfirmationMail == true) {
		kkopcContext.checkoutOrder.statusTrail[0].customerNotified = true;
	} else {
		kkopcContext.checkoutOrder.statusTrail[0].customerNotified = false;
	}

	// Remove product objects from each order product to reduce traffic
	for (var i = 0; i < kkopcContext.checkoutOrder.orderProducts.length; i++) {
		var op = kkopcContext.checkoutOrder.orderProducts[i];
		op.product = null;
	}

	for (var i = 0; i < kkopcContext.checkoutOrder.orderTotals.length; i++) {
		var ot = kkopcContext.checkoutOrder.orderTotals[i];
		ot.promotions = null;
	}

	// Now we can save the order
	kkEng.saveOrder(kk.getSessionId(), kkopcContext.checkoutOrder, kk.getLangId(), function(result, textStatus, jqXHR) {
		var orderId = decodeJson(result);
		kkopcContext.checkoutOrder.orderId = orderId;
		// Global and parameter and local parameter both need to be true
		if (kkSendOrderConfirmationMail == true && sendEmail == true) {
			kk.sendOrderConfirmationEmail(orderId);
		}
		if (callback != null) {
			callback(orderId);
		}
	}, null, kk.getKKEng());
};

/**
 * Refresh the orders, digital downloads and return to the account page
 */
kk.returnToAccountPage = function() {
	// Refresh the orders
	var dataDesc = new Object();
	dataDesc.offset = 0;
	dataDesc.limit = 3;
	kkEng.getOrdersPerCustomer(dataDesc, kk.getSessionId(), kk.getLangId(), function(result, textStatus, jqXHR) {
		var orders = decodeJson(result);
		kkAccountTileContext.orders = orders.orderArray;
		var successMsg = kkopcContext.getMsg("opc.tile.order.success");
		kk.getDigitalDownloads(function() {
			kk.renderAccountTile(/* fetchNewData */false, successMsg, /* failureMsg */null);
		});
	}, null, kk.getKKEng());
};

/**
 * Send the order confirmation mail
 */
kk.sendOrderConfirmationEmail = function(orderId) {

	var options = new Object();

	if (options.countryCode == null) {
		options.countryCode = kk.getLocale().substring(0, 2);
	}
	if (options.templateName == null) {
		options.templateName = "OrderConfReceived";
	}

	kkEng.sendOrderConfirmationEmail1(kk.getSessionId(), orderId, kk.getLangId(), options, function(result, textStatus, jqXHR) {
		decodeJson(result);
	}, null, kk.getKKEng());

};

/**
 * Shipping method changed on one page checkout page
 */
kk.shippingRefresh = function() {
	var code = $("#kkopc-shippingQuotes").val();
	var codeArray = code.split("~~");
	if (codeArray.length == 1) {
		kkopcContext.selectedShippingCode = codeArray[0];
	} else if (codeArray.length == 2) {
		kkopcContext.selectedShippingCode = codeArray[0];
		kkopcContext.selectedShippingServiceCode = codeArray[1];
	}
	kk.renderOPCTile(/* refresh */true);
};

/**
 * Payment method changed on one page checkout page
 */
kk.paymentRefresh = function() {
	var code = $("#kkopc-paymentDetails").val();
	var codeArray = code.split("~~");
	if (codeArray.length == 1) {
		kkopcContext.selectedPaymentCode = codeArray[0];
	} else if (codeArray.length == 2) {
		kkopcContext.selectedPaymentCode = codeArray[0];
		kkopcContext.selectedPaymentSubCode = codeArray[1];
	}
	kk.renderOPCTile(/* refresh */true);
};

/**
 * Open up a popup window with an error message
 */
kk.opcErrorMessage = function(msg) {
	$("kkopc-error-msg").text((msg == null) ? "" : msg);
	$("#kkopc-error-dialog").dialog("open");
};
