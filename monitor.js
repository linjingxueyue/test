/**
 * Created by Administrator on 2014/9/6.
 增加系统入口页面，和平台系统入口配置、程序
 */
var SvgHandler = null;
var svgDoc = null;
var G_mb=[];
var daa= [];
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
function loadinfo(type,text,nid){
    $('#textD').text('  '+text);
    $('#attr_wrap').css('display','block');
    $('#attr_wrap3').css('display','none');
    $('#delarr').css('display','none');
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
                    var AttrID = parseInt(G_mb[i].AttrID)+1;
                    var AttrName =G_mb[i].AttrName+'维护';
                    var NodeType =G_mb[i].AttrType+'_wh';
                    var apipath = "/api/wind/getCommAttr"; 
                    var urlData = {
                              CompanyID:sessionStorage.getItem('CompanyID'),
                              ProjectID:Wind.config.actitem,
                              Tag:"Property",
                              AttrID:AttrID,
                              AttrName:AttrName,
                              NodeType:NodeType
                    }; 
                    // console.log(urlData)
                    $.get(apipath,urlData,function(result){ 
                        if(result.state.return=="true"){ 
                            var str = '';
                            var str_1 = '';
                            // console.log(result)
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
                                    str3+='<td>'+result.data[0].Data[i].StrName+'</td>';
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
                                var str4='<table class="table table-striped col-md-12" style="text-align:center;">'
                                    +'       <thead>'
                                    +'               <tr id="daytr" style="background:#21B694;color:#fff;height:40px;line-height:40px;">'
                                    +str3
                                    +'                  <td>编辑</td>'
                                    +'               </tr>'
                                    +'       </thead>'
                                    +'       <tbody id="mbG"></tbody>'
                                    +'     </table>';
                                  $('#attr_wrap2').html(str4)
                                gethis(AttrID,nid,NodeType,arr1,text,AttrName)
                                // var apipath = "/api/wind/getCommNodeAddInfo"; 
                                // var urlData = {
                                //     NodeID:nid,
                                //     AttrID:AttrID
                                // }; 
                                // $.get(apipath,urlData,function(result){ 
                                //     if(result.state.return=="true"){ 
                                //         console.log(result)
                                //         if(result.data != null){
                                //             var str='';
                                //             for(var i=0;i<result.data.Data.length;i++){
                                //                 var str1='';
                                //                 console.log()
                                //                 for(var j=0;j<result.data.Data[i].length;j++){
                                //                     for(var q=0;q<arr1.length;q++){
                                //                         if(result.data.Data[i][j].StrName == arr1[q]){
                                //                             str1+='<td name="'+result.data.Data[i][j].StrName+'">'+result.data.Data[i][j].Value+'</td>'
                                //                         }
                                //                     }
                                //                 }
                                //                 str+='<tr>'+str1+'</tr>';
                                //                 // $('#'+result.data.Data[i].StrField).val(result.data.Data[i].Value)
                                //             }
                                //             $('#mbG').html(str)
                                //         }
                                //     }
                                // })
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
                                    // console.log(urlData)
                                    $.post(apipath,urlData,function(result){ 
                                          // console.log(result)
                                          if(result.state.return=="true"){ 
                                                alert('保存成功')
                                                gethis(AttrID,nid,NodeType,arr1,text,AttrName);
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
}
function gethis(AttrID,nid,NodeType,arr1,text,AttrName){
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
                        str2+='<td name="'+arr[j]+'">'+formateDate(arr2[j]).split(' ')[0]+'</td>';
                        sp+=arr[j]+'="'+formateDate(arr2[j]).split(' ')[0]+'"';
                      }else{
                        str2+='<td name="'+arr[j]+'">'+arr2[j]+'</td>';
                        sp+=arr[j]+'="'+arr2[j]+'"';

                      }
                    }
                  }
                }
                str1+='<tr '+sp+' id="'+result.data[i].uid+'">'+str2+'<td><a style="color:#5a5a5a;" class="delinfo"><i class="fa fa-times" style="color:#FF3F3F;"></i> 删除</a><a class="reviseinfo" style="margin-left:10px;color:#5a5a5a;"><i class="fa fa-retweet" style="color:#38A127;"></i> 修改</a></td></tr>'
              }
              $('#mbG').html(str1);
              uphis(AttrID,nid,NodeType,arr1,text,AttrName)
        }
    })
}
function uphis(AttrID,nid,NodeType,arr1,text,AttrName){
    $('.delinfo').unbind('click');
    $('.delinfo').click(function(){
      var arr=[];
      arr.push($(this).parents('tr').attr('id'))
        var apipath = "/api/wind/delCommNodeAddInfo"; 
        var urlData = {
                    Data:arr,
                    ProjectID:Wind.config.actitem,
                    NodeType:NodeType
              }; 
  console.log(urlData)
        
        $.post(apipath,urlData,function(result){ 
            if(result.state.return=="true"){ 
                alert('删除成功！')
                gethis(AttrID,nid,NodeType,arr1,text,AttrName);
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
                    gethis(AttrID,nid,NodeType,arr1,text,AttrName);
                }
            })
        })
    })
}
function loadty(type,text,nid){
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
          var AttrID = parseInt(G_mb[i].AttrID)+1;
          var AttrName =G_mb[i].AttrName+'维护';
          var NodeType =G_mb[i].AttrType+'_wh';
          var apipath = "/api/wind/getCommAttr"; 
          var urlData = {
                      CompanyID:sessionStorage.getItem('CompanyID'),
                      ProjectID:Wind.config.actitem,
                      Tag:"Property",
                      AttrID:AttrID,
                      AttrName:AttrName,
                      NodeType:NodeType
                }; 
          $.get(apipath,urlData,function(result){ 
            console.log(result)
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
                      loadsb(NodeType,nid,arr1);
                      
                    }
                }else{
                      console.log(result)
                }
          })
        }
      }
    }
  })
}
function loadsb(type1,nid,arr1){
  $('#tbody_type').html('');
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
      upsb(type1,nid,arr1);
                    
        }
  })
}
function upsb(type1,nid,arr1){
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
    console.log(urlData)

    $.post(apipath,urlData,function(result){ 
      console.log(result)
      if(result.state.return=="true"){ 
        alert('删除成功！');
        loadsb(type1,nid,arr1);
      }
    })
  })
}
Wind.Monitor = function(container, config) {                  
    return {
        init: function() {
            var cfg = config ? config : {};
			
            var myApp  = new  Wind.Monitor();
			myApp.eMonitoringCenter(cfg,myApp);
			SvgHandler = this;
        }, 
        eMonitoringCenter:function(config,myApp){ 
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
            var sbase =modal+'<div class="row" style="height:50px;line-height:50px;color:#9f9f9f;font-size:1em;margin:0;margin-top:-25px;">' + Wind.config.actProjectName + ' / 资产维护 </div>'
                  +'<div class="portlet-body form" style="">'
                  +'  <form   id="baseauth_form" role="form" class="form-horizontal" style="height:100%;">'
                  +'      <div class="form-body"  style="height:100%;margin-top:-20px;">'
                  // +'          <div class="row"  style="height:60px;margin-top:-20px;border:1px solid #e6e6e6;background:#fff;">'
                  // +'            <span class="text1" style="font-size:2.1rem;font-weight:bold;margin-left:10px;line-height:60px;">资产维护信息</span>'
                  
                  // +'          </div>'
                  +'        <div id="t_wrap" class="row" >'
                  // +'          <div style="width:25%;height:100%;background:#fff;outline:1px solid #e6e6e6;float:left;">'
                  // +'                <div id="" style="width:96%;height:50px;line-height:50px;font-size:2rem;margin-left:2%;border-bottom:1px solid #e6e6e6;">  资产维护信息表'
                  // //+'                      <span id="attra" style="color:#fff;background:#72BE61;border-radius:3px !important;float:right;margin-right:10px;font-size:1.2rem;cursor:pointer;display: inline-block;width: 60px;height: 34px;line-height: 34px;text-align: center;margin-top: 8px;"><img src="attr.png" style="width:16px;height:16px;" />  属性</span>'
                  // +'                </div>'
                  // +'                <div id="jstree1" style="width:96%;margin-left:2%;overflow-y:auto;margin-top:10px;"></div>'
                  // +'          </div>'
                  +'          <div style="width:100%;height:100%;background:#fff;outline:1px solid #e6e6e6;float:right;">'
                  +'                <div id="" style="width:96%;height:50px;line-height:50px;font-size:2rem;margin-left:2%;border-bottom:1px solid #e6e6e6;"><span id="textD">资产信息表</span>'
                  +'<div class="btn-group" style="border-radius: 5px !important;float:right;margin-top:8px;">'
                  +'         <a href="javascript:;"  id="delarr" style="background:#21B694;color:#ffffff;width: 100px;border-radius: 5px !important;" class="btn btn-outline " >'
                  +'              删除'
                  +'         </a>'
                  +'     </div>'
                  +'                </div>'
                  +'                <div id="attr_wrap" style="width:96%;margin-left:2%;overflow-y:auto;display:none;">'
                  +'                <div id="attr_wrap1" style="width:96%;margin-left:2%;overflow-y:auto"></div>'
                  +'                <div id="attr_wrap2" style="width:98%;margin-left:1%;overflow-y:auto"></div>'
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
            $('.form').css({'height': (c-120) +'px'})
            $('#t_wrap').css({'height': $('.form').height() +'px'})
            $('#jstree1').css({'height': ($('#t_wrap').height()-70) +'px'})
            $('#attr_wrap').css({'height': ($('#t_wrap').height()-70) +'px'})
            $('#attr_wrap3').css({'height': ($('#t_wrap').height()-70) +'px'})
            $('#attr_wrap1').css({'height': ($('#t_wrap').height()-70)/2 +'px'})
            $('#attr_wrap2').css({'height': ($('#t_wrap').height()-70)/2 +'px'})

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
                            daa.push({'id':result.data.Data[i].id,'attr':{'type':result.data.Data[i].attr.type},'parent':result.data.Data[i].parent,'text': result.data.Data[i].text})
                              
                        }
                        var core_data ={
                            'plugins': [ "state","contextmenu" ],
                            'core': {
                                'data': daa,
                                'multiple': false,
                                'check_callback': true,
                            }, 
                        }
                        //console.log(core_data)

                        $('#monitor_jstree').jstree("destroy");
                        $('#monitor_jstree').jstree(core_data )
                        .on("changed.jstree", function (e, data) {
                              // console.log(data)
                            myApp.doSelectNode(config,myApp,data);
                        });
                        // for(var i=0;i<result.data.Data.length;i++){
                        //   if(result.data.Data[i].attr.type.split('_')[0] != 'G'){
                            // $('#textD').text('  '+result.data.Data[0].text);
                            // loadinfo(result.data.Data[0].attr.type,result.data.Data[0].text,result.data.Data[0].id);
                        //   }
                        // }
                        // $('#textD').text('  '+result.data.Data[0].text);
                        // loadinfo(result.data.Data[0].attr.type,result.data.Data[0].text,result.data.Data[0].id);
                        var text,type,id;
                        for(var i=0;i<result.data.Data.length;i++){
                            if(result.data.Data[i].parent == result.data.Data[0].id){
                                id=result.data.Data[i].id;
                                type=result.data.Data[i].attr.type;
                                text=result.data.Data[i].text;
                            }
                        }
                        $('#textD').text('  '+result.data.Data[0].text);
                        loadty(type,text,id);
                  }
            })
            // myApp.loadmb(config,myApp)
		},
		doSelectNode:function(myApp,config,data){
			function timestampToTime(timestamp) {
				var date = new Date(timestamp*1);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
				Y = date.getFullYear() + '-';
				M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
				D = date.getDate() + ' ';
				h = date.getHours() + ':';
				m = date.getMinutes() + ':';
				s = date.getSeconds();
				return Y+M+D+h+m+s;
			}

            $('#textD').text('  '+data.node.text);
            var type = data.node.original.attr.type;
            var text = data.node.text;
            var nid = data.node.id;
            if(type.split('_')[0] != 'G'){
              loadinfo(type,text,nid); 
            }else{
              loadty(type,text,nid); 
            }
            
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
        loadMenu: function(config,myApp) {
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
           // $('#'+this.container).find(".portlet-body .tabbable .tab-content").css({height:($(window).height()-115)});
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

