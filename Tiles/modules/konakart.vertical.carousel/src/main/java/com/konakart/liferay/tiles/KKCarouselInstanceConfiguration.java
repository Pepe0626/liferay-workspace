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

import aQute.bnd.annotation.metatype.Meta;

import com.liferay.portal.configuration.metatype.annotations.ExtendedObjectClassDefinition;

/**
 * The class that contains the portlet instance configuration values
 * 
 */
@ExtendedObjectClassDefinition(category = "KonaKart", scope = ExtendedObjectClassDefinition.Scope.PORTLET_INSTANCE)
@Meta.OCD(id = "com.konakart.liferay.tiles.KKCarouselInstanceConfiguration")
public interface KKCarouselInstanceConfiguration
{

    /**
     * 
     * @return Returns the category id of the products displayed by the carousel
     */
    @Meta.AD(required = true)
    public String categoryId();
    
    /**
     * 
     * @return Returns the title of the carousel portlet
     */
    @Meta.AD(required = true)
    public String title();
    
    /**
     * 
     * @return Returns the maximum number of products displayed in the carousel
     */
    @Meta.AD(required = true)
    public String limit();
}