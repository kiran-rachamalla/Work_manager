sap.ui.define([
	"WM/Myapp/controller/BaseController",
	"sap/ui/model/json/JSONModel"
],function(BaseController, JSONModel){
	"use strict"
	
	var _aValidTabKeys = ["Metrics", "Messages", "Source", "Result", "Error"];
	let workmanager,
	    workid,
	    stepn,
	    contr,
	    jobnr,
	    _oArgs,
	    update_dictonaries;
	
	 return BaseController.extend("WM.Myapp.controller.Instances.Flex_layout.Executions",{
		 onInit: function () {
				var oRouter = this.getRouter();
				
				this.getView().setModel(new JSONModel(), "view");
				
				oRouter.getRoute("wmInstanceExecution").attachMatched(this._onRouteMatched, this);
			},
			_onRouteMatched : function (oEvent) {
				var oArgs, oView, oQuery;
				oArgs = oEvent.getParameter("arguments");
				
				oView = this.getView();
						    	
		    	let lv_url = `http://contour.vistex.local:8000/z10102_testk?sap-client=040/wmInstanceExecution?query=`;
		    	
		    	for ( let abc in oArgs["?query"] ) 
		    	{ 
		    		if (abc === 'JOBNR') {
		    			oArgs["?query"][abc] = decodeURIComponent(oArgs["?query"][abc]);
					}
		    		lv_url = lv_url+abc +`=`+ oArgs["?query"][abc]+`&`;
		    	}
		    	if ( ! this.getDictonaries() ){ lv_url  = lv_url+`DICT=X` ; update_dictonaries = 'X';} 
		    	
		    	_oArgs = oArgs["?query"];
		    	
				oQuery = oArgs["?query"];
				
				if (oQuery && _aValidTabKeys.indexOf(oQuery.TABKEY) > -1){
			    	this.getModel(lv_url,(data)=>{
						this.getView().setModel(data , "Executions");
						if (update_dictonaries === 'X') {
							if (this.getView().getModel("Executions").getData()["DICTONARY"]){
							this.setDictonaries(this.getView().getModel("Executions").getData()["DICTONARY"]);
							}
						}
			    	});
					oView.getModel("view").setProperty("/selectedTabKey", oQuery.TABKEY);
						this.getRouter().getTargets().display(oQuery.TABKEY + "Tab" );
				} else {
					// the default query param should be visible at all time
					this._callnavigation(_aValidTabKeys[0])
				}
			},
			onTabSelect : function (oEvent){
				var oCtx = this.getView().getBindingContext();
				this._callnavigation(oEvent.getParameter("selectedKey"));
			},
			_callnavigation:function(tab_key){
				this.getRouter().navTo("wmInstanceExecution",{
					query : {
						WMNGR : _oArgs.WMNGR,	
						WRKID : _oArgs.WRKID,
						STEPN : _oArgs.STEPN,
						CONTR : _oArgs.CONTR,
						JOBNR : encodeURIComponent(_oArgs.JOBNR),
						TABKEY : tab_key
					}
			},true);
		}
	 });
	
});