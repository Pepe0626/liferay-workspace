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
		kk.setProductsTileDivId("products-tile");
		kk.setFacetsTileDivId("facets-tile");
		kk.setManageCartTileDivId("body-tile");
		kk.setManageWishListTileDivId("body-tile");
		kk.setProductDetailTileDivId("body-tile");
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
		kk.startRouter();
	});		
	</script>
<div id="kk-portlet-body">
	
	<div id="kk-page-container">
	    <div id="kk-page">
	    		<div id="kk-products-container">
				<div id="facets-tile"></div>
				<div id="kk-content" class="narrow">
					<div id="products-tile"></div>	
				</div>	
			</div>
			<div id="body-tile"></div>
			<div id="carousel-tile"></div>
		</div>
	</div>
	<div class="kk-modal"></div>				

</div>