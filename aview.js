var daa= [];
var G_mb=[];
function formateDate(datetime){
   function addDateZero(num) {
        return (num < 10 ? "0" + num : num);
    }
    var d = new Date(datetime);
    var formatdatetime = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate()) + ' ' + addDateZero(d.getHours()) + ':' + addDateZero(d.getMinutes()) + ':' + addDateZero(d.getSeconds());
    return formatdatetime;
}
function myTime(date){
     var arr=date.split("T");
     var d=arr[0];
   var darr = d.split('-');

   var t=arr[1];
   var tarr = t.split('.000');
   var marr = tarr[0].split(':');

   var dd = parseInt(darr[0])+"/"+parseInt(darr[1])+"/"+parseInt(darr[2])+" "+parseInt(marr[0])+":"+parseInt(marr[1])+":"+parseInt(marr[2]);
 return dd;
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
                //$('body').removeClass("modal-open"); // fix bug when inline picker is used in modal
            }
    
            /* Workaround to restrict daterange past date select: http://stackoverflow.com/questions/11933173/how-to-restrict-the-selectable-date-ranges-in-bootstrap-datepicker */
        
            // Workaround to fix datepicker position on window scroll
            $( document ).scroll(function(){
                $('#form_modal2 .date-picker').datepicker('place'); //#modal is the id of the modal
            });
        }
        var handleTimePickers = function () {

            if (jQuery().timepicker) {
                $('.timepicker-default').timepicker({
                    autoclose: true,
                    showSeconds: true,
                    minuteStep: 1
                });

                $('.timepicker-no-seconds').timepicker({
                    autoclose: true,
                    minuteStep: 5,
                    defaultTime: false
                });

                $('.timepicker-24').timepicker({
                    autoclose: true,
                    minuteStep: 5,
                    showSeconds: false,
                    showMeridian: false
                });

                // handle input group button click
                $('.timepicker').parent('.input-group').on('click', '.input-group-btn', function(e){
                    e.preventDefault();
                    $(this).parent('.input-group').find('.timepicker').timepicker('showWidget');
                });

                // Workaround to fix timepicker position on window scroll
                $( document ).scroll(function(){
                    $('#form_modal4 .timepicker-default, #form_modal4 .timepicker-no-seconds, #form_modal4 .timepicker-24').timepicker('place'); //#modal is the id of the modal
                });
            }
        }
        return {
            //main function to initiate the module
            init: function () {
                handleDatePickers();
                handleTimePickers()
            }
        };
    
    }();
    
    if (App.isAngularJsApp() === false) { 
        jQuery(document).ready(function() {    
            ComponentsDateTimePickers.init(); 
        });
    } 
}
Wind.Aview = function(container, config) { 
    var initChartover1 = function() {
         
    };
    var initTableOver1 = function () { 
 
    };
    return {
        init: function() {
            // this.container = container;
            var cfg = config ? config : {};
          //  alert('eeewww');
            var myApp  = new  Wind.Aview();
            myApp.loadAview(cfg,myApp);
        },

        loadAview:function(config,myApp){
            $('#mainFrame').css('background','#F2F2F2')
            $("#mainFrame").empty();
            var modal = '<div class="modal fade" id="fade_info" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="width: 40%;top: 35%;"> '
                    +'      <div class="modal-content">'
                    +'          <div class="modal-header" style="">'
                    +'                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>'
                    +'                <h4 class="modal-title" style="" id="modal-name">修改录入信息</h4>'
                    +'            </div>'
                    +'            <div class="modal-body" style="padding:0;padding-bottom: 10px;">'
          
                    +'              <div id="checklist" style="width:100%;max-height:300px;overflow-y:auto;"></div>'

                    +'            </div>'
                    // +'            <div class="modal-footer" style="border:none">'
                    
                    // +'            </div>'
                    +'        </div> '
                    +'    </div>';
            var sbase =modal+'<div class="row" style="height:50px;line-height:50px;color:#9f9f9f;font-size:1em;margin:0;margin-top:-25px;">' + Wind.config.actProjectName + ' / 资产录入 </div>'
                  +'<div class="portlet-body form" style="">'
                  +'  <form   id="baseauth_form" role="form" class="form-horizontal" style="height:100%;">'
                  +'      <div class="form-body"  style="height:100%;">'
                  // +'          <div class="row"  style="height:60px;margin-top:-20px;border:1px solid #e6e6e6;background:#fff;">'
                  // +'            <span class="text1" style="font-size:2.1rem;font-weight:bold;margin-left:10px;line-height:60px;">资产录入</span>'
                  
                  // +'          </div>'
                  +'        <div id="t_wrap" class="row" style="margin-top:-20px;">'
                  // +'          <div style="width:25%;height:100%;background:#fff;outline:1px solid #e6e6e6;float:left;">'
                  // +'                <div id="" style="width:96%;height:50px;line-height:50px;font-size:2rem;margin-left:2%;border-bottom:1px solid #e6e6e6;">  资产信息表'
                  // +'                  <span id="loadzip" style="background:#21B694;color:#fff;float:right;margin-right:7px;display:inline-block;width:80px;height:34px;font-size:1.2rem;line-height:34px;margin-top:8px;text-align:center;border-radius:3px !important;cursor:pointer;">下载二维码</span>'
                  // +'                </div>'
                  // +'                <div id="jstree1" style="width:96%;margin-left:2%;overflow-y:auto"></div>'
                  // +'          </div>'
                  +'          <div style="width:100%;height:100%;background:#fff;outline:1px solid #e6e6e6;float:right;">'
                  +'                <div  style="width:96%;height:50px;line-height:50px;font-size:2rem;margin-left:2%;border-bottom:1px solid #e6e6e6;"> <span id="textD">资产信息表</span>'
                  +'<div class="btn-group" style="border-radius: 5px !important;float:right;margin-top:8px;">'
                  +'         <a href="javascript:;"  id="delarr" style="background:#21B694;color:#ffffff;width: 100px;border-radius: 5px !important;" class="btn btn-outline " >'
                  +'              删除'
                  +'         </a>'
                  +'     </div>'
                  +'                </div>'
                  +'                <div id="attr_wrap" style="width:96%;margin-left:2%;overflow-y:auto;display:none;">'
                  +'                <div id="attr_wrap1" style="width:96%;margin-left:2%;overflow-y:auto"></div>'
                  +'                <div id="attr_wrap2" style="width:98%;margin-left:1%;overflow:auto;"></div>'
                  // +'<div class="input-group input-medium date date-picker" data-date-format="yyyy-mm-dd" style="float:right; margin-right:10px;">'
                  //                         +'          <input id="" style="background-color:#ffffff;margin-top:8px;" type="text" class="form-control" readonly>'
                  //                         +'          <span class="input-group-btn">'
                  //                         +'          <button style="background-color:#ffffff;" class="btn default" type="button">'
                  //                         +'                <i class="fa fa-calendar"></i>'
                  //                         +'          </button>'
                  //                         +'          </span>'
                  //                         +'     </div>'
                  +'                </div>'
                  +'                <div id="attr_wrap3" style="width:96%;margin-left:2%;overflow-y:auto;display:none;">'
                  +'                </div>'
                  +'          </div>'
                  +'        </div>'
                  +'      </div>  '               
                  +'    </form>'
                  +'</div>';
            $('#mainFrame').empty(); 
            $('#mainFrame').html(sbase);
            var c = document.body.clientHeight;
            $('.form').css({'height': (c-120) +'px'});
            $('#t_wrap').css({'height': $('.form').height() +'px'});
            $('#jstree1').css({'height': ($('#t_wrap').height()-70) +'px'});
            $('#attr_wrap').css({'height': ($('#t_wrap').height()-70) +'px'});
            $('#attr_wrap3').css({'height': ($('#t_wrap').height()-70) +'px'});
            $('#attr_wrap1').css({'height': ($('#t_wrap').height()-70)/2 +'px'});
            $('#attr_wrap2').css({'height': ($('#t_wrap').height()-70)/2 +'px'});
            // console.log(sessionStorage.getItem('CompanyID'))
            // loadmb()
            // $('#fl_save').click(function(){
            //   var apipath = "/api/sihs/postzcmodel.js"; 
            //   var urlData = {
            //                     companyID:parseInt(sessionStorage.getItem('CompanyID')),
            //                     ProjectID:6006,
            //                     name:$('#mName').val(),
            //                     num:$('#mCode').val(),
            //                     remark:$('#mrem').val()
            //               }; 
            //   // console.log(urlData)
            //   $.post(apipath,urlData,function(result){ 
            //     // console.log(result)
            //         if(result.state.return=="true"){ 
            //               alert('添加成功！')
            //               loadmb() 
            //         }else{
            //               alert('分类名称/编码重复！')
            //         }
            //   })
            // })
            var apipath = "/api/wind/getCommTree"; 
            var urlData = {
                              CompanyID:sessionStorage.getItem('CompanyID'),
                              ProjectID:Wind.config.actitem,
                              Name:"资产树",
                              Tag:"Property"
                        }; 
            $.get(apipath,urlData,function(result){ 
                  if(result.state.return=="true"){ 
                        // daa = result.data.Data;
                        // console.log(result.data)
                        daa=[]
                        for(var i=0;i<result.data.Data.length;i++){
                              // if(result.data.Data[i].id != '1562031527914'){
                                    daa.push({'id':result.data.Data[i].id,'attr':{'type':result.data.Data[i].attr.type},'parent':result.data.Data[i].parent,'text': result.data.Data[i].text})
                              // }
                              
                        }
                        // console.log(daa)
                        var core_data ={
                              'plugins': [ "state","contextmenu" ],
             
                              'core': {
                                    'data': daa,
                                    // 'multiple': false,
                                    'check_callback': true,
                              }, 
                              // "contextmenu":{
                              //       select_node:false,
                              //       show_at_node:true,
                              //       items:{
                              //           "修改名称":{
                              //             "separator_before"      : false,
                              //                         "separator_after" : false,
                              //                         "_disabled"             : false, //(this.check("rename_node", data.reference, this.get_parent(data.reference), "")),
                              //                         "label"                       : "修改",
                              //                         "shortcut_label"  : 'F2',
                              //                         "icon"                        : "glyphicon glyphicon-leaf",
                              //                         "action":function (data) {
                              //                               var inst = $.jstree.reference(data.reference),
                              //                                     obj = inst.get_node(data.reference);
                              //                               inst.edit(obj);
                              //                         }
                              //           },
                         
                              //       }
                              // },
                        }
                        //console.log(core_data)

                        $('#aview_jstree').jstree("destroy");
                        $('#aview_jstree').jstree(core_data )
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
            })
            $('#loadzip').click(function(){
              var apipath = "/api/wind/postZipFile"; 
              var urlData = {
                filename:'qrcode'
              }; 
              $.post(apipath,urlData,function(result){ 
                if(result.state.return=="true"){ 
                  console.log(result)
                  window.open('http://120.195.207.238:50088/'+result.data.fileurl);
                }
              }) 
            })
        },
        doSelectNode:function(config,myApp,data){  
          var type = data.node.original.attr.type;
          var text = data.node.text;
          var nid = data.node.id;
          if(type.split('_')[0] != 'G'){
            myApp.loadinfo(config,myApp,type,text,nid);   
          }else{
            myApp.loadty(config,myApp,type,text,nid);   
          }
        },
        loadinfo:function(config,myApp,type,text,nid){
          $('#attr_wrap').css('display','block');
          $('#attr_wrap3').css('display','none');
          $('#delarr').css('display','none');
          $('#textD').text('  '+text);
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
                if(type == G_mb[i].AttrType){
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
                              // console.log(result.data);
                            var str = '';
                            var str_1 = '';
                            if(result.data.length>0){
                              var str3='';
                              var arr1=[];
                              for(var i=0;i<result.data[0].Data.length;i++){
                                    var isnull;
                                    var str1;
                                    var str1_1;
                                    if(result.data[0].Data[i].Type == 'String'){
                                          str1 ='<input type="text" id="'+result.data[0].Data[i].StrField+'" class="form-control inp" >';
                                          str1_1 ='<input type="text" id="'+result.data[0].Data[i].StrField+'_1" class="form-control inp" >';
                                    }else if(result.data[0].Data[i].Type == 'Number'){
                                          str1 ='<input type="number" id="'+result.data[0].Data[i].StrField+'" class="form-control inp" >';
                                          str1_1 ='<input type="number" id="'+result.data[0].Data[i].StrField+'_1" class="form-control inp" >';
                                    }else if(result.data[0].Data[i].Type == 'Date'){
                                          str1 ='<div class="input-group input-medium date date-picker" data-date-format="yyyy-mm-dd" style="float:right;width:100% !important;">'
                                          +'          <input id="'+result.data[0].Data[i].StrField+'" style="background-color:#ffffff;" type="text" class="form-control" readonly>'
                                          +'          <span class="input-group-btn">'
                                          +'          <button style="background-color:#ffffff;" class="btn default" type="button">'
                                          +'                <i class="fa fa-calendar"></i>'
                                          +'          </button>'
                                          +'          </span>'
                                          +'     </div>';
                                          str1_1 ='<div class="input-group input-medium date date-picker" data-date-format="yyyy-mm-dd" style="float:right;width:100% !important;">'
                                          +'          <input id="'+result.data[0].Data[i].StrField+'_1" style="background-color:#ffffff;" type="text" class="form-control" readonly>'
                                          +'          <span class="input-group-btn">'
                                          +'          <button style="background-color:#ffffff;" class="btn default" type="button">'
                                          +'                <i class="fa fa-calendar"></i>'
                                          +'          </button>'
                                          +'          </span>'
                                          +'     </div>';
                                    }
                                    if(result.data[0].Data[i].IsNull == true){
                                          str+='<div class="form-group" style="width:100%;margin-left:0;margin-top:10px;">'
                                             +'       <label  class="control-label col-md-3 col-md-offset-1" style="color:#888888"><span class="required">*</span> '+result.data[0].Data[i].StrName+'：</label>'
                                             +'       <div class="col-md-5">'+str1+' </div> '
                                             +'</div>';
                                          str_1+='<div class="form-group" style="width:100%;margin-left:0;margin-top:10px;height:34px;">'
                                             +'       <label  class="control-label col-md-3 col-md-offset-1" style="color:#888888"><span class="required">*</span> '+result.data[0].Data[i].StrName+'：</label>'
                                             +'       <div class="col-md-5">'+str1_1+' </div> '
                                             +'</div>';
                                    }else{
                                         str+='<div class="form-group" style="width:100%;margin-left:0;margin-top:10px;">'
                                             +'       <label  class="control-label col-md-3 col-md-offset-1" style="color:#888888">'+result.data[0].Data[i].StrName+'：</label>'
                                             +'       <div class="col-md-5">'+str1+' </div> '
                                             +'</div>';
                                        str_1+='<div class="form-group" style="width:100%;margin-left:0;margin-top:10px;height:34px;">'
                                             +'       <label  class="control-label col-md-3 col-md-offset-1" style="color:#888888">'+result.data[0].Data[i].StrName+'：</label>'
                                             +'       <div class="col-md-5">'+str1_1+' </div> '
                                             +'</div>';
                                    }
                                    str3+='<td style="text-overflow:ellipsis;white-space: nowrap">'+result.data[0].Data[i].StrName+'</td>';
                                    arr1.push({StrField:result.data[0].Data[i].StrField,type:result.data[0].Data[i].Type,StrName:result.data[0].Data[i].StrName})
                              }
                              var str2 = '<div class="form-group" style="width:100%;margin-left:0;margin-top:10px;">'
                                       +'       <label  class="control-label col-md-3 col-md-offset-1" style="color:#888888"></label>'
                                       +'              <div id="saveGd" class="col-md-3" style="background:#21B694;height:34px;line-height:34px;text-align:center;color:#fff;cursor:pointer;">保存信息</div> '
                                       +'</div>'
                              var str2_1 = '<div class="form-group" style="width:100%;margin-left:0;margin-top:10px;height:34px;">'
                                       +'       <label  class="control-label col-md-3 col-md-offset-1" style="color:#888888"></label>'
                                       +'              <div id="saveGd1" class="col-md-3" style="background:#21B694;height:34px;line-height:34px;text-align:center;color:#fff;cursor:pointer;">保存信息</div> '
                                       +'</div>'
                              $('#attr_wrap1').html(str+str2);
                              $('#checklist').html(str_1+str2_1);
                              datepickers();
                              var str4='<table class="table table-striped" style="text-align:center;width:100%;">'
                                +'       <thead>'
                                +'               <tr id="daytr" style="background:#21B694;color:#fff;height:40px;line-height:40px;">'
                                +str3
                                +'                  <td style="text-overflow:ellipsis;white-space: nowrap">编辑</td>'
                                +'               </tr>'
                                +'       </thead>'
                                +'       <tbody id="mbG"></tbody>'
                                +'     </table>';
                              $('#attr_wrap2').html(str4)
                              myApp.loadhis(config,myApp,AttrID,nid,NodeType,arr1,text,AttrName);
                              $('#saveGd').unbind('click')
                              $('#saveGd').click(function(){
                                    var timestamp=new Date().getTime();
                                    var arr = [];
                                    for(var i=0;i<result.data[0].Data.length;i++){
                                          arr.push({StrField:result.data[0].Data[i].StrField,StrName:result.data[0].Data[i].StrName,Value:$('#'+result.data[0].Data[i].StrField).val()})
                                    }
                                    var apipath = "/api/wind/postCommNodeAddInfo"; 
                                    var urlData = {
                                                uid:timestamp,
                                                CompanyID:sessionStorage.getItem('CompanyID'),
                                                ProjectID:Wind.config.actitem,
                                                Tag:"Property",
                                                AttrID:AttrID,
                                                AttrName:AttrName,
                                                NodeType:NodeType,
                                                NodeID:nid,
                                                NodeName:text,
                                                Data:arr
                                          }; 
                                    $.post(apipath,urlData,function(result){ 
                                          if(result.state.return=="true"){ 
                                                alert('保存成功')
                                                myApp.loadhis(config,myApp,AttrID,nid,NodeType,arr1,text,AttrName);
                                          }

                                    })
                              })
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
                              var str4='<table class="table table-striped" id="sample_2" style="text-align:center;width:100%;">'
                                +'       <thead>'
                                +'               <tr id="daytr" style="background:#21B694;color:#fff;height:40px;line-height:40px;">'
                                +'               <td></td>'
                                +str3
                                +'               </tr>'
                                +'       </thead>'
                                +'       <tbody id="tbody_type"></tbody>'
                                +'     </table>';
                              $('#attr_wrap3').html(str4)
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
                  var str1='';
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
                      str1+='<tr '+sp+' id="'+result.data[i].uid+'" type="'+result.data[i].AttrType+'"><td><input class="delcheck" type="checkbox" /></td>'+str2+'</tr>'
                  }
                  $('#tbody_type').html(str1);
                  myApp.upsb(config,myApp,type1,nid,arr1);
                  
              }
          })
        },
        upsb:function(config,myApp,type1,nid,arr1){
          $('#delarr').unbind('click');
          $('#delarr').click(function(){
            var list = $('.delcheck').length;
            var type=$('.delcheck').eq(0).parents('tr').attr('type');
            var arr=[];
            for(var i=0;i<list;i++){
              if($('.delcheck').eq(i).attr('checked') == 'checked'){
                arr.push($('.delcheck').eq(i).parents('tr').attr('id'))
              }
            }
            var apipath = "/api/wind/delCommNodeAddInfo"; 
            var urlData = {
                        Data:arr,
                        ProjectID:Wind.config.actitem,
                        NodeType:type
                  }; 
            $.post(apipath,urlData,function(result){ 
              if(result.state.return=="true"){ 
                alert('删除成功！');
                myApp.loadsb(config,myApp,type1,nid,arr1);
              }
            })
          })
        },
        loadhis:function(config,myApp,AttrID,nid,NodeType,arr1,text,AttrName){
          var apipath = "/api/wind/getCommNodeAddInfo"; 
          var urlData = {
                      NodeID:nid,
                      AttrID:AttrID,
                      ProjectID:Wind.config.actitem,
                      NodeType:NodeType
                }; 
          $.get(apipath,urlData,function(result){ 
                if(result.state.return=="true"){ 
                      var str1='';
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
                        str1+='<tr '+sp+' id="'+result.data[i].uid+'">'+str2+'<td style="text-overflow:ellipsis;white-space: nowrap"><a style="color:#5a5a5a;" class="delinfo"><i class="fa fa-times" style="color:#FF3F3F;"></i> 删除</a><a class="reviseinfo" style="margin-left:10px;color:#5a5a5a;"><i class="fa fa-retweet" style="color:#38A127;"></i> 修改</a></td></tr>'
                      }
                      $('#mbG').html(str1);
                      myApp.uphis(config,myApp,AttrID,nid,NodeType,arr1,text,AttrName)
                }
          })
        },
        uphis:function(config,myApp,AttrID,nid,NodeType,arr1,text,AttrName){
          $('.delinfo').unbind('click');
          $('.delinfo').click(function(){
            var arr=[];
            arr.push($(this).parents('tr').attr('id'));
            var apipath = "/api/wind/delCommNodeAddInfo"; 
            var urlData = {
                        Data:arr,
                        ProjectID:Wind.config.actitem,
                        NodeType:NodeType
                  }; 
            $.post(apipath,urlData,function(result){ 
              if(result.state.return=="true"){ 
                alert('删除成功！')
                myApp.loadhis(config,myApp,AttrID,nid,NodeType,arr1,text,AttrName);
              }
            })
          })
          $('.reviseinfo').unbind('click');
          $('.reviseinfo').click(function(){
            var uid = $(this).parents('tr').attr('id');
            $('#fade_info').modal('show');
            for(var i=0;i<arr1.length;i++){
              $('#'+arr1[i].StrField+'_1').val($(this).parents('tr').attr(arr1[i].StrField))
            }
            $('#saveGd1').unbind('click');
            $('#saveGd1').click(function(){
              var datee = [];
              for(var i=0;i<arr1.length;i++){
                datee.push({StrField:arr1[i].StrField,StrName:arr1[i].StrName,Value:$('#'+arr1[i].StrField+'_1').val()})
              }
              var apipath = "/api/wind/upCommNodeAddInfo"; 
              var urlData = {
                          uid:uid,
                          CompanyID:sessionStorage.getItem('CompanyID'),
                          ProjectID:Wind.config.actitem,
                          Tag:"Property",
                          AttrID:AttrID,
                          AttrName:AttrName,
                          NodeType:NodeType,
                          NodeID:nid,
                          NodeName:text,
                          Data:datee
                    }; 
              // console.log(urlData)
              $.post(apipath,urlData,function(result){ 
                    console.log(result)
                    if(result.state.return=="true"){ 
                          alert('修改成功');
                          $('#fade_info').modal('hide');
                          myApp.loadhis(config,myApp,AttrID,nid,NodeType,arr1,text,AttrName);
                    }
              })
            })
          })
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