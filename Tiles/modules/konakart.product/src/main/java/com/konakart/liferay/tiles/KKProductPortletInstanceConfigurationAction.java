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

import javax.portlet.ActionRequest;
import javax.portlet.ActionResponse;
import javax.portlet.PortletConfig;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import com.liferay.portal.kernel.portlet.ConfigurationAction;
import com.liferay.portal.kernel.portlet.DefaultConfigurationAction;

/**
 * Action class that sets the portlet instance configuration preferences
 * <p>
 * javax.portlet.name matches the fully qualified name (with underscores) of the main portlet class
 * 
 */
@Component(immediate = true, property =
{ "javax.portlet.name=" + "com_konakart_liferay_tiles_KKProduct" }, service = ConfigurationAction.class)
public class KKProductPortletInstanceConfigurationAction extends DefaultConfigurationAction
{

    /**
     * getJspPath: Return the path to our configuration jsp file.
     * 
     * @param request
     *            The servlet request.
     * @return String The path
     */
    @Override
    public String getJspPath(HttpServletRequest request)
    {
        return "/configuration.jsp";
    }

    /**
     * processAction: This is used to process the configuration form submission.
     * 
     * @param portletConfig
     *            The portlet configuration.
     * @param actionRequest
     *            The action request.
     * @param actionResponse
     *            The action response.
     * @throws Exception
     *             in case of error.
     */
    @Override
    public void processAction(PortletConfig portletConfig, ActionRequest actionRequest,
            ActionResponse actionResponse) throws Exception
    {
        // Get parameters from request
        String productId = actionRequest.getParameter("productId");
        String title = actionRequest.getParameter("title");
        String addToBasketEnabled = actionRequest.getParameter("addToBasketEnabled");
        String wishListEnabled = actionRequest.getParameter("wishListEnabled");
        // Set the preference values
        setPreference(actionRequest, "productId", productId);
        setPreference(actionRequest, "title", title);
        setPreference(actionRequest, "addToBasketEnabled", addToBasketEnabled);
        setPreference(actionRequest, "wishListEnabled", wishListEnabled);

        // fall through to the super action for the rest of the handling
        super.processAction(portletConfig, actionRequest, actionResponse);
    }

    /**
     * setServletContext: Sets the servlet context, use your portlet's bnd.bnd Bundle-SymbolicName
     * value.
     * 
     * @param servletContext
     *            The servlet context to use.
     */
    @Override
    @Reference(target = "(osgi.web.symbolicname=konakart.product)", unbind = "-")
    public void setServletContext(ServletContext servletContext)
    {
        super.setServletContext(servletContext);
    }

}
