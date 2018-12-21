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

/*
 *------------------------------------------------------------
 * CONFIGURATION VARIABLES THAT MAY BE MODIFIED
 *------------------------------------------------------------
 */

/*
 * The root URL of the KonaKart server engine.
 * The value can be changed depending on where KonaKart is running.
 */
var kkRoot = 'http://localhost:8780/konakart/';
//var kkRoot = 'http://www.konakart.com/konakart/';

/*
 * URL for product details page . {prodId} is substituted with the product id.
 * Set to null to use JavaScript page.
 */
// var kkProdDetailsURL = kkRoot + "SelectProd.action?prodId={prodId}";
var kkProdDetailsURL = null;

/*
 * URL for the manage cart page. Set to null to use JavaScript page.
 */
// var kkManageCartURL = kkRoot + "ShowCartItems.action";
var kkManageCartURL = null;

/*
 * URL for the manage wishlist page. Set to null to use JavaScript page.
 */
// var kkManageWishlistURL = kkRoot + "ShowWishListItems.action";
var kkManageWishlistURL = null;

/*
 * URL for the checkout page. Set to null to use JavaScript page.
 */
// var kkCheckoutURL = kkRoot + "Checkout.action";
var kkCheckoutURL = null;

/*
 * Define the configuration object used to instantiate a KonaKart engine which
 * is used to make the JSON calls to the server engine. The mode in which the
 * server engine is running is defined by the properties file of that engine.
 */
var kkConf = new engineConfig(kkRoot + 'konakartjson');
kkConf.storeId = "store1";
kkConf.protocol = 'jsonp';

/*
 * Define the configuration object used to instantiate a KonaKart engine which
 * is used to make the JSON calls to the custom server engine. The mode in which the
 * server engine is running is defined by the properties file of that engine.
 */
var kkConfCustom = new engineConfig(kkRoot + 'konakartjsoncss');
kkConfCustom.storeId = "store1";
kkConfCustom.protocol = 'jsonp';

/*
 * Image base is used to display images from the KK store-front application
 */
var kkImgBase = kkRoot + "images/";

/*
 * This is required when you have different images based on product options.
 * e.g. A blue shirt image and a green shirt image.
 */
var kkGetProdImages = true;

/*
 * Determines whether prices are displayed with or without tax
 */
var kkDisplayPriceWithTax = false;

/*
 * Determines whether to display the coupon entry field
 */
var kkDisplayCouponEntry = true;

/*
 * Determines whether to display the gift certificate entry field
 */
var kkDisplayGiftCertificateEntry = true;

/*
 * Send an eMail on order confirmation
 */
var kkSendOrderConfirmationMail = true;

/*
 * Set to true if the Solr search engine is enabled. If set to null, the value
 * will be read from a KonaKart configuration parameter.
 */
var kkSolrEnabled = null;

/*
 * The stock warn level for a product
 */
var kkQuantityWarn = 5;

/*
 * The version of the KonaKart server software. If set to null it is looked up.
 * It should be in the format "7.4.0.0".
 */
var kkVersion = null;

/*
 * Properties to determine whether we enable login through Facebook, Google plus
 * and Liferay SSO. When set to null the values are set by reading configuration
 * variables. If you aren't using them then for performance reasons it's best to
 * set them to false.
 */
var kkAllowFacebookLogin = null;
var kkAllowGooglePlusLogin = null;
var kkAllowLiferaySSO = null;

/*
 * -----------------------Catalog Pricing----------------------
 */
/*
 * Leave commented out if not using catalog pricing
 */
// var kkCatalogId = "cat1";
// var kkUseExternalPrice = true;
// var kkUseExternalQuantity = false;
/*
 * -----------------------I18N---------------------------------
 */

/*
 * Default language locale
 */
var KK_DEFAULT_LOCALE = "en_GB";

/*
 * Default ISO currency code
 */
var KK_DEFAULT_CURRENCY_CODE = "USD";

/*
 * Default store country (3 digit ISO code)
 */
var KK_DEFAULT_COUNTRY_CODE = "USA";

/*
 * Used when registering customers for missing information
 */
var KK_DEFAULT_STRING = "-";
var KK_DEFAULT_DOB_YEAR = "1800";

/*
 * Name of email template
 */
var KK_NEW_PASSWORD_TEMPLATE = "EmailNewPassword";

/*
 * -----------------------Global Objects and Variables --------------
 */

/*
 * Global KK object
 */
var kk = new Object();

/*
 * Instantiate a KonaKart engine using the configuration defined in
 * kk-configure.js
 */
var kkEngine = new kkEng(kkConf);

/*
 * Instantiate a custom KonaKart engine using the configuration defined in
 * kk-configure.js
 */
var kkEngineCustom = new kkEng(kkConfCustom);

/*
 * Session id when logged in
 */
var kkSessionId = null;

/*
 * Session check interval
 */
var SESSION_CHECK_MILLIS = 10 * 60 * 1000;

/*
 * CustomerId from cookie when not logged in
 */
var kkCustomerId = null;

/*
 * Language variables
 */
var polyglot = null;
var kkMsgMap = new Object();
var kkLocale = KK_DEFAULT_LOCALE;
var kkLangId = -1;

/*
 * Currency Variables
 */
var kkCurrencyMap = new Object();
var kkCurrencyCode = KK_DEFAULT_CURRENCY_CODE;

/*
 * KK Constants for product searches
 */
var KK_SEARCH_ALL = -100;
var KK_SEARCH_IN_PRODUCT_DESCRIPTION = -99;

/*
 * KK Order Status constants
 */
var KK_PENDING_STATUS = 1;
var KK_PROCESSING_STATUS = 2;
var KK_DELIVERED_STATUS = 3;
var KK_WAITING_PAYMENT_STATUS = 4;
var KK_PAYMENT_RECEIVED_STATUS = 5;
var KK_PAYMENT_DECLINED_STATUS = 6;
var KK_PARTIALLY_DELIVERED_STATUS = 7;
var KK_CANCELLED_STATUS = 8;
var KK_REFUND_APPROVED_STATUS = 9;
var KK_REFUND_DECLINED_STATUS = 10;

/*
 * KK Payment Types
 */
// Cash on delivery
var KK_COD = 1;
// Pay through a payment gateway using the gateway UI
var KK_BROWSER_PAYMENT_GATEWAY = 2;
// Pay through a payment gateway using the KonaKart UI
var KK_SERVER_PAYMENT_GATEWAY = 3;
// Pay through a payment gateway using the gateway UI in an iFrame
var KK_BROWSER_IN_FRAME_PAYMENT_GATEWAY = 4;

/*
 * KK Cookie that stores the temp customer id
 */
var KK_CUSTOMER_ID = "KK_CUSTOMER_ID";

/*
 * KK Cookie that stores the session id
 */
var KK_SESSION_ID = "KK_SESSION_ID";
var KK_SESSION_TIME = "KK_SESSION_TIME";

/*
 * Template constants
 */
var TEMPLATE_ROOT = "template/";
var TEMPLATE_EXT = ".html";