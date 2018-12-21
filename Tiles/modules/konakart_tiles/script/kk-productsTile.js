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
 * JavaScript for the tiles used to search for and filter products. They are:
 * <ul>
 * <li>products tile (displaying a grid of products) using the template
 * productsTile.html</li>
 * <li>facets tile using the template facetsTile.html</li>
 * <li>the menu tile (displaying the top level categories) using the template
 * catMenuTile.html</li>
 * <li>search tile using the template searchTile.html</li>
 * </ul>
 */

var kkpsContext = null;
var kkpsTemplate = null;
var kkpsFacetsTemplate = null;
var kkpsCatMenuTemplate = null;
var kkpsSearchTemplate = null;
var kkManuMap = new Object();

$(function() {
	$(window).resize(function() {
		kk.layoutItems();
	});
});

/**
 * Renders the facets tile
 */
kk.renderFacetsTile = function() {
	if (kkpsFacetsTemplate == null) {
		kk.getTemplate("facetsTile", function(t) {
			kkpsFacetsTemplate = t;
			kk.renderFacetsTile();
		});
		return;
	}
	if (kkpsContext == null || kkpsContext.facetsDivId == null) {
		console.log(kk.getMsg("exception.render.tile", "kk.setFacetsTileDivId", "kk.renderFacetsTile"));
		return;
	}
	var facetsArea = kkpsFacetsTemplate(kkpsContext);
	$("#" + kkpsContext.facetsDivId).html(facetsArea);
	kk.addFacetsTileEventHandlers();
};

/**
 * Renders the search tile
 */
kk.renderSearchTile = function() {
	if (kkpsSearchTemplate == null) {
		kk.getTemplate("searchTile", function(t) {
			kkpsSearchTemplate = t;
			kk.renderSearchTile();
		});
		return;
	}
	if (kkpsContext == null || kkpsContext.searchDivId == null) {
		console.log(kk.getMsg("exception.render.tile", "kk.setSearchTileDivId", "kk.renderSearchTile"));
		return;
	}

	if (kkSolrEnabled == null) {
		kkEng.getConfigurationValueAsBool("USE_SOLR_SEARCH", false, function(result, textStatus, jqXHR) {
			var useSolr = decodeJson(result);
			kkSolrEnabled = useSolr;
			kkpsContext.useSolr = kkSolrEnabled;
			kk.renderSearchTilePrivate();
		}, null, kk.getKKEng());
	} else {
		kkpsContext.useSolr = kkSolrEnabled;
		kk.renderSearchTilePrivate();
	}
};

/**
 * Renders the search tile after receiving configuration data
 */
kk.renderSearchTilePrivate = function() {
	if (kkpsContext.catTree == null) {
		kk.getCategoryTree(kk.renderSearchTilePrivate);
		return;
	}
	var searchArea = kkpsSearchTemplate(kkpsContext);
	$("#" + kkpsContext.searchDivId).html(searchArea);
	kk.addSearchTileEventHandlers();
};

/**
 * Renders the category menu tile
 */
kk.renderCategoryMenuTile = function(force) {
	if (kkpsCatMenuTemplate == null) {
		kk.getTemplate("catMenuTile", function(t) {
			kkpsCatMenuTemplate = t;
			kk.renderCategoryMenuTile();
		});
		return;
	}
	if (kkpsContext.catTree == null || (force != null && force == true)) {
		kk.getCategoryTree(kk.renderCategoryMenuTile);
		return;
	}
	if (kkpsContext == null || kkpsContext.catMenuDivId == null) {
		console.log(kk.getMsg("exception.render.tile", "kk.setCatMenuTileDivId", "kk.renderCategoryMenuTile"));
		return;
	}
	var catMenuArea = kkpsCatMenuTemplate(kkpsContext);
	$("#" + kkpsContext.catMenuDivId).html(catMenuArea);
	kk.addCatMenuTileEventHandlers();
	kk.sizeMenu();
};

/**
 * Sizes the Category menu to fit the width
 */
kk.sizeMenu = function() {

	var width = $("#"+kkpsContext.catMenuDivId).width() - 2;

	// reset width and unwrap items from extra divs
	// calculate menuLineWidth
	var menuLineWidth = 0;
	var numItems = 0;
	var itemPadding = 14;
	var itemMarginRight = 5;
	$("#"+kkpsContext.catMenuDivId+" a").each(function(index) {
		var item = $(this);
		item.css('width', 'auto');
		item.css('margin-right', itemMarginRight + 'px');
		var widthPlusPadding = item.width() + itemPadding;
		item.width(widthPlusPadding);
		menuLineWidth += widthPlusPadding + itemMarginRight;
		numItems++;
		var parent = item.parent();
		if (parent.hasClass('kkcm-menu-line')) {
			item.unwrap();
		}
	});

	// Adjust for last item
	menuLineWidth -= itemMarginRight;

	if (numItems == 0) {
		return;
	}

	var numLines = Math.ceil(menuLineWidth / width);
	var itemsPerLine = Math.ceil(numItems / numLines);

	// Create arrays of items and widths for each line
	var total = 0;
	var lineIndex = 0;
	var itemCount = 0;
	var itemArray = new Array();
	var lineArray = new Array();
	var widthArray = new Array();
	$("#"+kkpsContext.catMenuDivId+" a").each(function(index) {
		var item = $(this);
		var w = item.width() + itemMarginRight;
		itemCount++;

		if (total + w - itemMarginRight > width || itemCount > itemsPerLine) {
			total -= itemMarginRight;
			widthArray[itemArray.length] = total;
			total = w;
			itemArray[itemArray.length] = lineArray;
			lineArray = new Array();
			lineIndex = 0;
			lineArray[lineIndex++] = item;
			itemCount = 1;
		} else {
			total += w;
			lineArray[lineIndex++] = item;
		}
	});
	if (lineArray.length > 0) {
		total -= itemMarginRight;
		widthArray[itemArray.length] = total;
		itemArray[itemArray.length] = lineArray;
	}

	// Surround each line with a div
	var index = 0;
	for ( var i = 0; i < itemArray.length; i++) {
		lineArray = itemArray[i];
		$("#"+kkpsContext.catMenuDivId+" a").slice(index, index + lineArray.length).wrapAll(
				'<div class="kkcm-menu-line"></div>');
		index = index + lineArray.length;
	}

	// Pad lines out to same width
	for ( var i = 0; i < itemArray.length; i++) {
		lineArray = itemArray[i];
		var totalExtra = width - widthArray[i];
		var singleExtra = Math.floor((totalExtra / itemArray[i].length));
		var countExtra = 0;
		for ( var j = 0; j < lineArray.length; j++) {
			var widget = lineArray[j];
			if (j == lineArray.length - 1) {
				widget.css('margin-right', '0px');
				var w = widget.width();
				var extra = totalExtra - countExtra;
				widget.width(w + extra);
			} else {
				var w = widget.width();
				var extra = singleExtra;
				widget.width(w + extra);
			}
			countExtra += singleExtra;
		}
	}
};

/**
 * Returns a fully populated template context for a products tile
 */
kk.getProductsTileTemplateContext = function() {

	if (kkpsContext == null) {
		kkpsContext = kk.getTemplateContext();

		/*
		 * Give the area a unique random id since there may be more than one on
		 * a page
		 */
		kkpsContext.id = "ps" + Math.floor((Math.random() * 10000) + 1);

		// Set attributes
		kkpsContext.totalNumProds = 0;
		kkpsContext.numProds = 0;
		kkpsContext.showNext = false;
		kkpsContext.showBack = false;
		kkpsContext.currentPage = 1;
		kkpsContext.pageList = null;
		// 8,12,16,20,24,28
		kkpsContext.maxProdsPerPage = 8;
		kkpsContext.currentProds = null;
		kkpsContext.numPages = 0;
		kkpsContext.maxPagesToShow = 5;
		kkpsContext.productsDivId = null;
		kkpsContext.numSelectedFilters = 0;
		kkpsContext.catMap = null;
		kkpsContext.tagMap = null;
		kkpsContext.catTree = null;

		// Set the data descriptor
		var dataDesc = new DataDescriptor();
		dataDesc.limit = kkpsContext.maxProdsPerPage + 1;
		dataDesc.offset = 0;
		dataDesc.orderBy = "ORDER_BY_TIMES_VIEWED_DESCENDING";
		kkpsContext.dataDesc = dataDesc;

		// Set the product search object
		var prodSearch = new ProductSearch();
		kkpsContext.prodSearch = prodSearch;
		kkpsContext.prodSearch.returnCategoryFacets = true;
		kkpsContext.prodSearch.returnManufacturerFacets = true;
	}
};

/**
 * Load and cache the category tree
 */
kk.getCategoryTree = function(callback) {
	if (kkVersion == null || kkVersion.length == 0) {
		kkEng.getKonaKartVersion(function(result, textStatus, jqXHR) {
			kkVersion = decodeJson(result);
			kk.getCategoryTreePrivate(callback);
		}, null, kk.getKKEng());
	} else {
		kk.getCategoryTreePrivate(callback);
	}
};


/**
 * Load and cache the category tree after getting the version
 */
kk.getCategoryTreePrivate = function(callback) {
	kkEng.getCategoryTreeWithOptions(kk.getCategoryTreeOptions(), function(result, textStatus, jqXHR) {
		var catTree = decodeJson(result);
		kkpsContext.catMap = new Object();
		kk.addCatsToMap(null, catTree);
		kkpsContext.catTree = catTree;
		if (callback) {
			callback();
		}
	}, null, kk.getKKEng());
};

/**
 * Save categories
 */
kk.addCatsToMap = function(parent, cats) {
	if (cats != null) {
		for (var i = 0; i < cats.length; i++) {
			var cat = cats[i];
			if (cat != null) {
				if (cat.children != null) {
					kk.addCatsToMap(cat, cat.children);
				}
				cat.parent = parent;
				kkpsContext.catMap[cat.id] = cat;
			}
		}
	}
};

/*
 * Define the id of the div where the products tile will be drawn
 */
kk.setProductsTileDivId = function(id) {
	kk.getProductsTileTemplateContext();
	kkpsContext.productsDivId = id;
};

/*
 * Define the id of the div where the facets tile will be drawn
 */
kk.setFacetsTileDivId = function(id) {
	kk.getProductsTileTemplateContext();
	kkpsContext.facetsDivId = id;
};

/*
 * Define the id of the div where the category menu tile will be drawn
 */
kk.setCatMenuTileDivId = function(id) {
	kk.getProductsTileTemplateContext();
	kkpsContext.catMenuDivId = id;
};

/*
 * Define the id of the div where the search tile will be drawn
 */
kk.setSearchTileDivId = function(id) {
	kk.getProductsTileTemplateContext();
	kkpsContext.searchDivId = id;
};

/*
 * Get the KK products and render them
 */
kk.fetchAndRenderProducts = function() {
	if (kkpsContext == null || kkpsContext.productsDivId == null) {
		console.log(kk.getMsg("exception.render.tile", "kk.setProductsTileDivId", "kk.fetchAndRenderProducts"));
		return;
	}
	if (kkpsContext.catTree == null) {
		kk.getCategoryTree(kk.fetchAndRenderProductsPrivate);
	} else {
		kk.fetchAndRenderProductsPrivate();
	}
};

/**
 * Called when we have fetched the category tree
 */
kk.fetchAndRenderProductsPrivate = function() {
	kk.setProductsURL("products");
	if (kkpsContext == null || kkpsContext.productsDivId == null) {
		console.log(kk.getMsg("exception.render.tile", "kk.setProductsTileDivId", "kk.fetchAndRenderProducts"));
		return;
	}
	// Reset price filters
	kkpsContext.prodSearch.priceFrom = null;
	kkpsContext.prodSearch.priceTo = null;

	if (kkpsContext.prodSearch.categoryId > 0) {
		// Need to get the tag groups
		var options = new Object();
		options.populateTags = false;
		kkEng.getTagGroupsPerCategoryWithOptions(kkpsContext.prodSearch.categoryId, kk.getLangId(), options, function(result, textStatus, jqXHR) {
			var tagGroups = decodeJson(result);
			if (tagGroups.length > 0 && kkSolrEnabled) {
				kkpsContext.prodSearch.tagGroups = tagGroups;
				kkpsContext.prodSearch.returnCustomFacets = true;
			} else {
				kkpsContext.prodSearch.tagGroups = null;
				kkpsContext.prodSearch.returnCustomFacets = false;
			}

			kk.doProductSearch(null, kkpsContext.dataDesc, kkpsContext.prodSearch, kk.getLangId(), KKSearchForProductsCallback, null, kk.getKKEng());
		}, options, kk.getKKEng());
	} else {
		kk.doProductSearch(kk.getSessionId(), kkpsContext.dataDesc, kkpsContext.prodSearch, kk.getLangId(), KKSearchForProductsCallback, null, kk
				.getKKEng());
	}
};

/**
 * Filter the current products
 */
kk.filterAndRenderProducts = function() {
	if (kkpsContext == null || kkpsContext.productsDivId == null) {
		console.log(kk.getMsg("exception.render.tile", "kk.setProductsTileDivId", "kk.filterAndRenderProducts"));
		return;
	}
	kk.setProductsURL("filterProducts");
	kk.doProductSearch(null, kkpsContext.dataDesc, kkpsContext.prodSearch, kk.getLangId(), KKSearchForProductsCallback, null, kk.getKKEng());
};

/**
 * Perform the search after reading whether Solr is enabled
 */
kk.doProductSearch = function(sessionId, dataDesc, prodSearch, languageId, callback, context, eng) {
	if (kkSolrEnabled == null) {
		kkEng.getConfigurationValueAsBool("USE_SOLR_SEARCH", false, function(result, textStatus, jqXHR) {
			var useSolr = decodeJson(result);
			kkSolrEnabled = useSolr;
			kkpsContext.useSolr = kkSolrEnabled;
			kkpsContext.prodSearch.forceUseSolr = kkSolrEnabled;
			kkEng.searchForProductsWithOptions(sessionId, dataDesc, prodSearch, languageId, kk.getFetchProdOptions(/*getImages*/false), callback, context, eng);
		}, null, kk.getKKEng());
	} else {
		kkpsContext.useSolr = kkSolrEnabled;
		kkpsContext.prodSearch.forceUseSolr = kkSolrEnabled;
		kkEng.searchForProductsWithOptions(sessionId, dataDesc, prodSearch, languageId, kk.getFetchProdOptions(/*getImages*/false), callback, context, eng);
	}
};

/**
 * Callback from productSearch API call
 */
var KKSearchForProductsCallback = function(result, textStatus, jqXHR) {
	if (kkpsTemplate == null) {
		kk.getTemplate("productsTile", function(t) {
			kkpsTemplate = t;
			KKSearchForProductsCallbackPrivate(result, textStatus, jqXHR);
		});
		return;
	} else {
		KKSearchForProductsCallbackPrivate(result, textStatus, jqXHR);
	}
};

/**
 * Callback from the normal callback once we've ensured that we have the
 * template
 */
var KKSearchForProductsCallbackPrivate = function(result, textStatus, jqXHR) {

	kk.emptyBodyArea();
	// Clear search entry
	kk.clearSearchEntry();
	var products = decodeJson(result);
	if (products.productArray != null && products.productArray.length == 0) {
		// Try to get some spelling suggestions
		var options = new Object();
		options.languageCode = kk.getLangCode();
		options.searchText = kkpsContext.prodSearch.searchText;
		kkEng.getSuggestedSpellingItems(kk.getSessionId(), options, function(result, textStatus, jqXHR) {
			var items = decodeJson(result);
			if (items.length > 0) {
				kkpsContext.whatToShow = "suggestions";
			} else {
				kkpsContext.whatToShow = "nodata";
			}

			var productsArea = kkpsTemplate(kkpsContext);
			$("#" + kkpsContext.productsDivId).html(productsArea);

			// Write the spelling suggestions to the tile
			if (items.length > 0) {
				var listSelector = $("#" + kkpsContext.id + " ul");
				for (var i = 0; i < items.length; i++) {
					var item = items[i];
					listSelector.append('<li class="kkps-spelling-suggestion">' + item.suggestion + '</li>');
				}

				// Add the event handler
				$(".kkps-spelling-suggestion").off().on('click', function() {
					kk.resetSearchFilters();
					kkpsContext.prodSearch.searchText = $(this).text();
					kkpsContext.prodSearch.whereToSearch = KK_SEARCH_IN_PRODUCT_DESCRIPTION;
					kk.fetchAndRenderProducts();
					return false;
				});
			}
		}, null, kk.getKKEng());
	} else if (products == null || products.length == 0) {
		kkpsContext.whatToShow = "nodata";
		var productsArea = kkpsTemplate(kkpsContext);
		$("#" + kkpsContext.productsDivId).html(productsArea);
	} else {
		kkpsContext.whatToShow = "tiles";
		kk.setControlsFromProducts(products);
		kk.setFacetsFromProducts(products);

		var productsArea = kkpsTemplate(kkpsContext);
		$("#" + kkpsContext.productsDivId).html(productsArea);
		kk.addProductsTileEventHandlers();

		if (kkpsContext.facetsDivId != null) {
			kk.renderFacetsTile();
		}

		// Load product area with products
		kk.loadPoductAreaWithProducts();
	}
};

/**
 * Sets the context with facet information based on the result
 */
kk.setFacetsFromProducts = function(products) {

	if (kkpsContext.prodSearch.categoryId > 0) {
		var selectedCat = kkpsContext.catMap[kkpsContext.prodSearch.categoryId];
		kkpsContext.cats = kk.getCatMenuListFromSelectedCat(selectedCat, true);
	} else {
		// Create a category menu from facets returned by Solr
		kkpsContext.cats = kk.getCatMenuList(products.categoryFacets);
	}
	// kkpsContext.cats = kk.getCatMenuList(products.categoryFacets);
	kkpsContext.manus = products.manufacturerFacets;

	// Set min and max prices
	kkpsContext.prodSearch.priceFrom = products.minPrice;
	kkpsContext.prodSearch.priceTo = products.maxPrice;

	// Create an array of tag groups from the custom facets
	if (products.customFacets != null && products.customFacets.length > 0) {

		// Put all selected tags and facet constraints in a map
		var selectedTagMap = new Object();
		var facetConstraintMap = new Object();
		if (kkpsContext.prodSearch.tagGroups != null) {
			for (var i = 0; i < kkpsContext.prodSearch.tagGroups.length; i++) {
				var tg = kkpsContext.prodSearch.tagGroups[i];
				if (tg.facetConstraints != null) {
					facetConstraintMap[tg.name] = tg.facetConstraints;
				}
				if (tg.tags != null) {
					for (var j = 0; j < tg.tags.length; j++) {
						var t = tg.tags[j];
						if (t.selected == true) {
							selectedTagMap[tg.name + '-' + t.name] = "";
						}
					}
				}
			}
		}

		kkpsContext.tagMap = new Object();
		var tagId = 0;
		kkpsContext.prodSearch.tagGroups = [];
		for (var i = 0; i < products.customFacets.length; i++) {
			var facet = products.customFacets[i];
			var tg = new Object();
			tg.id = i;
			tg.name = facet.name;
			tg.facetNumber = facet.number;
			var facetConstraints = facetConstraintMap[tg.name];
			tg.facetConstraints = facetConstraints;
			if (facet.values != null && facet.values.length > 0) {
				var tags = [];
				for (var j = 0; j < facet.values.length; j++) {
					var nm = facet.values[j];
					var tag = new Object();
					tag.id = tagId++;
					tag.name = nm.name;
					tag.numProducts = nm.number;
					if (selectedTagMap[tg.name + '-' + tag.name] != null) {
						tag.selected = true;
					}
					kkpsContext.tagMap[tag.id] = tag;
					tags[j] = tag;
				}
				tg.tags = tags;
			}
			kkpsContext.prodSearch.tagGroups[i] = tg;
		}
	} else {
		kkpsContext.prodSearch.tagGroups = null;
		kkpsContext.tagMap = null;
	}

};

/**
 * Method that creates a new category menu list for an array of selected
 * categories which may be returned as facets after a search. It displays the
 * categories and the parent hierarchy. It doesn't display the siblings or the
 * children
 */
kk.getCatMenuList = function(catArray) {
	if (catArray == null || catArray.length == 0) {
		return null;
	}

	var menuList = null;
	for (var i = catArray.length - 1; i > -1; i--) {
		var cat = catArray[i];
		var added = false;
		if (menuList == null) {
			menuList = kk.getCatMenuListFromSelectedCat(cat, /* getChildren */false);
		} else {
			var newList = kk.getCatMenuListFromSelectedCat(cat,/* getChildren */false);
			// Traverse new menu from child to parent
			for (var j = newList.length - 1; j > -1; j--) {
				var newCat = newList[j];
				// Determine whether cat exists in menuList
				for (var k = 0; k < menuList.length; k++) {
					var menuCat = menuList[k];
					if (menuCat.id == newCat.id) {
						// If we find a match we add all cats downstream from
						// match
						var index = k + 1;
						if (newList.length >= j + 2) {
							for (var l = j + 1; l < newList.length; l++) {
								var catToAdd = newList[l];
								menuList.splice(index++, 0, catToAdd);
							}
						}
						added = true;
						break;
					}
				}
				/*
				 * Break if added otherwise try next in the menu
				 */
				if (added) {
					break;
				}
			}
			if (!added) {
				for (var m = 0; m < newList.length; m++) {
					var catToAdd = newList[m];
					menuList.push(catToAdd);
				}
			}

		}
	}
	return menuList;
};

/**
 * Method that creates a new category menu list for a selected category. It
 * displays the children of that category, itself and the parent hierarchy. It
 * doesn't display the siblings.
 * 
 */
kk.getCatMenuListFromSelectedCat = function(selectedCat, getChildren) {

	if (selectedCat == null) {
		return null;
	}

	// Save the numProds and then get a category from tree that has hierarchy
	var numProds = selectedCat.numberOfProducts;
	selectedCat = kkpsContext.catMap[selectedCat.id];

	var catMenuList = [];
	if (selectedCat != null) {
		if (selectedCat.parent == null) {
			var cat = kk.cloneCatForMenuList(selectedCat);
			cat.level = 0;
			cat.numberOfProducts = numProds;
			if (getChildren == true) {
				cat.selected = true;
			}
			catMenuList.push(cat);
		} else {
			var tmpList = [];
			var topCat = selectedCat;
			tmpList.push(topCat);
			while (topCat.parent != null) {
				topCat = topCat.parent;
				tmpList.push(topCat);
			}
			var j = 0;
			for (var i = tmpList.length - 1; i > -1; i--) {
				var cat = kk.cloneCatForMenuList(tmpList[i]);
				var level = j++;
				getCatMenuListFromSelectedCat = level;
				catMenuList.push(cat);
				if (i == 0) {
					if (getChildren == true) {
						cat.selected = true;
					}
					cat.numberOfProducts = numProds;
				} else {
					cat.numberOfProducts = -1;
				}
			}
		}
		if (selectedCat.children != null && getChildren) {
			for (var i = 0; i < selectedCat.children.length; i++) {
				var cat = selectedCat.children[i];
				catMenuList.push(kk.cloneCatForMenuList(cat));
			}
		}
	}

	return catMenuList;
};

/**
 * Clone a category to add to the menu list
 */
kk.cloneCatForMenuList = function(catIn) {
	var catOut = new Object();
	catOut.children = catIn.children;
	catOut.id = catIn.id;
	catOut.image = catIn.image;
	catOut.name = catIn.name;
	catOut.numberOfProducts = catIn.numberOfProducts;
	catOut.parentId = catIn.parentId;
	catOut.sortOrder = catIn.sortOrder;
	catOut.parent = catIn.parent;
	catOut.level = catIn.level;
	catOut.custom1 = catIn.custom1;
	catOut.custom2 = catIn.custom2;
	catOut.custom3 = catIn.custom3;
	catOut.invisible = catIn.invisible;
	catOut.description = catIn.description;
	catOut.miscItems = catIn.miscItems;
	return catOut;
};

/**
 * Sets the controls required to display the products
 */
kk.setControlsFromProducts = function(products) {

	kkpsContext.currentProds = (products.productArray == null) ? new Array() : products.productArray;
	kkpsContext.numProds = (kkpsContext.currentProds.length > kkpsContext.maxProdsPerPage) ? kkpsContext.maxProdsPerPage
			: kkpsContext.currentProds.length;
	kkpsContext.totalNumProds = products.totalNumProducts;
	kkpsContext.numPages = kkpsContext.totalNumProds / kkpsContext.maxProdsPerPage;
	if (kkpsContext.totalNumProds % kkpsContext.maxProdsPerPage != 0) {
		kkpsContext.numPages++;
	}
	kkpsContext.numPages = Math.floor(kkpsContext.numPages);
	kkpsContext.currentPage = Math.floor(kkpsContext.dataDesc.offset / kkpsContext.maxProdsPerPage) + 1;
	kk.getProductPages();
	kk.setProductBackAndNext();
};

/**
 * Get an array of pages to show
 */
kk.getProductPages = function() {
	kkpsContext.pageList = new Array();

	// Ensure that currentPage is valid
	if (kkpsContext.currentPage > kkpsContext.numPages) {
		kkpsContext.currentPage = kkpsContext.numPages;
	}

	if (kkpsContext.currentPage < 1) {
		kkpsContext.currentPage = 1;
	}

	// Need to show at least 3 pages
	if (kkpsContext.maxPagesToShow < 3) {
		kkpsContext.maxPagesToShow = 3;
	}

	// ensure that we need to show an odd number of pages
	if (kkpsContext.maxPagesToShow % 2 == 0) {
		kkpsContext.maxPagesToShow++;
	}

	var pagesEitherSide = Math.floor(kkpsContext.maxPagesToShow / 2);

	// Add pages before current page
	for (var i = pagesEitherSide; i > 0; i--) {
		kkpsContext.pageList.push(kkpsContext.currentPage - i);
	}

	// Add current page
	kkpsContext.pageList.push(kkpsContext.currentPage);

	// Add pages after current page
	for (var i = 0; i < pagesEitherSide; i++) {
		kkpsContext.pageList.push(kkpsContext.currentPage + (i + 1));
	}

	// If page numbers are < 1 remove them from start of list and add to end
	while (kkpsContext.pageList[0] < 1) {
		var max = kkpsContext.pageList[kkpsContext.pageList.length - 1];
		kkpsContext.pageList.shift();
		if (max < kkpsContext.numPages) {
			kkpsContext.pageList.push(max + 1);
		}
	}

	// If page numbers are > max allowed remove them from end of list and add to
	// start
	while (kkpsContext.pageList.length > 0 && kkpsContext.pageList[kkpsContext.pageList.length - 1] > kkpsContext.numPages) {
		kkpsContext.pageList.pop();
		if (kkpsContext.pageList.length > 0 && kkpsContext.pageList[0] > 1) {
			kkpsContext.pageList.splice(0, 0, kkpsContext.pageList[0] - 1);
		}
	}
};

/**
 * Called when a new set of products has been fetched in order to correctly set
 * the back and next buttons
 */
kk.setProductBackAndNext = function() {

	// We always attempt to fetch back maxRows + 1
	if (kkpsContext.currentProds.length > kkpsContext.maxProdsPerPage) {
		kkpsContext.showNext = 1;
	} else {
		kkpsContext.showNext = 0;
	}
	if (kkpsContext.dataDesc.offset > 0) {
		kkpsContext.showBack = 1;
	} else {
		kkpsContext.showBack = 0;
	}
};

/**
 * Layout the items in a grid, spacing them out evenly.
 */
kk.layoutItems = function() {
	var width = $(".kkps-items").width();
	var tile = $(".kkpt-item:first");
	if (tile.length) {

		var tileTotalWidth = 180;
		if (width < 440) {
			tileTotalWidth = 150;
		}

		var numItems = Math.floor(width / tileTotalWidth);
		var extra = width - (numItems * tileTotalWidth);
		var extraPerItem = Math.floor(extra / numItems);

		var extraLeft = Math.ceil(extraPerItem / 2);
		if (extraLeft > 0) {
			extraLeft -= 1;
		}
		var extraRight = Math.floor(extraPerItem / 2);

		$(".kkps-items li").each(function(index) {
			var item = $(this);
			item.css("margin-left", extraLeft + 'px');
			item.css("margin-right", extraRight + 'px');
			item.width(tileTotalWidth);
		});
	}
};

/**
 * Load the product area with products
 */
kk.loadPoductAreaWithProducts = function() {

	if (kkptTemplate == null) {
		kk.getTemplate("prodTile", function(t) {
			kkptTemplate = t;
			kk.loadPoductAreaWithProducts();
		});
		return;
	}

	if (kkpsContext.currentProds != null && kkpsContext.currentProds.length > 0) {
		var listSelector = $("#" + kkpsContext.id + " ul");
		for (var i = 0; i < kkpsContext.numProds; i++) {
			var kkProd = kkpsContext.currentProds[i];
			var id = kkpsContext.id + "-" + i;
			listSelector.append('<li id="' + id + '"></li>');

			var kkProdTileConfig = new Object();
			kkProdTileConfig.style = null;
			kkProdTileConfig.selector = $("#" + id);
			kkProdTileConfig.addHandlers = false;
			kk.renderProdTile(kkProd, kkProdTileConfig);
		}
		kk.addProdTileEventHandlers();

		kk.layoutItems();
	}
};

/**
 * Event handlers
 */
kk.addProductsTileEventHandlers = function() {

	$(".kkps-pagination-element.kkps-previous-items").off().on('click', function() {
		var fetchMore = kk.setProdDataDescOffset("navBack");
		if (fetchMore) {
			kk.filterAndRenderProducts();
		}
		return false;
	});

	$(".kkps-pagination-element.kkps-next-items").off().on('click', function() {
		var fetchMore = kk.setProdDataDescOffset("navNext");
		if (fetchMore) {
			kk.filterAndRenderProducts();
		}
		return false;
	});

	$(".kkps-pagination-element.kkps-page-num").off().on('click', function() {
		var page = (this.id).split('-')[1];
		var fetchMore = kk.setProdDataDescOffset(page);
		if (fetchMore) {
			kk.filterAndRenderProducts();
		}
		return false;
	});
};

/**
 * Event handlers
 */
kk.addFacetsTileEventHandlers = function() {

	$(".kkft-cat").off().on('click', function() {
		var catId = (this.id).split('-')[1];
		kk.resetSearchFilters();
		kkpsContext.prodSearch.categoryId = catId;
		kk.fetchAndRenderProducts();
		return false;
	});

	$(".kkft-manu").off().on('click', function() {
		var manuId = (this.id).split('-')[1];
		kk.setProdDataDescOffset("navStart");
		if (manuId == kkpsContext.prodSearch.manufacturerId) {
			kkpsContext.prodSearch.manufacturerId = KK_SEARCH_ALL;
			kkpsContext.numSelectedFilters--;
		} else {
			kkpsContext.prodSearch.manufacturerId = manuId;
			kkpsContext.numSelectedFilters++;
		}
		kk.filterAndRenderProducts();
		return false;
	});

	$(".kkft-tag").off().on('click', function() {
		var tagId = (this.id).split('-')[1];
		kk.setProdDataDescOffset("navStart");
		var tag = kkpsContext.tagMap[tagId];
		if (tag != null) {
			if (tag.selected) {
				tag.selected = false;
				kkpsContext.numSelectedFilters--;
			} else {
				tag.selected = true;
				kkpsContext.numSelectedFilters++;
			}
		}

		// Set the tag group filters
		if (kkpsContext.prodSearch.tagGroups != null) {
			for (var i = 0; i < kkpsContext.prodSearch.tagGroups.length; i++) {
				var tg = kkpsContext.prodSearch.tagGroups[i];
				if (tg != null && tg.tags != null) {
					tg.facetConstraint = null;
					tg.facetConstraints = null;
					var constraintList = [];
					for (var j = 0; j < tg.tags.length; j++) {
						var tag = tg.tags[j];
						if (tag != null && tag.selected) {
							constraintList.push(tag.name);
						}
					}
					if (constraintList.length > 0) {
						tg.facetConstraints = constraintList;
					} else {
						tg.facetConstraints = null;
					}
				}
			}
		}

		kk.filterAndRenderProducts();
		return false;
	});

	$("#kkft-remove-all").off().on('click', function() {
		kkpsContext.numSelectedFilters = 0;
		kkpsContext.prodSearch.manufacturerId = KK_SEARCH_ALL;
		kk.setProdDataDescOffset("navStart");
		kk.fetchAndRenderProducts();
		return false;
	});

};

/**
 * Event handlers
 */
kk.addCatMenuTileEventHandlers = function() {
	$(".kkcm-menu-item").off().on('click', function() {
		var catId = (this.id).split('-')[1];
		kk.selectCategory(catId);
		return false;
	});
};

/**
 * Select category
 */
kk.selectCategory = function(catId) {
	kk.resetSearchFilters();
	kkpsContext.prodSearch.categoryId = catId;
	kk.fetchAndRenderProducts();
	return false;
};

/**
 * Event handlers
 */
kk.addSearchTileEventHandlers = function() {
	$("#kkst-search-button").off().on('click', function() {
		kk.resetSearchFilters();
		kkpsContext.prodSearch.searchText = $("#kkst-search-input").val();
		kkpsContext.prodSearch.whereToSearch = KK_SEARCH_IN_PRODUCT_DESCRIPTION;
		var topLevelCategoryId = $("#kkst-top-cat-list").val();
		if (topLevelCategoryId != null && topLevelCategoryId > 0) {
			kkpsContext.prodSearch.categoryId = topLevelCategoryId;
			kkpsContext.prodSearch.searchInSubCats = true;
		}
		if (kkpsContext.prodSearch.searchText != null && kkpsContext.prodSearch.searchText.length > 0) {
			kk.fetchAndRenderProducts();
		}
		return false;
	});
};

/**
 * Called when slider is moved and then released
 */
kk.filterByPrice = function(min, max) {
	kkpsContext.prodSearch.priceFrom = min;
	kkpsContext.prodSearch.priceTo = max;
	kkpsContext.numSelectedFilters++;
	kk.filterAndRenderProducts();
	return false;
};

/**
 * Set the new offsets
 */
kk.setProdDataDescOffset = function(action) {

	var fetchMore = true;

	var requestedPage = -1;
	if (!isNaN(action)) {
		requestedPage = action;
	}

	if (action == "navStart") {
		kkpsContext.dataDesc.offset = 0;
		kkpsContext.currentPage = 1;
	} else if (action == "navNext") {
		if (kkpsContext.dataDesc.offset + kkpsContext.maxProdsPerPage < kkpsContext.totalNumProds) {
			kkpsContext.dataDesc.offset += kkpsContext.maxProdsPerPage;
			kkpsContext.currentPage = (kkpsContext.dataDesc.offset / kkpsContext.maxProdsPerPage) + 1;
		} else {
			fetchMore = false;
		}
	} else if (action == "navBack") {
		if (kkpsContext.dataDesc.offset == 0) {
			fetchMore = false;
		} else {
			kkpsContext.dataDesc.offset -= kkpsContext.maxProdsPerPage;
			if (kkpsContext.dataDesc.offset < 0) {
				kkpsContext.dataDesc.offset = 0;
			}
			kkpsContext.currentPage = (kkpsContext.dataDesc.offset / kkpsContext.maxProdsPerPage) + 1;
		}
	} else if (requestedPage > 0) {
		if (requestedPage == kkpsContext.currentPage) {
			fetchMore = false;
		} else {
			kkpsContext.dataDesc.offset = kkpsContext.maxProdsPerPage * (requestedPage - 1);
			kkpsContext.currentPage = requestedPage;
		}
	} else if (requestedPage <= 0) {
		kkpsContext.dataDesc.offset = 0;
		kkpsContext.currentPage = 1;
	}

	return fetchMore;
};

/**
 * Change page size
 */
kk.changeProductsPageSize = function(id) {
	var size = $("#" + id).val();
	kkpsContext.maxProdsPerPage = +size;
	kkpsContext.dataDesc.limit = kkpsContext.maxProdsPerPage + 1;
	kkpsContext.dataDesc.offset = 0;
	kk.filterAndRenderProducts();
	return false;
};

/**
 * Change sort by
 */
kk.changeProductsSortBy = function(id) {
	var sortBy = $("#" + id).val();
	kkpsContext.dataDesc.orderBy = sortBy;
	kkpsContext.dataDesc.offset = 0;
	kk.filterAndRenderProducts();
	return false;
};

/**
 * Reset the search filters
 */
kk.resetSearchFilters = function() {
	kkpsContext.prodSearch.categoryId = KK_SEARCH_ALL;
	kkpsContext.prodSearch.manufacturerId = KK_SEARCH_ALL;
	kkpsContext.prodSearch.searchText = null;
	kk.setProdDataDescOffset("navStart");
	kkpsContext.numSelectedFilters = 0;
};

/**
 * Clears the search entry input area
 */
kk.clearSearchEntry = function() {
	$("#kkst-search-input").val("");
};

/**
 * Called by search tile
 */
kk.search = function(key, text) {

	kk.resetSearchFilters();

	if (key != null && key.length > 0) {
		var keyArray = key.split(',');
		if (keyArray.length == 3) {
			var manuId = keyArray[1];
			var catId = keyArray[2];
			if (catId > -1 && manuId > -1) {
				// Search category and manufacturer
				kkpsContext.prodSearch.manufacturerId = manuId;
				kkpsContext.prodSearch.categoryId = catId;
			} else if (catId > -1) {
				// Search cat
				kkpsContext.prodSearch.categoryId = catId;
			} else if (manuId > -1) {
				// Search manufacturer
				kkpsContext.prodSearch.manufacturerId = manuId;
			} else {
				// Search based on text
				kkpsContext.prodSearch.searchText = text;
				kkpsContext.prodSearch.whereToSearch = KK_SEARCH_IN_PRODUCT_DESCRIPTION;
			}

			kk.fetchAndRenderProducts();
		}
	} else if (text != null && text.length > 0) {
		kkpsContext.prodSearch.searchText = text;
		kkpsContext.prodSearch.whereToSearch = KK_SEARCH_IN_PRODUCT_DESCRIPTION;
		var topLevelCategoryId = $("#kkst-top-cat-list").val();
		if (topLevelCategoryId != null && topLevelCategoryId > 0) {
			kkpsContext.prodSearch.categoryId = topLevelCategoryId;
			kkpsContext.prodSearch.searchInSubCats = true;
		}
		kk.fetchAndRenderProducts();
	}
};

/**
 * Called by search tile
 */
kk.processTermResult = function(result, rich) {
	if (result == null || result.length == 0 || (result.indexOf("&") == -1)) {
		return result;
	}
	result = unescape(result);
	if (rich) {
		/*
		 * If the search string ends in ampersand, solr will split &amp; to
		 * highlight just the & char.
		 */
		result = result.replace("</b>" + "amp;", "</b>");
	}
	return result;
};

/**
 * Sets the SEO URL for products
 */
kk.setProductsURL = function(route) {
	// Need category tree for SEO
	if (kkpsContext.catTree == null) {
		kk.getCategoryTree(function() {
			kk.setProductsURL(route);
		});
		return;
	}

	var control = new Object();
	if (kkpsContext.prodSearch != null) {
		if (kkpsContext.prodSearch.categoryId != null && kkpsContext.prodSearch.categoryId > 0) {
			kk.getSEOCategories(control, kkpsContext.prodSearch.categoryId);
		}
		if (kkpsContext.prodSearch.searchText != null && kkpsContext.prodSearch.searchText.length > 0) {
			control.search = kkpsContext.prodSearch.searchText;
		}
		if (kkpsContext.prodSearch.manufacturerId != null && kkpsContext.prodSearch.manufacturerId > 0) {
			var manu = kkManuMap[kkpsContext.prodSearch.manufacturerId];
			if (manu == null) {
				kkEng.getManufacturer(kkpsContext.prodSearch.manufacturerId, kk.getLangId(), function(result, textStatus, jqXHR) {
					var manu = decodeJson(result);
					if (manu != null && manu.name != null) {
						control.manu = manu.name;
					}
					kk.setURL(route, control);
				}, null, kk.getKKEng());
			} else {
				control.manu = manu.name;
			}
		}
		kk.setURL(route, control);
	}
};

/**
 * Can be customized to set various options
 */
kk.getCategoryTreeOptions = function() {
	
	var options = new Object();
	options.getProductCounts = true;
	options.languageId = kk.getLangId();
	
	if (kkVersion != null) {
		var verNumbers = kkVersion.split("\.");
		if (verNumbers.length == 4) {
			if (verNumbers[0] >= 7 && verNumbers[1] >= 4) {
				var prodOptions = kk.getFetchProdOptions();
				if (prodOptions != null) {
					options.catalogId = prodOptions.catalogId;
				}
			}
		} else {
			console.log("KonaKart version " + kkVersion + " is not in the correct format.");
		}
	}
	
	return options;
};
