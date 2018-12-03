sap.ui.define([
	"WM/Myapp/controller/BaseController",
	"sap/m/MessageToast"
], function (BaseController, MessageToast) {
	"use strict";

	return BaseController.extend("WM.Myapp.controller.Instances.Flex_layout.StepInstances", {
		onInit: function () {
			this.bus = sap.ui.getCore().getEventBus();
			let selected_step = this.getSelectedInstanceStep( );
			this.bus.subscribe("flexible", "setDetailPage", this.setDetailPage, this);
			this._oView = this.getView();

		    // ... any other init stuff ...

		    this._oView.attachAfterRendering(function() {
		        var sValue1 = selected_step;

		        var sPath = 'STEPN';
		        var sOperator = 'EQ';

		        var oBinding = this.byId("Step_Instances").getBinding("items");
		        oBinding.filter([new sap.ui.model.Filter( sPath, sOperator, sValue1[sPath])]);
		    });
		},
		onItemPressed: function (oEvent) {
			MessageToast.show("Loading end column...");
			let oItem, oCtx;
			oItem = oEvent.getParameter("listItem");
			oCtx = oItem.getBindingContext("Step_model");
			
			this.bus.publish("flexible", "setDetailDetailPage",{ STEPN: oCtx.getProperty("STEPN"),
																 CONTR: oCtx.getProperty("CONTR") });
		},
		setDetailPage: function ( sChannel,sEvent,oData) {
			let oList = this.byId("Step_Instances");
			let oBinding = oList.getBinding("items");
	        var sPath = Object.keys(oData)[0];
	        var sOperator = 'EQ';
			oBinding.filter([new sap.ui.model.Filter( sPath, sOperator, oData[sPath])]);
		},
		determineStatus: function(instance_status){
			let X = this.getDictonaries();
			let Y = X[X.findIndex( x => x.FIELD == "WISTAT" )]["VALUES"].findIndex( x => x.TEXT == instance_status );
			return X[X.findIndex( x => x.FIELD == "WISTAT" )]["VALUES"][Y].VALUE;
		},
		onExit: function () {
			this.bus.unsubscribe("flexible", "setDetailPage", this.setDetailPage, this);
		}
	});
}, true);
