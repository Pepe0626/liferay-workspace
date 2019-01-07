package com.consistent.Portlet1.portlet;

import com.consistent.Portlet1.constants.Portlet1PortletKeys;

import com.liferay.portal.kernel.portlet.bridges.mvc.MVCPortlet;
import com.liferay.portal.kernel.servlet.HttpHeaders;
import com.liferay.portal.kernel.util.ParamUtil;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.Hashtable;
import java.util.Vector;

import javax.portlet.ActionRequest;
import javax.portlet.ActionResponse;
import javax.portlet.Portlet;
import javax.portlet.PortletException;
import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;
import javax.portlet.ResourceRequest;
import javax.portlet.ResourceResponse;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.osgi.service.component.annotations.Component;

/**
 * @author Pepe
 */
@Component(
	immediate = true,
	property = {
		"com.liferay.portlet.display-category=category.sample",
		"com.liferay.portlet.instanceable=true",
		"javax.portlet.init-param.template-path=/",
		"javax.portlet.init-param.view-template=/view.jsp",
		"javax.portlet.name=" + Portlet1PortletKeys.Portlet1,
		"javax.portlet.resource-bundle=content.Language",
		"javax.portlet.security-role-ref=power-user,user"
	},
	service = Portlet.class
)
public class Portlet1Portlet extends MVCPortlet {
	
	private static Vector<Hashtable<String, String>> facturas = new Vector<Hashtable<String, String>>();
	
	@Override
	public void serveResource(ResourceRequest resourceRequest, ResourceResponse resourceResponse) throws IOException, PortletException {
		
		resourceResponse.setContentType("application/csv");
		resourceResponse.addProperty(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=listado.csv");
		
		OutputStreamWriter osw = new OutputStreamWriter(resourceResponse.getPortletOutputStream());
		
		CSVPrinter printer = new CSVPrinter(
				osw,
				CSVFormat.DEFAULT.withHeader("num","cliente","importe"));
		
		for( Hashtable<String, String> f:facturas) {
			printer.printRecord(
					f.get("num"),
					f.get("cliente"),
					f.get("importe")
					);
		}
		printer.flush();
		printer.close();
		
		//super.serveResource(resourceRequest, resourceResponse);
	}
	
	public void altaFactura(ActionRequest actionRequest, ActionResponse actionResponse) throws IOException, PortletException {
		
		String num = ParamUtil.getString(actionRequest, "num", "");
		String cliente = ParamUtil.getString(actionRequest, "cliente", "");
		String importe = ParamUtil.getString(actionRequest, "importe", "");
		
		Hashtable<String, String> reg = new Hashtable<String, String>();
		reg.put("num", num);
		reg.put("cliente", cliente);
		reg.put("importe", importe);
		
		facturas.add(reg);
		
	}
	
	/* Método que hace la rendirización*/
	@Override
	public void render(RenderRequest renderRequest, RenderResponse renderResponse) throws IOException, PortletException {
		
		String jspPage = ParamUtil.getString(renderRequest, "jspPage", "");
		
		if(jspPage.equals("/lista.jsp")) {
			
			/*Vector<Hashtable<String, String>> facturas = new Vector<Hashtable<String, String>>();
			
			Hashtable<String, String> r1 = new Hashtable<String, String>(); 
			r1.put("num", "2018/01");
			r1.put("cliente", "IBM");
			r1.put("importe", "120,000");
			facturas.add(r1);
			
			r1 = new Hashtable<String, String>(); 
			r1.put("num", "2018/02");
			r1.put("cliente", "Google");
			r1.put("importe", "220,000");
			facturas.add(r1);
			
			r1 = new Hashtable<String, String>(); 
			r1.put("num", "2018/03");
			r1.put("cliente", "Netflix");
			r1.put("importe", "320,000");
			facturas.add(r1);*/
			
			renderRequest.setAttribute("facturas", facturas);
			
		}
		
		super.render(renderRequest, renderResponse);
	}
	
}