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


<liferay-portlet:actionURL portletConfiguration="<%= true %>"
	var="configurationActionURL"
/>

<liferay-portlet:renderURL portletConfiguration="<%= true %>"
	var="configurationRenderURL"
/>

<aui:form action="<%= configurationActionURL %>" method="post" name="fm">
	<aui:input name="<%= Constants.CMD %>" type="hidden"
		value="<%= Constants.UPDATE %>"
	/>

	<aui:input name="redirect" type="hidden"
		value="<%= configurationRenderURL %>"
	/>

	<aui:fieldset>
		<aui:input autoFocus="true" helpMessage="productId-help" label="productId-label" name="productId" type="text" value="<%= productId %>" />
	</aui:fieldset>

	<aui:fieldset>
		<aui:input autoFocus="true" helpMessage="title-help" label="title-label" name="title" type="text" value="<%= title %>" />
	</aui:fieldset>

	<aui:fieldset>
		<aui:input autoFocus="true" helpMessage="addToBasketEnabled-help" label="addToBasketEnabled-label" name="addToBasketEnabled" type="checkbox" value="<%= addToBasketEnabled %>" />
	</aui:fieldset>

	<aui:fieldset>
		<aui:input autoFocus="true" helpMessage="wishListEnabled-help" label="wishListEnabled-label" name="wishListEnabled" type="checkbox" value="<%= wishListEnabled %>" />
	</aui:fieldset>

	<aui:button-row>
		<aui:button type="submit"></aui:button>
	</aui:button-row>
</aui:form>