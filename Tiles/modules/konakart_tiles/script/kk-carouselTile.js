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
 * JavaScript for the horizontal carousel tile using the template
 * carouselTile.html
 */

var kkcaTemplate = null;

/**
 * Returns a fully populated template context for a carousel tiles
 */
kk.getCarouselTileTemplateContext = function() {

	var context = kk.getTemplateContext();
	context.width = 180;
	context.widthSmall = 150;
	context.breakpointSmall = 440;

	// Give the carousel a unique random id since there may be more than one on
	// a page
	context.id = "jc" + Math.floor((Math.random() * 10000) + 1);
	return context;
};

/**
 * Renders a carousel at the given position with the given products
 */
kk.renderCarousel = function(divId, title, prods) {

	if (kkcaTemplate == null) {
		kk.getTemplate("carouselTile", function(t) {
			kkcaTemplate = t;
			kk.renderCarousel(divId, title, prods);
		});
		return;
	}

	if (prods && prods.length > 0) {
		var context = kk.getCarouselTileTemplateContext();

		// Set the title
		context.title = title;

		var carousel = kkcaTemplate(context);
		$("#" + divId).html(carousel);

		// Load carousel with products
		kk.loadCarouselWithProducts(prods, context);
	}
};

/**
 * Load the carousel with products
 */
kk.loadCarouselWithProducts = function(prods, context) {

	if (kkptTemplate == null) {
		kk.getTemplate("prodTile", function(t) {
			kkptTemplate = t;
			kk.loadCarouselWithProducts(prods, context);
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
			kkProdTileConfig.style = null;
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
 * Function for setting controls of horizontal carousel
 */
kk.setCarouselControls = function(carousel, prev, next) {
	var items = carousel.jcarousel('items');
	var visible = carousel.jcarousel('visible');
	if (items[0] == visible[0]) {
		prev.removeClass('prev-items').addClass('prev-items-inactive');
	} else {
		prev.removeClass('prev-items-inactive').addClass('prev-items');
	}
	if (items[items.length - 1] == visible[visible.length - 1]) {
		next.removeClass('next-items').addClass('next-items-inactive');
	} else {
		next.removeClass('next-items-inactive').addClass('next-items');
	}
};
