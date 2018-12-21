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
 * JavaScript for tiles to read and write reviews.They are:
 * <ul>
 * <li>read reviews tile using the template reviewsTile.html</li>
 * <li>write review tile using the template writeReviewTile.html</li>
 * </ul>
 */

var kkrtContext = null;
var kkrtTemplate = null;
var kkwrtTemplate = null;

/**
 * Returns a fully populated template context for a reviews tiles
 */
kk.getReviewsTileTemplateContext = function() {

	if (kkrtContext == null) {
		kkrtContext = kk.getTemplateContext();
		/*
		 * For paging reviews
		 */
		kkrtContext.totalNumRevs = 0;
		kkrtContext.numRevs = 0;
		kkrtContext.showNext = false;
		kkrtContext.showBack = false;
		kkrtContext.currentPage = 1;
		kkrtContext.pageList = null;
		// 5,10,15,20
		kkrtContext.maxRevsPerPage = 5;
		kkrtContext.currentRevs = null;
		kkrtContext.numPages = 0;
		kkrtContext.maxPagesToShow = 5;

		// Set the data descriptor
		var dataDesc = new DataDescriptor();
		dataDesc.limit = kkrtContext.maxRevsPerPage + 1;
		dataDesc.offset = 0;
		dataDesc.orderBy = "ORDER_BY_DATE_ADDED_DESCENDING";
		kkrtContext.dataDesc = dataDesc;
	}

};

/**
 * Method to fetch and render
 */
kk.fetchAndRenderReviews = function(prod, divId) {

	if (prod == null || divId == null) {
		console.log("kk.fetchAndRenderReviews must be passed a product and a div id");
		return;
	}

	kk.getReviewsTileTemplateContext();
	kkrtContext.reviewsDivId = divId;
	kkrtContext.prod = prod;
	kk.setRevDataDescOffset("navStart");
	kkrtContext.searchRating = -1;
	kkrtContext.scrollTop = 0;

	var search = new Object();
	search.productId = kkrtContext.prod.id;
	search.rating = -1;

	kkEng.getReviews(kkrtContext.dataDesc, search, KKGetReviewsCallback, null, kk.getKKEng());
};

/**
 * Method to navigate reviews
 */
kk.navigateReviews = function(rating) {

	kkrtContext.showReviewsTab = true;
	kkrtContext.scrollTop = $(window).scrollTop();

	var search = new Object();
	search.productId = kkrtContext.prod.id;
	if (!rating) {
		search.rating = kkrtContext.searchRating;
	} else if (rating == kkrtContext.searchRating) {
		kkrtContext.searchRating = -1;
		search.rating = -1;
	} else {
		kkrtContext.searchRating = rating;
		search.rating = rating;
	}

	kkEng.getReviews(kkrtContext.dataDesc, search, KKGetReviewsCallback, null, kk.getKKEng());
};

/**
 * Callback after getting reviews
 */
var KKGetReviewsCallback = function(result, textStatus, jqXHR) {
	if (kkrtTemplate == null) {
		kk.getTemplate("reviewsTile", function(t) {
			kkrtTemplate = t;
			KKGetReviewsCallback(result, textStatus, jqXHR);
		});
		return;
	}
	var reviews = decodeJson(result);
	kk.setControlsFromReviews(reviews);
	kkrtContext.reviews = reviews.reviewArray;
	var reviewsTile = kkrtTemplate(kkrtContext);
	$("#" + kkrtContext.reviewsDivId).html(reviewsTile);
	kk.addReviewsTileEventHandlers();
	$(window).scrollTop(kkrtContext.scrollTop);
};

/**
 * Should be called after rendering the reviews tile
 */
kk.addReviewsTileEventHandlers = function() {

	$(".kkrt-pagination-element.kkrt-previous-items").off().on('click', function() {
		var fetchMore = kk.setRevDataDescOffset("navBack");
		if (fetchMore && kkrtContext.prod != null) {
			kk.navigateReviews();
		}
		return false;
	});

	$(".kkrt-pagination-element.kkrt-next-items").off().on('click', function() {
		var fetchMore = kk.setRevDataDescOffset("navNext");
		if (fetchMore && kkrtContext.prod != null) {
			kk.navigateReviews();
		}
		return false;
	});

	$(".kkrt-pagination-element.kkrt-page-num").off().on('click', function() {
		var page = (this.id).split('-')[1];
		var fetchMore = kk.setRevDataDescOffset(page);
		if (fetchMore && kkrtContext.prod != null) {
			kk.navigateReviews();
		}
		return false;
	});

	$(".kkrt-review-meter-rating").off().on('click', function() {
		var rating = (this.id).split('-')[1];
		kk.setRevDataDescOffset("navStart");
		kk.navigateReviews(rating);
		return false;
	});

	$(".kkrt-write-review-button").off().on('click', function() {
		var prodId = (this.id).split('-')[1];
		kk.renderWriteReviewTile(prodId);
		return false;
	});

};

/**
 * Sets the controls required to display the reviews
 */
kk.setControlsFromReviews = function(reviews) {

	kkrtContext.currentRevs = (reviews.reviewArray == null) ? new Array() : reviews.reviewArray;
	kkrtContext.numRevs = (kkrtContext.currentRevs.length > kkrtContext.maxRevsPerPage) ? kkrtContext.maxRevsPerPage
			: kkrtContext.currentRevs.length;
	kkrtContext.totalNumRevs = reviews.totalNumReviews;
	kkrtContext.numPages = kkrtContext.totalNumRevs / kkrtContext.maxRevsPerPage;
	if (kkrtContext.totalNumRevs % kkrtContext.maxRevsPerPage != 0) {
		kkrtContext.numPages++;
	}
	kkrtContext.numPages = Math.floor(kkrtContext.numPages);
	kkrtContext.currentPage = Math.floor(kkrtContext.dataDesc.offset / kkrtContext.maxRevsPerPage) + 1;
	kk.getReviewPages();
	kk.setReviewBackAndNext();
	kk.createRatingFacets(reviews);
};

/**
 * Get an array of pages to show
 */
kk.getReviewPages = function() {
	kkrtContext.pageList = new Array();

	// Ensure that currentPage is valid
	if (kkrtContext.currentPage > kkrtContext.numPages) {
		kkrtContext.currentPage = kkrtContext.numPages;
	}

	if (kkrtContext.currentPage < 1) {
		kkrtContext.currentPage = 1;
	}

	// Need to show at least 3 pages
	if (kkrtContext.maxPagesToShow < 3) {
		kkrtContext.maxPagesToShow = 3;
	}

	// ensure that we need to show an odd number of pages
	if (kkrtContext.maxPagesToShow % 2 == 0) {
		kkrtContext.maxPagesToShow++;
	}

	var pagesEitherSide = Math.floor(kkrtContext.maxPagesToShow / 2);

	// Add pages before current page
	for (var i = pagesEitherSide; i > 0; i--) {
		kkrtContext.pageList.push(kkrtContext.currentPage - i);
	}

	// Add current page
	kkrtContext.pageList.push(kkrtContext.currentPage);

	// Add pages after current page
	for (var i = 0; i < pagesEitherSide; i++) {
		kkrtContext.pageList.push(kkrtContext.currentPage + (i + 1));
	}

	// If page numbers are < 1 remove them from start of list and add to end
	while (kkrtContext.pageList[0] < 1) {
		var max = kkrtContext.pageList[kkrtContext.pageList.length - 1];
		kkrtContext.pageList.shift();
		if (max < kkrtContext.numPages) {
			kkrtContext.pageList.push(max + 1);
		}
	}

	// If page numbers are > max allowed remove them from end of list and add to
	// start
	while (kkrtContext.pageList.length > 0
			&& kkrtContext.pageList[kkrtContext.pageList.length - 1] > kkrtContext.numPages) {
		kkrtContext.pageList.pop();
		if (kkrtContext.pageList.length > 0 && kkrtContext.pageList[0] > 1) {
			kkrtContext.pageList.splice(0, 0, kkrtContext.pageList[0] - 1);
		}
	}
};

/**
 * Called when a new set of reviews has been fetched in order to correctly set
 * the back and next buttons
 */
kk.setReviewBackAndNext = function() {

	// We always attempt to fetch back maxRows + 1
	if (kkrtContext.currentRevs.length > kkrtContext.maxRevsPerPage) {
		kkrtContext.showNext = 1;
	} else {
		kkrtContext.showNext = 0;
	}
	if (kkrtContext.dataDesc.offset > 0) {
		kkrtContext.showBack = 1;
	} else {
		kkrtContext.showBack = 0;
	}
};

/**
 * Act on navigation actions
 */
kk.setRevDataDescOffset = function(action) {

	var fetchMore = true;

	var requestedPage = -1;
	if (!isNaN(action)) {
		requestedPage = action;
	}

	if (action == "navStart") {
		kkrtContext.dataDesc.offset = 0;
		kkrtContext.currentPage = 1;
	} else if (action == "navNext") {
		if (kkrtContext.dataDesc.offset + kkrtContext.maxRevsPerPage < kkrtContext.totalNumRevs) {
			kkrtContext.dataDesc.offset += kkrtContext.maxRevsPerPage;
			kkrtContext.currentPage = (kkrtContext.dataDesc.offset / kkrtContext.maxRevsPerPage) + 1;
		} else {
			fetchMore = false;
		}
	} else if (action == "navBack") {
		if (kkrtContext.dataDesc.offset == 0) {
			fetchMore = false;
		} else {
			kkrtContext.dataDesc.offset -= kkrtContext.maxRevsPerPage;
			if (kkrtContext.dataDesc.offset < 0) {
				kkrtContext.dataDesc.offset = 0;
			}
			kkrtContext.currentPage = (kkrtContext.dataDesc.offset / kkrtContext.maxRevsPerPage) + 1;
		}
	} else if (requestedPage > 0) {
		if (requestedPage == kkrtContext.currentPage) {
			fetchMore = false;
		} else {
			kkrtContext.dataDesc.offset = kkrtContext.maxRevsPerPage * (requestedPage - 1);
			kkrtContext.currentPage = requestedPage;
		}
	} else if (requestedPage <= 0) {
		kkrtContext.dataDesc.offset = 0;
		kkrtContext.currentPage = 1;
	}

	return fetchMore;
};

/**
 * Reviews page size
 */
kk.changeReviewsPageSize = function(id) {
	var size = $("#" + id).val();
	kkrtContext.maxRevsPerPage = +size;
	kkrtContext.dataDesc.limit = kkrtContext.maxRevsPerPage + 1;
	kk.setRevDataDescOffset("navStart");
	kk.navigateReviews();
};

/**
 * Reviews sort by
 */
kk.changeReviewsSortBy = function(id) {
	var sortBy = $("#" + id).val();
	kkrtContext.dataDesc.orderBy = sortBy;
	kk.setRevDataDescOffset("navStart");
	kk.navigateReviews();
};

/**
 * Method that create facets from the review data
 */
kk.createRatingFacets = function(reviews) {

	var qFacets = [ -1, -1, -1, -1, -1 ];
	var pFacets = [ -1, -1, -1, -1, -1 ];

	if (reviews.ratingFacets != null) {
		var totalRevs = 0;
		for (var i = 0; i < reviews.ratingFacets.length; i++) {
			var nn = reviews.ratingFacets[i];
			totalRevs += nn.number;
		}

		var index = 0;
		for (var i = 0; i < reviews.ratingFacets.length; i++) {
			var nn = reviews.ratingFacets[i];
			index = nn.name - 1;
			qFacets[index] = nn.number;
			// pFacets[index] = (int) Math.round((100.0 * nn.getNumber()) /
			// totalRevs);
			pFacets[index] = Math.round((100.0 * nn.number) / totalRevs);
		}
		for (var i = 0; i < qFacets.length; i++) {
			if (qFacets[i] == -1) {
				qFacets[i] = 0;
			}
			if (pFacets[i] == -1) {
				pFacets[i] = 0;
			}
		}
	}
	kkrtContext.ratingQuantity = qFacets;
	kkrtContext.ratingPercentage = pFacets;

};

/*
 * Write reviews
 */

/**
 * Define the id of the div for the write review tile
 */
kk.setWriteReviewTileDivId = function(id) {
	kk.getReviewsTileTemplateContext();
	kkrtContext.writeReviewTileDivId = id;
};

/**
 * Render the write review tile
 */
kk.renderWriteReviewTile = function(prodId) {
	kk.checkSession(function(customerId) {
		if (kkwrtTemplate == null) {
			kk.getTemplate("writeReviewTile", function(t) {
				kkwrtTemplate = t;
				kk.renderWriteReviewTile();
			});
			return;
		}
		kk.setURL("writeReview");
		if (kkrtContext == null || kkrtContext.writeReviewTileDivId == null) {
			console.log(kk.getMsg("exception.render.tile", "kk.setWriteReviewTileDivId", "kk.renderWriteReviewTile"));
			return;
		}
		if (kkrtContext.prod == null) {
			console.log("Cannot open Write Review panel since product hasn't been defined");
			return;
		}

		var writeReviewtTile = kkwrtTemplate(kkrtContext);
		kk.emptyBodyArea();
		$("#" + kkrtContext.writeReviewTileDivId).html(writeReviewtTile);
		kk.addWriteReviewTileEventHandlers();
	}, function() {
		kk.renderWriteReviewTile();
	});
};

/**
 * Add the event handlers for the write review tile
 */
kk.addWriteReviewTileEventHandlers = function() {
	$('#kk-review-submit').off().on('click', function() {
		$('#kk-write-review-form').submit();
		return false;
	});

	$('#kk-write-review-form').submit(function() {
		kk.writeReviewSubmit();
		return false;
	});

	$('#kk-write-review-back').off().on('click', function() {
		var config = new Object();
		config.showReviewsTab = true;
		kk.renderProdDetailTile(kkrtContext.prod.id, config);
		return false;
	});
};

/**
 * Submit the review
 */
kk.writeReviewSubmit = function() {

	if (kkrtContext.prod == null) {
		console.log("Cannot save a review product hasn't been defined");
		return;
	}

	kk.checkSession(function(customerId) {
		var val = $('#kk-write-review-form').validate(validationRules).form();
		if (val) {
			var text = kk.escape($('#kkReviewText').val());
			var rev = new Object();
			rev.rating = $("input[name=kkRating]:checked").val();
			rev.reviewText = text;
			rev.productId = kkrtContext.prod.id;
			rev.languageId = kk.getLangId();
			rev.customerId = customerId;
			kkEng.writeReview(kk.getSessionId(), rev, function(result, textStatus, jqXHR) {
				decodeJson(result);
				var config = new Object();
				config.showReviewsTab = true;
				kk.renderProdDetailTile(kkrtContext.prod.id, config);
			}, null, kk.getKKEng());

		}
	}, function() {
		kk.renderWriteReviewTile();
	});
};
