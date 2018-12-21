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
 * JavaScript for the order details tile using the template orderDetailTile.html
 */

var kkodTileContext = null;
var kkodTileTemplate = null;

/**
 * Returns a fully populated template context for a order detail tile
 */
kk.getOrderDetailTileTemplateContext = function() {
	if (kkodTileContext == null) {
		kkodTileContext = kk.getTemplateContext();
	}
};

/**
 * Define the id of the div for the order detail link
 */
kk.setOrderDetailDivId = function(id) {
	kk.getOrderDetailTileTemplateContext();
	kkodTileContext.orderDetailTileDivId = id;
};

/**
 * Renders the order detail tile for orderId
 */
kk.renderOrderDetailTile = function(orderId) {
	kk.checkSession(function(customerId) {
		kkodTileContext.caller = Backbone.history.fragment;

		if (kkodTileTemplate == null) {
			kk.getTemplate("orderDetailTile", function(t) {
				kkodTileTemplate = t;
				kk.renderOrderDetailTile(orderId);
			});
			return;
		}

		if (kkodTileContext == null || kkodTileContext.orderDetailTileDivId == null) {
			console.log(kk.getMsg("exception.render.tile", "kk.setOrderDetailDivId", "kk.renderOrderDetailTile"));
			return;
		}

		// See if we've already cached the order
		var order = null;
		if (kkAccountTileContext != null && kkAccountTileContext.orders != null) {
			for (var i = 0; i < kkAccountTileContext.orders.length; i++) {
				var o = kkAccountTileContext.orders[i];
				if (o.id == orderId) {
					order = o;
					break;
				}
			}
		}

		if (order == null) {
			kkEng.getOrder(kk.getSessionId(), orderId, kk.getLangId(), function(result, textStatus, jqXHR) {
				var order = decodeJson(result);
				kkodTileContext.order = order;
				kk.renderOrderDetailTilePrivate();
			}, null, kk.getKKEng());
		} else {
			kkodTileContext.order = order;
			kk.renderOrderDetailTilePrivate();
		}
	});
};

/**
 * Called once we have the order object to render
 */
kk.renderOrderDetailTilePrivate = function() {
	var control = new Object();
	control.orderId = kkodTileContext.order.id;
	kk.setURL("orderDetail", control);
	var orderDetailTile = kkodTileTemplate(kkodTileContext);
	kk.emptyBodyArea();
	$("#" + kkodTileContext.orderDetailTileDivId).html(orderDetailTile);
	kk.addOrderDetailTileEventHandlers();
};

/**
 * Should be called after rendering the order detail tile.
 */
kk.addOrderDetailTileEventHandlers = function() {

	$("#kkod-repeat-button").off().on('click', function() {
		kk.repeatOrder(kkodTileContext.order.id);
		return false;
	});

	$("#kkod-back-button").off().on('click', function() {
		if (kkodTileContext.caller != null && kkodTileContext.caller.indexOf("account") > -1) {
			kk.renderAccountTile(/* fetchNewData */false);
		} else {
			kk.navigateOrders();
		}
		return false;
	});

	$(".kkod-order-item-link").off().on('click', function() {
		var prodId = (this.id).split('-')[1];
		kk.renderProdDetailTile(prodId);
		return false;
	});
};

/**
 * Repeats the order and goes to the checkout page
 */
kk.repeatOrder = function(orderId) {
	kk.checkSession(function(customerId) {
		// Get the order
		kkEng.getOrder(kk.getSessionId(), orderId, kk.getLangId(), function(result, textStatus, jqXHR) {
			var order = decodeJson(result);
			if (order.orderProducts == null || order.orderProducts.length == 0) {
				console.log("Order id = " + orderId + " has no order products. Cannot repeat.");
				return;
			}
			// Clear the current basket
			kkEng.removeBasketItemsPerCustomer(kk.getSessionId(), 0, function() {
				// Create basket items from the order products of the order and
				// add them to the basket
				var callBackCount = order.orderProducts.length;
				for (var i = 0; i < order.orderProducts.length; i++) {
					var op = order.orderProducts[i];
					var b = new Basket();
					b.quantity = op.quantity;
					b.opts = op.opts;
					b.productId = op.productId;
					b.custom1 = op.custom1;
					b.custom2 = op.custom2;
					b.custom3 = op.custom3;
					b.custom4 = op.custom4;
					b.custom5 = op.custom5;
					kkEng.addToBasketWithOptions(kk.getSessionId(), customerId, b, kk.getAddToBasketOptions(), function(result, textStatus,
							jqXHR) {
						callBackCount--;
						if (callBackCount == 0) {
							kk.repeatOrderFromBasketItems(customerId, order);
							kk.fetchCart(); // Refresh popup cart 
						}
					}, null, kk.getKKEng());
				}
			}, null, kk.getKKEng());
		}, null, kk.getKKEng());
	});
};

/**
 * Called when the basket has already been filled with the items of the order
 * that needs to be repeated
 */
kk.repeatOrderFromBasketItems = function(customerId, order) {
	kk.getOPCTileTemplateContext(/* clear */true);
	kkopcContext.checkoutOrder = order;
	kkopcContext.billingAddrId = order.billingAddrId;
	kkopcContext.deliveryAddrId = order.deliveryAddrId;
	kkopcContext.selectedShippingCode = order.shippingModuleCode;
	kkopcContext.selectedShippingServiceCode = order.shippingServiceCode;
	kkopcContext.selectedPaymentCode = order.paymentModuleCode;
	kkopcContext.selectedPaymentSubCode = order.paymentModuleSubCode;
	kk.renderOPCTile(/* refresh */true);
};

/**
 * Called to download the order invoice. It uses functionality present in the
 * standard KonaKart struts / JSP storefront application. If that isn't running,
 * you will need to implement similar functionality in a servlet.
 */
kk.downloadOrderInvoice = function(orderId) {
	kk.checkSession(function(customerId) {
		var iframe = kk.getHiddenIframe();
		iframe.src = kkRoot + "DownloadInvoiceExt.action?orderId=" + orderId + "&sessionId=" + kk.getSessionId();
	});
};

/**
 * Can be customized to set various options
 */
kk.getCreateOrderOptions = function() {
	var options = new Object();

	var prodOptions = kk.getFetchProdOptions();
	if (prodOptions != null) {
		options.catalogId = prodOptions.catalogId;
		options.useExternalPrice = prodOptions.useExternalPrice;
		options.useExternalQuantity = prodOptions.useExternalQuantity;
	}
	options.getImages = kkGetProdImages;
	options.useWishListShippingAddr = true;
	options.locale = kk.getLocale();

	return options;
};

