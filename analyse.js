/**
 * Created by Administrator on 2014/9/6.
 增加系统入口页面，和平台系统入口配置、程序
 */
function getdate() {
    var now = new Date(),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
}
// 当前时间的0点
function getdatezero() {
    var now = new Date(),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d)+ " " + "0:0:0";
}
// 时间转换
function dataTime(n){
    var date=new Date(n);
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds(); 
    return Y+M+D+h+m+s;
}
var G_list = [];
Wind.Analyse = function(container, config) { 
    var initChartover1 = function() {
         
    };
	var initTableOver1 = function () { 
 
    };
    return {
        init: function() {
            // this.container = container;
            var cfg = config ? config : {};
            var myApp  = new  Wind.Analyse();
            myApp.loadInfo(cfg,myApp);                   

        },
        loadInfo: function(config,myApp) {
            $('#mainFrame').css('background','#F2F2F2')
            $("#mainFrame").empty();
            var sbase ='<div class="row" style="height:50px;line-height:50px;color:#9f9f9f;font-size:1em;margin:0;margin-top:-25px;">' + Wind.config.actProjectName + ' / 统计分析</div>'
                  +'<div class="portlet-body form" style="">'
                  +'  <form   id="baseauth_form" role="form" class="form-horizontal" style="height:100%;background:#ffffff;">'
                  +'      <div class="form-body"  style="height:100%;">'
                  +'          <div class="row"  style="height:60px;margin-top:-20px;">'
                  +'            <span style="font-size:2.1rem;font-weight:bold;margin-left:10px;line-height:60px;">统计分析</span>'
                  +'          </div>'
                  +'        <div class="info_wrap" style="width:100%;overflow-y:auto;overflow-x:hidden;margin:0">'
                  +'          <div class="" id="" style="width:100%;height:50%;">'
                  +'                      <div style="width:100%;height:15%;">'
                  +'                          <span style="font-size:1.5rem">月出勤情况环比</span>'
                  +'                          <span style="cursor:pointer;float:right;height:20px;color:#fff;border-radius:3px !important;background:#21B694;padding:0px 10px;">查询</span>'
                  +'                          <select style="float:right;height:20px;color:#000;border-radius:3px !important;background:#E3E3E3;width:100px;margin-right:10px;border:none;text-align:center;">'
                  +'                              <option>2019</option>'
                  +'                              <option>2018</option>'
                  +'                              <option>2017</option>'
                  +'                              <option>2016</option>'
                  +'                              <option>2015</option>'
                  +'                              <option>2014</option>'
                  +'                          </select>'
                  +'                          <span style="float:right;height:20px;color:#717171;margin-right:10px;">选择年份</span>'
                  +'                      </div>'
                  +'                      <div id="chart1" style="width:100%;height:80%;"></div>'
                  +'          </div>'
                  +'          <div class="" id="" style="width:100%;height:50%;">'
                  +'                      <div style="width:100%;height:15%;">'
                  +'                          <span style="font-size:1.5rem">年出勤情况同比</span>'
                  +'                          <span style="cursor:pointer;float:right;height:20px;color:#fff;border-radius:3px !important;background:#21B694;padding:0px 10px;">查询</span>'
                  +'                          <select style="float:right;height:20px;color:#000;border-radius:3px !important;background:#E3E3E3;width:100px;margin-right:10px;border:none;text-align:center;">'
                  +'                              <option>01</option>'
                  +'                              <option>02</option>'
                  +'                              <option>03</option>'
                  +'                              <option>04</option>'
                  +'                              <option>05</option>'
                  +'                              <option>06</option>'
                  +'                              <option>07</option>'
                  +'                              <option>08</option>'
                  +'                              <option>09</option>'
                  +'                              <option>10</option>'
                  +'                              <option>11</option>'
                  +'                              <option>12</option>'
                  +'                          </select>'
                  +'                          <span style="float:right;height:20px;color:#717171;margin-right:10px;">选择月份</span>'
                  +'                      </div>'
                  +'                      <div id="chart2" style="width:100%;height:80%;"></div>'
                  +'          </div>'
                  +'        </div>'
                  +'      </div>  '               
                  +'    </form>'
                  +'</div>';
                $('#mainFrame').empty(); 
                $('#mainFrame').html(sbase);
                var c = document.body.clientHeight;
                $('.form').css({'height': (c-110) +'px'})
                $('.info_wrap').css({'height': (c-180) +'px'})
                $.get("../api/wind/getDeviceTree.js?",{ProjectID:Wind.config.actitem},function(rt){
                  if(rt.state.return=="true"){
                        var d = [];
                        d = rt.data;
                        myApp.loadDevTree( myApp,config,d);
                  }
                });
                myApp.datepickers(config,myApp);
                setTimeout(function(){
                    var myChart2=echarts.init(document.getElementById('chart2'));
                    var myChart1=echarts.init(document.getElementById('chart1'));     
                    var option2 = {
                        tooltip : {
                            trigger: 'axis',
                        },
                        grid: {
                            top:'4%',
                            left: '3%',
                            right: '5%',
                            bottom: '5%',
                            containLabel: true
                        },
                        xAxis : [
                            {
                                type : 'category',
                                boundaryGap : false,
                                data : ['2014.01','2015.01','2016.01','2017.01','2018.01','2019.01'],
                                splitLine:{show: false},
                                axisLabel: {
                                    show: true,
                                    textStyle: {
                                        color: '#666666'
                                    }
                                },
                                axisLine:{
                                    lineStyle:{
                                        color:'#666666',
                                    }
                                }
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                splitLine:{show: false},
                                axisLabel: {
                                    show: true,
                                    textStyle: {
                                        color: '#666666'
                                    }
                                },
                                axisLine:{
                                    lineStyle:{
                                        color:'#666666',
                                    }
                                }
                            }
                        ],
                        backgroundColor:"#f8f8f8",
                        series : [
                            {
                                name:'出勤率',
                                type:'line',
                                stack: '总量',
                                symbolSize: 6,
                                areaStyle: {
                                     normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                           offset: 0,
                                           color: '#28d4c5'
                                       }, {
                                           offset: 1,
                                           color: '#f8f8f8'
                                       }])
                                   }
                                },
                                data:[92.8, 85.3, 88.6, 97.9, 93.6, 96.6],
                                // smooth: true,
                                itemStyle : {
                                    normal : {
                                        color: "#28d4c5",
                                        lineStyle:{
                                            color:'#28d4c5'
                                        }
                                    }
                                }
                            },
                            
                        ]
                    };
                    myChart2.setOption(option2);
                    var option1 = {
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        grid: {
                            top:'4%',
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis : [
                            {
                                type : 'category',
                                data : ['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月'],
                                splitLine:{show: false},
                                axisTick: {
                                    alignWithLabel: true
                                },
                                axisLabel: {
                                               interval:0,
                                               // rotate:40
                                }
                            }
                        ],
                        backgroundColor:"#f8f8f8",
                        yAxis : [
                            {
                                type : 'value',
                                splitLine:{show: false},

                            }
                        ],
                        series : [
                            {
                                name:'出勤率',
                                type:'bar',
                                data:[91.9, 96.1, 89.1, 87, 97, 99, 87,89,98,91,95,97],
                                itemStyle: {
                                    normal: {
                                        color: function(params) {
                                                // build a color map as your need.
                                            var colorList = ['#21B694','#FFCF41','#21B694','#FFCF41','#21B694','#FFCF41','#21B694','#FFCF41','#21B694','#FFCF41','#21B694','#FFCF41'];
                                            return colorList[params.dataIndex]
                                        },
                                    }
                                },
                            }
                        ]
                    };
                    myChart1.setOption(option1);     
                }, 100);  
        },
        loadDevTree: function(myApp,config,d) {  //所有对树的操作必须在树加载完成后处理
            var core_data = { "core" : {  
                     "check_callback" : true,
                        
                     "data" : d
                     },"plugins" : [
                        'changed',"wholerow"  
                     ]};
            // console.log(core_data)
            $('#analyse_jstree').jstree("destroy");
            $('#analyse_jstree').jstree(core_data )
            .on("changed.jstree", function (e, data) {
                  myApp.doSelectNode(config,myApp,data);
            });
             
        },
        doSelectNode:function(myApp,config,data){
            
        },
        loadModule: function (config) {
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