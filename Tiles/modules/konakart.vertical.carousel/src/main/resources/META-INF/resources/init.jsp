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

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>

<%@ taglib uri="http://liferay.com/tld/aui" prefix="aui" %>
<%@ taglib uri="http://liferay.com/tld/portlet" prefix="liferay-portlet" %>
<%@ taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme" %>
<%@ taglib uri="http://liferay.com/tld/ui" prefix="liferay-ui" %>

<%@ page import="com.konakart.liferay.tiles.KKCarouselInstanceConfiguration" %>
<%@ page import="com.liferay.portal.kernel.util.GetterUtil" %>
<%@ page import="aQute.bnd.annotation.metatype.Configurable" %>
<%@ page import="com.liferay.portal.kernel.util.Constants" %>
<%@ page import="com.liferay.portal.kernel.log.Log" %>
<%@ page import="com.liferay.portal.kernel.log.LogFactoryUtil" %>


<liferay-theme:defineObjects />

<portlet:defineObjects />


<liferay-util:html-bottom>
     <script>
         define._amd = define.amd;
         define.amd = false;
     </script>
<link type="text/css" rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css" />
<link type="text/css" rel="stylesheet" href="http://localhost:8780/konakart_tiles/gensrc/styles/kk-tile-gen.min.css" />
<link type="text/css" rel="stylesheet" href="http://localhost:8780/konakart_tiles/gensrc/styles/jcarousel.css" />				
<link type="text/css" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />	
			
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>				
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=" crossorigin="anonymous"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/jquery.validate.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/accounting.js/0.4.1/accounting.min.js"></script>
<script type="text/javascript" src="http://localhost:8780/konakart_tiles/gensrc/script/ddpowerzoomer.js"></script>	
<script type="text/javascript" src="http://localhost:8780/konakart_tiles/gensrc/script/jquery.jcarousel.min.js"></script>
<script type="text/javascript" src="http://localhost:8780/konakart_tiles/gensrc/script/jquery.touchSwipe.min.js"></script>
<script type="text/javascript" src="http://localhost:8780/konakart_tiles/gensrc/script/jquery.konakart.min.js"></script>
<script type="text/javascript" src="http://localhost:8780/konakart_tiles/gensrc/script/jquery.ui.datepicker-en.js"></script>
<script type="text/javascript" src="http://localhost:8780/konakart_tiles/gensrc/script/polyglot.js"></script>
<script type="text/javascript" src="http://localhost:8780/konakart_tiles/gensrc/script/kk-tile-gen.min.js"></script>
     <script>
         define.amd = define._amd;
    </script>
</liferay-util:html-bottom>

<%
    KKCarouselInstanceConfiguration configuration = portletDisplay
            .getPortletInstanceConfiguration(KKCarouselInstanceConfiguration.class);


    String categoryId = configuration.categoryId();
    String title = "";
    String limit = "15";
    if (categoryId.length() > 0)
    {
         title = configuration.title();
         limit = configuration.limit();
    }   
    String portletId = portletDisplay.getId();

    if (log.isDebugEnabled())
    {
        log.debug("categoryId    = " + categoryId);
        log.debug("title         = " + title);
        log.debug("limit         = " + limit);
        log.debug("portletId     = " + portletId);    
    }
%>
<%!
private static Log log = LogFactoryUtil.getLog("com.konakart.vertical.carousel.portlet.init_jsp");
%>
