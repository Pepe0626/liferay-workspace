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
 * JavaScript for the orders tile (showing a list of customer orders) using the
 * template ordersTile.html
 */

var kkosContext = null;
var kkosTemplate = null;

/**
 * Returns a fully populated template context for a orders tiles
 */
kk.getOrdersTileTemplateContext = function() {

	if (kkosContext == null) {
		kkosContext = kk.getTemplateContext();
		/*
		 * For paging orders
		 */
		kkosContext.totalNumOrds = 0;
		kkosContext.numOrds = 0;
		kkosContext.showNext = false;
		kkosContext.showBack = false;
		kkosContext.currentPage = 1;
		kkosContext.pageList = null;
		// 5,10,20,30,50
		kkosContext.maxOrdsPerPage = 10;
		kkosContext.currentOrds = null;
		kkosContext.numPages = 0;
		kkosContext.maxPagesToShow = 5;

		// Set the data descriptor
		var dataDesc = new DataDescriptor();
		dataDesc.limit = kkosContext.maxOrdsPerPage + 1;
		dataDesc.offset = 0;
		kkosContext.dataDesc = dataDesc;

		// Random id
		kkosContext.id = "os" + Math.floor((Math.random() * 10000) + 1);
	}

};

/**
 * Define the id of the div for the Orders tile
 */
kk.setOrdersTileDivId = function(id) {
	kk.getOrdersTileTemplateContext();
	kkosContext.ordersDivId = id;
};

/**
 * Method to fetch and render
 */
kk.fetchAndRenderOrders = function() {

	if (kkosContext == null || kkosContext.ordersDivId == null) {
		console.log(kk.getMsg("exception.render.tile", "kk.setOrdersTileDivId", "kk.fetchAndRenderOrders"));
		return;
	}

	kk.checkSession(function(customerId) {
		kk.setURL("orders");
		kk.setOrderDataDescOffset("navStart");
		kkEng.getOrdersPerCustomer(kkosContext.dataDesc, kk.getSessionId(), kk.getLangId(), KKGetOrdersCallback, null,
				kk.getKKEng());
	});
};

/**
 * Method to navigate orders
 */
kk.navigateOrders = function() {
	kk.checkSession(function(customerId) {
		kkEng.getOrdersPerCustomer(kkosContext.dataDesc, kk.getSessionId(), kk.getLangId(), KKGetOrdersCallback, null,
				kk.getKKEng());
	});
};

/**
 * Callback after getting orders
 */
var KKGetOrdersCallback = function(result, textStatus, jqXHR) {
	if (kkosTemplate == null) {
		kk.getTemplate("ordersTile", function(t) {
			kkosTemplate = t;
			KKGetOrdersCallback(result, textStatus, jqXHR);
		});
		return;
	}
	var orders = decodeJson(result);
	kk.setControlsFromOrders(orders);
	kkosContext.orders = orders.orderArray;
	var ordersTile = kkosTemplate(kkosContext);
	$("#" + kkosContext.ordersDivId).html(ordersTile);
	kk.addOrdersTileEventHandlers();
};

/**
 * Should be called after rendering the orders tile
 */
kk.addOrdersTileEventHandlers = function() {

	$(".kkos-pagination-element.kkos-previous-items").off().on('click', function() {
		var fetchMore = kk.setOrderDataDescOffset("navBack");
		if (fetchMore) {
			kk.navigateOrders();
		}
		return false;
	});

	$(".kkos-pagination-element.kkos-next-items").off().on('click', function() {
		var fetchMore = kk.setOrderDataDescOffset("navNext");
		if (fetchMore) {
			kk.navigateOrders();
		}
		return false;
	});

	$(".kkos-pagination-element.kkos-page-num").off().on('click', function() {
		var page = (this.id).split('-')[1];
		var fetchMore = kk.setOrderDataDescOffset(page);
		if (fetchMore) {
			kk.navigateOrders();
		}
		return false;
	});

	$(".kkos-order-item-link").off().on('click', function() {
		var prodId = (this.id).split('-')[1];
		kk.renderProdDetailTile(prodId);
		return false;
	});

	$(".kkos-view-order").off().on('click', function() {
		var orderId = (this.id).split('-')[1];
		kk.renderOrderDetailTile(orderId);
		return false;
	});

	$(".kkos-repeat-order").off().on('click', function() {
		var orderId = (this.id).split('-')[1];
		kk.repeatOrder(orderId);
		return false;
	});

	$(".kkos-track-order").off().on('click', function() {
		var orderId = (this.id).split('-')[1];
		console.log("Order tracking for order id = " + orderId);
		return false;
	});

	$(".kkos-invoice-order").off().on('click', function() {
		var orderId = (this.id).split('-')[1];
		kk.downloadOrderInvoice(orderId);
		return false;
	});

	$("#kk-orders-back").off().on('click', function() {
		kk.renderAccountTile(/* fetchNewData */false);
		return false;
	});

};

/**
 * Sets the controls required to display the orders
 */
kk.setControlsFromOrders = function(orders) {

	kkosContext.currentOrds = (orders.orderArray == null) ? new Array() : orders.orderArray;
	kkosContext.numOrds = (kkosContext.currentOrds.length > kkosContext.maxOrdsPerPage) ? kkosContext.maxOrdsPerPage
			: kkosContext.currentOrds.length;
	kkosContext.totalNumOrds = orders.totalNumOrders;
	kkosContext.numPages = kkosContext.totalNumOrds / kkosContext.maxOrdsPerPage;
	if (kkosContext.totalNumOrds % kkosContext.maxOrdsPerPage != 0) {
		kkosContext.numPages++;
	}
	kkosContext.numPages = Math.floor(kkosContext.numPages);
	kkosContext.currentPage = Math.floor(kkosContext.dataDesc.offset / kkosContext.maxOrdsPerPage) + 1;
	kk.getOrderPages();
	kk.setOrderBackAndNext();
};

/**
 * Get an array of pages to show
 */
kk.getOrderPages = function() {
	kkosContext.pageList = new Array();

	// Ensure that currentPage is valid
	if (kkosContext.currentPage > kkosContext.numPages) {
		kkosContext.currentPage = kkosContext.numPages;
	}

	if (kkosContext.currentPage < 1) {
		kkosContext.currentPage = 1;
	}

	// Need to show at least 3 pages
	if (kkosContext.maxPagesToShow < 3) {
		kkosContext.maxPagesToShow = 3;
	}

	// ensure that we need to show an odd number of pages
	if (kkosContext.maxPagesToShow % 2 == 0) {
		kkosContext.maxPagesToShow++;
	}

	var pagesEitherSide = Math.floor(kkosContext.maxPagesToShow / 2);

	// Add pages before current page
	for (var i = pagesEitherSide; i > 0; i--) {
		kkosContext.pageList.push(kkosContext.currentPage - i);
	}

	// Add current page
	kkosContext.pageList.push(kkosContext.currentPage);

	// Add pages after current page
	for (var i = 0; i < pagesEitherSide; i++) {
		kkosContext.pageList.push(kkosContext.currentPage + (i + 1));
	}

	// If page numbers are < 1 remove them from start of list and add to end
	while (kkosContext.pageList[0] < 1) {
		var max = kkosContext.pageList[kkosContext.pageList.length - 1];
		kkosContext.pageList.shift();
		if (max < kkosContext.numPages) {
			kkosContext.pageList.push(max + 1);
		}
	}

	// If page numbers are > max allowed remove them from end of list and add to
	// start
	while (kkosContext.pageList.length > 0
			&& kkosContext.pageList[kkosContext.pageList.length - 1] > kkosContext.numPages) {
		kkosContext.pageList.pop();
		if (kkosContext.pageList.length > 0 && kkosContext.pageList[0] > 1) {
			kkosContext.pageList.splice(0, 0, kkosContext.pageList[0] - 1);
		}
	}
};

/**
 * Called when a new set of orders has been fetched in order to correctly set
 * the back and next buttons
 */
kk.setOrderBackAndNext = function() {

	// We always attempt to fetch back maxRows + 1
	if (kkosContext.currentOrds.length > kkosContext.maxOrdsPerPage) {
		kkosContext.showNext = 1;
	} else {
		kkosContext.showNext = 0;
	}
	if (kkosContext.dataDesc.offset > 0) {
		kkosContext.showBack = 1;
	} else {
		kkosContext.showBack = 0;
	}
};

/**
 * Act on navigation actions
 */
kk.setOrderDataDescOffset = function(action) {

	var fetchMore = true;

	var requestedPage = -1;
	if (!isNaN(action)) {
		requestedPage = action;
	}

	if (action == "navStart") {
		kkosContext.dataDesc.offset = 0;
		kkosContext.currentPage = 1;
	} else if (action == "navNext") {
		if (kkosContext.dataDesc.offset + kkosContext.maxOrdsPerPage < kkosContext.totalNumOrds) {
			kkosContext.dataDesc.offset += kkosContext.maxOrdsPerPage;
			kkosContext.currentPage = (kkosContext.dataDesc.offset / kkosContext.maxOrdsPerPage) + 1;
		} else {
			fetchMore = false;
		}
	} else if (action == "navBack") {
		if (kkosContext.dataDesc.offset == 0) {
			fetchMore = false;
		} else {
			kkosContext.dataDesc.offset -= kkosContext.maxOrdsPerPage;
			if (kkosContext.dataDesc.offset < 0) {
				kkosContext.dataDesc.offset = 0;
			}
			kkosContext.currentPage = (kkosContext.dataDesc.offset / kkosContext.maxOrdsPerPage) + 1;
		}
	} else if (requestedPage > 0) {
		if (requestedPage == kkosContext.currentPage) {
			fetchMore = false;
		} else {
			kkosContext.dataDesc.offset = kkosContext.maxOrdsPerPage * (requestedPage - 1);
			kkosContext.currentPage = requestedPage;
		}
	} else if (requestedPage <= 0) {
		kkosContext.dataDesc.offset = 0;
		kkosContext.currentPage = 1;
	}

	return fetchMore;
};

/**
 * Orders page size
 */
kk.changeOrdersPageSize = function(id) {
	var size = $("#" + id).val();
	kkosContext.maxOrdsPerPage = +size;
	kkosContext.dataDesc.limit = kkosContext.maxOrdsPerPage + 1;
	kk.setOrderDataDescOffset("navStart");
	kk.navigateOrders();
};

/**
 * Orders sort by
 */
kk.changeOrdersSortBy = function(id) {
	var sortBy = $("#" + id).val();
	kkosContext.dataDesc.orderBy = sortBy;
	kk.setOrderDataDescOffset("navStart");
	kk.navigateOrders();
};
