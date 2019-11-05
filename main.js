 
Wind={}; //myApp = 应用程序全局环境变量
//主程序入口
$(document).ready(function() { 
	//
	var result = 0;
	// var myApp = new  Wind.MainManage("mainFrame", result);
	// myApp.init();
	// myApp.show("normal");
	var rtppath = "../api/wind/getActUserInfo.js"; 
	 
	var rtpdata={};	
	//var sessionid = sessionStorage.getItem('sid');			
	//if(sessionid){
	//	rtpdata = {sid:sessionid};
	//}
	var hostport=document.location.host;
    Wind.rurl = 'http://'+hostport+':8090';
	 
	$.get(rtppath,rtpdata,function(result){   
		if(result.state.return=="true"){ 
			// debugger;
			Wind.config={user:{},project:[],actitem:0,actProjectName:''};
			//Wind.config = JSON.parse(result.data); 
			 
			Wind.config.user.name=result.data.user.name;
			Wind.config.user.id=result.data.user.id;
			Wind.config.user.fullname=result.data.user.fullname;
			Wind.config.project = result.data.project;
			Wind.config.actitem= result.data.actitem; 
			if(Wind.config.project){
				for(var i=0;i<Wind.config.project.length;i++){
					if(Wind.config.actitem==Wind.config.project[i].ProjectID){
						Wind.config.actProjectName = Wind.config.project[i].szProjectName;
						break;
					}
				}
			}else{
				window.location.href = '../index.html'
			}
			
			  
			var myApp = new  Wind.MainManage("mainFrame", result);
			myApp.init();
			myApp.show("normal"); 
		}
		else{
			alert('未获取到用户和工程基本信息')
		}
	});//get
});