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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.konakart.al.KKAppEng;
import com.konakart.appif.CustomerIf;
import com.konakart.appif.ZoneIf;
import com.konakartadmin.app.AdminAddress;
import com.konakartadmin.app.AdminCustomer;

/**
 * Gets called after submitting the B2B new address page.
 */
public class B2BNewAddressSubmitAction extends BaseAction
{
    private static final long serialVersionUID = 1L;

    private int addrId;
    
    private int b2bCustId;

    private String city;

    private String company;

    private int countryId = 0;

    private String gender;

    private String firstName;

    private String lastName;

    private String postcode;

    private String state;

    private int zoneId = -1;

    private ZoneIf[] zoneArray;

    private String streetAddress;

    private String streetAddress1;

    private String suburb;

    private String telephoneNumber;

    private String telephoneNumber1;

    private String emailAddrOptional;

    private int countryChange;

    private boolean setAsPrimaryBool;

    private AdminAddress addr;

    public String execute()
    {
        HttpServletRequest request = ServletActionContext.getRequest();
        HttpServletResponse response = ServletActionContext.getResponse();

        KKAppEng kkAppEng = null;

        try
        {

            kkAppEng = this.getKKAppEng(request, response);

            // Check to see whether the user is logged in
            int custId = this.loggedIn(request, response, kkAppEng, "B2BAddressBook");
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

            CustomerIf currentCust = kkAppEng.getCustomerMgr().getCurrentCustomer();
            AdminCustomer addrCust = kkAppEng.getAdminEng().getCustomerForIdWithOptions(
                    kkAppEng.getSessionId(), b2bCustId, null);
            if (addrCust == null)
            {
                log.info("Customer with id = " + b2bCustId + " could not be found.");
                return "B2BAddressBook";
            }

            if (addrCust.getParentId() != currentCust.getId())
            {
                log.info("Customer with id = " + addrCust.getId()
                        + " is not a child of the current customer.");
                return "B2BAddressBook";
            }
            // Determine whether there has been a country change
            if (getCountryChange() == 1)
            {
                setState(null);
                return "ChangedCountry";
            }

            // Copy the inputs from the form to an address object
            addr = new AdminAddress();
            addr.setId(addrId);
            addr.setCity(escapeFormInput(getCity()));
            addr.setCompany(escapeFormInput(getCompany()));
            addr.setCountryId(getCountryId());
            addr.setCustomerId(addrCust.getId());
            addr.setFirstName(escapeFormInput(getFirstName()));
            addr.setGender(escapeFormInput(getGender()));
            addr.setLastName(escapeFormInput(getLastName()));
            addr.setPostcode(escapeFormInput(getPostcode()));
            addr.setStreetAddress(escapeFormInput(getStreetAddress()));
            addr.setStreetAddress1(escapeFormInput(getStreetAddress1()));
            addr.setSuburb(escapeFormInput(getSuburb()));
            addr.setTelephoneNumber(escapeFormInput(getTelephoneNumber()));
            addr.setTelephoneNumber1(escapeFormInput(getTelephoneNumber1()));
            addr.setEmailAddr(escapeFormInput(getEmailAddrOptional()));
            addr.setIsPrimary(isSetAsPrimaryBool());

            zoneArray = kkAppEng.getEng().getZonesPerCountry(getCountryId());
            if (zoneArray == null || zoneArray.length == 0)
            {
                addr.setState(escapeFormInput(getState()));
                addr.setZoneId(0);
            } else
            {
                if (getState() != null)
                {
                    String[] stateArray = getState().split("::");
                    if (stateArray.length == 2)
                    {
                        addr.setState(stateArray[0]);
                        addr.setZoneId(Integer.parseInt(stateArray[1]));
                    }
                } else
                {
                    addr.setState(escapeFormInput(getState()));
                }
            }

            kkAppEng.getAdminEng().insertAddress(kkAppEng.getSessionId(), addr);

            // Add a message to say all OK
            addActionMessage(kkAppEng.getMsg("b2bnewaddress.book.body.insertedok",
                    addrCust.getFirstName() + " " + addrCust.getLastName()));
            
            return "B2BAddressBook";

        } catch (Exception e)
        {
            return super.handleException(request, e);
        }
    }

    /**
     * @return the gender
     */
    public String getGender()
    {
        return gender;
    }

    /**
     * @param gender
     *            the gender to set
     */
    public void setGender(String gender)
    {
        this.gender = gender;
    }

    /**
     * @return the firstName
     */
    public String getFirstName()
    {
        return firstName;
    }

    /**
     * @param firstName
     *            the firstName to set
     */
    public void setFirstName(String firstName)
    {
        this.firstName = firstName;
    }

    /**
     * @return the lastName
     */
    public String getLastName()
    {
        return lastName;
    }

    /**
     * @param lastName
     *            the lastName to set
     */
    public void setLastName(String lastName)
    {
        this.lastName = lastName;
    }

    /**
     * @return the setAsPrimaryBool
     */
    public boolean isSetAsPrimaryBool()
    {
        return setAsPrimaryBool;
    }

    /**
     * @param setAsPrimaryBool
     *            the setAsPrimaryBool to set
     */
    public void setSetAsPrimaryBool(boolean setAsPrimaryBool)
    {
        this.setAsPrimaryBool = setAsPrimaryBool;
    }

    /**
     * @return the company
     */
    public String getCompany()
    {
        return company;
    }

    /**
     * @param company
     *            the company to set
     */
    public void setCompany(String company)
    {
        this.company = company;
    }

    /**
     * @return the streetAddress
     */
    public String getStreetAddress()
    {
        return streetAddress;
    }

    /**
     * @param streetAddress
     *            the streetAddress to set
     */
    public void setStreetAddress(String streetAddress)
    {
        this.streetAddress = streetAddress;
    }

    /**
     * @return the streetAddress1
     */
    public String getStreetAddress1()
    {
        return streetAddress1;
    }

    /**
     * @param streetAddress1
     *            the streetAddress1 to set
     */
    public void setStreetAddress1(String streetAddress1)
    {
        this.streetAddress1 = streetAddress1;
    }

    /**
     * @return the suburb
     */
    public String getSuburb()
    {
        return suburb;
    }

    /**
     * @param suburb
     *            the suburb to set
     */
    public void setSuburb(String suburb)
    {
        this.suburb = suburb;
    }

    /**
     * @return the postcode
     */
    public String getPostcode()
    {
        return postcode;
    }

    /**
     * @param postcode
     *            the postcode to set
     */
    public void setPostcode(String postcode)
    {
        this.postcode = postcode;
    }

    /**
     * @return the city
     */
    public String getCity()
    {
        return city;
    }

    /**
     * @param city
     *            the city to set
     */
    public void setCity(String city)
    {
        this.city = city;
    }

    /**
     * @return the state
     */
    public String getState()
    {
        return state;
    }

    /**
     * @param state
     *            the state to set
     */
    public void setState(String state)
    {
        this.state = state;
    }

    /**
     * @return the countryId
     */
    public int getCountryId()
    {
        return countryId;
    }

    /**
     * @param countryId
     *            the countryId to set
     */
    public void setCountryId(int countryId)
    {
        this.countryId = countryId;
    }

    /**
     * @return the zoneId
     */
    public int getZoneId()
    {
        return zoneId;
    }

    /**
     * @param zoneId
     *            the zoneId to set
     */
    public void setZoneId(int zoneId)
    {
        this.zoneId = zoneId;
    }

    /**
     * @return the countryChange
     */
    public int getCountryChange()
    {
        return countryChange;
    }

    /**
     * @param countryChange
     *            the countryChange to set
     */
    public void setCountryChange(int countryChange)
    {
        this.countryChange = countryChange;
    }

    /**
     * @return the telephoneNumber
     */
    public String getTelephoneNumber()
    {
        return telephoneNumber;
    }

    /**
     * @param telephoneNumber
     *            the telephoneNumber to set
     */
    public void setTelephoneNumber(String telephoneNumber)
    {
        this.telephoneNumber = telephoneNumber;
    }

    /**
     * @return the telephoneNumber1
     */
    public String getTelephoneNumber1()
    {
        return telephoneNumber1;
    }

    /**
     * @param telephoneNumber1
     *            the telephoneNumber1 to set
     */
    public void setTelephoneNumber1(String telephoneNumber1)
    {
        this.telephoneNumber1 = telephoneNumber1;
    }

    /**
     * @return the emailAddrOptional
     */
    public String getEmailAddrOptional()
    {
        return emailAddrOptional;
    }

    /**
     * @param emailAddrOptional
     *            the emailAddrOptional to set
     */
    public void setEmailAddrOptional(String emailAddrOptional)
    {
        this.emailAddrOptional = emailAddrOptional;
    }

    /**
     * @return the zoneArray
     */
    public ZoneIf[] getZoneArray()
    {
        return zoneArray;
    }

    /**
     * @param zoneArray
     *            the zoneArray to set
     */
    public void setZoneArray(ZoneIf[] zoneArray)
    {
        this.zoneArray = zoneArray;
    }

    /**
     * @return the addrId
     */
    public int getAddrId()
    {
        return addrId;
    }

    /**
     * @param addrId
     *            the addrId to set
     */
    public void setAddrId(int addrId)
    {
        this.addrId = addrId;
    }

    /**
     * @return the b2bCustId
     */
    public int getB2bCustId()
    {
        return b2bCustId;
    }

    /**
     * @param b2bCustId the b2bCustId to set
     */
    public void setB2bCustId(int b2bCustId)
    {
        this.b2bCustId = b2bCustId;
    }

}
