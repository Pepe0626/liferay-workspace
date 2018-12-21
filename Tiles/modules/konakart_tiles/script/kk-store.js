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
 * This JavaScript is only required if using all of the tiles in the test page
 * store.html. It initialises the backbone router so that the forward and back
 * buttons of the browser function correctly.
 */

/*
 * Persistent tile initialization flags
 */
var kkTilePositionInit = false;
var kkSearchTileInit = false;
var kkCategoryMenuTileInit = false;
var kkBreadcrumbsTileInit = false;
var kkCartLinkInit = false;
var kkWishListLinkInit = false;

/**
 * Function to render the home page
 */
kk.renderHomePage = function() {
	kk.emptyBodyArea();
	$("#body-tile").prepend('<img class="kk-rounded-corners" src="'+kkImgBase+'content/home_kindle-fire-hd.jpg" />');
	kk.setHomePageCarousel();
};

/**
 * Add a carousel to the home page
 */
kk.setHomePageCarousel = function() {

	// Component configuration values
	var categoryId = 1;
	var limit = 15;
	var title = "Hardware Products";
	// End of component configuration values

	var dataDesc = new DataDescriptor();
	dataDesc.limit = limit;

	var prodSearch = new ProductSearch();
	prodSearch.categoryId = categoryId;

	kkEng.searchForProductsWithOptions(kk.getSessionId(), dataDesc, prodSearch, kk.getLangId(), kk.getFetchProdOptions(/*getImages*/false), function(result,
			textStatus, jqXHR) {
		var kkProds = decodeJson(result).productArray;
		kk.renderCarousel("carousel-tile", title, kkProds);
	}, null, kk.getKKEng());

};

/**
 * Empty the current body area
 */
kk.emptyBodyArea = function() {

	if (typeof(kkpsContext) !== 'undefined' && kkpsContext != null) {
		$("#" + kkpsContext.productsDivId).empty();
		$("#" + kkpsContext.facetsDivId).empty();
	}

	if (typeof(kkctContext) !== 'undefined' && kkctContext != null) {
		$("#" + kkctContext.manageCartTileDivId).empty();
	}

	$("#carousel-tile").empty();
};

/**
 * Initialise the store
 */
kk.storeInit = function() {

	if (kkRouter == null) {
		kk.startRouter();
	}

	if (kkTilePositionInit == false) {
		// Define positions for tiles
		kk.setProductsTileDivId("products-tile");
		kk.setFacetsTileDivId("facets-tile");
		kk.setCatMenuTileDivId("main-menu");
		kk.setSearchTileDivId("search-tile");
		kk.setPopupCartTileDivId("kk-popup-cart-tile");
		kk.setManageCartTileDivId("body-tile");
		kk.setPopupWishListTileDivId("kk-popup-wishList-tile");
		kk.setManageWishListTileDivId("body-tile");
		kk.setProductDetailTileDivId("body-tile");
		kk.setLoginLinkDivId("kk-account-link");
		kk.setLogoutLinkDivId("kk-logout-link");
		kk.setLoginTileDivId("body-tile");
		kk.setRegisterTileDivId("body-tile");
		kk.setAccountTileDivId("body-tile");
		kk.setManagePasswordTileDivId("body-tile");
		kk.setManageEmailTileDivId("body-tile");
		kk.setManagePersonalInfoTileDivId("body-tile");
		kk.setInsertAddressTileDivId("body-tile");
		kk.setFirstAddressTileDivId("body-tile");
		kk.setEditAddressTileDivId("body-tile");
		kk.setManageAddressBookTileDivId("body-tile");
		kk.setNewsletterSubscriptionTileDivId("body-tile");
		kk.setProductNotificationTileDivId("body-tile");
		kk.setOPCTileDivId("body-tile");
		kk.setOrderDetailDivId("body-tile");
		kk.setOrdersTileDivId("body-tile");
		kk.setWriteReviewTileDivId("body-tile");
		kk.setForgotPasswordTileDivId("body-tile");
		kk.setBreadcrumbsTileDivId("breadcrumbs-tile");
		kkTilePositionInit = true;
	}

	if (kkCartLinkInit == false) {
		// Display Cart link
		kk.fetchCart();
		kkCartLinkInit = true;
	}

	if (kkWishListLinkInit == false) {
		// Display WishList link
		kk.fetchWishList();
		kkWishListLinkInit = true;
	}

	if (kkSearchTileInit == false) {
		// Render the search tile
		kk.renderSearchTile();
		kkSearchTileInit = true;
	}

	if (kkCategoryMenuTileInit == false) {
		// Render the category menu
		kk.renderCategoryMenuTile();
		kkCategoryMenuTileInit = true;
	}

	if (kkBreadcrumbsTileInit == false) {
		// Render the breadcrumbs tile
		kk.renderBreadcrumbsTile();
		kkBreadcrumbsTileInit = true;
	}
};

/**
 * Example for changing the language where locale is in the format es_ES, en_US
 * etc. If the locale is for example es_ES then a kk-es_ES.js message catalog
 * must exist.
 */
kk.changeStoreLanguage = function(locale) {
	kk.changeLocale(function() {
		kk.renderCategoryMenuTile(/* force */true);
		kk.setValidationMsgs();
		kk.setCurrencyFormatter(); // sets thousand and dec place symbols
	}, locale,/* langId */null);
};

/**
 * Example for changing the store currency. The currency code is the ISO code
 * (e.g. USD, GBP, EUR) and must have been defined in kk-currencies.js.
 */
kk.changeStoreCurrency = function(currencyCode) {
	kkCurrencyCode = currencyCode;
	kk.setCurrencyFormatter();
};

/**
 * Example for initialising the home page with products
 */
kk.setHomePageProducts = function() {

	// Get some products
	kkpsContext.prodSearch.returnCategoryFacets = true;
	kkpsContext.prodSearch.returnManufacturerFacets = true;
	kkpsContext.prodSearch.categoryId = 3;
	kkpsContext.prodSearch.manufacturerId = KK_SEARCH_ALL;
	// kkpsContext.prodSearch.searchText = "clock";
	// kkpsContext.prodSearch.whereToSearch = KK_SEARCH_IN_PRODUCT_DESCRIPTION;

	// Render the products tile
	kk.fetchAndRenderProducts();
};