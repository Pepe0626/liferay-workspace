/*
 (c) 2015 DS Data Systems UK Ltd, All rights reserved.
*/
var kkTmplMap = {
        accountTile: '<h3 id="kk-page-title"><%=getMsg("account.tile.myaccountinfo")%></h3><div class="kk-content-area kk-rounded-corners"><div id="kk-error"></div><div id="kk-message"></div><div id="kkat-column-left"><div id="personal-info" class="kkat-area"><div class="kkat-area-header"><h3><%=getMsg("account.tile.primary.address")%></h3></div><div class="kkat-area-content"><%if (addresses != null && addresses.length > 0){ %><%if (kk.isNoAddress()){ %><%=customer.emailAddr %><br/><a  id="kk-first-addr" class="kkat-text-link"><%=getMsg("account.tile.add.addr")%></a><%} else {%><%=removeCData(addresses[0].formattedAddress)%><br/><br/><%=customer.emailAddr %><br/><%=customer.telephoneNumber %><% } %><% } %></div></div><%if (downloads != null && downloads.length > 0){ %><div id="kkat-downloads" class="kkat-area"><div class="kkat-area-header"><h3><%=getMsg("account.tile.downloads")%></h3></div><table><% for (var i = 0; i < downloads.length; i++){ %><% var download = downloads[i];%><%if (download.product != null) {%><tr><td ><%=download.product.name%></td><td ><%=download.product.model%></td><td ><%=getMsg("account.tile.downloaded",download.timesDownloaded)%></td><%if (download.expirationDate != null){ %><td  width="80"><%=formatDate(download.expirationDate)%></td><%}%><td  align="right"><span class="kkat-download kk-button-small kk-small-rounded-corners" id=\'<%="kkat-"+download.id%>\'><%=getMsg("account.tile.download")%></span></td></tr><%}%><%}%></table></div><% } %><%if (orders != null && orders.length > 0){ %><div id="kkat-last-orders" class="kkat-area"><div class="kkat-area-header"><h3><%=getMsg("account.tile.last.orders")%></h3><a id="kkat-all-orders" class="kkat-option kkat-text-link"><%=getMsg("account.tile.showallorders")%></a></div><% for (var i = 0; i < orders.length; i++){ %><% var order = orders[i];%><% var numItems = (order.orderProducts!=null)?order.orderProducts.length:0;%><% var statusClass = (order.statusText!=null&&order.statusText.toUpperCase() == "DELIVERED")?"kkat-shipped":"kkat-pending";%><div class="kkat-last-order"><table><tbody><tr><td>#<%=order.id%></td><td><%=formatDate(order.datePurchased)%></td><td><%=getMsg("account.tile.total")%>: <%=formatMoney(order.totalIncTax)%></td><td><div class="kkat-label <%=statusClass%>"><%=order.statusText%></div></td><td class="kkat-last-order-icons"><a class="kkat-view-order kkat-text-link fa fa-eye kkat-order-action" title=\'<%=getMsg("account.tile.view")%>\' id=\'<%="kkat-"+order.id%>\' href=\'#\'></a><a class="kkat-repeat-order kkat-text-link fa fa-repeat kkat-order-action" title=\'<%=getMsg("account.tile.repeat")%>\' id=\'<%="kkat-"+order.id%>\' href=\'#\'></a><a class="kkat-track-order kkat-text-link fa fa-truck kkat-order-action" title=\'<%=getMsg("account.tile.track")%>\' id=\'<%="kkat-"+order.id%>\' href=\'#\'></a><a class="kkat-invoice-order kkat-text-link fa fa-file-pdf-o kkat-order-action" title=\'<%=getMsg("account.tile.invoice")%>\' id=\'<%="kkat-"+order.id%>\' href=\'#\'></a></td></tr></tbody><%if (order.orderProducts != null && order.orderProducts.length > 0){ %><tr><td colspan="8"><table><thead><tr><td class="kkat-wide-col"><%=getMsg("account.tile.item")%></td><td class="kkat-narrow-col kk-right"><%=getMsg("account.tile.quantity")%></td><td class="kkat-narrow-col kk-right"><%=getMsg("account.tile.total")%></td></tr></thead><tbody><% for (var j = 0; j < order.orderProducts.length; j++){ %><% var orderProd = order.orderProducts[j];%><tr><td><a class="kkat-order-item-link kkat-text-link" id=\'<%="kkat-"+orderProd.productId%>\' href=\'#\'><%=orderProd.name%></a></td><td class="kk-right"><%=orderProd.quantity%></td><%if (displayPriceWithTax) {%><td class="kk-right"><%=formatMoney(orderProd.finalPriceIncTax)%></td><%} else {%><td class="kk-right"><%=formatMoney(orderProd.finalPriceExTax)%></td><%}%></tr><% } %></tbody></table></td></tr><% } %></table></div><% } %></div><% } %></div><%if (customer != null && customer.type != 2) { %><div id="kkat-column-right"><div id="addressbook" class="kkat-area"><h3><%=getMsg("account.tile.personal.information")%></h3><div class="kkat-area-content"><%if (loginType != null && (loginType==\'GOOGLEPLUS\' || loginType==\'FACEBOOK\')){ %><a  id="kk-send-password" class="kkat-text-link"><%=getMsg("account.tile.sendpassword")%></a><% } %><a  id="kk-manage-email" class="kkat-text-link"><%=getMsg("account.tile.changeemail")%></a><a  id="kk-manage-password" class="kkat-text-link"><%=getMsg("account.tile.changepassword")%></a><a  id="kk-manage-personal-info" class="kkat-text-link"><%=getMsg("account.tile.changeaccountinfo")%></a><%if (!kk.isNoAddress()){ %><a  id="kk-manage-address-book" class="kkat-text-link"><%=getMsg("account.tile.changeaddrbook")%></a><% } %></div></div><div id="settings" class="kkat-area"><h3><%=getMsg("account.tile.notifications")%></h3><div class="kkat-area-content"><a  id="kk-manage-newsletter" class="kkat-text-link"><%=getMsg("account.tile.subscribenewsletter")%></a><a  id="kk-manage-notifications" class="kkat-text-link"><%=getMsg("account.tile.changeprodnotlist")%></a></div></div></div><% } %></div><div id="kk-send-email-dialog" title="<%=getMsg(\'account.tile.confirmation\')%>" class="kk-content-area kk-rounded-corners"><div><div class="kk-form-section"><div class="kk-form-section-title no-margin"><%=getMsg("account.tile.sendpassword.confirmation",customer.emailAddr)%></div><div class="kkat-confirm-dialog-buttons"><a onclick=\'kkCloseConfirmDialog();\' class="kk-button kk-small-rounded-corners"><span ><%=getMsg("account.tile.close")%></span></a><a onclick=\'kkSendEmail();\' class="kk-button kk-small-rounded-corners"><span ><%=getMsg("account.tile.confirm")%></span></a></div></div></div></div><form action="#" id=\'kkSendPasswordForm\' method="post"><input id="kkEmailAddr" type="hidden"/></form><script type="text/javascript">function kkCloseConfirmDialog() {$("#kk-send-email-dialog").dialog(\'close\');}function kkSendEmail() {document.getElementById(\'kkEmailAddr\').value = "<%=customer.emailAddr%>";$(\'#kkSendPasswordForm\').submit();$("#kk-send-email-dialog").dialog(\'close\');}$(function() {$("#kk-send-email-dialog").dialog({autoOpen: false,width: "90%",modal: "true",hide: "blind",open: function( event, ui ) {var width = $( "#kk-send-email-dialog" ).width();if (width > 400) {$( "#kk-send-email-dialog" ).dialog( "option", "width", 400 );}}});$("#kk-send-password").click(function() {$("#kk-send-email-dialog").dialog( "open" );return false;});});<\/script>',
        breadcrumbsTile: '<div id="kkbrt-breadcrumbs"></div>',
        carouselTile: "<script type=text/javascript>var <%=id%> = $('#<%=id%>');<%=id%>.on('jcarousel:reloadend', function () {var itemWidth = <%=width%>;var width = <%=id%>.width();if (width < <%=breakpointSmall%>){itemWidth =  <%=widthSmall%>;}var numItems = Math.floor(width / itemWidth);if (numItems == 0) {numItems = 1;<%=id%>.jcarousel('items').css('width', itemWidth + 'px');} else {var extra = width - (numItems*itemWidth);var extraPerItem  = extra / numItems;var rightMargin = Math.ceil(extraPerItem/2);var leftMargin = Math.floor(extraPerItem/2);<%=id%>.jcarousel('items').css('width', itemWidth + 'px');<%=id%>.jcarousel('items').css('margin-left', leftMargin + 'px');<%=id%>.jcarousel('items').css('margin-right', rightMargin + 'px');}<%=id%>.jcarousel('scroll', 0, true, function(scrolled) {kk.setCarouselControls(<%=id%>,$('#<%=id%>-prev'),$('#<%=id%>-next'));})}).jcarousel({wrap: null});$('#<%=id%>-prev').jcarouselControl({method: function() {<%=id%>.jcarousel('scroll', '-='+<%=id%>.jcarousel('visible').length, true, function(scrolled) {kk.setCarouselControls(<%=id%>,$('#<%=id%>-prev'),$('#<%=id%>-next'));})}});$('#<%=id%>-next').jcarouselControl({method: function() {<%=id%>.jcarousel('scroll', '+='+<%=id%>.jcarousel('visible').length, true, function(scrolled) {kk.setCarouselControls(<%=id%>,$('#<%=id%>-prev'),$('#<%=id%>-next'));})}});<%=id%>.swipe({swipeRight: function(event, direction, distance, duration, fingerCount) {<%=id%>.jcarousel('scroll', '-='+<%=id%>.jcarousel('visible').length, true, function(scrolled) {kk.setCarouselControls(<%=id%>,$('#<%=id%>-prev'),$('#<%=id%>-next'));})},swipeLeft: function(event, direction, distance, duration, fingerCount) {<%=id%>.jcarousel('scroll', '+='+<%=id%>.jcarousel('visible').length, true, function(scrolled) {kk.setCarouselControls(<%=id%>,$('#<%=id%>-prev'),$('#<%=id%>-next'));})}});<\/script><div class=\"kkca-item-area wide kk-rounded-corners\"><div class=\"kkca-item-area-header\"><h2 class=\"kkca-item-area-title\"><%=title%></h2><div class=\"kkca-item-area-navigation jcarousel-wrapper\"><a href=# id=\"<%=id%>-prev\" class=\"jcarousel-control-prev jcarousel-border-prev\"></a><a href=# id=\"<%=id%>-next\" class=\"jcarousel-control-next jcarousel-border-next\"></a></div></div><div id=\"<%=id%>\" class=jcarousel><ul></ul></div></div>",
        catMenuTile: '<script type=text/javascript>$(window).resize(function() {kk.sizeMenu();});<\/script><div id="kkcm-main-menu"><%for (var i = 0; i < catTree.length; i++) {%><%var cat = catTree[i]; %><%var menuClass; %><%if (i == catTree.length-1){ %><% menuClass = "kkcm-menu-item kk-rounded-corners kkcm-last-child"; %><% } else { %><% menuClass = "kkcm-menu-item kk-rounded-corners"; %><% } %><a href=\'#\' id="kkcm-<%=cat.id%>" class="<%=menuClass%>" style="width: auto;"><%=cat.name%></a><% } %></div>',
        editAddressTile: '<h1 id="kk-page-title"><%=getMsg("customer.info.editaddr")%></h1><div class="kk-content-area kk-rounded-corners"><div><form action="#" id="kk-edit-address-form" method="post"><% var opcbilling = null;%><% var opcdelivery = null;%><div class="kk-form-section"><div><h3><%=getMsg("customer.info.personal.details")%><span class="kk-required-text"><span class="kk-required-icon kk-required-blue"></span>&nbsp;<%=getMsg("customer.info.required.fields")%></span></h3></div><div class="kk-form-section-fields"><div class="kk-form-section-divider"></div><div class="kk-form-input kk-radio-buttons"><label><%=getMsg("customer.info.gender")%></label><%var checkedM = (selectedAddr.gender.toUpperCase()==\'M\')?\'checked\':\'\'; %><span class="kk-radio-button"><input type="radio" name="kkGender" value="m" <%=checkedM%>> <%=getMsg("customer.info.male")%></span><%var checkedF = (selectedAddr.gender.toUpperCase()==\'F\')?\'checked\':\'\'; %><span class="kk-radio-button"><input type="radio" name="kkGender" value="f" <%=checkedF%>> <%=getMsg("customer.info.female")%></span><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.first.name")%></label><input type="text" value=\'<%=selectedAddr.firstName%>\' id="kkFirstName" name="kkFirstName"/><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.last.name")%></label><input type="text" value=\'<%=selectedAddr.lastName%>\' id="kkLastName" name="kkLastName"/><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div></div></div><div class="kk-form-section"><h3><%=getMsg("customer.info.company.details")%></h3><div class="kk-form-section-fields"><div class="kk-form-section-divider"></div><div class="kk-form-input"><label><%=getMsg("customer.info.company.name")%></label><input type="text" value=\'<%=selectedAddr.company%>\' id="kkCompany" name="kkCompany"/><span class="kk-validation-msg"></span></div></div></div><div class="kk-form-section"><h3><%=getMsg("customer.info.addr")%></h3><div class="kk-form-section-fields"><div class="kk-form-section-divider"></div><div class="kk-form-input"><label><%=getMsg("customer.info.street.addr")%></label><input type="text" value=\'<%=selectedAddr.streetAddress%>\' id="kkStreetAddress" name="kkStreetAddress"/><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.street.addr1")%></label><input type="text" value=\'<%=selectedAddr.streetAddress1%>\' id="kkStreetAddress1" name="kkStreetAddress1" /><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.suburb")%></label><input  type="text" value=\'<%=selectedAddr.suburb%>\' id="kkSuburb" name="kkSuburb"/><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.postcode")%></label><input type="text" value=\'<%=selectedAddr.postcode%>\' id="kkPostcode" name="kkPostcode" /><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.city")%></label><input type="text" value=\'<%=selectedAddr.city%>\' id="kkCity" name="kkCity" /><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input" id="kk-form-zone-select" ><label><%=getMsg("customer.info.state")%></label><select id="kkStateList" name="kkStateList" class="kkState"><option value="-1"><%=getMsg("customer.info.select")%></option><% for (var i = 0; i < zones.length; i++){ %><% var zone = zones[i];%><%if (zone.zoneName == selectedAddr.state){ %><option selected="selected" value="<%=zone.zoneName%>"><%=zone.zoneName%></option><% } else { %><option  value="<%=zone.zoneName%>"><%=zone.zoneName%></option><% } %><% } %></select><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input" id="kk-form-zone-input"><label><%=getMsg("customer.info.state")%></label><input type="text" value=\'<%=selectedAddr.state%>\' id="kkState" name="kkState" /><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.country")%></label><select id="kkCountryId" name="kkCountryId" onchange="kk.changeCountry();"><option value="-1"><%=getMsg("customer.info.select")%></option><%if (countries != null){%><%for ( var i = 0; i < countries.length; i++)\t{%><%var country = countries[i];%><%if (country.id == selectedAddr.countryId){ %><option selected="selected" value="<%=country.id%>"><%=country.name%></option><% } else { %><option value="<%=country.id%>"><%=country.name%></option><% } %><% } %><% } %></select><span class="kk-required-icon kk-required-green"></span><span class="kk-validation-msg"></span></div></div></div><div class="kk-form-section"><h3><%=getMsg("customer.info.contact.info")%></h3><div class="kk-form-section-fields"><div class="kk-form-section-divider"></div><div class="kk-form-input"><label><%=getMsg("customer.info.tel.number")%></label><input type="text" value=\'<%=selectedAddr.telephoneNumber%>\' id="kkTelephoneNumber" name="kkTelephoneNumber" /><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.tel.number1")%></label><input type="text" value=\'<%=selectedAddr.telephoneNumber1%>\' id="kkTelephoneNumber1" name="kkTelephoneNumber1" /><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.email")%></label><input type="text" value=\'<%=selectedAddr.emailAddr%>\'  id="kkEmailAddrOptional" name="kkEmailAddrOptional"/><span class="kk-validation-msg"></span></div></div></div><%if (!selectedAddr.isPrimary){ %><div class="kk-form-section"><h3><%=getMsg("customer.info.primary")%></h3><div class="kk-form-section-fields"><div class="kk-form-section-divider"></div><div class="kk-form-input"><label><%=getMsg("customer.info.setprimary")%></label><input type="checkbox" id="kkSetAsPrimary" name="kkSetAsPrimary"></div></div></div><% } %><div class="kk-form-buttons"><a id="kk-edit-address-submit" class="kk-continue-button kk-button kk-small-rounded-corners"><span><%=getMsg("customer.info.update")%></span></a><%if ((opcbilling == null || opcbilling.length() == 0) && (opcdelivery == null || opcdelivery.length() == 0)){ %><a  id="kk-back-to-manage-address" class="kk-button kk-small-rounded-corners"><span><%=getMsg("customer.info.back")%></span></a><% } else { %><a  id="kk-back-to-manage-address" class="kk-button kk-small-rounded-corners"><span><%=getMsg("customer.info.back")%></span></a><% } %></div><input type="hidden" id="countryChange" name="countryChange" value="0"/></form></div></div>',
        facetsTile: '<%if (prodSearch.priceFrom != null && prodSearch.priceTo != null) {%><%var symbol = "$";%><script>$(function() {$( "#kkft-price-range-slider" ).slider({range: true,min: <%=prodSearch.priceFrom.toFixed(2)%>,max: <%=prodSearch.priceTo.toFixed(2)%>,values: [ <%=prodSearch.priceFrom.toFixed(2)%>, <%=prodSearch.priceTo.toFixed(2)%> ],slide: function( event, ui ) {var min = ui.values[ 0 ];var max = ui.values[ 1 ];$( "#kkft-amount" ).html(kk.formatMoney(min) + " - " + kk.formatMoney(max));},stop: function( event, ui ) {kk.filterByPrice(ui.values[ 0 ], ui.values[ 1 ]);}});var min = $( "#kkft-price-range-slider" ).slider( "values", 0 );var max = $( "#kkft-price-range-slider" ).slider( "values", 1 );$( "#kkft-amount" ).html(kk.formatMoney(min) + " - " + kk.formatMoney(max));});<\/script><% } %><div id="kkft-side-menu"><div class="kkft-side-menu-section"><% if (cats != null && cats.length > 0){%><h1><%=getMsg("facets.tile.categories")%></h1><ul><% for (var i = 0; i < cats.length; i++){ %><% var cat = cats[i];%><% var name = (cat.numberOfProducts < 0)? cat.name : cat.name+" ("+cat.numberOfProducts+")"; %><li><%for (var j = 0; j < cat.level; j++){%><span class=\'fa fa-angle-right\'></span><% }%><%if (cat.selected == true){ %><a href=\'#\' class="kkft-cat kkft-current-cat" id="kkft-<%=cat.id%>"><%=name%></a><% } else { %><a href=\'#\' class="kkft-cat" id="kkft-<%=cat.id%>"><%=name%></a><% } %></li><% } %></ul><% } %><%var haveManus = (manus !=null && manus.length > 0)? true : false;%><%var haveFacets = (prodSearch.tagGroups !=null && prodSearch.tagGroups.length > 0)? true : false;%><%var havePriceSlider = prodSearch.priceFrom != null && prodSearch.priceTo != null;%><%if (haveManus || haveFacets) {%><h1><%=getMsg("facets.tile.refine.search")%></h1></h1><% } %><%if (numSelectedFilters > 0){%><div id="kkft-remove-all"><img  src="<%=imageBase%>/x-button.png"><a href=\'#\'><%=getMsg("facets.tile.clear.filters")%></a></div><%}%><%if (haveManus){ %><div class="kkft-side-menu-section"><h2><%=getMsg("facets.tile.manufacturers")%></h2><ul><% for (var i = 0; i < manus.length; i++){ %><% var manu = manus[i];%><% var name = manu.name+" ("+manu.numberOfProducts+")"; %><%if ( manu.id == prodSearch.manufacturerId) { %><li><a href=\'#\' class="kkft-manu" id="kkft-<%=manu.id%>"><span class="kk-selected"></span><%=name%></a></li><% } else { %><li><a href=\'#\' class="kkft-manu" id="kkft-<%=manu.id%>"><span class="kk-not-selected"></span><%=name%></a></li><% } %><% } %></ul></div><% } %><%if (havePriceSlider){ %><div id="kkft-price" class="kkft-range-slider"><h2><%=getMsg("facets.tile.price")%></h2><div id="kkft-price-range-slider"></div><div id="kkft-amount"></div></div><% } %><%if (haveFacets){ %><div class="kkft-side-menu-section"><% var previousName=""; %><% for (var i = 0; i < prodSearch.tagGroups.length; i++){ %><% var tagGroup = prodSearch.tagGroups[i];%><%if (tagGroup.name != null && previousName != null && !(tagGroup.name == previousName)){ %><h2><%=tagGroup.name%></h2><% } %><% previousName = tagGroup.name; %><%if (tagGroup.tags != null && tagGroup.tags.length > 0){ %><ul><% for (var j = 0; j < tagGroup.tags.length; j++){ %><% var tag = tagGroup.tags[j];%><%var name = tag.name; %><%if ( tag.selected == true) { %><li><a href=\'#\' class="kkft-tag" id="kkft-<%=tag.id%>"><span class="kk-selected"></span><%=getMsg(name)+" ("+tag.numProducts+")"%></a></li><% } else { %><li><a href=\'#\' class="kkft-tag" id="kkft-<%=tag.id%>"><span class="kk-not-selected"></span><%=getMsg(name)+" ("+tag.numProducts+")"%></a></li><% } %><% } %></ul><% } %><% } %></div><% } %></div></div>',
        firstAddressTile: '<h1 id="kk-page-title"><%=getMsg("customer.info.insert.primary")%></h1><div class="kk-content-area kk-rounded-corners"><div><form action="#" id="kk-insert-first-address-form" method="post"><div class="kk-form-section"><div><h3><%=getMsg("customer.info.personal.details")%><span class="kk-required-text"><span class="kk-required-icon kk-required-blue"></span>&nbsp;<%=getMsg("customer.info.required.fields")%></span></h3></div><%if (kk.isNoGender() || kk.isNoName()){ %><div class="kk-form-section-fields"><div class="kk-form-section-divider"></div><%if (kk.isNoGender()){ %><div class="kk-form-input kk-radio-buttons"><label><%=getMsg("customer.info.gender")%></label><span class="kk-radio-button"><input type="radio" name="kkGender" value="m"> <%=getMsg("customer.info.male")%></span><span class="kk-radio-button"><input type="radio" name="kkGender" value="f"> <%=getMsg("customer.info.female")%></span><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><% } %><%if (kk.isNoName()){ %><div class="kk-form-input"><label><%=getMsg("customer.info.first.name")%></label><input type="text" value=\'\' id="kkFirstName" name="kkFirstName"/><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.last.name")%></label><input type="text" value=\'\' id="kkLastName" name="kkLastName"/><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><% } %></div><% } %></div><div class="kk-form-section"><h3><%=getMsg("customer.info.company.details")%></h3><div class="kk-form-section-fields"><div class="kk-form-section-divider"></div><div class="kk-form-input"><label><%=getMsg("customer.info.company.name")%></label><input type="text" value=\'\' id="kkCompany" name="kkCompany"/><span class="kk-validation-msg"></span></div></div></div><div class="kk-form-section"><h3><%=getMsg("customer.info.addr")%></h3><div class="kk-form-section-fields"><div class="kk-form-section-divider"></div><div class="kk-form-input"><label><%=getMsg("customer.info.street.addr")%></label><input type="text" value=\'\' id="kkStreetAddress" name="kkStreetAddress"/><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.street.addr1")%></label><input type="text" value=\'\' id="kkStreetAddress1" name="kkStreetAddress1" /><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.suburb")%></label><input  type="text" value=\'\' id="kkSuburb" name="kkSuburb"/><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.postcode")%></label><input type="text" value=\'\' id="kkPostcode" name="kkPostcode" /><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.city")%></label><input type="text" value=\'\' id="kkCity" name="kkCity" /><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input" id="kk-form-zone-select" ><label><%=getMsg("customer.info.state")%></label><select id="kkStateList" name="kkStateList" class="kkState"><option value="-1"><%=getMsg("customer.info.select")%></option><% for (var i = 0; i < zones.length; i++){ %><% var zone = zones[i];%><option  value="<%=zone.zoneName%>"><%=zone.zoneName%></option><% } %></select><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input" id="kk-form-zone-input"><label><%=getMsg("customer.info.state")%></label><input type="text" id="kkState" name="kkState" /><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.country")%></label><select id="kkCountryId" name="kkCountryId" onchange="kk.changeCountry();"><option value="-1"><%=getMsg("customer.info.select")%></option><%if (countries != null){%><%for ( var i = 0; i < countries.length; i++)\t{%><%var country = countries[i];%><%if (country.isoCode3 == defaultCountryCode){ %><option selected="selected" value="<%=country.id%>"><%=country.name%></option><% } else { %><option value="<%=country.id%>"><%=country.name%></option><% } %><% } %><% } %></select><span class="kk-required-icon kk-required-green"></span><span class="kk-validation-msg"></span></div></div></div><div class="kk-form-section"><h3><%=getMsg("customer.info.contact.info")%></h3><div class="kk-form-section-fields"><div class="kk-form-section-divider"></div><div class="kk-form-input"><label><%=getMsg("customer.info.tel.number")%></label><input type="text" value="" id="kkTelephoneNumber" name="kkTelephoneNumber" /><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.tel.number1")%></label><input type="text" value="" id="kkTelephoneNumber1" name="kkTelephoneNumber1" /><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.email")%></label><input type="text" value=""  id="kkEmailAddrOptional" name="kkEmailAddrOptional"/><span class="kk-validation-msg"></span></div></div></div><div class="kk-form-buttons"><a id="kk-insert-first-address-submit" class="kk-continue-button kk-button kk-small-rounded-corners"><span><%=getMsg("customer.info.insert")%></span></a><a id="kk-cust-info-back" class="kk-button kk-small-rounded-corners"><span><%=getMsg("customer.info.back")%></span></a></div></form></div></div>',
        forgotPasswordTile: '<h1 id="kk-page-title"><%=getMsg("forgot.pw.title")%></h1><div class="kk-content-area kk-rounded-corners"><div><div id="kk-error"></div><div id="kk-message"></div><form action="#" id="kk-forgot-password-form" method="post"><div class="kk-form-section"><div class="kkfp-notification-header"><p><%=getMsg("forgot.pw.explanation")%></p><div class="kk-form-input"><label><%=getMsg("forgot.pw.email")%></label><input type="text" id="kkEmailAddr"  name="kkEmailAddr"/><span class="kk-validation-msg"></span></div></div></div><div class="kk-form-buttons"><a id="kk-forgot-pw-send" class="kk-continue-button kk-button kk-small-rounded-corners"><span><%=getMsg("forgot.pw.send")%></span></a><a id="kk-forgot-pw-back" class="kk-button kk-small-rounded-corners"><span><%=getMsg("forgot.pw.back")%></span></a></div></form></div></div>',
        insertAddressTile: '<h1 id="kk-page-title"><%=getMsg("customer.info.newaddrbook")%></h1><div class="kk-content-area kk-rounded-corners"><div><form action="#" id="kk-insert-address-form" method="post"><% var opcbilling = null;%><% var opcdelivery = null;%><div class="kk-form-section"><div><h3><%=getMsg("customer.info.personal.details")%><span class="kk-required-text"><span class="kk-required-icon kk-required-blue"></span>&nbsp;<%=getMsg("customer.info.required.fields")%></span></h3></div><div class="kk-form-section-fields"><div class="kk-form-section-divider"></div><div class="kk-form-input kk-radio-buttons"><label><%=getMsg("customer.info.gender")%></label><span class="kk-radio-button"><input type="radio" name="kkGender" value="m" > <%=getMsg("customer.info.male")%></span><span class="kk-radio-button"><input type="radio" name="kkGender" value="f" > <%=getMsg("customer.info.female")%></span><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.first.name")%></label><input type="text" value="" id="kkFirstName" name="kkFirstName"/><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.last.name")%></label><input type="text" value="" id="kkLastName" name="kkLastName"/><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div></div></div><div class="kk-form-section"><h3><%=getMsg("customer.info.company.details")%></h3><div class="kk-form-section-fields"><div class="kk-form-section-divider"></div><div class="kk-form-input"><label><%=getMsg("customer.info.company.name")%></label><input type="text" value="" id="kkCompany" name="kkCompany"/><span class="kk-validation-msg"></span></div></div></div><div class="kk-form-section"><h3><%=getMsg("customer.info.addr")%></h3><div class="kk-form-section-fields"><div class="kk-form-section-divider"></div><div class="kk-form-input"><label><%=getMsg("customer.info.street.addr")%></label><input type="text" value="" id="kkStreetAddress" name="kkStreetAddress"/><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.street.addr1")%></label><input type="text" value="" id="kkStreetAddress1" name="kkStreetAddress1" /><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.suburb")%></label><input  type="text" value="" id="kkSuburb" name="kkSuburb"/><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.postcode")%></label><input type="text" value="" id="kkPostcode" name="kkPostcode" /><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.city")%></label><input type="text" value="" id="kkCity" name="kkCity" /><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input" id="kk-form-zone-select" ><label><%=getMsg("customer.info.state")%></label><select id="kkStateList" name="kkStateList" class="kkState"><option value="-1"><%=getMsg("customer.info.select")%></option><% for (var i = 0; i < zones.length; i++){ %><% var zone = zones[i];%><option  value="<%=zone.zoneName%>"><%=zone.zoneName%></option><% } %></select><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input" id="kk-form-zone-input"><label><%=getMsg("customer.info.state")%></label><input type="text" id="kkState" name="kkState" /><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.country")%></label><select id="kkCountryId" name="kkCountryId" onchange="kk.changeCountry();"><option value="-1"><%=getMsg("customer.info.select")%></option><%if (countries != null){%><%for ( var i = 0; i < countries.length; i++)\t{%><%var country = countries[i];%><%if (country.isoCode3 == defaultCountryCode){ %><option selected="selected" value="<%=country.id%>"><%=country.name%></option><% } else { %><option value="<%=country.id%>"><%=country.name%></option><% } %><% } %><% } %></select><span class="kk-required-icon kk-required-green"></span><span class="kk-validation-msg"></span></div></div></div><div class="kk-form-section"><h3><%=getMsg("customer.info.contact.info")%></h3><div class="kk-form-section-fields"><div class="kk-form-section-divider"></div><div class="kk-form-input"><label><%=getMsg("customer.info.tel.number")%></label><input type="text" value="" id="kkTelephoneNumber" name="kkTelephoneNumber" /><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.tel.number1")%></label><input type="text" value="" id="kkTelephoneNumber1" name="kkTelephoneNumber1" /><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.email")%></label><input type="text" value=""  id="kkEmailAddrOptional" name="kkEmailAddrOptional"/><span class="kk-validation-msg"></span></div></div></div><div class="kk-form-section"><h3><%=getMsg("customer.info.primary")%></h3><div class="kk-form-section-fields"><div class="kk-form-section-divider"></div><div class="kk-form-input"><label><%=getMsg("customer.info.setprimary")%></label><input type="checkbox" id="kkSetAsPrimary" name="kkSetAsPrimary"></div></div></div><div class="kk-form-buttons"><a id="kk-insert-address-submit" class="kk-continue-button kk-button kk-small-rounded-corners"><span><%=getMsg("customer.info.insert")%></span></a><%if (opcbilling == null && opcdelivery == null){ %><a  id="kk-back-to-manage-address" class="kk-button kk-small-rounded-corners"><span><%=getMsg("customer.info.back")%></span></a><% } else { %><a  id="kk-back-to-manage-address" class="kk-button kk-small-rounded-corners"><span><%=getMsg("customer.info.back")%></span></a><% } %></div><input type="hidden" id="countryChange" name="countryChange" value="0"/></form></div></div>',
        loginTile: '<%if (allowGooglePlusLogin) {%><script src="https://apis.google.com/js/client:platform.js?onload=gpStart" async defer><\/script><meta name="google-signin-client_id" content="<%=googlePlusId%>"><%}%><script type="text/javascript"><%if (allowFacebookLogin) {%>if (typeof(FB) == "undefined"){window.fbAsyncInit = function() {FB.init({appId      : \'<%=facebookId%>\',version    : \'v2.5\'});$("#kkfb-button").css("display","inline");};}\telse {$("#kkfb-button").css("display","inline");}(function(d, s, id){var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) {return;}js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/en_US/sdk.js";fjs.parentNode.insertBefore(js, fjs);}(document, \'script\', \'facebook-jssdk\'));function fbKKLogin(response) {$("#kkfb-button").hide();$("#kkfb-wait").text(\'<%=getMsg("login.tile.fb.processing")%>\').addClass(\'kkfb-loading\');document.getElementById(\'loginToken\').value = response.authResponse.accessToken;document.getElementById(\'loginType\').value = "FACEBOOK";fbGetEmail();};function fbGetEmail() {FB.api(\'/me?fields=email\', function(response) {if (response.email == null || response.email.length == 0) {document.getElementById(\'kk-social-status\').innerHTML = \'<%=getMsg("login.tile.fb.no.email")%>\';$("#kkfb-wait").text(\'\').removeClass(\'kkfb-loading\');$("#kkfb-button").show();} else {$(\'#kk-ext-login-form\').submit();}});};<%}%><%if (allowGooglePlusLogin) {%>function gpStart() {gapi.load(\'auth2\', function() {gapi.client.load(\'plus\',\'v1\').then(function() {$("#kkgp-button").css("display","inline");});});};var gpUpdate = function(authResult) {if (authResult.isSignedIn.get()) {var user = authResult.currentUser.get();if (user.getBasicProfile().getEmail() == null || user.getBasicProfile().getEmail().length == 0) {document.getElementById(\'kk-social-status\').innerHTML = \'<%=getMsg("login.tile.gp.no.email")%>\';return;}$("#kkgp-button").hide();$("#kkgp-wait").text(\'<%=getMsg("login.tile.gp.processing")%>\').addClass(\'kkgp-loading\');document.getElementById(\'loginToken\').value = user.getAuthResponse().id_token;document.getElementById(\'loginType\').value = "GOOGLEPLUS";$(\'#kk-ext-login-form\').submit();} else if (authResult[\'error\'] ||authResult.currentUser.get().getAuthResponse() == null) {document.getElementById(\'kk-social-status\').innerHTML = \'<%=getMsg("login.tile.gp.no.auth")%>\';} else  {authResult.isSignedIn.listen(gpListener);authResult.signIn({\'scope\': \'profile email\'});}};var gpListener = function(loggedIn) {if (loggedIn == true) {gpUpdate(gapi.auth2.getAuthInstance());}};<%}%>$(function() {$("#password").keydown(function (e){if(e.keyCode == 13){$(\'#kk-login-form\').submit();}});<%if (allowGooglePlusLogin) {%>$("#kkgp-button").click(function() {var authResult = gapi.auth2.getAuthInstance();if (authResult == null) {gapi.auth2.init({fetch_basic_profile: true,scope:\'https://www.googleapis.com/auth/plus.login\'}).then(function (){authResult = gapi.auth2.getAuthInstance();gpUpdate(authResult);});} else {gpUpdate(authResult);}});<%}%><%if (allowFacebookLogin) {%>$("#kkfb-button").click(function() {FB.getLoginStatus(function(response) {if (response==null || response.authResponse == \'undefined\' || response.status!=\'connected\') {FB.login(function(response){if (response.status === \'connected\') {fbKKLogin(response);} else if (response.status === \'not_authorized\') {document.getElementById(\'kk-social-status\').innerHTML = \'<%=getMsg("login.tile.fb.no.auth")%>\';} else {document.getElementById(\'kk-social-status\').innerHTML = \'<%=getMsg("login.tile.fb.no.auth")%>\';}}, {scope: \'email\'});} else {fbKKLogin(response);}});});<%}%>});<\/script><%if (allowFacebookLogin || allowGooglePlusLogin) {%><form action="#" id=\'kk-ext-login-form\' method="post"><input id="loginToken" name="loginToken" type="hidden"/><input id="loginType" name="loginType" type="hidden"/></form><%}%><%if (allowFacebookLogin || allowGooglePlusLogin) {%><h1 id="kk-page-title"><%=getMsg("login.tile.use.social.network")%></h1><div id="kk-ext-login-area" class="kk-content-area kk-rounded-corners"><div><%if (allowFacebookLogin) {%><div class="kk-sign-in-column-left kk-centered"><div id="kkfb-button" style="display: none"><img src="<%=imageBase%>/btn_facebook_login.png"></div><div id="kkfb-wait"></div></div><%}%><%if (allowFacebookLogin && allowGooglePlusLogin) {%><div class="kk-sign-in-column-right kk-centered"><div id="kkgp-button" style="display: none"><img src="<%=imageBase%>/btn_googleplus_login.png"></div><div id="kkgp-wait"></div></div><%}%><%if (!allowFacebookLogin && allowGooglePlusLogin) {%><div class="kk-sign-in-column-left kk-centered"><div id="kkgp-button" style="display: none"><img src="<%=imageBase%>/btn_googleplus_login.png"></div><div id="kkgp-wait"></div></div><%}%><div id="kk-social-status"></div></div></div><%}%><h1 id="kk-page-title"><%=getMsg("login.tile.sign.in")%></h1><div id="kk-login-area" class="kk-content-area kk-rounded-corners"><div id="kk-error"></div><div class="kk-sign-in-column-left"><form action="#" id="kk-login-form" method="post"><div class="kk-form-section"><h3><%=getMsg("login.tile.returning.customer")%></h3><div class="kk-form-input"><label><%=getMsg("login.tile.email")%></label><input type="text" id="kkLoginUsername" name="kkLoginUsername"><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("login.tile.password")%></label><input type="password" id="kkPassword" name="kkPassword" autocomplete="off"><span class="kk-validation-msg"></span></div><div id="kk-sign-in-button-container"><a id="kk-continue-button" class="kk-button kk-small-rounded-corners"><span><%=getMsg("login.tile.sign.in")%></span></a><a  class="kk-text-link" id="kk-forgot-password-link"><%=getMsg("login.tile.forgotten.password")%></a></div></div></form></div><div class="kk-sign-in-column-right kk-centered"><h3><%=getMsg("login.tile.new.customer")%></h3><div><a  id="kk-sign-in-register" class="kk-button kk-small-rounded-corners"><span><%=getMsg("login.tile.register")%></span></a></div><% var loginWithoutRegistration = false;%><%if (loginWithoutRegistration){ %><div><a  id="kk-sign-in-checkout" class="kk-button kk-small-rounded-corners"><span><%=getMsg("login.tile.checkout")%></span></a></div><% } %></div></div>',
        manageAddressBookTile: '<h1 id="page-title"><%=getMsg("customer.info.mypersonaladdressbook")%></h1><div class="kk-content-area kk-rounded-corners"><div><div id="kk-error"></div><div id="kk-message"></div><form action="#" id="kk-manage-address-book-form" method="post"><div class="kk-form-section"><div class="kk-form-section-title"><h3><%=getMsg("customer.info.primaryaddress")%></h3></div><div class="kk-addr-book-header"><div class="kk-addr-book-explanation"><%=getMsg("customer.info.addrexplanation")%></div><div class="kk-addr-book-addr"><%if (addresses != null && addresses.length > 0){ %><%=removeCData(addresses[0].formattedAddress)%><% } %></div></div></div><div class="kk-form-section"><div class="kk-form-section-title no-margin"><h3><%=getMsg("customer.info.addressbookentries")%><a   id="kk-insert-address" class="kk-button-medium kk-new-addr-button kk-small-rounded-corners"><span><%=getMsg("customer.info.newaddress")%></span></a></h3></div><%if (addresses != null && addresses.length > 0){ %><% for (var i = 0; i < addresses.length; i++){ %><% var addr = addresses[i];%><div class="kk-select-addr-section <%=(i%2==0)?"even":"odd"%>"><div class="kk-select-addr"><%if (i == 0){ %><span class="kk-primary-addr-label">(<%=getMsg("customer.info.primaryaddress")%>)</span><br><% } %><%=removeCData(addr.formattedAddress)%></div><div class="kk-select-addr-buttons"><a href=\'#\' id=\'<%="kkEditAddr-"+addr.id%>\' class="kk-edit-address kk-button-medium kk-small-rounded-corners"><span><%=getMsg("customer.info.edit")%></span></a>&nbsp;<%if (i != 0){ %><a href=\'#\' id=\'<%="kkDelAddr-"+addr.id%>\' class="kk-delete-address kk-button-medium kk-small-rounded-corners"><span><%=getMsg("customer.info.delete")%></span></a><% } %></div></div><% } %><% } %></div><div class="kk-form-buttons-wide"><a  id="kk-cust-info-back" class="kk-button kk-small-rounded-corners"><span><%=getMsg("customer.info.back")%></span></a></div></form></div></div>',
        manageCartTile: '<h1 id="kk-page-title"><%=getMsg("edit.cart.tile.editcart")%></h1><div id="kkmct-container" class="kk-content-area kk-rounded-corners"><%if (numItems == 0){ %><p><%=getMsg("edit.cart.tile.emptycart")%></p><% } else { %><% var outOfStock=false; %><form action="#" id="kk-manage-cart-form" method="post" class="kk-form-section"><table><thead><tr><td></td><td class="kkmct-narrow-col"><%=getMsg("edit.cart.tile.item")%></td><td class="kkmct-wide-col"></td><td class="kkmct-narrow-col kk-right"><%=getMsg("edit.cart.tile.price")%></td><td class="kkmct-narrow-col kk-right"><%=getMsg("edit.cart.tile.total")%></td><td class="kkmct-narrow-col kk-center"></td></tr></thead><tbody><% for (var k = 0; k < basketItems.length; k++){ %><% var item = basketItems[k];%><tr><td><%if ((item.quantity > item.quantityInStock)) { %><div class="kkmct-items-left kkmct-red"><%=getMsg("edit.cart.tile.out.of.stock")%></div><% outOfStock=true; %><% } %></td><td><img class="kkmct-product-image" id=\'<%="kkmct-"+item.product.id%>\' src="<%=item.prodImage%>" border="0" alt="<%=item.product.name%>" title=" <%=item.product.name%> "></td><td><a href=\'#\' class="kkmct-text-link" id=\'<%="kkmct-"+item.product.id%>\'><%=item.product.name%><%if (item.opts != null && item.opts.length > 0) {%><%for ( var j = 0; j < item.opts.length; j++) {%><%var opt = item.opts[j];%><%if (opt.type == 0) {%><br><span class="kkct-shopping-cart-item-option"> - <%=opt.name%>:&nbsp;<%=opt.value%></span><%} else if (opt.type == 1) {%><br><span class="kkct-shopping-cart-item-option"> - <%=opt.name%>:&nbsp;<%=opt.quantity%>&nbsp;<%=opt.value%></span><%} else if (opt.type == 2) {%><br><span class="kkct-shopping-cart-item-option"> - <%=opt.name%>:&nbsp;<%=formatMoney(opt.customerPrice)%></span><%} else if (opt.type == 3) {%><br><span class="kkct-shopping-cart-item-option"> - <%=opt.name%>:&nbsp;<%=opt.customerText%></span><%}%><%}%><%}%></a><input type="text" class="kkmct-qty-input" name="prodQty" id="kkmctq-<%=item.id%>" value="<%=item.quantity%>"><a id=\'<%="kkmctb-"+item.id%>\' class="kkmct-update-qty kkmct-update-button kk-small-rounded-corners"><%=getMsg("edit.cart.tile.update")%></a></td><%if (item.finalPriceIncTax != null && displayPriceWithTax){ %><td class="kk-right"><%if (item.quantity>0){ %><%=formatMoney(item.finalPriceIncTax / item.quantity)%><% } %></td><td class="kkmct-total-price kk-right"><%=formatMoney(item.finalPriceIncTax)%></td><% } %><%if (item.finalPriceExTax != null && !displayPriceWithTax){ %><td class="kk-right"><%if (item.quantity>0){ %><%=formatMoney(item.finalPriceExTax / item.quantity)%><% } %></td><td class="kkmct-total-price kk-right"><%=formatMoney(item.finalPriceExTax)%></td><% } %><td class="center"><a class="kkmct-remove fa fa-times-circle" id=\'<%="kkmct-"+item.id%>\' href=\'#\' title=\'<%=getMsg("edit.cart.tile.remove.item")%>\'></a></td></tr><%}%><tr><td id="kkmct-promotion-codes" colspan="3"><div id="kkmct-promotion-codes-container"><%if (displayCouponEntry == true) { %><div class="kkmct-promotion-codes-field"><label><%=getMsg("edit.cart.tile.couponcode")%></label><input type="text" name="kkCouponCode" id="kkCouponCode" value=\'<%=couponCode%>\'/><a id="kkmct-couponCodeUpdate" class="kkmct-update-button kk-small-rounded-corners"><%=getMsg("edit.cart.tile.update")%></a><span class="kk-validation-msg"></span></div><% } %><%if (displayGiftCertificateEntry == true) { %><div class="kkmct-promotion-codes-field"><label><%=getMsg("edit.cart.tile.giftcertcode")%></label><input type="text" name="kkGiftCertCode" id="kkGiftCertCode" value=\'<%=giftCertCode%>\'/><a id="kkmct-giftCertCodeUpdate" class="kkmct-update-button kk-small-rounded-corners"><%=getMsg("edit.cart.tile.update")%></a><span class="kk-validation-msg"></span></div><% } %></div></td></tr><tr><td colspan="3"></td><td colspan="3"><%if (checkoutOrder != null){ %><%if (checkoutOrder.orderTotals != null && checkoutOrder.orderTotals.length > 0 ){ %><table id="kkmct-cost-overview"><% for (var j = 0; j < checkoutOrder.orderTotals.length; j++){ %><tr><% var ot = checkoutOrder.orderTotals[j];%><td class="kkmct-cost-overview-labels"><% if (isDiscountModule(ot.className)) {%><span class="kkmct-discount"><%=ot.title%></span><br/><%}else{%><%=ot.title%><br/><%}%></td><td class="kkmct-cost-overview-amounts kk-right"><%if (ot.className == "ot_reward_points" || ot.className == "ot_product_reward_points") {%><%=ot.value%><br/><%}else if (ot.className == "ot_free_product"){%><%=ot.text%><br/><%}else if (isDiscountModule(ot.className)) {%><span class="kkmct-discount">-<%=formatMoney(ot.value)%></span><br/><%}else{%><%=formatMoney(ot.value)%><br/><%}%></td></tr><% } %></table><% } %><% } else { %><table><tr><td class="kkmct-cost-overview-labels"><%=getMsg("cart.tile.subtotal")%>:</td><td class="kkmct-cost-overview-amounts"><%=formatMoney(basketTotal)%></td></tr></table><% } %></td><td></td></tr></tbody></table></form><div ><a  id="kkmct-checkout-button" class="kk-button kk-small-rounded-corners"><span><%=getMsg("cart.tile.checkout")%></span></a></div><% } %></div>',
        manageEmailTile: '<h1 id="kk-page-title"><%=getMsg("customer.info.change.email")%></h1><div class="kk-content-area kk-rounded-corners"><div><div id="kk-error"></div><form action="#" id="kk-manage-email-form" method="post"><div class="kk-form-section"><div><h3><%=getMsg("customer.info.personal.details")%><span class="kk-required-text"><span class="kk-required-icon kk-required-blue"></span>&nbsp;<%=getMsg("customer.info.required.fields")%></span></h3></div><div class="kk-form-section-fields"><div class="kk-form-section-divider"></div><div class="kk-form-input"><label><%=getMsg("customer.info.email")%></label><input type="text" value=\'<%=customer.emailAddr%>\' id="kkEmailAddr"  name="kkEmailAddr"/><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.username")%></label><% var username = (customer.username==null)?\'\':customer.username; %><input type="text" value=\'<%=username%>\' id="kkUsername"  name="kkUsername"/><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.password")%></label><input type="password" id="kkPassword" name="kkPassword" autocomplete="off" value=""/><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div></div></div><div class="kk-form-buttons"><a id="kk-manage-email" class="kk-continue-button kk-button kk-small-rounded-corners"><span><%=getMsg("customer.info.continue")%></span></a><a  id="kk-cust-info-back" class="kk-button kk-small-rounded-corners"><span><%=getMsg("customer.info.back")%></span></a></div></form></div></div>',
        manageNewsletterTile: '<h1 id="kk-page-title"><%=getMsg("customer.info.newsletter.subscriptions")%></h1><div class="kk-content-area kk-rounded-corners"><div><form action="#" id="kk-newsletter-subscription-form" method="post"><div class="kk-form-section"><div class="kk-newsletter-header"><div class="kk-newsletter-checkbox"><% if (customer.newsletter == 1){ %><input type="checkbox" id="kkNewsletter" name="kkNewsletter" checked><%} else { %><input type="checkbox" id="kkNewsletter" name="kkNewsletter"><%}%></div><div class="kk-newsletter-explanation"><%=getMsg("customer.info.newsletter.contents")%>.</div></div></div><div class="kk-form-buttons-wide"><a id="kk-newsletter-subscription-submit" class="kk-continue-button kk-button kk-small-rounded-corners"><span><%=getMsg("customer.info.continue")%></span></a><a  id="kk-cust-info-back" class="kk-button kk-small-rounded-corners"><span><%=getMsg("customer.info.back")%></span></a></div></form></div></div>',
        managePasswordTile: '<h1 id="kk-page-title"><%=getMsg("customer.info.changepassword")%></h1><div class="kk-content-area kk-rounded-corners"><div><div id="kk-error"></div><form action="#" id="kk-manage-password-form" method="post"><div class="kk-form-section"><h3><%=getMsg("customer.info.mypassword")%><span class="kk-required-text"><span class="kk-required-icon kk-required-blue"></span>&nbsp;<%=getMsg("customer.info.required.fields")%></span></h3><div class="kk-form-section-fields"><div class="kk-form-section-divider"></div><div class="kk-form-input"><label><%=getMsg("customer.info.currentpassword")%></label><input type="password" id="kkCurrentPassword" name="kkCurrentPassword" autocomplete="off" value=""/><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.newpassword")%></label><input type="password" id="kkPassword" name="kkPassword" autocomplete="off" value=""/><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.passwordconfirmation")%></label><input type="password" id="kkPasswordConfirmation" name="kkPasswordConfirmation" autocomplete="off" value=""/><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div></div></div><div class="kk-form-buttons"><a id="kk-manage-password" class="kk-continue-button kk-button kk-small-rounded-corners"><span><%=getMsg("customer.info.continue")%></span></a><a  id="kk-cust-info-back" class="kk-button kk-small-rounded-corners"><span><%=getMsg("customer.info.back")%></span></a></div></form></div></div>',
        managePersonalInfoTile: '<script type="text/javascript">$(function() {$.datepicker.setDefaults($.datepicker.regional[\'<%=locale.slice(0,2)%>\']);$(\'#kkDatepicker\').datepicker({changeMonth: true, changeYear: true, dateFormat: \'<%=getMsg("datepicker.date.format")%>\', yearRange: "-120:-10", minDate: \'-120y\', maxDate: \'-10y\'});});<\/script><h1 id="kk-page-title"><%=getMsg("customer.info.myaccount")%></h1><div class="kk-content-area kk-rounded-corners"><div><div id="kk-error"></div><form action="#" id="kk-manage-personal-info-form" method="post"><div class="kk-form-section"><div><h3><%=getMsg("customer.info.personal.details")%><span class="kk-required-text"><span class="kk-required-icon kk-required-blue"></span>&nbsp;<%=getMsg("customer.info.required.fields")%></span></h3></div><div class="kk-form-section-fields"><div class="kk-form-section-divider"></div><div class="kk-form-input kk-radio-buttons"><label><%=getMsg("customer.info.gender")%></label><%var checkedM = (customer.gender.toUpperCase()==\'M\')?\'checked\':\'\'; %><span class="kk-radio-button"><input type="radio" name="kkGender" value="m" <%=checkedM%> > <%=getMsg("customer.info.male")%></span><%var checkedF = (customer.gender.toUpperCase()==\'F\')?\'checked\':\'\'; %><span class="kk-radio-button"><input type="radio" name="kkGender" value="f" <%=checkedF%>> <%=getMsg("customer.info.female")%></span><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.first.name")%></label><% var firstName = (kk.isNoName())?\'\':customer.firstName; %><input type="text" value=\'<%=firstName%>\' id="kkFirstName" name="kkFirstName"/><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.last.name")%></label><% var lastName = (kk.isNoName())?\'\':customer.lastName; %><input type="text" value=\'<%=lastName%>\' id="kkLastName" name="kkLastName"/><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.dob")%></label><% var birthDate = (kk.isNoBirthdate())?\'\':formatDate(customer.birthDate); %><input type="text" id="kkDatepicker"  value=\'<%=birthDate%>\' name="kkBirthDateString"/><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.tax.id")%></label><input type="text" value=\'<%=customer.taxIdentifier%>\' id="kkTaxId" name="kkTaxId"/><span class="kk-validation-msg"></span></div></div></div><div class="kk-form-section"><h3><%=getMsg("customer.info.contact.info")%></h3><div class="kk-form-section-fields"><div class="kk-form-section-divider"></div><div class="kk-form-input"><label><%=getMsg("customer.info.tel.number")%></label><% var telephoneNumber = (kk.isNoTelephone())?\'\':customer.telephoneNumber; %><input type="text" value=\'<%=telephoneNumber%>\' id="kkTelephoneNumber" name="kkTelephoneNumber" /><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.tel.number1")%></label><input type="text" value=\'<%=customer.telephoneNumber1%>\' id="kkTelephoneNumber1" name="kkTelephoneNumber1" /><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("customer.info.fax.number")%></label><input type="text" value=\'<%=customer.faxNumber%>\' id="kkFaxNumber" name="kkFaxNumber" /><span class="kk-validation-msg"></span></div></div></div><div class="kk-form-buttons"><a id="kk-manage-personal-info-submit" class="kk-continue-button kk-button kk-small-rounded-corners"><span><%=getMsg("customer.info.continue")%></span></a><a  id="kk-cust-info-back" class="kk-button kk-small-rounded-corners"><span><%=getMsg("customer.info.back")%></span></a></div></form></div></div>',
        manageWishListTile: '<h1 id="kk-page-title"><%=getMsg("edit.wishlist.tile.editwishlist")%></h1><div id="kkmwt-container" class="kk-content-area kk-rounded-corners"><%if (numItems == 0){ %><p><%=getMsg("wishlist.tile.empty")%></p><% } else { %><% var outOfStock=false; %><table><thead><tr><td id="kkmwt-image-col"><%=getMsg("edit.wishlist.tile.item")%></td><td id="kkmwt-item-col"></td><td id="kkmwt-priority-col"><%=getMsg("edit.wishlist.tile.priority")%></td><td id="kkmwt-price-col"><%=getMsg("edit.wishlist.tile.price")%></td><td id="kkmwt-add-to-cart-col"></td><td id="kkmwt-remove-col"></td></tr></thead><tbody><% for (var k = 0; k < wishListItems.length; k++){ %><% var item = wishListItems[k];%><tr><td class="product-image-td"><img class="kkmwt-product-image" id=\'<%="kkmwt-"+item.product.id%>\' src="<%=item.prodImage%>" border="0" alt="<%=item.product.name%>" title=" <%=item.product.name%> "></td><td><a href=\'#\' class="kkmwt-text-link" id=\'<%="kkmwt-"+item.product.id%>\'><%=item.product.name%><%if (item.opts != null && item.opts.length > 0) {%><%for ( var j = 0; j < item.opts.length; j++) {%><%var opt = item.opts[j];%><%if (opt.type == 0) {%><br><span class="kkwt-wishList-item-option"> - <%=opt.name%>:&nbsp;<%=opt.value%></span><%} else if (opt.type == 1) {%><br><span class="kkwt-wishList-item-option"> - <%=opt.name%>:&nbsp;<%=opt.quantity%>&nbsp;<%=opt.value%></span><%} else if (opt.type == 2) {%><br><span class="kkwt-wishList-item-option"> - <%=opt.name%>:&nbsp;<%=opt.formattedCustPrice%></span><%} else if (opt.type == 3 && !isWishList) {%><br><span class="kkwt-wishList-item-option"> - <%=opt.name%>:&nbsp;<%=opt.customerText%></span><%}%><%}%><%}%></a></td><td><select  id=\'<%=item.id + "-P"%>\' onchange="kk.changeWishListPriority(\'<%=item.id+"-P"%>\')"><option value="5" <%=(item.priority==5)?"selected=\'selected\'":""%>><%=getMsg("edit.wishlist.tile.highest")%></option><option value="4" <%=(item.priority==4)?"selected=\'selected\'":""%>><%=getMsg("edit.wishlist.tile.high")%></option><option value="3" <%=(item.priority==3)?"selected=\'selected\'":""%>><%=getMsg("edit.wishlist.tile.medium")%></option><option value="2" <%=(item.priority==2)?"selected=\'selected\'":""%>><%=getMsg("edit.wishlist.tile.low")%></option><option value="1" <%=(item.priority==1)?"selected=\'selected\'":""%>><%=getMsg("edit.wishlist.tile.lowest")%></option></select></td><td class="kk-right"><%if (displayPriceWithTax){%><%=formatMoney(item.finalPriceIncTax)%><%}else{%><%=formatMoney(item.finalPriceExTax)%><%}%></td><td class="kk-center"><a href=\'#\' id=\'<%="kkmwt-"+item.id%>\' class="kkmwt-add-to-cart kk-button-small kk-small-rounded-corners"><%=getMsg("edit.wishlist.tile.add.to.cart")%></a></td><td class="kk-right"><a id=\'<%="kkmwt-"+item.id%>\' class="kkmwt-remove fa fa-times-circle" href=\'#\' title=\'<%=getMsg("edit.wishlist.tile.remove.item")%>\'></a></td></tr><%}%><tr><td colspan="2"></td><td id="kkmwt-cost-overview" colspan="3"><table><tr><td class="kkmwt-cost-overview-labels"><%=getMsg("edit.wishlist.tile.total")%>:</td><td class="kkmwt-cost-overview-amounts"><%if (displayPriceWithTax){%><%=formatMoney(wishList.finalPriceIncTax)%><%}else{%><%=formatMoney(wishList.finalPriceExTax)%><%}%></td></tr></table></td><td></td></tr></tbody></table><\!--<div ><a  id="kkmwt-continue-button" class="kk-button kk-small-rounded-corners"><span><%=getMsg("edit.wishlist.tile.continue")%></span></a></div>--\><% } %></div>',
        onePageCheckoutTile: '<h1 id="kk-page-title"><%=getMsg("opc.tile.orderconfirmation")%></h1><div id="kkopc-order-confirmation" class="kk-content-area kk-rounded-corners"><form action="#" id="kk-opc-form" method="post" class="kk-form-section"><div id="kkopc-column-left"><div id="kkopc-delivery-address" class="kkopc-area"><div class="kkopc-heading-container"><h3><%=getMsg("opc.tile.deliveryaddress")%></h3><div class="kkopc-options"><a id="kkopc-newDelivery" title=\'<%=getMsg("opc.tile.new.addr.tip")%>\' class="kkopc-option kkopc-text-link has-tooltip"><%=getMsg("opc.tile.new")%></a><span class="kkopc-separator-small"></span><a id="kkopc-editDelivery" title=\'<%=getMsg("opc.tile.edit.addr.tip")%>\' class="kkopc-option kkopc-text-link has-tooltip"><%=getMsg("opc.tile.edit")%></a><%if (customer != null && customer.type != 2) { %><span class="kkopc-separator-small"></span><a id="kkopc-abdelivery" title=\'<%=getMsg("opc.tile.addr.book.tip")%>\' class="kkopc-option kkopc-text-link has-tooltip"><%=getMsg("opc.tile.addr.book")%></a><% } %></div></div><div class="kkopc-area-content"><span><%=removeCData(checkoutOrder.deliveryFormattedAddress)%></span><div id="kkopc-shipping-info" class="kkopc-area-content-select"><label><%=getMsg("opc.tile.shippingmethod")%></label><select name="shipping" onchange="kk.shippingRefresh();" id="kkopc-shippingQuotes"><%if (shippingQuotes != null && shippingQuotes.length > 0){ %><% var shipping = (checkoutOrder.shippingQuote!=null)?checkoutOrder.shippingQuote.moduleCode:"";%><%if (checkoutOrder.shippingQuote!=null && checkoutOrder.shippingQuote.shippingServiceCode != null && checkoutOrder.shippingQuote.shippingServiceCode.length > 0){ %><% shipping = shipping + "~~" + checkoutOrder.shippingQuote.shippingServiceCode;%><% } %><% for (var i = 0; i < shippingQuotes.length; i++){ %><% var quote = shippingQuotes[i];%><% var code = quote.moduleCode;%><%if (quote.shippingServiceCode!=null && quote.shippingServiceCode.length > 0){ %><% code = code + "~~" + quote.shippingServiceCode;%><% } %><%if (code == shipping){ %><option  value="<%=code%>" selected="selected"><%=quote.description%></option><% } else { %><option  value="<%=code%>"><%=quote.description%></option><% } %><% } %><%} else {%><option  value="-1" selected="selected"><%=getMsg("opc.tile.no.shipping.methods")%></option><% } %></select></div></div></div><div id="kkopc-billing-address" class="kkopc-area"><div class="kkopc-heading-container"><h3><%=getMsg("opc.tile.billingaddress")%></h3><div class="kkopc-options"><a id="kkopc-newBilling" title=\'<%=getMsg("opc.tile.new.addr.tip")%>\' class="kkopc-option kkopc-text-link has-tooltip"><%=getMsg("opc.tile.new")%></a><span class="kkopc-separator-small"></span><a id="kkopc-editBilling"  title=\'<%=getMsg("opc.tile.edit.addr.tip")%>\' class="kkopc-option kkopc-text-link has-tooltip"><%=getMsg("opc.tile.edit")%></a><%if (customer != null && customer.type != 2) { %><span class="kkopc-separator-small"></span><a id="kkopc-abbilling" title=\'<%=getMsg("opc.tile.addr.book.tip")%>\' class="kkopc-option kkopc-text-link has-tooltip"><%=getMsg("opc.tile.addr.book")%></a><% } %></div></div><div class="kkopc-area-content"><span><%=removeCData(checkoutOrder.billingFormattedAddress)%></span><div id="kkopc-payment-method" class="kkopc-area-content-select"><label><%=getMsg("opc.tile.paymentmethod")%></label><select name="payment" onchange="kk.paymentRefresh();" id="kkopc-paymentDetails"><%if (paymentDetails != null && paymentDetails.length > 0){ %><% var selectedPayment = (checkoutOrder.paymentDetails != null)?checkoutOrder.paymentDetails.code:""; %><%if (checkoutOrder.paymentDetails!=null && checkoutOrder.paymentDetails.subCode != null && checkoutOrder.paymentDetails.subCode.length > 0){ %><% selectedPayment = selectedPayment + "~~" + checkoutOrder.paymentDetails.subCode;%><% } %><% for (var i = 0; i < paymentDetails.length; i++){ %><% var pd = paymentDetails[i];%><% var code = pd.code;%><%if (pd.subCode!=null && pd.subCode.length > 0){ %><% code = code + "~~" + pd.subCode;%><% } %><%if (selectedPayment == code){ %><option  value="<%=code%>" selected="selected"><%=pd.description%></option><% } else { %><option  value="<%=code%>"><%=pd.description%></option><% } %><% } %><%} else {%><option  value="-1" selected="selected"><%=getMsg("opc.tile.no.payment.methods")%></option><% } %></select></div><div id="kkopc-promotion-codes"><div id="kkopc-promotion-codes-container"><%if (displayCouponEntry == true) { %><div class="kkopc-promotion-codes-field"><label><%=getMsg("opc.tile.couponcode")%></label><input type="text" name="kkCouponCode" id="kkCouponCode" value=\'<%=couponCode%>\'/><a id="kkopc-couponCodeUpdate" class="kkopc-update-button kk-small-rounded-corners"><%=getMsg("opc.tile.update")%></a><span class="kk-validation-msg"></span></div><% } %><%if (displayGiftCertificateEntry == true) { %><div class="kkopc-promotion-codes-field"><label><%=getMsg("opc.tile.giftcertcode")%></label><input type="text" name="kkGiftCertCode" id="kkGiftCertCode" value=\'<%=giftCertCode%>\'/><a id="kkopc-giftCertCodeUpdate" class="kkopc-update-button kk-small-rounded-corners"><%=getMsg("opc.tile.update")%></a><span class="kk-validation-msg"></span></div><% } %></div></div></div></div><div class="kkopc-area"><div class="kkopc-heading-container"><h3><%=getMsg("opc.tile.delivery.notes")%></h3></div><div class="kkopc-area-content"><%=getMsg("opc.tile.info")%> <textarea id="kkOrderComment" name="kkOrderComment" rows="5" name="comment"></textarea><span class="kk-validation-msg"></span></div></div></div><div id="kkopc-column-right"><div><div class="kkopc-heading-container"><h3><%=getMsg("opc.tile.shopping.cart")%></h3></div><table><thead><tr><td class="kkopc-narrow-col"></td><td class="kkopc-wide-col"><%=getMsg("opc.tile.item")%></td><td class="kkopc-narrow-col kk-right"><%=getMsg("opc.tile.total")%></td></tr></thead><tbody><%if (checkoutOrder.orderProducts != null && checkoutOrder.orderProducts.length > 0){ %><% for (var i = 0; i < checkoutOrder.orderProducts.length; i++){ %><% var op = checkoutOrder.orderProducts[i];%><tr><td><img class="kkopc-product-image" src="<%=op.prodImage%>" border="0" alt="<%=op.product.name%>" title=" <%=op.product.name%> "></td><td><a href=\'#\' class="kkopc-order-item-link kkopc-text-link" id=\'<%="kkopc-"+op.productId%>\'><%=op.name%><%if (op.opts != null && op.opts.length > 0) {%><%for ( var j = 0; j < op.opts.length; j++) {%><%var opt = op.opts[j];%><%if (opt.type == 0) {%><br><span class="kkopc-shopping-cart-item-option"> - <%=opt.name%>:&nbsp;<%=opt.value%></span><%} else if (opt.type == 1) {%><br><span class="kkopc-shopping-cart-item-option"> - <%=opt.name%>:&nbsp;<%=opt.quantity%>&nbsp;<%=opt.value%></span><%} else if (opt.type == 2) {%><br><span class="kkopc-shopping-cart-item-option"> - <%=opt.name%>:&nbsp;<%=formatMoney(opt.customerPrice)%></span><%} else if (opt.type == 3) {%><br><span class="kkopc-shopping-cart-item-option"> - <%=opt.name%>:&nbsp;<%=opt.customerText%></span><%}%><%}%><%}%></a><div class="kkopc-item-quantity"><%=getMsg("opc.tile.quantity")%>: <%=op.quantity%></div></td><%if (displayPriceWithTax) {%><td  class="kkopc-total-price kk-right"><%=formatMoney(op.finalPriceIncTax)%></td><%} else {%><td  class="kkopc-total-price kk-right"><%=formatMoney(op.finalPriceExTax)%></td><%}%></tr><%}%><%}%><%if (checkoutOrder.orderTotals != null && checkoutOrder.orderTotals.length > 0){ %><% for (var i = 0; i < checkoutOrder.orderTotals.length; i++){ %><% var ot = checkoutOrder.orderTotals[i];%><%var rowClass = "kkopc-costs-and-promotions";%><%if (ot.className == "ot_total"){ %><%rowClass = "kkopc-shopping-cart-total";%><%} else if (ot.className == "ot_subtotal"){%><%rowClass = "kkopc-shopping-cart-subtotal";%><% } %><tr class="<%=rowClass%>"><td></td><%if (ot.className == "ot_reward_points" || ot.className == "ot_product_reward_points") {%><td class="kkopc-cost-overview"><%=ot.title%></td><td class="kkopc-cost-overview-amounts kk-right"><%=ot.value%></td><%}else if (ot.className == "ot_free_product") {%><td class="kkopc-cost-overview"><%=ot.title%></td><td class="kkopc-cost-overview-amounts kk-right"><%=ot.text%></td><%}else if (ot.className == "ot_total") {%><td><%=ot.title%></td><td class="kk-right"><%=formatMoney(ot.value)%></td><%}else if (isDiscountModule(ot.className)) {%><td class="kkopc-cost-overview"><span class="kkopc-discount"><%=ot.title%></span></td><td class="kkopc-cost-overview-amounts kk-right"><span class="kkopc-discount">-<%=formatMoney(ot.value)%></span></td><%}else{%><td class="kkopc-cost-overview"><%=ot.title%></td><td class="kkopc-cost-overview-amounts kk-right"><%=formatMoney(ot.value)%></td><%}%></tr><%}%><%}%></tbody></table></div></div><div id="kkopc-confirm-order-button-container"><a id="kkopc-continue-button" class="kk-continue-button kk-button kk-small-rounded-corners"><span><%=getMsg("opc.tile.confirmorder")%></span></a></div></form></div><div id="kkopc-error-dialog" title="<%=getMsg("opc.tile.problem.title")%>" class="content-area rounded-corners"><div><div class="kk-form-section"><div class="kk-form-section-title no-margin"><h3><%=getMsg("opc.tile.problem")%></h3></div><div><p><span id="kkopc-error-msg"></span></p></div><a id="kkopc-error-dialog-close" class="kk-button kk-small-rounded-corners"><span ><%=getMsg("opc.tile.close")%></span></a></div></div></div><div id="kkopc-addr-dialog" title="<%=getMsg("opc.tile.addr.book.header")%>" class="content-area rounded-corners"><div><div class="kk-form-section"><div class="kk-form-section-title no-margin"><h3><%=getMsg("opc.tile.dialog.addr.select")%></h3></div><%if (addresses != null && addresses.length > 0){ %><% for (var i = 0; i < addresses.length; i++){ %><% var addr = addresses[i];%><div class="kkopc-select-addr-section <%=(i%2==0)?"even":"odd"%>"><div class="kkopc-select-addr"><%=removeCData(addr.formattedAddress)%></div><div class="kkopc-select-addr-buttons"><a id=\'<%="kkopcaddrid-"+addr.id%>\'  class="kkopc-select-addr-button kk-button kk-small-rounded-corners"><span ><%=getMsg("opc.tile.select")%></span></a></div></div><%}%><%}%></div></div></div>',
        orderDetailTile: '<h1 id="kk-page-title"><%=getMsg("order.detail.tile.orderinformation",order.id,formatDate(order.datePurchased))%></h1><div id="kkod-order-confirmation" class="kk-content-area kk-rounded-corners"><div id="kkod-column-left"><div id="kkod-delivery-address" class="kkod-area"><div class="kkod-heading-container"><h3><%=getMsg("order.detail.tile.deliveryaddress")%></h3></div><div class="kkod-area-content"><span><%=removeCData(order.deliveryFormattedAddress)%></span><div id="kkod-shipping-info" class="kkod-area-content-select"><label><%=getMsg("order.detail.tile.shippingmethod")%></label><p><%=order.shippingMethod%></p></div></div></div><div id="kkod-billing-address" class="kkod-area"><div class="kkod-heading-container"><h3><%=getMsg("order.detail.tile.billingaddress")%></h3></div><div class="kkod-area-content"><span><%=removeCData(order.billingFormattedAddress)%></span><div id="kkod-payment-method" class="kkod-area-content-select"><label><%=getMsg("order.detail.tile.paymentmethod")%></label><p><%=order.paymentMethod%></p></div></div></div><%if (order.orderShipments != null && order.orderShipments.length > 0){ %><div class="kkod-shipment-area"><div class="kkod-heading-container"><h3><%=getMsg("order.detail.tile.shipments")%></h3></div><div><% for (var i = 0; i < order.orderShipments.length; i++){ %><% var os = order.orderShipments[i];%><%if (i==order.orderShipments.length-1){ %><table class="kkod-shipment-container-no-border"><%}else{%><table class="kkod-shipment-container"><%}%><tbody><tr><td class="kkod-25-col"><span class="kkod-bold"><%=getMsg("order.detail.tile.date")%>:</span> <%=formatDate(os.dateAdded)%></td><td class="kkod-50-col"><%if (os.shipperName != null && os.shipperName.length > 0){ %><span class="kkod-bold"><%=getMsg("order.detail.tile.shipper")%>:</span> <%=os.shipperName%><%}%></td><td class="kkod-25-col"><%if (os.trackingURL != null && os.trackingURL.length > 0){ %><a class="kkod-text-link"  target="_blank" href="<%=os.trackingURL%>"><%=getMsg("order.detail.tile.track")%></a><%}%></td></tr><%if (os.shippedOrderProducts != null && os.shippedOrderProducts.length > 0){ %><tr><td colspan="3"><table><thead><tr><td class="kkod-60-col"><%=getMsg("order.detail.tile.item")%></td><td class="kkod-40-col"><%=getMsg("order.detail.tile.qty.shipped")%></td></tr></thead><tbody><% for (var j = 0; j < os.shippedOrderProducts.length; j++){ %><% var osp = os.shippedOrderProducts[j];%><% var op = osp.orderProd;%><tr><td><a href=\'#\' class="kkod-order-item-link kkod-text-link" id=\'<%="kkod-"+op.productId%>\'><%=op.name%><%if (op.opts != null && op.opts.length > 0) {%><%for ( var k = 0; k < op.opts.length; k++) {%><%var opt = op.opts[k];%><%if (opt.type == 0) {%><br><span class="kkod-shopping-cart-item-option"> - <%=opt.name%>:&nbsp;<%=opt.value%></span><%} else if (opt.type == 1) {%><br><span class="kkod-shopping-cart-item-option"> - <%=opt.name%>:&nbsp;<%=opt.quantity%>&nbsp;<%=opt.value%></span><%} else if (opt.type == 2) {%><br><span class="kkod-shopping-cart-item-option"> - <%=opt.name%>:&nbsp;<%=formatMoney(opt.customerPrice)%></span><%} else if (opt.type == 3) {%><br><span class="kkod-shopping-cart-item-option"> - <%=opt.name%>:&nbsp;<%=opt.customerText%></span><%}%><%}%><%}%></a></td><td><%=osp.quantity%></td><tr><%}%></tbody></table></td></tr><%}%></tbody></table><%}%></div></div><%}%><div id="kkod-status-notes"><div class="kkod-heading-container"><h3><%=getMsg("order.detail.tile.orderhistory")%></h3></div><div><%if (order.statusTrail != null && order.statusTrail.length > 0){ %><table><% for (var i = 0; i < order.statusTrail.length; i++){ %><% var ost = order.statusTrail[i];%><tr><td><%=formatDate(ost.dateAdded)%></td><td><%=ost.orderStatus%></td><%if (ost.comments == null || ost.comments.length == 0){ %><td>&nbsp;</td><%}else{%><td><%=ost.comments%></td><%}%></tr><%}%></table><%}%></div></div></div><div id="kkod-column-right"><div><div class="kkod-heading-container"><h3><%=getMsg("order.detail.tile.order.details")%></h3></div><table><thead><tr><td class="kkod-wide-col"><%=getMsg("order.detail.tile.item")%></td><td class="kkod-narrow-col kk-right"><%=getMsg("order.detail.tile.total")%></td></tr></thead><tbody><%if (order.orderProducts != null && order.orderProducts.length > 0){ %><% for (var i = 0; i < order.orderProducts.length; i++){ %><% var op = order.orderProducts[i];%><tr><td><a href=\'#\' class="kkod-order-item-link kkod-text-link" id=\'<%="kkod-"+op.productId%>\'><%=op.name%><%if (op.opts != null && op.opts.length > 0) {%><%for ( var j = 0; j < op.opts.length; j++) {%><%var opt = op.opts[j];%><%if (opt.type == 0) {%><br><span class="kkod-shopping-cart-item-option"> - <%=opt.name%>:&nbsp;<%=opt.value%></span><%} else if (opt.type == 1) {%><br><span class="kkod-shopping-cart-item-option"> - <%=opt.name%>:&nbsp;<%=opt.quantity%>&nbsp;<%=opt.value%></span><%} else if (opt.type == 2) {%><br><span class="kkod-shopping-cart-item-option"> - <%=opt.name%>:&nbsp;<%=formatMoney(opt.customerPrice)%></span><%} else if (opt.type == 3) {%><br><span class="kkod-shopping-cart-item-option"> - <%=opt.name%>:&nbsp;<%=opt.customerText%></span><%}%><%}%><%}%></a><div class="kkod-item-quantity"><%=getMsg("order.detail.tile.quantity")%>: <%=op.quantity%></div></td><%if (displayPriceWithTax) {%><td  class="kkod-total-price kk-right"><%=formatMoney(op.finalPriceIncTax)%></td><%} else {%><td  class="kkod-total-price kk-right"><%=formatMoney(op.finalPriceExTax)%></td><%}%></tr><%}%><%}%><%if (order.orderTotals != null && order.orderTotals.length > 0){ %><% for (var i = 0; i < order.orderTotals.length; i++){ %><% var ot = order.orderTotals[i];%><%var rowClass = "kkod-costs-and-promotions";%><%if (ot.className == "ot_total"){ %><%rowClass = "kkod-shopping-cart-total";%><%} else if (ot.className == "ot_subtotal"){%><%rowClass = "kkod-shopping-cart-subtotal";%><% } %><tr class="<%=rowClass%>"><%if (ot.className == "ot_reward_points" || ot.className == "ot_product_reward_points") {%><td class="kkod-cost-overview"><%=ot.title%></td><td class="kkod-cost-overview-amounts kk-right"><%=ot.value%></td><%}else if (ot.className == "ot_free_product") {%><td class="kkod-cost-overview"><%=ot.title%></td><td class="kkod-cost-overview-amounts kk-right"><%=ot.text%></td><%}else if (ot.className == "ot_total") {%><td><%=ot.title%></td><td class="kk-right"><%=formatMoney(ot.value)%></td><%}else if (isDiscountModule(ot.className)) {%><td class="kkod-cost-overview"><span class="kkod-discount"><%=ot.title%></span></td><td class="kkod-cost-overview-amounts kk-right"><span class="kkod-discount">-<%=formatMoney(ot.value)%></span></td><%}else{%><td class="kkod-cost-overview"><%=ot.title%></td><td class="kkod-cost-overview-amounts kk-right"><%=formatMoney(ot.value)%></td><%}%></tr><%}%><%}%></tbody></table></div></div><div id="kkod-button-container"><a  id="kkod-repeat-button" class="kk-button kk-small-rounded-corners"><span><%=getMsg("order.detail.tile.repeat")%></span></a><a  id="kkod-back-button" class="kk-button kk-small-rounded-corners"><span><%=getMsg("order.detail.tile.back")%></span></a></div></div>',
        ordersTile: '<h1 id="kk-page-title"><%=getMsg("orders.tile.myorderhistory")%></h1><%if (orders == null || orders.length == 0){ %><div  class="kkos-item-area kk-rounded-corners"><div class="kkos-item-area-header"></div><div class="kkos-items-message"><%=getMsg("orders.tile.no.orders")%>.</div></div><% } else { %><div  class="kkos-item-area kk-rounded-corners"><div class="kkos-item-area-header"><div class="kkos-item-area-header-top"><span class="kkos-number-of-items kkos-navigation-element"><%=dataDesc.offset+1%>-<%=+dataDesc.offset + +numOrds%> <%=getMsg("orders.tile.of")%> <%=totalNumOrds%> <%=getMsg("orders.tile.orders")%></span><span class="kkos-show-per-page-area kkos-navigation-element"><select class="kkos-show-per-page" id=\'<%=id+"-P1"%>\' onchange="kk.changeOrdersPageSize(\'<%=id+"-P1"%>\')"><option value="5"<%=(maxOrdsPerPage==5)?\' selected="selected"\':\'\'%>>5</option><option value="10"<%=(maxOrdsPerPage==10)?\' selected="selected"\':\'\'%>>10</option><option value="20"<%=(maxOrdsPerPage==20)?\' selected="selected"\':\'\'%>>20</option><option value="30"<%=(maxOrdsPerPage==30)?\' selected="selected"\':\'\'%>>30</option><option value="50"<%=(maxOrdsPerPage==50)?\' selected="selected"\':\'\'%>>50</option></select><%=getMsg("orders.tile.per.page")%></span><span class="kkos-pagination kkos-navigation-element"><a class="kkos-pagination-element kkos-previous-items<%=(showBack)?"":"-inactive"%>" id=\'<%=id+"-B"%>\'></a><% for ( var i = 0; i < pageList.length; i++) { %><% var page = pageList[i]; %><% if (page == currentPage) { %><a class="kkos-pagination-element kkos-page-num kkos-current" id=\'<%=id+"p-"+page%>\'><%=page%></a><% } else { %><a class="kkos-pagination-element kkos-page-num" id=\'<%=id+"p-"+page%>\'><%=page%></a><% } %><% }  %><a class="kkos-pagination-element kkos-next-items<%=(showNext)?"":"-inactive"%>" id=\'<%=id+"-F"%>\'></a></span></div></div><% for (var i = 0; i < orders.length; i++){ %><% var order = orders[i];%><% var numItems = (order.orderProducts!=null)?order.orderProducts.length:0;%><% var statusClass = (order.statusText!=null&&order.statusText.toUpperCase() == "DELIVERED")?"kkos-shipped":"kkos-pending";%><div class="kkos-all-orders"><table><tbody><tr><td class="kkos-narrow-col">#<%=order.id%></td><td class="kkos-narrow-col"><%=formatDate(order.datePurchased)%></td><td class="kkos-narrow-col"><%=getMsg("orders.tile.total")%>: <%=formatMoney(order.totalIncTax)%></td><td class="kkos-narrow-col"><div class="kkos-label <%=statusClass%>"><%=order.statusText%></div></td><td class="kkos-all-orders-icons"><a class="kkos-view-order kkos-text-link fa fa-eye kkos-order-action" title=\'<%=getMsg("orders.tile.view")%>\' id=\'<%="kkos-"+order.id%>\' href=\'#\'></a><a class="kkos-repeat-order kkos-text-link fa fa-repeat kkos-order-action" title=\'<%=getMsg("orders.tile.repeat")%>\' id=\'<%="kkos-"+order.id%>\' href=\'#\'></a><a class="kkos-track-order kkos-text-link fa fa-truck kkos-order-action" title=\'<%=getMsg("orders.tile.track")%>\' id=\'<%="kkos-"+order.id%>\' href=\'#\'></a><a class="kkos-invoice-order kkos-text-link fa fa-file-pdf-o kkos-order-action" title=\'<%=getMsg("orders.tile.invoice")%>\' id=\'<%="kkos-"+order.id%>\' href=\'#\'></a></td></tr></tbody><%if (order.orderProducts != null && order.orderProducts.length > 0){ %><tr><td colspan="8"><table><thead><tr><td class="kkos-wide-col"><%=getMsg("orders.tile.item")%></td><td class="kkos-narrow-col kk-right"><%=getMsg("orders.tile.quantity")%></td><td class="kkos-narrow-col kk-right"><%=getMsg("orders.tile.total")%></td></tr></thead><tbody><% for (var j = 0; j < order.orderProducts.length; j++){ %><% var orderProd = order.orderProducts[j];%><tr><td><a class="kkos-order-item-link kkos-text-link" id=\'<%="kkos-"+orderProd.productId%>\' href=\'#\'><%=orderProd.name%></a></td><td class="kk-right"><%=orderProd.quantity%></td><%if (displayPriceWithTax) {%><td class="kk-right"><%=formatMoney(orderProd.finalPriceIncTax)%></td><%} else {%><td class="kk-right"><%=formatMoney(orderProd.finalPriceExTax)%></td><%}%></tr><% } %></tbody></table></td></tr><% } %></table></div><% } %><div class="kk-form-buttons-wide"><a id="kk-orders-back" class="kk-button kk-small-rounded-corners"><span><%=getMsg("orders.tile.back")%></span></a></div></div><% } %>',
        popupCartTile: '<div id="kkpct-shopping-cart" class="kkpct-top-bar-menu-item"><span id="kkpct-shopping-cart-link"><%=getMsg("cart.tile.shoppingcart")%><span id="kkpct-basket-items"><%if (numItems > 0) { %>(<%=numItems%>)<%}%></span></span><div id="kkpct-shopping-cart-container"><div id="kkpct-shopping-cart-mouseover-shadow" class="kkpct-slide-out-shadow"></div><div id="kkpct-shopping-cart-contents" class="kkpct-slide-out-contents kkpct-shadow"><%if (basketItems==null || basketItems.length == 0) { %><%=getMsg("cart.tile.empty")%><%}else{%><div id="kkpct-shopping-cart-items"><% for (var i = 0; i < basketItems.length; i++){ %><% var item = basketItems[i];%><%if (item.product != null) { %><div class="kkpct-shopping-cart-item"><a href=\'#\' class="kkpct-cart-item-image" id=\'<%="kkpct-"+item.product.id%>\'><img src="<%=item.prodImage%>" border="0" alt="<%=item.product.name%>" title=" <%=item.product.name%> "></a><a href=\'#\' class="kkpct-shopping-cart-item-title" id=\'<%="kkpct-"+item.product.id%>\'><%=item.product.name%></a><%if (item.opts != null && item.opts.length > 0) {%><%for ( var j = 0; j < item.opts.length; j++) {%><%var opt = item.opts[j];%><%if (opt.type == 0) {%><br><span class="kkct-shopping-cart-item-option"> - <%=opt.name%>:&nbsp;<%=opt.value%></span><%} else if (opt.type == 1) {%><br><span class="kkct-shopping-cart-item-option"> - <%=opt.name%>:&nbsp;<%=opt.quantity%>&nbsp;<%=opt.value%></span><%} else if (opt.type == 2) {%><br><span class="kkct-shopping-cart-item-option"> - <%=opt.name%>:&nbsp;<%=formatMoney(opt.customerPrice)%></span><%} else if (opt.type == 3) {%><br><span class="kkct-shopping-cart-item-option"> - <%=opt.name%>:&nbsp;<%=opt.customerText%></span><%}%><%}%><%}%><div class="kkpct-shopping-cart-item-price"><%if (displayPriceWithTax) { %><%=formatMoney(item.finalPriceIncTax)%><%}else{%><%=formatMoney(item.finalPriceExTax)%><%}%>&nbsp;<%=getMsg("cart.tile.quantity")%>:<%=item.quantity%></div></div><%}%><%}%></div><div id="kkpct-subtotal-and-checkout"><div class="kkpct-subtotal"><div class="kkpct-subtotal-label"><%=getMsg("cart.tile.subtotal")%></div><div class="kkpct-subtotal-amount"><%=formatMoney(basketTotal)%></div><div id="kkpct-shopping-cart-checkout-button" class="kk-button kk-small-rounded-corners"><%=getMsg("cart.tile.checkout")%></div></div></div><%}%></div></div></div>',
        popupWishListTile: '<div id="kkpwt-wishList" class="kkpwt-top-bar-menu-item"><span id="kkpwt-wishList-link"><%=getMsg("wishlist.tile.wishlist")%><span id="kkpwt-num-items"><%if (numItems > 0) { %>(<%=numItems%>)<%}%></span></span><div id="kkpwt-wishList-container"><div id="kkpwt-wishList-mouseover-shadow" class="kkpwt-slide-out-shadow"></div><div id="kkpwt-wishList-contents" class="kkpwt-slide-out-contents kkpwt-shadow"><%if (wishListItems==null || wishListItems.length == 0) { %><%=getMsg("wishlist.tile.empty")%><%}else{%><div id="kkpwt-wishList-items"><% for (var i = 0; i < wishListItems.length; i++){ %><% var item = wishListItems[i];%><%if (item.product != null) { %><div class="kkpwt-wishList-item"><a href=\'#\' class="kkpwt-wishList-item-image" id=\'<%="kkpwt-"+item.product.id%>\'><img src="<%=item.prodImage%>" border="0" alt="<%=item.product.name%>" title=" <%=item.product.name%> "></a><a href=\'#\' class="kkpwt-wishList-item-title" id=\'<%="kkpwt-"+item.product.id%>\'><%=item.product.name%></a><%if (item.opts != null && item.opts.length > 0) {%><%for ( var j = 0; j < item.opts.length; j++) {%><%var opt = item.opts[j];%><%if (opt.type == 0) {%><br><span class="kkct-wishList-item-option"> - <%=opt.name%>:&nbsp;<%=opt.value%></span><%} else if (opt.type == 1) {%><br><span class="kkct-wishList-item-option"> - <%=opt.name%>:&nbsp;<%=opt.quantity%>&nbsp;<%=opt.value%></span><%} else if (opt.type == 2) {%><br><span class="kkct-wishList-item-option"> - <%=opt.name%>:&nbsp;<%=opt.formattedCustPrice%></span><%} else if (opt.type == 3 && !isWishList) {%><br><span class="kkct-wishList-item-option"> - <%=opt.name%>:&nbsp;<%=opt.customerText%></span><%}%><%}%><%}%><div class="kkpwt-wishList-item-price"><%if (displayPriceWithTax) { %><%=formatMoney(item.finalPriceIncTax)%><%}else{%><%=formatMoney(item.finalPriceExTax)%><%}%>&nbsp;<%=getMsg("wishlist.tile.quantity")%>:<%=item.quantity%></div></div><%}%><%}%></div><div id="kkpwt-subtotal-and-checkout"><div class="kkpwt-subtotal"><div class="kkpwt-subtotal-label"><%=getMsg("wishlist.tile.subtotal")%></div><%if (displayPriceWithTax) { %><div class="kkpwt-subtotal-amount"><%=formatMoney(wishList.finalPriceIncTax)%></div><%}else{%><div class="kkpwt-subtotal-amount"><%=formatMoney(wishList.finalPriceExTax)%></div><%}%></div></div><%}%></div></div></div>',
        prodDetailTile: '<%if (prod == null){%><div id="kkpdt-product-area" class="kk-rounded-corners"><%=getMsg("product.details.tile.product.not.found")%></div><% } else { %><h1 id="kk-page-title"><%=prod.name%></h1><div id="kkpdt-product-area" class="kk-rounded-corners"><div id="kkpdt-product-column-left"><div id="kkpdt-product-images-container" class="kk-centered"><div id="kkpdt-gallery" class="kkpdt-gallery"><div class="kkpdt-gallery_output" id="kkpdt-gallery_output"></div><div id="kkpdt-gallery_nav" class="kkpdt-gallery_nav"></div><div class="kk-clear"></div></div></div><div id="kkpdt-product-content"><div id="kkpdt-product-content-tabs"><% var descClass;%><% var revClass;%><%if (showReviewsTab == true){%><% descClass = "";%><% revClass = \t"kkpdt-selected-product-content-tab";%><% } else { %><% descClass = "kkpdt-selected-product-content-tab";%><% revClass = \t"";%><%}%><div id="kkpdt-product-description-tab" class="<%=descClass%> kkpdt-product-content-tab kk-small-rounded-corners-top"><%=getMsg("product.details.tile.product.description")%></div><div class="kkpdt-product-content-tab-spacer"></div><div id="kkpdt-product-specifications-tab" class="kkpdt-product-content-tab kk-small-rounded-corners-top"><%=getMsg("product.details.tile.specifications")%></div><div class="kkpdt-product-content-tab-spacer"></div><div id="kkpdt-product-reviews-tab" class="<%=revClass%> kkpdt-product-content-tab kk-small-rounded-corners-top"><%=getMsg("product.details.tile.reviews")%> (<%=prod.numberReviews%>)</div><div class="kkpdt-product-content-tab-filler"></div></div><div id="kkpdt-product-description"><p style="clear:both"><%=prod.description%></p></div><div id="kkpdt-product-specifications"><%if (prod.customAttrArray != null && prod.customAttrArray.length > 0){ %><table><thead><th colspan="2"><%=getMsg("product.details.tile.product.specifications")%></th></thead><tbody><% for (var i = 0; i < prod.customAttrArray.length; i++){ %><% var attr =  prod.customAttrArray[i];%><%if (attr.facetNumber == 0){ %><tr class="<%=(i%2==0)?"even":"odd"%>"><td><%=(attr.getMsgCatKey==null)? attr.name:attr.msgCatKey%></td><td><%=attr.value%></td></tr><%}%><%}%></tbody></table><% } else { %><p style="clear:both"><%=getMsg("product.details.tile.add.specifications")%></p><%}%></div><div id="kkpdt-product-reviews"></div></div></div><div id="kkpdt-product-column-right"><div id="kkpdt-buying-details" class="kk-rounded-corners-top"><div id="kkpdt-product-price"><% var saving; %><%if (displayPriceWithTax){%><%if (prod.specialPriceIncTax != null)\t{%><% saving = prod.priceIncTax - prod.specialPriceIncTax;%><span class="kkpdt-product-price-old"><%=formatMoney(prod.priceIncTax)%></span><span class="kkpdt-product-price-current"><%=formatMoney(prod.specialPriceIncTax)%></span><%} else { %><span class="kkpdt-product-price-current"><%=formatMoney(prod.priceIncTax)%></span><%}%><%} else { %><%if (prod.specialPriceExTax != null) {%><% saving = prod.priceExTax - prod.specialPriceExTax;%><span class="kkpdt-product-price-old"><%=formatMoney(prod.priceExTax)%></span><span class="kkpdt-product-price-current"><%=formatMoney(prod.specialPriceExTax)%></span><%} else { %><span class="kkpdt-product-price-current"><%=formatMoney(prod.priceExTax)%></span><%}%><%}%></div><div class="kkpdt-rating-big"><%var rating = (prod.rating == null) ? 0 : formatNumber(prod.rating,0);%><a><%for (var i = 0; i < rating; i++){%><span class="kkpdt-star-big full"></span><%}%><%for (var i = rating; i < 5; i++) {%><span class="kkpdt-star-big empty"></span><%}%><span id="kkpdt-star-reviews-link">(<%=prod.numberReviews%>&nbsp;<%=getMsg("product.tile.reviews")%>)</span></a></div><%if (prod.quantity > qtyWarn){%><div id="kkpdt-left-in-stock"><%=getMsg("product.details.tile.in.stock")%></div><%} else if (prod.quantity <= qtyWarn && prod.quantity > 0){%><div id="kkpdt-left-in-stock"><%=getMsg("product.details.tile.limited.stock", prod.quantity)%></div><%} else{%><div id="kkpdt-left-in-stock"><%=getMsg("product.details.tile.out.of.stock")%></div><%}%><div class="kkpdt-labels"><%if (prod.type == 2 || prod.type == 4){%><div class="kkpdt-label kkpdt-free-shipping"><%=getMsg("product.tile.free.shipping")%></div><%}%><%if (saving != null){%><div class="kkpdt-label kkpdt-save"><%=getMsg("product.tile.save")%>&nbsp;<%=formatMoney(saving)%></div><%}%></div><div id="kkpdt-product-options"><%if (optContainers != null && optContainers.length > 0){ %><table class="kkpdt-product-option"><%for ( var j = 0; j < optContainers.length; j++) {%><%var optContainer = optContainers[j];%><tr><%if (optContainer.type == 0) {%><td class="kkpdt-opt-name"><%=optContainer.name%></td><td class="kkpdt-opt-value"><select class="kkpdt-opts" onchange="kk.optionChanged(this)"><%for ( var k = 0; k < optContainer.opts.length; k++) {%><% var option =  optContainer.opts[k];%><% var optCode =  (optContainer.code!=null && optContainer.code.length>0)?optContainer.code:null;%><% var valCode =  (option.code!=null && option.code.length>0)?option.code:null;%><% var combinedCode = "";%><%if (optCode != null && valCode != null){%><%combinedCode = optCode+"_"+valCode+"_";%><%}%><option id="<%=combinedCode%>" value="<%=optContainer.id+\'-\'+option.id%>"><%=option.formattedValue%></option><%}%></select><%} else if (optContainer.type == 1) {%><\!-- TYPE_VARIABLE_QUANTITY --\><td class="kkpdt-opt-name"><%=optContainer.name+" "+optContainer.opts[0].formattedValue%></td><td class="kkpdt-opt-value"><%var id = optContainer.id+"-"+optContainer.type+"-"+optContainer.opts[0].id;%><input type="text" id="<%=id%>" class="kkpdt-opts-1"  maxlength="10"/></td><%} else if (optContainer.type == 2) {%><\!-- TYPE_CUSTOMER_PRICE --\><td class="kkpdt-opt-name"><%=optContainer.name+" "+optContainer.opts[0].formattedValue%></td><td class="kkpdt-opt-value"><%var id = optContainer.id+"-"+optContainer.type+"-"+optContainer.opts[0].id;%><input type="text" id="<%=id%>" class="kkpdt-opts-1"  maxlength="10"/></td><%} else if (optContainer.type == 3) {%><\!-- TYPE_CUSTOMER_TEXT --\><td class="kkpdt-opt-name"><%=optContainer.name+" "+optContainer.opts[0].formattedValue%></td><td class="kkpdt-opt-value"><%var id = optContainer.id+"-"+optContainer.type+"-"+optContainer.opts[0].id;%><input type="text" id="<%=id%>" class="kkpdt-opts-1"  maxlength="512"/></td><%}%></tr><%}%></table><%}%></div><div class="kkpdt-product-buttons"><% if (addToBasketEnabled){ %><select  id="kkpdt-prodQuantityId" class="kkpdt-add-to-cart-qty"><%for (var i=1; i<31; i++) {  %><option value="<%=i%>"><%=i%></option><%}%></select><a class="kkpdt-add-to-cart-button-big kk-button kk-small-rounded-corners" id=\'<%="kkpdt-"+prod.id%>\'><%=getMsg("product.tile.add.to.cart")%></a><%}%><div class="kkpdt-add-to-wishlist-container"><%if (wishListEnabled) { %><img class="kkpdt-plus-button" src="<%=imageBase%>/plus-button.png"/><a class="kkpdt-add-to-wishlist-prod-details"  id=\'<%="kkpdt-"+prod.id%>\'><%=getMsg("product.tile.add.to.wishlist")%></a><%}%></div></div><div id="kkpdt-notify-me-container"><%if (productNotification == true) { %><a  class="kkpdt-remove-notification" id=\'<%="kkpdt-"+prod.id%>\'><%=getMsg("product.details.tile.remove")%> <b><%=prod.name%></b> <%=getMsg("product.details.tile.dontnotifyme")%></a><% } else { %><a  class="kkpdt-add-notification" id=\'<%="kkpdt-"+prod.id%>\'><%=getMsg("product.details.tile.notifyme")%> <b><%=prod.name%></b></a><% } %></div></div><div id="kkpdt-share-this" class="kk-rounded-corners-bottom"><span id="kkpdt-share-this-label"><%=getMsg("product.details.tile.share.this")%>:</span><div class="addthis_toolbox addthis_default_style "><a class="addthis_button_facebook" style="cursor:pointer"></a><a class="addthis_button_twitter" style="cursor:pointer"></a><a class="addthis_button_email" style="cursor:pointer"></a><a class="addthis_button_print" style="cursor:pointer"></a><a class="addthis_button_compact" style="cursor:pointer"></a></div><script>$(function() {var script = \'http://s7.addthis.com/js/250/addthis_widget.js#domready=1\';if (window.addthis) {window.addthis = null;window._adr = null;window._atc = null;window._atd = null;window._ate = null;window._atr = null;window._atw = null;}$.getScript(script);});<\/script></div><div id="kkpdt-related"></div><div id="kkpdt-also-purchased"></div></div></div><% } %>',
        prodTile: '<%var rand = Math.floor((Math.random() * 10000) + 1);var count = 0;%><% if (style == "kkpt-single"){ %><div class="kkpt-single"><%}%><div class="kkpt-item"><% if (style != "kkpt-small"){ %><% if (title != null && title.length > 0){ %><div class="kkpt-title"><%=title%></div><%}%><div class="kkpt-item-over" id=\'<%=rand+"."+ count++ +"-"+prod.id%>\'><% if (prod.quantity > qtyWarn){ %><div class="kkpt-items-left kkpt-green"><%=getMsg("product.tile.in.stock")%></div><%} else if (prod.quantity  <= qtyWarn && prod.quantity  > 0) { %><div class="kkpt-items-left kkpt-amber"><%=prod.quantity%><%=getMsg("product.tile.limited.stock")%></div><%} else { %><div class="kkpt-items-left kkpt-red"><%=getMsg("product.tile.out.of.stock")%></div><%}%><div class="kkpt-item-buttons-container"><div class="kkpt-item-buttons kk-centered"><% if (addToBasketEnabled == true){ %><a class="kkpt-add-to-cart-button kk-button kk-small-rounded-corners"  id=\'<%=rand+"."+ count++ +"-"+prod.id%>\'><%=getMsg("product.tile.add.to.cart")%></a><%}%><% if (wishListEnabled == true){ %><div class="kkpt-add-to-wishlist-container kk-centered"><span><img class="kkpt-plus-button" src="<%=imageBase%>/plus-button.png" border="0" alt=\'<%=getMsg("product.tile.add.to.wishlist")%>\'title=\'<%=getMsg("product.tile.add.to.wishlist")%>\' /><a class="kkpt-add-to-wishlist"  id=\'<%=rand+"."+ count++ +"-"+prod.id%>\'><%=getMsg("product.tile.add.to.wishlist")%></a></span></div><%}%></div></div><div class="kkpt-item-overlay"></div></div><%}%><img class="kkpt-item-img" id=\'<%=rand+"."+ count++ +"-"+prod.id%>\' src="<%=prodImage%>" border="0" alt="<%=prod.name%>" title="<%=prod.name%>" /><a class="kkpt-item-title"  id=\'<%=rand+"."+ count++ +"-"+prod.id%>\'><%=prod.name%></a><div class="kkpt-rating"><%var rating = (prod.rating == null) ? 0 : formatNumber(prod.rating,0);%><%if (prod.numberReviews > 0) {%><a class="kkpt-item-reviews"  id=\'<%=rand+"."+ count++ +"-"+prod.id%>\'><%}%><%for (var i = 0; i < rating; i++){%><span class="kkpt-star full"></span><%}%><%for (var i = rating; i < 5; i++){%><span class="kkpt-star empty"></span><%}%><span class="kkpt-review-text"><%="(" + prod.numberReviews + " " + getMsg("product.tile.reviews") + ")"%></span><%if (prod.numberReviews > 0) {%></a><%}%></div><div class="pricing"><% var saving; %><%if (displayPriceWithTax){%><%if (prod.specialPriceIncTax != null)\t{%><% saving = prod.priceIncTax - prod.specialPriceIncTax;%><div class="kkpt-price kkpt-price-old"><%=formatMoney(prod.priceIncTax)%></div><div class="kkpt-price"><%=formatMoney(prod.specialPriceIncTax)%></div><%} else { %><div class="kkpt-price"><%=formatMoney(prod.priceIncTax)%></div><%}%><%} else { %><%if (prod.specialPriceExTax != null) {%><% saving = prod.priceExTax - prod.specialPriceExTax;%><div class="kkpt-price kkpt-price-old"><%=formatMoney(prod.priceExTax)%></div><div class="kkpt-price"><%=formatMoney(prod.specialPriceExTax)%></div><%} else { %><div class="kkpt-price"><%=formatMoney(prod.priceExTax)%></div><%}%><%}%></div><% if (style != "kkpt-small"){ %><%if (prod.type == 2 || prod.type == 4){%><%if (saving == null) {%><div class="kkpt-label kkpt-free-shipping"><%=getMsg("product.tile.free.shipping")%></div><%} else { %><div class="kkpt-label kkpt-free-shipping"><%=getMsg("product.tile.free.shipping.wrap")%></div><%}%><%}%><%if (saving != null) {%><div class="kkpt-label kkpt-save"><%=getMsg("product.tile.save")%>&nbsp;<%=formatMoney(saving)%></div><%}%><%}%></div><% if (style == "kkpt-single"){ %></div><%}%>',
        productNotificationTile: '<h1 id="kk-page-title"><%=getMsg("customer.info.prod.notify.prodnots")%></h1><div class="kk-content-area kk-rounded-corners"><div id="kk-product-notifications"><form action="#" id="kk-product-notification-form" method="post"><div class="kk-form-section"><div class="notification-header"><%=getMsg("customer.info.prod.notify.info")%>.</div></div><div class="kk-form-section"><div class="kk-form-section-title"><h3><%=getMsg("customer.info.prod.notify.gprodnots")%></h3></div><div class="kk-notification-header"><div class="kk-notification-checkbox"><% if (customer.globalProdNotifier >= 1){ %><input type="checkbox" id="kkGlobalNotification" name="kkGlobalNotification" checked><%} else { %><input type="checkbox" id="kkGlobalNotification" name="kkGlobalNotification"><%}%></div><div class="kk-notification-explanation"><%=getMsg("customer.info.prod.notify.recprodnots")%>.</div></div></div><%if (customer.globalProdNotifier < 1) { %><div class="kk-form-section"><div class="kk-form-section-title"><h3><%=getMsg("customer.info.prod.notify.prodnots")%></h3></div><%if (customer.productNotifications != null && customer.productNotifications.length > 0){ %><h4><%=getMsg("customer.info.prod.notify.remprodnots")%>.</h4><div class="kk-notification-header"><% for (var i = 0; i < customer.productNotifications.length; i++){ %><%var prod = customer.productNotifications[i];%><div class="kk-select-notified-prod-section"><div class="kk-notification-checkbox <%=(i%2==0)?"even":"odd"%>"><input type="checkbox" class="kkpn-products" id=\'<%="kkpn-"+prod.id%>\'/></div><div class="kk-notification-explanation <%=(i%2==0)?"even":"odd"%>"><%=prod.name%></div></div><% } %></div><% } else { %><div class="kk-notification-header"><%=getMsg("customer.info.prod.notify.noprodnots")%>.</div><% } %></div><% } %><div class="kk-form-buttons-wide"><a id="kk-product-notification-submit" class="kk-continue-button kk-button kk-small-rounded-corners"><span><%=getMsg("customer.info.save")%></span></a><a  id="kk-cust-info-back" class="kk-button kk-small-rounded-corners"><span><%=getMsg("customer.info.back")%></span></a></div></form></div></div>',
        productsTile: '<% if (whatToShow == "suggestions") { %><div  class="kkps-item-area kk-rounded-corners"><div class="kkps-item-area-header"></div><div class="kkps-items-message"><%=getMsg("products.tile.spelling.suggestion",prodSearch.searchText)%><div id="<%=id%>" class="kkps-spelling-suggestions"><ul></ul></div></div></div><% } else if (whatToShow == "nodata"){ %><div  class="kkps-item-area kk-rounded-corners"><div class="kkps-item-area-header"></div><div class="kkps-items-message"><%=getMsg("products.tile.no.products")%>.</div></div><% } else { %><div  class="kkps-item-area kk-rounded-corners"><div class="kkps-item-area-header"><div class="kkps-item-area-header-top"><span class="kkps-number-of-items kkps-navigation-element"><%=dataDesc.offset+1%>-<%=+dataDesc.offset + +numProds%> <%=getMsg("products.tile.of")%> <%=totalNumProds%> <%=getMsg("products.tile.products")%></span><span class="kkps-pagination kkps-navigation-element"><a class="kkps-pagination-element kkps-previous-items<%=(showBack)?"":"-inactive"%>" id=\'<%=id+"-B"%>\'></a><% for ( var i = 0; i < pageList.length; i++) { %><% var page = pageList[i]; %><% if (page == currentPage) { %><a class="kkps-pagination-element kkps-page-num kkps-current" id=\'<%=id+"p-"+page%>\'><%=page%></a><% } else { %><a class="kkps-pagination-element kkps-page-num" id=\'<%=id+"p-"+page%>\'><%=page%></a><% } %><% }  %><a class="kkps-pagination-element kkps-next-items<%=(showNext)?"":"-inactive"%>" id=\'<%=id+"-F"%>\'></a></span></div><div class="kkps-item-area-header-bottom"><span class="kkps-show-per-page-area kkps-navigation-element"><select class="kkps-show-per-page" id=\'<%=id+"-P1"%>\' onchange="kk.changeProductsPageSize(\'<%=id+"-P1"%>\')"><option value="8"<%=(maxProdsPerPage==8)?\' selected="selected"\':\'\'%>>8</option><option value="12"<%=(maxProdsPerPage==12)?\' selected="selected"\':\'\'%>>12</option><option value="16"<%=(maxProdsPerPage==16)?\' selected="selected"\':\'\'%>>16</option><option value="20"<%=(maxProdsPerPage==20)?\' selected="selected"\':\'\'%>>20</option><option value="24"<%=(maxProdsPerPage==24)?\' selected="selected"\':\'\'%>>24</option><option value="28"<%=(maxProdsPerPage==28)?\' selected="selected"\':\'\'%>>28</option></select><%=getMsg("products.tile.per.page")%></span><span class="kkps-sort-by-area kkps-navigation-element"><%=getMsg("products.tile.sort")%>:<select class="kkps-sort-by" id=\'<%=id+"-O1"%>\' onchange="kk.changeProductsSortBy(\'<%=id+"-O1"%>\')"><option value="ORDER_BY_TIMES_VIEWED_DESCENDING"<%=(dataDesc.orderBy==\'ORDER_BY_TIMES_VIEWED_DESCENDING\')?\' selected="selected"\':\'\'%>><%=getMsg("products.tile.sort.products.by.most.viewed")%></option><option value="ORDER_BY_TIMES_ORDERED_DESCENDING"<%=(dataDesc.orderBy==\'ORDER_BY_TIMES_ORDERED_DESCENDING\')?\' selected="selected"\':\'\'%>><%=getMsg("products.tile.sort.products.by.most.sold")%></option><option value="ORDER_BY_PRICE_ASCENDING"<%=(dataDesc.orderBy==\'ORDER_BY_PRICE_ASCENDING\')?\' selected="selected"\':\'\'%>><%=getMsg("products.tile.sort.products.by.price.asc")%></option><option value="ORDER_BY_PRICE_DESCENDING"<%=(dataDesc.orderBy==\'ORDER_BY_PRICE_DESCENDING\')?\' selected="selected"\':\'\'%>><%=getMsg("products.tile.sort.products.by.price.desc")%></option><option value="ORDER_BY_RATING_DESCENDING"<%=(dataDesc.orderBy==\'ORDER_BY_RATING_DESCENDING\')?\' selected="selected"\':\'\'%>><%=getMsg("products.tile.sort.products.by.rating")%></option></select></span></div></div><div id="<%=id%>" class="kkps-items"><ul></ul></div></div><% } %>',
        registerTile: '<script type="text/javascript">$(function() {$.datepicker.setDefaults($.datepicker.regional[\'<%=locale.slice(0,2)%>\']);$(\'#kkDatepicker\').datepicker({changeMonth: true, changeYear: true, dateFormat: \'<%=getMsg("datepicker.date.format")%>\', yearRange: "-120:-10", minDate: \'-120y\', maxDate: \'-10y\'});});<\/script><h1 id="kk-page-title"><%=getMsg("register.tile.new.account")%></h1><div class="kk-content-area kk-rounded-corners"><div><div id="kk-error"></div><form action="#" id="kk-register-form" method="post"><div class="kk-form-section"><div><h3><%=getMsg("register.tile.personal.details")%><span class="kk-required-text"><span class="kk-required-icon kk-required-blue"></span>&nbsp;<%=getMsg("register.tile.required.fields")%></span></h3></div><div class="kk-form-section-fields"><div class="kk-form-section-divider"></div><div class="kk-form-input kk-radio-buttons"><label><%=getMsg("register.tile.gender")%></label><span class="kk-radio-button"><input type="radio" name="kkGender" value="m" "checked" > <%=getMsg("register.tile.male")%></span><span class="kk-radio-button"><input type="radio" name="kkGender" value="f" > <%=getMsg("register.tile.female")%></span><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("register.tile.first.name")%></label><input type="text" value="" id="kkFirstName" name="kkFirstName"/><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("register.tile.last.name")%></label><input type="text" value="" id="kkLastName" name="kkLastName"/><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("register.tile.dob")%></label><input type="text" id="kkDatepicker"  value="" name="kkBirthDateString"/><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("register.tile.email")%></label><input type="text" value=""  id="kkEmailAddr" name="kkEmailAddr"/><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("register.tile.username")%></label><input type="text" value=""  id="kkUsername" name="kkUsername"/><span class="kk-validation-msg"></span></div></div></div><div class="kk-form-section"><h3><%=getMsg("register.tile.company.details")%></h3><div class="kk-form-section-fields"><div class="kk-form-section-divider"></div><div class="kk-form-input"><label><%=getMsg("register.tile.company.name")%></label><input type="text" value="" id="kkCompany" name="kkCompany"/><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("register.tile.tax.id")%></label><input type="text" value="" id="kkTaxId" name="kkTaxId"/><span class="kk-validation-msg"></span></div></div></div><div class="kk-form-section"><h3><%=getMsg("register.tile.addr")%></h3><div class="kk-form-section-fields"><div class="kk-form-section-divider"></div><div class="kk-form-input"><label><%=getMsg("register.tile.street.addr")%></label><input type="text" value="" id="kkStreetAddress" name="kkStreetAddress"/><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("register.tile.street.addr1")%></label><input type="text" value="" id="kkStreetAddress1" name="kkStreetAddress1" /><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("register.tile.suburb")%></label><input  type="text" value="" id="kkSuburb" name="kkSuburb"/><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("register.tile.postcode")%></label><input type="text" value="" id="kkPostcode" name="kkPostcode" /><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("register.tile.city")%></label><input type="text" value="" id="kkCity" name="kkCity" /><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input" id="kk-form-zone-select" ><label><%=getMsg("register.tile.state")%></label><select id="kkStateList" name="kkStateList" class="kkState"><option value="-1"><%=getMsg("register.tile.select")%></option><% for (var i = 0; i < zones.length; i++){ %><% var zone = zones[i];%><option  value="<%=zone.zoneName%>"><%=zone.zoneName%></option><% } %></select><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input" id="kk-form-zone-input"><label><%=getMsg("register.tile.state")%></label><input type="text" id="kkState" name="kkState" /><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("register.tile.country")%></label><select id="kkCountryId" name="kkCountryId" onchange="kk.changeCountry();"><option value="-1"><%=getMsg("register.tile.select")%></option><%if (countries != null){%><%for ( var i = 0; i < countries.length; i++)\t{%><%var country = countries[i];%><%if (country.isoCode3 == defaultCountryCode){ %><option selected="selected" value="<%=country.id%>"><%=country.name%></option><% } else { %><option value="<%=country.id%>"><%=country.name%></option><% } %><% } %><% } %></select><span class="kk-required-icon kk-required-green"></span><span class="kk-validation-msg"></span></div></div></div><div class="kk-form-section"><h3><%=getMsg("register.tile.contact.info")%></h3><div class="kk-form-section-fields"><div class="kk-form-section-divider"></div><div class="kk-form-input"><label><%=getMsg("register.tile.tel.number")%></label><input type="text" value="" id="kkTelephoneNumber" name="kkTelephoneNumber" /><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("register.tile.tel.number1")%></label><input type="text" value="" id="kkTelephoneNumber1" name="kkTelephoneNumber1" /><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("register.tile.fax.number")%></label><input type="text" value="" id="kkFaxNumber" name="kkFaxNumber" /><span class="kk-validation-msg"></span></div></div></div><div class="kk-form-section"><h3><%=getMsg("register.tile.subscriptions")%></h3><div class="kk-form-section-fields"><div class="kk-form-section-divider"></div><div class="kk-form-input"><label><%=getMsg("register.tile.newsletter")%></label><input type="checkbox" id="kkNewsletter" name="kkNewsletter"></div></div></div><div class="kk-form-section"><h3><%=getMsg("register.tile.password")%></h3><div class="kk-form-section-fields"><div class="kk-form-section-divider"></div><div class="kk-form-input"><label><%=getMsg("register.tile.password")%></label><input type="password" name="kkPassword" id="kkPassword" autocomplete="off" value=""/><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div><div class="kk-form-input"><label><%=getMsg("register.tile.confirm.password")%></label><input type="password" id="kkPasswordConfirmation" name="kkPasswordConfirmation" autocomplete="off" value=""/><span class="kk-required-icon kk-required-blue"></span><span class="kk-validation-msg"></span></div></div></div><div class="kk-form-buttons"><a  id="kk-register" class="kk-continue-button kk-button kk-small-rounded-corners"><span><%=getMsg("register.tile.continue")%></span></a></div></form></div></div>',
        reviewsTile: '<%if (reviews != null && reviews.length > 0){ %><div id="kkrt-average-customer-reviews"><div id="kkrt-average-customer-reviews-meters"><% for (var i = 5; i > 0; i--){ %><%var qty = ratingQuantity[i-1]; %><div class="kkrt-average-customer-reviews-meter-container"><div class="kkrt-average-customer-reviews-meter-label"><%if (qty > 0){ %><a  id=\'<%="kkrt-"+i%>\' class="kkrt-review-meter-rating"><span class="<%=(searchRating==i)?"kk-selected":"kk-not-selected"%>"></span><%=i%>&nbsp;<%=getMsg("reviews.tile.stars")%></a><%}else{%><span class="<%=(searchRating==i)?"kk-selected":"kk-not-selected"%>"></span><%=i%>&nbsp;<%=getMsg("reviews.tile.stars")%><%}%></div><div class="kkrt-average-customer-reviews-meter"><span id="<%=i%>star" style="width:<%=ratingPercentage[i-1]%>%"></span></div><div class="kkrt-average-customer-reviews-number">(<%=qty%>)</div></div><%}%></div><div id="kkrt-average-customer-reviews-stars"><div id="kkrt-average-customer-reviews-stars-title"><%=getMsg("reviews.tile.average.reviews")%>:</div><%var rating = (prod.rating == null) ? 0 : formatNumber(prod.rating,0);%><div class="kkrt-rating-big"><%for (var i = 0; i < rating; i++){%><span class="kkrt-star-big full"></span><%}%><%for (var i = rating; i < 5; i++){%><span class="kkrt-star-big empty"></span><%}%><%var ratingDecStr = (prod.rating==null)?"0":Math.round(prod.rating*10) / 10; %>&nbsp;(<%=ratingDecStr%>)</div><div class="kkrt-write-review"><a href=\'#\' id=\'<%="kkrt-"+prod.id%>\' class="kkrt-write-review-button kk-button kk-small-rounded-corners"><%=getMsg("reviews.tile.write.review")%></a></div></div></div><div class="kkrt-product-reviews-navigation"><div class="kkrt-product-reviews-navigation-top"><span class="kkrt-number-of-items kkrt-navigation-element"><%=dataDesc.offset+1%>-<%=+dataDesc.offset + +numRevs%> <%=getMsg("reviews.tile.of")%> <%=totalNumRevs%></span><span class="kkrt-pagination kkrt-navigation-element"><a class="kkrt-pagination-element kkrt-previous-items<%=(showBack)?"":"-inactive"%>" id=\'<%=prod.id+"-B"%>\'></a><% for ( var i = 0; i < pageList.length; i++) { %><% var page = pageList[i]; %><% if (page == currentPage) { %><a class="kkrt-pagination-element kkrt-page-num kkrt-current" id=\'<%=prod.id+"p-"+page%>\'><%=page%></a><% } else { %><a class="kkrt-pagination-element kkrt-page-num" id=\'<%=prod.id+"p-"+page%>\'><%=page%></a><% } %><% }  %><a class="kkrt-pagination-element kkrt-next-items<%=(showNext)?"":"-inactive"%>" id=\'<%=prod.id+"-F"%>\'></a></span></div><div class="kkrt-product-reviews-navigation-bottom"><span class="kkrt-show-per-page-area kkrt-navigation-element"><select class="kkrt-show-per-page" id=\'<%=prod.id + "-P1"%>\' onchange="kk.changeReviewsPageSize(\'<%=prod.id + "-P1"%>\')"><option value="5"<%=(maxRevsPerPage==5)?\' selected="selected"\':\'\'%>>5</option><option value="10"<%=(maxRevsPerPage==10)?\' selected="selected"\':\'\'%>>10</option><option value="15"<%=(maxRevsPerPage==15)?\' selected="selected"\':\'\'%>>15</option><option value="20"<%=(maxRevsPerPage==20)?\' selected="selected"\':\'\'%>>20</option></select><%=getMsg("reviews.tile.per.page")%></span><span class="kkrt-sort-by-area kkrt-navigation-element"><%=getMsg("reviews.tile.sort")%>:<select class="kkrt-sort-by" id=\'<%=prod.id+"-O1"%>\' onchange="kk.changeReviewsSortBy(\'<%=prod.id+"-O1"%>\')"><option value="ORDER_BY_DATE_ADDED_DESCENDING"<%=(dataDesc.orderBy==\'ORDER_BY_DATE_ADDED_DESCENDING\')?\' selected="selected"\':\'\'%>><%=getMsg("reviews.tile.sort.by.most.recent")%></option><option value="ORDER_BY_DATE_ADDED_ASCENDING"<%=(dataDesc.orderBy==\'ORDER_BY_DATE_ADDED_ASCENDING\')?\' selected="selected"\':\'\'%>><%=getMsg("reviews.tile.sort.by.oldest")%></option><option value="ORDER_BY_RATING_DESCENDING"<%=(dataDesc.orderBy==\'ORDER_BY_RATING_DESCENDING\')?\' selected="selected"\':\'\'%>><%=getMsg("reviews.tile.sort.by.rating.desc")%></option><option value="ORDER_BY_RATING_ASCENDING"<%=(dataDesc.orderBy==\'ORDER_BY_RATING_ASCENDING\')?\' selected="selected"\':\'\'%>><%=getMsg("reviews.tile.sort.by.rating.asc")%></option></select></span></div></div><div id="kkrt-product-reviews-area"><% for (var i = 0; i < reviews.length; i++){ %><% var rev = reviews[i];%><div class="kkrt-product-review"><div class="kkrt-rating"><%for (var j = 0; j < rev.rating; j++){%><span class="kkrt-star full"></span><%}%><%for (var j = rev.rating; j < 5; j++){%><span class="kkrt-star empty"></span><%}%></div><div class="kkrt-product-review-details"><%=getMsg("reviews.tile.by")%> <span class="kkrt-product-review-details-author"><%=rev.customerName%></span><span class="kkrt-product-review-details-date"><%=formatDate(rev.dateAdded)%></span></div><p><%=rev.reviewText%></p></div><%}%></div><% } else { %><p style="clear:both"><a href=\'#\' id=\'<%="kkrt-"+prod.id%>\' class="kkrt-write-review-button kkrt-text-link"><%=getMsg("reviews.tile.write.first.review")%></a></p><% } %>',
        searchTile: '<%if (useSolr) { %><script type="text/javascript">$(function() {$("#kkst-search-input").autocomplete({source : function(request, response) {var options = new Object();options.languageCode = kk.getLangCode();options.limit = "10";options.startTag = "<b>";options.endTag = "</b>";options.searchText = request.term.toLowerCase();options.returnRichText = "true";options.returnRawText = "true";options.topLevelCategoryId = $("#kkst-top-cat-list").val();kkEng.getSuggestedSearchItems(kk.getSessionId(), options, function(result,textStatus, jqXHR) {var ssArray = decodeJson(result);var srArray = [];for (var i = 0; i < ssArray.length; i++) {var ss = ssArray[i];var sr = new Object();sr.label = kk.processTermResult(ss.richText, /* rich */true);sr.value = kk.processTermResult(ss.rawText, /* rich */false);sr.id = ss.id + "," + ss.manufacturerId + "," + ss.categoryId;srArray[i] = sr;}response(srArray);}, null, kk.getKKEng());},minLength : 1,select : function(event, ui) {self.kk.search(ui.item.id, ui.item.value);}}).data("uiAutocomplete")._renderItem = function(ul, item) {ul.addClass(\'ui-corner-all\');return $("<li class=\'ui-corner-all\'></li>").data("item.autocomplete", item).append("<a>" + item.label + "</a>").appendTo(ul);};});<\/script><% } %><div id="kkst-header-container"><div id="kkst-header"><div id="kkst-logo"><a href="http://www.cdoautopartes.com.mx/PortalRamaCdo/"><img src="http://localhost:8780/konakart_tiles/gensrc/images/logo-cdo.png"></a></div><div id="kkst-search"><select id="kkst-top-cat-list" class="kk-rounded-corners-left"><option  value="-1"><%=getMsg("search.tile.all")%></option><%for (var i = 0; i < catTree.length; i++) {%><%var cat = catTree[i]; %><option  value="<%=cat.id%>"><%=cat.name%></option><% } %></select><input type="text" id="kkst-search-input"><a id="kkst-search-button"\tclass="kk-rounded-corners-right"></a></div></div></div>',
        verticalCarouselTile: "<script type=text/javascript>var <%=id%> = $('#<%=id%>');<%=id%>.on('jcarousel:reloadend', function () {<%=id%>.jcarousel('scroll', 0, true, function (scrolled) {kk.setVerticalControls(<%=id%>, $('#<%=id%>-prev'), $('#<%=id%>-next'));})}).jcarousel({vertical : true,wrap : null});$('#<%=id%>-prev').jcarouselControl({method : function () {<%=id%>.jcarousel('scroll', '-=' + <%=id%>.jcarousel('visible').length);kk.setVerticalControls(<%=id%>, $('#<%=id%>-prev'), $('#<%=id%>-next'));}});$('#<%=id%>-next').jcarouselControl({method : function () {<%=id%>.jcarousel('scroll', '+=' + <%=id%>.jcarousel('visible').length);kk.setVerticalControls(<%=id%>, $('#<%=id%>-prev'), $('#<%=id%>-next'));}});<\/script><div class=\"kkvca-item-area-sidebar kkpt-small kk-rounded-corners\"><div class=\"kkvca-item-area-header jcarousel-wrapper\"><h2 class=\"kkvca-item-area-title\"><%=title%></h2><a class=\"jcarousel-vertical-control-prev jcarousel-border-prev prev-items-down-inactive\" id=\"<%=id%>-prev\"  data-jcarouselcontrol=\"true\"></a><a class=\"jcarousel-vertical-control-next jcarousel-border-next next-items-up\" id=\"<%=id%>-next\"  data-jcarouselcontrol=\"true\"></a></div><div class=\"jcarousel-vertical\" id=\"<%=id%>\" data-jcarousel=\"true\"><ul style=\"left: 0px; top: 0px;\"></div></div>",
        writeReviewTile: '<h1 id="kk-page-title"><%=getMsg("write.review.title",prod.name)%></h1><div class="kk-content-area kk-rounded-corners"><div><form action="#" id="kk-write-review-form" method="post"><div class="kk-form-section"><div class="kwrt-input"><div class="kk-form-input"><label><%=getMsg("write.review.your.review")%></label><textarea  id="kkReviewText" name="kkReviewText"></textarea><span class="kk-validation-msg"></span></div></div></div><div class="kk-form-section"><div class="kwrt-input"><div class="kk-form-input"><span class="kkwrt-rating-buttons"><label><%=getMsg("write.review.rating")%></label><span class="kkwrt-rating-text"><%=getMsg("write.review.bad")%></span><input type="radio" name="kkRating"  value="1"/><input type="radio" name="kkRating"  value="2"/><input type="radio" name="kkRating"  value="3"/><input type="radio" name="kkRating"  value="4"/><input type="radio" name="kkRating"  value="5"/><span class="kkwrt-rating-text"><%=getMsg("write.review.good")%></span></span><span class="kk-validation-msg"></span></div></div></div><div class="kk-form-buttons"><a id="kk-review-submit" class="kk-continue-button kk-button kk-small-rounded-corners"><span><%=getMsg("write.review.submit")%></span></a><a id="kk-write-review-back" class="kk-button kk-small-rounded-corners"><span><%=getMsg("write.review.back")%></span></a></div></form></div></div>'
    },
    kkRoot = "http://localhost:8780/konakart/",
    kkRoot2 = "http://localhost:8780/konakart_tiles/gensrc/",
    kkProdDetailsURL = null,
    kkManageCartURL = null,
    kkManageWishlistURL = null,
    kkCheckoutURL = null,
    kkConf = new engineConfig(kkRoot + "konakartjson");
kkConf.storeId = "store1";
kkConf.protocol = "jsonp";
var kkConfCustom = new engineConfig(kkRoot + "konakartjsoncss");
kkConfCustom.storeId = "store1";
kkConfCustom.protocol = "jsonp";
var kkImgBase = kkRoot + "images/",
    kkImgBase2 = kkRoot2 + "images/",
    kkGetProdImages = true,
    kkDisplayPriceWithTax = false,
    kkDisplayCouponEntry = true,
    kkDisplayGiftCertificateEntry = true,
    kkSendOrderConfirmationMail = true,
    kkSolrEnabled = null,
    kkQuantityWarn = 5,
    kkVersion = null,
    kkAllowFacebookLogin = null,
    kkAllowGooglePlusLogin = null,
    kkAllowLiferaySSO = null,
    KK_DEFAULT_LOCALE = "en_GB",
    KK_DEFAULT_CURRENCY_CODE = "USD",
    KK_DEFAULT_COUNTRY_CODE = "USA",
    KK_DEFAULT_STRING = "-",
    KK_DEFAULT_DOB_YEAR = "1800",
    KK_NEW_PASSWORD_TEMPLATE = "EmailNewPassword",
    kk = {},
    kkEngine = new kkEng(kkConf),
    kkEngineCustom = new kkEng(kkConfCustom),
    kkSessionId = null,
    SESSION_CHECK_MILLIS = 6E5,
    kkCustomerId = null,
    polyglot = null,
    kkMsgMap = {},
    kkLocale = KK_DEFAULT_LOCALE,
    kkLangId = -1,
    kkCurrencyMap = {},
    kkCurrencyCode = KK_DEFAULT_CURRENCY_CODE,
    KK_SEARCH_ALL = -100,
    KK_SEARCH_IN_PRODUCT_DESCRIPTION = -99,
    KK_PENDING_STATUS = 1,
    KK_PROCESSING_STATUS = 2,
    KK_DELIVERED_STATUS = 3,
    KK_WAITING_PAYMENT_STATUS = 4,
    KK_PAYMENT_RECEIVED_STATUS = 5,
    KK_PAYMENT_DECLINED_STATUS = 6,
    KK_PARTIALLY_DELIVERED_STATUS = 7,
    KK_CANCELLED_STATUS = 8,
    KK_REFUND_APPROVED_STATUS =
    9,
    KK_REFUND_DECLINED_STATUS = 10,
    KK_COD = 1,
    KK_BROWSER_PAYMENT_GATEWAY = 2,
    KK_SERVER_PAYMENT_GATEWAY = 3,
    KK_BROWSER_IN_FRAME_PAYMENT_GATEWAY = 4,
    KK_CUSTOMER_ID = "KK_CUSTOMER_ID",
    KK_SESSION_ID = "KK_SESSION_ID",
    KK_SESSION_TIME = "KK_SESSION_TIME",
    TEMPLATE_ROOT = "template/",
    TEMPLATE_EXT = ".html",
    dateFormat = function() {
        var a = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
            b = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
            c = /[^-+\dA-Z]/g,
            d = function(a, b) {
                a = String(a);
                for (b = b || 2; a.length < b;) a = "0" + a;
                return a
            };
        return function(e, f, g) {
            var h = dateFormat;
            arguments.length == 1 && Object.prototype.toString.call(e) == "[object String]" && !/\d/.test(e) && (f = e, e = void 0);
            e = e ? new Date(e) : new Date;
            if (isNaN(e)) throw SyntaxError("invalid date");
            f = String(h.masks[f] || f || h.masks["default"]);
            f.slice(0, 4) == "UTC:" && (f = f.slice(4), g = true);
            var i = g ? "getUTC" : "get",
                j = e[i + "Date"](),
                k = e[i + "Day"](),
                l = e[i + "Month"](),
                q = e[i + "FullYear"](),
                m = e[i + "Hours"](),
                n = e[i +
                    "Minutes"](),
                o = e[i + "Seconds"](),
                i = e[i + "Milliseconds"](),
                p = g ? 0 : e.getTimezoneOffset(),
                r = {
                    d: j,
                    dd: d(j),
                    ddd: h.i18n.dayNames[k],
                    dddd: h.i18n.dayNames[k + 7],
                    m: l + 1,
                    mm: d(l + 1),
                    mmm: h.i18n.monthNames[l],
                    mmmm: h.i18n.monthNames[l + 12],
                    yy: String(q).slice(2),
                    yyyy: q,
                    h: m % 12 || 12,
                    hh: d(m % 12 || 12),
                    H: m,
                    HH: d(m),
                    M: n,
                    MM: d(n),
                    s: o,
                    ss: d(o),
                    l: d(i, 3),
                    L: d(i > 99 ? Math.round(i / 10) : i),
                    t: m < 12 ? "a" : "p",
                    tt: m < 12 ? "am" : "pm",
                    T: m < 12 ? "A" : "P",
                    TT: m < 12 ? "AM" : "PM",
                    Z: g ? "UTC" : (String(e).match(b) || [""]).pop().replace(c, ""),
                    o: (p > 0 ? "-" : "+") + d(Math.floor(Math.abs(p) /
                        60) * 100 + Math.abs(p) % 60, 4),
                    S: ["th", "st", "nd", "rd"][j % 10 > 3 ? 0 : (j % 100 - j % 10 != 10) * j % 10]
                };
            return f.replace(a, function(a) {
                return a in r ? r[a] : a.slice(1, a.length - 1)
            })
        }
    }();
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};
dateFormat.i18n = {
    dayNames: "Sun,Mon,Tue,Wed,Thu,Fri,Sat,Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
    monthNames: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec,January,February,March,April,May,June,July,August,September,October,November,December".split(",")
};
Date.prototype.format = function(a, b) {
    return dateFormat(this, a, b)
};
kkMsgMap.en_GB = {
    "exception.render.tile": "%{0} must be called before calling %{1}",
    "datepicker.date.format": "dd/mm/yy",
    "dateformat.date.format": "dd/mm/yyyy",
    "number.decimal": ".",
    "number.thousand": ",",
    "account.tile.total": "Total",
    "account.tile.item": "Item",
    "account.tile.quantity": "Quantity",
    "account.tile.notifications": "Notifications",
    "account.tile.view": "View",
    "account.tile.repeat": "Repeat",
    "account.tile.track": "Track",
    "account.tile.invoice": "Invoice",
    "account.tile.changeaccountinfo": "Manage account information",
    "account.tile.changeaddrbook": "Manage address book",
    "account.tile.changeemail": "Change Email and Username",
    "account.tile.changepassword": "Change password",
    "account.tile.changeprodnotlist": "Manage product notifications",
    "account.tile.createweddinglist": "Create a wedding list",
    "account.tile.emailnotifications": "E-Mail Notifications",
    "account.tile.last.orders": "Last Orders",
    "account.tile.managepreferences": "Manage Preferences",
    "account.tile.manageCreditCards": "Manage Credit Cards",
    "account.tile.myaccount": "My Account",
    "account.tile.myaccountinfo": "My Account Information",
    "account.tile.myorders": "My Orders",
    "account.tile.newsletterOk": "Your newsletter subscription has been successfully updated.",
    "account.tile.overview": "Overview",
    "account.tile.personal.information": "Personal Information",
    "account.tile.previousorders": "Previous Orders",
    "account.tile.primary.address": "Primary Address",
    "account.tile.productnotificationOk": "Your product notifications have been successfully updated.",
    "account.tile.gateway.problem": "There has been a problem communicating with the payment gateway",
    "account.tile.sendpassword": "Send me a password",
    "account.tile.showallorders": "View All",
    "account.tile.showrewardpoints": "View Statement",
    "account.tile.subscribenewsletter": "Newsletter subscriptions",
    "account.tile.times": "time(s)",
    "account.tile.vieworders": "View the orders I have made",
    "account.tile.downloads": "Downloads",
    "account.tile.downloaded": "Downloaded %{0} time(s)",
    "account.tile.download": "Download",
    "account.tile.add.addr": "Add an address",
    "account.tile.close": "Close",
    "account.tile.confirm": "Confirm",
    "account.tile.confirmation": "Confirmation",
    "account.tile.sendpassword.confirmation": "A new password will be generated and sent to your email address <b>%{0}</b>.<br/><br/>Click the Confirm button to proceed.",
    "cart.tile.empty": "Your Shopping Cart is empty",
    "cart.tile.quantity": "Quantity",
    "cart.tile.shoppingcart": "Shopping Cart",
    "cart.tile.subtotal": "Subtotal",
    "cart.tile.checkout": "Checkout",
    "edit.cart.tile.emptycart": "Your Shopping Cart is empty",
    "edit.cart.tile.item": "Item",
    "edit.cart.tile.price": "Price",
    "edit.cart.tile.total": "Total",
    "edit.cart.tile.editcart": "Manage your Shopping Cart",
    "edit.cart.tile.qty.validation": "Quantity must be an integer",
    "edit.cart.tile.out.of.stock": "Sold<br/>Out",
    "edit.cart.tile.update": "Update",
    "edit.cart.tile.remove.item": "Remove item",
    "edit.cart.tile.couponcode": "Coupon Code",
    "edit.cart.tile.giftcertcode": "Gift Certificate",
    "customer.info.select": "Please Select",
    "customer.info.account.success": "Your account information has been successfully updated.",
    "customer.info.addr": "Address",
    "customer.info.back": "Back",
    "customer.info.change.email": "Change Email",
    "customer.info.changepassword": "Change Password",
    "customer.info.changepassword.ok": "Your password has been successfully updated.",
    "customer.info.continue": "Continue",
    "customer.info.city": "City",
    "customer.info.company.details": "Company Details",
    "customer.info.company.name": "Company Name",
    "customer.info.confirm.password": "Password Confirmation",
    "customer.info.contact.info": "Contact Information",
    "customer.info.country.required": "Country is required",
    "customer.info.country": "Country",
    "customer.info.currentpassword": "Current Password",
    "customer.info.delivery.details": "Delivery Details",
    "customer.info.dob": "Date of Birth",
    "customer.info.delete": "Delete",
    "customer.info.edit": "Edit",
    "customer.info.editaddr": "Update Address Book Entry",
    "customer.info.editemail.ok": "Your details have been successfully updated",
    "customer.info.email": "E-Mail Address",
    "customer.info.fax.number": "Fax Number",
    "customer.info.female": "Female",
    "customer.info.first.name": "First Name",
    "customer.info.gender": "Gender",
    "customer.info.insert": "Insert",
    "customer.info.insert.primary": "Insert your Primary Address",
    "customer.info.last.name": "Last Name",
    "customer.info.login.page": "login page",
    "customer.info.male": "Male",
    "customer.info.myaccount": "My Account",
    "customer.info.mypassword": "My Password",
    "customer.info.new.account": "New Account",
    "customer.info.newaddrbook": "New Address Book Entry",
    "customer.info.newsletter.subscriptions": "Newsletter Subscriptions",
    "customer.info.newsletter.contents": "Check the box to subscribe to the newsletter. It's issued monthly and includes store news, new products, special offers, and other promotional announcements.",
    "customer.info.newsletter.success": "Your newsletter subscription has been successfully updated.",
    "customer.info.newpassword": "New Password",
    "customer.info.newsletter": "Newsletter",
    "customer.info.password": "Password",
    "customer.info.passwordconfirmation": "Password Confirmation",
    "customer.info.password.no.match": "Your Current Password did not match the password in our records. Please try again.",
    "customer.info.personal.details": "Personal Details",
    "customer.info.postcode": "Post Code",
    "customer.info.primary": "Primary Address",
    "customer.info.required.fields": "Required Fields",
    "customer.info.required.info": "Required information",
    "customer.info.setprimary": "Set as primary address",
    "customer.info.save": "Save",
    "customer.info.state": "State/Province",
    "customer.info.street.addr": "Street Address",
    "customer.info.street.addr1": "Street Address 1",
    "customer.info.subscriptions": "Subscriptions",
    "customer.info.suburb": "Suburb",
    "customer.info.tax.id": "Tax Id",
    "customer.info.tel.number": "Primary Telephone Number",
    "customer.info.tel.number1": "Other Telephone Number",
    "customer.info.update": "Update",
    "customer.info.username": "Username",
    "customer.info.email.exists": "A customer with email address = %{0} already exists.",
    "customer.info.username.exists": "A customer with username = %{0} already exists.",
    "customer.info.login.error": "Unable to log into the storefront.",
    "customer.info.newaddress": "New Address",
    "customer.info.addressbookentries": "Address Book Entries",
    "customer.info.addressupdated": "Your address book has been successfully updated",
    "customer.info.addrexplanation": "This address is used as the pre-selected shipping and billing address for orders placed on this store.<br><br>This address is also used as the base for product and shipping tax calculations.",
    "customer.info.deleteerror": "The primary address cannot be deleted. Please set another address as the primary address and try again.",
    "customer.info.mypersonaladdressbook": "My Personal Address Book",
    "customer.info.note": "NOTE",
    "customer.info.primaryaddress": "Primary Address",
    "customer.info.removedok": "The selected address has been successfully removed from your address book.",
    "customer.info.prod.notify.gprodnots": "Global Product Notifications",
    "customer.info.prod.notify.info": "The product notification list allows you to stay up to date on products you find of interest. To be up to date on all product changes, select <b>Global Product Notifications</b>",
    "customer.info.prod.notify.myprodnots": "My Product Notifications",
    "customer.info.prod.notify.noprodnots": "There are currently no products marked to be notified on.<br><br>To add products to your product notification list, click on the notification link available on the detailed product information page",
    "customer.info.prod.notify.prodnots": "Product Notifications",
    "customer.info.prod.notify.recprodnots": "Receive notifications on all available products",
    "customer.info.prod.notify.remprodnots": "To remove one or more product notifications, select the products and then click on Save",
    "login.link.my.account": "My Account",
    "login.link.logout": "Log Off",
    "login.tile.sign.in": "Sign In",
    "login.tile.returning.customer": "Returning Customer",
    "login.tile.email": "E-Mail or Username",
    "login.tile.password": "Password",
    "login.tile.forgotten.password": "Forgot your Password?",
    "login.tile.new.customer": "New Customer?",
    "login.tile.register": "Register an Account",
    "login.tile.checkout": "Checkout as a Guest",
    "login.tile.login.error": "No match for Username and/or Password.",
    "login.tile.use.social.network": "Login using a social network account",
    "login.tile.gp.processing": "Processing....",
    "login.tile.gp.no.email": "Cannot login using Google+ since your account does not have an email address.",
    "login.tile.gp.no.auth": "Authorization from Google+ was not received.",
    "login.tile.fb.processing": "Processing....",
    "login.tile.fb.no.auth": "Authorization from Facebook was not received.",
    "login.tile.fb.no.email": "Cannot login using Facebook since your account does not have an email address.",
    "opc.tile.addr.book": "Address Book",
    "opc.tile.addr.book.header": "Address Book",
    "opc.tile.addr.book.tip": "Pick an address from your address book",
    "opc.tile.billingaddress": "Billing Address",
    "opc.tile.close": "Close",
    "opc.tile.confirmorder": "Confirm Order",
    "opc.tile.deliveryaddress": "Delivery Address",
    "opc.tile.delivery.notes": "Delivery Notes",
    "opc.tile.dialog.addr.select": "Select an address from the list",
    "opc.tile.edit.addr.tip": "Modify this address and save the changes in your address book",
    "opc.tile.edit.cart.tip": "Go to the Manage Cart page to modify the contents of your cart ",
    "opc.tile.orderconfirmation": "Order Confirmation",
    "opc.tile.edit": "Edit",
    "opc.tile.info": "Comments or Info for Carrier",
    "opc.tile.item": "Item",
    "opc.tile.new": "New",
    "opc.tile.new.addr.tip": "Enter a new address and save it it in your address book",
    "opc.tile.order.success": "Your order as been received successfully. On this page you can track its progresss",
    "opc.tile.paymentmethod": "Payment Method",
    "opc.tile.problem": "We're sorry but unfortunately there has been a problem processing your order. Please contact our support desk.",
    "opc.tile.problem.title": "Checkout Validation",
    "opc.tile.quantity": "Quantity",
    "opc.tile.shippingmethod": "Shipping Method",
    "opc.tile.select": "Select",
    "opc.tile.shopping.cart": "Shopping Cart",
    "opc.tile.total": "Total",
    "opc.tile.error.payment.details": "Missing Payment Details",
    "opc.tile.error.payment.module.not.implemented": "Payment module has not been implemented",
    "opc.tile.update": "Update",
    "opc.tile.couponcode": "Coupon Code",
    "opc.tile.giftcertcode": "Gift Certificate",
    "opc.tile.no.products": "The order cannot be processed because none of the products are currently available",
    "order.detail.tile.billingaddress": "Billing Address",
    "order.detail.tile.deliveryaddress": "Delivery Address",
    "order.detail.tile.item": "Item",
    "order.detail.tile.paymentmethod": "Payment Method",
    "order.detail.tile.quantity": "Quantity",
    "order.detail.tile.shippingmethod": "Shipping Method",
    "order.detail.tile.order.details": "Order Details",
    "order.detail.tile.total": "Total",
    "order.detail.tile.orderinformation": "Order #%{0} on %{1}",
    "order.detail.tile.orderhistory": "Order History",
    "order.detail.tile.repeat": "Repeat",
    "order.detail.tile.date": "Date",
    "order.detail.tile.shipper": "Shipper",
    "order.detail.tile.track": "Track",
    "order.detail.tile.qty.shipped": "Qty. Shipped",
    "order.detail.tile.shipments": "Shipments",
    "order.detail.tile.back": "Back",
    "product.tile.in.stock": "In<br/>Stock",
    "product.tile.limited.stock": "<br/>Left",
    "product.tile.out.of.stock": "Sold<br/>Out",
    "product.tile.free.shipping.wrap": "Free<br/>Shipping",
    "product.tile.add.to.cart": "Add to Cart",
    "product.tile.add.to.wishlist": "Add to Wish List",
    "product.tile.free.shipping": "Free Shipping",
    "product.tile.reviews": "Reviews",
    "product.tile.save": "Save",
    "product.details.tile.add.specifications": "Add your product specifications here",
    "product.details.tile.available.options": "Available Options",
    "product.details.tile.dontnotifyme": "from my notification list",
    "product.details.tile.in.stock": "In stock",
    "product.details.tile.items.in.stock": "items in stock",
    "product.details.tile.limited.stock": "Only %{0} left in stock",
    "product.details.tile.more.information": "For more information, please visit this product",
    "product.details.tile.notifyme": "Notify me of updates to",
    "product.details.tile.out.of.stock": "Sold Out",
    "product.details.tile.product.not.found": "Details of this product cannot be found. It may be out of stock.",
    "product.details.tile.product.description": "Product Description",
    "product.details.tile.product.specifications": "Product Specifications",
    "product.details.tile.related": "Related items and accessories",
    "product.details.tile.remove": "Remove",
    "product.details.tile.reviews": "Customer Reviews",
    "product.details.tile.save": "save",
    "product.details.tile.share.this": "Share this",
    "product.details.tile.specifications": "Specifications",
    "product.details.tile.webpage": "webpage",
    "product.details.tile.related.items": "Related items",
    "product.details.tile.also.purchased": "People also purchased",
    "product.details.tile.validate.qty.option": "The quantity entered must be a number",
    "product.details.tile.validate.price.option": "The price entered must be a valid number",
    "product.details.tile.validate.text.option": "The length of the entered text cannot be greater than 512 characters",
    "products.tile.sort.products.by.most.viewed": "Most Viewed",
    "products.tile.sort.products.by.most.sold": "Most Sold",
    "products.tile.sort.products.by.price.asc": "Price: low to high",
    "products.tile.sort.products.by.price.desc": "Price: high to low",
    "products.tile.sort.products.by.rating": "Review Rating",
    "products.tile.of": "of",
    "products.tile.products": "products",
    "products.tile.sort": "Sort",
    "products.tile.per.page": "per page",
    "products.tile.spelling.suggestion": "No products were found for your search of <b>%{0}</b>. Click on any of the following suggestions to retry:",
    "products.tile.no.products": "There are no available products",
    "facets.tile.price": "Price",
    "facets.tile.clear.filters": "Clear Filters",
    "facets.tile.refine.search": "Refine Search",
    "facets.tile.manufacturers": "Manufacturers",
    "facets.tile.categories": "Categories",
    "facets.tile.price.range": "Price Range",
    "facet.blu.ray": "Blu-ray",
    "facet.hd.dvd": "HD-DVD",
    "facet.max.price": "Max Price",
    "facet.min.price": "Min Price",
    "facet.mpaa.g": "General Audience: G",
    "facet.mpaa.pg": "Parental Guidance: PG",
    "facet.mpaa.pg.13": "Parents Cautioned: PG-13",
    "facet.mpaa.r": "Restricted: R",
    "facet.mpaa.nc.17": "Adults Only: NC-17",
    "search.tile.all": "All",
    "search.tile.search": "Search",
    "register.tile.select": "Please Select",
    "register.tile.new.account": "New Account",
    "register.tile.addr": "Address",
    "register.tile.city": "City",
    "register.tile.company.details": "Company Details",
    "register.tile.company.name": "Company Name",
    "register.tile.confirm.password": "Password Confirmation",
    "register.tile.contact.info": "Contact Information",
    "register.tile.continue": "Continue",
    "register.tile.country.required": "Country is required",
    "register.tile.country": "Country",
    "register.tile.delivery.details": "Delivery Details",
    "register.tile.dob": "Date of Birth",
    "register.tile.email": "E-Mail Address",
    "register.tile.fax.number": "Fax Number",
    "register.tile.female": "Female",
    "register.tile.first.name": "First Name",
    "register.tile.gender": "Gender",
    "register.tile.last.name": "Last Name",
    "register.tile.login.page": "login page",
    "register.tile.male": "Male",
    "register.tile.newsletter": "Newsletter",
    "register.tile.password": "Password",
    "register.tile.personal.details": "Personal Details",
    "register.tile.postcode": "Post Code",
    "register.tile.required.fields": "Required Fields",
    "register.tile.required.info": "Required information",
    "register.tile.state": "State/Province",
    "register.tile.street.addr": "Street Address",
    "register.tile.street.addr1": "Street Address 1",
    "register.tile.subscriptions": "Subscriptions",
    "register.tile.suburb": "Suburb",
    "register.tile.tax.id": "Tax Id",
    "register.tile.tel.number": "Primary Telephone Number",
    "register.tile.tel.number1": "Other Telephone Number",
    "register.tile.username": "Username",
    "register.tile.email.exists": "A customer with email address = %{0} already exists.",
    "register.tile.username.exists": "A customer with username = %{0} already exists.",
    "register.tile.login.error": "Unable to log into the storefront.",
    "reviews.tile.sort.by.most.recent": "Most recent first",
    "reviews.tile.sort.by.oldest": "Oldest first",
    "reviews.tile.sort.by.rating.desc": "Rating: high to low",
    "reviews.tile.sort.by.rating.asc": "Rating: low to high",
    "reviews.tile.sort": "Sort",
    "reviews.tile.per.page": "per page",
    "reviews.tile.of": "of",
    "reviews.tile.by": "by",
    "reviews.tile.stars": "stars",
    "reviews.tile.average.reviews": "Average Customer Review",
    "reviews.tile.write.review": "Write Review",
    "reviews.tile.write.first.review": "Be the first to review this item",
    "write.review.title": "Write a review for %{0}",
    "write.review.your.review": "Your Review",
    "write.review.rating": "Your Star Rating",
    "write.review.bad": "BAD",
    "write.review.good": "GOOD",
    "write.review.back": "Back",
    "write.review.submit": "Submit",
    "wishlist.tile.empty": "Your Wish List is empty",
    "wishlist.tile.quantity": "Quantity",
    "wishlist.tile.wishlist": "Wish List",
    "wishlist.tile.subtotal": "Subtotal",
    "edit.wishlist.tile.item": "Item",
    "edit.wishlist.tile.priority": "Priority",
    "edit.wishlist.tile.price": "Price",
    "edit.wishlist.tile.remove.item": "Remove item",
    "edit.wishlist.tile.add.to.cart": "Add To Cart",
    "edit.wishlist.tile.editwishlist": "Manage your wishlist",
    "edit.wishlist.tile.highest": "highest",
    "edit.wishlist.tile.high": "high",
    "edit.wishlist.tile.medium": "medium",
    "edit.wishlist.tile.low": "low",
    "edit.wishlist.tile.lowest": "lowest",
    "edit.wishlist.tile.continue": "Continue Shopping",
    "edit.wishlist.tile.total": "Total",
    "forgot.pw.title": "Forgotten Password",
    "forgot.pw.explanation": "If you've forgotten your password, enter your e-mail address below and we'll send you an e-mail message containing your new password.",
    "forgot.pw.email": "E-Mail Address",
    "forgot.pw.send": "Send",
    "forgot.pw.back": "Back",
    "forgot.pw.sentpw": "A new password has been sent to your e-mail address",
    "forgot.pw.error.not.found": "The E-Mail Address was not found in our records, please try again",
    "orders.tile.no.orders": "No Orders Found",
    "orders.tile.of": "of",
    "orders.tile.orders": "orders",
    "orders.tile.per.page": "per page",
    "orders.tile.myorderhistory": "Order History",
    "orders.tile.total": "Total",
    "orders.tile.item": "Item",
    "orders.tile.quantity": "Quantity",
    "orders.tile.view": "View",
    "orders.tile.repeat": "Repeat",
    "orders.tile.track": "Track",
    "orders.tile.invoice": "Invoice",
    "orders.tile.back": "Back",
    "breadcrumb.tile.orderDetail": "Order Details",
    "breadcrumb.tile.wishlist": "Manage Wish List",
    "breadcrumb.tile.cart": "Manage Cart",
    "breadcrumb.tile.register": "Register",
    "breadcrumb.tile.account": "My Account",
    "breadcrumb.tile.login": "Login",
    "breadcrumb.tile.managePassword": "Manage Password",
    "breadcrumb.tile.manageEmail": "Manage Email",
    "breadcrumb.tile.managePersonalInfo": "Manage Personal Info",
    "breadcrumb.tile.insertAddress": "Insert Address",
    "breadcrumb.tile.editAddress": "Edit Address",
    "breadcrumb.tile.firstAddress": "Primary Address",
    "breadcrumb.tile.manageAddressBook": "Manage Address book",
    "breadcrumb.tile.newsletterSubscription": "Newsletter Subscription",
    "breadcrumb.tile.productNotification": "Product Notification",
    "breadcrumb.tile.checkout": "Checkout",
    "breadcrumb.tile.writeReview": "Write Review",
    "breadcrumb.tile.forgotPassword": "Forgot Password",
    "breadcrumb.tile.orders": "Orders",
    "breadcrumb.tile.home": "Home",
    "breadcrumb.tile.search": "Search Results for %{0}",
    "form.validate.required": "Required field",
    "form.validate.creditcard": "Please enter a valid credit card number",
    "form.validate.digits": "'Please enter only digits",
    "form.validate.max": "Please enter no more than {0} characters",
    "form.validate.min": "Please enter at least {0} characters",
    "form.validate.exp.date": "Please specify a valid expiry date in the format MMYY",
    "form.validate.email": "Please enter a valid email address",
    "form.validate.url": "Please enter a valid URL",
    "form.validate.number": "Please enter a valid number",
    "form.validate.password.match": "The passwords do not match",
    "test.chinese": "\u8fdb\u8d27\u5355",
    "test.spanish": "\u00bfOlvid\u00f3 su contrase\u00f1a?",
    "test.arabic": "\u0645\u062f\u06cc\u0631\u06cc\u062a \u0633\u0628\u062f \u062e\u0631\u06cc\u062f"
};
kkCurrencyMap.GBP = {
    symbol: "\u00a3",
    format: "%s%v",
    precision: "2"
};
kkCurrencyMap.EUR = {
    symbol: "\u20ac",
    format: "%s%v",
    precision: "2"
};
kkCurrencyMap.USD = {
    symbol: "$",
    format: "%s%v",
    precision: "2"
};
kk.getProdDetailsURL = function(a) {
    return kkProdDetailsURL == null || window.location.href == kkProdDetailsURL ? null : kkProdDetailsURL.replace("{prodId}", a)
};
kk.getTempCustomerId = function(a) {
    var b = kk.getKKCookie(KK_CUSTOMER_ID);
    b == null ? kkEng.getTempCustomerId(function(b) {
        kkCustomerId = decodeJson(b);
        kk.setKKCookie(KK_CUSTOMER_ID, kkCustomerId, 30);
        a != null && a(kkCustomerId)
    }, null, kk.getKKEng()) : (kkCustomerId = b, a != null && a(kkCustomerId))
};
kk.getCustomerId = function(a) {
    kkCustomerId == null && a == null && alert("Customer Id has not been initialised. Must supply a callback.");
    if (kkCustomerId == null) kk.getTempCustomerId(a);
    else if (a != null) a(kkCustomerId);
    else return kkCustomerId
};
kk.getTemplate = function(a, b) {
    if (typeof kkTmplMap != "undefined") {
        var c = kkTmplMap[a];
        if (c != null) {
            b(_.template(c));
            return
        }
    }
    var d = TEMPLATE_ROOT + a + TEMPLATE_EXT;
    console.log("Reading template from file - " + d);
    $.get(d, function(a) {
        b(_.template(a))
    }, "html").fail(function() {
        alert("Failed to open template - " + d)
    })
};
kk.getKKEng = function() {
    return kkEngine
};
kk.getKKEngCustom = function() {
    return kkEngineCustom
};
kk.getSessionId = function() {
    kkSessionTime = kk.getKKCookie(KK_SESSION_TIME);
    if (kkSessionTime == null || kkSessionTime.length == 0) return kkSessionId = null;
    if ((new Date).getTime() - kkSessionTime > 18E5) return kkSessionId = null;
    kkSessionId == null && (kkSessionId = kk.getKKCookie(KK_SESSION_ID), kkSessionId != null && kkSessionId.length == 0 && (kkSessionId = null));
    return kkSessionId
};
kk.setSessionId = function(a) {
    kkSessionId = a;
    kk.setKKCookie(KK_SESSION_ID, kkSessionId == null ? "" : kkSessionId, 1);
    kk.setKKCookie(KK_SESSION_TIME, (new Date).getTime(), 1)
};
kk.checkSession = function(a, b, c) {
    typeof Liferay != "undefined" ? kkAllowLiferaySSO == null ? kkEng.getConfigurationValue("MODULE_OTHER_LIFERAY_LOGIN_CLASS", function(d) {
            kkLoginTileContext.liferayModuleClassName = decodeJson(d);
            kkLoginTileContext.liferayModuleClassName != null ? (console.log("CheckSession - Had to read config - SSO Enabled"), kkAllowLiferaySSO = true, kk.liferaySSO(a, b, c)) : (console.log("CheckSession - Had to read config - SSO Disabled"), kkAllowLiferaySSO = false, kk.checkSessionPrivate(a, b, c))
        }, null, kk.getKKEng()) :
        kkAllowLiferaySSO == true ? (console.log("CheckSession - SSO Enabled"), kk.liferaySSO(a, b, c)) : (console.log("CheckSession - SSO Disabled"), kk.checkSessionPrivate(a, b, c)) : kk.checkSessionPrivate(a, b, c)
};
kk.checkSessionPrivate = function(a, b, c) {
    kk.getSessionId() == null ? kk.renderLoginTile(b) : (new Date).getTime() - kkSessionTime > SESSION_CHECK_MILLIS || kkCustomerId == null || c ? kkEng.checkSession(kkSessionId, function(c) {
        var e = decodeJson(c, false);
        e == null || e.length == 0 ? (kk.setSessionId(null), kk.renderLoginTile(b)) : (kkCustomerId = e, kk.setSessionId(kkSessionId), kk.showLogoutLink(), kkAccountTileContext == null || kkAccountTileContext.customer == null ? kk.getCustomerInfo(function() {
            a(e)
        }) : a(e))
    }, null, kk.getKKEng()) : (kk.showLogoutLink(),
        kkAccountTileContext == null || kkAccountTileContext.customer == null ? kk.getCustomerInfo(function() {
            a(kkCustomerId)
        }) : a(kkCustomerId))
};
kk.liferaySSO = function(a, b, c) {
    Liferay.ThemeDisplay.isSignedIn() ? (kk.getSessionId(), (new Date).getTime() - kkSessionTime > SESSION_CHECK_MILLIS || kkSessionId == null || kkCustomerId == null || c ? kkSessionId != null ? (console.log("kk.liferaySSO - Checking sessionId which isn't null"), kkEng.checkSession(kkSessionId, function(b) {
        var c = decodeJson(b, false);
        c == null || c.length == 0 ? (console.log("kk.liferaySSO - Session not valid"), kk.setSessionId(null), kk.liferaySSOLogin()) : (console.log("kk.liferaySSO - Session checked and valid"),
            kk.getCustomerInfo(function() {
                kkAccountTileContext.customer != null ? Liferay.Service("/user/get-user-by-id", {
                    userId: Liferay.ThemeDisplay.getUserId()
                }, function(b) {
                    b.emailAddress.toUpperCase() === kkAccountTileContext.customer.emailAddr.toUpperCase() ? (console.log("kk.liferaySSO - Liferay Email matches"), kkCustomerId = c, kk.setSessionId(kkSessionId), a(kkCustomerId)) : (console.log("kk.liferaySSO - Liferay Email doesn't match"), kk.setSessionId(null), kk.liferaySSOLogin())
                }) : (console.log("kk.liferaySSO - Should never reach here"),
                    kk.setSessionId(null), kk.liferaySSOLogin())
            }))
    }, null, kk.getKKEng())) : (console.log("kk.liferaySSO - Session Id is null"), kk.liferaySSOLogin()) : (console.log("kk.liferaySSO - Assuming session is valid"), kkAccountTileContext == null || kkAccountTileContext.customer == null ? kk.getCustomerInfo(function() {
        a(kkCustomerId)
    }) : a(kkCustomerId))) : (console.log("kk.liferaySSO - Liferay User not logged in"), kk.setSessionId(null), kk.renderLoginTile(b))
};
kk.liferaySSOLogin = function() {
    Liferay.Service("/user/get-user-by-id", {
        userId: Liferay.ThemeDisplay.getUserId()
    }, function(a) {
        var b = a.emailAddress,
            c = a.firstName,
            d = a.lastName;
        kkEng.doesCustomerExistForEmail(b, function(a) {
            decodeJson(a) ? (console.log("kk.liferaySSOLogin - Customer exists"), kk.liferaySSOLogin1(b)) : (console.log("kk.liferaySSOLogin - Registering new customer"), a = {}, a.emailAddr = b, a.enabled = true, a.firstName = c, a.lastName = d, a.noGender = true, a.noBirthDate = true, a.noAddress = true, a.noTelephone = true,
                a.noPassword = true, kkEng.registerCustomer(a, function() {
                    kk.liferaySSOLogin1(b)
                }, null, kk.getKKEng()))
        }, null, kk.getKKEng())
    })
};
kk.liferaySSOLogin1 = function(a) {
    var b = {};
    b.moduleClassName = kkLoginTileContext.liferayModuleClassName;
    b.emailAddr = a;
    kkEng.externalLogin(b, function(a) {
        a = decodeJson(a);
        a.error ? (console.log(a.message), kk.renderLoginTilePrivate1()) : kk.afterLogin(a.sessionId)
    }, null, kk.getKKEng())
};
kk.getLangId = function() {
    kkLangId == -1 && kk.setDefaultLangId();
    return kkLangId
};
kk.setDefaultLangId = function() {
    kkEng.getAllLanguages(function(a) {
        for (var a = decodeJson(a), b = false, c = 0; c < a.length; c++) {
            var d = a[c];
            if (d.locale == kkLocale) {
                kkLangId = d.id;
                b = true;
                break
            }
        }
        if (!b && a.length > 0) kkLangId = a[0].id, console.log("Language not found for default locale " + kkLocale + " . Setting default language id to " + kkLangId)
    }, null, kk.getKKEng())
};
kk.getLangCode = function() {
    return kkLocale.slice(0, 2)
};
kk.getLocale = function() {
    return kkLocale
};
kk.getDefaultCountryCode = function() {
    return KK_DEFAULT_COUNTRY_CODE
};
kk.getMsg = function(a, b, c) {
    return b == null && c == null ? polyglot.t(a) : c != null ? polyglot.t(a, {
        0: _.escape(b),
        1: _.escape(c)
    }) : polyglot.t(a, {
        0: _.escape(b)
    })
};
kk.setCurrencyFormatter = function() {
    var a = kkCurrencyMap[kkCurrencyCode];
    a == null ? console.log("No currency has been defined in kk-currencies.js for the currency code " + kkCurrencyCode) : accounting.settings = {
        currency: {
            symbol: a.symbol,
            format: a.format,
            precision: a.precision,
            decimal: kk.getMsg("number.decimal"),
            thousand: kk.getMsg("number.thousand")
        },
        number: {
            precision: 0,
            thousand: kk.getMsg("number.thousand"),
            decimal: kk.getMsg("number.decimal")
        }
    }
};
kk.changeLocale = function(a, b, c) {
    b == null || b.length != 5 ? console.log("changeLocale API was passed an invalid locale - " + b) : kkMsgMap[b] == null ? console.log("A message catalog does not exist for the locale - " + b) : (kkLocale = b, polyglot = new Polyglot({
        phrases: kkMsgMap[kkLocale]
    }), c == null ? kkEng.getAllLanguages(function(c) {
        for (var c = decodeJson(c), e = false, f = 0; f < c.length; f++) {
            var g = c[f];
            if (g.locale == b) {
                kkLangId = g.id;
                e = true;
                break
            }
        }
        if (!e)
            for (var h = kk.getLangCode(), f = 0; f < c.length; f++)
                if (g = c[f], g.code == h) {
                    kkLangId = g.id;
                    e = true;
                    break
                }
        e || console.log("WARNING: No countries found in KonaKart database for locale " + b);
        a != null && a()
    }, null, kk.getKKEng()) : (kkLangId = c, a != null && a()))
};
kk.getImageBase = function() {
    return kkImgBase
};
kk.isDisplayPriceWithTax = function() {
    return kkDisplayPriceWithTax
};
kk.getProdImageBase = function(a, b, c) {
    if (a == null) return "";
    var d = [];
    if (c != null && c.length > 0 && a.images != null && a.images.imgNames != null && a.images.imgNames.length > 0)
        for (var e = 0; e < c.length; e++) {
            var f = c[e];
            f.code != null && f.code.length > 0 && f.valueCode != null && f.valueCode.length > 0 && d.push("_" + f.code + "_" + f.valueCode)
        }
    if (d.length == 0) return b + a.imageDir + a.uuid;
    for (e = a.images.imgNames.length - 1; e > -1; e--) {
        c = a.images.imgNames[e];
        for (f = 0; f < d.length; f++) {
            var g = d[f];
            if (c != null && c.indexOf(g) > 0) return b + a.imageDir + a.uuid + g
        }
    }
    return b +
        a.imageDir + a.uuid
};
kk.getProdImageExtension = function(a) {
    return a.image ? (a = a.image.split("."), a.length < 2 ? "" : "." + a.pop()) : ""
};
kk.formatNumber = function(a, b) {
    return accounting.formatNumber(a, b)
};
kk.formatMoney = function(a) {
    return accounting.formatMoney(a)
};
kk.getTemplateContext = function() {
    var a = {};
    a.qtyWarn = kkQuantityWarn;
    a.accounting = accounting;
    a.displayPriceWithTax = kk.isDisplayPriceWithTax();
    a.imageBase = kk.getImageBase();
    a.getMsg = kk.getMsg;
    a.formatMoney = kk.formatMoney;
    a.formatNumber = kk.formatNumber;
    a.formatDate = function(a) {
        return dateFormat(a, kk.getMsg("dateformat.date.format"))
    };
    a.locale = kk.getLocale();
    a.defaultCountryCode = kk.getDefaultCountryCode();
    a.removeCData = kk.removeCData;
    a.isDiscountModule = kk.isDiscountModule;
    a.displayCouponEntry = kkDisplayCouponEntry;
    a.displayGiftCertificateEntry = kkDisplayGiftCertificateEntry;
    return a
};
kk.isDiscountModule = function(a) {
    return a != null && (a == "ot_product_discount" || a == "ot_total_discount" || a == "ot_buy_x_get_y_free" || a == "ot_gift_certificate" || a == "ot_redeem_points" || a == "ot_shipping_discount") ? true : false
};
kk.setKKCookie = function(a, b, c) {
    var d = new Date;
    d.setDate(d.getDate() + c);
    b = escape(b) + (c == null ? "" : "; expires=" + d.toUTCString()) + "; path=/";
    document.cookie = a + "=" + b
};
kk.getKKCookie = function(a) {
    var b, c, d, e = document.cookie.split(";");
    for (b = 0; b < e.length; b++)
        if (c = e[b].substr(0, e[b].indexOf("=")), d = e[b].substr(e[b].indexOf("=") + 1), c = c.replace(/^\s+|\s+$/g, ""), c == a) return unescape(d)
};
kk.removeCData = function(a) {
    var c;
    if (a == null || a.length < 12) return a;
    var b = a;
    a.slice(0, 9) == "<![CDATA[" && (c = b = a.slice(9), a = c);
    a.slice(a.length - 3, a.length) == "]]\>" && (b = a.slice(0, a.length - 3));
    return b
};
kk.redirect = function(a) {
    window.location = a;
    return false
};
kk.startLoading = function() {
    $("body").addClass("kk-loading")
};
kk.stopLoading = function() {
    $("body").removeClass("kk-loading")
};
kk.getHiddenIframe = function() {
    var a = document.getElementById("kk-downloader");
    if (a == null) a = document.createElement("IFRAME"), a.id = "kk-downloader", a.style.display = "none", document.body.appendChild(a);
    return a
};
$(function() {
    polyglot = new Polyglot({
        phrases: kkMsgMap[kkLocale]
    });
    kk.setCurrencyFormatter()
});
var kkptTemplate = null,
    kkpdtContext = null,
    kkpdtTemplate = null,
    KK_SEARCH_IN_PRODUCT_DESCRIPTION = -99;
kk.renderProdTile = function(a, b) {
    if (a == null || b == null || b.selector == null) console.log("kk.renderProdTile must be passed a product and configuration object with a valid selector");
    else if (kkptTemplate == null) kk.getTemplate("prodTile", function(c) {
        kkptTemplate = c;
        kk.renderProdTile(a, b)
    });
    else {
        var c = kk.getProdTileTemplateContext(a, b.style);
        c.style = b.style ? b.style : "";
        c.addToBasketEnabled = b.addToBasketEnabled != null && b.addToBasketEnabled == false ? false : true;
        c.wishListEnabled = b.wishListEnabled != null && b.wishListEnabled ==
            false ? false : true;
        c.prodDetailsUrl = b.prodDetailsUrl ? b.prodDetailsUrl : "";
        c.title = b.title ? b.title : "";
        c = kkptTemplate(c);
        b.selector.html(c);
        b.addHandlers != null && b.addHandlers == true && kk.addProdTileEventHandlers()
    }
};
kk.getProdTileTemplateContext = function(a, b) {
    var c = kk.getTemplateContext();
    if (a != null) c.prod = a, c.prodImage = b && b == "kkpt-small" ? kk.getProdImageBase(a, c.imageBase) + "_1_small" + kk.getProdImageExtension(a) : kk.getProdImageBase(a, c.imageBase) + "_1_medium" + kk.getProdImageExtension(a);
    return c
};
kk.addProdTileEventHandlers = function() {
    $(".kkpt-item-over").off();
    $(".kkpt-item-over").on("click", function() {
        var a = this.id.split("-")[1];
        kk.renderProdDetailTile(a);
        return false
    });
    $(".kkpt-item-title").off();
    $(".kkpt-item-title").on("click", function() {
        var a = this.id.split("-")[1];
        kk.renderProdDetailTile(a);
        return false
    });
    $(".kkpt-item-img").off();
    $(".kkpt-item-img").on("click", function() {
        var a = this.id.split("-")[1];
        kk.renderProdDetailTile(a);
        return false
    });
    $(".kkpt-item-reviews").off();
    $(".kkpt-item-reviews").on("click",
        function() {
            var a = this.id.split("-")[1];
            kk.kkptShowProductReviews(a);
            return false
        });
    $(".kkpt-item").off();
    $(".kkpt-item").on({
        mouseenter: function() {
            $(this).addClass("kkpt-item-over-container");
            $(this).find(".kkpt-item-over").show()
        },
        mouseleave: function() {
            $(this).removeClass("kkpt-item-over-container");
            $(this).find(".kkpt-item-over").hide()
        }
    });
    $(".kkpt-add-to-cart-button").off();
    $(".kkpt-add-to-cart-button").on("click", function() {
        var a = this.id.split("-")[1];
        kkEng.getProductWithOptions(kk.getSessionId(),
            a, kk.getLangId(), kk.getFetchProdOptions(),
            function(b) {
                b = decodeJson(b);
                b != null && b.opts != null && b.opts.length > 0 ? kk.renderProdDetailTile(a) : kk.kkptAddToCart(a)
            }, null, kk.getKKEng());
        return false
    });
    $(".kkpt-add-to-wishlist").off();
    $(".kkpt-add-to-wishlist").on("click", function() {
        var a = this.id.split("-")[1];
        kkEng.getProductWithOptions(kk.getSessionId(), a, kk.getLangId(), kk.getFetchProdOptions(), function(b) {
                b = decodeJson(b);
                b != null && b.opts != null && b.opts.length > 0 ? kk.renderProdDetailTile(a) : kk.kkptAddToWishList(a)
            },
            null, kk.getKKEng());
        return false
    })
};
kk.kkptAddToCart = function(a) {
    kk.addToCart(a, null, 1)
};
kk.kkptAddToWishList = function(a) {
    kk.addToWishList(a, null, 1)
};
kk.kkptShowProductReviews = function(a) {
    kk.renderProdDetailTile(a, {
        showReviewsTab: true
    })
};
kk.setProductDetailTileDivId = function(a) {
    kk.getProdDetailTileTemplateContext();
    kkpdtContext.productDetailTileDivId = a
};
kk.getProdDetailTileTemplateContext = function(a) {
    kkpdtContext == null && (kkpdtContext = kk.getTemplateContext());
    if (a != null) {
        if (kkpdtContext.prod = a, kkpdtContext.optContainers = null, a.opts != null && a.opts.length > 0) {
            for (var b = [], c = [], d = -1, e = null, f = 0; f < a.opts.length; f++) {
                var g = a.opts[f];
                if (g.id != d && (e = c[g.id], e == null)) e = {}, e.name = g.name, e.code = g.code, e.id = g.id, e.custom1 = g.optionCustom1, e.custom2 = g.optionCustom2, e.type = g.type, e.opts = [], b.push(e), c[d] = d;
                d = {};
                d.value = g.value;
                d.code = g.valueCode;
                d.id = g.valueId;
                d.priceExTax =
                    g.priceExTax;
                d.priceIncTax = g.priceIncTax;
                d.attrCustom1 = g.attrCustom1;
                d.attrCustom2 = g.attrCustom2;
                d.optionCustom1 = g.optionCustom1;
                d.optionCustom2 = g.optionCustom2;
                d.optionValCustom1 = g.optionValCustom1;
                d.optionValCustom2 = g.optionValCustom2;
                kk.createOptionFormattedvalues(d, g.type);
                e != null && e.opts.push(d);
                d = g.id
            }
            kkpdtContext.optContainers = b
        }
    } else kkpdtContext.prod = null, kkpdtContext.optContainers = null;
    kkpdtContext.alsoPurchased = null;
    kkpdtContext.related = null
};
kk.createOptionFormattedvalues = function(a, b) {
    var c;
    b == 1 ? (c = a.priceExTax < 0 ? "" : "+", a.formattedValue = kk.isDisplayPriceWithTax() ? a.priceIncTax == 0 ? a.value : "(" + c + accounting.formatMoney(a.priceIncTax) + " / " + a.value + ")" : a.priceExTax == 0 ? a.value : "(" + c + accounting.formatMoney(a.priceExTax) + " / " + a.value + ")") : (c = a.priceExTax < 0 ? "" : "+", a.formattedValue = kk.isDisplayPriceWithTax() ? a.priceIncTax == 0 ? a.value : a.value + " (" + c + accounting.formatMoney(a.priceIncTax) + ")" : a.priceExTax == 0 ? a.value : a.value + " (" + c + accounting.formatMoney(a.priceExTax) +
        ")")
};
kk.renderProdDetailTile = function(a, b) {
    if (a == null && kkpdtContext != null && kkpdtContext.prod != null) a = kkpdtContext.prod.id;
    var c = kk.getProdDetailsURL(a);
    c != null && window.location.href.lastIndexOf(c, 0) !== 0 ? kk.redirect(c) : a == null ? console.log("kk.renderProdDetailTile must be passed a product id") : kkpdtContext == null || kkpdtContext.productDetailTileDivId == null ? console.log(kk.getMsg("exception.render.tile", "kk.setProductDetailTileDivId", "kk.renderProdDetailTile")) : (kkpdtContext.addToBasketEnabled = b != null && b.addToBasketEnabled !=
        null && b.addToBasketEnabled == false ? false : true, kkpdtContext.wishListEnabled = b != null && b.wishListEnabled != null && b.wishListEnabled == false ? false : true, kkpdtContext.productNotification = false, kkpdtContext.showReviewsTab = b != null && b.showReviewsTab != null && b.showReviewsTab == true ? true : false, kk.getSessionId() != null ? kkEng.getProductNotificationsPerCustomerWithOptions(kk.getSessionId(), kk.getLangId(), kk.getFetchProdOptions(), function(b) {
            if ((b = decodeJson(b)) && b.length > 0)
                for (var c = 0; c < b.length; c++)
                    if (b[c].id == a) {
                        kkpdtContext.productNotification =
                            true;
                        break
                    }
            kkEng.getProductWithOptions(kk.getSessionId(), a, kk.getLangId(), kk.getFetchProdOptions(), KKGetProductWithOptionsCallback, null, kk.getKKEng())
        }, null, kk.getKKEng()) : kkEng.getProductWithOptions(kk.getSessionId(), a, kk.getLangId(), kk.getFetchProdOptions(), KKGetProductWithOptionsCallback, null, kk.getKKEng()))
};
var KKGetProductWithOptionsCallback = function(a, b, c) {
    if (kkpdtTemplate == null) kk.getTemplate("prodDetailTile", function(d) {
        kkpdtTemplate = d;
        KKGetProductWithOptionsCallback(a, b, c)
    });
    else {
        var d = decodeJson(a);
        kk.getProdDetailTileTemplateContext(d);
        var e = kkpdtTemplate(kkpdtContext);
        kk.emptyBodyArea();
        $("#" + kkpdtContext.productDetailTileDivId).html(e);
        d != null && (kk.setProductDetailURL(d), kk.addProductDetailTileEventHandlers(), kk.fetchAndRenderReviews(d, "kkpdt-product-reviews"), kk.fetchAlsoPurchasedArray(kkpdtContext.prod.id,
            false), kk.fetchRelatedArray(kkpdtContext.prod.id, false))
    }
};
kk.addProductDetailTileEventHandlers = function() {
    kk.getImage("");
    $("#kkpdt-product-reviews-tab").length && ($("#kkpdt-product-reviews-tab").attr("class").indexOf("kkpdt-selected-product-content-tab") >= 0 ? $("#kkpdt-product-description").hide() : $("#kkpdt-product-reviews").hide(), $("#kkpdt-product-specifications").hide(), $("#kkpdt-product-reviews-tab").off().on("click", function() {
        $("#kkpdt-product-description-tab").removeClass("kkpdt-selected-product-content-tab");
        $("#kkpdt-product-specifications-tab").removeClass("kkpdt-selected-product-content-tab");
        $("#kkpdt-product-reviews-tab").addClass("kkpdt-selected-product-content-tab");
        $("#kkpdt-product-description").hide();
        $("#kkpdt-product-specifications").hide();
        $("#kkpdt-product-reviews").show()
    }), $("#kkpdt-product-specifications-tab").off().on("click", function() {
        $("#kkpdt-product-description-tab").removeClass("kkpdt-selected-product-content-tab");
        $("#kkpdt-product-specifications-tab").addClass("kkpdt-selected-product-content-tab");
        $("#kkpdt-product-reviews-tab").removeClass("kkpdt-selected-product-content-tab");
        $("#kkpdt-product-description").hide();
        $("#kkpdt-product-specifications").show();
        $("#kkpdt-product-reviews").hide();
        return false
    }), $("#kkpdt-product-description-tab").off().on("click", function() {
        $("#kkpdt-product-description-tab").addClass("kkpdt-selected-product-content-tab");
        $("#kkpdt-product-specifications-tab").removeClass("kkpdt-selected-product-content-tab");
        $("#kkpdt-product-reviews-tab").removeClass("kkpdt-selected-product-content-tab");
        $("#kkpdt-product-description").show();
        $("#kkpdt-product-specifications").hide();
        $("#kkpdt-product-reviews").hide()
    }));
    $(".kkpdt-add-to-cart-button-big").off().on("click", function() {
        var a = this.id.split("-")[1],
            b = [];
        $(".kkpdt-opts").each(function() {
            var a = $(this).val().split("-"),
                c = {};
            c.valueId = a[1];
            c.id = a[0];
            c.type = 0;
            b.push(c)
        });
        var c = true;
        $(".kkpdt-opts-1").each(function() {
            var a = this.id.split("-"),
                d = {};
            d.valueId = a[2];
            d.id = a[0];
            d.type = a[1];
            if (d.type == 1) {
                a = $(this).val();
                if (isNaN(a) || a == "") alert(kkpdtContext.getMsg("product.details.tile.validate.qty.option")), c = false;
                d.quantity =
                    a
            } else if (d.type == 2) a = $(this).val(), $.isNumeric(a) || (alert(kkpdtContext.getMsg("product.details.tile.validate.price.option")), c = false), d.customerPrice = a;
            else if (d.type == 3) a = $(this).val(), a.length > 512 && (alert(kkpdtContext.getMsg("product.details.tile.validate.text.option")), c = false), d.customerText = a;
            b.push(d)
        });
        if (c) {
            var d = $("#kkpdt-prodQuantityId").val();
            kk.addToCart(a, b, d)
        }
        return false
    });
    $(".kkpdt-remove-notification").off().on("click", function() {
        var a = this.id.split("-")[1];
        kk.checkSession(function() {
            kkEng.deleteProductNotificationFromCustomer(kk.getSessionId(),
                a,
                function() {
                    kk.renderProdDetailTile(kkpdtContext.prod.id)
                }, null, kk.getKKEng())
        }, function() {
            kk.renderProdDetailTile()
        })
    });
    $(".kkpdt-add-notification").off().on("click", function() {
        var a = this.id.split("-")[1];
        kk.checkSession(function() {
            kkEng.addProductNotificationToCustomer(kk.getSessionId(), a, function() {
                kk.renderProdDetailTile(kkpdtContext.prod.id)
            }, null, kk.getKKEng())
        }, function() {
            kk.renderProdDetailTile()
        })
    });
    $(".kkpdt-add-to-wishlist-prod-details").off().on("click", function() {
        var a = this.id.split("-")[1],
            b = [];
        $(".kkpdt-opts").each(function() {
            var a = $(this).val().split("-"),
                d = {};
            d.valueId = a[1];
            d.id = a[0];
            d.type = 0;
            b.push(d)
        });
        kk.addToWishList(a, b, 1);
        return false
    });
    $("#kkpdt-star-reviews-link").off().on("click", function() {
        $("#kkpdt-product-reviews-tab").click();
        return false
    })
};
kk.getImage = function(a) {
    var b = kkpdtContext.imageBase,
        c = [];
    if (kkpdtContext.prod.images != null) c = kkpdtContext.prod.images.imgNames;
    for (var d = RegExp("^.*" + kkpdtContext.prod.uuid + "_" + a + "\\d+_small.*$"), e = RegExp("^.*" + kkpdtContext.prod.uuid + "_" + a + "\\d+_big.*$"), a = [], f = [], g = 0, h = 0; h < c.length; h++) {
        var i = c[h];
        if (d.test(i)) {
            var j = kk.getImgNumberFromName(i);
            a[j] = i
        } else e.test(i) && (j = kk.getImgNumberFromName(i), f[j] = i, g++)
    }
    if (a.length == 0 || f.length == 0) kk.getImage("");
    else {
        c = 0;
        d = $("#kkpdt-gallery_nav");
        e = $("#kkpdt-gallery_output");
        for (h = 0; h < 50; h++)
            if (i = a[h], j = f[h], i != null && j != null && (d.append('<a rel="img' + h + '" href="javascript:;"><img src="' + b + i + '"/></a>'), e.append('<img id="img' + h + '" src="' + b + j + '"/>'), c++ == 0 && ($("#kkpdt-gallery_output img").not(":last").remove(), $("#kkpdt-gallery_nav img").not(":last").remove()), $("#kkpdt-gallery_output img").not(":first").hide()), g == c) break;
        kk.finaliseImageGallery()
    }
};
kk.getImgNumberFromName = function(a) {
    var b = a.lastIndexOf("_"),
        c = a.lastIndexOf("_", b - 1);
    return a.substring(c + 1, b)
};
kk.finaliseImageGallery = function() {
    $("#kkpdt-gallery_output img").eq(0).addpowerzoom();
    $("#kkpdt-gallery a").off().on("click", function() {
        var a = "#" + this.rel;
        $(a).is(":hidden") && ($("#kkpdt-gallery_output img").slideUp(), $(a).slideDown(function() {
            $(a).addpowerzoom()
        }));
        return false
    })
};
kk.optionChanged = function(a) {
    a = a.options[a.selectedIndex].id;
    a.length > 0 && kk.getImage(a)
};
kk.fetchAlsoPurchasedArray = function(a) {
    if (kkpdtContext.alsoPurchased && kkpdtContext.alsoPurchased.length > 0) kk.renderVerticalCarousel("kkpdt-also-purchased", kkpdtContext.getMsg("product.details.tile.also.purchased"), kkpdtContext.alsoPurchased);
    else {
        var b = new DataDescriptor;
        b.limit = 9;
        b.offset = 0;
        b.orderBy = "ORDER_BY_TIMES_VIEWED";
        b.fillDescription = false;
        kkEng.getAlsoPurchasedWithOptions(kk.getSessionId(), b, a, kk.getLangId(), kk.getFetchProdOptions(false), function(a) {
            a = decodeJson(a);
            kkpdtContext.alsoPurchased =
                a;
            kkpdtContext.alsoPurchased && kkpdtContext.alsoPurchased.length > 0 && kk.renderVerticalCarousel("kkpdt-also-purchased", kkpdtContext.getMsg("product.details.tile.also.purchased"), a)
        }, null, kk.getKKEng())
    }
};
kk.fetchRelatedArray = function(a) {
    if (kkpdtContext.related && kkpdtContext.related.length > 0) kk.renderVerticalCarousel("kkpdt-related", kkpdtContext.getMsg("product.details.tile.related"), kkpdtContext.related);
    else {
        var b = new DataDescriptor;
        b.limit = 9;
        b.offset = 0;
        b.orderBy = "ORDER_BY_TIMES_VIEWED";
        b.fillDescription = false;
        kkEng.getRelatedProductsWithOptions(kk.getSessionId(), b, a, 0, kk.getLangId(), kk.getFetchProdOptions(false), function(a) {
            a = decodeJson(a);
            kkpdtContext.related = a.productArray;
            kkpdtContext.related &&
                kkpdtContext.related.length > 0 && kk.renderVerticalCarousel("kkpdt-related", kkpdtContext.getMsg("product.details.tile.related"), kkpdtContext.related)
        }, null, kk.getKKEng())
    }
};
kk.setProductDetailURL = function(a) {
    kkpsContext == null && kk.getProductsTileTemplateContext();
    if (kkpsContext.catTree == null) kk.getCategoryTree(function() {
        kk.setProductDetailURL(a)
    });
    else {
        var b = {};
        if (a != null) b.prodId = a.id, kk.getSEOCategories(b, a.categoryId), b.manu = a.manufacturerName, b.prodName = a.name, b.prodModel = a.model, kk.setURL("productDetail", b)
    }
};
kk.getSEOCategories = function(a, b) {
    var c = kkpsContext.catMap[b];
    if (c == null) a.catIds = [], a.catNames = [];
    else {
        for (var d = [b], e = [c.name]; c.parentId != 0;) c = kkpsContext.catMap[c.parentId], d.push(c.id), e.push(c.name);
        a.catIds = d;
        a.catNames = e
    }
};
kk.getFetchProdOptions = function(a) {
    var b = {
        calcQuantityForBundles: false
    };
    b.getImages = kkGetProdImages;
    if (a != null && a == false) b.getImages = false;
    if (typeof kkCatalogId != "undefined") b.catalogId = kkCatalogId, b.useExternalPrice = kkUseExternalPrice, b.useExternalQuantity = kkUseExternalQuantity;
    return b
};
var kkpsContext = null,
    kkpsTemplate = null,
    kkpsFacetsTemplate = null,
    kkpsCatMenuTemplate = null,
    kkpsSearchTemplate = null,
    kkManuMap = {};
$(function() {
    $(window).resize(function() {
        kk.layoutItems()
    })
});
kk.renderFacetsTile = function() {
    if (kkpsFacetsTemplate == null) kk.getTemplate("facetsTile", function(a) {
        kkpsFacetsTemplate = a;
        kk.renderFacetsTile()
    });
    else if (kkpsContext == null || kkpsContext.facetsDivId == null) console.log(kk.getMsg("exception.render.tile", "kk.setFacetsTileDivId", "kk.renderFacetsTile"));
    else {
        var a = kkpsFacetsTemplate(kkpsContext);
        $("#" + kkpsContext.facetsDivId).html(a);
        kk.addFacetsTileEventHandlers()
    }
};
kk.renderSearchTile = function() {
    kkpsSearchTemplate == null ? kk.getTemplate("searchTile", function(a) {
        kkpsSearchTemplate = a;
        kk.renderSearchTile()
    }) : kkpsContext == null || kkpsContext.searchDivId == null ? console.log(kk.getMsg("exception.render.tile", "kk.setSearchTileDivId", "kk.renderSearchTile")) : kkSolrEnabled == null ? kkEng.getConfigurationValueAsBool("USE_SOLR_SEARCH", false, function(a) {
        kkSolrEnabled = decodeJson(a);
        kkpsContext.useSolr = kkSolrEnabled;
        kk.renderSearchTilePrivate()
    }, null, kk.getKKEng()) : (kkpsContext.useSolr =
        kkSolrEnabled, kk.renderSearchTilePrivate())
};
kk.renderSearchTilePrivate = function() {
    if (kkpsContext.catTree == null) kk.getCategoryTree(kk.renderSearchTilePrivate);
    else {
        var a = kkpsSearchTemplate(kkpsContext);
        $("#" + kkpsContext.searchDivId).html(a);
        kk.addSearchTileEventHandlers()
    }
};
kk.renderCategoryMenuTile = function(a) {
    kkpsCatMenuTemplate == null ? kk.getTemplate("catMenuTile", function(a) {
        kkpsCatMenuTemplate = a;
        kk.renderCategoryMenuTile()
    }) : kkpsContext.catTree == null || a != null && a == true ? kk.getCategoryTree(kk.renderCategoryMenuTile) : kkpsContext == null || kkpsContext.catMenuDivId == null ? console.log(kk.getMsg("exception.render.tile", "kk.setCatMenuTileDivId", "kk.renderCategoryMenuTile")) : (a = kkpsCatMenuTemplate(kkpsContext), $("#" + kkpsContext.catMenuDivId).html(a), kk.addCatMenuTileEventHandlers(),
        kk.sizeMenu())
};
kk.sizeMenu = function() {
    var a = $("#" + kkpsContext.catMenuDivId).width() - 2,
        b = 0,
        c = 0;
    $("#" + kkpsContext.catMenuDivId + " a").each(function() {
        var a = $(this);
        a.css("width", "auto");
        a.css("margin-right", "5px");
        var d = a.width() + 14;
        a.width(d);
        b += d + 5;
        c++;
        a.parent().hasClass("kkcm-menu-line") && a.unwrap()
    });
    b -= 5;
    if (c != 0) {
        var d = Math.ceil(b / a),
            e = Math.ceil(c / d),
            f = 0,
            g = 0,
            h = 0,
            i = [],
            j = [],
            k = [];
        $("#" + kkpsContext.catMenuDivId + " a").each(function() {
            var b = $(this),
                c = b.width() + 5;
            h++;
            f + c - 5 > a || h > e ? (f -= 5, k[i.length] = f, f = c, i[i.length] =
                j, j = [], g = 0, j[g++] = b, h = 1) : (f += c, j[g++] = b)
        });
        j.length > 0 && (f -= 5, k[i.length] = f, i[i.length] = j);
        for (var l = 0, d = 0; d < i.length; d++) j = i[d], $("#" + kkpsContext.catMenuDivId + " a").slice(l, l + j.length).wrapAll('<div class="kkcm-menu-line"></div>'), l += j.length;
        for (d = 0; d < i.length; d++)
            for (var j = i[d], l = a - k[d], q = Math.floor(l / i[d].length), m = 0, n = 0; n < j.length; n++) {
                var o = j[n];
                if (n == j.length - 1) {
                    o.css("margin-right", "0px");
                    var p = o.width(),
                        r = l - m
                } else p = o.width(), r = q;
                o.width(p + r);
                m += q
            }
    }
};
kk.getProductsTileTemplateContext = function() {
    if (kkpsContext == null) {
        kkpsContext = kk.getTemplateContext();
        kkpsContext.id = "ps" + Math.floor(Math.random() * 1E4 + 1);
        kkpsContext.totalNumProds = 0;
        kkpsContext.numProds = 0;
        kkpsContext.showNext = false;
        kkpsContext.showBack = false;
        kkpsContext.currentPage = 1;
        kkpsContext.pageList = null;
        kkpsContext.maxProdsPerPage = 8;
        kkpsContext.currentProds = null;
        kkpsContext.numPages = 0;
        kkpsContext.maxPagesToShow = 5;
        kkpsContext.productsDivId = null;
        kkpsContext.numSelectedFilters = 0;
        kkpsContext.catMap =
            null;
        kkpsContext.tagMap = null;
        kkpsContext.catTree = null;
        var a = new DataDescriptor;
        a.limit = kkpsContext.maxProdsPerPage + 1;
        a.offset = 0;
        a.orderBy = "ORDER_BY_TIMES_VIEWED_DESCENDING";
        kkpsContext.dataDesc = a;
        a = new ProductSearch;
        kkpsContext.prodSearch = a;
        kkpsContext.prodSearch.returnCategoryFacets = true;
        kkpsContext.prodSearch.returnManufacturerFacets = true
    }
};
kk.getCategoryTree = function(a) {
    kkVersion == null || kkVersion.length == 0 ? kkEng.getKonaKartVersion(function(b) {
        kkVersion = decodeJson(b);
        kk.getCategoryTreePrivate(a)
    }, null, kk.getKKEng()) : kk.getCategoryTreePrivate(a)
};
kk.getCategoryTreePrivate = function(a) {
    kkEng.getCategoryTreeWithOptions(kk.getCategoryTreeOptions(), function(b) {
        b = decodeJson(b);
        kkpsContext.catMap = {};
        kk.addCatsToMap(null, b);
        kkpsContext.catTree = b;
        a && a()
    }, null, kk.getKKEng())
};
kk.addCatsToMap = function(a, b) {
    if (b != null)
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            if (d != null) d.children != null && kk.addCatsToMap(d, d.children), d.parent = a, kkpsContext.catMap[d.id] = d
        }
};
kk.setProductsTileDivId = function(a) {
    kk.getProductsTileTemplateContext();
    kkpsContext.productsDivId = a
};
kk.setFacetsTileDivId = function(a) {
    kk.getProductsTileTemplateContext();
    kkpsContext.facetsDivId = a
};
kk.setCatMenuTileDivId = function(a) {
    kk.getProductsTileTemplateContext();
    kkpsContext.catMenuDivId = a
};
kk.setSearchTileDivId = function(a) {
    kk.getProductsTileTemplateContext();
    kkpsContext.searchDivId = a
};
kk.fetchAndRenderProducts = function() {
    kkpsContext == null || kkpsContext.productsDivId == null ? console.log(kk.getMsg("exception.render.tile", "kk.setProductsTileDivId", "kk.fetchAndRenderProducts")) : kkpsContext.catTree == null ? kk.getCategoryTree(kk.fetchAndRenderProductsPrivate) : kk.fetchAndRenderProductsPrivate()
};
kk.fetchAndRenderProductsPrivate = function() {
    kk.setProductsURL("products");
    if (kkpsContext == null || kkpsContext.productsDivId == null) console.log(kk.getMsg("exception.render.tile", "kk.setProductsTileDivId", "kk.fetchAndRenderProducts"));
    else if (kkpsContext.prodSearch.priceFrom = null, kkpsContext.prodSearch.priceTo = null, kkpsContext.prodSearch.categoryId > 0) {
        var a = {
            populateTags: false
        };
        kkEng.getTagGroupsPerCategoryWithOptions(kkpsContext.prodSearch.categoryId, kk.getLangId(), a, function(a) {
            a = decodeJson(a);
            a.length >
                0 && kkSolrEnabled ? (kkpsContext.prodSearch.tagGroups = a, kkpsContext.prodSearch.returnCustomFacets = true) : (kkpsContext.prodSearch.tagGroups = null, kkpsContext.prodSearch.returnCustomFacets = false);
            kk.doProductSearch(null, kkpsContext.dataDesc, kkpsContext.prodSearch, kk.getLangId(), KKSearchForProductsCallback, null, kk.getKKEng())
        }, a, kk.getKKEng())
    } else kk.doProductSearch(kk.getSessionId(), kkpsContext.dataDesc, kkpsContext.prodSearch, kk.getLangId(), KKSearchForProductsCallback, null, kk.getKKEng())
};
kk.filterAndRenderProducts = function() {
    kkpsContext == null || kkpsContext.productsDivId == null ? console.log(kk.getMsg("exception.render.tile", "kk.setProductsTileDivId", "kk.filterAndRenderProducts")) : (kk.setProductsURL("filterProducts"), kk.doProductSearch(null, kkpsContext.dataDesc, kkpsContext.prodSearch, kk.getLangId(), KKSearchForProductsCallback, null, kk.getKKEng()))
};
kk.doProductSearch = function(a, b, c, d, e, f, g) {
    kkSolrEnabled == null ? kkEng.getConfigurationValueAsBool("USE_SOLR_SEARCH", false, function(h) {
        kkSolrEnabled = decodeJson(h);
        kkpsContext.useSolr = kkSolrEnabled;
        kkpsContext.prodSearch.forceUseSolr = kkSolrEnabled;
        kkEng.searchForProductsWithOptions(a, b, c, d, kk.getFetchProdOptions(false), e, f, g)
    }, null, kk.getKKEng()) : (kkpsContext.useSolr = kkSolrEnabled, kkpsContext.prodSearch.forceUseSolr = kkSolrEnabled, kkEng.searchForProductsWithOptions(a, b, c, d, kk.getFetchProdOptions(false),
        e, f, g))
};
var KKSearchForProductsCallback = function(a, b, c) {
        kkpsTemplate == null ? kk.getTemplate("productsTile", function(d) {
            kkpsTemplate = d;
            KKSearchForProductsCallbackPrivate(a, b, c)
        }) : KKSearchForProductsCallbackPrivate(a, b, c)
    },
    KKSearchForProductsCallbackPrivate = function(a) {
        kk.emptyBodyArea();
        kk.clearSearchEntry();
        a = decodeJson(a);
        a.productArray != null && a.productArray.length == 0 ? (a = {}, a.languageCode = kk.getLangCode(), a.searchText = kkpsContext.prodSearch.searchText, kkEng.getSuggestedSpellingItems(kk.getSessionId(), a, function(a) {
            a =
                decodeJson(a);
            kkpsContext.whatToShow = a.length > 0 ? "suggestions" : "nodata";
            var c = kkpsTemplate(kkpsContext);
            $("#" + kkpsContext.productsDivId).html(c);
            if (a.length > 0) {
                for (var c = $("#" + kkpsContext.id + " ul"), d = 0; d < a.length; d++) c.append('<li class="kkps-spelling-suggestion">' + a[d].suggestion + "</li>");
                $(".kkps-spelling-suggestion").off().on("click", function() {
                    kk.resetSearchFilters();
                    kkpsContext.prodSearch.searchText = $(this).text();
                    kkpsContext.prodSearch.whereToSearch = KK_SEARCH_IN_PRODUCT_DESCRIPTION;
                    kk.fetchAndRenderProducts();
                    return false
                })
            }
        }, null, kk.getKKEng())) : a == null || a.length == 0 ? (kkpsContext.whatToShow = "nodata", a = kkpsTemplate(kkpsContext), $("#" + kkpsContext.productsDivId).html(a)) : (kkpsContext.whatToShow = "tiles", kk.setControlsFromProducts(a), kk.setFacetsFromProducts(a), a = kkpsTemplate(kkpsContext), $("#" + kkpsContext.productsDivId).html(a), kk.addProductsTileEventHandlers(), kkpsContext.facetsDivId != null && kk.renderFacetsTile(), kk.loadPoductAreaWithProducts())
    };
kk.setFacetsFromProducts = function(a) {
    kkpsContext.cats = kkpsContext.prodSearch.categoryId > 0 ? kk.getCatMenuListFromSelectedCat(kkpsContext.catMap[kkpsContext.prodSearch.categoryId], true) : kk.getCatMenuList(a.categoryFacets);
    kkpsContext.manus = a.manufacturerFacets;
    kkpsContext.prodSearch.priceFrom = a.minPrice;
    kkpsContext.prodSearch.priceTo = a.maxPrice;
    if (a.customFacets != null && a.customFacets.length > 0) {
        var b = {},
            c = {};
        if (kkpsContext.prodSearch.tagGroups != null)
            for (var d = 0; d < kkpsContext.prodSearch.tagGroups.length; d++) {
                var e =
                    kkpsContext.prodSearch.tagGroups[d];
                if (e.facetConstraints != null) c[e.name] = e.facetConstraints;
                if (e.tags != null)
                    for (var f = 0; f < e.tags.length; f++) {
                        var g = e.tags[f];
                        g.selected == true && (b[e.name + "-" + g.name] = "")
                    }
            }
        kkpsContext.tagMap = {};
        g = 0;
        kkpsContext.prodSearch.tagGroups = [];
        for (d = 0; d < a.customFacets.length; d++) {
            var h = a.customFacets[d],
                e = {};
            e.id = d;
            e.name = h.name;
            e.facetNumber = h.number;
            e.facetConstraints = c[e.name];
            if (h.values != null && h.values.length > 0) {
                for (var i = [], f = 0; f < h.values.length; f++) {
                    var j = h.values[f],
                        k = {};
                    k.id = g++;
                    k.name = j.name;
                    k.numProducts = j.number;
                    if (b[e.name + "-" + k.name] != null) k.selected = true;
                    kkpsContext.tagMap[k.id] = k;
                    i[f] = k
                }
                e.tags = i
            }
            kkpsContext.prodSearch.tagGroups[d] = e
        }
    } else kkpsContext.prodSearch.tagGroups = null, kkpsContext.tagMap = null
};
kk.getCatMenuList = function(a) {
    if (a == null || a.length == 0) return null;
    for (var b = null, c = a.length - 1; c > -1; c--) {
        var d = a[c],
            e = false;
        if (b == null) b = kk.getCatMenuListFromSelectedCat(d, false);
        else {
            for (var d = kk.getCatMenuListFromSelectedCat(d, false), f = d.length - 1; f > -1; f--) {
                for (var g = d[f], h = 0; h < b.length; h++)
                    if (b[h].id == g.id) {
                        g = h + 1;
                        if (d.length >= f + 2)
                            for (h = f + 1; h < d.length; h++) e = d[h], b.splice(g++, 0, e);
                        e = true;
                        break
                    }
                if (e) break
            }
            if (!e)
                for (f = 0; f < d.length; f++) e = d[f], b.push(e)
        }
    }
    return b
};
kk.getCatMenuListFromSelectedCat = function(a, b) {
    if (a == null) return null;
    var c = a.numberOfProducts,
        a = kkpsContext.catMap[a.id],
        d = [];
    if (a != null) {
        if (a.parent == null) {
            var e = kk.cloneCatForMenuList(a);
            e.level = 0;
            e.numberOfProducts = c;
            if (b == true) e.selected = true;
            d.push(e)
        } else {
            var f = [],
                e = a;
            for (f.push(e); e.parent != null;) e = e.parent, f.push(e);
            for (var g = 0, h = f.length - 1; h > -1; h--)
                if (e = kk.cloneCatForMenuList(f[h]), getCatMenuListFromSelectedCat = g++, d.push(e), h == 0) {
                    if (b == true) e.selected = true;
                    e.numberOfProducts = c
                } else e.numberOfProducts = -1
        }
        if (a.children != null && b)
            for (h = 0; h < a.children.length; h++) e = a.children[h], d.push(kk.cloneCatForMenuList(e))
    }
    return d
};
kk.cloneCatForMenuList = function(a) {
    var b = {};
    b.children = a.children;
    b.id = a.id;
    b.image = a.image;
    b.name = a.name;
    b.numberOfProducts = a.numberOfProducts;
    b.parentId = a.parentId;
    b.sortOrder = a.sortOrder;
    b.parent = a.parent;
    b.level = a.level;
    b.custom1 = a.custom1;
    b.custom2 = a.custom2;
    b.custom3 = a.custom3;
    b.invisible = a.invisible;
    b.description = a.description;
    b.miscItems = a.miscItems;
    return b
};
kk.setControlsFromProducts = function(a) {
    kkpsContext.currentProds = a.productArray == null ? [] : a.productArray;
    kkpsContext.numProds = kkpsContext.currentProds.length > kkpsContext.maxProdsPerPage ? kkpsContext.maxProdsPerPage : kkpsContext.currentProds.length;
    kkpsContext.totalNumProds = a.totalNumProducts;
    kkpsContext.numPages = kkpsContext.totalNumProds / kkpsContext.maxProdsPerPage;
    kkpsContext.totalNumProds % kkpsContext.maxProdsPerPage != 0 && kkpsContext.numPages++;
    kkpsContext.numPages = Math.floor(kkpsContext.numPages);
    kkpsContext.currentPage =
        Math.floor(kkpsContext.dataDesc.offset / kkpsContext.maxProdsPerPage) + 1;
    kk.getProductPages();
    kk.setProductBackAndNext()
};
kk.getProductPages = function() {
    kkpsContext.pageList = [];
    if (kkpsContext.currentPage > kkpsContext.numPages) kkpsContext.currentPage = kkpsContext.numPages;
    if (kkpsContext.currentPage < 1) kkpsContext.currentPage = 1;
    if (kkpsContext.maxPagesToShow < 3) kkpsContext.maxPagesToShow = 3;
    kkpsContext.maxPagesToShow % 2 == 0 && kkpsContext.maxPagesToShow++;
    for (var a = Math.floor(kkpsContext.maxPagesToShow / 2), b = a; b > 0; b--) kkpsContext.pageList.push(kkpsContext.currentPage - b);
    kkpsContext.pageList.push(kkpsContext.currentPage);
    for (b = 0; b <
        a; b++) kkpsContext.pageList.push(kkpsContext.currentPage + (b + 1));
    for (; kkpsContext.pageList[0] < 1;) a = kkpsContext.pageList[kkpsContext.pageList.length - 1], kkpsContext.pageList.shift(), a < kkpsContext.numPages && kkpsContext.pageList.push(a + 1);
    for (; kkpsContext.pageList.length > 0 && kkpsContext.pageList[kkpsContext.pageList.length - 1] > kkpsContext.numPages;) kkpsContext.pageList.pop(), kkpsContext.pageList.length > 0 && kkpsContext.pageList[0] > 1 && kkpsContext.pageList.splice(0, 0, kkpsContext.pageList[0] - 1)
};
kk.setProductBackAndNext = function() {
    kkpsContext.showNext = kkpsContext.currentProds.length > kkpsContext.maxProdsPerPage ? 1 : 0;
    kkpsContext.showBack = kkpsContext.dataDesc.offset > 0 ? 1 : 0
};
kk.layoutItems = function() {
    var a = $(".kkps-items").width();
    if ($(".kkpt-item:first").length) {
        var b = 180;
        a < 440 && (b = 150);
        var c = Math.floor(a / b),
            a = Math.floor((a - c * b) / c),
            d = Math.ceil(a / 2);
        d > 0 && (d -= 1);
        var e = Math.floor(a / 2);
        $(".kkps-items li").each(function() {
            var a = $(this);
            a.css("margin-left", d + "px");
            a.css("margin-right", e + "px");
            a.width(b)
        })
    }
};
kk.loadPoductAreaWithProducts = function() {
    if (kkptTemplate == null) kk.getTemplate("prodTile", function(a) {
        kkptTemplate = a;
        kk.loadPoductAreaWithProducts()
    });
    else if (kkpsContext.currentProds != null && kkpsContext.currentProds.length > 0) {
        for (var a = $("#" + kkpsContext.id + " ul"), b = 0; b < kkpsContext.numProds; b++) {
            var c = kkpsContext.currentProds[b],
                d = kkpsContext.id + "-" + b;
            a.append('<li id="' + d + '"></li>');
            var e = {
                style: null
            };
            e.selector = $("#" + d);
            e.addHandlers = false;
            kk.renderProdTile(c, e)
        }
        kk.addProdTileEventHandlers();
        kk.layoutItems()
    }
};
kk.addProductsTileEventHandlers = function() {
    $(".kkps-pagination-element.kkps-previous-items").off().on("click", function() {
        kk.setProdDataDescOffset("navBack") && kk.filterAndRenderProducts();
        return false
    });
    $(".kkps-pagination-element.kkps-next-items").off().on("click", function() {
        kk.setProdDataDescOffset("navNext") && kk.filterAndRenderProducts();
        return false
    });
    $(".kkps-pagination-element.kkps-page-num").off().on("click", function() {
        var a = this.id.split("-")[1];
        kk.setProdDataDescOffset(a) && kk.filterAndRenderProducts();
        return false
    })
};
kk.addFacetsTileEventHandlers = function() {
    $(".kkft-cat").off().on("click", function() {
        var a = this.id.split("-")[1];
        kk.resetSearchFilters();
        kkpsContext.prodSearch.categoryId = a;
        kk.fetchAndRenderProducts();
        return false
    });
    $(".kkft-manu").off().on("click", function() {
        var a = this.id.split("-")[1];
        kk.setProdDataDescOffset("navStart");
        a == kkpsContext.prodSearch.manufacturerId ? (kkpsContext.prodSearch.manufacturerId = KK_SEARCH_ALL, kkpsContext.numSelectedFilters--) : (kkpsContext.prodSearch.manufacturerId = a, kkpsContext.numSelectedFilters++);
        kk.filterAndRenderProducts();
        return false
    });
    $(".kkft-tag").off().on("click", function() {
        var a = this.id.split("-")[1];
        kk.setProdDataDescOffset("navStart");
        a = kkpsContext.tagMap[a];
        if (a != null) a.selected ? (a.selected = false, kkpsContext.numSelectedFilters--) : (a.selected = true, kkpsContext.numSelectedFilters++);
        if (kkpsContext.prodSearch.tagGroups != null)
            for (var b = 0; b < kkpsContext.prodSearch.tagGroups.length; b++) {
                var c = kkpsContext.prodSearch.tagGroups[b];
                if (c != null && c.tags != null) {
                    c.facetConstraint = null;
                    c.facetConstraints =
                        null;
                    for (var d = [], e = 0; e < c.tags.length; e++) a = c.tags[e], a != null && a.selected && d.push(a.name);
                    c.facetConstraints = d.length > 0 ? d : null
                }
            }
        kk.filterAndRenderProducts();
        return false
    });
    $("#kkft-remove-all").off().on("click", function() {
        kkpsContext.numSelectedFilters = 0;
        kkpsContext.prodSearch.manufacturerId = KK_SEARCH_ALL;
        kk.setProdDataDescOffset("navStart");
        kk.fetchAndRenderProducts();
        return false
    })
};
kk.addCatMenuTileEventHandlers = function() {
    $(".kkcm-menu-item").off().on("click", function() {
        var a = this.id.split("-")[1];
        kk.selectCategory(a);
        return false
    })
};
kk.selectCategory = function(a) {
    kk.resetSearchFilters();
    kkpsContext.prodSearch.categoryId = a;
    kk.fetchAndRenderProducts();
    return false
};
kk.addSearchTileEventHandlers = function() {
    $("#kkst-search-button").off().on("click", function() {
        kk.resetSearchFilters();
        kkpsContext.prodSearch.searchText = $("#kkst-search-input").val();
        kkpsContext.prodSearch.whereToSearch = KK_SEARCH_IN_PRODUCT_DESCRIPTION;
        var a = $("#kkst-top-cat-list").val();
        if (a != null && a > 0) kkpsContext.prodSearch.categoryId = a, kkpsContext.prodSearch.searchInSubCats = true;
        kkpsContext.prodSearch.searchText != null && kkpsContext.prodSearch.searchText.length > 0 && kk.fetchAndRenderProducts();
        return false
    })
};
kk.filterByPrice = function(a, b) {
    kkpsContext.prodSearch.priceFrom = a;
    kkpsContext.prodSearch.priceTo = b;
    kkpsContext.numSelectedFilters++;
    kk.filterAndRenderProducts();
    return false
};
kk.setProdDataDescOffset = function(a) {
    var b = true,
        c = -1;
    isNaN(a) || (c = a);
    if (a == "navStart") kkpsContext.dataDesc.offset = 0, kkpsContext.currentPage = 1;
    else if (a == "navNext") kkpsContext.dataDesc.offset + kkpsContext.maxProdsPerPage < kkpsContext.totalNumProds ? (kkpsContext.dataDesc.offset += kkpsContext.maxProdsPerPage, kkpsContext.currentPage = kkpsContext.dataDesc.offset / kkpsContext.maxProdsPerPage + 1) : b = false;
    else if (a == "navBack")
        if (kkpsContext.dataDesc.offset == 0) b = false;
        else {
            kkpsContext.dataDesc.offset -= kkpsContext.maxProdsPerPage;
            if (kkpsContext.dataDesc.offset < 0) kkpsContext.dataDesc.offset = 0;
            kkpsContext.currentPage = kkpsContext.dataDesc.offset / kkpsContext.maxProdsPerPage + 1
        } else if (c > 0) c == kkpsContext.currentPage ? b = false : (kkpsContext.dataDesc.offset = kkpsContext.maxProdsPerPage * (c - 1), kkpsContext.currentPage = c);
    else if (c <= 0) kkpsContext.dataDesc.offset = 0, kkpsContext.currentPage = 1;
    return b
};
kk.changeProductsPageSize = function(a) {
    a = $("#" + a).val();
    kkpsContext.maxProdsPerPage = +a;
    kkpsContext.dataDesc.limit = kkpsContext.maxProdsPerPage + 1;
    kkpsContext.dataDesc.offset = 0;
    kk.filterAndRenderProducts();
    return false
};
kk.changeProductsSortBy = function(a) {
    a = $("#" + a).val();
    kkpsContext.dataDesc.orderBy = a;
    kkpsContext.dataDesc.offset = 0;
    kk.filterAndRenderProducts();
    return false
};
kk.resetSearchFilters = function() {
    kkpsContext.prodSearch.categoryId = KK_SEARCH_ALL;
    kkpsContext.prodSearch.manufacturerId = KK_SEARCH_ALL;
    kkpsContext.prodSearch.searchText = null;
    kk.setProdDataDescOffset("navStart");
    kkpsContext.numSelectedFilters = 0
};
kk.clearSearchEntry = function() {
    $("#kkst-search-input").val("")
};
kk.search = function(a, b) {
    kk.resetSearchFilters();
    if (a != null && a.length > 0) {
        var c = a.split(",");
        if (c.length == 3) {
            var d = c[1],
                c = c[2];
            c > -1 && d > -1 ? (kkpsContext.prodSearch.manufacturerId = d, kkpsContext.prodSearch.categoryId = c) : c > -1 ? kkpsContext.prodSearch.categoryId = c : d > -1 ? kkpsContext.prodSearch.manufacturerId = d : (kkpsContext.prodSearch.searchText = b, kkpsContext.prodSearch.whereToSearch = KK_SEARCH_IN_PRODUCT_DESCRIPTION);
            kk.fetchAndRenderProducts()
        }
    } else if (b != null && b.length > 0) {
        kkpsContext.prodSearch.searchText = b;
        kkpsContext.prodSearch.whereToSearch = KK_SEARCH_IN_PRODUCT_DESCRIPTION;
        d = $("#kkst-top-cat-list").val();
        if (d != null && d > 0) kkpsContext.prodSearch.categoryId = d, kkpsContext.prodSearch.searchInSubCats = true;
        kk.fetchAndRenderProducts()
    }
};
kk.processTermResult = function(a, b) {
    if (a == null || a.length == 0 || a.indexOf("&") == -1) return a;
    a = unescape(a);
    b && (a = a.replace("</b>amp;", "</b>"));
    return a
};
kk.setProductsURL = function(a) {
    if (kkpsContext.catTree == null) kk.getCategoryTree(function() {
        kk.setProductsURL(a)
    });
    else {
        var b = {};
        if (kkpsContext.prodSearch != null) {
            kkpsContext.prodSearch.categoryId != null && kkpsContext.prodSearch.categoryId > 0 && kk.getSEOCategories(b, kkpsContext.prodSearch.categoryId);
            if (kkpsContext.prodSearch.searchText != null && kkpsContext.prodSearch.searchText.length > 0) b.search = kkpsContext.prodSearch.searchText;
            if (kkpsContext.prodSearch.manufacturerId != null && kkpsContext.prodSearch.manufacturerId >
                0) {
                var c = kkManuMap[kkpsContext.prodSearch.manufacturerId];
                c == null ? kkEng.getManufacturer(kkpsContext.prodSearch.manufacturerId, kk.getLangId(), function(c) {
                    c = decodeJson(c);
                    if (c != null && c.name != null) b.manu = c.name;
                    kk.setURL(a, b)
                }, null, kk.getKKEng()) : b.manu = c.name
            }
            kk.setURL(a, b)
        }
    }
};
kk.getCategoryTreeOptions = function() {
    var a = {
        getProductCounts: true
    };
    a.languageId = kk.getLangId();
    if (kkVersion != null) {
        var b = kkVersion.split(".");
        if (b.length == 4) {
            if (b[0] >= 7 && b[1] >= 4 && (b = kk.getFetchProdOptions(), b != null)) a.catalogId = b.catalogId
        } else console.log("KonaKart version " + kkVersion + " is not in the correct format.")
    }
    return a
};
var kkctContext = null,
    kkpctTemplate = null,
    kkmctTemplate = null;
kk.removeFromCart = function(a) {
    kk.getCustomerId(function(b) {
        var c = new Basket;
        c.id = a;
        kkEng.removeFromBasket(kk.getSessionId(), b, c, function() {
            kk.refreshManageCartTile()
        }, null, kk.getKKEng())
    })
};
kk.emptyCart = function() {
    kk.getCustomerId(function() {
        kkEng.removeBasketItemsPerCustomer(kk.getSessionId(), 0, function() {
            kk.fetchCart()
        }, null, kk.getKKEng())
    })
};
kk.updateCart = function(a, b) {
    kk.getCustomerId(function(c) {
        var d = new Basket;
        d.id = a;
        d.quantity = b;
        kkEng.updateBasketWithOptions(kk.getSessionId(), c, d, kk.getAddToBasketOptions(), function() {
            kk.refreshManageCartTile()
        }, null, kk.getKKEng())
    })
};
kk.addToCart = function(a, b, c) {
    kk.getCustomerId(function(d) {
        var e = new Basket;
        e.quantity = c;
        e.opts = b;
        e.productId = a;
        kkEng.addToBasketWithOptions(kk.getSessionId(), d, e, kk.getAddToBasketOptions(), function(a) {
            decodeJson(a);
            kkEng.getBasketItemsPerCustomerWithOptions(kk.getSessionId(), d, kk.getLangId(), kk.getAddToBasketOptions(), KKGetBasketItemsPerCustomerCallback, {
                displayPopup: true,
                manageCart: false
            }, kk.getKKEng())
        }, null, kk.getKKEng())
    })
};
kk.fetchCart = function() {
    kk.getCustomerId(function(a) {
        kkEng.getBasketItemsPerCustomerWithOptions(kk.getSessionId(), a, kk.getLangId(), kk.getAddToBasketOptions(), KKGetBasketItemsPerCustomerCallback, {
            displayPopup: false,
            manageCart: false
        }, kk.getKKEng())
    })
};
kk.refreshManageCartTile = function() {
    kk.getCustomerId(function(a) {
        kkEng.getBasketItemsPerCustomerWithOptions(kk.getSessionId(), a, kk.getLangId(), kk.getAddToBasketOptions(), KKGetBasketItemsPerCustomerCallback, {
            displayPopup: false,
            manageCart: true
        }, kk.getKKEng())
    })
};
var KKGetBasketItemsPerCustomerCallback = function(a) {
    if (kkctContext != null) {
        var a = decodeJson(a),
            b = 0,
            c = 0;
        kkctContext.basketItems = a;
        if (a != null)
            for (var d = 0; d < a.length; d++) {
                var e = a[d];
                e.prodImage = kk.getProdImageBase(e.product, kkctContext.imageBase, e.opts) + "_1_tiny" + kk.getProdImageExtension(e.product);
                b += kk.isDisplayPriceWithTax() ? e.finalPriceIncTax : e.finalPriceExTax;
                c += e.quantity
            }
        kkctContext.basketTotal = b;
        kkctContext.numItems = c;
        kkctContext.popupCartTileDivId != null && kk.renderPopupCartTile();
        this.displayPopup &&
            (showCart("#kkpct-shopping-cart"), window.setTimeout("hideCart('#kkpct-shopping-cart')", 2E3));
        this.manageCart && kk.renderManageCartTile()
    }
};

function showCart(a) {
    $(a).addClass("kk-small-rounded-corners-top kkpct-shopping-cart-mouseover");
    $("#kkpct-shopping-cart-container").css("display", "inline")
}

function hideCart(a) {
    $("#kkpct-shopping-cart-container").hide();
    $(a).removeClass("kkpct-shopping-cart-mouseover kk-small-rounded-corners-top")
}
kk.getCartTileTemplateContext = function() {
    if (kkctContext == null) kkctContext = kk.getTemplateContext(), kkctContext.checkoutOrder = null, kkctContext.couponCode = "", kkctContext.giftCertCode = ""
};
kk.setPopupCartTileDivId = function(a) {
    kk.getCartTileTemplateContext();
    kkctContext.popupCartTileDivId = a
};
kk.setManageCartTileDivId = function(a) {
    kk.getCartTileTemplateContext();
    kkctContext.manageCartTileDivId = a
};
kk.renderPopupCartTile = function() {
    if (kkpctTemplate == null) kk.getTemplate("popupCartTile", function(a) {
        kkpctTemplate = a;
        kk.renderPopupCartTile()
    });
    else if (kkctContext == null || kkctContext.popupCartTileDivId == null) console.log(kk.getMsg("exception.render.tile", "kk.setPopupCartTileDivId", "kk.renderPopupCartTile"));
    else {
        var a = kkpctTemplate(kkctContext);
        $("#" + kkctContext.popupCartTileDivId).html(a);
        kk.addPopupCartTileEventHandlers()
    }
};
kk.addPopupCartTileEventHandlers = function() {
    var a = 0;
    $("#kkpct-shopping-cart").hover(function() {
        a = 1;
        showCart("#kkpct-shopping-cart")
    }, function() {
        setTimeout(function() {
            a != 2 && (a = 0, hideCart("#kkpct-shopping-cart"))
        }, 500)
    });
    $("#kkpct-shopping-cart-container").hover(function() {
        a = 2;
        showCart("#kkpct-shopping-cart")
    }, function() {
        a = 0;
        hideCart("#kkpct-shopping-cart")
    });
    $(".kkpct-cart-item-image").off().on("click", function() {
        var a = this.id.split("-")[1];
        kk.kkctShowProductDetails(a);
        return false
    });
    $(".kkpct-shopping-cart-item-title").off().on("click",
        function() {
            var a = this.id.split("-")[1];
            kk.kkctShowProductDetails(a);
            return false
        });
    $("#kkpct-shopping-cart-checkout-button").off().on("click", function() {
        kk.renderOPCTile();
        return false
    });
    $("#kkpct-shopping-cart-link").off().on("click", function() {
        kk.renderManageCartTile();
        return false
    })
};
kk.createLightBasketItems = function(a) {
    var b = [];
    if (a != null)
        for (var c = 0; c < a.length; c++) {
            var d = a[c],
                e = new Basket;
            e.id = d.id;
            e.encodedProduct = d.encodedProduct;
            e.productId = d.productId;
            e.finalPriceExTax = d.finalPriceExTax;
            e.finalPriceIncTax = d.finalPriceIncTax;
            e.quantity = d.quantity;
            e.useBasketPrice = d.useBasketPrice;
            b.push(e)
        }
    return b
};
kk.renderManageCartTile = function() {
    if (kkManageCartURL != null && window.location.href.lastIndexOf(kkManageCartURL, 0) !== 0) kk.redirect(kkManageCartURL);
    else if (kkctContext != null)
        if (kkctContext.basketItems != null && kkctContext.basketItems.length > 0) {
            var a = kk.createLightBasketItems(kkctContext.basketItems);
            kkEng.updateBasketWithStockInfoWithOptions(a, kk.getAddToBasketOptions(), function(b) {
                var c = decodeJson(b),
                    b = {};
                if (c != null)
                    for (var d = 0; d < c.length; d++) {
                        var e = c[d];
                        b[e.encodedProduct] = e
                    }
                c = [];
                for (d = 0; d < kkctContext.basketItems.length; d++) {
                    var e =
                        kkctContext.basketItems[d],
                        f = b[e.encodedProduct];
                    if (f != null) e.quantityInStock = f.quantityInStock, c.push(e)
                }
                kkctContext.basketItems = c;
                kk.createTempOrder(a)
            }, null, kk.getKKEng())
        } else kk.renderManageCartTileWithCurrentData()
};
kk.renderManageCartTileWithCurrentData = function() {
    if (kkmctTemplate == null) kk.getTemplate("manageCartTile", function(a) {
        kkmctTemplate = a;
        kk.renderManageCartTileWithCurrentData()
    });
    else if (kk.setURL("cart"), kkctContext == null || kkctContext.manageCartTileDivId == null) console.log(kk.getMsg("exception.render.tile", "kk.setManageCartTileDivId", "kk.renderManageCartTile"));
    else {
        var a = kkmctTemplate(kkctContext);
        kk.emptyBodyArea();
        $("#" + kkctContext.manageCartTileDivId).html(a);
        kk.addManageCartTileEventHandlers()
    }
};
kk.addManageCartTileEventHandlers = function() {
    var a = {};
    $(".kkmct-qty-input").keydown(function() {
        var b = $(this),
            c = this.id;
        a[c] == null && (a[c] = b.val())
    });
    $(".kkmct-qty-input").keyup(function() {
        var b = $(this),
            c = this.id,
            f = a[c],
            c = "kkmctb-" + c.split("-")[1];
        if (isNaN(b.val())) return $("#" + c).hide(), alert(kkctContext.getMsg("edit.cart.tile.qty.validation")), b.val(f), false;
        b.val() != f ? $("#" + c).show() : $("#" + c).hide()
    });
    $(".kkmct-update-qty").off().on("click", function() {
        var a = this.id.split("-")[1],
            b = $("#kkmctq-" + a).val();
        b == "" ? kk.removeFromCart(a) : kk.updateCart(a, b);
        return false
    });
    $(".kkmct-remove").off().on("click", function() {
        var a = this.id.split("-")[1];
        kk.removeFromCart(a);
        return false
    });
    $(".kkmct-text-link").off().on("click", function() {
        var a = this.id.split("-")[1];
        kk.kkctShowProductDetails(a);
        return false
    });
    $(".kkmct-product-image").off().on("click", function() {
        var a = this.id.split("-")[1];
        kk.kkctShowProductDetails(a);
        return false
    });
    $("#kkmct-checkout-button").off().on("click", function() {
        kk.renderOPCTile();
        return false
    });
    var b = null;
    $("#kkCouponCode").keydown(function() {
        var a = $(this);
        b == null && (b = a.val())
    });
    $("#kkCouponCode").keyup(function() {
        var a = $(this);
        $("#kk-manage-cart-form").validate(validationRules).form() == true || a.val() == "" ? a.val() != b ? $("#kkmct-couponCodeUpdate").show() : $("#kkmct-couponCodeUpdate").hide() : $("#kkmct-couponCodeUpdate").hide()
    });
    var c = null;
    $("#kkGiftCertCode").keydown(function() {
        var a = $(this);
        c == null && (c = a.val())
    });
    $("#kkGiftCertCode").keyup(function() {
        var a = $(this);
        $("#kk-manage-cart-form").validate(validationRules).form() ==
            true || a.val() == "" ? a.val() != c ? $("#kkmct-giftCertCodeUpdate").show() : $("#kkmct-giftCertCodeUpdate").hide() : $("#kkmct-giftCertCodeUpdate").hide()
    });
    $("#kkmct-couponCodeUpdate").off().on("click", function() {
        var a = $("#kkCouponCode").val();
        kk.setCouponCode(a);
        kk.refreshManageCartTile();
        return false
    });
    $("#kkmct-giftCertCodeUpdate").off().on("click", function() {
        var a = $("#kkGiftCertCode").val();
        kk.setGiftCertificateCode(a);
        kk.refreshManageCartTile();
        return false
    })
};
kk.setCouponCode = function(a) {
    kkctContext == null && kk.getCartTileTemplateContext();
    kkopcContext == null && kk.getOPCTileTemplateContext();
    kkctContext.couponCode = a;
    kkopcContext.couponCode = a
};
kk.setGiftCertificateCode = function(a) {
    kkctContext == null && kk.getCartTileTemplateContext();
    kkopcContext == null && kk.getOPCTileTemplateContext();
    kkctContext.giftCertCode = a;
    kkopcContext.giftCertCode = a
};
kk.kkctShowProductDetails = function(a) {
    kk.renderProdDetailTile(a)
};
kk.createTempOrder = function(a) {
    kkVersion == null || kkVersion.length == 0 ? kkEng.getKonaKartVersion(function(b) {
        kkVersion = decodeJson(b);
        kk.createTempOrderPrivate(a)
    }, null, kk.getKKEng()) : kk.createTempOrderPrivate(a)
};
kk.createTempOrderPrivate = function(a) {
    var b = kk.getCreateOrderOptions();
    b.useDefaultCustomer = true;
    b.billingAddrId = -1;
    b.customerAddrId = -1;
    b.deliveryAddrId = -1;
    if (kkVersion != null) {
        var c = kkVersion.split(".");
        if (c.length == 4) {
            if (c[0] >= 7 && c[1] >= 4) b.populateAvailableShippingQuotes = true, b.populateOrderTotals = true, b.couponCode = kkctContext.couponCode, b.giftCertCode = kkctContext.giftCertCode
        } else console.log("KonaKart version " + kkVersion + " is not in the correct format.")
    }
    kkEng.createOrderWithOptions(kk.getSessionId(),
        a, b, kk.getLangId(),
        function(a) {
            var b = decodeJson(a);
            if (b != null && b != "")
                if (b.orderTotals == null) {
                    b.couponCode = kkctContext.couponCode;
                    b.giftCertCode = kkctContext.giftCertCode;
                    for (a = 0; a < b.orderProducts.length; a++) b.orderProducts[a].product = null;
                    kkEng.getShippingQuotes(b, kk.getLangId(), function(a) {
                            if ((a = decodeJson(a)) && a.length > 0) b.shippingQuote = a[0], kkEng.getOrderTotals(b, kk.getLangId(), function(a) {
                                a = decodeJson(a);
                                kkctContext.checkoutOrder = a;
                                kk.renderManageCartTileWithCurrentData()
                            }, null, kk.getKKEng())
                        },
                        null, kk.getKKEng())
                } else kkctContext.checkoutOrder = b, kk.renderManageCartTileWithCurrentData()
        }, null, kk.getKKEng())
};
kk.getAddToBasketOptions = function() {
    var a = {},
        b = kk.getFetchProdOptions();
    if (b != null) a.catalogId = b.catalogId, a.useExternalPrice = b.useExternalPrice, a.useExternalQuantity = b.useExternalQuantity;
    a.getImages = kkGetProdImages;
    a.allowMultipleEntriesForSameProduct = false;
    return a
};
var kkwtContext = null,
    kkpwtTemplate = null,
    kkmwtTemplate = null;
kk.setPopupWishListTileDivId = function(a) {
    kk.getWishListTileTemplateContext();
    kkwtContext.popupWishListTileDivId = a
};
kk.setManageWishListTileDivId = function(a) {
    kk.getWishListTileTemplateContext();
    kkwtContext.manageWishListTileDivId = a
};
kk.getWishListTileTemplateContext = function() {
    kkwtContext == null && (kkwtContext = kk.getTemplateContext())
};
kk.fetchWishList = function() {
    kk.getCustomerId(function() {
        kkEng.searchForWishLists(kk.getSessionId(), null, kk.getWishListCustomerSearch(), KKSearchForWishListsCallback, {
            displayPopup: false,
            manageWishList: false
        }, kk.getKKEng())
    })
};
var KKSearchForWishListsCallback = function(a) {
    kk.getWishListTileTemplateContext();
    kkwtContext.wishList = null;
    kkwtContext.wishListItems = null;
    kkwtContext.numItems = 0;
    a = decodeJson(a);
    if (a != null && a.wishListArray != null && a.wishListArray.length > 0)
        for (var b = 0; b < a.wishListArray.length; b++) {
            var c = a.wishListArray[b];
            if (c.listType == 0) {
                kkEng.getWishListWithItemsWithOptions(kk.getSessionId(), c.id, kk.getLangId(), kk.getWishListOptions(), function(a) {
                    a = decodeJson(a);
                    kkwtContext.wishList = a;
                    kkwtContext.wishListItems = a.wishListItems;
                    if (kkwtContext.wishListItems != null) {
                        kkwtContext.numItems = kkwtContext.wishListItems.length;
                        for (a = 0; a < kkwtContext.numItems; a++) {
                            var b = kkwtContext.wishListItems[a];
                            b.prodImage = kk.getProdImageBase(b.product, kkwtContext.imageBase, b.opts) + "_1_tiny" + kk.getProdImageExtension(b.product)
                        }
                    }
                    kk.renderPopupWishListTile();
                    this.displayPopup && (showWishList("#kkpwt-wishList"), window.setTimeout("hideWishList('#kkpwt-wishList')", 2E3));
                    this.manageWishList && kk.renderManageWishListTile()
                }, this, kk.getKKEng());
                break
            }
        } else kk.renderPopupWishListTile(),
            this.manageWishList && kk.renderManageWishListTile()
};
kk.renderPopupWishListTile = function() {
    if (kkpwtTemplate == null) kk.getTemplate("popupWishListTile", function(a) {
        kkpwtTemplate = a;
        kk.renderPopupWishListTile()
    });
    else if (kkwtContext == null || kkwtContext.popupWishListTileDivId == null) console.log(kk.getMsg("exception.render.tile", "kk.setPopupWishListTileDivId", "kk.renderPopupWishListTile"));
    else {
        var a = kkpwtTemplate(kkwtContext);
        $("#" + kkwtContext.popupWishListTileDivId).html(a);
        kk.addPopupWishListTileEventHandlers()
    }
};
kk.addPopupWishListTileEventHandlers = function() {
    var a = 0;
    $("#kkpwt-wishList").hover(function() {
        a = 1;
        showWishList("#kkpwt-wishList")
    }, function() {
        setTimeout(function() {
            a != 2 && (a = 0, hideWishList("#kkpwt-wishList"))
        }, 500)
    });
    $("#kkpwt-wishList-container").hover(function() {
        a = 2;
        showWishList("#kkpwt-wishList")
    }, function() {
        a = 0;
        hideWishList("#kkpwt-wishList")
    });
    $(".kkpwt-wishList-item-image").off().on("click", function() {
        var a = this.id.split("-")[1];
        kk.kkwtShowProductDetails(a);
        return false
    });
    $(".kkpwt-wishList-item-title").off().on("click",
        function() {
            var a = this.id.split("-")[1];
            kk.kkwtShowProductDetails(a);
            return false
        });
    $("#kkpwt-wishList-link").off().on("click", function() {
        kk.renderManageWishListTile();
        return false
    })
};

function showWishList(a) {
    $(a).addClass("kk-small-rounded-corners-top kkpwt-wishList-mouseover");
    $("#kkpwt-wishList-container").css("display", "inline")
}

function hideWishList(a) {
    $("#kkpwt-wishList-container").hide();
    $(a).removeClass("kkpwt-wishList-mouseover kk-small-rounded-corners-top")
}
kk.addToWishList = function(a, b, c) {
    if (kkwtContext != null)
        if (kkwtContext.wishList != null) kk.addToWishListPrivate(a, b, c);
        else {
            var d = {
                publicWishList: false,
                listType: 0
            };
            kkEng.createWishListWithOptions(kk.getSessionId(), d, kk.getWishListOptions(), function(e) {
                d.id = decodeJson(e);
                kkwtContext.wishList = d;
                kk.addToWishListPrivate(a, b, c)
            }, null, kk.getKKEng())
        }
};
kk.addToWishListPrivate = function(a, b) {
    var c = {};
    c.opts = b;
    c.productId = a;
    c.wishListId = kkwtContext.wishList.id;
    c.priority = 3;
    c.quantityDesired = 1;
    kkEng.addToWishListWithOptions(kk.getSessionId(), c, kk.getWishListOptions(), function(a) {
        decodeJson(a);
        kkEng.searchForWishLists(kk.getSessionId(), null, kk.getWishListCustomerSearch(), KKSearchForWishListsCallback, {
            displayPopup: true,
            manageWishList: false
        }, kk.getKKEng())
    }, null, kk.getKKEng())
};
kk.renderManageWishListTile = function() {
    if (kkManageWishlistURL != null && window.location.href.lastIndexOf(kkManageWishlistURL, 0) !== 0) kk.redirect(kkManageWishlistURL);
    else if (kkmwtTemplate == null) kk.getTemplate("manageWishListTile", function(a) {
        kkmwtTemplate = a;
        kk.renderManageWishListTile()
    });
    else if (kk.setURL("wishlist"), kkwtContext == null || kkwtContext.manageWishListTileDivId == null) console.log(kk.getMsg("exception.render.tile", "kk.setManageWishListTileDivId", "kk.renderManageWishListTile"));
    else {
        var a = kkmwtTemplate(kkwtContext);
        kk.emptyBodyArea();
        $("#" + kkwtContext.manageWishListTileDivId).html(a);
        kk.addManageWishListTileEventHandlers()
    }
};
kk.addManageWishListTileEventHandlers = function() {
    $(".kkmwt-remove").off().on("click", function() {
        var a = this.id.split("-")[1];
        kk.removeFromWishList(a);
        return false
    });
    $(".kkmwt-add-to-cart").off().on("click", function() {
        var a = this.id.split("-")[1],
            b = null,
            c = null;
        if (kkwtContext.wishListItems != null && kkwtContext.wishListItems.length > 0)
            for (var d = 0; d < kkwtContext.wishListItems.length; d++) {
                var e = kkwtContext.wishListItems[d];
                if (e.id == a) {
                    c = e.productId;
                    b = e.opts;
                    break
                }
            }
        c != null && kk.addToCart(c, b, 1);
        return false
    });
    $(".kkmwt-text-link").off().on("click", function() {
        var a = this.id.split("-")[1];
        kk.kkwtShowProductDetails(a);
        return false
    });
    $(".kkmwt-product-image").off().on("click", function() {
        var a = this.id.split("-")[1];
        kk.kkwtShowProductDetails(a);
        return false
    })
};
kk.removeFromWishList = function(a) {
    kkEng.removeFromWishListWithOptions(kk.getSessionId(), a, kk.getWishListOptions(), function() {
        kk.refreshManageWishListTile()
    }, null, kk.getKKEng())
};
kk.kkwtShowProductDetails = function(a) {
    kk.renderProdDetailTile(a)
};
kk.refreshManageWishListTile = function() {
    kk.getCustomerId(function() {
        kkEng.searchForWishLists(kk.getSessionId(), null, kk.getWishListCustomerSearch(), KKSearchForWishListsCallback, {
            displayPopup: false,
            manageWishList: true
        }, kk.getKKEng())
    })
};
kk.changeWishListPriority = function(a) {
    var b = $("#" + a).val(),
        c = a.split("-")[0],
        a = null;
    if (kkwtContext.wishListItems != null && kkwtContext.wishListItems.length > 0)
        for (var d = 0; d < kkwtContext.wishListItems.length; d++) {
            var e = kkwtContext.wishListItems[d];
            if (e.id == c) {
                a = e;
                break
            }
        }
    if (a != null) c = {}, c.id = a.id, c.opts = a.opts, c.priority = b, c.wishListId = a.wishListId, c.productId = a.productId, kkEng.addToWishListWithOptions(kk.getSessionId(), c, kk.getWishListOptions(), function(a) {
        decodeJson(a);
        kkEng.searchForWishLists(kk.getSessionId(),
            null, kk.getWishListCustomerSearch(), KKSearchForWishListsCallback, {
                displayPopup: false,
                manageWishList: true
            }, kk.getKKEng())
    }, null, kk.getKKEng())
};
kk.getWishListCustomerSearch = function() {
    var a = null;
    if (kk.getSessionId() == null && kk.getCustomerId() < 0) a = {}, a.tmpId = kk.getCustomerId();
    return a
};
kk.getWishListOptions = function() {
    var a = {};
    if (kk.getSessionId() == null && kk.getCustomerId() < 0) a.customerId = kk.getCustomerId();
    a.getImages = kkGetProdImages;
    return a
};
var kkcaTemplate = null;
kk.getCarouselTileTemplateContext = function() {
    var a = kk.getTemplateContext();
    a.width = 180;
    a.widthSmall = 150;
    a.breakpointSmall = 440;
    a.id = "jc" + Math.floor(Math.random() * 1E4 + 1);
    return a
};
kk.renderCarousel = function(a, b, c) {
    if (kkcaTemplate == null) kk.getTemplate("carouselTile", function(d) {
        kkcaTemplate = d;
        kk.renderCarousel(a, b, c)
    });
    else if (c && c.length > 0) {
        var d = kk.getCarouselTileTemplateContext();
        d.title = b;
        var e = kkcaTemplate(d);
        $("#" + a).html(e);
        kk.loadCarouselWithProducts(c, d)
    }
};
kk.loadCarouselWithProducts = function(a, b) {
    if (kkptTemplate == null) kk.getTemplate("prodTile", function(c) {
        kkptTemplate = c;
        kk.loadCarouselWithProducts(a, b)
    });
    else if (a != null && a.length > 0) {
        for (var c = $("#" + b.id + " ul"), d = 0; d < a.length; d++) {
            var e = a[d],
                f = b.id + "-" + d;
            c.append('<li id="' + f + '"></li>');
            var g = {
                style: null
            };
            g.selector = $("#" + f);
            g.addHandlers = false;
            kk.renderProdTile(e, g)
        }
        kk.addProdTileEventHandlers();
        $("#" + b.id).jcarousel("reload")
    }
};
kk.setCarouselControls = function(a, b, c) {
    var d = a.jcarousel("items"),
        a = a.jcarousel("visible");
    d[0] == a[0] ? b.removeClass("prev-items").addClass("prev-items-inactive") : b.removeClass("prev-items-inactive").addClass("prev-items");
    d[d.length - 1] == a[a.length - 1] ? c.removeClass("next-items").addClass("next-items-inactive") : c.removeClass("next-items-inactive").addClass("next-items")
};
var kkvcaTemplate = null;
kk.getVerticalCarouselTileTemplateContext = function() {
    var a = kk.getTemplateContext();
    a.id = "jc" + Math.floor(Math.random() * 1E4 + 1);
    return a
};
kk.renderVerticalCarousel = function(a, b, c) {
    if (kkvcaTemplate == null) kk.getTemplate("verticalCarouselTile", function(d) {
        kkvcaTemplate = d;
        kk.renderVerticalCarousel(a, b, c)
    });
    else if (c && c.length > 0) {
        var d = kk.getVerticalCarouselTileTemplateContext();
        d.title = b;
        var e = kkvcaTemplate(d);
        $("#" + a).html(e);
        kk.loadVerticalCarouselWithProducts(c, d)
    }
};
kk.loadVerticalCarouselWithProducts = function(a, b) {
    if (kkptTemplate == null) kk.getTemplate("prodTile", function(c) {
        kkptTemplate = c;
        kk.loadVerticalCarouselWithProducts(a, b)
    });
    else if (a != null && a.length > 0) {
        for (var c = $("#" + b.id + " ul"), d = 0; d < a.length; d++) {
            var e = a[d],
                f = b.id + "-" + d;
            c.append('<li id="' + f + '"></li>');
            var g = {
                style: "kkpt-small"
            };
            g.selector = $("#" + f);
            g.addHandlers = false;
            kk.renderProdTile(e, g)
        }
        kk.addProdTileEventHandlers();
        $("#" + b.id).jcarousel("reload")
    }
};
kk.setVerticalControls = function(a, b, c) {
    var d = a.jcarousel("items"),
        a = a.jcarousel("visible");
    d[0] == a[0] ? b.removeClass("prev-items-down").addClass("prev-items-down-inactive") : b.removeClass("prev-items-down-inactive").addClass("prev-items-down");
    d[d.length - 1] == a[a.length - 1] ? c.removeClass("next-items-up").addClass("next-items-up-inactive") : c.removeClass("next-items-up-inactive").addClass("next-items-up")
};
var kkrtContext = null,
    kkrtTemplate = null,
    kkwrtTemplate = null;
kk.getReviewsTileTemplateContext = function() {
    if (kkrtContext == null) {
        kkrtContext = kk.getTemplateContext();
        kkrtContext.totalNumRevs = 0;
        kkrtContext.numRevs = 0;
        kkrtContext.showNext = false;
        kkrtContext.showBack = false;
        kkrtContext.currentPage = 1;
        kkrtContext.pageList = null;
        kkrtContext.maxRevsPerPage = 5;
        kkrtContext.currentRevs = null;
        kkrtContext.numPages = 0;
        kkrtContext.maxPagesToShow = 5;
        var a = new DataDescriptor;
        a.limit = kkrtContext.maxRevsPerPage + 1;
        a.offset = 0;
        a.orderBy = "ORDER_BY_DATE_ADDED_DESCENDING";
        kkrtContext.dataDesc =
            a
    }
};
kk.fetchAndRenderReviews = function(a, b) {
    if (a == null || b == null) console.log("kk.fetchAndRenderReviews must be passed a product and a div id");
    else {
        kk.getReviewsTileTemplateContext();
        kkrtContext.reviewsDivId = b;
        kkrtContext.prod = a;
        kk.setRevDataDescOffset("navStart");
        kkrtContext.searchRating = -1;
        kkrtContext.scrollTop = 0;
        var c = {};
        c.productId = kkrtContext.prod.id;
        c.rating = -1;
        kkEng.getReviews(kkrtContext.dataDesc, c, KKGetReviewsCallback, null, kk.getKKEng())
    }
};
kk.navigateReviews = function(a) {
    kkrtContext.showReviewsTab = true;
    kkrtContext.scrollTop = $(window).scrollTop();
    var b = {};
    b.productId = kkrtContext.prod.id;
    a ? a == kkrtContext.searchRating ? (kkrtContext.searchRating = -1, b.rating = -1) : (kkrtContext.searchRating = a, b.rating = a) : b.rating = kkrtContext.searchRating;
    kkEng.getReviews(kkrtContext.dataDesc, b, KKGetReviewsCallback, null, kk.getKKEng())
};
var KKGetReviewsCallback = function(a, b, c) {
    if (kkrtTemplate == null) kk.getTemplate("reviewsTile", function(d) {
        kkrtTemplate = d;
        KKGetReviewsCallback(a, b, c)
    });
    else {
        var d = decodeJson(a);
        kk.setControlsFromReviews(d);
        kkrtContext.reviews = d.reviewArray;
        d = kkrtTemplate(kkrtContext);
        $("#" + kkrtContext.reviewsDivId).html(d);
        kk.addReviewsTileEventHandlers();
        $(window).scrollTop(kkrtContext.scrollTop)
    }
};
kk.addReviewsTileEventHandlers = function() {
    $(".kkrt-pagination-element.kkrt-previous-items").off().on("click", function() {
        kk.setRevDataDescOffset("navBack") && kkrtContext.prod != null && kk.navigateReviews();
        return false
    });
    $(".kkrt-pagination-element.kkrt-next-items").off().on("click", function() {
        kk.setRevDataDescOffset("navNext") && kkrtContext.prod != null && kk.navigateReviews();
        return false
    });
    $(".kkrt-pagination-element.kkrt-page-num").off().on("click", function() {
        var a = this.id.split("-")[1];
        kk.setRevDataDescOffset(a) &&
            kkrtContext.prod != null && kk.navigateReviews();
        return false
    });
    $(".kkrt-review-meter-rating").off().on("click", function() {
        var a = this.id.split("-")[1];
        kk.setRevDataDescOffset("navStart");
        kk.navigateReviews(a);
        return false
    });
    $(".kkrt-write-review-button").off().on("click", function() {
        var a = this.id.split("-")[1];
        kk.renderWriteReviewTile(a);
        return false
    })
};
kk.setControlsFromReviews = function(a) {
    kkrtContext.currentRevs = a.reviewArray == null ? [] : a.reviewArray;
    kkrtContext.numRevs = kkrtContext.currentRevs.length > kkrtContext.maxRevsPerPage ? kkrtContext.maxRevsPerPage : kkrtContext.currentRevs.length;
    kkrtContext.totalNumRevs = a.totalNumReviews;
    kkrtContext.numPages = kkrtContext.totalNumRevs / kkrtContext.maxRevsPerPage;
    kkrtContext.totalNumRevs % kkrtContext.maxRevsPerPage != 0 && kkrtContext.numPages++;
    kkrtContext.numPages = Math.floor(kkrtContext.numPages);
    kkrtContext.currentPage =
        Math.floor(kkrtContext.dataDesc.offset / kkrtContext.maxRevsPerPage) + 1;
    kk.getReviewPages();
    kk.setReviewBackAndNext();
    kk.createRatingFacets(a)
};
kk.getReviewPages = function() {
    kkrtContext.pageList = [];
    if (kkrtContext.currentPage > kkrtContext.numPages) kkrtContext.currentPage = kkrtContext.numPages;
    if (kkrtContext.currentPage < 1) kkrtContext.currentPage = 1;
    if (kkrtContext.maxPagesToShow < 3) kkrtContext.maxPagesToShow = 3;
    kkrtContext.maxPagesToShow % 2 == 0 && kkrtContext.maxPagesToShow++;
    for (var a = Math.floor(kkrtContext.maxPagesToShow / 2), b = a; b > 0; b--) kkrtContext.pageList.push(kkrtContext.currentPage - b);
    kkrtContext.pageList.push(kkrtContext.currentPage);
    for (b = 0; b <
        a; b++) kkrtContext.pageList.push(kkrtContext.currentPage + (b + 1));
    for (; kkrtContext.pageList[0] < 1;) a = kkrtContext.pageList[kkrtContext.pageList.length - 1], kkrtContext.pageList.shift(), a < kkrtContext.numPages && kkrtContext.pageList.push(a + 1);
    for (; kkrtContext.pageList.length > 0 && kkrtContext.pageList[kkrtContext.pageList.length - 1] > kkrtContext.numPages;) kkrtContext.pageList.pop(), kkrtContext.pageList.length > 0 && kkrtContext.pageList[0] > 1 && kkrtContext.pageList.splice(0, 0, kkrtContext.pageList[0] - 1)
};
kk.setReviewBackAndNext = function() {
    kkrtContext.showNext = kkrtContext.currentRevs.length > kkrtContext.maxRevsPerPage ? 1 : 0;
    kkrtContext.showBack = kkrtContext.dataDesc.offset > 0 ? 1 : 0
};
kk.setRevDataDescOffset = function(a) {
    var b = true,
        c = -1;
    isNaN(a) || (c = a);
    if (a == "navStart") kkrtContext.dataDesc.offset = 0, kkrtContext.currentPage = 1;
    else if (a == "navNext") kkrtContext.dataDesc.offset + kkrtContext.maxRevsPerPage < kkrtContext.totalNumRevs ? (kkrtContext.dataDesc.offset += kkrtContext.maxRevsPerPage, kkrtContext.currentPage = kkrtContext.dataDesc.offset / kkrtContext.maxRevsPerPage + 1) : b = false;
    else if (a == "navBack")
        if (kkrtContext.dataDesc.offset == 0) b = false;
        else {
            kkrtContext.dataDesc.offset -= kkrtContext.maxRevsPerPage;
            if (kkrtContext.dataDesc.offset < 0) kkrtContext.dataDesc.offset = 0;
            kkrtContext.currentPage = kkrtContext.dataDesc.offset / kkrtContext.maxRevsPerPage + 1
        } else if (c > 0) c == kkrtContext.currentPage ? b = false : (kkrtContext.dataDesc.offset = kkrtContext.maxRevsPerPage * (c - 1), kkrtContext.currentPage = c);
    else if (c <= 0) kkrtContext.dataDesc.offset = 0, kkrtContext.currentPage = 1;
    return b
};
kk.changeReviewsPageSize = function(a) {
    a = $("#" + a).val();
    kkrtContext.maxRevsPerPage = +a;
    kkrtContext.dataDesc.limit = kkrtContext.maxRevsPerPage + 1;
    kk.setRevDataDescOffset("navStart");
    kk.navigateReviews()
};
kk.changeReviewsSortBy = function(a) {
    a = $("#" + a).val();
    kkrtContext.dataDesc.orderBy = a;
    kk.setRevDataDescOffset("navStart");
    kk.navigateReviews()
};
kk.createRatingFacets = function(a) {
    var b = [-1, -1, -1, -1, -1],
        c = [-1, -1, -1, -1, -1];
    if (a.ratingFacets != null) {
        for (var d = 0, e = 0; e < a.ratingFacets.length; e++) {
            var f = a.ratingFacets[e];
            d += f.number
        }
        for (var g = 0, e = 0; e < a.ratingFacets.length; e++) f = a.ratingFacets[e], g = f.name - 1, b[g] = f.number, c[g] = Math.round(100 * f.number / d);
        for (e = 0; e < b.length; e++) b[e] == -1 && (b[e] = 0), c[e] == -1 && (c[e] = 0)
    }
    kkrtContext.ratingQuantity = b;
    kkrtContext.ratingPercentage = c
};
kk.setWriteReviewTileDivId = function(a) {
    kk.getReviewsTileTemplateContext();
    kkrtContext.writeReviewTileDivId = a
};
kk.renderWriteReviewTile = function() {
    kk.checkSession(function() {
        if (kkwrtTemplate == null) kk.getTemplate("writeReviewTile", function(a) {
            kkwrtTemplate = a;
            kk.renderWriteReviewTile()
        });
        else if (kk.setURL("writeReview"), kkrtContext == null || kkrtContext.writeReviewTileDivId == null) console.log(kk.getMsg("exception.render.tile", "kk.setWriteReviewTileDivId", "kk.renderWriteReviewTile"));
        else if (kkrtContext.prod == null) console.log("Cannot open Write Review panel since product hasn't been defined");
        else {
            var a = kkwrtTemplate(kkrtContext);
            kk.emptyBodyArea();
            $("#" + kkrtContext.writeReviewTileDivId).html(a);
            kk.addWriteReviewTileEventHandlers()
        }
    }, function() {
        kk.renderWriteReviewTile()
    })
};
kk.addWriteReviewTileEventHandlers = function() {
    $("#kk-review-submit").off().on("click", function() {
        $("#kk-write-review-form").submit();
        return false
    });
    $("#kk-write-review-form").submit(function() {
        kk.writeReviewSubmit();
        return false
    });
    $("#kk-write-review-back").off().on("click", function() {
        kk.renderProdDetailTile(kkrtContext.prod.id, {
            showReviewsTab: true
        });
        return false
    })
};
kk.writeReviewSubmit = function() {
    kkrtContext.prod == null ? console.log("Cannot save a review product hasn't been defined") : kk.checkSession(function(a) {
        if ($("#kk-write-review-form").validate(validationRules).form()) {
            var b = kk.escape($("#kkReviewText").val()),
                c = {};
            c.rating = $("input[name=kkRating]:checked").val();
            c.reviewText = b;
            c.productId = kkrtContext.prod.id;
            c.languageId = kk.getLangId();
            c.customerId = a;
            kkEng.writeReview(kk.getSessionId(), c, function(a) {
                decodeJson(a);
                kk.renderProdDetailTile(kkrtContext.prod.id, {
                    showReviewsTab: true
                })
            }, null, kk.getKKEng())
        }
    }, function() {
        kk.renderWriteReviewTile()
    })
};
kk.setErrorMessage = function(a) {
    $("#kk-error").html(a)
};
kk.setMessage = function(a) {
    $("#kk-message").html(a)
};
var validationRules = {
    rules: {
        kkGender: {
            required: true
        },
        kkFirstName: {
            required: true,
            minlength: 2,
            maxlength: 32
        },
        kkLastName: {
            required: true,
            minlength: 2,
            maxlength: 32
        },
        kkFirstName1: {
            required: true,
            minlength: 2,
            maxlength: 32
        },
        kkLastName1: {
            required: true,
            minlength: 2,
            maxlength: 32
        },
        kkUsername: {
            required: false,
            minlength: 3,
            maxlength: 64
        },
        kkBirthDateString: {
            required: true
        },
        kkLoginUsername: {
            required: true,
            minlength: 3,
            maxlength: 64
        },
        kkEmailAddr: {
            required: true,
            email: true,
            maxlength: 96
        },
        kkEmailAddrOptional: {
            email: true,
            maxlength: 96
        },
        kkCompany: {
            required: false,
            minlength: 2,
            maxlength: 32
        },
        kkTaxId: {
            required: false,
            minlength: 2,
            maxlength: 64
        },
        kkStreetAddress: {
            required: true,
            minlength: 2,
            maxlength: 64
        },
        kkStreetAddress1: {
            required: false,
            minlength: 2,
            maxlength: 64
        },
        kkSuburb: {
            required: false,
            minlength: 2,
            maxlength: 32
        },
        kkPostcode: {
            required: true,
            minlength: 2,
            maxlength: 10
        },
        kkCity: {
            required: true,
            minlength: 2,
            maxlength: 32
        },
        kkState: {
            required: true,
            maxlength: 32
        },
        kkTelephoneNumber: {
            required: true,
            minlength: 3,
            maxlength: 32
        },
        kkTelephoneNumber1: {
            required: false,
            minlength: 3,
            maxlength: 32
        },
        kkFaxNumber: {
            required: false,
            minlength: 3,
            maxlength: 32
        },
        kkPassword: {
            required: true,
            minlength: 8,
            maxlength: 40
        },
        kkCurrentPassword: {
            required: true,
            minlength: 8,
            maxlength: 40
        },
        kkPasswordConfirmation: {
            required: true,
            minlength: 8,
            maxlength: 40,
            equalTo: "#kkPassword"
        },
        kkReviewText: {
            required: true,
            maxlength: 1E4
        },
        kkRating: {
            required: true
        },
        kkLinkURL: {
            required: false,
            minlength: 2,
            maxlength: 255
        },
        kkEventDateString: {
            required: true
        },
        kkRegistryName: {
            required: true,
            minlength: 2,
            maxlength: 128
        },
        kkCvv: {
            required: true,
            digits: true,
            minlength: 3,
            maxlength: 4
        },
        kkNumber: {
            required: true,
            creditcard: true
        },
        kkOwner: {
            required: true,
            minlength: 2,
            maxlength: 80
        },
        kkExpiryMonth: {
            notExpired: true
        },
        kkPriceFromStr: {
            number: true
        },
        kkPriceToStr: {
            number: true
        },
        kkSearchText: {
            maxlength: 100
        },
        kkCouponCode: {
            maxlength: 40
        },
        kkGiftCertCode: {
            maxlength: 40
        },
        kkOrderComment: {
            maxlength: 512
        },
        kkRewardPoints: {
            maxlength: 40,
            digits: true
        }
    },
    highlight: function(a) {
        var b = $(a).parent().children(".kk-required-icon");
        if (b == null || b.length == 0) b = $(a).parent().parent().children(".kk-required-icon");
        b != null && b.removeClass("kk-required-green").addClass("kk-required-blue")
    },
    unhighlight: function(a) {
        var b = $(a).parent().children(".kk-required-icon");
        if (b == null || b.length == 0) b = $(a).parent().parent().children(".kk-required-icon");
        b != null && b.removeClass("kk-required-blue").addClass("kk-required-green")
    },
    errorPlacement: function(a, b) {
        if (a[0].innerHTML.length > 0) {
            var c = b.parent().children(".kk-validation-msg");
            if (c == null || c.length == 0) c = b.parent().parent().children(".kk-validation-msg");
            c != null && a.appendTo(c)
        }
    }
};
jQuery.validator.addMethod("kkCountry", function(a, b) {
    return this.optional(b) || a > -1
});
jQuery.validator.addMethod("kkState", function(a, b) {
    return this.optional(b) || a != "-1"
});
kk.setValidationMsgs = function() {
    jQuery.validator.messages = {
        kkState: kk.getMsg("form.validate.required"),
        kkCountry: kk.getMsg("form.validate.required"),
        required: kk.getMsg("form.validate.required"),
        creditcard: kk.getMsg("form.validate.creditcard"),
        digits: kk.getMsg("form.validate.digits"),
        maxlength: jQuery.validator.format(kk.getMsg("form.validate.max")),
        minlength: jQuery.validator.format(kk.getMsg("form.validate.min")),
        expirydate: kk.getMsg("form.validate.exp.date"),
        email: kk.getMsg("form.validate.email"),
        url: kk.getMsg("form.validate.url"),
        number: kk.getMsg("form.validate.number"),
        equalTo: kk.getMsg("form.validate.password.match")
    }
};
kk.changeCountry = function() {
    var a = $("#kkCountryId").val();
    kkEng.getZonesPerCountry(a, function(a) {
        $("#kkStateList option:gt(0)").remove().end();
        a = decodeJson(a);
        if (a != null && a.length > 0) {
            $("#kk-form-zone-select").show();
            $("#kk-form-zone-input").hide();
            for (var c = $("#kkStateList"), d = 0; d < a.length; d++) {
                var e = a[d];
                c.append($("<option></option>").val(e.zoneName).html(e.zoneName))
            }
        } else $("#kk-form-zone-select").hide(), $("#kk-form-zone-input").show()
    }, null, kk.getKKEng())
};
kk.escape = function(a, b) {
    return b != null && a == null || a.length == 0 ? b : _.escape(a)
};
kk.getDateFromString = function(a) {
    if (a != null && a.length > 9) {
        var b = a.slice(6, 10),
            c = a.slice(0, 2),
            a = a.slice(3, 5) - 1;
        return new Date(b, a, c)
    } else return new Date
};
$(function() {
    kk.setValidationMsgs()
});
var kkLoginTileContext = null,
    kkLoginTileTemplate = null,
    kkForgotPasswordTileTemplate = null;
kk.getLoginTileTemplateContext = function() {
    if (kkLoginTileContext == null) kkLoginTileContext = kk.getTemplateContext(), kkLoginTileContext.allowFacebookLogin = false, kkLoginTileContext.facebookId = null, kkLoginTileContext.allowGooglePlusLogin = false, kkLoginTileContext.googlePlusId = null, kkLoginTileContext.liferayModuleClassName = null, kkLoginTileContext.loginType = null
};
kk.setLoginLinkDivId = function(a) {
    kk.getLoginTileTemplateContext();
    kkLoginTileContext.loginLinkDivId = a;
    a = $("#" + kkLoginTileContext.loginLinkDivId);
    a.html(kkLoginTileContext.getMsg("login.link.my.account"));
    a.off().on("click", function() {
        kk.checkSession(function() {
            kk.renderAccountTile(false)
        }, null, true);
        return false
    })
};
kk.setLogoutLinkDivId = function(a) {
    kk.getLoginTileTemplateContext();
    kkLoginTileContext.logoutLinkDivId = a;
    a = $("#" + kkLoginTileContext.logoutLinkDivId);
    a.html(kkLoginTileContext.getMsg("login.link.logout"));
    a.hide();
    a.off().on("click", function() {
        kkEng.logout(kk.getSessionId(), function() {
            kk.afterLogout()
        }, null, kk.getKKEng());
        return false
    })
};
kk.hideLogoutLink = function() {
    $("#" + kkLoginTileContext.logoutLinkDivId).hide()
};
kk.showLogoutLink = function() {
    if (kkLoginTileContext == null || kkLoginTileContext.logoutLinkDivId == null) console.log(kk.getMsg("exception.render.tile", "kk.setLogoutLinkDivId", "kk.showLogoutLink"));
    else {
        var a = $("#" + kkLoginTileContext.logoutLinkDivId);
        (kkAllowLiferaySSO == null || !kkAllowLiferaySSO) && a.show()
    }
};
kk.setLoginTileDivId = function(a) {
    kk.getLoginTileTemplateContext();
    kkLoginTileContext.loginTileDivId = a
};
kk.renderLoginTile = function(a) {
    if (kkLoginTileTemplate == null) kk.getTemplate("loginTile", function(b) {
        kkLoginTileTemplate = b;
        kk.renderLoginTile(a)
    });
    else if (kk.setURL("login"), kkLoginTileContext == null || kkLoginTileContext.loginTileDivId == null) console.log(kk.getMsg("exception.render.tile", "kk.setLoginTileDivId", "kk.renderLoginTile"));
    else {
        kkLoginTileContext.forward = a;
        var b = kkAllowFacebookLogin == null || kkAllowFacebookLogin == true && kkLoginTileContext.allowFacebookLogin == null,
            c = kkAllowGooglePlusLogin == null ||
            kkAllowGooglePlusLogin == true && kkLoginTileContext.allowGooglePlusLogin == null,
            d = 0;
        b && (d += 2);
        c && (d += 2);
        d > 0 ? (b && (kkEng.getConfigurationValueAsBool("MODULE_OTHER_FACEBOOK_LOGIN_STATUS", false, function(a) {
            kkAllowFacebookLogin = decodeJson(a);
            kkLoginTileContext.allowFacebookLogin = kkAllowFacebookLogin;
            --d == 0 && kk.renderLoginTilePrivate()
        }, null, kk.getKKEng()), kkEng.getConfigurationValue("MODULE_OTHER_FACEBOOK_APP_ID", function(a) {
                kkLoginTileContext.facebookId = decodeJson(a);
                --d == 0 && kk.renderLoginTilePrivate()
            },
            null, kk.getKKEng())), c && (kkEng.getConfigurationValueAsBool("MODULE_OTHER_GOOGLEPLUS_LOGIN_STATUS", false, function(a) {
            kkAllowGooglePlusLogin = decodeJson(a);
            kkLoginTileContext.allowGooglePlusLogin = kkAllowGooglePlusLogin;
            --d == 0 && kk.renderLoginTilePrivate()
        }, null, kk.getKKEng()), kkEng.getConfigurationValue("MODULE_OTHER_GOOGLEPLUS_CLIENT_ID", function(a) {
            kkLoginTileContext.googlePlusId = decodeJson(a);
            --d == 0 && kk.renderLoginTilePrivate()
        }, null, kk.getKKEng()))) : kk.renderLoginTilePrivate()
    }
};
kk.renderLoginTilePrivate = function() {
    var a = kkLoginTileTemplate(kkLoginTileContext);
    kk.emptyBodyArea();
    $("#" + kkLoginTileContext.loginTileDivId).html(a);
    kk.addLoginTileEventHandlers()
};
kk.addLoginTileEventHandlers = function() {
    $("#kk-continue-button").off().on("click", function() {
        $("#kk-login-form").submit();
        return false
    });
    $("#kk-login-form").submit(function() {
        kk.setErrorMessage("");
        kkLoginTileContext.loginType = null;
        if ($("#kk-login-form").validate(validationRules).form()) {
            var a = {};
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(this.kkLoginUsername.value) ? a.emailAddr = this.kkLoginUsername.value : a.username = this.kkLoginUsername.value;
            a.password = this.kkPassword.value;
            kkEng.loginWithOptions(a,
                function(a) {
                    a = decodeJson(a, false);
                    a == null || a.sessionId == null || a.sessionId == "" ? kk.setErrorMessage(kkLoginTileContext.getMsg("login.tile.login.error")) : kk.afterLogin(a.sessionId)
                }, null, kk.getKKEng())
        }
        return false
    });
    $("#kk-sign-in-register").off().on("click", function() {
        kk.renderRegisterTile();
        return false
    });
    $("#kk-forgot-password-link").off().on("click", function() {
        kk.renderForgotPasswordTile();
        return false
    });
    $("#kk-ext-login-form").submit(function() {
        kk.setErrorMessage("");
        kkLoginTileContext.loginType =
            this.loginType.value;
        var a = {};
        if (this.loginType.value == "GOOGLEPLUS") a.moduleClassName = "com.konakart.bl.modules.others.googlepluslogin.GooglePlusLogin";
        else if (this.loginType.value == "FACEBOOK") a.moduleClassName = "com.konakart.bl.modules.others.facebooklogin.FacebookLogin";
        a.custom1 = this.loginToken.value;
        kkEng.externalLogin(a, function(a) {
                a = decodeJson(a, false);
                a == null || a.sessionId == null || a.sessionId == "" ? kk.setErrorMessage(kkLoginTileContext.getMsg("login.tile.login.error")) : kk.afterLogin(a.sessionId)
            },
            null, kk.getKKEng());
        return false
    })
};
kk.afterLogin = function(a) {
    kk.setSessionId(a);
    kk.showLogoutLink();
    kk.fetchWishList();
    kk.mergeCarts(a, function() {
        kkLoginTileContext.forward == null ? kk.renderAccountTile() : kkLoginTileContext.forward()
    })
};
kk.mergeCarts = function(a, b) {
    if (kkCustomerId != null && kkCustomerId < 0) {
        var c = kkCustomerId;
        kkEng.mergeBasketsWithOptions(a, kkCustomerId, kk.getAddToBasketOptions(), function() {
            kk.fetchCart();
            kkEng.removeBasketItemsPerCustomer(null, c, function(a) {
                decodeJson(a)
            }, null, kk.getKKEng())
        }, null, kk.getKKEng())
    } else kk.fetchCart();
    b != null && b()
};
kk.afterLogout = function() {
    kk.setSessionId(null);
    kk.getTempCustomerId();
    kk.hideLogoutLink();
    kk.fetchCart();
    kk.fetchWishList();
    kk.renderLoginTile()
};
kk.setForgotPasswordTileDivId = function(a) {
    kk.getLoginTileTemplateContext();
    kkLoginTileContext.forgotPasswordTileDivId = a
};
kk.renderForgotPasswordTile = function() {
    if (kkForgotPasswordTileTemplate == null) kk.getTemplate("forgotPasswordTile", function(a) {
        kkForgotPasswordTileTemplate = a;
        kk.renderForgotPasswordTile()
    });
    else if (kk.setURL("forgotPassword"), kkLoginTileContext == null || kkLoginTileContext.forgotPasswordTileDivId == null) console.log(kk.getMsg("exception.render.tile", "kk.setForgotPasswordTileDivId", "kk.renderForgotPasswordTile"));
    else {
        var a = kkForgotPasswordTileTemplate(kkLoginTileContext);
        kk.emptyBodyArea();
        $("#" + kkLoginTileContext.forgotPasswordTileDivId).html(a);
        kk.addForgotPasswordTileEventHandlers()
    }
};
kk.addForgotPasswordTileEventHandlers = function() {
    $("#kk-forgot-pw-send").off().on("click", function() {
        $("#kk-forgot-password-form").submit();
        return false
    });
    $("#kk-forgot-password-form").submit(function() {
        kk.setErrorMessage("");
        if ($("#kk-forgot-password-form").validate(validationRules).form()) {
            var a = kk.escape(this.kkEmailAddr.value),
                b = {};
            b.countryCode = kk.getLocale().substring(0, 2);
            b.templateName = "EmailNewPassword";
            kkEng.sendNewPassword1(a, b, function(a) {
                a = decodeJson(a, false, true);
                a != null && a.e != null ?
                    kk.setErrorMessage(kk.getMsg("forgot.pw.error.not.found")) : kk.setMessage(kk.getMsg("forgot.pw.sentpw"))
            }, null, kk.getKKEng())
        }
        return false
    });
    $("#kk-forgot-pw-back").off().on("click", function() {
        kk.renderLoginTile();
        return false
    })
};
var kkRegisterTileContext = null,
    kkRegisterTileTemplate = null;
kk.getRegisterTileTemplateContext = function() {
    if (kkRegisterTileContext == null) kkRegisterTileContext = kk.getTemplateContext(), kkRegisterTileContext.countries = null, kkRegisterTileContext.zones = null
};
kk.setRegisterTileDivId = function(a) {
    kk.getRegisterTileTemplateContext();
    kkRegisterTileContext.registerTileDivId = a
};
kk.renderRegisterTile = function() {
    kkRegisterTileContext == null || kkRegisterTileContext.registerTileDivId == null ? console.log(kk.getMsg("exception.render.tile", "kk.setRegisterTileDivId", "kk.renderRegisterTile")) : kkRegisterTileContext.countries == null ? kkEng.getAllCountries(function(a) {
        a = decodeJson(a);
        kkRegisterTileContext.countries = a;
        if (a != null)
            for (var b = kk.getDefaultCountryCode(), c = 0; c < a.length; c++) {
                var d = a[c];
                if (d.isoCode3 == b) {
                    kkEng.getZonesPerCountry(d.id, function(a) {
                        a = decodeJson(a);
                        kkRegisterTileContext.zones =
                            a;
                        kk.renderRegisterTilePrivate()
                    }, null, kk.getKKEng());
                    break
                }
            }
    }, null, kk.getKKEng()) : kk.renderRegisterTilePrivate()
};
kk.renderRegisterTilePrivate = function() {
    if (kkRegisterTileTemplate == null) kk.getTemplate("registerTile", function(a) {
        kkRegisterTileTemplate = a;
        kk.renderRegisterTilePrivate()
    });
    else {
        kk.setURL("register");
        var a = kkRegisterTileTemplate(kkRegisterTileContext);
        kk.emptyBodyArea();
        $("#" + kkRegisterTileContext.registerTileDivId).html(a);
        kk.addRegisterTileEventHandlers()
    }
};
kk.addRegisterTileEventHandlers = function() {
    kkRegisterTileContext.zones != null && kkRegisterTileContext.zones.length > 0 ? ($("#kk-form-zone-select").show(), $("#kk-form-zone-input").hide()) : ($("#kk-form-zone-select").hide(), $("#kk-form-zone-input").show());
    $("#kk-register").off().on("click", function() {
        $("#kk-register-form").submit();
        return false
    });
    $("#kk-register-form").submit(function() {
        kk.setErrorMessage("");
        if ($("#kk-register-form").validate(validationRules).form()) {
            var a = {};
            a.city = kk.escape(this.kkCity.value);
            a.company = kk.escape(this.kkCompany.value);
            a.taxIdentifier = kk.escape(this.kkTaxId.value);
            a.countryId = this.kkCountryId.value;
            a.emailAddr = kk.escape(this.kkEmailAddr.value);
            a.faxNumber = kk.escape(this.kkFaxNumber.value);
            a.firstName = kk.escape(this.kkFirstName.value);
            a.gender = kk.escape(this.kkGender.value, "-");
            a.lastName = kk.escape(this.kkLastName.value);
            a.username = kk.escape(this.kkUsername.value);
            a.usernameUnique = true;
            a.password = this.kkPassword.value;
            a.postcode = kk.escape(this.kkPostcode.value);
            a.streetAddress =
                kk.escape(this.kkStreetAddress.value);
            a.streetAddress1 = kk.escape(this.kkStreetAddress1.value);
            a.suburb = kk.escape(this.kkSuburb.value);
            a.telephoneNumber = kk.escape(this.kkTelephoneNumber.value);
            a.telephoneNumber1 = kk.escape(this.kkTelephoneNumber1.value);
            a.state = $("#kk-form-zone-select").is(":visible") ? this.kkStateList.value : kk.escape(this.kkState.value, "N/A");
            var b = $("#kkNewsletter").is(":checked");
            a.newsletter = b == true ? "1" : "0";
            a.birthDate = kk.getDateFromString(this.kkBirthDateString.value);
            kkEng.registerCustomer(a,
                function(b) {
                    b = decodeJson(b, false, true);
                    b != null && b.e != void 0 ? (kk.setErrorMessage(kkRegisterTileContext.getMsg("register.tile.user.exists")), b.code == 4 ? kk.setErrorMessage(kkRegisterTileContext.getMsg("customer.info.username.exists", a.username)) : b.code == 1 ? kk.setErrorMessage(kkRegisterTileContext.getMsg("customer.info.email.exists", a.emailAddr)) : kk.setErrorMessage(b.m)) : kkEng.login(a.emailAddr, a.password, function(a) {
                        a = decodeJson(a, false);
                        a == null ? kk.setErrorMessage(kkRegisterTileContext.getMsg("register.tile.login.error")) :
                            kk.afterLogin(a)
                    }, null, kk.getKKEng())
                }, null, kk.getKKEng())
        }
        return false
    })
};
var kkAccountTileContext = null,
    kkAccountTileTemplate = null;
kk.getAccountTileTemplateContext = function() {
    if (kkAccountTileContext == null) kkAccountTileContext = kk.getTemplateContext(), kkAccountTileContext.customer = null, kkAccountTileContext.addresses = null, kkAccountTileContext.orders = null, kkAccountTileContext.downloads = null, kkAccountTileContext.loginType = null;
    if (kkLoginTileContext != null) kkAccountTileContext.loginType = kkLoginTileContext.loginType
};
kk.setAccountTileDivId = function(a) {
    kk.getAccountTileTemplateContext();
    kkAccountTileContext.accountTileDivId = a
};
kk.renderAccountTile = function(a, b, c) {
    kk.checkSession(function() {
        a != null && a == false && kkAccountTileContext.customer != null && kkAccountTileContext.addresses != null ? kk.renderAccountTilePrivate(b, c) : kk.getCustomerInfo(function() {
            kk.getCustomerOrdersPrivate(b, c)
        })
    })
};
kk.getCustomerInfo = function(a) {
    kk.getAccountTileTemplateContext();
    kkEng.getCustomer(kk.getSessionId(), function(b) {
        kkAccountTileContext.customer = decodeJson(b);
        kkAccountTileContext.customer == null ? console.log("Customer not found for session id - " + kk.getSessionId()) : kkEng.getAddressesPerCustomer(kk.getSessionId(), function(b) {
            kkAccountTileContext.addresses = decodeJson(b);
            kk.setCustomerInfoOnContexts();
            kk.getDigitalDownloads(a)
        }, null, kk.getKKEng())
    }, null, kk.getKKEng())
};
kk.getDigitalDownloads = function(a) {
    kkVersion == null || kkVersion.length == 0 ? kkEng.getKonaKartVersion(function(b) {
        kkVersion = decodeJson(b);
        kk.getDigitalDownloadsPrivate(a)
    }, null, kk.getKKEng()) : kk.getDigitalDownloadsPrivate(a)
};
kk.getDigitalDownloadsPrivate = function(a) {
    if (kkVersion != null) {
        var b = kkVersion.split(".");
        if (b.length == 4) {
            if (b[0] >= 7 && b[1] >= 4) {
                kkEng.getDigitalDownloadsWithOptions(kk.getSessionId(), kk.getLangId(), {
                    populateProducts: true
                }, kk.getFetchProdOptions(false), function(b) {
                    b = decodeJson(b);
                    kkAccountTileContext.downloads = b;
                    a != null && a()
                }, null, kk.getKKEng());
                return
            }
        } else console.log("KonaKart version " + kkVersion + " is not in the correct format.")
    }
    kkEng.getDigitalDownloads(kk.getSessionId(), function(b) {
        var d = decodeJson(b);
        kkAccountTileContext.downloads = d;
        if (d == null || d.length == 0) a != null && a();
        else {
            b = new DataDescriptor;
            b.limit = 1E3;
            b.offset = 0;
            for (var e = [], f = 0; f < d.length; f++) e.push(d[f].productId);
            kkEng.getProductsFromIdsWithOptions(kk.getSessionId(), b, e, kk.getLangId(), kk.getFetchProdOptions(false), function(b) {
                b = decodeJson(b);
                if (b != null && b.length > 0)
                    for (var c = 0; c < b.length; c++)
                        for (var e = b[c], f = 0; f < d.length; f++) {
                            var k = d[f];
                            if (k.productId == e.id) {
                                k.product = e;
                                break
                            }
                        }
                a != null && a()
            }, null, kk.getKKEng())
        }
    }, null, kk.getKKEng())
};
kk.setCustomerInfoOnContexts = function() {
    kk.getCustomerInfoTemplateContext();
    kkCustomerInfoTileContext.addresses = kkAccountTileContext.addresses;
    kkCustomerInfoTileContext.customer = kkAccountTileContext.customer;
    kk.getOPCTileTemplateContext();
    kkopcContext.addresses = kkAccountTileContext.addresses;
    kkopcContext.customer = kkAccountTileContext.customer
};
kk.getCustomerOrdersPrivate = function(a, b) {
    kkEng.getOrdersPerCustomer({
        offset: 0,
        limit: 3
    }, kk.getSessionId(), kk.getLangId(), function(c) {
        c = decodeJson(c);
        kkAccountTileContext.orders = c.orderArray;
        kk.renderAccountTilePrivate(a, b)
    }, null, kk.getKKEng())
};
kk.renderAccountTilePrivate = function(a, b) {
    if (kkAccountTileTemplate == null) kk.getTemplate("accountTile", function(c) {
        kkAccountTileTemplate = c;
        kk.renderAccountTilePrivate(a, b)
    });
    else if (kk.setURL("account"), kkAccountTileContext == null || kkAccountTileContext.accountTileDivId == null) console.log(kk.getMsg("exception.render.tile", "kk.setAccountTileDivId", "kk.renderAccountTile"));
    else {
        var c = kkAccountTileTemplate(kkAccountTileContext);
        kk.emptyBodyArea();
        $("#" + kkAccountTileContext.accountTileDivId).html(c);
        kk.addAccountTileEventHandlers();
        a && kk.setMessage(a);
        b && kk.setErrorMessage(b)
    }
};
kk.addAccountTileEventHandlers = function() {
    $("#kk-first-addr").off().on("click", function() {
        kk.renderCustomerInfoTile("firstAddress");
        return false
    });
    $("#kk-manage-email").off().on("click", function() {
        kk.renderCustomerInfoTile("manageEmail");
        return false
    });
    $("#kk-manage-password").off().on("click", function() {
        kk.renderCustomerInfoTile("managePassword");
        return false
    });
    $("#kk-manage-personal-info").off().on("click", function() {
        kk.renderCustomerInfoTile("managePersonalInfo");
        return false
    });
    $("#kk-manage-address-book").off().on("click",
        function() {
            kk.renderCustomerInfoTile("manageAddressBook");
            return false
        });
    $("#kk-manage-newsletter").off().on("click", function() {
        kk.renderCustomerInfoTile("newsletterSubscription");
        return false
    });
    $("#kk-manage-notifications").off().on("click", function() {
        kk.renderCustomerInfoTile("productNotification");
        return false
    });
    $(".kkat-order-item-link").off().on("click", function() {
        var a = this.id.split("-")[1];
        kk.renderProdDetailTile(a);
        return false
    });
    $(".kkat-view-order").off().on("click", function() {
        var a = this.id.split("-")[1];
        kk.renderOrderDetailTile(a);
        return false
    });
    $(".kkat-repeat-order").off().on("click", function() {
        var a = this.id.split("-")[1];
        kk.repeatOrder(a);
        return false
    });
    $(".kkat-track-order").off().on("click", function() {
        var a = this.id.split("-")[1];
        console.log("Order tracking for order id = " + a);
        return false
    });
    $(".kkat-invoice-order").off().on("click", function() {
        var a = this.id.split("-")[1];
        kk.downloadOrderInvoice(a);
        return false
    });
    $("#kkat-all-orders").off().on("click", function() {
        kk.fetchAndRenderOrders();
        return false
    });
    $(".kkat-download").off().on("click", function() {
        var a = this.id.split("-")[1];
        kk.downloadProduct(a);
        return false
    });
    $("#kkSendPasswordForm").submit(function() {
        var a = this.kkEmailAddr.value,
            b = {};
        b.countryCode = kk.getLocale().substring(0, 2);
        b.templateName = KK_NEW_PASSWORD_TEMPLATE;
        kkEng.sendNewPassword1(a, b, function(a) {
            decodeJson(a)
        }, null, kk.getKKEng());
        return false
    })
};
kk.downloadProduct = function(a) {
    kk.checkSession(function() {
        kkEng.getDigitalDownloadById(kk.getSessionId(), a, function(b) {
            var c = decodeJson(b);
            c == null || c.length == 0 ? kk.getDigitalDownloads(function() {
                kk.renderAccountTile(false)
            }) : (kk.getHiddenIframe().src = kkRoot + "DigitalDownloadExt.action?ddId=" + a + "&sessionId=" + kk.getSessionId(), setTimeout(function() {
                kk.refreshDigitalDownloads(a, c.timesDownloaded + 1, 0)
            }, 2E3))
        }, null, kk.getKKEng())
    })
};
kk.refreshDigitalDownloads = function(a, b, c) {
    kk.getDigitalDownloads(function() {
        var d = kkAccountTileContext.downloads;
        if (d == null || d.length == 0) kk.renderAccountTile(false);
        else {
            for (var e = false, f = 0; f < d.length; f++) {
                var g = d[f];
                if (g.id == a) {
                    e = true;
                    if (g.timesDownloaded == b) {
                        kk.renderAccountTile(false);
                        return
                    }
                    break
                }
            }
            e == false ? kk.renderAccountTile(false) : (c++, c == 5 ? kk.renderAccountTile(false) : setTimeout(function() {
                kk.refreshDigitalDownloads(a, b, c)
            }, 2E3))
        }
    })
};
kk.isNoAddress = function() {
    if (kkAccountTileContext.addresses == null || kkAccountTileContext.addresses.length == 0) return true;
    var a = kkAccountTileContext.addresses[0];
    return a.city.length < 2 && a.streetAddress.length < 2 ? true : false
};
kk.isNoName = function() {
    return kkAccountTileContext.customer == null ? true : kkAccountTileContext.customer.firstName != null && kkAccountTileContext.customer.firstName.length > 1 && kkAccountTileContext.customer.lastName != null && kkAccountTileContext.customer.lastName.length > 1 ? false : true
};
kk.isNoBirthdate = function() {
    return kkAccountTileContext.customer == null ? true : kkAccountTileContext.customer.birthDate != null && kkAccountTileContext.customer.birthDate.length > 1 ? (new Date(kkAccountTileContext.customer.birthDate)).getFullYear() == KK_DEFAULT_DOB_YEAR ? true : false : true
};
kk.isNoTelephone = function() {
    return kkAccountTileContext.customer == null ? true : kkAccountTileContext.customer.telephoneNumber != null && kkAccountTileContext.customer.telephoneNumber.length > 1 ? false : true
};
kk.isNoGender = function() {
    return kkAccountTileContext.customer == null ? true : kkAccountTileContext.customer.gender != null && kkAccountTileContext.customer.gender == KK_DEFAULT_STRING ? true : false
};
var kkCustomerInfoTileContext = null,
    kkManagePasswordTileTemplate = null,
    kkManageEmailTileTemplate = null,
    kkManagePersonalInfoTileTemplate = null,
    kkInsertAddressTileTemplate = null,
    kkFirstAddressTileTemplate = null,
    kkEditAddressTileTemplate = null,
    kkManageAddressBookTileTemplate = null,
    kkNewsletterSubscriptionTileTemplate = null,
    kkProductNotificationTileTemplate = null;
kk.getCustomerInfoTemplateContext = function() {
    if (kkCustomerInfoTileContext == null) kkCustomerInfoTileContext = kk.getTemplateContext(), kkCustomerInfoTileContext.countries = null, kkCustomerInfoTileContext.zones = null, kkCustomerInfoTileContext.customer = null, kkCustomerInfoTileContext.addresses = null, kkCustomerInfoTileContext.orders = null, kkCustomerInfoTileContext.selectedAddr = null, kkCustomerInfoTileContext.goToCheckout = false;
    kkCustomerInfoTileContext.control = null;
    return kkCustomerInfoTileContext
};
kk.setManagePasswordTileDivId = function(a) {
    kk.getCustomerInfoTemplateContext();
    kkCustomerInfoTileContext.managePasswordTileDivId = a
};
kk.setManageEmailTileDivId = function(a) {
    kk.getCustomerInfoTemplateContext();
    kkCustomerInfoTileContext.manageEmailTileDivId = a
};
kk.setManagePersonalInfoTileDivId = function(a) {
    kk.getCustomerInfoTemplateContext();
    kkCustomerInfoTileContext.managePersonalInfoTileDivId = a
};
kk.setInsertAddressTileDivId = function(a) {
    kk.getCustomerInfoTemplateContext();
    kkCustomerInfoTileContext.insertAddressTileDivId = a
};
kk.setFirstAddressTileDivId = function(a) {
    kk.getCustomerInfoTemplateContext();
    kkCustomerInfoTileContext.firstAddressTileDivId = a
};
kk.setEditAddressTileDivId = function(a) {
    kk.getCustomerInfoTemplateContext();
    kkCustomerInfoTileContext.editAddressTileDivId = a
};
kk.setManageAddressBookTileDivId = function(a) {
    kk.getCustomerInfoTemplateContext();
    kkCustomerInfoTileContext.manageAddressBookTileDivId = a
};
kk.setNewsletterSubscriptionTileDivId = function(a) {
    kk.getCustomerInfoTemplateContext();
    kkCustomerInfoTileContext.newsletterSubscriptionTileDivId = a
};
kk.setProductNotificationTileDivId = function(a) {
    kk.getCustomerInfoTemplateContext();
    kkCustomerInfoTileContext.productNotificationTileDivId = a
};
kk.renderCustomerInfoTile = function(a, b) {
    kkCustomerInfoTileContext.forward = b;
    kk.checkSession(function() {
        kkCustomerInfoTileContext.countries == null ? kkEng.getAllCountries(function(b) {
            b = decodeJson(b);
            kkCustomerInfoTileContext.countries = b;
            kk.getStatesForDefaultCountry(a)
        }, null, kk.getKKEng()) : kk.getStatesForDefaultCountry(a)
    })
};
kk.getStatesForDefaultCountry = function(a) {
    var b = kkCustomerInfoTileContext.countries;
    if (b != null)
        for (var c = kk.getDefaultCountryCode(), d = 0; d < b.length; d++) {
            var e = b[d];
            if (e.isoCode3 == c) {
                kkEng.getZonesPerCountry(e.id, function(b) {
                    b = decodeJson(b);
                    kkCustomerInfoTileContext.zones = b;
                    kk.renderCustomerInfoTilePrivate(a)
                }, null, kk.getKKEng());
                break
            }
        }
};
kk.renderCustomerInfoTilePrivate = function(a) {
    kk.setURL(a);
    kkCustomerInfoTileContext.customer = kkAccountTileContext.customer;
    kkCustomerInfoTileContext.addresses = kkAccountTileContext.addresses;
    kkCustomerInfoTileContext.orders = kkAccountTileContext.orders;
    var b = "",
        c = "";
    switch (a) {
        case "managePassword":
            if (kkManagePasswordTileTemplate == null) {
                kk.getTemplate("managePasswordTile", function(b) {
                    kkManagePasswordTileTemplate = b;
                    kk.renderCustomerInfoTilePrivate(a)
                });
                return
            }
            if (kkCustomerInfoTileContext == null || kkCustomerInfoTileContext.managePasswordTileDivId ==
                null) {
                console.log(kk.getMsg("exception.render.tile", "kk.setManagePasswordTileDivId", "kk.renderCustomerInfoTile"));
                return
            }
            b = kkManagePasswordTileTemplate(kkCustomerInfoTileContext);
            c = kkCustomerInfoTileContext.managePasswordTileDivId;
            break;
        case "manageEmail":
            if (kkManageEmailTileTemplate == null) {
                kk.getTemplate("manageEmailTile", function(b) {
                    kkManageEmailTileTemplate = b;
                    kk.renderCustomerInfoTilePrivate(a)
                });
                return
            }
            if (kkCustomerInfoTileContext == null || kkCustomerInfoTileContext.manageEmailTileDivId == null) {
                console.log(kk.getMsg("exception.render.tile",
                    "kk.setManageEmailTileDivId", "kk.renderCustomerInfoTile"));
                return
            }
            b = kkManageEmailTileTemplate(kkCustomerInfoTileContext);
            c = kkCustomerInfoTileContext.manageEmailTileDivId;
            break;
        case "managePersonalInfo":
            if (kkManagePersonalInfoTileTemplate == null) {
                kk.getTemplate("managePersonalInfoTile", function(b) {
                    kkManagePersonalInfoTileTemplate = b;
                    kk.renderCustomerInfoTilePrivate(a)
                });
                return
            }
            if (kkCustomerInfoTileContext == null || kkCustomerInfoTileContext.managePersonalInfoTileDivId == null) {
                console.log(kk.getMsg("exception.render.tile",
                    "kk.setManagePersonalInfoTileDivId", "kk.renderCustomerInfoTile"));
                return
            }
            b = kkManagePersonalInfoTileTemplate(kkCustomerInfoTileContext);
            c = kkCustomerInfoTileContext.managePersonalInfoTileDivId;
            break;
        case "insertAddress":
            if (kkInsertAddressTileTemplate == null) {
                kk.getTemplate("insertAddressTile", function(b) {
                    kkInsertAddressTileTemplate = b;
                    kk.renderCustomerInfoTilePrivate(a)
                });
                return
            }
            if (kkCustomerInfoTileContext == null || kkCustomerInfoTileContext.insertAddressTileDivId == null) {
                console.log(kk.getMsg("exception.render.tile",
                    "kk.setInsertAddressTileDivId", "kk.renderCustomerInfoTile"));
                return
            }
            b = kkInsertAddressTileTemplate(kkCustomerInfoTileContext);
            c = kkCustomerInfoTileContext.insertAddressTileDivId;
            break;
        case "firstAddress":
            if (kkFirstAddressTileTemplate == null) {
                kk.getTemplate("firstAddressTile", function(b) {
                    kkFirstAddressTileTemplate = b;
                    kk.renderCustomerInfoTilePrivate(a)
                });
                return
            }
            if (kkCustomerInfoTileContext == null || kkCustomerInfoTileContext.firstAddressTileDivId == null) {
                console.log(kk.getMsg("exception.render.tile", "kk.setFirstAddressTileDivId",
                    "kk.renderCustomerInfoTile"));
                return
            }
            b = kkFirstAddressTileTemplate(kkCustomerInfoTileContext);
            c = kkCustomerInfoTileContext.firstAddressTileDivId;
            break;
        case "editAddress":
            if (kkEditAddressTileTemplate == null) {
                kk.getTemplate("editAddressTile", function(b) {
                    kkEditAddressTileTemplate = b;
                    kk.renderCustomerInfoTilePrivate(a)
                });
                return
            }
            if (kkCustomerInfoTileContext == null || kkCustomerInfoTileContext.editAddressTileDivId == null) {
                console.log(kk.getMsg("exception.render.tile", "kk.setEditAddressTileDivId", "kk.renderCustomerInfoTile"));
                return
            }
            b = kkEditAddressTileTemplate(kkCustomerInfoTileContext);
            c = kkCustomerInfoTileContext.editAddressTileDivId;
            break;
        case "manageAddressBook":
            if (kkManageAddressBookTileTemplate == null) {
                kk.getTemplate("manageAddressBookTile", function(b) {
                    kkManageAddressBookTileTemplate = b;
                    kk.renderCustomerInfoTilePrivate(a)
                });
                return
            }
            if (kkCustomerInfoTileContext == null || kkCustomerInfoTileContext.manageAddressBookTileDivId == null) {
                console.log(kk.getMsg("exception.render.tile", "kk.setManageAddressBookTileDivId", "kk.renderCustomerInfoTile"));
                return
            }
            b = kkManageAddressBookTileTemplate(kkCustomerInfoTileContext);
            c = kkCustomerInfoTileContext.manageAddressBookTileDivId;
            break;
        case "newsletterSubscription":
            if (kkNewsletterSubscriptionTileTemplate == null) {
                kk.getTemplate("manageNewsletterTile", function(b) {
                    kkNewsletterSubscriptionTileTemplate = b;
                    kk.renderCustomerInfoTilePrivate(a)
                });
                return
            }
            if (kkCustomerInfoTileContext == null || kkCustomerInfoTileContext.newsletterSubscriptionTileDivId == null) {
                console.log(kk.getMsg("exception.render.tile", "kk.setNewsletterSubscriptionTileDivId",
                    "kk.renderCustomerInfoTile"));
                return
            }
            b = kkNewsletterSubscriptionTileTemplate(kkCustomerInfoTileContext);
            c = kkCustomerInfoTileContext.newsletterSubscriptionTileDivId;
            break;
        case "productNotification":
            if (kkProductNotificationTileTemplate == null) {
                kk.getTemplate("productNotificationTile", function(b) {
                    kkProductNotificationTileTemplate = b;
                    kk.renderCustomerInfoTilePrivate(a)
                });
                return
            }
            if (kkCustomerInfoTileContext == null || kkCustomerInfoTileContext.productNotificationTileDivId == null) {
                console.log(kk.getMsg("exception.render.tile",
                    "kk.setProductNotificationTileDivId", "kk.renderCustomerInfoTile"));
                return
            }
            kkEng.getProductNotificationsPerCustomerWithOptions(kk.getSessionId(), kk.getLangId(), kk.getFetchProdOptions(false), function(a) {
                a = decodeJson(a);
                kkCustomerInfoTileContext.customer.productNotifications = a;
                b = kkProductNotificationTileTemplate(kkCustomerInfoTileContext);
                c = kkCustomerInfoTileContext.productNotificationTileDivId;
                kk.renderCustomerInfoTilePrivate1(c, b)
            }, null, kk.getKKEng());
            break;
        default:
            alert("Tile with value " + a + " passed to renderCustomerInfoTile() is not recognized")
    }
    kk.renderCustomerInfoTilePrivate1(c,
        b)
};
kk.renderCustomerInfoTilePrivate1 = function(a, b) {
    kk.emptyBodyArea();
    $("#" + a).html(b);
    kk.addCustomerInfoTileEventHandlers()
};
kk.addCustomerInfoTileEventHandlers = function() {
    $("#kk-cust-info-back").off().on("click", function() {
        kk.renderAccountTile(false);
        return false
    });
    $("#kk-insert-address").off().on("click", function() {
        kk.getCustomerInfoTemplateContext();
        kk.renderCustomerInfoTile("insertAddress");
        return false
    });
    $("#kk-insert-address-submit").off().on("click", function() {
        $("#kk-insert-address-form").submit();
        return false
    });
    $("#kk-insert-address-form").submit(function() {
        kk.addAddressToCustomer();
        return false
    });
    $("#kk-insert-first-address-submit").off().on("click",
        function() {
            $("#kk-insert-first-address-form").submit();
            return false
        });
    $("#kk-insert-first-address-form").submit(function() {
        kk.insertFirstAddress();
        return false
    });
    $(".kk-edit-address").off().on("click", function() {
        var a = this.id.split("-")[1];
        kk.getCustomerInfoTemplateContext();
        kk.editAddress(a);
        return false
    });
    $("#kk-edit-address-submit").off().on("click", function() {
        $("#kk-edit-address-form").submit();
        return false
    });
    $("#kk-edit-address-form").submit(function() {
        kk.editAddressSubmit();
        return false
    });
    $(".kk-delete-address").off().on("click",
        function() {
            var a = this.id.split("-")[1];
            kk.deleteAddress(a);
            return false
        });
    $("#kk-back-to-manage-address").off().on("click", function() {
        kkCustomerInfoTileContext.control == null ? kk.renderCustomerInfoTile("manageAddressBook") : kk.renderOPCTile(true);
        return false
    });
    $("#kk-manage-personal-info-submit").off().on("click", function() {
        $("#kk-manage-personal-info-form").submit();
        return false
    });
    $("#kk-manage-personal-info-form").submit(function() {
        kk.editCustomer();
        return false
    });
    $("#kk-manage-password").off().on("click",
        function() {
            $("#kk-manage-password-form").submit();
            return false
        });
    $("#kk-manage-password-form").submit(function() {
        kk.managePassword();
        return false
    });
    $("#kk-manage-email").off().on("click", function() {
        $("#kk-manage-email-form").submit();
        return false
    });
    $("#kk-manage-email-form").submit(function() {
        kk.manageEmail();
        return false
    });
    kkCustomerInfoTileContext.zones != null && kkCustomerInfoTileContext.zones.length > 0 ? ($("#kk-form-zone-select").show(), $("#kk-form-zone-input").hide()) : ($("#kk-form-zone-select").hide(),
        $("#kk-form-zone-input").show());
    $("#kk-newsletter-subscription-submit").off().on("click", function() {
        kk.manageNewsletter();
        return false
    });
    $("#kk-product-notification-submit").off().on("click", function() {
        kk.manageProductNotifications();
        return false
    })
};
kk.editAddress = function(a) {
    kkCustomerInfoTileContext.countries == null ? kkEng.getAllCountries(function(b) {
        b = decodeJson(b);
        kkCustomerInfoTileContext.countries = b;
        kk.editAddressAfterFetchingCountries(a)
    }, null, kk.getKKEng()) : kk.editAddressAfterFetchingCountries(a)
};
kk.editAddressAfterFetchingCountries = function(a) {
    for (var b = kkCustomerInfoTileContext.addresses, c = 0; c < b.length; c++) {
        var d = b[c];
        if (d.id == a) {
            kkCustomerInfoTileContext.selectedAddr = d;
            kkEng.getZonesPerCountry(d.countryId, function(a) {
                a = decodeJson(a);
                kkCustomerInfoTileContext.zones = a;
                kk.renderCustomerInfoTilePrivate("editAddress")
            }, null, kk.getKKEng());
            break
        }
    }
};
kk.editAddressSubmit = function() {
    kk.checkSession(function() {
        if ($("#kk-edit-address-form").validate(validationRules).form()) {
            var a = {};
            a.id = kkCustomerInfoTileContext.selectedAddr.id;
            a.city = kk.escape(this.kkCity.value);
            a.company = kk.escape(this.kkCompany.value);
            a.countryId = this.kkCountryId.value;
            a.emailAddr = kk.escape(this.kkEmailAddrOptional.value);
            a.firstName = kk.escape(this.kkFirstName.value);
            a.gender = kk.escape($("input[name=kkGender]:checked").val(), "-");
            a.lastName = kk.escape(this.kkLastName.value);
            a.postcode =
                kk.escape(this.kkPostcode.value);
            a.streetAddress = kk.escape(this.kkStreetAddress.value);
            a.streetAddress1 = kk.escape(this.kkStreetAddress1.value);
            a.suburb = kk.escape(this.kkSuburb.value);
            a.telephoneNumber = kk.escape(this.kkTelephoneNumber.value);
            a.telephoneNumber1 = kk.escape(this.kkTelephoneNumber1.value);
            a.customerId = kkCustomerInfoTileContext.customer.id;
            var b = $("#kkSetAsPrimary").is(":checked");
            a.isPrimary = b;
            a.state = $("#kk-form-zone-select").is(":visible") ? this.kkStateList.value : kk.escape(this.kkState.value,
                "N/A");
            kkEng.editCustomerAddress(kk.getSessionId(), a, function(b) {
                decodeJson(b);
                kkCustomerInfoTileContext.control == null || kkCustomerInfoTileContext.control.length == 0 ? kk.refreshManageAddressTile(kkCustomerInfoTileContext.getMsg("customer.info.addressupdated"), null) : kk.getCustomerInfo(function() {
                    if (kkCustomerInfoTileContext.control == "billing") kk.getOPCTileTemplateContext().billingAddrId = a.id, kk.renderOPCTile(true);
                    else if (kkCustomerInfoTileContext.control == "delivery") kk.getOPCTileTemplateContext().deliveryAddrId =
                        a.id, kk.renderOPCTile(true)
                })
            }, null, kk.getKKEng())
        }
    })
};
kk.addAddressToCustomer = function() {
    kk.checkSession(function() {
        if ($("#kk-insert-address-form").validate(validationRules).form()) {
            var a = {};
            a.city = kk.escape(this.kkCity.value);
            a.company = kk.escape(this.kkCompany.value);
            a.countryId = this.kkCountryId.value;
            a.emailAddr = kk.escape(this.kkEmailAddrOptional.value);
            a.firstName = kk.escape(this.kkFirstName.value);
            a.gender = kk.escape($("input[name=kkGender]:checked").val(), "-");
            a.lastName = kk.escape(this.kkLastName.value);
            a.postcode = kk.escape(this.kkPostcode.value);
            a.streetAddress = kk.escape(this.kkStreetAddress.value);
            a.streetAddress1 = kk.escape(this.kkStreetAddress1.value);
            a.suburb = kk.escape(this.kkSuburb.value);
            a.telephoneNumber = kk.escape(this.kkTelephoneNumber.value);
            a.telephoneNumber1 = kk.escape(this.kkTelephoneNumber1.value);
            a.customerId = kkCustomerInfoTileContext.customer.id;
            var b = $("#kkSetAsPrimary").is(":checked");
            a.isPrimary = b;
            a.state = $("#kk-form-zone-select").is(":visible") ? this.kkStateList.value : kk.escape(this.kkState.value, "N/A");
            kkEng.addAddressToCustomer(kk.getSessionId(),
                a,
                function(a) {
                    var b = decodeJson(a);
                    kkCustomerInfoTileContext.control == null || kkCustomerInfoTileContext.control.length == 0 ? kk.refreshManageAddressTile(kkCustomerInfoTileContext.getMsg("customer.info.addressupdated"), null) : kk.getCustomerInfo(function() {
                        if (kkCustomerInfoTileContext.control == "billing") kk.getOPCTileTemplateContext().billingAddrId = b, kk.renderOPCTile(true);
                        else if (kkCustomerInfoTileContext.control == "delivery") kk.getOPCTileTemplateContext().deliveryAddrId = b, kk.renderOPCTile(true)
                    })
                }, null, kk.getKKEng())
        }
    })
};
kk.insertFirstAddress = function() {
    kk.checkSession(function() {
        if ($("#kk-insert-first-address-form").validate(validationRules).form()) {
            var a;
            a = kkCustomerInfoTileContext.addresses != null && kkCustomerInfoTileContext.addresses.length > 0 ? kkCustomerInfoTileContext.addresses[0] : {};
            a.gender = kk.isNoGender() ? kk.escape($("input[name=kkGender]:checked").val(), "-") : kkCustomerInfoTileContext.customer.gender;
            kk.isNoName() ? (a.firstName = kk.escape(this.kkFirstName.value), a.lastName = kk.escape(this.kkLastName.value)) : (a.firstName =
                kkCustomerInfoTileContext.customer.firstName, a.lastName = kkCustomerInfoTileContext.customer.lastName);
            a.city = kk.escape(this.kkCity.value);
            a.company = kk.escape(this.kkCompany.value);
            a.countryId = this.kkCountryId.value;
            a.emailAddr = kk.escape(this.kkEmailAddrOptional.value);
            a.postcode = kk.escape(this.kkPostcode.value);
            a.streetAddress = kk.escape(this.kkStreetAddress.value);
            a.streetAddress1 = kk.escape(this.kkStreetAddress1.value);
            a.suburb = kk.escape(this.kkSuburb.value);
            a.telephoneNumber = kk.escape(this.kkTelephoneNumber.value);
            a.telephoneNumber1 = kk.escape(this.kkTelephoneNumber1.value);
            a.customerId = kkCustomerInfoTileContext.customer.id;
            a.state = $("#kk-form-zone-select").is(":visible") ? this.kkStateList.value : kk.escape(this.kkState.value, "N/A");
            var b = false;
            if (kk.isNoGender() || kk.isNoName() || kk.isNoTelephone()) {
                b = true;
                if (kk.isNoGender()) kkCustomerInfoTileContext.customer.gender = a.gender;
                if (kk.isNoName()) kkCustomerInfoTileContext.customer.firstName = a.firstName, kkCustomerInfoTileContext.customer.lastname = a.lastName;
                if (kk.isNoTelephone()) kkCustomerInfoTileContext.customer.telephoneNumber =
                    a.telephoneNumber
            }
            kkCustomerInfoTileContext.addresses != null && kkCustomerInfoTileContext.addresses.length > 0 ? kkEng.editCustomerAddress(kk.getSessionId(), a, function(a) {
                decodeJson(a);
                kk.insertFirstAddress1(b)
            }, null, kk.getKKEng()) : kkEng.addAddressToCustomer(kk.getSessionId(), a, function(a) {
                decodeJson(a);
                kk.insertFirstAddress1(b)
            }, null, kk.getKKEng())
        }
    })
};
kk.insertFirstAddress1 = function(a) {
    a ? kkEng.editCustomer(kk.getSessionId(), kkCustomerInfoTileContext.customer, function(a) {
        decodeJson(a);
        kkCustomerInfoTileContext.forward != null ? kk.getCustomerInfo(function() {
            kkCustomerInfoTileContext.forward()
        }) : kk.renderAccountTile(true, "")
    }, null, kk.getKKEng()) : kkCustomerInfoTileContext.forward != null ? kk.getCustomerInfo(function() {
        kkCustomerInfoTileContext.forward()
    }) : kk.renderAccountTile(true, "")
};
kk.deleteAddress = function(a) {
    kk.checkSession(function() {
        kkEng.deleteAddressFromCustomer(kk.getSessionId(), a, function(a) {
            decodeJson(a);
            kk.refreshManageAddressTile(kkCustomerInfoTileContext.getMsg("customer.info.removedok"), null)
        }, null, kk.getKKEng())
    }, null, kk.getKKEng())
};
kk.refreshManageAddressTile = function(a, b) {
    kk.getCustomerInfo(function() {
        kk.renderCustomerInfoTilePrivate("manageAddressBook");
        a && kk.setMessage(a);
        b && kk.setError(b)
    }, null, kk.getKKEng())
};
kk.editCustomer = function() {
    kk.checkSession(function() {
        if ($("#kk-manage-personal-info-form").validate(validationRules).form()) {
            var a = kkCustomerInfoTileContext.customer;
            a.gender = kk.escape($("input[name=kkGender]:checked").val(), "-");
            a.firstName = kk.escape(this.kkFirstName.value);
            a.lastName = kk.escape(this.kkLastName.value);
            a.birthDate = kk.getDateFromString(this.kkDatepicker.value);
            a.telephoneNumber = kk.escape(this.kkTelephoneNumber.value);
            a.telephoneNumber1 = kk.escape(this.kkTelephoneNumber1.value);
            a.faxNumber =
                kk.escape(this.kkFaxNumber.value);
            a.taxIdentifier = kk.escape(this.kkTaxId.value);
            kkEng.editCustomer(kk.getSessionId(), a, function(b) {
                decodeJson(b);
                kkAccountTileContext.customer = a;
                kk.renderAccountTile(false, kkCustomerInfoTileContext.getMsg("customer.info.account.success"))
            }, null, kk.getKKEng())
        }
    })
};
kk.managePassword = function() {
    kk.checkSession(function() {
        if ($("#kk-manage-password-form").validate(validationRules).form()) {
            var a = this.kkCurrentPassword.value,
                b = this.kkPassword.value;
            kkEng.changePassword(kk.getSessionId(), a, b, function(a) {
                a && a.e != null ? kk.renderAccountTile(false, null, kkCustomerInfoTileContext.getMsg("customer.info.password.no.match")) : kk.renderAccountTile(false, kkCustomerInfoTileContext.getMsg("customer.info.changepassword.ok"))
            }, null, kk.getKKEng())
        }
    })
};
kk.manageEmail = function() {
    kk.checkSession(function() {
        if ($("#kk-manage-email-form").validate(validationRules).form()) {
            var a = this.kkEmailAddr.value,
                b = this.kkPassword.value,
                c = kk.escape(this.kkUsername.value);
            kkEng.validatePassword(kk.getSessionId(), b, function(b) {
                    if (decodeJson(b) == false) kk.renderAccountTile(false, null, kkCustomerInfoTileContext.getMsg("customer.info.password.no.match"));
                    else {
                        var e = kkCustomerInfoTileContext.customer;
                        e.emailAddr = a;
                        e.username = c;
                        kkEng.editCustomerWithOptions(kk.getSessionId(),
                            e, {
                                usernameUnique: true
                            },
                            function(a) {
                                a = decodeJson(a, false, true);
                                a != null && a.e != null ? a.code == 4 ? kk.renderAccountTile(false, null, kkCustomerInfoTileContext.getMsg("customer.info.username.exists", e.username)) : a.code == 1 ? kk.renderAccountTile(false, null, kkCustomerInfoTileContext.getMsg("customer.info.email.exists", e.emailAddr)) : kk.renderAccountTile(false, null, a.m) : (kkAccountTileContext.customer = e, kk.renderAccountTile(false, kkCustomerInfoTileContext.getMsg("customer.info.editemail.ok")))
                            }, null, kk.getKKEng())
                    }
                },
                null, kk.getKKEng())
        }
    })
};
kk.manageNewsletter = function() {
    kk.checkSession(function() {
        var a = false,
            b = $("#kkNewsletter").is(":checked"),
            c = kkCustomerInfoTileContext.customer.newsletter;
        if (b == true && c == 0) kkCustomerInfoTileContext.customer.newsletter = 1, a = true;
        else if (b == false && c == 1) kkCustomerInfoTileContext.customer.newsletter = 0, a = true;
        a == true ? kkEng.editCustomer(kk.getSessionId(), kkAccountTileContext.customer, function(a) {
                decodeJson(a);
                kk.renderAccountTile(false, kkCustomerInfoTileContext.getMsg("customer.info.newsletter.success"))
            }, null,
            kk.getKKEng()) : kk.renderAccountTile(false)
    })
};
kk.manageProductNotifications = function() {
    kk.checkSession(function() {
        var a = false,
            b = $("#kkGlobalNotification").is(":checked"),
            c = kkCustomerInfoTileContext.customer.globalProdNotifier;
        if (b == true && c == 0) kkCustomerInfoTileContext.customer.globalProdNotifier = 1, a = true;
        else if (b == false && c == 1) kkCustomerInfoTileContext.customer.globalProdNotifier = 0, a = true;
        var d = [];
        $(".kkpn-products").each(function() {
            var b = this.id.split("-")[1];
            this.checked == true && (d.push(""), kkEng.deleteProductNotificationFromCustomer(kk.getSessionId(), b,
                function() {
                    d.pop();
                    d.length == 0 && kk.manageProductNotificationsPrivate(a)
                }, null, kk.getKKEng()))
        });
        d.length == 0 && kk.manageProductNotificationsPrivate(a)
    })
};
kk.manageProductNotificationsPrivate = function(a) {
    a == true ? kkEng.editCustomer(kk.getSessionId(), kkAccountTileContext.customer, function(a) {
        decodeJson(a);
        kk.renderCustomerInfoTilePrivate("productNotification")
    }, null, kk.getKKEng()) : kk.renderCustomerInfoTilePrivate("productNotification")
};
var kkopcContext = null,
    kkopcTemplate = null;
kk.getOPCTileTemplateContext = function(a) {
    if (kkopcContext == null) kkopcContext = kk.getTemplateContext(), kkopcContext.checkoutOrder = null, kkopcContext.couponCode = "", kkopcContext.giftCertCode = "";
    if (a != null && a == true) kkopcContext.billingAddrId = -1, kkopcContext.deliveryAddrId = -1, kkopcContext.selectedShippingCode = null, kkopcContext.selectedShippingServiceCode = null, kkopcContext.selectedPaymentCode = null, kkopcContext.selectedPaymentSubCode = null;
    return kkopcContext
};
kk.setOPCTileDivId = function(a) {
    kk.getOPCTileTemplateContext();
    kkopcContext.opcTileDivId = a
};
kk.renderOPCTile = function(a) {
    kkCheckoutURL != null && window.location.href.lastIndexOf(kkCheckoutURL, 0) !== 0 ? kk.redirect(kkCheckoutURL) : kk.checkSession(function(b) {
            kk.isNoAddress() ? kk.renderCustomerInfoTile("firstAddress", function() {
                kk.renderOPCTile()
            }) : (kk.startLoading(), a != null && a == true ? kk.getOPCTileTemplateContext(false) : kk.getOPCTileTemplateContext(true), kkopcContext.customer == null || kkopcContext.addresses == null ? kk.getCustomerInfo(function() {
                kk.renderOPCTilePrivate(b)
            }) : kk.renderOPCTilePrivate(b))
        },
        function() {
            kk.renderOPCTile()
        })
};
kk.renderOPCTilePrivate = function(a) {
    kk.setURL("checkout");
    kkEng.getBasketItemsPerCustomerWithOptions(kk.getSessionId(), a, kk.getLangId(), kk.getAddToBasketOptions(), function(a) {
        var c = decodeJson(a);
        if (c != null && c.length > 0) {
            var d = kk.createLightBasketItems(c);
            kkEng.updateBasketWithStockInfoWithOptions(d, kk.getAddToBasketOptions(), function(a) {
                var b = decodeJson(a),
                    a = {};
                if (b != null)
                    for (var g = 0; g < b.length; g++) {
                        var h = b[g];
                        a[h.encodedProduct] = h
                    }
                b = [];
                for (g = 0; g < c.length; g++) {
                    var h = c[g],
                        i = a[h.encodedProduct];
                    if (i !=
                        null) h.quantityInStock = i.quantityInStock, b.push(h)
                }
                c = b;
                kk.createCheckoutOrder(d)
            }, null, kk.getKKEng())
        } else kk.stopLoading(), kk.renderAccountTile(false, null, kk.getMsg("opc.tile.no.products"))
    }, null, kk.getKKEng())
};
kk.createCheckoutOrder = function(a) {
    kkVersion == null || kkVersion.length == 0 ? kkEng.getKonaKartVersion(function(b) {
        kkVersion = decodeJson(b);
        kk.createCheckoutOrderPrivate(a)
    }, null, kk.getKKEng()) : kk.createCheckoutOrderPrivate(a)
};
kk.createCheckoutOrderPrivate = function(a) {
    var b = kk.getCreateOrderOptions();
    b.useDefaultCustomer = false;
    b.billingAddrId = kkopcContext.billingAddrId;
    b.customerAddrId = -1;
    b.deliveryAddrId = kkopcContext.deliveryAddrId;
    if (kkVersion != null) {
        var c = kkVersion.split(".");
        if (c.length == 4) {
            if (c[0] >= 7 && c[1] >= 4) b.populateAvailableShippingQuotes = true, b.populateAvailablePaymentGateways = true, b.populateOrderTotals = true, b.couponCode = kkopcContext.couponCode, b.giftCertCode = kkopcContext.giftCertCode, b.shippingModuleCode = kkopcContext.selectedShippingCode,
                b.shippingServiceCode = kkopcContext.selectedShippingServiceCode, b.paymentModuleCode = kkopcContext.selectedPaymentCode, b.paymentModuleSubCode = kkopcContext.selectedPaymentSubCode
        } else console.log("KonaKart version " + kkVersion + " is not in the correct format.")
    }
    kkEng.createOrderWithOptions(kk.getSessionId(), a, b, kk.getLangId(), function(a) {
        a = decodeJson(a);
        if (a != null && a != "")
            if (a.orderTotals == null) {
                a.couponCode = kkopcContext.couponCode;
                a.giftCertCode = kkopcContext.giftCertCode;
                b.billingAddrId = a.billingAddrId;
                b.deliveryAddrId = a.deliveryAddrId;
                for (var c = 0; c < a.orderProducts.length; c++) a.orderProducts[c].product = null;
                kkopcContext.checkoutOrder = a;
                kkEng.getShippingQuotes(kkopcContext.checkoutOrder, kk.getLangId(), function(a) {
                        a = decodeJson(a);
                        if ((kkopcContext.shippingQuotes = a) && a.length > 0) {
                            if (kkopcContext.checkoutOrder.shippingQuote = a[0], kkopcContext.selectedShippingCode != null && kkopcContext.selectedShippingCode.length > 0)
                                for (var b = 0; b < a.length; b++) {
                                    var c = a[b];
                                    if (c.moduleCode == kkopcContext.selectedShippingCode)
                                        if (kkopcContext.selectedShippingServiceCode !=
                                            null && kkopcContext.selectedShippingServiceCode.length > 0) {
                                            if (c.shippingServiceCode == kkopcContext.selectedShippingServiceCode) {
                                                kkopcContext.checkoutOrder.shippingQuote = c;
                                                break
                                            }
                                        } else {
                                            kkopcContext.checkoutOrder.shippingQuote = c;
                                            break
                                        }
                                }
                        } else kkopcContext.checkoutOrder.shippingQuote = null;
                        kkEng.getPaymentGateways(kkopcContext.checkoutOrder, kk.getLangId(), function(a) {
                            a = decodeJson(a);
                            kkopcContext.paymentDetails = a;
                            if (kkopcContext.paymentDetails && kkopcContext.paymentDetails.length > 0)
                                if (kkopcContext.selectedPaymentCode !=
                                    null)
                                    for (a = 0; a < kkopcContext.paymentDetails.length; a++) {
                                        var b = kkopcContext.paymentDetails[a];
                                        if (b.code == kkopcContext.selectedPaymentCode) {
                                            kk.addPaymentDetailsToCheckoutOrder(b);
                                            break
                                        }
                                    } else kk.addPaymentDetailsToCheckoutOrder(kkopcContext.paymentDetails[0]);
                                else kkopcContext.addPaymentDetailsToCheckoutOrder();
                            kkEng.getOrderTotals(kkopcContext.checkoutOrder, kk.getLangId(), function(a) {
                                kkopcContext.checkoutOrder = decodeJson(a);
                                kk.renderOPCTileWithCurrentData()
                            }, null, kk.getKKEng())
                        }, null, kk.getKKEng())
                    },
                    null, kk.getKKEng())
            } else kkopcContext.checkoutOrder = a, kkopcContext.shippingQuotes = a.availableShippingQuotes, kkopcContext.paymentDetails = a.availablePaymentGateways, kk.renderOPCTileWithCurrentData();
        else console.log("Could not create a checkout order"), kk.stopLoading()
    }, null, kk.getKKEng())
};
kk.addPaymentDetailsToCheckoutOrder = function(a) {
    a == null ? (kkopcContext.checkoutOrder.paymentDetails = null, kkopcContext.checkoutOrder.paymentMethod = null, kkopcContext.checkoutOrder.paymentModuleCode = null, kkopcContext.checkoutOrder.paymentModuleSubCode = null) : (kkopcContext.checkoutOrder.paymentDetails = a, kkopcContext.checkoutOrder.paymentMethod = a.title, kkopcContext.checkoutOrder.paymentModuleCode = a.code, kkopcContext.checkoutOrder.paymentModuleSubCode = a.subCode)
};
kk.renderOPCTileWithCurrentData = function() {
    if (kkopcTemplate == null) kk.getTemplate("onePageCheckoutTile", function(a) {
        kkopcTemplate = a;
        kk.renderOPCTileWithCurrentData()
    });
    else {
        if (kkopcContext.checkoutOrder != null && kkopcContext.checkoutOrder.orderProducts != null)
            for (var a = 0; a < kkopcContext.checkoutOrder.orderProducts.length; a++) {
                var b = kkopcContext.checkoutOrder.orderProducts[a];
                b.prodImage = kk.getProdImageBase(b.product, kkopcContext.imageBase, b.opts) + "_1_tiny" + kk.getProdImageExtension(b.product)
            }
        $("body").find("#kkopc-addr-dialog").remove();
        kkopcContext == null || kkopcContext.opcTileDivId == null ? console.log(kk.getMsg("exception.render.tile", "kk.setOPCTileDivId", "kk.renderOPCTile")) : (a = kkopcTemplate(kkopcContext), kk.emptyBodyArea(), $("#" + kkopcContext.opcTileDivId).html(a), kk.addOPCTileEventHandlers(), kk.stopLoading())
    }
};
kk.addOPCTileEventHandlers = function() {
    $("#kkopc-addr-dialog").dialog({
        autoOpen: false,
        width: "90%",
        modal: "true",
        hide: "blind",
        height: "500",
        overflow: "auto",
        open: function() {
            $("#kkopc-addr-dialog").width() > 500 && $("#kkopc-addr-dialog").dialog("option", "width", 500)
        }
    });
    $("#kkopc-error-dialog").dialog({
        autoOpen: false,
        width: "90%",
        modal: "true",
        hide: "blind"
    });
    $("#kkopc-abdelivery").off().on("click", function() {
        kk.getCustomerInfoTemplateContext().control = "delivery";
        $("#kkopc-addr-dialog").dialog("open");
        return false
    });
    $("#kkopc-abbilling").off().on("click", function() {
        kk.getCustomerInfoTemplateContext().control = "billing";
        $("#kkopc-addr-dialog").dialog("open");
        return false
    });
    $("#kkopc-error-dialog-close").off().on("click", function() {
        $("#kkopc-error-dialog").dialog("close");
        return false
    });
    $("#kkopc-newDelivery").off().on("click", function() {
        kk.getCustomerInfoTemplateContext().control = "delivery";
        kk.renderCustomerInfoTile("insertAddress");
        return false
    });
    $("#kkopc-editDelivery").off().on("click", function() {
        kk.getCustomerInfoTemplateContext().control =
            "delivery";
        kk.editAddress(kkopcContext.checkoutOrder.deliveryAddrId);
        return false
    });
    $("#kkopc-newBilling").off().on("click", function() {
        kk.getCustomerInfoTemplateContext().control = "billing";
        kk.renderCustomerInfoTile("insertAddress");
        return false
    });
    $("#kkopc-editBilling").off().on("click", function() {
        kk.getCustomerInfoTemplateContext().control = "billing";
        kk.editAddress(kkopcContext.checkoutOrder.billingAddrId);
        return false
    });
    $(".kkopc-select-addr-button").off().on("click", function() {
        $("#kkopc-addr-dialog").dialog("close");
        var a = this.id.split("-")[1];
        if (kkCustomerInfoTileContext.control == "billing") kk.getOPCTileTemplateContext().billingAddrId = a, kk.renderOPCTile(true);
        else if (kkCustomerInfoTileContext.control == "delivery") kk.getOPCTileTemplateContext().deliveryAddrId = a, kk.renderOPCTile(true);
        return false
    });
    $("#kkopc-continue-button").off().on("click", function() {
        $("#kk-opc-form").validate(validationRules).form() && ($(this).removeClass().text("").addClass("kk-button-loading"), kk.confirmOrder());
        return false
    });
    $(".kkopc-order-item-link").off().on("click",
        function() {
            var a = this.id.split("-")[1];
            kk.renderProdDetailTile(a);
            return false
        });
    var a = null;
    $("#kkCouponCode").keydown(function() {
        var b = $(this);
        a == null && (a = b.val())
    });
    $("#kkCouponCode").keyup(function() {
        var b = $(this);
        $("#kk-opc-form").validate(validationRules).form() == true || b.val() == "" ? b.val() != a ? $("#kkopc-couponCodeUpdate").show() : $("#kkopc-couponCodeUpdate").hide() : $("#kkopc-couponCodeUpdate").hide()
    });
    var b = null;
    $("#kkGiftCertCode").keydown(function() {
        var a = $(this);
        b == null && (b = a.val())
    });
    $("#kkGiftCertCode").keyup(function() {
        var a =
            $(this);
        $("#kk-opc-form").validate(validationRules).form() == true || a.val() == "" ? a.val() != b ? $("#kkopc-giftCertCodeUpdate").show() : $("#kkopc-giftCertCodeUpdate").hide() : $("#kkopc-giftCertCodeUpdate").hide()
    });
    $("#kkopc-couponCodeUpdate").off().on("click", function() {
        var a = $("#kkCouponCode").val();
        kk.setCouponCode(a);
        kk.renderOPCTile(true);
        return false
    });
    $("#kkopc-giftCertCodeUpdate").off().on("click", function() {
        var a = $("#kkGiftCertCode").val();
        kk.setGiftCertificateCode(a);
        kk.renderOPCTile(true);
        return false
    })
};
kk.confirmOrder = function() {
    kk.checkSession(function() {
        if (kkopcContext.checkoutOrder.paymentDetails == null) kk.opcErrorMessage(kkopcContext.getMsg("opc.tile.error.payment.details"));
        else {
            kkopcContext.checkoutOrder.locale = kk.getLocale();
            var a = kk.escape($("#kkOrderComment").val()),
                b = {};
            b.comments = a;
            a = [];
            a.push(b);
            kkopcContext.checkoutOrder.statusTrail = a;
            b = kkopcContext.checkoutOrder.paymentDetails.paymentType;
            a = kkopcContext.checkoutOrder.totalIncTax;
            if (a != null && a == 0) kkopcContext.checkoutOrder.status = KK_PAYMENT_RECEIVED_STATUS,
                kk.saveOrder(true, function(a) {
                    kkEng.updateInventoryWithOptions(kk.getSessionId(), a, kk.getCreateOrderOptions(), function(a) {
                        decodeJson(a);
                        kk.emptyCart();
                        kk.returnToAccountPage()
                    }, null, kk.getKKEng())
                });
            else if (b == KK_COD) kkopcContext.checkoutOrder.status = KK_PENDING_STATUS, kk.addPaymentDetailsToCheckoutOrder(kkopcContext.checkoutOrder.paymentDetails), kk.saveOrder(true, function(a) {
                kkEng.updateInventoryWithOptions(kk.getSessionId(), a, kk.getCreateOrderOptions(), function(a) {
                        decodeJson(a);
                        kk.emptyCart();
                        kk.returnToAccountPage()
                    },
                    null, kk.getKKEng())
            });
            else if (b == KK_BROWSER_PAYMENT_GATEWAY) kk.opcErrorMessage(kkopcContext.getMsg("opc.tile.error.payment.module.not.implemented"));
            else if (b == KK_BROWSER_IN_FRAME_PAYMENT_GATEWAY) kk.opcErrorMessage(kkopcContext.getMsg("opc.tile.error.payment.module.not.implemented"));
            else if (b == KK_SERVER_PAYMENT_GATEWAY) kkopcContext.checkoutOrder.status = KK_WAITING_PAYMENT_STATUS, kk.addPaymentDetailsToCheckoutOrder(kkopcContext.checkoutOrder.paymentDetails), kk.saveOrder(false, function(a) {
                kk.redirect(kkRoot +
                    "CheckoutServerPayment.action?orderId=" + a + "&sessionId=" + kk.getSessionId())
            })
        }
    }, function() {
        kk.renderOPCTile()
    })
};
kk.saveOrder = function(a, b) {
    if (kkopcContext.checkoutOrder.statusTrail != null && kkopcContext.checkoutOrder.statusTrail.length > 0) kkopcContext.checkoutOrder.statusTrail[0].orderStatusId = kkopcContext.checkoutOrder.status;
    kkopcContext.checkoutOrder.statusTrail[0].customerNotified = kkSendOrderConfirmationMail == true ? true : false;
    for (var c = 0; c < kkopcContext.checkoutOrder.orderProducts.length; c++) kkopcContext.checkoutOrder.orderProducts[c].product = null;
    for (c = 0; c < kkopcContext.checkoutOrder.orderTotals.length; c++) kkopcContext.checkoutOrder.orderTotals[c].promotions =
        null;
    kkEng.saveOrder(kk.getSessionId(), kkopcContext.checkoutOrder, kk.getLangId(), function(c) {
        c = decodeJson(c);
        kkopcContext.checkoutOrder.orderId = c;
        kkSendOrderConfirmationMail == true && a == true && kk.sendOrderConfirmationEmail(c);
        b != null && b(c)
    }, null, kk.getKKEng())
};
kk.returnToAccountPage = function() {
    kkEng.getOrdersPerCustomer({
        offset: 0,
        limit: 3
    }, kk.getSessionId(), kk.getLangId(), function(a) {
        a = decodeJson(a);
        kkAccountTileContext.orders = a.orderArray;
        var b = kkopcContext.getMsg("opc.tile.order.success");
        kk.getDigitalDownloads(function() {
            kk.renderAccountTile(false, b, null)
        })
    }, null, kk.getKKEng())
};
kk.sendOrderConfirmationEmail = function(a) {
    var b = {};
    if (b.countryCode == null) b.countryCode = kk.getLocale().substring(0, 2);
    if (b.templateName == null) b.templateName = "OrderConfReceived";
    kkEng.sendOrderConfirmationEmail1(kk.getSessionId(), a, kk.getLangId(), b, function(a) {
        decodeJson(a)
    }, null, kk.getKKEng())
};
kk.shippingRefresh = function() {
    var a = $("#kkopc-shippingQuotes").val().split("~~");
    if (a.length == 1) kkopcContext.selectedShippingCode = a[0];
    else if (a.length == 2) kkopcContext.selectedShippingCode = a[0], kkopcContext.selectedShippingServiceCode = a[1];
    kk.renderOPCTile(true)
};
kk.paymentRefresh = function() {
    var a = $("#kkopc-paymentDetails").val().split("~~");
    if (a.length == 1) kkopcContext.selectedPaymentCode = a[0];
    else if (a.length == 2) kkopcContext.selectedPaymentCode = a[0], kkopcContext.selectedPaymentSubCode = a[1];
    kk.renderOPCTile(true)
};
kk.opcErrorMessage = function(a) {
    $("kkopc-error-msg").text(a == null ? "" : a);
    $("#kkopc-error-dialog").dialog("open")
};
var kkodTileContext = null,
    kkodTileTemplate = null;
kk.getOrderDetailTileTemplateContext = function() {
    kkodTileContext == null && (kkodTileContext = kk.getTemplateContext())
};
kk.setOrderDetailDivId = function(a) {
    kk.getOrderDetailTileTemplateContext();
    kkodTileContext.orderDetailTileDivId = a
};
kk.renderOrderDetailTile = function(a) {
    kk.checkSession(function() {
        kkodTileContext.caller = Backbone.history.fragment;
        if (kkodTileTemplate == null) kk.getTemplate("orderDetailTile", function(b) {
            kkodTileTemplate = b;
            kk.renderOrderDetailTile(a)
        });
        else if (kkodTileContext == null || kkodTileContext.orderDetailTileDivId == null) console.log(kk.getMsg("exception.render.tile", "kk.setOrderDetailDivId", "kk.renderOrderDetailTile"));
        else {
            var b = null;
            if (kkAccountTileContext != null && kkAccountTileContext.orders != null)
                for (var c = 0; c <
                    kkAccountTileContext.orders.length; c++) {
                    var d = kkAccountTileContext.orders[c];
                    if (d.id == a) {
                        b = d;
                        break
                    }
                }
            b == null ? kkEng.getOrder(kk.getSessionId(), a, kk.getLangId(), function(a) {
                a = decodeJson(a);
                kkodTileContext.order = a;
                kk.renderOrderDetailTilePrivate()
            }, null, kk.getKKEng()) : (kkodTileContext.order = b, kk.renderOrderDetailTilePrivate())
        }
    })
};
kk.renderOrderDetailTilePrivate = function() {
    var a = {};
    a.orderId = kkodTileContext.order.id;
    kk.setURL("orderDetail", a);
    a = kkodTileTemplate(kkodTileContext);
    kk.emptyBodyArea();
    $("#" + kkodTileContext.orderDetailTileDivId).html(a);
    kk.addOrderDetailTileEventHandlers()
};
kk.addOrderDetailTileEventHandlers = function() {
    $("#kkod-repeat-button").off().on("click", function() {
        kk.repeatOrder(kkodTileContext.order.id);
        return false
    });
    $("#kkod-back-button").off().on("click", function() {
        kkodTileContext.caller != null && kkodTileContext.caller.indexOf("account") > -1 ? kk.renderAccountTile(false) : kk.navigateOrders();
        return false
    });
    $(".kkod-order-item-link").off().on("click", function() {
        var a = this.id.split("-")[1];
        kk.renderProdDetailTile(a);
        return false
    })
};
kk.repeatOrder = function(a) {
    kk.checkSession(function(b) {
        kkEng.getOrder(kk.getSessionId(), a, kk.getLangId(), function(c) {
            var d = decodeJson(c);
            d.orderProducts == null || d.orderProducts.length == 0 ? console.log("Order id = " + a + " has no order products. Cannot repeat.") : kkEng.removeBasketItemsPerCustomer(kk.getSessionId(), 0, function() {
                for (var a = d.orderProducts.length, c = 0; c < d.orderProducts.length; c++) {
                    var g = d.orderProducts[c],
                        h = new Basket;
                    h.quantity = g.quantity;
                    h.opts = g.opts;
                    h.productId = g.productId;
                    h.custom1 = g.custom1;
                    h.custom2 = g.custom2;
                    h.custom3 = g.custom3;
                    h.custom4 = g.custom4;
                    h.custom5 = g.custom5;
                    kkEng.addToBasketWithOptions(kk.getSessionId(), b, h, kk.getAddToBasketOptions(), function() {
                        a--;
                        a == 0 && (kk.repeatOrderFromBasketItems(b, d), kk.fetchCart())
                    }, null, kk.getKKEng())
                }
            }, null, kk.getKKEng())
        }, null, kk.getKKEng())
    })
};
kk.repeatOrderFromBasketItems = function(a, b) {
    kk.getOPCTileTemplateContext(true);
    kkopcContext.checkoutOrder = b;
    kkopcContext.billingAddrId = b.billingAddrId;
    kkopcContext.deliveryAddrId = b.deliveryAddrId;
    kkopcContext.selectedShippingCode = b.shippingModuleCode;
    kkopcContext.selectedShippingServiceCode = b.shippingServiceCode;
    kkopcContext.selectedPaymentCode = b.paymentModuleCode;
    kkopcContext.selectedPaymentSubCode = b.paymentModuleSubCode;
    kk.renderOPCTile(true)
};
kk.downloadOrderInvoice = function(a) {
    kk.checkSession(function() {
        kk.getHiddenIframe().src = kkRoot + "DownloadInvoiceExt.action?orderId=" + a + "&sessionId=" + kk.getSessionId()
    })
};
kk.getCreateOrderOptions = function() {
    var a = {},
        b = kk.getFetchProdOptions();
    if (b != null) a.catalogId = b.catalogId, a.useExternalPrice = b.useExternalPrice, a.useExternalQuantity = b.useExternalQuantity;
    a.getImages = kkGetProdImages;
    a.useWishListShippingAddr = true;
    a.locale = kk.getLocale();
    return a
};
var kkosContext = null,
    kkosTemplate = null;
kk.getOrdersTileTemplateContext = function() {
    if (kkosContext == null) {
        kkosContext = kk.getTemplateContext();
        kkosContext.totalNumOrds = 0;
        kkosContext.numOrds = 0;
        kkosContext.showNext = false;
        kkosContext.showBack = false;
        kkosContext.currentPage = 1;
        kkosContext.pageList = null;
        kkosContext.maxOrdsPerPage = 10;
        kkosContext.currentOrds = null;
        kkosContext.numPages = 0;
        kkosContext.maxPagesToShow = 5;
        var a = new DataDescriptor;
        a.limit = kkosContext.maxOrdsPerPage + 1;
        a.offset = 0;
        kkosContext.dataDesc = a;
        kkosContext.id = "os" + Math.floor(Math.random() *
            1E4 + 1)
    }
};
kk.setOrdersTileDivId = function(a) {
    kk.getOrdersTileTemplateContext();
    kkosContext.ordersDivId = a
};
kk.fetchAndRenderOrders = function() {
    kkosContext == null || kkosContext.ordersDivId == null ? console.log(kk.getMsg("exception.render.tile", "kk.setOrdersTileDivId", "kk.fetchAndRenderOrders")) : kk.checkSession(function() {
        kk.setURL("orders");
        kk.setOrderDataDescOffset("navStart");
        kkEng.getOrdersPerCustomer(kkosContext.dataDesc, kk.getSessionId(), kk.getLangId(), KKGetOrdersCallback, null, kk.getKKEng())
    })
};
kk.navigateOrders = function() {
    kk.checkSession(function() {
        kkEng.getOrdersPerCustomer(kkosContext.dataDesc, kk.getSessionId(), kk.getLangId(), KKGetOrdersCallback, null, kk.getKKEng())
    })
};
var KKGetOrdersCallback = function(a, b, c) {
    if (kkosTemplate == null) kk.getTemplate("ordersTile", function(d) {
        kkosTemplate = d;
        KKGetOrdersCallback(a, b, c)
    });
    else {
        var d = decodeJson(a);
        kk.setControlsFromOrders(d);
        kkosContext.orders = d.orderArray;
        d = kkosTemplate(kkosContext);
        $("#" + kkosContext.ordersDivId).html(d);
        kk.addOrdersTileEventHandlers()
    }
};
kk.addOrdersTileEventHandlers = function() {
    $(".kkos-pagination-element.kkos-previous-items").off().on("click", function() {
        kk.setOrderDataDescOffset("navBack") && kk.navigateOrders();
        return false
    });
    $(".kkos-pagination-element.kkos-next-items").off().on("click", function() {
        kk.setOrderDataDescOffset("navNext") && kk.navigateOrders();
        return false
    });
    $(".kkos-pagination-element.kkos-page-num").off().on("click", function() {
        var a = this.id.split("-")[1];
        kk.setOrderDataDescOffset(a) && kk.navigateOrders();
        return false
    });
    $(".kkos-order-item-link").off().on("click", function() {
        var a = this.id.split("-")[1];
        kk.renderProdDetailTile(a);
        return false
    });
    $(".kkos-view-order").off().on("click", function() {
        var a = this.id.split("-")[1];
        kk.renderOrderDetailTile(a);
        return false
    });
    $(".kkos-repeat-order").off().on("click", function() {
        var a = this.id.split("-")[1];
        kk.repeatOrder(a);
        return false
    });
    $(".kkos-track-order").off().on("click", function() {
        var a = this.id.split("-")[1];
        console.log("Order tracking for order id = " + a);
        return false
    });
    $(".kkos-invoice-order").off().on("click", function() {
        var a = this.id.split("-")[1];
        kk.downloadOrderInvoice(a);
        return false
    });
    $("#kk-orders-back").off().on("click", function() {
        kk.renderAccountTile(false);
        return false
    })
};
kk.setControlsFromOrders = function(a) {
    kkosContext.currentOrds = a.orderArray == null ? [] : a.orderArray;
    kkosContext.numOrds = kkosContext.currentOrds.length > kkosContext.maxOrdsPerPage ? kkosContext.maxOrdsPerPage : kkosContext.currentOrds.length;
    kkosContext.totalNumOrds = a.totalNumOrders;
    kkosContext.numPages = kkosContext.totalNumOrds / kkosContext.maxOrdsPerPage;
    kkosContext.totalNumOrds % kkosContext.maxOrdsPerPage != 0 && kkosContext.numPages++;
    kkosContext.numPages = Math.floor(kkosContext.numPages);
    kkosContext.currentPage =
        Math.floor(kkosContext.dataDesc.offset / kkosContext.maxOrdsPerPage) + 1;
    kk.getOrderPages();
    kk.setOrderBackAndNext()
};
kk.getOrderPages = function() {
    kkosContext.pageList = [];
    if (kkosContext.currentPage > kkosContext.numPages) kkosContext.currentPage = kkosContext.numPages;
    if (kkosContext.currentPage < 1) kkosContext.currentPage = 1;
    if (kkosContext.maxPagesToShow < 3) kkosContext.maxPagesToShow = 3;
    kkosContext.maxPagesToShow % 2 == 0 && kkosContext.maxPagesToShow++;
    for (var a = Math.floor(kkosContext.maxPagesToShow / 2), b = a; b > 0; b--) kkosContext.pageList.push(kkosContext.currentPage - b);
    kkosContext.pageList.push(kkosContext.currentPage);
    for (b = 0; b < a; b++) kkosContext.pageList.push(kkosContext.currentPage +
        (b + 1));
    for (; kkosContext.pageList[0] < 1;) a = kkosContext.pageList[kkosContext.pageList.length - 1], kkosContext.pageList.shift(), a < kkosContext.numPages && kkosContext.pageList.push(a + 1);
    for (; kkosContext.pageList.length > 0 && kkosContext.pageList[kkosContext.pageList.length - 1] > kkosContext.numPages;) kkosContext.pageList.pop(), kkosContext.pageList.length > 0 && kkosContext.pageList[0] > 1 && kkosContext.pageList.splice(0, 0, kkosContext.pageList[0] - 1)
};
kk.setOrderBackAndNext = function() {
    kkosContext.showNext = kkosContext.currentOrds.length > kkosContext.maxOrdsPerPage ? 1 : 0;
    kkosContext.showBack = kkosContext.dataDesc.offset > 0 ? 1 : 0
};
kk.setOrderDataDescOffset = function(a) {
    var b = true,
        c = -1;
    isNaN(a) || (c = a);
    if (a == "navStart") kkosContext.dataDesc.offset = 0, kkosContext.currentPage = 1;
    else if (a == "navNext") kkosContext.dataDesc.offset + kkosContext.maxOrdsPerPage < kkosContext.totalNumOrds ? (kkosContext.dataDesc.offset += kkosContext.maxOrdsPerPage, kkosContext.currentPage = kkosContext.dataDesc.offset / kkosContext.maxOrdsPerPage + 1) : b = false;
    else if (a == "navBack")
        if (kkosContext.dataDesc.offset == 0) b = false;
        else {
            kkosContext.dataDesc.offset -= kkosContext.maxOrdsPerPage;
            if (kkosContext.dataDesc.offset < 0) kkosContext.dataDesc.offset = 0;
            kkosContext.currentPage = kkosContext.dataDesc.offset / kkosContext.maxOrdsPerPage + 1
        } else if (c > 0) c == kkosContext.currentPage ? b = false : (kkosContext.dataDesc.offset = kkosContext.maxOrdsPerPage * (c - 1), kkosContext.currentPage = c);
    else if (c <= 0) kkosContext.dataDesc.offset = 0, kkosContext.currentPage = 1;
    return b
};
kk.changeOrdersPageSize = function(a) {
    a = $("#" + a).val();
    kkosContext.maxOrdsPerPage = +a;
    kkosContext.dataDesc.limit = kkosContext.maxOrdsPerPage + 1;
    kk.setOrderDataDescOffset("navStart");
    kk.navigateOrders()
};
kk.changeOrdersSortBy = function(a) {
    a = $("#" + a).val();
    kkosContext.dataDesc.orderBy = a;
    kk.setOrderDataDescOffset("navStart");
    kk.navigateOrders()
};
var kkbrContext = null,
    kkbrTemplate = null,
    kkRouter = null;
kk.startRouter = function() {
    typeof Backbone != "undefined" && (kkRouter = new(Backbone.Router.extend({
            routes: {
                "products/*control": "products",
                "filterProducts/*control": "filterProducts",
                "orderDetail/*control": "orderDetail",
                "productDetail/*control": "productDetail",
                "category/*control": "category",
                wishlist: "wishlist",
                cart: "cart",
                register: "register",
                account: "account",
                login: "login",
                managePassword: "managePassword",
                manageEmail: "manageEmail",
                managePersonalInfo: "managePersonalInfo",
                insertAddress: "insertAddress",
                firstAddress: "firstAddress",
                editAddress: "editAddress",
                manageAddressBook: "manageAddressBook",
                newsletterSubscription: "newsletterSubscription",
                productNotification: "productNotification",
                checkout: "checkout",
                writeReview: "writeReview",
                forgotPassword: "forgotPassword",
                orders: "orders",
                "*actions": "defaultRoute"
            }
        })), kkRouter.on("route:productDetail", function(a) {
            try {
                kk.storeInit();
                var b = kk.getParms(a),
                    c = kk.checkInt(b.p),
                    d = b.r == 1 ? true : false,
                    e = kk.getProdDetailsURL(c);
                e == null ? (b = {}, b.showReviewsTab = d, kk.renderProdDetailTile(c, b)) : kk.redirect(e)
            } catch (f) {
                console.log("Invalid productDetail URL : " +
                    a), kk.renderHomePage()
            }
        }), kkRouter.on("route:products", function(a) {
            try {
                kk.storeInit();
                var b = kk.getParms(a),
                    c = b.s,
                    d = b.d,
                    e = kk.checkIntOptional(b.c),
                    f = kk.checkIntOptional(b.m);
                if (c == null) kkpsContext.prodSearch.forceUseSolr = kkpsContext.useSolr, kkpsContext.prodSearch.returnCategoryFacets = true, kkpsContext.prodSearch.returnManufacturerFacets = true, kkpsContext.prodSearch.categoryId = e != null ? e : KK_SEARCH_ALL, kkpsContext.prodSearch.manufacturerId = f != null ? f : KK_SEARCH_ALL;
                else if (kkpsContext.prodSearch = $.parseJSON(kk.base64Decode(c)),
                    d != null) kkpsContext.dataDesc = $.parseJSON(kk.base64Decode(d));
                kk.fetchAndRenderProducts()
            } catch (g) {
                console.log("Invalid products URL : " + a), kk.renderHomePage()
            }
        }), kkRouter.on("route:filterProducts", function(a) {
            try {
                kk.storeInit();
                var b = kk.getParms(a),
                    c = b.s,
                    d = b.d;
                if (c != null && d != null) kkpsContext.prodSearch = $.parseJSON(kk.base64Decode(c)), kkpsContext.dataDesc = $.parseJSON(kk.base64Decode(d));
                kk.filterAndRenderProducts()
            } catch (e) {
                console.log("Invalid filterProducts URL : " + a), kk.renderHomePage()
            }
        }), kkRouter.on("route:orderDetail",
            function(a) {
                try {
                    kk.storeInit();
                    var b = kk.getParms(a),
                        c = kk.checkInt(b.o);
                    kk.renderOrderDetailTile(c)
                } catch (d) {
                    console.log("Invalid orderDetail URL : " + a), kk.renderHomePage()
                }
            }), kkRouter.on("route:category", function(a) {
            try {
                kk.storeInit();
                var b = kk.getParms(a),
                    c = kk.checkInt(b.c);
                kk.selectCategory(c)
            } catch (d) {
                console.log("Invalid category URL : " + a)
            }
        }), kkRouter.on("route:wishlist", function() {
            kk.storeInit();
            kk.refreshManageWishListTile()
        }), kkRouter.on("route:cart", function() {
            kk.storeInit();
            kk.refreshManageCartTile()
        }),
        kkRouter.on("route:register", function() {
            kk.storeInit();
            kk.renderRegisterTile()
        }), kkRouter.on("route:login", function() {
            kk.storeInit();
            kk.renderLoginTile()
        }), kkRouter.on("route:account", function() {
            kk.storeInit();
            kk.renderAccountTile()
        }), kkRouter.on("route:managePassword", function() {
            kk.storeInit();
            kk.renderCustomerInfoTile("managePassword")
        }), kkRouter.on("route:manageEmail", function() {
            kk.storeInit();
            kk.renderCustomerInfoTile("manageEmail")
        }), kkRouter.on("route:managePersonalInfo", function() {
            kk.storeInit();
            kk.renderCustomerInfoTile("managePersonalInfo")
        }), kkRouter.on("route:insertAddress", function() {
            kk.storeInit();
            kk.renderCustomerInfoTile("insertAddress")
        }), kkRouter.on("route:firstAddress", function() {
            kk.storeInit();
            kk.renderCustomerInfoTile("firstAddress")
        }), kkRouter.on("route:editAddress", function() {
            kk.storeInit();
            kk.renderCustomerInfoTile("editAddress")
        }), kkRouter.on("route:manageAddressBook", function() {
            kk.storeInit();
            kk.renderCustomerInfoTile("manageAddressBook")
        }), kkRouter.on("route:newsletterSubscription",
            function() {
                kk.storeInit();
                kk.renderCustomerInfoTile("newsletterSubscription")
            }), kkRouter.on("route:productNotification", function() {
            kk.storeInit();
            kk.renderCustomerInfoTile("productNotification")
        }), kkRouter.on("route:checkout", function() {
            kk.storeInit();
            kk.renderOPCTile()
        }), kkRouter.on("route:writeReview", function() {
            kk.storeInit();
            kk.renderWriteReviewTile()
        }), kkRouter.on("route:forgotPassword", function() {
            kk.storeInit();
            kk.renderForgotPasswordTile()
        }), kkRouter.on("route:orders", function() {
            kk.storeInit();
            kk.fetchAndRenderOrders()
        }), kkRouter.on("route:defaultRoute", function() {
            kk.storeInit();
            kk.renderHomePage()
        }), Backbone.History.started || Backbone.history.start())
};
kk.checkInt = function(a) {
    if (!isNaN(a) && a > -1) return a;
    throw -1;
};
kk.checkIntOptional = function(a) {
    return a == null ? null : kk.checkInt(a)
};
kk.setURL = function(a, b) {
    if (kkRouter != null) {
        var c = null;
        if (a == "productDetail" && b != null) {
            c = a;
            if (b.catNames != null)
                for (var d = b.catNames.length - 1; d > -1; d--) var e = b.catNames[d],
                    c = kk.addToRoute(c, e);
            c = kk.addToRoute(c, b.manu);
            c = kk.addToRoute(c, b.prodName);
            c = kk.addToRoute(c, b.prodModel);
            c += "/p/" + b.prodId;
            b.reviews != null && (c += "/r/1")
        } else if (a == "products" || a == "filterProducts") {
            var f = kk.base64Encode(JSON.stringify(kkpsContext.prodSearch)),
                g = kk.base64Encode(JSON.stringify(kkpsContext.dataDesc)),
                c = a;
            if (b.catNames !=
                null)
                for (d = b.catNames.length - 1; d > -1; d--) e = b.catNames[d], c = kk.addToRoute(c, e);
            b.manu != null && (c = kk.addToRoute(c, b.manu));
            b.search != null && (c = kk.addToRoute(c, b.search));
            c = c + "/d/" + g + "/s/" + f
        } else c = a == "orderDetail" && b != null ? a + "/o/" + b.orderId : a;
        kk.setBreadcrumbs(a, b);
        kkRouter.navigate(c, {
            trigger: false,
            replace: false
        })
    }
};
kk.addToRoute = function(a, b) {
    b = b.replace(/'/g, "%27");
    return a + "/" + encodeURIComponent(b)
};
kk.setBreadcrumbsTileDivId = function(a) {
    kk.getBreadcrumbsTileTemplateContext();
    kkbrContext.breadcrumbsDivId = a
};
kk.getBreadcrumbsTileTemplateContext = function() {
    kkbrContext == null && (kkbrContext = kk.getTemplateContext())
};
kk.renderBreadcrumbsTile = function() {
    if (kkbrTemplate == null) kk.getTemplate("breadcrumbsTile", function(a) {
        kkbrTemplate = a;
        kk.renderBreadcrumbsTile()
    });
    else if (kkbrContext == null || kkbrContext.breadcrumbsDivId == null) console.log(kk.getMsg("exception.render.tile", "kk.setBreadcrumbsTileDivId", "kk.renderBreadcrumbsTile"));
    else {
        var a = kkbrTemplate(kkbrContext);
        $("#" + kkbrContext.breadcrumbsDivId).html(a)
    }
};
kk.setBreadcrumbs = function(a, b) {
    var c = {};
    c.title = kk.getMsg("breadcrumb.tile.home");
    c.link = "";
    var d = [c];
    if (b != null) {
        c = false;
        if (b.catIds != null && b.catIds.length > 0) {
            for (var e = b.catIds.length - 1; e > -1; e--) {
                var f = b.catIds[e],
                    c = {};
                c.title = _.escape(b.catNames[e]);
                c.link = "category/c/" + f;
                d.push(c)
            }
            c = true
        }
        if (b.prodId != null) c = {}, c.title = _.escape(b.prodName), c.link = "productDetail/p/" + b.prodId, d.push(c), c = true;
        if (b.search != null) c = {}, c.title = kk.getMsg("breadcrumb.tile.search", b.search), c.link = null, d.push(c), c = true;
        if (c == false && (c = "breadcrumb.tile." + a, e = kk.getMsg(c), e != c)) c = {}, c.title = e, c.link = a, d.push(c)
    } else c = {}, c.title = kk.getMsg("breadcrumb.tile." + a), c.link = a, d.push(c);
    f = "";
    for (e = 0; e < d.length; e++) e > 0 && (f += '<span class="kkbrt-separator"></span>'), c = d[e], f = c.link != null ? f + '<a class="kkbrt-item" href="#' + c.link + '">' + c.title + "</a>" : f + '<span class="kkbrt-item">' + c.title + "</span>";
    $("#kkbrt-breadcrumbs").html(f)
};
kk.getParms = function(a) {
    var b = {};
    if (a != null && a.length > 0)
        for (var a = a.split("/"), c = null, d = 0, e = a.length - 1; e > -1; e--) {
            var f = a[e];
            d == 0 ? (c = f, d = 1) : (b[f] = c, d = 0)
        }
    return b
};
var kk_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
kk.base64Encode = function(a) {
    for (var b = "", c, d, e, f, g, h, i = 0, a = kk.utf8_encode(a); i < a.length;) c = a.charCodeAt(i++), d = a.charCodeAt(i++), e = a.charCodeAt(i++), f = c >> 2, c = (c & 3) << 4 | d >> 4, g = (d & 15) << 2 | e >> 6, h = e & 63, isNaN(d) ? g = h = 64 : isNaN(e) && (h = 64), b = b + kk_keyStr.charAt(f) + kk_keyStr.charAt(c) + kk_keyStr.charAt(g) + kk_keyStr.charAt(h);
    return b
};
kk.base64Decode = function(a) {
    for (var b = "", c, d, e, f, g, h = 0, a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""); h < a.length;) c = kk_keyStr.indexOf(a.charAt(h++)), d = kk_keyStr.indexOf(a.charAt(h++)), f = kk_keyStr.indexOf(a.charAt(h++)), g = kk_keyStr.indexOf(a.charAt(h++)), c = c << 2 | d >> 4, d = (d & 15) << 4 | f >> 2, e = (f & 3) << 6 | g, b += String.fromCharCode(c), f != 64 && (b += String.fromCharCode(d)), g != 64 && (b += String.fromCharCode(e));
    return b = kk.utf8_decode(b)
};
kk.utf8_encode = function(a) {
    for (var a = a.replace(/\r\n/g, "\n"), b = "", c = 0; c < a.length; c++) {
        var d = a.charCodeAt(c);
        d < 128 ? b += String.fromCharCode(d) : (d > 127 && d < 2048 ? b += String.fromCharCode(d >> 6 | 192) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128)), b += String.fromCharCode(d & 63 | 128))
    }
    return b
};
kk.utf8_decode = function(a) {
    for (var b = "", c = 0, d = c1 = c2 = 0; c < a.length;) d = a.charCodeAt(c), d < 128 ? (b += String.fromCharCode(d), c++) : d > 191 && d < 224 ? (c2 = a.charCodeAt(c + 1), b += String.fromCharCode((d & 31) << 6 | c2 & 63), c += 2) : (c2 = a.charCodeAt(c + 1), c3 = a.charCodeAt(c + 2), b += String.fromCharCode((d & 15) << 12 | (c2 & 63) << 6 | c3 & 63), c += 3);
    return b
};
var kkTilePositionInit = false,
    kkSearchTileInit = false,
    kkCategoryMenuTileInit = false,
    kkBreadcrumbsTileInit = false,
    kkCartLinkInit = false,
    kkWishListLinkInit = false;
kk.renderHomePage = function() {
    kk.emptyBodyArea();
    $("#body-tile").prepend('<img class="kk-rounded-corners" src="' + kkImgBase2 + 'banners/BannerInicio.gif" style="width: 100%;height: 100%;"/>');
    kk.setHomePageCarousel()
};
kk.setHomePageCarousel = function() {
    var a = new DataDescriptor;
    a.limit = 15;
    var b = new ProductSearch;
    b.categoryId = 1;
    kkEng.searchForProductsWithOptions(kk.getSessionId(), a, b, kk.getLangId(), kk.getFetchProdOptions(false), function(a) {
        a = decodeJson(a).productArray;
        kk.renderCarousel("carousel-tile", "últimas Refacciones", a)
    }, null, kk.getKKEng())
};
kk.emptyBodyArea = function() {
    typeof kkpsContext !== "undefined" && kkpsContext != null && ($("#" + kkpsContext.productsDivId).empty(), $("#" + kkpsContext.facetsDivId).empty());
    typeof kkctContext !== "undefined" && kkctContext != null && $("#" + kkctContext.manageCartTileDivId).empty();
    $("#carousel-tile").empty()
};
kk.storeInit = function() {
    kkRouter == null && kk.startRouter();
    kkTilePositionInit == false && (kk.setProductsTileDivId("products-tile"), kk.setFacetsTileDivId("facets-tile"), kk.setCatMenuTileDivId("main-menu"), kk.setSearchTileDivId("search-tile"), kk.setPopupCartTileDivId("kk-popup-cart-tile"), kk.setManageCartTileDivId("body-tile"), kk.setPopupWishListTileDivId("kk-popup-wishList-tile"), kk.setManageWishListTileDivId("body-tile"), kk.setProductDetailTileDivId("body-tile"), kk.setLoginLinkDivId("kk-account-link"),
        kk.setLogoutLinkDivId("kk-logout-link"), kk.setLoginTileDivId("body-tile"), kk.setRegisterTileDivId("body-tile"), kk.setAccountTileDivId("body-tile"), kk.setManagePasswordTileDivId("body-tile"), kk.setManageEmailTileDivId("body-tile"), kk.setManagePersonalInfoTileDivId("body-tile"), kk.setInsertAddressTileDivId("body-tile"), kk.setFirstAddressTileDivId("body-tile"), kk.setEditAddressTileDivId("body-tile"), kk.setManageAddressBookTileDivId("body-tile"), kk.setNewsletterSubscriptionTileDivId("body-tile"), kk.setProductNotificationTileDivId("body-tile"),
        kk.setOPCTileDivId("body-tile"), kk.setOrderDetailDivId("body-tile"), kk.setOrdersTileDivId("body-tile"), kk.setWriteReviewTileDivId("body-tile"), kk.setForgotPasswordTileDivId("body-tile"), kk.setBreadcrumbsTileDivId("breadcrumbs-tile"), kkTilePositionInit = true);
    kkCartLinkInit == false && (kk.fetchCart(), kkCartLinkInit = true);
    kkWishListLinkInit == false && (kk.fetchWishList(), kkWishListLinkInit = true);
    kkSearchTileInit == false && (kk.renderSearchTile(), kkSearchTileInit = true);
    kkCategoryMenuTileInit == false && (kk.renderCategoryMenuTile(),
        kkCategoryMenuTileInit = true);
    kkBreadcrumbsTileInit == false && (kk.renderBreadcrumbsTile(), kkBreadcrumbsTileInit = true)
};
kk.changeStoreLanguage = function(a) {
    kk.changeLocale(function() {
        kk.renderCategoryMenuTile(true);
        kk.setValidationMsgs();
        kk.setCurrencyFormatter()
    }, a, null)
};
kk.changeStoreCurrency = function(a) {
    kkCurrencyCode = a;
    kk.setCurrencyFormatter()
};
kk.setHomePageProducts = function() {
    kkpsContext.prodSearch.returnCategoryFacets = true;
    kkpsContext.prodSearch.returnManufacturerFacets = true;
    kkpsContext.prodSearch.categoryId = 3;
    kkpsContext.prodSearch.manufacturerId = KK_SEARCH_ALL;
    kk.fetchAndRenderProducts()
};