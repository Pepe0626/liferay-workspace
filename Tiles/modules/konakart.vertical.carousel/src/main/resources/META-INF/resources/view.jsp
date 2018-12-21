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
		if ("<%=categoryId%>".length==0) {			
			selector.html("<liferay-ui:message key="configure-portlet" />");
		} else {
			var categoryId = "<%=categoryId%>";
			var limit = <%=limit%>;
			var title = "<%=title%>";
			
			var dataDesc = new DataDescriptor();
			dataDesc.limit = limit;
	
			var prodSearch = new ProductSearch();
			prodSearch.categoryId = categoryId;
	
			kkEng.searchForProductsWithOptions(kk.getSessionId(), dataDesc, prodSearch, kk.getLangId(),
					null, function(result, textStatus, jqXHR) {
						var kkProds = decodeJson(result).productArray;
						kk.renderVerticalCarousel("<%=portletId%>", title, kkProds);
					}, null, kk.getKKEng());
		}
	});
</script>

<div id="kk-portlet-body">
	<div id="<%=portletId%>"><div class="kk-spinner-large"/></div>
</div>