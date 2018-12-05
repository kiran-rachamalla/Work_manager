sap.ui.define([
	"WM/Myapp/controller/BaseController"
], function (BaseController){
	"use strict";

	return BaseController.extend("WM.Myapp.controller.Instances.Flex_layout.StepInstances", {
		onInit: function () {
			this.bus = sap.ui.getCore().getEventBus();
			let selected_step = this.getSelectedInstanceStep( );
			let selected_contr = this.selected_instance_contr( );
			
			this.bus.subscribe("flexible", "setDetailDetailPage", this.setDetailDetailPage, this);
			this._oView = this.getView();

		    // ... any other init stuff ...

		    this._oView.attachAfterRendering(function() {
		        var sValue1 = selected_contr;

		        var sPath = 'STEPN';
		        var sOperator = 'EQ';

		        var oBinding = this.byId("Step_Instances").getBinding("items");
		        oBinding.filter([new sap.ui.model.Filter( sPath, sOperator, sValue1[sPath]),
		        				 new sap.ui.model.Filter( 'CONTR', sOperator, sValue1['CONTR'])]);
		    });
		},
		onItemPressed: function (oEvent) {
			
			var oItem, oCtx, oRouter;
			oItem = oEvent.getParameter("listItem");
			oCtx = oItem.getBindingContext("Step_model");
			this.bus.publish("flexible1", "setDetailPage1",{ WRKID : oCtx.getProperty("WRKID"),
															 STEPN : oCtx.getProperty("STEPN"),
															 CONTR : oCtx.getProperty("CONTR"),
															 JOBNR : oCtx.getProperty("JOBNR") });			
		},
		setDetailDetailPage: function ( sChannel,sEvent,oData) {
			let oList = this.byId("Step_Instances");
			let oBinding = oList.getBinding("items");
	        var sPath = Object.keys(oData)[0];
	        var sOperator = 'EQ';
			oBinding.filter([new sap.ui.model.Filter( sPath, sOperator, oData[sPath])]);
		},		
		onExit: function () {
			this.bus.unsubscribe("flexible", "setDetailDetailPage", this.setDetailDetailPage, this);
		}
	});
});