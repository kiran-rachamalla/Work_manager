sap.ui.define([
	"WM/Myapp/controller/BaseController",
],function(BaseController){
	"use strict"
	
	return BaseController.extend("WM.Myapp.controller.Instances.Instances",{
		onInit: function(){
			
			let oRouter = this.getRouter();
			oRouter.getRoute("WMInstances").attachMatched(this._onRouteMatched,this);
			
		},
		_onRouteMatched : function(oEvent){
			var oView,oArgs;
	    	
	    	oArgs = oEvent.getParameter("arguments");
	    	oView = this.getView();
	    	let lv_url = `http://contour.vistex.local:8000/z10102_testk?sap-client=040/wmInstances?query=`;
	    	for ( let abc in oArgs["?query"] ) 
	    	{ 
	    		lv_url = lv_url+abc +`=`+ oArgs["?query"][abc]+`&`;
	    	}
	    	this.getModel(lv_url,(data)=>{
	    		this.setDictonaries(data.getData()["DICTONARY"]);
				this.getView().setModel(data);	
//				this.setDictonaries(this.getView().getModel().getData()["DICTONARY"]);
			});		
	    	
		},
		
		onItemPressed: function(oEvent){
			
			var oItem, oCtx, oRouter;
			oItem = oEvent.getParameter("listItem");
			oCtx = oItem.getBindingContext();
			this.getRouter().navTo("wmInstancesOverview",{
				query : {
					WMNGR : oCtx.getProperty("WMNGR"),
					WRKID : oCtx.getProperty("WRKID")
				}
			});
			
		}
	});
});