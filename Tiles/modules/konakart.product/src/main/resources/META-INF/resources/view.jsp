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

<%@ include file="/init.jsp"%>

<script>
Liferay.Portlet.ready(function(portletId, node) {		
		var selector = $("#<%=portletId%>");		
		if ("<%=productId%>".length==0) {			
			selector.html("<liferay-ui:message key="configure-portlet" />");
		} else {
			var prodId = "<%=productId%>";
			var addToBasketEnabled = <%=addToBasketEnabled%>;
			var wishListEnabled = <%=wishListEnabled%>;
			var title = "<%=title%>";
	
			var kkProdTileConfig = new Object();
			kkProdTileConfig.style = "kkpt-single";
			kkProdTileConfig.selector = selector;
			kkProdTileConfig.addToBasketEnabled = addToBasketEnabled;
			kkProdTileConfig.wishListEnabled = wishListEnabled;
			kkProdTileConfig.addHandlers = true;
			kkProdTileConfig.title = title;
	
			kkEng.getProduct(kk.getSessionId(), prodId, kk.getLangId(), function(result, textStatus, jqXHR) {
				var kkProd = decodeJson(result);
				kk.renderProdTile(kkProd, kkProdTileConfig);
			}, null, kk.getKKEng());
		}
	});
</script>

<div id="kk-portlet-body">
	<div id="<%=portletId%>"><div class="kk-spinner-large"/></div>
</div>