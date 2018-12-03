sap.ui.define([
	"WM/Myapp/controller/BaseController",
],function(BaseController){
	"use strict"
	
	return BaseController.extend("WM.Myapp.controller.Instances.InstanceOverviewWrapper",{
		onInit: function(){
			let oRouter = this.getRouter();
			oRouter.getRoute("wmInstancesOverview").attachMatched(this._onRouteMatched,this);
		},
		_onRouteMatched : function(oEvent){
			
			var oView,oArgs,update_dictonaries;
	    	
	    	oArgs = oEvent.getParameter("arguments");
	    	oView = this.getView();
	    	let lv_url = `http://contour.vistex.local:8000/z10102_testk?sap-client=040/wmInstances?query=`;
	    	for ( let abc in oArgs["?query"] ) 
	    	{ 
	    		lv_url = lv_url+abc +`=`+ oArgs["?query"][abc]+`&`;
	    	}
	    	if ( ! this.getDictonaries() ){ lv_url  = lv_url+`DICT=X` ; update_dictonaries = 'X';} 
	    	
	    	this.setWorkManager(oArgs["?query"]["WMNGR"]);
	    	
	    	this.getModel(lv_url,(data)=>{
				this.getView().setModel(data , "Step_model");
				if (update_dictonaries === 'X') {
					if (this.getView().getModel("Step_model").getData()["DICTONARY"]){
					this.setDictonaries(this.getView().getModel("Step_model").getData()["DICTONARY"]);
					}
				}
//				let fcat_data = this.getView().getModel("Step_model").getData()["FCAT"][0];
//				fcat_data = `{` + fcat_data + `}`.
//				debugger;
//				let oData = JSON.parse(fcat_data);
//				 let oModel = new JSONModel(oData);
//				 this.getView().setModel(oModel , "Step_model_fcat");
				this.bus = sap.ui.getCore().getEventBus();
				this.bus.subscribe("flexible1", "setDetailPage1", this.navigate, this);
			});		
		},
		navigate: function(sChannel,sEvent,oData){			
			this.getRouter().navTo("wmInstanceExecution",{
				query : {
					WMNGR : this.getWorkManager(),	
					WRKID : oData['WRKID'],
					STEPN : oData['STEPN'],
					CONTR : oData['CONTR'],
					JOBNR : encodeURIComponent(oData['JOBNR'])
				}
			});
			
		},
		onExit: function(){
			this.bus.unsubscribe("flexible1", "setDetailPage1", this.navigate, this);
		}
	});
});