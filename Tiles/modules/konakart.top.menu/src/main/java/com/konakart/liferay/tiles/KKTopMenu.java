//
// (c) 2017 DS Data Systems UK Ltd, All rights reserved.
//
// DS Data Systems and KonaKart and their respective logos, are 
// trademarks of DS Data Systems UK Ltd. All rights reserved.
//
// The information in this document is the proprietary property of
// DS Data Systems UK Ltd. and is protected by English copyright law,
// the laws of foreign jurisdictions, and international treaties,
// as applicable. No part of this document may be reproduced,
// transmitted, transcribed, transferred, modified, published, or
// translated into any language, in any form or by any means, for
// any purpose other than expressly permitted by DS Data Systems UK Ltd.
// in writing.
//

package com.konakart.liferay.tiles;

import com.liferay.portal.kernel.portlet.bridges.mvc.MVCPortlet;

import javax.portlet.Portlet;

import org.osgi.service.component.annotations.Component;


@Component(
	immediate = true,
	        property = {
	        "com.liferay.portlet.css-class-wrapper=portlet-jsp",
	        "com.liferay.portlet.display-category=KonaKart",
	        "com.liferay.portlet.header-portlet-css=/css/main.css",
	        "com.liferay.portlet.instanceable=true",
	        "javax.portlet.display-name=Top Menu Portlet",
	        "javax.portlet.init-param.template-path=/",
	        "javax.portlet.init-param.view-template=/view.jsp",
	        "javax.portlet.resource-bundle=content.Language",
	        "javax.portlet.security-role-ref=power-user,user"	        },
	service = Portlet.class
)
public class KKTopMenu extends MVCPortlet {
}
