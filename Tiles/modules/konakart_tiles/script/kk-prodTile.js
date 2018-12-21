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
 * JavaScript for the product and product details tiles.
 * <ul>
 * <li>product tile using the template prodTile.html</li>
 * <li>product details tile using the template prodDetailTile.htm</li>
 * </ul>
 */

var kkptTemplate = null;
var kkpdtContext = null;
var kkpdtTemplate = null;
var KK_SEARCH_IN_PRODUCT_DESCRIPTION = -99;

/**
 * Render a product tile at the given selector. If addHandlers is false we don't
 * add the event handlers since when many product tiles are rendered as a result
 * of a search or in a carousel, it is more efficient to set the handlers only
 * once.
 */
kk.renderProdTile = function(prod, config) {

	if (prod == null || config == null || config.selector == null) {
		console.log("kk.renderProdTile must be passed a product and configuration object with a valid selector");
		return;
	}

	if (kkptTemplate == null) {
		kk.getTemplate("prodTile", function(t) {
			kkptTemplate = t;
			kk.renderProdTile(prod, config);
		});
		return;
	}

	var kkptContext = kk.getProdTileTemplateContext(prod, config.style);
	if (config.style) {
		kkptContext.style = config.style;
	} else {
		kkptContext.style = "";
	}

	if (config.addToBasketEnabled != null && config.addToBasketEnabled == false) {
		kkptContext.addToBasketEnabled = false;
	} else {
		kkptContext.addToBasketEnabled = true;
	}

	if (config.wishListEnabled != null && config.wishListEnabled == false) {
		kkptContext.wishListEnabled = false;
	} else {
		kkptContext.wishListEnabled = true;
	}

	if (config.prodDetailsUrl) {
		kkptContext.prodDetailsUrl = config.prodDetailsUrl;
	} else {
		kkptContext.prodDetailsUrl = "";
	}

	if (config.title) {
		kkptContext.title = config.title;
	} else {
		kkptContext.title = "";
	}

	var prodTile = kkptTemplate(kkptContext);
	config.selector.html(prodTile);

	if (config.addHandlers != null && config.addHandlers == true) {
		kk.addProdTileEventHandlers();
	}
};

/**
 * Returns a fully populated template context for a product tiles
 */
kk.getProdTileTemplateContext = function(prod, style) {

	var kkptContext = kk.getTemplateContext();

	if (prod != null) {
		// Set the product
		kkptContext.prod = prod;

		// Product Image
		if (style && style == 'kkpt-small') {
			kkptContext.prodImage = kk.getProdImageBase(prod, kkptContext.imageBase) + "_1_small" + kk.getProdImageExtension(prod);
		} else {
			kkptContext.prodImage = kk.getProdImageBase(prod, kkptContext.imageBase) + "_1_medium" + kk.getProdImageExtension(prod);
		}
	}
	return kkptContext;
};

/**
 * Should be called after rendering all product tiles.
 */
kk.addProdTileEventHandlers = function() {

	/*
	 * Product details
	 */
	$(".kkpt-item-over").off();
	$(".kkpt-item-over").on('click', function() {
		var prodId = (this.id).split('-')[1];
		kk.renderProdDetailTile(prodId);
		return false;
	});

	$(".kkpt-item-title").off();
	$(".kkpt-item-title").on('click', function() {
		var prodId = (this.id).split('-')[1];
		kk.renderProdDetailTile(prodId);
		return false;
	});

	$(".kkpt-item-img").off();
	$(".kkpt-item-img").on('click', function() {
		var prodId = (this.id).split('-')[1];
		kk.renderProdDetailTile(prodId);
		return false;
	});

	/*
	 * Product reviews
	 */
	$(".kkpt-item-reviews").off();
	$(".kkpt-item-reviews").on('click', function() {
		var prodId = (this.id).split('-')[1];
		kk.kkptShowProductReviews(prodId);
		return false;
	});

	/*
	 * Hover effects for Add To Cart button
	 */
	$(".kkpt-item").off();
	$(".kkpt-item").on({
		mouseenter : function() {
			$(this).addClass("kkpt-item-over-container");
			$(this).find(".kkpt-item-over").show();
		},
		mouseleave : function() {
			$(this).removeClass("kkpt-item-over-container");
			$(this).find(".kkpt-item-over").hide();
		}
	});

	/*
	 * Add to Cart
	 */
	$(".kkpt-add-to-cart-button").off();
	$(".kkpt-add-to-cart-button").on('click', function() {
		var prodId = (this.id).split('-')[1];
		// We need to get the product and see whether it has options
		kkEng.getProductWithOptions(kk.getSessionId(), prodId, kk.getLangId(), kk.getFetchProdOptions(), function(result, textStatus, jqXHR) {
			var product = decodeJson(result);
			if (product != null && product.opts != null && product.opts.length > 0) {
				kk.renderProdDetailTile(prodId);
			} else {
				kk.kkptAddToCart(prodId);
			}
		}, null, kk.getKKEng());
		return false;
	});

	/*
	 * Add to Wish List
	 */
	$(".kkpt-add-to-wishlist").off();
	$(".kkpt-add-to-wishlist").on('click', function() {
		var prodId = (this.id).split('-')[1];
		// We need to get the product and see whether it has options
		kkEng.getProductWithOptions(kk.getSessionId(), prodId, kk.getLangId(), kk.getFetchProdOptions(), function(result, textStatus, jqXHR) {
			var product = decodeJson(result);
			if (product != null && product.opts != null && product.opts.length > 0) {
				kk.renderProdDetailTile(prodId);
			} else {
				kk.kkptAddToWishList(prodId);
			}
		}, null, kk.getKKEng());
		return false;
	});
};

/**
 * Worker functions
 */
kk.kkptAddToCart = function(prodId) {
	kk.addToCart(prodId, null, 1);
};

kk.kkptAddToWishList = function(prodId) {
	kk.addToWishList(prodId, null, 1);
};

kk.kkptShowProductReviews = function(prodId) {
	var config = new Object();
	config.showReviewsTab = true;
	kk.renderProdDetailTile(prodId, config);
};

/*
 * Render a product detail tile
 */

/**
 * Define the id of the div where the product detail tile will be drawn
 */
kk.setProductDetailTileDivId = function(id) {
	kk.getProdDetailTileTemplateContext();
	kkpdtContext.productDetailTileDivId = id;
};

/**
 * Returns a fully populated template context for a product tiles
 */
kk.getProdDetailTileTemplateContext = function(prod) {

	if (kkpdtContext == null) {
		kkpdtContext = kk.getTemplateContext();
	}

	if (prod != null) {
		// Set the product
		kkpdtContext.prod = prod;
		kkpdtContext.optContainers = null;

		// Create an option structure that can easily be displayed
		if (prod.opts != null && prod.opts.length > 0) {
			var optContainers = [];
			var containerMap = [];
			var optId = -1;
			var poc = null;
			for (var i = 0; i < prod.opts.length; i++) {
				var opt = prod.opts[i];
				if (opt.id != optId) {
					poc = containerMap[opt.id];
					if (poc == null) {
						// If the new id doesn't match the previous id in the
						// list and it doesn't exist in the map, it means that
						// we are starting a
						// new option and so must create a new
						// ProdOptionContainer.
						poc = new Object();
						poc.name = opt.name;
						poc.code = opt.code;
						poc.id = opt.id;
						poc.custom1 = opt.optionCustom1;
						poc.custom2 = opt.optionCustom2;
						poc.type = opt.type;
						poc.opts = [];
						optContainers.push(poc);
						containerMap[optId] = optId;
					}
				}

				// Create the option object
				var po = new Object();
				po.value = opt.value;
				po.code = opt.valueCode;
				po.id = opt.valueId;
				po.priceExTax = opt.priceExTax;
				po.priceIncTax = opt.priceIncTax;
				po.attrCustom1 = opt.attrCustom1;
				po.attrCustom2 = opt.attrCustom2;
				po.optionCustom1 = opt.optionCustom1;
				po.optionCustom2 = opt.optionCustom2;
				po.optionValCustom1 = opt.optionValCustom1;
				po.optionValCustom2 = opt.optionValCustom2;
				kk.createOptionFormattedvalues(po, opt.type);

				if (poc != null) {
					// Add option to option container
					poc.opts.push(po);
				}

				optId = opt.id;
			}
			kkpdtContext.optContainers = optContainers;
		}
	} else {
		kkpdtContext.prod = null;
		kkpdtContext.optContainers = null;
	}

	// Reset the also purchased array
	kkpdtContext.alsoPurchased = null;

	// Reset the related array
	kkpdtContext.related = null;

};

/**
 * Format the option values for display purposes
 */
kk.createOptionFormattedvalues = function(po, type) {

	var sign;
	// Variable quantity
	if (type == 1) {
		if (po.priceExTax < 0) {
			// - sign is put in by formatter
			sign = "";
		} else {
			sign = "+";
		}

		if (kk.isDisplayPriceWithTax()) {
			if (po.priceIncTax == 0) {
				po.formattedValue = po.value;
			} else {
				po.formattedValue = "(" + sign + accounting.formatMoney(po.priceIncTax) + " / " + po.value + ")";
			}
		} else {
			if (po.priceExTax == 0) {
				po.formattedValue = po.value;
			} else {
				po.formattedValue = "(" + sign + accounting.formatMoney(po.priceExTax) + " / " + po.value + ")";
			}
		}

	} else {
		if (po.priceExTax < 0) {
			// - sign is put in by formatter
			sign = "";
		} else {
			sign = "+";
		}

		if (kk.isDisplayPriceWithTax()) {
			if (po.priceIncTax == 0) {
				po.formattedValue = po.value;
			} else {
				po.formattedValue = po.value + " (" + sign + accounting.formatMoney(po.priceIncTax) + ")";
			}
		} else {
			if (po.priceExTax == 0) {
				po.formattedValue = po.value;
			} else {
				po.formattedValue = po.value + " (" + sign + accounting.formatMoney(po.priceExTax) + ")";
			}
		}
	}

};

/**
 * Render the product detail tile
 */
kk.renderProdDetailTile = function(prodId, config) {

	/*
	 * Set the product id for the case when a customer has attempted to set a
	 * product notification and was sent to the login screen. After login the
	 * product detail tile is rendered again but we've lost the product id.
	 */
	if (prodId == null && kkpdtContext != null && kkpdtContext.prod != null) {
		prodId = kkpdtContext.prod.id;
	}

	/*
	 * Redirect if the redirect URL is not null and the current URL doesn't
	 * begin with the redirect URL
	 */
	var url = kk.getProdDetailsURL(prodId);
	if (url != null && !(window.location.href.lastIndexOf(url, 0) === 0)) {
		kk.redirect(url);
		return;
	}

	if (prodId == null) {
		console.log("kk.renderProdDetailTile must be passed a product id");
		return;
	}

	// Render the product details tile
	if (kkpdtContext == null || kkpdtContext.productDetailTileDivId == null) {
		console.log(kk.getMsg("exception.render.tile", "kk.setProductDetailTileDivId", "kk.renderProdDetailTile"));
		return;
	}

	if (config != null && config.addToBasketEnabled != null && config.addToBasketEnabled == false) {
		kkpdtContext.addToBasketEnabled = false;
	} else {
		kkpdtContext.addToBasketEnabled = true;
	}

	if (config != null && config.wishListEnabled != null && config.wishListEnabled == false) {
		kkpdtContext.wishListEnabled = false;
	} else {
		kkpdtContext.wishListEnabled = true;
	}

	kkpdtContext.productNotification = false;

	if (config != null && config.showReviewsTab != null && config.showReviewsTab == true) {
		kkpdtContext.showReviewsTab = true;
	} else {
		kkpdtContext.showReviewsTab = false;
	}

	if (kk.getSessionId() != null) {
		kkEng.getProductNotificationsPerCustomerWithOptions(kk.getSessionId(), kk.getLangId(), kk.getFetchProdOptions(), function(result, textStatus,
				jqXHR) {
			var prodArray = decodeJson(result);
			if (prodArray && prodArray.length > 0) {
				for (var i = 0; i < prodArray.length; i++) {
					var prod = prodArray[i];
					if (prod.id == prodId) {
						kkpdtContext.productNotification = true;
						break;
					}
				}
			}
			kkEng.getProductWithOptions(kk.getSessionId(), prodId, kk.getLangId(), kk.getFetchProdOptions(), KKGetProductWithOptionsCallback, null,
					kk.getKKEng());
		}, null, kk.getKKEng());
	} else {
		kkEng.getProductWithOptions(kk.getSessionId(), prodId, kk.getLangId(), kk.getFetchProdOptions(), KKGetProductWithOptionsCallback, null, kk
				.getKKEng());
	}
};

/**
 * Callback after getting product details
 */
var KKGetProductWithOptionsCallback = function(result, textStatus, jqXHR) {
	if (kkpdtTemplate == null) {
		kk.getTemplate("prodDetailTile", function(t) {
			kkpdtTemplate = t;
			KKGetProductWithOptionsCallback(result, textStatus, jqXHR);
		});
		return;
	}

	var prod = decodeJson(result);

	kk.getProdDetailTileTemplateContext(prod);
	var prodDetailTile = kkpdtTemplate(kkpdtContext);
	kk.emptyBodyArea();
	$("#" + kkpdtContext.productDetailTileDivId).html(prodDetailTile);

	if (prod != null) {
		kk.setProductDetailURL(prod);
		kk.addProductDetailTileEventHandlers();
		// Get reviews
		kk.fetchAndRenderReviews(prod, "kkpdt-product-reviews");
		// Get Also purchased and related for vertical carousels
		kk.fetchAlsoPurchasedArray(kkpdtContext.prod.id, false);
		kk.fetchRelatedArray(kkpdtContext.prod.id, false);
	}
};

/**
 * Should be called after rendering the product detail tile
 */
kk.addProductDetailTileEventHandlers = function() {
	kk.getImage("");

	if ($("#kkpdt-product-reviews-tab").length) {

		// Tabs
		if ($("#kkpdt-product-reviews-tab").attr("class").indexOf("kkpdt-selected-product-content-tab") >= 0) {
			$("#kkpdt-product-description").hide();
		} else {
			$("#kkpdt-product-reviews").hide();
		}
		$("#kkpdt-product-specifications").hide();

		$("#kkpdt-product-reviews-tab").off().on('click', function() {
			$("#kkpdt-product-description-tab").removeClass("kkpdt-selected-product-content-tab");
			$("#kkpdt-product-specifications-tab").removeClass("kkpdt-selected-product-content-tab");
			$("#kkpdt-product-reviews-tab").addClass("kkpdt-selected-product-content-tab");
			$("#kkpdt-product-description").hide();
			$("#kkpdt-product-specifications").hide();
			$("#kkpdt-product-reviews").show();
		});

		$("#kkpdt-product-specifications-tab").off().on('click', function() {
			$("#kkpdt-product-description-tab").removeClass("kkpdt-selected-product-content-tab");
			$("#kkpdt-product-specifications-tab").addClass("kkpdt-selected-product-content-tab");
			$("#kkpdt-product-reviews-tab").removeClass("kkpdt-selected-product-content-tab");
			$("#kkpdt-product-description").hide();
			$("#kkpdt-product-specifications").show();
			$("#kkpdt-product-reviews").hide();
			return false;
		});

		$("#kkpdt-product-description-tab").off().on('click', function() {
			$("#kkpdt-product-description-tab").addClass("kkpdt-selected-product-content-tab");
			$("#kkpdt-product-specifications-tab").removeClass("kkpdt-selected-product-content-tab");
			$("#kkpdt-product-reviews-tab").removeClass("kkpdt-selected-product-content-tab");
			$("#kkpdt-product-description").show();
			$("#kkpdt-product-specifications").hide();
			$("#kkpdt-product-reviews").hide();
		});
	}

	/*
	 * Add to Cart
	 */
	$(".kkpdt-add-to-cart-button-big").off().on('click', function() {
		var prodId = (this.id).split('-')[1];
		var options = [];
		$(".kkpdt-opts").each(function(index) {
			var ids = ($(this).val()).split('-');
			var opt = new Object();
			opt.valueId = ids[1];
			opt.id = ids[0];
			opt.type = 0;
			options.push(opt);
		});

		var validate = true;
		$(".kkpdt-opts-1").each(function(index) {
			var ids = (this.id).split('-');
			var opt = new Object();
			opt.valueId = ids[2];
			opt.id = ids[0];
			opt.type = ids[1];
			if (opt.type == 1) {
				// TYPE_VARIABLE_QUANTITY
				var quantity = $(this).val();
				if (isNaN(quantity) || quantity == "") {
					alert(kkpdtContext.getMsg("product.details.tile.validate.qty.option"));
					validate = false;
				}
				opt.quantity = quantity;
			} else if (opt.type == 2) {
				// TYPE_CUSTOMER_PRICE
				var price = $(this).val();
				if (!$.isNumeric(price)) {
					alert(kkpdtContext.getMsg("product.details.tile.validate.price.option"));
					validate = false;
				}
				opt.customerPrice = price;
			} else if (opt.type == 3) {
				// TYPE_CUSTOMER_TEXT
				var text = $(this).val();
				if (text.length > 512) {
					alert(kkpdtContext.getMsg("product.details.tile.validate.text.option"));
					validate = false;
				}
				opt.customerText = text;
			}
			options.push(opt);
		});
		if (validate) {
			var qty = $("#kkpdt-prodQuantityId").val();
			kk.addToCart(prodId, options, qty);
		}
		return false;
	});

	/*
	 * Add / Remove Product notifications
	 */
	$(".kkpdt-remove-notification").off().on('click', function() {
		var prodId = (this.id).split('-')[1];
		kk.checkSession(function(customerId) {
			kkEng.deleteProductNotificationFromCustomer(kk.getSessionId(), prodId, function(result, textStatus, jqXHR) {
				kk.renderProdDetailTile(kkpdtContext.prod.id);
			}, null, kk.getKKEng());
		}, function() {
			kk.renderProdDetailTile();
		});
	});

	$(".kkpdt-add-notification").off().on('click', function() {
		var prodId = (this.id).split('-')[1];
		kk.checkSession(function(customerId) {
			kkEng.addProductNotificationToCustomer(kk.getSessionId(), prodId, function(result, textStatus, jqXHR) {
				kk.renderProdDetailTile(kkpdtContext.prod.id);
			}, null, kk.getKKEng());
		}, function() {
			kk.renderProdDetailTile();
		});
	});

	/*
	 * Add to wish list
	 */
	$(".kkpdt-add-to-wishlist-prod-details").off().on('click', function() {
		var prodId = (this.id).split('-')[1];
		var options = [];
		$(".kkpdt-opts").each(function(index) {
			var ids = ($(this).val()).split('-');
			var opt = new Object();
			opt.valueId = ids[1];
			opt.id = ids[0];
			opt.type = 0;
			options.push(opt);
		});
		kk.addToWishList(prodId, options, 1);
		return false;
	});
	
	/*
	 * Reviews Link
	 */
	$("#kkpdt-star-reviews-link").off().on('click', function() {
		$("#kkpdt-product-reviews-tab").click();
		return false;
	});
};

/**
 * Code for image viewer in product details panel
 */
kk.getImage = function(combinedCode) {
	
	var base = kkpdtContext.imageBase;	
	var imgNames = [];
	if (kkpdtContext.prod.images != null) {
		imgNames = kkpdtContext.prod.images.imgNames;
	}
	
	var smacount = 0;
	var smallRegExp =  new RegExp("^.*" + kkpdtContext.prod.uuid + "_" + combinedCode + "\\d+" + "_small" + ".*$");
	var bigRegExp =  new RegExp("^.*" + kkpdtContext.prod.uuid + "_" + combinedCode + "\\d+" + "_big" + ".*$");
	var smallNames = [];
	var bigNames = [];
	var numImgs = 0;
	for (var i = 0; i < imgNames.length; i++) {
		var name = imgNames[i];
		if (smallRegExp.test(name)) {
			var num = kk.getImgNumberFromName(name);
			smallNames[num] = name;
		}else if (bigRegExp.test(name)) {
			var num = kk.getImgNumberFromName(name);
			bigNames[num] = name;
			numImgs++;
		}
	}
	
	if (smallNames.length == 0 || bigNames.length == 0) {
		kk.getImage("");
		return;
	}
	
	var processed = 0;
	var galleryNav = $("#kkpdt-gallery_nav");
	var galleryOut = $("#kkpdt-gallery_output");
	for (var i = 0; i < 50; i++) {
		var smallImg = smallNames[i];
		var bigImg = bigNames[i];
		if (smallImg != null && bigImg != null) {
			galleryNav.append('<a rel="img' + i + '" href="javascript:;"><img src="' + base + smallImg + '"/></a>');
			galleryOut.append('<img id="img' + i + '" src="' + base + bigImg + '"/>');
			if (processed++ == 0) {
				/* Remove all except one we've just added. In this way the widget
				 * doesn't collapse like it would if emptied before adding new
				 * image.
				 */
				$("#kkpdt-gallery_output img").not(':last').remove();
				$("#kkpdt-gallery_nav img").not(':last').remove();		
			}
			$("#kkpdt-gallery_output img").not(":first").hide();
		}
		if (numImgs == processed) {
			break;
		}	
	}
	kk.finaliseImageGallery();	
};

/**
 * Get the image number from the image name
 */
kk.getImgNumberFromName = function(imgName) {
	var end = imgName.lastIndexOf('_');
	var start = imgName.lastIndexOf('_', end - 1);
	var imgNum = imgName.substring(start + 1, end);
	return imgNum;
};

/**
 * Code for image viewer in product details panel
 */
kk.finaliseImageGallery = function() {
	$("#kkpdt-gallery_output img").eq(0).addpowerzoom();
	$("#kkpdt-gallery a").off().on('click', function() {
		var id = "#" + this.rel;
		if ($(id).is(":hidden")) {
			$("#kkpdt-gallery_output img").slideUp();
			$(id).slideDown(function() {
				$(id).addpowerzoom();
			});
		}
		return false;
	});
};

/**
 * Option changed in product details tile
 */
kk.optionChanged = function(opt) {
	var combinedCode = opt.options[opt.selectedIndex].id;
	if (combinedCode.length > 0) {
		kk.getImage(combinedCode);
	}
};



/**
 * Fetch Also purchased products
 */
kk.fetchAlsoPurchasedArray = function(prodId, fillDescription) {

	if (kkpdtContext.alsoPurchased && kkpdtContext.alsoPurchased.length > 0) {
		kk.renderVerticalCarousel("kkpdt-also-purchased", kkpdtContext.getMsg('product.details.tile.also.purchased'), kkpdtContext.alsoPurchased);
	} else {
		var dataDesc = new DataDescriptor();
		dataDesc.limit = 9;
		dataDesc.offset = 0;
		dataDesc.orderBy = "ORDER_BY_TIMES_VIEWED";
		dataDesc.fillDescription = false;
		kkEng.getAlsoPurchasedWithOptions(kk.getSessionId(), dataDesc, prodId, kk.getLangId(), kk.getFetchProdOptions(/*getImages*/false), function(result, textStatus,
				jqXHR) {
			var prodArray = decodeJson(result);
			kkpdtContext.alsoPurchased = prodArray;
			if (kkpdtContext.alsoPurchased && kkpdtContext.alsoPurchased.length > 0) {
				kk.renderVerticalCarousel("kkpdt-also-purchased", kkpdtContext.getMsg('product.details.tile.also.purchased'), prodArray);
			}
		}, null, kk.getKKEng());
	}
};

/**
 * Fetch related products
 */
kk.fetchRelatedArray = function(prodId, fillDescription) {

	if (kkpdtContext.related && kkpdtContext.related.length > 0) {
		kk.renderVerticalCarousel("kkpdt-related", kkpdtContext.getMsg('product.details.tile.related'), kkpdtContext.related);
	} else {
		var dataDesc = new DataDescriptor();
		dataDesc.limit = 9;
		dataDesc.offset = 0;
		dataDesc.orderBy = "ORDER_BY_TIMES_VIEWED";
		dataDesc.fillDescription = false;
		kkEng.getRelatedProductsWithOptions(kk.getSessionId(), dataDesc, prodId, 0, kk.getLangId(), kk.getFetchProdOptions(/*getImages*/false), function(result,
				textStatus, jqXHR) {
			var products = decodeJson(result);
			kkpdtContext.related = products.productArray;
			if (kkpdtContext.related && kkpdtContext.related.length > 0) {
				kk.renderVerticalCarousel("kkpdt-related", kkpdtContext.getMsg('product.details.tile.related'), kkpdtContext.related);
			}
		}, null, kk.getKKEng());
	}
};

/**
 * Sets the SEO URL for product detail
 */
kk.setProductDetailURL = function(prod) {
	// Need category tree for SEO
	if (kkpsContext == null) {
		kk.getProductsTileTemplateContext();
	}
	if (kkpsContext.catTree == null) {
		kk.getCategoryTree(function() {
			kk.setProductDetailURL(prod);
		});
		return;
	}
	var control = new Object();
	if (prod != null) {
		control.prodId = prod.id;
		kk.getSEOCategories(control, prod.categoryId);
		control.manu = prod.manufacturerName;
		control.prodName = prod.name;
		control.prodModel = prod.model;
		kk.setURL("productDetail", control);
	}
};

/**
 * Returns the category hierarchy for SEO purposes
 */
kk.getSEOCategories = function(control, catId) {
	var cat = kkpsContext.catMap[catId];
	if (cat == null) {
		control.catIds = [];
		control.catNames = [];
		return;
	}
	var catIds = [ catId ];
	var catNames = [ cat.name ];
	while (cat.parentId != 0) {
		cat = kkpsContext.catMap[cat.parentId];
		catIds.push(cat.id);
		catNames.push(cat.name);
	}
	control.catIds = catIds;
	control.catNames = catNames;
};

/**
 * Can be customized to set various options especially the catalog id used for
 * getting catalog prices and quantities
 */
kk.getFetchProdOptions = function(getImages) {
	var options = new Object();
	// Faster if we don't have to look up stock for all products in bundle
	options.calcQuantityForBundles = false;
	options.getImages = kkGetProdImages;
	if (getImages != null && getImages == false) {
		options.getImages = false;
	}
	if (typeof kkCatalogId != 'undefined') {
		options.catalogId = kkCatalogId;
		options.useExternalPrice = kkUseExternalPrice;
		options.useExternalQuantity = kkUseExternalQuantity;
	}
	return options;
};
