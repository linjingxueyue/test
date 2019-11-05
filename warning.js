/**
 * Created by Administrator on 2014/9/6.
 增加系统入口页面，和平台系统入口配置、程序
 */
var daa= [];
var G_mb=[];
// 当前时间前n天
function getBeforeDate(n) {
    var n = n;
    var d = new Date();
    var year = d.getFullYear();
    var mon = d.getMonth() + 1;
    var day = d.getDate();
    if(day <= n) {
        if(mon > 1) {
            mon = mon - 1;
        } else {
            year = year - 1;
            mon = 12;
        }
    }
    d.setDate(d.getDate() - n);
    year = d.getFullYear();
    mon = d.getMonth() + 1;
    day = d.getDate();
    s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
    return s;
}
function add0(m){return m<10?'0'+m:m }
function format(shijianchuo)
{
//shijianchuo是整数，否则要parseInt转换
var time = new Date(shijianchuo);
var y = time.getFullYear();
var m = time.getMonth()+1;
var d = time.getDate();
var h = time.getHours();
var mm = time.getMinutes();
var s = time.getSeconds();
return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}
Wind.Warning = function(container, config) { 
    var initChartover1 = function() {
         
    };
  var initTableOver1 = function () { 
 
    };
    return {
        init: function() {
            var cfg = config ? config : {};
            var myApp  = new  Wind.Warning();
            myApp.loadInfo(cfg,myApp); 
     

        },
        // pandect:function(config,myApp){
            
        // },
        loadInfo:function(config,myApp){ 
          $('#mainFrame').css('background','#F2F2F2')
          $("#mainFrame").empty();
          var sbase ='<div class="row" style="height:50px;line-height:50px;color:#9f9f9f;font-size:1em;margin:0;margin-top:-25px;">' + Wind.config.actProjectName + ' / 资产报表</div>'
              +'<div class="portlet-body form" style="">'
              +'  <form   id="baseauth_form" role="form" class="form-horizontal" style="height:100%;background:#ffffff;">'
              +'      <div class="form-body"  style="height:100%;">'
              +'          <div class="row"  style="height:60px;margin-top:-20px;">'
              +'            <span id="textD" style="font-size:2.1rem;font-weight:bold;margin-left:10px;line-height:60px;">资产报表</span>'
              +'                       <div class="btn-group" style="border-radius: 5px !important;float:right;margin-right:15px;margin-top:10px;">'
              +'                              <a href="javascript:;"  id="cz_d" style="background:#21B694;color:#ffffff;width: 100px;border-radius: 5px !important;" class="btn btn-outline " >'
              +'                                  <i class="fa fa-share"></i>'
              +'                                      <span class="hidden-xs"> 导出 </span>'
              +'                                  <i class="fa fa-angle-down"></i>'
              +'                              </a>'
              +'                          </div>'
              +'                       <div class="btn-group" style="border-radius: 5px !important;float:right;margin-right:15px;margin-top:10px;">'
              +'                              <a href="javascript:;"  id="loadimg" style="background:#21B694;color:#ffffff;width: 100px;border-radius: 5px !important;" class="btn btn-outline " >'
              +'                                     打印二维码'
              +'                              </a>'
              +'                          </div>'
              +'                       <div class="btn-group" style="border-radius: 5px !important;float:right;margin-right:15px;margin-top:10px;">'
              +'                              <a href="javascript:;"  id="selAll" style="background:#21B694;color:#ffffff;width: 100px;border-radius: 5px !important;" class="btn btn-outline " >'
              +'                                     全选'
              +'                              </a>'
              +'                          </div>'
              +'          </div>'
              +'        <div class="info_wrap" style="width:100%;overflow-y:auto;overflow-x:hidden;margin:0">'
              +'          <div class="info_wrap" id="cqlist" style="">'
              // +'            <div class="" style="width:18%;margin-left:1%;margin-top:20px;height:120px;outline:1px solid #ACECDE;float:left;background:#F5FEFC"></div>'
              // +'            <div style="width:18%;margin-left:2%;margin-top:20px;height:120px;outline:1px solid #ACECDE;float:left;background:#F5FEFC"></div>'
              // +'            <div style="width:18%;margin-left:2%;margin-top:20px;height:120px;outline:1px solid #ACECDE;float:left;background:#F5FEFC"></div>'
              // +'            <div style="width:18%;margin-left:2%;margin-top:20px;height:120px;outline:1px solid #ACECDE;float:left;background:#F5FEFC"></div>'
              // +'            <div style="width:18%;margin-left:2%;margin-top:20px;height:120px;outline:1px solid #ACECDE;float:left;background:#F5FEFC"></div>'
              // +'            <div style="width:18%;margin-left:1%;margin-top:20px;height:120px;outline:1px solid #ACECDE;float:left;background:#F5FEFC"></div>'

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
            var apipath = "/api/wind/getCommTree"; 
            var urlData = {
                              CompanyID:sessionStorage.getItem('CompanyID'),
                              ProjectID:Wind.config.actitem,
                              Name:"资产树",
                              Tag:"Property"
                        }; 
            $.get(apipath,urlData,function(result){ 
                if(result.state.return=="true"){ 
                        daa=[]
                        for(var i=0;i<result.data.Data.length;i++){
                              // if(result.data.Data[i].id != '1562031527914'){
                                    daa.push({'id':result.data.Data[i].id,'attr':{'type':result.data.Data[i].attr.type},'parent':result.data.Data[i].parent,'text': result.data.Data[i].text})
                              // }
                              
                        }
                        var core_data ={
                              'plugins': [ "state","contextmenu"  ],
             
                              'core': {
                                    'data': daa,
                                    // 'multiple': false,
                                    'check_callback': true,
                              }, 
                        }
                        $('#report_jstree').jstree("destroy");
                        $('#report_jstree').jstree(core_data )
                        .on("changed.jstree", function (e, data) {
                              // console.log(data)
                              myApp.doSelectNode(config,myApp,data);
                        });
                        var text,type,id;
                        for(var i=0;i<result.data.Data.length;i++){
                            if(result.data.Data[i].parent == result.data.Data[0].id){
                                id=result.data.Data[i].id;
                                type=result.data.Data[i].attr.type;
                                text=result.data.Data[i].text;
                            }
                        }
                        $('#textD').text('  '+result.data.Data[0].text);
                        myApp.loadty(config,myApp,type,text,id);
                }
            });
            $('#cz_d').click(function(){
                return ExcellentExport.excel(this, 'sample_2', '资产表');
            })
            $('#selAll').unbind('click');
            $('#selAll').click(function(){
                var list = $('.delcheck').length;
                for(var i=0;i<list;i++){
                    $('.delcheck').eq(i).attr('checked','checked');
                }
            });
            $('#loadimg').unbind('click');
            $('#loadimg').click(function(){
              var arr=[];
              var list = $('.delcheck').length;
              for(var i=0;i<list;i++){
                if($('.delcheck').eq(i).attr('checked')=='checked'){
                  arr.push({'tcode':$('.delcheck').eq(i).parents('tr').attr('d_qrcode'),'name':$('.delcheck').eq(i).parents('tr').attr('zcname')})
                }
              }
              console.log(arr);
              prn_Preview(arr);
            });
            var LODOP; //声明为全局变量  
            function prn_Preview(arr) {    
              CreatePrintPage(arr);
                LODOP.PREVIEW();    
            };
            function CreatePrintPage(arr) {
              console.log(arr)
              //LODOP=getLodop(document.getElementById('LODOP1'),document.getElementById('LODOP_EM1')); 
              LODOP=getLodop(); 
              //LODOP.PRINT_INITA(0,0,100,75,"打印控件功能演示_Lodop功能_自定义纸张1");
              LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_打印图片2");
              var c = arr.length;
              LODOP.SET_PRINT_PAGESIZE(0,400,312*(c*2),"");
              console.log(c)
              for(var i=0;i<arr.length;i++){
                 LODOP.ADD_PRINT_IMAGE(0+120*i,30,150,100,"<img style='width:90px; height:90px;' border='0' src='http://"+sessionStorage.getItem('hostname')+":50088/qrcode/"+arr[i].tcode+".png' />");
                LODOP.ADD_PRINT_TEXT(0+120*i+95,15,150,20,arr[i].name+' '+arr[i].tcode);
              }
             
              // LODOP.ADD_PRINT_IMAGE(0+1*120,30,100,100,"<img style='width:90px; height:90px' border='0' src='./img/DE_0001.png'/>");
              // LODOP.ADD_PRINT_TEXT(0+1*120+95,35,100,20,"电脑");
              //LODOP.SET_PRINT_STYLEA(0,"GroundColor","#0080FF"); 
            };  
        },
        loadDevTree: function(myApp,config,d) {  //所有对树的操作必须在树加载完成后处理
            var core_data = { "core" : {  
                     "check_callback" : true,
                        
                     "data" : d
                     },"plugins" : [
                        'changed',"wholerow"  
                     ]};
            // console.log(core_data)
            $('#cq_jstree').jstree("destroy");
            $('#cq_jstree').jstree(core_data )
            .on("changed.jstree", function (e, data) {
                  myApp.doSelectNode(config,myApp,data);
            });
             
        },
        doSelectNode:function(config,myApp,data){  
            var type = data.node.original.attr.type;
            var text = data.node.text;
            var nid = data.node.id;
            if(type.split('_')[0] == 'G'){
                myApp.loadty(config,myApp,type,text,nid);   
                
            }
        },
        loadty:function(config,myApp,type,text,nid){
          $('#attr_wrap3').css('display','block');
          $('#attr_wrap').css('display','none');
          $('#delarr').css('display','block');
          $('#attr_wrap3').html('')
          $('#textD').text('  '+text);
          var type1;
          // console.log(daa)
          for(var i=0;i<daa.length;i++){
            if(daa[i].parent == nid){
              type1 = daa[i].attr.type;
            }
          }
          var apipath = "/api/wind/getCommModelAttr"; 
          var urlData = {
                CompanyID:sessionStorage.getItem('CompanyID'),
                ProjectID:Wind.config.actitem,
                Tag:'Property',
          }; 
          $.get(apipath,urlData,function(result){ 
            if(result.state.return=="true"){ 
              G_mb = result.data;
              for(var i=0;i<G_mb.length;i++){
                if(type1 == G_mb[i].AttrType){
                  var AttrID = G_mb[i].AttrID;
                  var AttrName =G_mb[i].AttrName;
                  var NodeType =G_mb[i].AttrType;
                  var apipath = "/api/wind/getCommAttr"; 
                  var urlData = {
                              CompanyID:sessionStorage.getItem('CompanyID'),
                              ProjectID:Wind.config.actitem,
                              Tag:"Property",
                              AttrID:G_mb[i].AttrID,
                              AttrName:G_mb[i].AttrName,
                              NodeType:G_mb[i].AttrType
                        }; 
                  $.get(apipath,urlData,function(result){ 
                        if(result.state.return=="true"){ 
                            var str = '';
                            var str_1 = '';
                            if(result.data.length>0){
                              var str3='';
                              var arr1=[];
                              for(var i=0;i<result.data[0].Data.length;i++){
                                    str3+='<td style="text-overflow:ellipsis;white-space: nowrap">'+result.data[0].Data[i].StrName+'</td>';
                                    arr1.push({StrField:result.data[0].Data[i].StrField,type:result.data[0].Data[i].Type,StrName:result.data[0].Data[i].StrName})
                              }
                              var str4='<table class="table table-striped" id="" style="text-align:center;width:100%;">'
                                +'       <thead>'
                                +'               <tr id="daytr" style="background:#21B694;color:#fff;height:40px;line-height:40px;">'
                                +'               <td></td>'
                                +str3
                                +'               <td>二维码</td>'
                                +'               </tr>'
                                +'       </thead>'
                                +'       <tbody id="tbody_type"></tbody>'
                                +'     </table>'
                                +'<table class="table table-striped" id="sample_2" style="text-align:center;width:100%;display:none;">'
                                +'       <thead>'
                                +'               <tr id="daytr" style="background:#21B694;color:#fff;height:40px;line-height:40px;">'
                                +str3
                                +'               </tr>'
                                +'       </thead>'
                                +'       <tbody id="tbody_type2"></tbody>'
                                +'     </table>';
                              $('#cqlist').html(str4)
                              myApp.loadsb(config,myApp,type1,nid,arr1);
                              
                            }
                        }else{
                              console.log(result)
                        }
                  })
                }
              }
            }
          })
        },
        loadsb:function(config,myApp,type1,nid,arr1){
          var apipath = "/api/wind/getCommGNodeInfo"; 
          var urlData = {
                ProjectID:Wind.config.actitem,
                CompanyID:sessionStorage.getItem('CompanyID'),
                NodeType:type1,
                Tag:'Property',
                ParentID:nid
          }; 
          $.get(apipath,urlData,function(result){ 
              // console.log(result)
              if(result.state.return=="true"){ 
                  var str1='',str12='';
                  for(var i=0;i<result.data.length;i++){
                      var arr=[];
                      var arr2 = [];
                      var str2='';
                      for(var k in result.data[i]){
                        arr.push(k)
                      }
                      for(var k in result.data[i]){
                        arr2.push(result.data[i][k])
                      }
                      var sp='';
                      for(var j=0;j<arr.length;j++){
                        for(var q=0;q<arr1.length;q++){
                          if(arr[j] == arr1[q].StrField){
                            if(arr1[q].type == 'Date'){
                              str2+='<td style="text-overflow:ellipsis;white-space: nowrap" name="'+arr[j]+'">'+formateDate(arr2[j]).split(' ')[0]+'</td>';
                              sp+=arr[j]+'="'+formateDate(arr2[j]).split(' ')[0]+'"';
                            }else{
                              if(arr2[j] != null){
                                if(arr2[j].indexOf(".000Z") != -1){
                                  var time2=formateDate(arr2[j]).split(' ')[0];
                                  str2+='<td style="text-overflow:ellipsis;white-space: nowrap" name="'+arr[j]+'">'+time2+'</td>';
                                  sp+=arr[j]+'="'+time2+'"';
                                }else{
                                  str2+='<td style="text-overflow:ellipsis;white-space: nowrap" name="'+arr[j]+'">'+arr2[j]+'</td>';
                                  sp+=arr[j]+'="'+arr2[j]+'"';
                                }
                              }else{
                                str2+='<td style="text-overflow:ellipsis;white-space: nowrap" name="'+arr[j]+'"> </td>';
                                sp+=arr[j]+'=" "';
                              }
                              
                              // console.log(arr2[j])
                              

                            }
                          }
                        }
                      }
                      var d_qrcode;
                      for(var j=0;j<arr.length;j++){
                        if(arr[j] == 'd_qrcode'){
                            d_qrcode = arr2[j];
                        }
                      }
                      str1+='<tr '+sp+' id="'+result.data[i].uid+'" type="'+result.data[i].AttrType+'"><td><input class="delcheck" type="checkbox" /></td>'+str2+'<td><img style="width:25px;height:25px;" src="http://'+sessionStorage.getItem('hostname')+':50088/qrcode/'+d_qrcode+'.png" /></td></tr>';
                      str12+='<tr '+sp+' id="'+result.data[i].uid+'" type="'+result.data[i].AttrType+'">'+str2+'</tr>';
                  }
                  $('#tbody_type').html(str1);
                  $('#tbody_type2').html(str12);
              }
          })
        },
        dataTable_1:function (config,myApp) {
            // $(document).ready(function() {
                var oTable1=$('#sample_1').dataTable({
                    "deferRender": true,
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
                        "search": "过滤筛选:",
                        "zeroRecords": "没有匹配结果"
                    },

                    // Or you can use remote translation file
                    //"language": {
                    //   url: '//cdn.datatables.net/plug-ins/3cfcc339e89/i18n/Portuguese.json'
                    //},

                    // setup buttons extentension: http://datatables.net/extensions/buttons/
                    // buttons: [
                    //     { extend: 'print', className: 'btn dark btn-outline',text:'打印',
                    //         customize: function (win) {
                    //             $(win.document.body).find('h1').css('text-align','center');
                    //             $(win.document.body).find('table').css({'white-space':'nowrap'});
                    //         } 
                    //     },
                    //     { extend: 'copy', className: 'btn red btn-outline' },
                    //     { extend: 'pdf', className: 'btn green btn-outline' },
                    //     { extend: 'excel', className: 'btn yellow btn-outline ' },
                    //     { extend: 'csv', className: 'btn purple btn-outline ' },
                    //     { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns'}
                    // ],

                    // setup responsive extension: http://datatables.net/extensions/responsive/
                    // responsive: true,
                    "bRetrieve": true,
                    // "bFilter": false,    
                    // "bDestroy": true,   
                    // setup colreorder extension: http://datatables.net/extensions/colreorder/
                    colReorder: {
                        reorderCallback: function () {
                        }
                    },

                    "order": [
                        [0, 'asc']
                    ],
                    
                    "lengthMenu": [
                        [5, 10, 15, 20, -1],
                        [5, 10, 15, 20, "All"] // change per page values here
                    ],
                    // set the initial value
                    "pageLength": 10,

                    "dom": "<'row'<f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable
                    // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
                    // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js). 
                    // So when dropdowns used the scrollable div should be removed. 
                    //"dom": "<'row' <'col-md-12'T>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
                });
                $('#sample_1_tools > li > a.tool-action').unbind('click').on('click', function() {
                  var action = $(this).attr('data-action');
                  oTable1.DataTable().button(action).trigger();
                });
                $('.dataTables_filter').css({ 'margin-right':'15px'});
            // });
            var oTable3=$('#sample_3').dataTable({
                    "deferRender": true,
                    "ordering": false,
                    // Internationalisation. For more info refer to http://datatables.net/manual/i18n
                    // "language": {
                    //     "aria": {
                    //         "sortAscending": ": 以升序排列此列",
                    //         "sortDescending": ": 以降序排列此列"
                    //     },
                    //     "emptyTable": "表中数据为空",
                    //     "info": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                    //     "infoEmpty": "显示第 0 至 0 项结果，共 0 项",
                    //     "infoFiltered": "(由 _MAX_ 项结果过滤)",
                    //     "lengthMenu": "_MENU_ ",
                    //     "search": "过滤筛选:",
                    //     "zeroRecords": "没有匹配结果"
                    // },

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

                    // setup responsive extension: http://datatables.net/extensions/responsive/
                    // responsive: true,
                    "bRetrieve": true,
                    // "bFilter": false,    
                    // "bDestroy": true,   
                    // setup colreorder extension: http://datatables.net/extensions/colreorder/
                    colReorder: {
                        reorderCallback: function () {
                        }
                    },

                    // "order": [
                    //     [0, 'asc']
                    // ],
                    
                    // "lengthMenu": [
                    //     [5, 10, 15, 20, -1],
                    //     [5, 10, 15, 20, "All"] // change per page values here
                    // ],
                    // set the initial value
                    // "pageLength": 10,

                    "dom": "<'row'<f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable
                    // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
                    // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js). 
                    // So when dropdowns used the scrollable div should be removed. 
                    //"dom": "<'row' <'col-md-12'T>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
                });
                $('#sample_3_tools > li > a.tool-action').unbind('click').on('click', function() {
                  var action = $(this).attr('data-action');
                  oTable3.DataTable().button(action).trigger();
                });
                $('.dataTables_filter').css({ 'margin-right':'15px'});
        },
        dataTable_2:function (config,myApp) {
            // $(document).ready(function() {
                var oTable2=$('#sample_2').dataTable({
                    "deferRender": true,
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
                        "search": "过滤筛选:",
                        "zeroRecords": "没有匹配结果"
                    },

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

                    // setup responsive extension: http://datatables.net/extensions/responsive/
                    // responsive: true,
                    "bRetrieve": true,
                    // "bFilter": false,    
                    // "bDestroy": true,   
                    // setup colreorder extension: http://datatables.net/extensions/colreorder/
                    colReorder: {
                        reorderCallback: function () {
                        }
                    },

                    "order": [
                        [0, 'asc']
                    ],
                    
                    "lengthMenu": [
                        [5, 10, 15, 20, -1],
                        [5, 10, 15, 20, "All"] // change per page values here
                    ],
                    // set the initial value
                    "pageLength": 10,

                    "dom": "<'row'<f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable
                    // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
                    // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js). 
                    // So when dropdowns used the scrollable div should be removed. 
                    //"dom": "<'row' <'col-md-12'T>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
                });
                $('#sample_2_tools > li > a.tool-action').unbind('click').on('click', function() {
                  var action = $(this).attr('data-action');
                  oTable2.DataTable().button(action).trigger();
                });
                $('.dataTables_filter').css({ 'margin-right':'15px'});
            // });
        },
        datepickers:function(config,myApp){
            var ComponentsDateTimePickers = function () {
                var handleDatePickers = function () {
                    // $('#e_war_start').val(moment().subtract(2,'day').format('YYYY-MM-DD'));                    
                    // $('#e_war_end').val(moment().startOf('day').format('YYYY-MM-DD'));
                    if (jQuery().datepicker) {
                        $('.date-picker').datepicker({
                            rtl: App.isRTL(),
                            orientation: "left",
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