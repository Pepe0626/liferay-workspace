<%--
//
// (c) 2017 DS Data Systems UK Ltd, All rights reserved.
//
// DS Data Systems and KonaKart and their respective logos, are 
// trademarks of DS Data Systems UK Ltd. All rights reserved.
//
// The information in this document is free software; you can redistribute 
// it and/or modify it under the terms of the GNU Lesser General Public
// License as published by the Free Software Foundation; either
// version 2.1 of the License, or (at your option) any later version.
// 
// This software is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// Lesser General Public License for more details.
//
--%>


<%@ include file="/init.jsp" %>


 
	
	<script>	
Liferay.Portlet.ready(function(portletId, node) {
			kk.setPopupCartTileDivId("kk-popup-cart-tile");
			kk.setPopupWishListTileDivId("kk-popup-wishList-tile");
			kk.setLoginLinkDivId("kk-account-link");
			kk.setLogoutLinkDivId("kk-logout-link");
			kk.fetchCart();
			kk.fetchWishList();
		});	
	</script>
<div id="kk-portlet-body">
	    	<div id="kk-top-bar-container">
				<div id="kk-top-bar">
					<div id="kk-options-container">
						<div id="kk-options">	
							<div id="kk-popup-cart-tile"></div>
							<div id="kk-popup-wishList-tile"></div>
							<a id="kk-account-link"></a>
							<a id="kk-logout-link"></a>
						</div>
					</div>
				</div>
			</div>										

</div>