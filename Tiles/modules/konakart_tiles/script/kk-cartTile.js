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
 * JavaScript for popup and manage cart tiles.
 * <ul>
 * <li>popup cart tile using the template popupCartTile.html</li>
 * <li>manage cart tile using the template manageCartTile.html</li>
 * </ul>
 */

var kkctContext = null;
var kkpctTemplate = null;
var kkmctTemplate = null;

/**
 * RemoveFromCart
 */
kk.removeFromCart = function(itemId) {
	kk.getCustomerId(function(customerId) {
		var item = new Basket();
		item.id = itemId;
		kkEng.removeFromBasket(kk.getSessionId(), customerId, item, function() {
			kk.refreshManageCartTile();
		}, null, kk.getKKEng());
	});
};

/**
 * EmptyCart
 */
kk.emptyCart = function() {
	kk.getCustomerId(function(customerId) {
		kkEng.removeBasketItemsPerCustomer(kk.getSessionId(), 0, function() {
			kk.fetchCart();
		}, null, kk.getKKEng());
	});
};

/**
 * Update the cart items
 */
kk.updateCart = function(itemId, quantity) {
	kk.getCustomerId(function(customerId) {
		var item = new Basket();
		item.id = itemId;
		item.quantity = quantity;
		kkEng.updateBasketWithOptions(kk.getSessionId(), customerId, item, kk.getAddToBasketOptions(), function() {
			kk.refreshManageCartTile();
		}, null, kk.getKKEng());
	});
};

/**
 * Add a product to the cart
 */
kk.addToCart = function(prodId, opts, quantity) {
	kk.getCustomerId(function(customerId) {
		var b = new Basket();
		b.quantity = quantity;
		b.opts = opts;
		b.productId = prodId;

		kkEng.addToBasketWithOptions(kk.getSessionId(), customerId, b, kk.getAddToBasketOptions(), function(result, textStatus, jqXHR) {
			decodeJson(result);
			var displayOptions = new Object();
			displayOptions.displayPopup = true;
			displayOptions.manageCart = false;
			kkEng.getBasketItemsPerCustomerWithOptions(kk.getSessionId(), customerId, kk.getLangId(), kk.getAddToBasketOptions(), KKGetBasketItemsPerCustomerCallback, displayOptions, kk
					.getKKEng());
		}, null, kk.getKKEng());
	});
};

/**
 * Fetch the cart items.
 */
kk.fetchCart = function() {
	kk.getCustomerId(function(customerId) {
		var displayOptions = new Object();
		displayOptions.displayPopup = false;
		displayOptions.manageCart = false;
		kkEng.getBasketItemsPerCustomerWithOptions(kk.getSessionId(), customerId, kk.getLangId(), kk.getAddToBasketOptions(), KKGetBasketItemsPerCustomerCallback, displayOptions, kk
				.getKKEng());
	});
};

/**
 * Fetch cart items and render the manage cart tile
 */
kk.refreshManageCartTile = function() {
	kk.getCustomerId(function(customerId) {
		var displayOptions = new Object();
		displayOptions.displayPopup = false;
		displayOptions.manageCart = true;
		kkEng.getBasketItemsPerCustomerWithOptions(kk.getSessionId(), customerId, kk.getLangId(), kk.getAddToBasketOptions(), KKGetBasketItemsPerCustomerCallback, displayOptions, kk
				.getKKEng());
	});
};

/**
 * Callback to retrieve the basket items
 */
var KKGetBasketItemsPerCustomerCallback = function(result, textStatus, jqXHR) {

	if (kkctContext == null) {
		return;
	}
	var basketItems = decodeJson(result);
	var total = 0;
	var numItems = 0;
	kkctContext.basketItems = basketItems;
	if (basketItems != null) {
		for (var i = 0; i < basketItems.length; i++) {
			var item = basketItems[i];
			item.prodImage = kk.getProdImageBase(item.product, kkctContext.imageBase, item.opts) + "_1_tiny" + kk.getProdImageExtension(item.product);
			if (kk.isDisplayPriceWithTax()) {
				total = total + item.finalPriceIncTax;
			} else {
				total = total + item.finalPriceExTax;
			}
			numItems += item.quantity;
		}
	}
	kkctContext.basketTotal = total;
	kkctContext.numItems = numItems;

	if (kkctContext.popupCartTileDivId != null) {
		kk.renderPopupCartTile();
	}

	/*
	 * Display cart to show that something has been added
	 */
	if (this.displayPopup) {
		showCart("#kkpct-shopping-cart");
		window.setTimeout("hideCart('#kkpct-shopping-cart')", 2000);
	}

	/*
	 * Display the manage cart panel
	 */
	if (this.manageCart) {
		kk.renderManageCartTile();
	}

};

/**
 * Code to display the slide out cart
 */
function showCart(cart) {
	$(cart).addClass("kk-small-rounded-corners-top kkpct-shopping-cart-mouseover");
	$("#kkpct-shopping-cart-container").css("display", "inline");
}

/**
 * Code to hide the slide out cart
 */
function hideCart(cart) {
	$("#kkpct-shopping-cart-container").hide();
	$(cart).removeClass("kkpct-shopping-cart-mouseover kk-small-rounded-corners-top");
}

/**
 * Returns a fully populated template context for a cart tiles
 */
kk.getCartTileTemplateContext = function() {

	if (kkctContext == null) {
		kkctContext = kk.getTemplateContext();
		kkctContext.checkoutOrder = null;
		kkctContext.couponCode = "";
		kkctContext.giftCertCode = "";
	}
};

/**
 * Define the id of the div where the popup cart tile will be drawn
 */
kk.setPopupCartTileDivId = function(id) {
	kk.getCartTileTemplateContext();
	kkctContext.popupCartTileDivId = id;
};

/**
 * Define the id of the div where the manage cart tile will be drawn
 */
kk.setManageCartTileDivId = function(id) {
	kk.getCartTileTemplateContext();
	kkctContext.manageCartTileDivId = id;
};

/**
 * Render a popup cart tile
 */
kk.renderPopupCartTile = function() {

	if (kkpctTemplate == null) {
		kk.getTemplate("popupCartTile", function(t) {
			kkpctTemplate = t;
			kk.renderPopupCartTile();
		});
		return;
	}
	if (kkctContext == null || kkctContext.popupCartTileDivId == null) {
		console.log(kk.getMsg("exception.render.tile", "kk.setPopupCartTileDivId", "kk.renderPopupCartTile"));
		return;
	}
	var popupCartTile = kkpctTemplate(kkctContext);
	$("#" + kkctContext.popupCartTileDivId).html(popupCartTile);
	kk.addPopupCartTileEventHandlers();
};

/**
 * Should be called after rendering the popup tile.
 */
kk.addPopupCartTileEventHandlers = function() {

	/*
	 * Hover effects for Sliding Cart
	 */
	var cartHover = 0;
	$("#kkpct-shopping-cart").hover(function() {
		// in
		cartHover = 1;
		showCart("#kkpct-shopping-cart");
	}, function() {
		// out
		setTimeout(function() {
			if (cartHover != 2) {
				cartHover = 0;
				hideCart("#kkpct-shopping-cart");
			}
		}, 500);
	});
	$("#kkpct-shopping-cart-container").hover(function() {
		// in
		cartHover = 2;
		showCart("#kkpct-shopping-cart");
	}, function() {
		// out
		cartHover = 0;
		hideCart("#kkpct-shopping-cart");
	});

	$(".kkpct-cart-item-image").off().on('click', function() {
		var prodId = (this.id).split('-')[1];
		kk.kkctShowProductDetails(prodId);
		return false;
	});

	$(".kkpct-shopping-cart-item-title").off().on('click', function() {
		var prodId = (this.id).split('-')[1];
		kk.kkctShowProductDetails(prodId);
		return false;
	});

	$("#kkpct-shopping-cart-checkout-button").off().on('click', function() {
		kk.renderOPCTile();
		return false;
	});

	$("#kkpct-shopping-cart-link").off().on('click', function() {
		kk.renderManageCartTile();
		return false;
	});
};

/**
 * Since we are making JSON calls over the internet, it improves performance if
 * we send a light version of basket items without attached products.
 */
kk.createLightBasketItems = function(basketItems) {
	var items = [];
	if (basketItems != null) {
		for (var i = 0; i < basketItems.length; i++) {
			var item = basketItems[i];
			var b = new Basket();
			b.id = item.id;
			b.encodedProduct = item.encodedProduct;
			b.productId = item.productId;
			b.finalPriceExTax = item.finalPriceExTax;
			b.finalPriceIncTax = item.finalPriceIncTax;
			b.quantity = item.quantity;
			b.useBasketPrice = item.useBasketPrice;
			items.push(b);
		}
	}
	return items;
};

/**
 * Render Manage Cart Tile
 */
kk.renderManageCartTile = function() {

	/*
	 * Redirect if the redirect URL is not null and the current URL doesn't
	 * begin with the redirect URL
	 */
	if (kkManageCartURL != null && !(window.location.href.lastIndexOf(kkManageCartURL, 0) === 0)) {
		kk.redirect(kkManageCartURL);
		return;
	}

	if (kkctContext == null) {
		return;
	}

	if (kkctContext.basketItems != null && kkctContext.basketItems.length > 0) {
		/*
		 * Create an array of light basket items which we receive back with the
		 * quantity in stock populated
		 */
		var items = kk.createLightBasketItems(kkctContext.basketItems);

		kkEng.updateBasketWithStockInfoWithOptions(items, kk.getAddToBasketOptions(), function(result, textStatus, jqXHR) {
			/*
			 * Add the returned items to a map for easy lookup. Populate the
			 * current items with the quantity in stock and add them to a new
			 * array. The reason for this is that if a product no longer exists
			 * then it isn't returned so the number of basket items may be
			 * reduced.
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
			for (var i = 0; i < kkctContext.basketItems.length; i++) {
				var item = kkctContext.basketItems[i];
				var retItem = retMap[item.encodedProduct];
				if (retItem != null) {
					item.quantityInStock = retItem.quantityInStock;
					qtyBasketItems.push(item);
				}
			}
			kkctContext.basketItems = qtyBasketItems;
			// Create a temporary order to get the order totals
			kk.createTempOrder(items);
		}, null, kk.getKKEng());
	} else {
		kk.renderManageCartTileWithCurrentData();
	}
};

/**
 * Called with an array of basket items that have stock information
 */
kk.renderManageCartTileWithCurrentData = function() {

	if (kkmctTemplate == null) {
		kk.getTemplate("manageCartTile", function(t) {
			kkmctTemplate = t;
			kk.renderManageCartTileWithCurrentData();
		});
		return;
	}
	kk.setURL("cart");
	if (kkctContext == null || kkctContext.manageCartTileDivId == null) {
		console.log(kk.getMsg("exception.render.tile", "kk.setManageCartTileDivId", "kk.renderManageCartTile"));
		return;
	}
	var manageCartTile = kkmctTemplate(kkctContext);
	kk.emptyBodyArea();
	$("#" + kkctContext.manageCartTileDivId).html(manageCartTile);
	kk.addManageCartTileEventHandlers();
};

/**
 * Should be called after rendering the manage cart tile.
 */
kk.addManageCartTileEventHandlers = function() {

	var qtyMap = {};

	$('.kkmct-qty-input').keydown(function() {
		var elem = $(this);
		var id = this.id;
		if (qtyMap[id] == null) {
			qtyMap[id] = elem.val();
		}
	});

	$('.kkmct-qty-input').keyup(function() {
		var elem = $(this);
		var id = this.id;
		var oldQty = qtyMap[id];
		var buttonId = 'kkmctb-' + (id).split('-')[1];
		if (isNaN(elem.val())) {
			$('#' + buttonId).hide();
			alert(kkctContext.getMsg("edit.cart.tile.qty.validation"));
			elem.val(oldQty);
			return false;
		}
		if (elem.val() != oldQty) {
			$('#' + buttonId).show();
		} else {
			$('#' + buttonId).hide();
		}

	});

	$('.kkmct-update-qty').off().on('click', function() {
		var id = this.id;
		var basketId = (id).split('-')[1];
		var qty = $("#kkmctq-" + basketId).val();
		if (qty == "") {
			kk.removeFromCart(basketId);
		} else {
			kk.updateCart(basketId, qty);
		}
		return false;
	});

	$('.kkmct-remove').off().on('click', function() {
		var id = this.id;
		var basketId = (id).split('-')[1];
		kk.removeFromCart(basketId);
		return false;
	});

	$(".kkmct-text-link").off().on('click', function() {
		var prodId = (this.id).split('-')[1];
		kk.kkctShowProductDetails(prodId);
		return false;
	});

	$(".kkmct-product-image").off().on('click', function() {
		var prodId = (this.id).split('-')[1];
		kk.kkctShowProductDetails(prodId);
		return false;
	});

	$("#kkmct-checkout-button").off().on('click', function() {
		kk.renderOPCTile();
		return false;
	});

	var couponCode = null;
	$('#kkCouponCode').keydown(function() {
		var elem = $(this);
		if (couponCode == null) {
			couponCode = elem.val();
		}
	});

	$('#kkCouponCode').keyup(function() {
		var elem = $(this);
		var val = $('#kk-manage-cart-form').validate(validationRules).form();
		if (val == true || elem.val() == "") {
			if (elem.val() != couponCode) {
				$('#kkmct-couponCodeUpdate').show();
			} else {
				$('#kkmct-couponCodeUpdate').hide();
			}
		} else {
			$('#kkmct-couponCodeUpdate').hide();
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
		var val = $('#kk-manage-cart-form').validate(validationRules).form();
		if (val == true || elem.val() == "") {
			if (elem.val() != giftCertCode) {
				$('#kkmct-giftCertCodeUpdate').show();
			} else {
				$('#kkmct-giftCertCodeUpdate').hide();
			}
		} else {
			$('#kkmct-giftCertCodeUpdate').hide();
		}
	});

	$("#kkmct-couponCodeUpdate").off().on('click', function() {
		var val = $("#kkCouponCode").val();
		kk.setCouponCode(val);
		kk.refreshManageCartTile();
		return false;
	});

	$("#kkmct-giftCertCodeUpdate").off().on('click', function() {
		var val = $("#kkGiftCertCode").val();
		kk.setGiftCertificateCode(val);
		kk.refreshManageCartTile();
		return false;
	});

};

/**
 * Sets the coupon code on the context objects for the cart and checkout tiles
 */
kk.setCouponCode = function(val) {
	if (kkctContext == null) {
		kk.getCartTileTemplateContext();
	}
	if (kkopcContext == null) {
		kk.getOPCTileTemplateContext();
	}
	kkctContext.couponCode = val;
	kkopcContext.couponCode = val;
};

/**
 * Sets the gift certificate code on the context objects for the cart and
 * checkout tiles
 */
kk.setGiftCertificateCode = function(val) {
	if (kkctContext == null) {
		kk.getCartTileTemplateContext();
	}
	if (kkopcContext == null) {
		kk.getOPCTileTemplateContext();
	}
	kkctContext.giftCertCode = val;
	kkopcContext.giftCertCode = val;
};

/**
 * Show product details
 */
kk.kkctShowProductDetails = function(prodId) {
	kk.renderProdDetailTile(prodId);
};

/**
 * Create a temporary order. If we don't have the version of KK, we need to get
 * it because the code changes depending on the version.
 */
kk.createTempOrder = function(basketItems) {
	if (kkVersion == null || kkVersion.length == 0) {
		kkEng.getKonaKartVersion(function(result, textStatus, jqXHR) {
			kkVersion = decodeJson(result);
			kk.createTempOrderPrivate(basketItems);
		}, null, kk.getKKEng());
	} else {
		kk.createTempOrderPrivate(basketItems);
	}
};

/**
 * Create a temporary order
 */
kk.createTempOrderPrivate = function(basketItems) {
	var options = kk.getCreateOrderOptions();
	options.useDefaultCustomer = true;
	options.billingAddrId = -1;
	options.customerAddrId = -1;
	options.deliveryAddrId = -1;

	if (kkVersion != null) {
		var verNumbers = kkVersion.split("\.");
		if (verNumbers.length == 4) {
			if (verNumbers[0] >= 7 && verNumbers[1] >= 4) {
				options.populateAvailableShippingQuotes = true;
				options.populateOrderTotals = true;
				options.couponCode = kkctContext.couponCode;
				options.giftCertCode = kkctContext.giftCertCode;
			}
		} else {
			console.log("KonaKart version " + kkVersion + " is not in the correct format.");
		}
	}

	kkEng.createOrderWithOptions(kk.getSessionId(), basketItems, options, kk.getLangId(), function(result, textStatus, jqXHR) {
		var order = decodeJson(result);
		if (order != null && order != "") {
			if (order.orderTotals == null) {
				// Add coupon and gift certificate codes
				order.couponCode = kkctContext.couponCode;
				order.giftCertCode = kkctContext.giftCertCode;

				// Make the message lighter by removing products
				for (var i = 0; i < order.orderProducts.length; i++) {
					var orderProduct = order.orderProducts[i];
					orderProduct.product = null;
				}

				// Get the shipping quotes
				kkEng.getShippingQuotes(order, kk.getLangId(), function(result, textStatus, jqXHR) {
					var quotes = decodeJson(result);
					if (quotes && quotes.length > 0) {
						// Pick the first quote
						var quote = quotes[0];
						order.shippingQuote = quote;
						kkEng.getOrderTotals(order, kk.getLangId(), function(result, textStatus, jqXHR) {
							var checkoutOrder = decodeJson(result);
							kkctContext.checkoutOrder = checkoutOrder;
							kk.renderManageCartTileWithCurrentData();
						}, null, kk.getKKEng());
					}
				}, null, kk.getKKEng());
			} else {
				/*
				 * This code is run if KK server version is 7.4 or above. It
				 * runs much faster that the previous versions.
				 */
				kkctContext.checkoutOrder = order;
				kk.renderManageCartTileWithCurrentData();
			}
		}
	}, null, kk.getKKEng());
};

/**
 * Can be customized to set various options
 */
kk.getAddToBasketOptions = function() {
	var options = new Object();

	var prodOptions = kk.getFetchProdOptions();
	if (prodOptions != null) {
		options.catalogId = prodOptions.catalogId;
		options.useExternalPrice = prodOptions.useExternalPrice;
		options.useExternalQuantity = prodOptions.useExternalQuantity;
	}
	options.getImages = kkGetProdImages;
	options.allowMultipleEntriesForSameProduct = false;

	return options;
};
