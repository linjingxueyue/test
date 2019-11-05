/**
 * Created by Administrator on 2014/9/6.
 增加系统入口页面，和平台系统入口配置、程序
 */
// 每月多少天
function getMonthDates(year, month){
    var d = new Date(year, month, 0);
    return d.getDate();
}
function datepickers(){
    var ComponentsDateTimePickers = function () {
        var handleDatePickers = function () {
    
            if (jQuery().datepicker) {
                $('.date-picker').datepicker({
                    rtl: App.isRTL(),
                    orientation: "right",
                    autoclose: true
                });
                $(".form_meridian_datetime").datetimepicker({
                    isRTL: App.isRTL(),
                    format: "yyyy-mm-dd HH:ii p",
                    showMeridian: !0,
                    language: 'zh-cn',
                    autoclose: true,
                    pickerPosition: App.isRTL() ? "bottom-right": "bottom-left",
                    todayBtn: !0
                })
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
}
// function mGetDate(){
//      var date = new Date();
//      var year = date.getFullYear();
//      var month = date.getMonth()+1;
//      var d = new Date(year, month, 0);
//      return d.getDate();
// }
function mGetDate(year, month){
    var d = new Date(year, month, 0);
    return d.getDate();
}
//出勤统计表
function getcqtj(){
  var table ='<table class="table table-bordered" id="sample_2">'
          +'   <thead>'
          +'       <tr id="" style="">'
          +'             <td rowspan="2" style="vertical-align:text-top;">年份</td>'
          +'             <td rowspan="2" style="vertical-align:text-top;">月份</td>'
          +'             <td rowspan="2" style="vertical-align:text-top;">在册儿童数</td>'
          +'             <td rowspan="2" style="vertical-align:text-top;">应出勤日数</td>' 
          +'             <td colspan="3">出勤情况</td>'
          +'             <td colspan="5">缺勤原因分析</td>'
          +'       </tr>'
          +'       <tr id="" style="">'
          +'             <td style="vertical-align:text-top;">应出勤人次数</td>'
          +'             <td style="vertical-align:text-top;">实际出勤人次数</td>'
          +'             <td style="vertical-align:text-top;">出勤率</td>'
          +'             <td style="vertical-align:text-top;">缺勤人次数</td>'
          +'             <td style="vertical-align:text-top;">因病</td>'
          +'             <td style="vertical-align:text-top;">因事</td>'
          +'             <td style="vertical-align:text-top;">寒暑假</td>'
          +'             <td style="vertical-align:text-top;">其他</td>'
          +'       </tr>'
          +'   </thead>'
          +'   <tbody id="table-d" >'
          +'   </tbody>'
          +' </table>';
  $('.info_wrap').html(table);
  $('#cz_d').click(function(){
    return ExcellentExport.excel(this, 'sample_2', '出勤统计表')
  })
}
//多发病统计
function getdfb(){
  var apipath = "/api/wind/getCommTree"; 
  var urlData = {
                    CompanyID:sessionStorage.getItem('CompanyID'),
                    ProjectID:Wind.config.actitem,
                    Name:"健康树",
                    Tag:"Health"
              }; 
  $.get(apipath,urlData,function(result){ 
    if(result.state.return=="true"){ 
      var arr=[];
      for(var i=0;i<result.data.Data.length;i++){
            if(result.data.Data[i].id != '1562031527914' && result.data.Data[i].parent == '#'){
                  arr.push({'id':result.data.Data[i].id,'text':result.data.Data[i].text})
            }
      }
      var str2='';
      for(var i=0;i<arr.length;i++){
        var ind = 0;
        for(var j=0;j<result.data.Data.length;j++){
          if(arr[i].id == result.data.Data[j].parent){
            ind++;
            str2+='<td colspan="2">'+result.data.Data[j].text+'</td>'
          }
        }
        arr[i].ind = ind
      }
      // console.log(arr)
      var str1='';var str3='';
      for(var i=0;i<arr.length;i++){
        str1+='<td colspan="'+(2*arr[i].ind)+'">'+arr[i].text+'</td>';
        for(var j=0;j<arr[i].ind;j++){
          str3+='<td>人数</td>'
              +'<td>发病率%</td>'
        }
      }
      var table ='<table class="table table-bordered" id="sample_2">'
          +'   <thead>'
          +'       <tr id="" style="">'
          +'             <td rowspan="3" >年月</td>'
          +'             <td rowspan="3" >班级</td>'
          +'             <td rowspan="3" >总人数</td>'
          +str1
          // +'             <td rowspan="2" >应出勤日数</td>' 
          // +'             <td colspan="3">出勤情况</td>'
          // +'             <td colspan="5">缺勤原因分析</td>'
          +'       </tr>'
          +'       <tr id="" style="">'
          +str2
          +'       </tr>'
          +'       <tr id="" style="">'
          +str3
          +'       </tr>'
          +'   </thead>'
          +'   <tbody id="table-d" >'
          +'   </tbody>'
          +' </table>';
  $('.info_wrap').html(table);
    }
  })
  $('#cz_d').click(function(){
    return ExcellentExport.excel(this, 'sample_2', '多发病统计')
  })
}
var monthday=getMonthDates(new Date().getFullYear(),new Date().getMonth()+1);
var G_list = [];
var templet = [];
var G_list1=[];
function getmonthfirstday() {
    var now = new Date(),
        y = now.getFullYear(),
        m = now.getMonth() + 1;
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + '01'+' '+'0:0:0' ;
}
Wind.Report = function(container, config) { 
    var initChartover1 = function() {
         
    };
    var initTableOver1 = function () { 
 
    };
    return {
        init: function() {
            // this.container = container;
            var cfg = config ? config : {};
            var myApp  = new  Wind.Report();
            myApp.loadInfo(config,myApp);
            // $('.report_1').unbind('click');
            // $('.report_1').bind('click',{handle: this},function(e){ 
            //     $(this).addClass("active open").siblings("li").removeClass("active open");
            //      e.data.handle.loadInfo(cfg,myApp);     
            // }); 
            // $('.report_2').unbind('click');
            // $('.report_2').bind('click',{handle: this},function(e){ 
            //     $(this).addClass("active open").siblings("li").removeClass("active open");
            //      e.data.handle.secInfo(cfg,myApp);     
            // }); 
            // $('.report_3').unbind('click');
            // $('.report_3').bind('click',{handle: this},function(e){ 
            //     $(this).addClass("active open").siblings("li").removeClass("active open");
            //      e.data.handle.triInfo(cfg,myApp);     
            // }); 
        },
        loadInfo: function(config,myApp) {
            $('#mainFrame').css('background','#F2F2F2')
            $("#mainFrame").empty();

            var sbase ='<div class="row" style="height:50px;line-height:50px;color:#9f9f9f;font-size:1em;margin:0;margin-top:-25px;">' + Wind.config.actProjectName + ' / 数据报表 </div>'
                  +'<div class="portlet-body form" style="">'
                  +'  <form   id="baseauth_form" role="form" class="form-horizontal" style="height:100%;background:#ffffff;">'
                  +'      <div class="form-body"  style="height:100%;">'
                  +'          <div class="row"  style="height:60px;margin-top:-20px;">'
                  +'            <span class="text1" style="font-size:2.1rem;font-weight:bold;margin-left:10px;line-height:60px;">出勤统计表</span>'
                    +'                   <div  style="float:right; margin-right:1.1em;position:relative;z-index:999;margin-top:15px;">'
                    +'                       <div class="btn-group" style="border-radius: 5px !important;">'
                    +'                              <a href="javascript:;"  id="cz_d" style="background:#21B694;color:#ffffff;width: 100px;border-radius: 5px !important;" class="btn btn-outline " >'
                    +'                                  <i class="fa fa-share"></i>'
                    +'                                      <span class="hidden-xs"> 导出 </span>'
                    +'                                  <i class="fa fa-angle-down"></i>'
                    +'                              </a>'
                    // +'                              <ul class="dropdown-menu pull-right" id="sample_2_tools">'
                    // +'                                  <li>'
                    // +'                                      <a href="javascript:;" data-action="0" class="tool-action">'
                    // +'                                           打印</a>'
                    // +'                                  </li>'  
                    // +'                                  <li>'
                    // +'                                      <a href="javascript:;" data-action="2" class="tool-action">'
                    // +'                                           PDF</a>'
                    // +'                                  </li>'
                    // +'                                  <li>'
                    // +'                                      <a href="javascript:;" data-action="3" class="tool-action">'
                    // +'                                           Excel</a>'
                    // +'                                  </li>'
                    // +'                                  <li>'
                    // +'                                      <a href="javascript:;" data-action="4" class="tool-action">'
                    // +'                                           CSV</a>'
                    // +'                                  </li>'
                    // +'                              </ul>'
                    +'                          </div>'
                    +'                      </div>'
                  +'            <span style="cursor:pointer;float:right;height:34px;color:#fff;border-radius:5px !important;background:#21B694;margin-top:13px;width:80px;line-height:34px;text-align:center;margin-right:50px;">查询</span>'
                  +'                      <div class="input-group input-medium date date-picker" data-date-format="yyyy-mm-dd" style="float:right;margin-top:13px;margin-right:20px;">'
                  +'                          <input id="e_war_start" style="background-color:#ffffff;" type="text" class="form-control" readonly>'
                  +'                          <span class="input-group-btn">'
                  +'                              <button style="background-color:#ffffff;" class="btn default" type="button">'
                  +'                                  <i class="fa fa-calendar"></i>'
                  +'                              </button>'
                  +'                          </span>'
                  +'                      </div>'
                  +'            <span style="font-size:1rem;margin-right:10px;line-height:60px;color:#848484;float:right">选择查看的日期:</span>'
                  +'            <select id="sel" style="width:180px;height:34px;float:right;margin-right:10px;margin-top:13px;">'
                  +'              <option>出勤统计表</option>'
                  +'              <option>多发病统计</option>'
                  // +'              <option>幼儿因病缺勤登记表</option>'
                  +'            </select>'
                  +'          </div>'
                  +'        <div class="info_wrap" style="width:100%;overflow-y:auto;overflow-x:hidden;margin:0">'
                  // +'<table class="table table-striped table-hover table-bordered" id="sample_2">'
                  // +'   <thead>'
                  // +'       <tr id="" style="">'
                  // +'             <td rowspan="2" style="vertical-align:text-top;">年份</td>'
                  // +'             <td rowspan="2" style="vertical-align:text-top;">月份</td>'
                  // +'             <td rowspan="2" style="vertical-align:text-top;">在册儿童数</td>'
                  // +'             <td rowspan="2" style="vertical-align:text-top;">应出勤日数</td>' 
                  // +'             <td colspan="3">出勤情况</td>'
                  // +'             <td colspan="5">缺勤原因分析</td>'
                  // +'       </tr>'
                  // +'       <tr id="" style="">'
                  // +'             <td style="vertical-align:text-top;">应出勤人次数</td>'
                  // +'             <td style="vertical-align:text-top;">实际出勤人次数</td>'
                  // +'             <td style="vertical-align:text-top;">出勤率</td>'
                  // +'             <td style="vertical-align:text-top;">缺勤人次数</td>'
                  // +'             <td style="vertical-align:text-top;">因病</td>'
                  // +'             <td style="vertical-align:text-top;">因事</td>'
                  // +'             <td style="vertical-align:text-top;">寒暑假</td>'
                  // +'             <td style="vertical-align:text-top;">其他</td>'
                  // +'       </tr>'
                  // +'   </thead>'
                  // +'   <tbody id="table-d" >'
                  // +'   </tbody>'
                  // +' </table>'
                  +'        </div>'
                  +'      </div>  '               
                  +'    </form>'
                  +'</div>';
            $('#mainFrame').empty(); 
            $('#mainFrame').html(sbase);
            var c = document.body.clientHeight;
            $('.form').css({'height': (c-110) +'px'})
            $('.info_wrap').css({'height': (c-180) +'px'})
            datepickers();
            getcqtj();

            var sel = document.getElementById("sel");
            sel.onchange=function(){
              if(sel.options[sel.selectedIndex].text==='出勤统计表'){   
                $('.text1').text('出勤统计表') 
                getcqtj();
              }else if(sel.options[sel.selectedIndex].text==='多发病统计'){       
                $('.text1').text('多发病统计')
                getdfb();
              }  
            };
            $.get("../api/wind/getDeviceTree.js?",{ProjectID:Wind.config.actitem},function(rt){
                  if(rt.state.return=="true"){
                        var d = [];
                        d = rt.data;
                        myApp.loadDevTree( myApp,config,d);
                  }
            });
            // $('#sample_2 tbody td').css({'white-space':'nowrap'});
            // myApp.dataTable_2(config,myApp); 

        },
        loadDevTree: function(myApp,config,d) {  //所有对树的操作必须在树加载完成后处理
            var core_data = { "core" : {    
                "check_callback" : true,
                
                "data" : d
                },"plugins" : [
                'changed',"wholerow"  
                ]};
                 console.log('jstree-data: ',d)
               $('#report_jstree').jstree("destroy");
               $('#report_jstree').jstree(core_data )
               .on("select_node.jstree", function (e, data) {
                   myApp.doSelectNode( myApp,config,data);
               });             
        },
        doSelectNode:function(config,myApp,data){
          var title = data.node.data.title.slice(0,2)
          // console.log(title)
          if(title == 'SC'){
            $("#mainFrame").empty();
            var sbase ='<div class="row" style="height:50px;line-height:50px;color:#9f9f9f;font-size:1em;margin:0;margin-top:-25px;">' + Wind.config.actProjectName + ' / 数据报表 </div>'
                  +'<div class="portlet-body form" style="">'
                  +'  <form   id="baseauth_form" role="form" class="form-horizontal" style="height:100%;background:#ffffff;">'
                  +'      <div class="form-body"  style="height:100%;">'
                  +'          <div class="row"  style="height:60px;margin-top:-20px;">'
                  +'            <span class="text1" style="font-size:2.1rem;font-weight:bold;margin-left:10px;line-height:60px;">出勤统计表</span>'
                    +'                   <div  style="float:right; margin-right:1.1em;position:relative;z-index:999;margin-top:15px;">'
                    +'                       <div class="btn-group" style="border-radius: 5px !important;">'
                    +'                              <a href="javascript:;"  id="cz_d" download="出勤统计表.xls" style="background:#21B694;color:#ffffff;width: 100px;border-radius: 5px !important;" class="btn btn-outline " >'
                    +'                                  <i class="fa fa-share"></i>'
                    +'                                      <span class="hidden-xs"> 导出 </span>'
                    +'                                  <i class="fa fa-angle-down"></i>'
                    +'                              </a>'
                    // +'                              <ul class="dropdown-menu pull-right" id="sample_2_tools">'
                    // +'                                  <li>'
                    // +'                                      <a href="javascript:;" data-action="0" class="tool-action">'
                    // +'                                           打印</a>'
                    // +'                                  </li>'  
                    // +'                                  <li>'
                    // +'                                      <a href="javascript:;" data-action="2" class="tool-action">'
                    // +'                                           PDF</a>'
                    // +'                                  </li>'
                    // +'                                  <li>'
                    // +'                                      <a href="javascript:;" data-action="3" class="tool-action">'
                    // +'                                           Excel</a>'
                    // +'                                  </li>'
                    // +'                                  <li>'
                    // +'                                      <a href="javascript:;" data-action="4" class="tool-action">'
                    // +'                                           CSV</a>'
                    // +'                                  </li>'
                    // +'                              </ul>'
                    +'                          </div>'
                    +'                      </div>'
                  +'            <span style="cursor:pointer;float:right;height:34px;color:#fff;border-radius:5px !important;background:#21B694;margin-top:13px;width:80px;line-height:34px;text-align:center;margin-right:50px;">查询</span>'
                  +'                      <div class="input-group input-medium date date-picker" data-date-format="yyyy-mm-dd" style="float:right;margin-top:13px;margin-right:20px;">'
                  +'                          <input id="e_war_start" style="background-color:#ffffff;" type="text" class="form-control" readonly>'
                  +'                          <span class="input-group-btn">'
                  +'                              <button style="background-color:#ffffff;" class="btn default" type="button">'
                  +'                                  <i class="fa fa-calendar"></i>'
                  +'                              </button>'
                  +'                          </span>'
                  +'                      </div>'
                  +'            <span style="font-size:1rem;margin-right:10px;line-height:60px;color:#848484;float:right">选择查看的日期:</span>'
                  +'            <select id="sel" style="width:180px;height:34px;float:right;margin-right:10px;margin-top:13px;">'
                  +'              <option>出勤统计表</option>'
                  +'              <option>多发病统计</option>'
                  // +'              <option>幼儿因病缺勤登记表</option>'
                  +'            </select>'
                  +'          </div>'
                  +'        <div class="info_wrap" style="width:100%;overflow-y:auto;overflow-x:hidden;margin:0">'
                  
                  +'        </div>'
                  +'      </div>  '               
                  +'    </form>'
                  +'</div>';
            $('#mainFrame').empty(); 
            $('#mainFrame').html(sbase);
            var c = document.body.clientHeight;
            $('.form').css({'height': (c-110) +'px'})
            $('.info_wrap').css({'height': (c-180) +'px'})
            datepickers();
            getcqtj();
            var sel = document.getElementById("sel");
            sel.onchange=function(){
              if(sel.options[sel.selectedIndex].text==='出勤统计表'){    
                $('.text1').text('出勤统计表') 
                getcqtj();
              }else if(sel.options[sel.selectedIndex].text==='多发病统计'){   
               $('.text1').text('多发病统计')    
                getdfb();
              }  
            };
            
          }else if(title != 'SC' && title != 'Gr'){
            $("#mainFrame").empty();
            var date=new Date();
            var year=date.getFullYear(); 
            var month=date.getMonth()+1;
            var sbase ='<div class="row" style="height:50px;line-height:50px;color:#9f9f9f;font-size:1em;margin:0;margin-top:-25px;">' + Wind.config.actProjectName + ' / 数据报表 </div>'
                  +'<div class="portlet-body form" style="">'
                  +'  <form   id="baseauth_form" role="form" class="form-horizontal" style="height:100%;background:#ffffff;">'
                  +'      <div class="form-body"  style="height:100%;">'
                  +'          <div class="row"  style="height:60px;margin-top:-20px;">'
                  +'            <span class="text1" style="font-size:2.1rem;font-weight:bold;margin-left:10px;line-height:60px;">'+data.node.text+'出勤表</span>'
                    +'                   <div  style="float:right; margin-right:1.1em;position:relative;z-index:999;margin-top:15px;">'
                    +'                       <div class="btn-group" style="border-radius: 5px !important;">'
                    +'                              <a href="javascript:;"  id="cz_d" style="background:#21B694;color:#ffffff;width: 100px;border-radius: 5px !important;" class="btn btn-outline " >'
                    +'                                  <i class="fa fa-share"></i>'
                    +'                                      <span class="hidden-xs"> 导出 </span>'
                    +'                                  <i class="fa fa-angle-down"></i>'
                    +'                              </a>'
                    +'                          </div>'
                    +'                      </div>'
                  +'            <span id="searcht" style="cursor:pointer;float:right;height:34px;color:#fff;border-radius:5px !important;background:#21B694;margin-top:13px;width:80px;line-height:34px;text-align:center;margin-right:50px;">查询</span>'
                  +'                      <div class="input-group input-medium date date-picker" data-date-format="yyyy-mm" style="float:right;margin-top:13px;margin-right:20px;">'
                  +'                          <input id="month_start" style="background-color:#ffffff;" type="text" class="form-control" readonly>'
                  +'                          <span class="input-group-btn">'
                  +'                              <button style="background-color:#ffffff;" class="btn default" type="button">'
                  +'                                  <i class="fa fa-calendar"></i>'
                  +'                              </button>'
                  +'                          </span>'
                  +'                      </div>'
                  +'            <span style="font-size:1rem;margin-right:10px;line-height:60px;color:#848484;float:right">选择查看的日期:</span>'
                  +'            <select id="sel" style="width:180px;height:34px;float:right;margin-right:10px;margin-top:13px;">'
                  +'              <option>出勤表</option>'
                  // +'              <option>多发病统计</option>'
                  +'              <option>幼儿因病缺勤登记表</option>'
                  +'            </select>'
                  +'          </div>'
                  +'        <div class="info_wrap" style="width:100%;overflow-y:auto;overflow-x:hidden;margin:0">'
                  // +'<table class="table table-striped table-hover table-bordered" id="sample_2">'
                  // +'   <thead>'
                  // +'       <tr id="" style="">'
                  // +'             <td rowspan="2" style="vertical-align:text-top;">年份</td>'
                  // +'             <td rowspan="2" style="vertical-align:text-top;">月份</td>'
                  // +'             <td rowspan="2" style="vertical-align:text-top;">在册儿童数</td>'
                  // +'             <td rowspan="2" style="vertical-align:text-top;">应出勤日数</td>' 
                  // +'             <td colspan="3">出勤情况</td>'
                  // +'             <td colspan="5">缺勤原因分析</td>'
                  // +'       </tr>'
                  // +'       <tr id="" style="">'
                  // +'             <td style="vertical-align:text-top;">应出勤人次数</td>'
                  // +'             <td style="vertical-align:text-top;">实际出勤人次数</td>'
                  // +'             <td style="vertical-align:text-top;">出勤率</td>'
                  // +'             <td style="vertical-align:text-top;">缺勤人次数</td>'
                  // +'             <td style="vertical-align:text-top;">因病</td>'
                  // +'             <td style="vertical-align:text-top;">因事</td>'
                  // +'             <td style="vertical-align:text-top;">寒暑假</td>'
                  // +'             <td style="vertical-align:text-top;">其他</td>'
                  // +'       </tr>'
                  // +'   </thead>'
                  // +'   <tbody id="table-d" >'
                  // +'   </tbody>'
                  // +' </table>'
                  +'        </div>'
                  +'      </div>  '               
                  +'    </form>'
                  +'</div>';
            $('#mainFrame').empty(); 
            $('#mainFrame').html(sbase);
            var c = document.body.clientHeight;
            $('.form').css({'height': (c-110) +'px'})
            $('.info_wrap').css({'height': (c-180) +'px'})
            datepickers();
            $('#month_start').val(year+'-'+month)
            getcq(year,month)
            $('#searcht').click(function(){
              // console.log($('#month_start').val().split('-')[0],$('#month_start').val().split('-')[1])
              getcq($('#month_start').val().split('-')[0],$('#month_start').val().split('-')[1]);
            })
            //班级出勤表
            function getcq(year,month){
              $('.text1').text(data.node.text+'出勤表');
              var length = mGetDate(year,month);
              var str='';
              var str_b='';
              for(var i=0;i<length;i++){
                str+='<td>'+(i+1)+'</td>'
              }
              for(var i=0;i<5;i++){
                var str_l='';
                for(var j=0;j<length;j++){
                  str_l+='<td id="'+i+'—_'+j+'"></td>';
                }
                str_b+='<tr>'
                    +'<td>张培铭</td>'
                    +str_l
                    +'<td></td>'
                    +'</tr>'
              }
              var table='<table class="table table-bordered" id="sample_2">'
                  +'   <thead>'
                  +'       <tr id="" style="">'
                  +'             <td rowspan="2" >姓名</td>'
                  +'             <td colspan="'+length+'">日期</td>'
                  +'             <td>备注</td>'
                  +'       </tr>'
                  +'       <tr id="" style="">'
                  +str
                  +'             <td ></td>'
                  +'       </tr>'
                  +'   </thead>'
                  +'   <tbody id="table-d" >'
                  +str_b
                  +'   </tbody>'
                  +' </table>';
              $('.info_wrap').html(table);
              $('#cz_d').click(function(){
                return ExcellentExport.excel(this, 'sample_2', '出勤表')
              })
            }
            function getyb(year,month){
              $('.text1').text(data.node.text+'幼儿因病缺勤登记表');
              var table='<table class="table table-bordered" id="sample_2">'
                  +'   <thead>'
                  +'       <tr id="" style="">'
                  +'             <td>编号</td>'
                  +'             <td>日期</td>'
                  +'             <td>班级</td>'
                  +'             <td>姓名</td>'
                  +'             <td>性别</td>'
                  +'             <td>年龄</td>'
                  +'             <td>缺勤原因</td>'
                  +'             <td>持续时间</td>'
                  +'             <td>就诊情况</td>'
                  +'             <td>诊断结果</td>'
                  +'             <td>总时间</td>'

                  +'       </tr>'
                  +'   </thead>'
                  +'   <tbody id="table-d" >'
                  +'   </tbody>'
                  +' </table>';
              $('.info_wrap').html(table);
              $('#cz_d').click(function(){
                return ExcellentExport.excel(this, 'sample_2', '幼儿因病缺勤登记表')
              })
            }
            var sel = document.getElementById("sel");
            sel.onchange=function(){
              if(sel.options[sel.selectedIndex].text==='出勤表'){    
                getcq(year,month);
                $('#searcht').click(function(){
                  getcq($('#month_start').val().split('-')[0],$('#month_start').val().split('-')[1]);
                })
              }else if(sel.options[sel.selectedIndex].text==='幼儿因病缺勤登记表'){       
                getyb(year,month);
                $('#searcht').click(function(){
                  getyb($('#month_start').val().split('-')[0],$('#month_start').val().split('-')[1]);
                })
              }  
            };
          }
        },
        
        dataTable_2:function(config,myApp){                     
            var oTable1=$('#sample_2').dataTable({
                "ordering": false,
                // Internationalisation. For more info refer to http://datatables.net/manual/i18n
                "language": {
                    "aria": {
                        "sortAscending": ": 以升序排列此列",
                        "sortDescending": ": 以降序排列此列"
                    },
                    "emptyTable": "表中数据为空",
                    "info": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                    "infoEmpty": "显示第 0 至 0 项结果，共 0 项",
                    "infoFiltered": "(由 _MAX_ 项结果过滤)",
                    "lengthMenu": "_MENU_ ",
                    "search": "过滤筛选 : ",
                    "zeroRecords": "没有匹配结果"
                },
                "bRetrieve": true,
                "bFilter": false,    
                "bDestroy": true,    
                "bDeferRender":true,
                // Or you can use remote translation file
                //"language": {
                //   url: '//cdn.datatables.net/plug-ins/3cfcc339e89/i18n/Portuguese.json'
                //},

                // setup buttons extentension: http://datatables.net/extensions/buttons/
                buttons: [
                    { extend: 'print', className: 'btn dark btn-outline',text:'打印',
                        customize: function (win) {
                            $(win.document.body).find('h1').css('text-align','center');
                            $(win.document.body).find('table').css({'white-space':'nowrap'});
                        } 
                    },
                    { extend: 'copy', className: 'btn red btn-outline' },
                    { extend: 'pdf', className: 'btn green btn-outline' },
                    { extend: 'excel', className: 'btn yellow btn-outline ' },
                    { extend: 'csv', className: 'btn purple btn-outline ' },
                    { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns'}
                ],
                "order": [
                    [0, 'asc']
                ],
                
                "lengthMenu": [
                    [5, 10, 15, 20, -1],
                    [5, 10, 15, 20, "All"] // change per page values here
                ],
                "pageLength": 10,
                "dom": "<'row'<f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
            });     
            $('#sample_2_tools > li > a.tool-action').unbind('click').on('click', function() {
                var action = $(this).attr('data-action');
                oTable1.DataTable().button(action).trigger();
            });
            $('.dataTables_filter').css({ 'margin-right':'8em'});
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