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
 * JavaScript for popup and manage wishlist tiles.
 * <ul>
 * <li>popup wishlist tile using the template popupWishListTile.html</li>
 * <li>manage wishlist tile using the template manageWishListTile.html</li>
 * </ul>
 */

var kkwtContext = null;
var kkpwtTemplate = null;
var kkmwtTemplate = null;

/**
 * Define the id of the div where the popup wishList tile will be drawn
 */
kk.setPopupWishListTileDivId = function(id) {
	kk.getWishListTileTemplateContext();
	kkwtContext.popupWishListTileDivId = id;
};

/**
 * Define the id of the div where the manage wishList tile will be drawn
 */
kk.setManageWishListTileDivId = function(id) {
	kk.getWishListTileTemplateContext();
	kkwtContext.manageWishListTileDivId = id;
};

/**
 * Returns a fully populated template context for a wishList tiles
 */
kk.getWishListTileTemplateContext = function() {

	if (kkwtContext == null) {
		kkwtContext = kk.getTemplateContext();
	}
};

/**
 * Fetch the wishList items
 */
kk.fetchWishList = function() {
	kk.getCustomerId(function() {
		var displayOptions = new Object();
		displayOptions.displayPopup = false;
		displayOptions.manageWishList = false;

		kkEng.searchForWishLists(kk.getSessionId(), null, kk.getWishListCustomerSearch(), KKSearchForWishListsCallback,
				displayOptions, kk.getKKEng());
	});
};

/**
 * Callback to retrieve the wishList items
 */
var KKSearchForWishListsCallback = function(result, textStatus, jqXHR) {
	kk.getWishListTileTemplateContext();
	kkwtContext.wishList = null;
	kkwtContext.wishListItems = null;
	kkwtContext.numItems = 0;
	var wishLists = decodeJson(result);
	if (wishLists != null && wishLists.wishListArray != null && wishLists.wishListArray.length > 0) {
		for (var i = 0; i < wishLists.wishListArray.length; i++) {
			var wl = wishLists.wishListArray[i];
			if (wl.listType == 0) {
				kkEng.getWishListWithItemsWithOptions(kk.getSessionId(), wl.id, kk.getLangId(),
						kk.getWishListOptions(), function(result, textStatus, jqXHR) {
							var wli = decodeJson(result);
							kkwtContext.wishList = wli;
							kkwtContext.wishListItems = wli.wishListItems;

							// Add image to each item so can easily be used by
							// template
							if (kkwtContext.wishListItems != null) {
								kkwtContext.numItems = kkwtContext.wishListItems.length;
								for (var i = 0; i < kkwtContext.numItems; i++) {
									var item = kkwtContext.wishListItems[i];
									item.prodImage = kk.getProdImageBase(item.product, kkwtContext.imageBase, item.opts)
											+ "_1_tiny" + kk.getProdImageExtension(item.product);
								}
							}

							// Render the popup tile
							kk.renderPopupWishListTile();

							// Animate the wish list to show that something has
							// been added
							if (this.displayPopup) {
								showWishList("#kkpwt-wishList");
								window.setTimeout("hideWishList('#kkpwt-wishList')", 2000);
							}

							// Display the manage wishList panel
							if (this.manageWishList) {
								kk.renderManageWishListTile();
							}

						}, this, kk.getKKEng());
				break;
			}
		}
	} else {
		// Render the popup tile
		kk.renderPopupWishListTile();

		// Display the manage wishList panel
		if (this.manageWishList) {
			kk.renderManageWishListTile();
		}
	}
};

/**
 * Render a popup wishList tile
 */
kk.renderPopupWishListTile = function() {
	if (kkpwtTemplate == null) {
		kk.getTemplate("popupWishListTile", function(t) {
			kkpwtTemplate = t;
			kk.renderPopupWishListTile();
		});
		return;
	}
	if (kkwtContext == null || kkwtContext.popupWishListTileDivId == null) {
		console.log(kk.getMsg("exception.render.tile", "kk.setPopupWishListTileDivId", "kk.renderPopupWishListTile"));
		return;
	}
	var popupWishListTile = kkpwtTemplate(kkwtContext);
	$("#" + kkwtContext.popupWishListTileDivId).html(popupWishListTile);
	kk.addPopupWishListTileEventHandlers();
};

/**
 * Should be called after rendering the popup tile.
 */
kk.addPopupWishListTileEventHandlers = function() {

	/*
	 * Hover effects for Sliding WishList
	 */
	var wishListHover = 0;
	$("#kkpwt-wishList").hover(function() {
		// in
		wishListHover = 1;
		showWishList("#kkpwt-wishList");
	}, function() {
		// out
		setTimeout(function() {
			if (wishListHover != 2) {
				wishListHover = 0;
				hideWishList("#kkpwt-wishList");
			}
		}, 500);
	});
	$("#kkpwt-wishList-container").hover(function() {
		// in
		wishListHover = 2;
		showWishList("#kkpwt-wishList");
	}, function() {
		// out
		wishListHover = 0;
		hideWishList("#kkpwt-wishList");
	});

	$(".kkpwt-wishList-item-image").off().on('click', function() {
		var prodId = (this.id).split('-')[1];
		kk.kkwtShowProductDetails(prodId);
		return false;
	});

	$(".kkpwt-wishList-item-title").off().on('click', function() {
		var prodId = (this.id).split('-')[1];
		kk.kkwtShowProductDetails(prodId);
		return false;
	});

	$("#kkpwt-wishList-link").off().on('click', function() {
		kk.renderManageWishListTile();
		return false;
	});
};

/**
 * Code to display the slide out wishList
 */
function showWishList(wishList) {
	$(wishList).addClass("kk-small-rounded-corners-top kkpwt-wishList-mouseover");
	$("#kkpwt-wishList-container").css("display", "inline");
}

/**
 * Code to hide the slide out wishList
 */
function hideWishList(wishList) {
	$("#kkpwt-wishList-container").hide();
	$(wishList).removeClass("kkpwt-wishList-mouseover kk-small-rounded-corners-top");
}

/**
 * Add a product to the wishList
 */
kk.addToWishList = function(prodId, opts, quantity) {
	if (kkwtContext == null) {
		return;
	}
	if (kkwtContext.wishList != null) {
		kk.addToWishListPrivate(prodId, opts, quantity);
	} else {
		/*
		 * If a wish list doesn't already exist then we need to create one and
		 * then add the item to the newly created wish list
		 */
		var wl = new Object();
		wl.publicWishList = false;
		wl.listType = 0;

		kkEng.createWishListWithOptions(kk.getSessionId(), wl, kk.getWishListOptions(), function(result, textStatus,
				jqXHR) {
			wl.id = decodeJson(result);
			kkwtContext.wishList = wl;
			kk.addToWishListPrivate(prodId, opts, quantity);
		}, null, kk.getKKEng());
	}
};

/**
 * Called when we are sure that a wish list exists for the customer
 */
kk.addToWishListPrivate = function(prodId, opts, quantity) {

	var item = new Object();
	item.opts = opts;
	item.productId = prodId;
	item.wishListId = kkwtContext.wishList.id;
	item.priority = 3;
	item.quantityDesired = 1;

	kkEng.addToWishListWithOptions(kk.getSessionId(), item, kk.getWishListOptions(),
			function(result, textStatus, jqXHR) {
				decodeJson(result);
				var displayOptions = new Object();
				displayOptions.displayPopup = true;
				displayOptions.manageWishList = false;

				kkEng.searchForWishLists(kk.getSessionId(), null, kk.getWishListCustomerSearch(),
						KKSearchForWishListsCallback, displayOptions, kk.getKKEng());
			}, null, kk.getKKEng());

};

/**
 * Render Manage WishList Tile
 */
kk.renderManageWishListTile = function() {

	/*
	 * Redirect if the redirect URL is not null and the current URL doesn't
	 * begin with the redirect URL
	 */
	if (kkManageWishlistURL != null && !(window.location.href.lastIndexOf(kkManageWishlistURL, 0) === 0)) {
		kk.redirect(kkManageWishlistURL);
		return;
	}

	if (kkmwtTemplate == null) {
		kk.getTemplate("manageWishListTile", function(t) {
			kkmwtTemplate = t;
			kk.renderManageWishListTile();
		});
		return;
	}
	kk.setURL("wishlist");
	if (kkwtContext == null || kkwtContext.manageWishListTileDivId == null) {
		console.log(kk.getMsg("exception.render.tile", "kk.setManageWishListTileDivId", "kk.renderManageWishListTile"));
		return;
	}
	var manageWishListTile = kkmwtTemplate(kkwtContext);
	kk.emptyBodyArea();
	$("#" + kkwtContext.manageWishListTileDivId).html(manageWishListTile);
	kk.addManageWishListTileEventHandlers();
};

/**
 * Should be called after rendering the manage wishList tile.
 */
kk.addManageWishListTileEventHandlers = function() {

	$('.kkmwt-remove').off().on('click', function() {
		var id = this.id;
		var itemId = (id).split('-')[1];
		kk.removeFromWishList(itemId);
		return false;
	});

	$('.kkmwt-add-to-cart').off().on('click', function() {
		var id = this.id;
		var itemId = (id).split('-')[1];
		var opts = null;
		var prodId = null;
		if (kkwtContext.wishListItems != null && kkwtContext.wishListItems.length > 0) {
			for (var i = 0; i < kkwtContext.wishListItems.length; i++) {
				var wli = kkwtContext.wishListItems[i];
				if (wli.id == itemId) {
					prodId = wli.productId;
					opts = wli.opts;
					break;
				}

			}
		}

		if (prodId != null) {
			kk.addToCart(prodId, opts, 1);
		}
		return false;
	});

	$(".kkmwt-text-link").off().on('click', function() {
		var prodId = (this.id).split('-')[1];
		kk.kkwtShowProductDetails(prodId);
		return false;
	});

	$(".kkmwt-product-image").off().on('click', function() {
		var prodId = (this.id).split('-')[1];
		kk.kkwtShowProductDetails(prodId);
		return false;
	});

};

/**
 * RemoveFromWishList
 */
kk.removeFromWishList = function(itemId) {
	kkEng.removeFromWishListWithOptions(kk.getSessionId(), itemId, kk.getWishListOptions(), function() {
		kk.refreshManageWishListTile();
	}, null, kk.getKKEng());
};

/**
 * Show product details
 */
kk.kkwtShowProductDetails = function(prodId) {
	kk.renderProdDetailTile(prodId);
};

/**
 * Fetch wishList items and render the manage wishList tile
 */
kk.refreshManageWishListTile = function() {
	kk.getCustomerId(function(customerId) {
		var displayOptions = new Object();
		displayOptions.displayPopup = false;
		displayOptions.manageWishList = true;

		kkEng.searchForWishLists(kk.getSessionId(), null, kk.getWishListCustomerSearch(), KKSearchForWishListsCallback,
				displayOptions, kk.getKKEng());
	});
};

/**
 * Change the priority of a wish list item
 */
kk.changeWishListPriority = function(id) {
	var priority = $("#" + id).val();
	var itemId = id.split('-')[0];

	var selectedItem = null;
	if (kkwtContext.wishListItems != null && kkwtContext.wishListItems.length > 0) {
		for (var i = 0; i < kkwtContext.wishListItems.length; i++) {
			var wli = kkwtContext.wishListItems[i];
			if (wli.id == itemId) {
				selectedItem = wli;
				break;
			}
		}
	}

	if (selectedItem != null) {
		var lightWl = new Object();
		lightWl.id = selectedItem.id;
		lightWl.opts = selectedItem.opts;
		lightWl.priority = priority;
		lightWl.wishListId = selectedItem.wishListId;
		lightWl.productId = selectedItem.productId;

		kkEng.addToWishListWithOptions(kk.getSessionId(), lightWl, kk.getWishListOptions(), function(result,
				textStatus, jqXHR) {
			decodeJson(result);
			var displayOptions = new Object();
			displayOptions.displayPopup = false;
			displayOptions.manageWishList = true;

			kkEng.searchForWishLists(kk.getSessionId(), null, kk.getWishListCustomerSearch(),
					KKSearchForWishListsCallback, displayOptions, kk.getKKEng());
		}, null, kk.getKKEng());
	}

};

/**
 * Utility method to get a customer search object
 */
kk.getWishListCustomerSearch = function() {
	var custSearch = null;
	if (kk.getSessionId() == null && kk.getCustomerId() < 0) {
		custSearch = new Object();
		custSearch.tmpId = kk.getCustomerId();
	}
	return custSearch;
};

/**
 * Utility method to get an options object
 */
kk.getWishListOptions = function() {
	var options = new Object();
	if (kk.getSessionId() == null && kk.getCustomerId() < 0) {
		options.customerId = kk.getCustomerId();
	}
	options.getImages = kkGetProdImages;
	return options;
};
