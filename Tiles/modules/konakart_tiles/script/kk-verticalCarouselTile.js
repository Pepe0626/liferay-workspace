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
 * JavaScript for the vertical carousel tile using the template
 * verticalCarouselTile.html
 */

var kkvcaTemplate = null;

/**
 * Returns a fully populated template context for a vertical carousel tiles
 */
kk.getVerticalCarouselTileTemplateContext = function() {
	var context = kk.getTemplateContext();
	// Give the carousel a unique random id since there may be more than one on
	// a page
	context.id = "jc" + Math.floor((Math.random() * 10000) + 1);
	return context;
};

/**
 * Renders a vertical carousel at the given position with the given products
 */
kk.renderVerticalCarousel = function(divId, title, prods) {

	if (kkvcaTemplate == null) {
		kk.getTemplate("verticalCarouselTile", function(t) {
			kkvcaTemplate = t;
			kk.renderVerticalCarousel(divId, title, prods);
		});
		return;
	}

	if (prods && prods.length > 0) {
		var context = kk.getVerticalCarouselTileTemplateContext();

		// Set the title
		context.title = title;

		// Create the carousel
		var carousel = kkvcaTemplate(context);
		$("#" + divId).html(carousel);

		// Load carousel with products
		kk.loadVerticalCarouselWithProducts(prods, context);
	}
};

/**
 * Load the vertical carousel with products
 */
kk.loadVerticalCarouselWithProducts = function(prods, context) {
	if (kkptTemplate == null) {
		kk.getTemplate("prodTile", function(t) {
			kkptTemplate = t;
			kk.loadVerticalCarouselWithProducts(prods, context);
		});
		return;
	}

	if (prods != null && prods.length > 0) {
		var listSelector = $("#" + context.id + " ul");
		for (var i = 0; i < prods.length; i++) {
			var kkProd = prods[i];
			var id = context.id + "-" + i;
			listSelector.append('<li id="' + id + '"></li>');

			var kkProdTileConfig = new Object();
			kkProdTileConfig.style = "kkpt-small";
			kkProdTileConfig.selector = $("#" + id);
			kkProdTileConfig.addHandlers = false;
			kk.renderProdTile(kkProd, kkProdTileConfig);
		}
		kk.addProdTileEventHandlers();

		// Reload carousel
		$("#" + context.id).jcarousel('reload');
	}
};

/**
 * Function for setting controls of vertical carousel
 */
kk.setVerticalControls = function(carousel, prev, next) {
	var items = carousel.jcarousel('items');
	var visible = carousel.jcarousel('visible');
	if (items[0] == visible[0]) {
		prev.removeClass('prev-items-down').addClass('prev-items-down-inactive');
	} else {
		prev.removeClass('prev-items-down-inactive').addClass('prev-items-down');
	}
	if (items[items.length - 1] == visible[visible.length - 1]) {
		next.removeClass('next-items-up').addClass('next-items-up-inactive');
	} else {
		next.removeClass('next-items-up-inactive').addClass('next-items-up');
	}
};
