sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"sap/ui/core/BusyIndicator"
],function(Controller,JSONModel, History, BusyIndicator){
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
					
					BusyIndicator.show(2);
					
						this._call_server(lv_url)
						.then((Employees)=>{
							 var oData = JSON.parse(Employees);
							 let oModel = new JSONModel(oData);
							 BusyIndicator.hide();
							 if(cb){
								 cb(oModel);
							 }
						 }).catch((err)=>{
							 alert(err)
							 BusyIndicator.hide();
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
				},
				determineStatus: function(instance_status){
					let X = dictonaries;
					if ( X != undefined ){
					let Y = X[X.findIndex( x => x.FIELD == "WISTAT" )]["VALUES"].findIndex( x => x.TEXT == instance_status );
					if ( Y != -1 ) return X[X.findIndex( x => x.FIELD == "WISTAT" )]["VALUES"][Y].VALUE
					else instance_status;
					}
					else return instance_status;
				}
		});
});