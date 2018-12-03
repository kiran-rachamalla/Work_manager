sap.ui.define([
	"sap/m/SplitContainer",
	"sap/ui/Device",
	"WM/Myapp/controller/BaseController",
], function (SplitContainer, Device, BaseController) {
	"use strict";
		
	return BaseController.extend("WM.Myapp.controller.Instances.InstanceOverview", {
		onInit: function () {
			this.bus = sap.ui.getCore().getEventBus();
			this.bus.subscribe("flexible", "setDetailPage", this.setDetailPage, this);
			this.bus.subscribe("flexible", "setDetailDetailPage", this.setDetailDetailPage, this);

			this.oFlexibleColumnLayout = this.byId("fcl");
		},

		onExit: function () {
			this.bus.unsubscribe("flexible", "setDetailPage", this.setDetailPage, this);
			this.bus.unsubscribe("flexible", "setDetailDetailPage", this.setDetailDetailPage, this);
		},
		
		get_DetailPage_data: function(){
			return event_data;
		},
		
		// Lazy loader for the mid page - only on demand (when the user clicks)
		setDetailPage: function ( sChannel,sEvent,oData) {
			
			this.setSelectedInstanceStep( oData );
			
			if (!this.detailView) {
				this.detailView = sap.ui.view({
					id: "midView",
					viewName: "WM.Myapp.view.Instances.Flex_layout.StepInstances",
					type: "XML"
				});
			}
			this.oFlexibleColumnLayout.addMidColumnPage(this.detailView);
			this.oFlexibleColumnLayout.setLayout(sap.f.LayoutType.TwoColumnsBeginExpanded);
		},

		// Lazy loader for the end page - only on demand (when the user clicks)
		setDetailDetailPage: function ( sChannel,sEvent,oData) {
			
			this.selected_instance_contr( oData );
			
			if (!this.detailDetailView) {
				this.detailDetailView = sap.ui.view({
					id: "endView",
					viewName: "WM.Myapp.view.Instances.Flex_layout.StepInstance",
					type: "XML"
				});
			}

			this.oFlexibleColumnLayout.addEndColumnPage(this.detailDetailView);
			this.oFlexibleColumnLayout.setLayout(sap.f.LayoutType.ThreeColumnsMidExpanded);
		}

	});
}, true);
