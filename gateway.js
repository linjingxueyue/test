
Wind.Gateway = function(container, config) { 
    var initChartover1 = function() {
         
    };
    var initTableOver1 = function () { 
 
    };
    return {
        init: function() {
            // this.container = container;
            var cfg = config ? config : {};
            var myApp  = new  Wind.Gateway();
            myApp.loadInfo(config,myApp);
        },
        loadInfo: function(config,myApp) {
           $('#mainFrame').empty(); 
            $('#mainFrame').css('background','white')
            var mytools=' <div class="page-bar" style="background-color:#fff;margin-left:-14px;">'
                +'              <ul class="page-breadcrumb">'
                +'                  <li>'
                +'                      <a href="#" >氢枫能源</a>&nbsp;'
                +'                      <span>/</span>&nbsp;'
                +'                  </li>'
                +'                  <li>'
                +'                      <span>网关管理</span>&nbsp;'
                +'                  </li>'
                +'                  <li id="page_breadcrumb">'
                +'                  </li>'      
                +'              </ul> '
                +'          </div>  '  ; 
            var header ='<div class="row" id="portlet_tab1" style="position:relative">'
                // +'       <div class="meter col-lg-12 col-md-12 col-sm-12 col-xs-12">'
                // +'           <div class="row" style="height: 40px; background-color:#f1f4f7;width:104%;position:relative;margin-left:-20px;z-index:100;margin-top:-2px;">'
                // +'               <ul class="nav nav-pills">' 
                // +'                   <li  class="active"><a href="#portlet_tab1" id="board" data-toggle="tab">实时看板</a></li>'
                // +'                   <li id="monitor" style="display:none;"><a href="#portlet_tab2" data-toggle="tab">工艺流程图</a></li>'
                // // +'                <li id="classify" style="display:none;"><a href="#portlet_tab3" data-toggle="tab">固定储氢瓶组</a></li>'
                // // +'                <li id="classify1" style="display:none;"><a href="#portlet_tab4" data-toggle="tab">氢压机系统</a></li>'
                // +'               </ul>'
                // +'       </div>'
                // +'           <div class="tab-content">'
                // +'            <div class="tab-pane active" id="portlet_tab1" style="width:100%;"> </div>'
                // +'            <div class="tab-pane" id="portlet_tab2" style="width:100%;margin-left:-16px;"> </div>'
                // // +'            <div class="tab-pane" id="portlet_tab3" style="width:100%;margin-left:-16px;"> </div>'
                // // +'            <div class="tab-pane" id="portlet_tab4" style="width:100%;margin-left:-16px;"> </div>'
                // +'          </div>'
                // +'       </div>'
                +'</div>';
            $('#mainFrame').html(mytools+header);
            myApp.realBoard(config,myApp);

        },
        realdata:function(myApp,config,d){
            $.get("/api/wind/getDevTemplet.js",{ProjectID:Wind.config.actitem},function(data){
                var rdDataName=data.data.info[1].Values;
                            // console.log(data)

                // 设备
                var elec_data='';
                for(var i=0;i<d.length;i++){
                    if(d[i].parent!='#'){
                        // console.log(d[i])
                        $.get("/api/apply/realdata",{dev:[{devid: d[i].data.title}]},function (rd) {
                            var rdDataInfo=rd.data.dev[0].datas;
                            // console.log(rd)
                            // console.log(d[i])
                            var t_name;
                            for(var q=0;q<d.length;q++){
                                if(rd.data.dev[0].devid == d[q].data.title){
                                    t_name = d[q].text;
                                }
                            }
                            var online = rd.data.dev[0].online;
                            var bmqq;
                            if(rd.data.dev[0].devid == 'qfny-yh-001'){
                                bmqq = 'N201812280016'
                            }else if(rd.data.dev[0].devid == 'qfny-yh-002'){
                                bmqq = 'N201812280019'
                            }else{
                                bmqq = 'N201812280022'
                            }
                            // var 
                            // 在线
                            if(online == 1){
                                // if()
                                elec_data+='<div class="row" style="background:white">'
                                +'      <div class="col-md-2 " style="font-size:15px;text-align:center;width:13%;padding-right:0;">'
                                +'              <img src="./images/device/online.png" style="line-height:150px;margin-top:40px;">'
                                +'              <p>'+t_name+'</p>'
                                +'      </div>'
                                +'      <div class="col-md-2 " style="height:100px;font-size:12px;margin-top:25px;width:20%;">'
                                +'          <table>'
                                +'              <tr>'
                                +'                  <td >'
                                +'                      <div style="height:50px;line-height:50px">产品型号</div>'
                                +'                  </td>'
                                +'                  <td style="width:20px;text-align:center;">'
                                +'                      <span>:</span>'
                                +'                  </td>'
                                +'                  <td style="width:60px;">'
                                +'                      <span style="color:#EF7B00">yh.net_V1</span>'
                                +'                  </td>'
                                +'                  <td>'
                                +'                      <span></span>'
                                +'                  </td>'
                                +'              </tr>'
                                +'              <tr>'
                                +'                  <td >'
                                +'                      <div style="height:50px;line-height:50px">网关编码</div>'
                                +'                  </td>'
                                +'                  <td style="width:20px;text-align:center;">'
                                +'                      <span>:</span>'
                                +'                  </td>'
                                +'                  <td>'
                                +'                      <span style="color:#EF7B00">'+bmqq+'</span>'
                                +'                  </td>'
                                +'                  <td>'
                                +'                      <span></span>'
                                +'                  </td>'
                                +'              </tr>'
                                +'          </table>'
                                +'      </div>'
                                +'      <div class="col-md-3 " style="height:100px;font-size:12px;margin-top:25px;width:23%;">'
                                +'          <table>'
                                +'              <tr>'
                                +'                  <td >'
                                +'                      <div style="height:50px;line-height:50px">安装位置</div>'
                                +'                  </td>'
                                +'                  <td style="width:20px;text-align:center;">'
                                +'                      <span>:</span>'
                                +'                  </td>'
                                +'                  <td style="">'
                                +'                      <span style="color:#EF7B00">'+t_name+'</span>'
                                +'                  </td>'
                                +'                  <td>'
                                +'                      <span></span>'
                                +'                  </td>'
                                +'              </tr>'
                                +'              <tr>'
                                +'                  <td >'
                                +'                      <div style="height:50px;line-height:50px">安装时间</div>'
                                +'                  </td>'
                                +'                  <td style="width:20px;text-align:center;">'
                                +'                      <span>:</span>'
                                +'                  </td>'
                                +'                  <td style="">'
                                +'                      <span style="color:#EF7B00">2018年11月1日</span>'
                                +'                  </td>'
                                +'                  <td>'
                                +'                      <span></span>'
                                +'                  </td>'
                                +'              </tr>'
                                +'          </table>'
                                +'      </div>'
                                +'      <div class="col-md-3 " style="height:100px;font-size:12px;margin-top:25px;width:27%;">'
                                +'          <table>'
                                +'              <tr>'
                                +'                  <td >'
                                +'                      <div style="height:50px;line-height:50px;">在线时长</div>'
                                +'                  </td>'
                                +'                  <td style="width:20px;text-align:center;">'
                                +'                      <span>:</span>'
                                +'                  </td>'
                                +'                  <td style="width:60px;">'
                                +'                      <span style="color:#EF7B00">84</span>'
                                +'                  </td>'
                                +'                  <td>'
                                +'                      <span>天</span>'
                                +'                  </td>'
                                +'              </tr>'
                                +'              <tr>'
                                +'                  <td >'
                                +'                      <div style="height:50px;line-height:50px;">离线时长</div>'
                                +'                  </td>'
                                +'                  <td style="width:20px;text-align:center;">'
                                +'                      <span>:</span>'
                                +'                  </td>'
                                +'                  <td style="width:60px;">'
                                +'                      <span style="color:#EF7B00">3</span>'
                                +'                  </td>'
                                +'                  <td>'
                                +'                      <span>天</span>'
                                +'                  </td>'
                                +'              </tr>'
                                +'          </table>'
                                +'      </div>'                     
                                +'      <div class="col-md-2 " style="height:150px;font-size:17px;text-align:center;">'
                                +'          <div style="width:100px;height:40px;background:#38B54B;color:white;line-height:40px;margin-top:55px; border-radius:10px !important">在线</div>'
                                +'      </div>'
                                +'  </div>'
                            $('.elec_data').html(elec_data);
                            }
                            // 离线
                            if(online ==0){
                                elec_data+='<div class="row" style="background:white">'
                                +'      <div class="col-md-2 " style="font-size:15px;text-align:center;width:13%;padding-right:0;">'
                                +'              <img src="./images/device/offline.png" style="line-height:150px;margin-top:40px;">'
                                +'              <p>'+t_name+'</p>'
                                +'      </div>'
                                +'      <div class="col-md-2 " style="height:100px;font-size:12px;margin-top:25px;width:20%;">'
                                +'          <table>'
                                +'              <tr>'
                                +'                  <td >'
                                +'                      <div style="height:50px;line-height:50px">产品型号</div>'
                                +'                  </td>'
                                +'                  <td style="width:20px;text-align:center;">'
                                +'                      <span>:</span>'
                                +'                  </td>'
                                +'                  <td style="width:60px;">'
                                +'                      <span style="color:#EF7B00">yh.net_V1</span>'
                                +'                  </td>'
                                +'                  <td>'
                                +'                      <span></span>'
                                +'                  </td>'
                                +'              </tr>'
                                +'              <tr>'
                                +'                  <td >'
                                +'                      <div style="height:50px;line-height:50px">网关编码</div>'
                                +'                  </td>'
                                +'                  <td style="width:20px;text-align:center;">'
                                +'                      <span>:</span>'
                                +'                  </td>'
                                +'                  <td>'
                                +'                      <span style="color:#EF7B00">'+bmqq+'</span>'
                                +'                  </td>'
                                +'                  <td>'
                                +'                      <span></span>'
                                +'                  </td>'
                                +'              </tr>'
                                +'          </table>'
                                +'      </div>'
                                +'      <div class="col-md-3 " style="height:100px;font-size:12px;margin-top:25px;width:23%;">'
                                +'          <table>'
                                +'              <tr>'
                                +'                  <td >'
                                +'                      <div style="height:50px;line-height:50px">安装位置</div>'
                                +'                  </td>'
                                +'                  <td style="width:20px;text-align:center;">'
                                +'                      <span>:</span>'
                                +'                  </td>'
                                +'                  <td style="">'
                                +'                      <span style="color:#EF7B00">'+t_name+'</span>'
                                +'                  </td>'
                                +'                  <td>'
                                +'                      <span></span>'
                                +'                  </td>'
                                +'              </tr>'
                                +'              <tr>'
                                +'                  <td >'
                                +'                      <div style="height:50px;line-height:50px">安装时间</div>'
                                +'                  </td>'
                                +'                  <td style="width:20px;text-align:center;">'
                                +'                      <span>:</span>'
                                +'                  </td>'
                                +'                  <td style="">'
                                +'                      <span style="color:#EF7B00">2018年11月1日</span>'
                                +'                  </td>'
                                +'                  <td>'
                                +'                      <span></span>'
                                +'                  </td>'
                                +'              </tr>'
                                +'          </table>'
                                +'      </div>'
                                +'      <div class="col-md-3 " style="height:100px;font-size:12px;margin-top:25px;width:27%;">'
                                +'          <table>'
                                +'              <tr>'
                                +'                  <td >'
                                +'                      <div style="height:50px;line-height:50px;">在线时长</div>'
                                +'                  </td>'
                                +'                  <td style="width:20px;text-align:center;">'
                                +'                      <span>:</span>'
                                +'                  </td>'
                                +'                  <td style="width:60px;">'
                                +'                      <span style="color:#EF7B00">84</span>'
                                +'                  </td>'
                                +'                  <td>'
                                +'                      <span>天</span>'
                                +'                  </td>'
                                +'              </tr>'
                                +'              <tr>'
                                +'                  <td >'
                                +'                      <div style="height:50px;line-height:50px;">离线时长</div>'
                                +'                  </td>'
                                +'                  <td style="width:20px;text-align:center;">'
                                +'                      <span>:</span>'
                                +'                  </td>'
                                +'                  <td style="width:60px;">'
                                +'                      <span style="color:#EF7B00">3</span>'
                                +'                  </td>'
                                +'                  <td>'
                                +'                      <span>天</span>'
                                +'                  </td>'
                                +'              </tr>'
                                +'          </table>'
                                +'      </div>'                     
                                +'      <div class="col-md-2 " style="height:150px;font-size:17px;text-align:center;">'
                                +'          <div style="width:100px;height:40px;background:#666666;color:white;line-height:40px;margin-top:55px; border-radius:10px !important">离线</div>'
                                +'      </div>'
                                +'  </div>'
                            $('.elec_data').html(elec_data);
                            }
                            $('.elec_data div.row:gt(0)').css({'margin-top':'10px'});
                            $('.elec_data tr td:nth-child(1)').css({'text-align':'justify','text-align-last':'justify','text-justify':'inter-ideograph'});
                        });
                    }
                }
            });
        },
        realBoard:function(config,myApp){
            $.get("../api/wind/getDeviceTree.js?",{ProjectID:Wind.config.actitem},function(rt){
                if(rt.state.return=="true"){
                    var d = [];
                    for(var i=0;i<rt.data.length;i++){
                        if(rt.data[i].parent == '#'){
                            d.push(rt.data[i])
                        }
                    }
                    var datw = rt.data;
                    myApp.loadDevTree(myApp,config,d);
                    myApp.realdata(myApp,config,datw);
                }
            });
            $('#portlet_tab1').css({"background":"#F2F2F2"});
            var tab1 ='<div class="elec_data"></div>'   
            $('#portlet_tab1').html(tab1);
            
        },
        loadDevTree: function(myApp,config,d) {  //所有对树的操作必须在树加载完成后处理
            var core_data = { "core" : {    
                "check_callback" : true,               
                "data" : d
                },"plugins" : [
                'changed',"wholerow"  
                ]};
               $('#gateway_jstree').jstree("destroy");
               $('#gateway_jstree').jstree(core_data ).on("select_node.jstree", function (e,data) {
                   myApp.doSelectNode( myApp,config,data);
               });
        }, 
        doSelectNode:function(myApp,config,data){
            // 总节点
            if(data.node.parent =='#'){
                         // $('#board').css({'display':'block'});
             // $('#portlet_tab1').addClass('active');
             // $('#portlet_tab2').removeClass('active');
             // $('#monitor').css({'display':'none'});
             // $('#classify').css({'display':'none'});
             // $('#classify1').css({'display':'none'});
             $('#page_breadcrumb').html('<span>/</span>&nbsp;<span>'+data.node.text+'</span>');
             $.get("../api/wind/getDeviceTree.js?",{ProjectID:Wind.config.actitem},function(rt){
                 if(rt.state.return=="true"){
                     var d=[];
                     for(var i=0;i<rt.data.length;i++){
                         if(rt.data[i].parent==data.node.id){
                             d.push(rt.data[i]);
                         }
                     }
                     myApp.realdata(myApp,config,d);
                 }
             });
             $('#portlet_tab1').css({"background":"#fff"});
             var html='<div class="elec_data"></div>'
             $('#portlet_tab1').html(html);        
            }
        },
        datepickers:function(cfg,myApp){
            var ComponentsDateTimePickers = function () {
                var handleDatePickers = function () {
            
                    if (jQuery().datepicker) {
                        $('.date-picker').datepicker({
                            rtl: App.isRTL(),
                            orientation: "right",
                            autoclose: true
                        });
                        //$('body').removeClass("modal-open"); // fix bug when inline picker is used in modal
                    }
            
                    /* Workaround to restrict daterange past date select: http://stackoverflow.com/questions/11933173/how-to-restrict-the-selectable-date-ranges-in-bootstrap-datepicker */
                
                    // Workaround to fix datepicker position on window scroll
                    $( document ).scroll(function(){
                        $('#form_modal2 .date-picker').datepicker('place'); //#modal is the id of the modal
                    });
                }
            
                return {
                    //main function to initiate the module
                    init: function () {
                        handleDatePickers();

                    }
                };
            
            }();
            
            if (App.isAngularJsApp() === false) { 
                jQuery(document).ready(function() {    
                    ComponentsDateTimePickers.init(); 
                });
            }   
        },
        loadModule: function (config) {
        },
        loadMenu: function() {
        },
        DrawCpuUsage: function (value) {
            
        },
        DrawMemUsage: function (value, total) {
           
        },
        DrawDiskUsage: function (value, total) {
            
        },
        OnLoadSystemInfo: function () {
            
        },
        onsize: function () {
            $('#'+this.container).find(".portlet-body .tabbable .tab-content").css({height:($(window).height()-115)});
        },
        show: function (speed) {
            $('#'+this.container).fadeIn(speed);
        },
        hide: function (speed) {
            $('#'+this.container).fadeOut(speed);
        },
        clear: function () {
            $('#'+this.container).empty();
        }
    };
};