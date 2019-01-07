<%@ include file="/init.jsp" %>

<portlet:renderURL var='alta'>
	<portlet:param name='jspPage' value='/alta.jsp' />
</portlet:renderURL>

<portlet:renderURL var='lista'>
	<portlet:param name='jspPage' value='/lista.jsp' />
</portlet:renderURL>

<ul>
	<li><a href='${alta}'>Alta Factura</a></li>
	<li><a href='${lista}'>Listado Facturas</a></li>
</ul>