sap.ui.define([ 
	"WM/Myapp/controller/BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"	
], function(BaseController,Filter,FilterOperator) {
	"use strict";

	return BaseController.extend("WM.Myapp.Controller", {
		onInit : function() {
			
			this.getModel("http://contour.vistex.local:8000/z10102_testk?sap-client=040/",(data)=>{
				this.getView().setModel(data);
				
//				var otabs = this.getView().byId("MetaData");
//				otabs.bindElement({ path : "/FCAT/"});
				
			});		
			
		},
		onItemPressed : function(oEvent) {
			
			var oItem, oCtx, oRouter;
			oItem = oEvent.getParameter("listItem");
			oCtx = oItem.getBindingContext();
			this.getRouter().navTo("WMInstances",{
				query : {
					WMNGR : oCtx.getProperty("WMNGR"),
					VLDFR : oCtx.getProperty("VLDFR"),
					VLDTO : oCtx.getProperty("VLDTO")
				}
			});
		},
		onFilterWorkManager : function(oEvent) {
			var aFilters, oFilter, oBinding;
			// first check if we already have this search value
			
			let sSearchQuery = oEvent.getSource().getValue();
			if (this._sSearchQuery === sSearchQuery) {
				return;
			}
			this._sSearchQuery = sSearchQuery;
			this.byId("searchField").setValue(sSearchQuery);
			// add filters for search
			aFilters = [];
			if (sSearchQuery && sSearchQuery.length > 0) {
				aFilters.push(new Filter("WMNGR", FilterOperator.Contains, sSearchQuery));
				aFilters.push(new Filter("DESCR", FilterOperator.Contains, sSearchQuery));
				oFilter = new Filter({ filters: aFilters, and: false });  // OR filter
			} else {
				oFilter = null;
			}
			// update list binding
			oBinding = this.byId("WorkManager").getBinding("items");
			if(oFilter){
			oBinding.filter(oFilter, "Application");
			}
		}
	});

});