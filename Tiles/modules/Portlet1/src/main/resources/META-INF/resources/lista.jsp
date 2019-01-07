<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>

<%@ taglib uri="http://liferay.com/tld/aui" prefix="aui" %><%@
taglib uri="http://liferay.com/tld/portlet" prefix="liferay-portlet" %><%@
taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme" %><%@
taglib uri="http://liferay.com/tld/ui" prefix="liferay-ui" %>

<liferay-theme:defineObjects />

<portlet:defineObjects />

<h1>Listado Facturas</h1>

<p>
	<a href='<portlet:renderURL />'>Volver</a>
</p>

<table>
	<tr>
		<th>Num</th>
		<th>Cliente</th>
		<th>Importe</th>
	</tr>
	<c:forEach var='f' items='${facturas}'>
	<tr>
		<td>${f.num}</td>
		<td>${f.cliente}</td>
		<td>${f.importe}</td>
	</tr>
	</c:forEach>
</table>
<div style='margin-top:15px;'>
	<portlet:resourceURL var="exportCSV"></portlet:resourceURL>
	<a href='${exportCSV}'>Exportar a CSV</a>
</div>