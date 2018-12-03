sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/Device"
	
	],function(UIComponent,Device){
	"use strict";
	
	return UIComponent.extend( "WM.Myapp.Component",{
		metadata:{
			manifest: "json"
		},
		init:function(){
			UIComponent.prototype.init.apply(this,arguments);
			
            // create the views based on the url/hash
            this.getRouter().initialize();
			
		}
	});
	
});