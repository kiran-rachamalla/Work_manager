sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History"
],function(Controller,JSONModel, History){
	"use strict";
	
	let selected_instance_step;
	let selected_instance_contr;
	let Current_work_manager;
	let dictonaries;
		return Controller.extend("WM.Myapp.controller.BaseContoller",{
		
			getRouter : function () {
				
				return sap.ui.core.UIComponent.getRouterFor(this);
			},
			
			_call_server(lv_url){			
				   return  new Promise ((resolve,reject)=>{
						$.ajax({url: lv_url,
							    success: function(result){
				            console.log("read data");
//				            oView.setModel(result);
				            if (result){return resolve(result);}
				            else{reject('No employees found')}
				        }});
					})
				},
				
				getModel : function(lv_url,cb){
							
						this._call_server(lv_url)
						.then((Employees)=>{
							 var oData = JSON.parse(Employees);
							 let oModel = new JSONModel(oData);
							 if(cb){
								 cb(oModel);
							 }
						 }).catch((err)=>{
							 alert(err)
						 });

					
				},
				
				setSelectedInstanceStep: function(selectedStep){
					selected_instance_step = selectedStep;
				},
				getSelectedInstanceStep: function( ){
					return selected_instance_step;
				},
				selected_instance_contr: function(selectedContr){
					if (selectedContr) selected_instance_contr = selectedContr;
					return selected_instance_contr;
				},
				setDictonaries:function(Dictonaries){
					dictonaries = Dictonaries;
				},
				getDictonaries: function(){
					return dictonaries;
				},
				setWorkManager: function(workmanager){
					Current_work_manager = workmanager;
				},
				getWorkManager: function(){
					return Current_work_manager;
				},
				onNavBack: function (oEvent) {
					var oHistory, sPreviousHash;
					oHistory = History.getInstance();
					sPreviousHash = oHistory.getPreviousHash();
					if (sPreviousHash !== undefined) {
						window.history.go(-1);
					} else {
						this.getRouter().navTo("appHome", {}, true /*no history*/);
					}
				}
		});
});