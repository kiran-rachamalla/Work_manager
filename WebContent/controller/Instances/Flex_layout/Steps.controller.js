sap.ui.define([
	"WM/Myapp/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("WM.Myapp.controller.Instances.Flex_layout.Steps", {
		onInit: function () {
			this.bus = sap.ui.getCore().getEventBus();
			
		},
		onItemPressed: function(oEvent){
			let oItem, oCtx;
			oItem = oEvent.getParameter("listItem");
			oCtx = oItem.getBindingContext("Step_model");
			
			this.bus.publish("flexible", "setDetailPage",{ STEPN: oCtx.getProperty("STEPN") });
		}
	});
}, true);
