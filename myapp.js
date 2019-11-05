Wind.MainManage = function(container, config) {
	var initInfoMenu  = function () { 
		 
		//获取菜单信息
	};
	var InitSideBar = function(){
		 
	};
	return {
		currentModule: null,
		currentName: null, 
		Apps: null,
		msgList: {
			notice: null,
			message: null,
			task: null
		},
		init: function() {
			var cfg = config ? config : {};
			var myApp  = new  Wind.MainManage();
            myApp.barContent(cfg,myApp);
            myApp.warn(cfg,myApp);
			this.loadModule("s_overview");
            $('#s_overview').unbind()
            $('#s_overview').bind('click', { handle: this}, function (e) { 
            // $(this).parent().addClass("open").siblings("li").removeClass("open"); 
            // $(this).children('.arrow').addClass("open");
            // $(this).parent().siblings("li").find('.arrow').removeClass("open"); 
            e.data.handle.loadModule("s_overview");
            });
            // 监控
            $('#m_center').unbind()
			$('#m_center').bind('click', { handle: this}, function (e) { 
			// $(this).parent().addClass("open").siblings("li").removeClass("open"); 
   //          $(this).children('.arrow').addClass("open");
   //          $(this).parent().siblings("li").find('.arrow').removeClass("open");
            e.data.handle.loadModule("m_center");
            });
            // 地图
            $('#l_map').unbind()
			$('#l_map').bind('click', { handle: this}, function (e) { 
			// $(this).parent().parent().addClass("active open").siblings("li").removeClass("active open"); 
            e.data.handle.loadModule("l_map");
            });
            // 报警
            $('#f_warning').unbind()
			$('#f_warning').bind('click', { handle: this}, function (e) { 
			// $(this).parent().addClass("open").siblings("li").removeClass("open"); 
   //          $(this).children('.arrow').addClass("open");
   //          $(this).parent().siblings("li").find('.arrow').removeClass("open");
            e.data.handle.loadModule("f_warning");
            });
            // 统计
            $('#s_analysis').unbind()
			$('#s_analysis').bind('click', { handle: this}, function (e) { 
			// $(this).parent().addClass("open").siblings("li").removeClass("open"); 
   //          $(this).children('.arrow').addClass("open");
   //          $(this).parent().siblings("li").find('.arrow').removeClass("open");  
            e.data.handle.loadModule("s_analysis");
            });
            // 历史
            $('#s_analyhis').unbind()
            $('#s_analyhis').bind('click', { handle: this}, function (e) { 
            // $(this).parent().addClass("active open").siblings("li").removeClass("active open");  
            e.data.handle.loadModule("s_analyhis");
            });
            // 报表
            $('#r_services').unbind()
			$('#r_services').bind('click', { handle: this}, function (e) { 
			// $(this).parent().addClass("active open").siblings("li").removeClass("active open");  
            e.data.handle.loadModule("r_services");
            });   
            // 网关
            $('#r_gateway').unbind()
            $('#r_gateway').bind('click', { handle: this}, function (e) { 
            // $(this).parent().addClass("active open").siblings("li").removeClass("active open");  
            e.data.handle.loadModule("r_gateway");
            });
            // 运维
            $('#r_Equipment').unbind()
            $('#r_Equipment').bind('click', { handle: this}, function (e) { 
            // $(this).parent().addClass("active open").siblings("li").removeClass("active open");  
            e.data.handle.loadModule("r_Equipment");
            });
		},
		barContent:function(config,myApp){         	
            var html='    <li class="nav-item" >'
                +'        <a href="javascript:;" class="nav-link nav-toggle" id="s_overview" style="display:none;">'
                +'            <img src="./images/side/aview.png">'
                +'            <span class="title">&nbsp资产录入</span>'
                +'            <span class="arrow"></span>'
                +'        </a>'
                +'        <ul class="sub-menu" id="aview_jstree" style="margin:0;color:#fff;max-height:300px;overflow:auto;">'
                // +'            <li class="nav-item map_1">'
                // +'                <a class="nav-link ">'
                // +'                    <span class="title">园区地图</span>'
                // +'                </a>'
                // +'            </li>'
                // +'            <li class="nav-item map_2">'
                // +'                <a class="nav-link ">'
                // +'                    <span class="title">百度地图</span>'
                // +'                </a>'
                // +'            </li>'
                +'        </ul>'
                +'    </li>'
                +'    <li class="nav-item " >'
                +'        <a href="javascript:;" class="nav-link nav-toggle" id="m_center" style="display:none;">'
                +'            <img src="./images/side/cjsj.png">'
                +'            <span class="title">&nbsp资产维护</span>'
                +'            <span class="arrow"></span>'
                +'        </a>'
                +'        <ul class="sub-menu " id="monitor_jstree"  style="margin:0;color:#fff;max-height:300px;overflow:auto;">'                              
                +'        </ul>'
                +'    </li>'
                // +'    <li class="nav-item" >'
                // +'        <a href="javascript:;" class="nav-link nav-toggle" id="l_map">'
                // +'            <img src="./images/side/dt.png">'
                // +'            <span class="title">&nbsp智慧地图</span>'
                // +'            <span class="arrow"></span>'
                // +'        </a>'
                // +'        <ul class="sub-menu" style="margin:0;color:#fff;">'
                // // +'            <li class="nav-item map_1">'
                // // +'                <a class="nav-link ">'
                // // +'                    <span class="title">园区地图</span>'
                // // +'                </a>'
                // // +'            </li>'
                // +'            <li class="nav-item map_2">'
                // +'                <a class="nav-link ">'
                // +'                    <span class="title">百度地图</span>'
                // +'                </a>'
                // +'            </li>'
                // +'        </ul>'
                // +'    </li>'
               
                // +'    <li class="nav-item" >'
                // +'        <a href="javascript:;" class="nav-link nav-toggle" id="s_analysis" style="display:none;">'
                // +'            <img src="./images/side/analyse.png">'
                // +'            <span class="title">&nbsp资产统计</span>'
                // +'            <span class="arrow"></span>'
                // +'        </a>'
                // +'        <ul class="sub-menu "  style="margin:0;color:#fff;">'                              
                // +'        </ul>'
                // // +'        <ul class="sub-menu " id="analyse_jstree" style="color:#fff;">'                              
                // // +'        </ul>'
                // +'    </li>'
                 +'    <li class="nav-item" >'
                +'        <a href="javascript:;" class="nav-link nav-toggle" id="f_warning" style="display:none;">'
                +'            <img src="./images/side/cq.png">'
                +'            <span class="title">&nbsp资产报表</span>'
                +'            <span class="arrow"></span>'
                +'        </a>'
                +'        <ul class="sub-menu " id="report_jstree"  style="margin:0;color:#fff;max-height:300px;overflow:auto;">'                              
                +'        </ul>'
                +'    </li>'
                  +'    <li class="nav-item" >'
                +'        <a href="javascript:;" class="nav-link nav-toggle" id="r_Equipment" style="display:none;">'
                +'            <img src="./images/side/jk.png">'
                +'            <span class="title">&nbsp资产建模</span>'
                +'            <span class="arrow"></span>'
                +'        </a>'
                +'        <ul class="sub-menu" id="" style="color:#fff;">'
                +'            <li class="nav-item Equipment_1">'
                +'                <a class="nav-link ">'
                +'                    <span class="title">模板分类</span>'
                +'                </a>'
                +'            </li>'
                +'            <li class="nav-item Equipment_2">'
                +'                <a class="nav-link ">'
                +'                    <span class="title">资产建树</span>'
                +'                </a>'
                +'            </li>'
                +'            <li class="nav-item Equipment_3">'
                +'                <a class="nav-link ">'
                +'                    <span class="title">录入模板</span>'
                +'                </a>'
                +'            </li>'
                +'            <li class="nav-item Equipment_4">'
                +'                <a class="nav-link ">'
                +'                    <span class="title">维护模板</span>'
                +'                </a>'
                +'            </li>'
                +'        </ul>'
                +'    </li>';
            $("#secondFrame").html(html);
            // console.log(Wind.config.user.fullname)
            $('#userName').text(Wind.config.user.fullname)
            $.ajax({
                type: "get",
                url: "/api/wind/getUserMenu.js",
                async:false,
                data: {ProjectID:Wind.config.actitem,UserID:sessionStorage.getItem('UserID')},
                dataType: "json",
                success: function(result){
                    if(result.state.return=="true"){  
                        // console.log(result)
                        if(result.data!= null){
                            for(var j=0;j<result.data.MValues.length;j++){
                                $("#"+result.data.MValues[j].id).css('display','block');
                            }
                        }
                        
                       
                    }
                }
            });
        },
        warn:function(config,myApp){
            $.get('/api/wind/getDeviceTree.js',{ProjectID:Wind.config.actitem},function(rt){
                var d=[];
                for(var i=0;i<rt.data.length;i++){
                    if(rt.data[i].parent!='#'){
                        if((rt.data[i].data.title).indexOf("YZ")!=-1){
                            d.push(rt.data[i]);
                        }
                    }
                }
                var warnData=[];
                for(var j=0;j<d.length;j++){
                    $.get('/api/apply/getalarmdata.js',{devid:d[j].data.title},function(realdata){
                        if(realdata.state.return=='true'){
                            for(var i=0;i<realdata.data.length;i++){
                                warnData.push(realdata.data[i]);
                            }
                            if(warnData.length>0){
                                $('#warnData').html(warnData.length); 
                                $('#warnContent').html('您有'+warnData.length+'条报警信息');              
                            }else{
                                $('#warnData').html(''); 
                                $('#warnContent').html('当前无报警');  
                            }
                        }
                    });
                } 
            });
        },   
		loadModule: function (module,options) {
			//不同模块的加载流程
			if(this.currentModule!=null)
			{
				this.currentModule.hide(0);
				this.currentModule.clear();
			}			 
			//
			//$('.page-sidebar-menu  page-header-fixed .nav-item').removeClass(" active open");
			//$('.page-container .sub-menu li').removeClass("active");
			switch(module)
			{   case "s_overview":
				{   
					this.currentModule=new Wind.Aview("mainFrame",options);
					this.currentModule.init();
					this.currentModule.show();
					this.currentName=module;
				}
				break;
				case "m_center":
				{   
					this.currentModule=new Wind.Monitor("mainFrame",options);
					this.currentModule.init();
					this.currentModule.show();
					this.currentName=module;
				}
				break;
				case "l_map":
				{  
					this.currentModule=new Wind.Map("mainFrame",options);
					this.currentModule.init();
					this.currentModule.show();
					this.currentName=module;
				}
				break;
				case "f_warning":
				{   
					this.currentModule=new Wind.Warning("mainFrame",options);
					this.currentModule.init();
					this.currentModule.show();
					this.currentName=module;
				}
					break;
				case "s_analysis":
				{   
					this.currentModule=new Wind.Analyse("mainFrame",options);
					this.currentModule.init();
					this.currentModule.show();
					this.currentName=module;
				}
					break;
                case "s_analyhis":
                {   
                    this.currentModule=new Wind.Analyhis("mainFrame",options);
                    this.currentModule.init();
                    this.currentModule.show();
                    this.currentName=module;
                }
                    break;
				 case "r_services":
				{   
					this.currentModule=new Wind.Report("mainFrame",options);
					this.currentModule.init();
					this.currentModule.show();
					this.currentName=module;
				}
					break;
                case "r_gateway":
                {   
                    this.currentModule=new Wind.Gateway("mainFrame",options);
                    this.currentModule.init();
                    this.currentModule.show();
                    this.currentName=module;
                }
                    break;
                case "r_Equipment":
                {   
                    this.currentModule=new Wind.Equipment("mainFrame",options);
                    this.currentModule.init();
                    this.currentModule.show();
                    this.currentName=module;
                }
                    break;
				default:
				{
					alert("功能模块未定义，开发中...");
					this.currentModule=null;
					this.currentName=module;
				}
			}

			
		},
		loadMenu: function(cfg) { 
			 
		},
		onsize: function() {

		},
		about: function() {

		},

        show: function (speed) {
            $('#' + this.container).fadeIn(speed);
        },

        hide: function (speed) {
            $('#' + this.container).fadeOut(speed);
        }

	};
};