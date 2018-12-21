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

package com.konakart.actions;

import java.math.BigDecimal;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.konakart.al.KKAppEng;
import com.konakart.appif.CustomerIf;
import com.konakartadmin.app.AdminCustomer;
import com.konakartadmin.app.AdminCustomerTag;

/**
 * Gets called after submitting the B2B customer tag save.
 */
public class B2BCustomerRolesSubmitAction extends B2BBaseAction
{
    private static final long serialVersionUID = 1L;

    private int b2bCustId;

    private String b2bCustName;

    private boolean canChangeAddressBool;

    private boolean ordersNeedApprovalBool;

    private String orderLimitStr;

    private String aggOrderLimitStr;

    private boolean canViewSiblingOrdersBool;

    public String execute()
    {
        HttpServletRequest request = ServletActionContext.getRequest();
        HttpServletResponse response = ServletActionContext.getResponse();

        KKAppEng kkAppEng = null;

        try
        {
            int custId;

            kkAppEng = this.getKKAppEng(request, response);

            custId = this.loggedIn(request, response, kkAppEng, null);

            // Check to see whether the user is logged in
            custId = this.loggedIn(request, response, kkAppEng, "B2BManageCustomers");
            if (custId < 0)
            {
                return KKLOGIN;
            }

            // Ensure we are using the correct protocol. Redirect if not.
            String redirForward = checkSSL(kkAppEng, request, custId, /* forceSSL */false);
            if (redirForward != null)
            {
                setupResponseForSSLRedirect(response, redirForward);
                return null;
            }

            // Ensure that the current customer is of the correct type
            if (!isB2BAdmin(kkAppEng))
            {
                return "B2BManageCustomers";
            }

            // Get the customer we need to edit from the admin eng
            CustomerIf currentCust = kkAppEng.getCustomerMgr().getCurrentCustomer();
            AdminCustomer b2bCust = kkAppEng.getAdminEng()
                    .getCustomerForIdWithOptions(kkAppEng.getSessionId(), b2bCustId, null);
            if (b2bCust == null)
            {
                log.info("Customer with id = " + b2bCustId + " could not be found.");
                return "B2BManageCustomers";
            }

            if (b2bCust.getParentId() != currentCust.getId())
            {
                log.info("Customer with id = " + b2bCustId
                        + " is not a child of the current customer.");
                return "B2BManageCustomers";
            }

            AdminCustomerTag tag;

            tag = new AdminCustomerTag();
            tag.setName(B2B_CAN_CHANGE_ADDRESS);
            tag.kkSetValueAsBoolean(canChangeAddressBool);
            kkAppEng.getAdminEng().insertCustomerTagForCustomer(kkAppEng.getSessionId(), b2bCustId,
                    tag);

            tag = new AdminCustomerTag();
            tag.setName(B2B_ORDERS_NEED_APPROVAL);
            tag.kkSetValueAsBoolean(ordersNeedApprovalBool);
            kkAppEng.getAdminEng().insertCustomerTagForCustomer(kkAppEng.getSessionId(), b2bCustId,
                    tag);

            tag = new AdminCustomerTag();
            tag.setName(B2B_VIEW_SIBLING_ORDERS);
            tag.kkSetValueAsBoolean(canViewSiblingOrdersBool);
            kkAppEng.getAdminEng().insertCustomerTagForCustomer(kkAppEng.getSessionId(), b2bCustId,
                    tag);

            BigDecimal orderLimit = getBigDecimalFromString(orderLimitStr);
            if (orderLimit == null)
            {
                kkAppEng.getAdminEng().deleteCustomerTagForCustomer(kkAppEng.getSessionId(),
                        b2bCustId, B2B_ORDER_LIMIT);
            } else
            {
                tag = new AdminCustomerTag();
                tag.setName(B2B_ORDER_LIMIT);
                tag.kkSetValueAsBigDecimal(orderLimit);
                kkAppEng.getAdminEng().insertCustomerTagForCustomer(kkAppEng.getSessionId(),
                        b2bCustId, tag);
            }

            BigDecimal aggOrderLimit = getBigDecimalFromString(aggOrderLimitStr);
            if (aggOrderLimit == null)
            {
                kkAppEng.getAdminEng().deleteCustomerTagForCustomer(kkAppEng.getSessionId(),
                        b2bCustId, B2B_AGGREGATE_ORDER_LIMIT);
            } else
            {
                tag = new AdminCustomerTag();
                tag.setName(B2B_AGGREGATE_ORDER_LIMIT);
                tag.kkSetValueAsBigDecimal(aggOrderLimit);
                kkAppEng.getAdminEng().insertCustomerTagForCustomer(kkAppEng.getSessionId(),
                        b2bCustId, tag);
            }

            return SUCCESS;

        } catch (Exception e1)
        {
            return super.handleException(request, e1);
        }
    }

    /**
     * @return the b2bCustId
     */
    public int getB2bCustId()
    {
        return b2bCustId;
    }

    /**
     * @param b2bCustId
     *            the b2bCustId to set
     */
    public void setB2bCustId(int b2bCustId)
    {
        this.b2bCustId = b2bCustId;
    }

    /**
     * @return the canChangeAddressBool
     */
    public boolean isCanChangeAddressBool()
    {
        return canChangeAddressBool;
    }

    /**
     * @param canChangeAddressBool
     *            the canChangeAddressBool to set
     */
    public void setCanChangeAddressBool(boolean canChangeAddressBool)
    {
        this.canChangeAddressBool = canChangeAddressBool;
    }

    /**
     * @return the ordersNeedApprovalBool
     */
    public boolean isOrdersNeedApprovalBool()
    {
        return ordersNeedApprovalBool;
    }

    /**
     * @param ordersNeedApprovalBool
     *            the ordersNeedApprovalBool to set
     */
    public void setOrdersNeedApprovalBool(boolean ordersNeedApprovalBool)
    {
        this.ordersNeedApprovalBool = ordersNeedApprovalBool;
    }

    /**
     * @return the orderLimitStr
     */
    public String getOrderLimitStr()
    {
        return orderLimitStr;
    }

    /**
     * @param orderLimitStr
     *            the orderLimitStr to set
     */
    public void setOrderLimitStr(String orderLimitStr)
    {
        this.orderLimitStr = orderLimitStr;
    }

    /**
     * @return the canViewSiblingOrdersBool
     */
    public boolean isCanViewSiblingOrdersBool()
    {
        return canViewSiblingOrdersBool;
    }

    /**
     * @param canViewSiblingOrdersBool
     *            the canViewSiblingOrdersBool to set
     */
    public void setCanViewSiblingOrdersBool(boolean canViewSiblingOrdersBool)
    {
        this.canViewSiblingOrdersBool = canViewSiblingOrdersBool;
    }

    /**
     * @return the b2bCustName
     */
    public String getB2bCustName()
    {
        return b2bCustName;
    }

    /**
     * @param b2bCustName
     *            the b2bCustName to set
     */
    public void setB2bCustName(String b2bCustName)
    {
        this.b2bCustName = b2bCustName;
    }

    /**
     * @return the aggOrderLimitStr
     */
    public String getAggOrderLimitStr()
    {
        return aggOrderLimitStr;
    }

    /**
     * @param aggOrderLimitStr the aggOrderLimitStr to set
     */
    public void setAggOrderLimitStr(String aggOrderLimitStr)
    {
        this.aggOrderLimitStr = aggOrderLimitStr;
    }

}
