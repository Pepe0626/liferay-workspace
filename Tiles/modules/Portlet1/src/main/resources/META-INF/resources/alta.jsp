<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>

<%@ taglib uri="http://liferay.com/tld/aui" prefix="aui" %><%@
taglib uri="http://liferay.com/tld/portlet" prefix="liferay-portlet" %><%@
taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme" %><%@
taglib uri="http://liferay.com/tld/ui" prefix="liferay-ui" %>

<liferay-theme:defineObjects />

<portlet:defineObjects />

<h1>Alta Factura</h1>
<p>
	<a href='<portlet:renderURL />'>Volver</a>
</p>
<portlet:actionURL name="altaFactura" var="altaFacturaURL" />

<form method="post" action='${altaFacturaURL}'>

<div>
	Numero: <input type="text" name='<portlet:namespace/>num' />
</div>
<div>
	Cliente: <input type="text" name='<portlet:namespace/>cliente' />
</div>
<div>
	Importe: <input type="text" name='<portlet:namespace/>importe' />
</div>

<div>
	<input type="submit" value="Enviar" />
</div>
</form>