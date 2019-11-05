var daa= [];
var G_mb =[];
Wind.Equipment = function(container, config) { 
    var initChartover1 = function() {
         
    };
  var initTableOver1 = function () { 
 
    };
    return {
      init: function() {
            var cfg = config ? config : {};
            var myApp  = new  Wind.Equipment();
            myApp.loadInfo(cfg,myApp); 
            $('.Equipment_1>a').unbind('click');
            $('.Equipment_1>a').bind('click',{handle: this},function(e){ 
                $(this).parent('li').addClass("active open").siblings("li").removeClass("active open");
                 myApp.loadInfo(cfg,myApp); 
                 myApp.datepickers(config,myApp);

            }); 
            $('.Equipment_2').unbind('click');
            $('.Equipment_2').bind('click',{handle: this},function(e){ 
                $(this).addClass("active open").siblings("li").removeClass("active open");
                myApp.secInfo(cfg,myApp);
            });
            $('.Equipment_3>a').unbind('click');
            $('.Equipment_3>a').bind('click',{handle: this},function(e){ 
                $(this).parent('li').addClass("active open").siblings("li").removeClass("active open");
                myApp.triInfo(cfg,myApp);
            });
            $('.Equipment_4>a').unbind('click');
            $('.Equipment_4>a').bind('click',{handle: this},function(e){ 
                $(this).parent('li').addClass("active open").siblings("li").removeClass("active open");
                myApp.forInfo(cfg,myApp);
            });
      },
      loadInfo: function(config,myApp) {
            $('#mainFrame').css('background','#F2F2F2')
            $("#mainFrame").empty();
            var modal1 = '<div class="modal fade" id="fade_type" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style=""> '
                  +'      <div class="modal-content">'
                  +'          <div class="modal-header" style="">'
                  +'                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>'
                  +'                <h4 class="modal-title" style="font-weight:bold;">修改模板信息</h4>'
                  +'           </div>'
                  +'           <div class="modal-body">'
                  +'          <div class="form-group" style="width:100%;margin-left:0;height:34px;">'
                  +'              <label  class="control-label col-md-3 col-md-offset-1" style="color:#888888">模板名称：</label>'
                  +'              <div class="col-md-5"><input type="text" id="mName1" class="form-control inp" > </div> '
                  +'         </div>'
                  +'          <div class="form-group" style="width:100%;margin-left:0;height:34px;margin-top:10px;">'
                  +'              <label  class="control-label col-md-3 col-md-offset-1" style="color:#888888">模板编码：</label>'
                  +'              <div class="col-md-5"><input type="text" id="mCode1" class="form-control inp" > </div> '
                  +'         </div>'
                  +'          <div class="form-group" style="width:100%;margin-left:0;height:34px;margin-top:10px;">'
                  +'              <label  class="control-label col-md-3 col-md-offset-1" style="color:#888888">模板备注：</label>'
                  +'              <div class="col-md-5"><input type="text" id="mrem1" class="form-control inp" > </div> '
                  +'         </div>'
                  +'           </div>'
                  +'           <div class="modal-footer" style="border:none">'
                  +'                <button type="button" id="upmb" class="btn"  style="float:left;margin-left:30%;width:40%;background:#21B694;color:#fff;border-radius: 17px !important;margin-top:-30px;cursor:pointer;">确定修改</button>'
                  +'            </div>'
                  +'        </div> '
                  +'    </div>';
            var sbase =modal1+'<div class="row" style="height:50px;line-height:50px;color:#9f9f9f;font-size:1em;margin:0;margin-top:-25px;">' + Wind.config.actProjectName + ' / 资产建模 /<span class="text1">模板分类</span></div>'
                  +'<div class="portlet-body form" style="">'
                  +'  <form   id="baseauth_form" role="form" class="form-horizontal" style="height:100%;background:#ffffff;">'
                  +'      <div class="form-body"  style="height:100%;">'
                  +'          <div class="row"  style="height:60px;margin-top:-20px;border-bottom:1px solid #e6e6e6;">'
                  +'            <span class="text1" style="font-size:2.1rem;font-weight:bold;margin-left:10px;line-height:60px;">模板分类</span>'
                  
                  +'          </div>'
                  +'        <div class="info_wrap" style="width:100%;overflow-y:auto;overflow-x:hidden;margin:0">'
                  +'      <div class="form-group" style="margin-top:20px;">'
                  +'        <label class="col-md-3 control-label"> 模板名称：</label>'
                  +'        <div class="col-md-5">'
                  +'          <input type="text" id="mName" class="form-control  inp" >'
                  +'        </div>'
                  +'      </div>'
                  +'      <div class="form-group" style="margin-top:20px;">'
                  +'        <label class="col-md-3 control-label"> 模板编码：</label>'
                  +'        <div class="col-md-5">'
                  +'          <input type="text" id="mCode" class="form-control  inp">'
                  +'        </div>'
                  +'      </div>'
                  +'      <div class="form-group" style="margin-top:20px;">'
                  +'        <label class="col-md-3 control-label"> 模板备注：</label>'
                  +'        <div class="col-md-5">'
                  +'          <input type="text" id="mrem" class="form-control  inp">'
                  +'        </div>'
                  +'      </div>'
                  +'      <div class="form-group" style="margin-top:20px;">'
                  +'        <label class="col-md-3 control-label"></label>'
                  +'        <div class="col-md-5" style="text-align:center;">'
                  +'          <a id="fl_save" style="display:inline-block;width:100px;height:34px;line-height:34px;background:#21B694;color:#fff;border-radius:5px !important;text-decoration: none;">保存</a>'
                  +'        </div>'
                  +'      </div>'
                  +'           <table class="table table-striped" id="" style="margin-top:10px;overflow-y:auto;overflow-x:hidden;">'
                  +'                        <thead>'
                  +'                            <tr id="daytr" style="background:#21B694;color:#fff;height:40px;line-height:40px;">'
                  +'                              <td>模板名称</td>'
                  +'                              <td>模板编码</td>'
                  +'                              <td>模板备注</td>'
                  +'                              <td>编辑</td>'
                  +'                            </tr>'
                  +'                        </thead>'
                  +'                  <tbody id="tbody_G" ></tbody>'
                  +'                  </tbody>'
                  +'              </table>'
                  +'        </div>'
                  +'      </div>  '               
                  +'    </form>'
                  +'</div>';
            $('#mainFrame').empty(); 
            $('#mainFrame').html(sbase);
            var c = document.body.clientHeight;
            $('.form').css({'height': (c-120) +'px'});
            $('.info_wrap').css({'height': (c-180) +'px'});
            myApp.loadmb(config,myApp);
            $('#fl_save').unbind('click');
            $('#fl_save').click(function(){
                  var timestamp=new Date().getTime();
                  var apipath = "/api/wind/postCommModelAttr"; 
                  var urlData = {
                        CompanyID:sessionStorage.getItem('CompanyID'),
                        ProjectID:Wind.config.actitem,
                        Tag:'Property',
                        AttrID:timestamp,
                        AttrName:$('#mName').val(),
                        AttrType:$('#mCode').val(),
                        Remark:$('#mrem').val()
                  }; 
                  $.post(apipath,urlData,function(result){ 
                        if(result.state.return=="true"){ 
                              alert('添加成功！')
                              myApp.loadmb(config,myApp) 
                        }else{
                              console.log(result)
                              // alert('分类名称/编码重复！')
                        }
                  })
            })
      },
      loadmb:function(config,myApp){
            var apipath = "/api/wind/getCommModelAttr"; 
            var urlData = {
                  CompanyID:sessionStorage.getItem('CompanyID'),
                  ProjectID:Wind.config.actitem,
                  Tag:'Property',
            }; 
            $.get(apipath,urlData,function(result){ 
                  if(result.state.return=="true"){ 
                        G_mb = result.data;
                        var str='';
                        for(var i=0;i<result.data.length;i++){
                              str+='<tr id="'+result.data[i]._id+'" name="'+result.data[i].AttrID+'" style="height:30px;line-height:30px;">'
                              +'      <td>'+result.data[i].AttrName+'</td>'
                              +'      <td>'+result.data[i].AttrType+'</td>'
                              +'      <td>'+result.data[i].Remark+'</td>'
                              +'      <td><a style="color:#5a5a5a;" class="delmb"><i class="fa fa-times" style="color:#FF3F3F;"></i> 删除</a><a class="revisemb" style="margin-left:10px;color:#5a5a5a;"><i class="fa fa-retweet" style="color:#38A127;"></i> 修改</a></td>'
                              +'    </tr>';
                        }
                        $('#tbody_G').html(str);
                        myApp.upmb(config,myApp);
                  }
            })
      },
      upmb:function(config,myApp){
            $('.delmb').click(function(){
                  var apipath = "/api/wind/delCommModelAttr"; 
                  var urlData = {
                        ProjectID:Wind.config.actitem,
                        CompanyID:sessionStorage.getItem('CompanyID'),
                        id:$(this).parents('tr').attr('id')
                  }; 
                  $.post(apipath,urlData,function(result){ 
                        if(result.state.return=="true"){ 
                              alert('删除成功!')
                              myApp.loadmb(config,myApp) 
                        }
                  })
            })
            $('.revisemb').click(function(){
                $('#fade_type').modal('show');
                var id=$(this).parents('tr').attr('id');
                var AttrID=$(this).parents('tr').attr('name');
                $('#mName1').val($(this).parents('tr').children('td').eq(0).text());
                $('#mCode1').val($(this).parents('tr').children('td').eq(1).text());
                $('#mrem1').val($(this).parents('tr').children('td').eq(2).text());
                $('#upmb').unbind('click');
                $('#upmb').click(function(){
                  var apipath = "/api/wind/upCommModelAttr"; 
                  var urlData = {
                        // ProjectID:Wind.config.actitem,
                        // CompanyID:sessionStorage.getItem('CompanyID'),
                        id:id,
                        Tag:'Property',
                        AttrID:AttrID,
                        AttrName:$('#mName1').val(),
                        AttrType:$('#mCode1').val(),
                        Remark:$('#mrem1').val()
                  }; 
                  $.post(apipath,urlData,function(result){ 
                        console.log(result)
                        if(result.state.return=="true"){ 
                              alert('修改成功!')
                              $('#fade_type').modal('hide');
                              myApp.loadmb(config,myApp) 
                        }
                  })
                })
            })
      },    
      datepickers:function(config,myApp){
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
      },
      doSelectNode:function(config,myApp,data){
        $('#table-wrap').html(' ')
        if(data.node.original.attr.type.split('_')[0] == 'G'){
          var type;
          for(var i=0;i<daa.length;i++){
            if(daa[i].parent == data.node.id){
              type = daa[i].attr.type;
            }
          }
          // var apipath = "/api/wind/getCommModelAttr"; 
          // var urlData = {
          //       CompanyID:sessionStorage.getItem('CompanyID'),
          //       ProjectID:Wind.config.actitem,
          //       Tag:'Property',
          // }; 
          // $.get(apipath,urlData,function(result){ 
          //   if(result.state.return=="true"){ 
          //     G_mb = result.data;
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
                                    str3+='<td style="text-overflow:ellipsis;white-space: nowrap">'+result.data[0].Data[i].StrName+'</td>';
                                    arr1.push({StrField:result.data[0].Data[i].StrField,type:result.data[0].Data[i].Type,StrName:result.data[0].Data[i].StrName})
                              }
                              var str4='<table class="table table-striped" style="text-align:center;width:100%;">'
                                +'       <thead>'
                                +'               <tr id="daytr" style="background:#21B694;color:#fff;height:40px;line-height:40px;">'
                                +str3
                                +'               </tr>'
                                +'       </thead>'
                                +'       <tbody id="tbody_type"></tbody>'
                                +'     </table>';
                              $('#table-wrap').html(str4)
                              // myApp.loadhis(config,myApp,AttrID,nid,NodeType,arr1,text,AttrName);
                              var apipath = "/api/wind/getCommGNodeInfo"; 
                              var urlData = {
                                    ProjectID:Wind.config.actitem,
                                    CompanyID:sessionStorage.getItem('CompanyID'),
                                    NodeType:type,
                                    Tag:'Property',
                                    ParentID:data.node.id
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
                                                    str2+='<td style="text-overflow:ellipsis;white-space: nowrap" name="'+arr[j]+'"></td>';
                                                    sp+=arr[j]+'=" "';
                                                  }
                                                  
                                                  // console.log(arr2[j])
                                                  

                                                }
                                              }
                                            }
                                          }
                                          str1+='<tr '+sp+' id="'+result.data[i].uid+'">'+str2+'</tr>'
                                      }
                                      $('#tbody_type').html(str1);
                                  }
                              })
                            }
                        }else{
                              console.log(result)
                        }
                  })
                }
              }
          //   }
          // }) 
          
        }
        // $('#btnSub').unbind('click');
        // $('#btnSub').bind('click',{handle: this},function(e){ 
        //   var img =document.getElementById("uploadstu").files[0];
        //   var fm = new FormData();
        //   fm.append('upload', img);
        //   fm.append('Tag', 'JNNND');
        //   fm.append("ProjectID", "2009");
        //   fm.append("CompanyID", "123432156");
        //   fm.append("AttrID", 335566);
        //   fm.append("AttrName", "疾病分类");
        //   fm.append("NodeType", "G");
        //   fm.append("ParentID", 123422233);
        //   //fm.append("ProjectID", "6006");
        //         //fm.append('companyid', companyid);
        //   var url = "../api/wind/importCommNodeInfo.js"; 
        //   $.ajax({  
        //     url:url,
        //     cache:false,
        //     type:"POST",
        //     //dataType:'json',
        //     data:fm, 
        //     processData:false,
        //     contentType:false,
        //     //data:{"ProjectID":"6006"},
        //     success: function(data) { // data 保存提交后返回的数据，一般为 json 数据  
        //       debugger;
        //       var obj = data;    
        //       if(obj.state.return=="true")  {  
        //         alert('导入完成!')
        //       }   
        //       else {  
        //        alert(" 失败,请重试!");                       
        //       }  
        //     }  
        //   }); 
        // });
      },
      secInfo: function(config,myApp) {
            $('#mainFrame').css('background','#F2F2F2')
            $("#mainFrame").empty();
            var sbase ='<div class="row" style="height:50px;line-height:50px;color:#9f9f9f;font-size:1em;margin:0;margin-top:-25px;">' + Wind.config.actProjectName + ' / 资产建模 /<span class="text1">资产建树</span></div>'
                  +'<div class="portlet-body form" style="">'
                  +'  <form   id="baseauth_form" role="form" class="form-horizontal" style="height:100%;background:#ffffff;">'
                  +'      <div class="form-body"  style="height:100%;">'
                  +'          <div class="row"  style="height:60px;margin-top:-20px;border-bottom:1px solid #e6e6e6;">'
                  +'            <span class="text1" style="font-size:2.1rem;font-weight:bold;margin-left:10px;line-height:60px;">资产建树</span>'
                  +'          </div>'

                  +'        <div id="t_wrap" class="row" >'
                  +'                <div id="addsx" style="width:96%;margin-left:2%;color:#fff;font-size:1.2rem;line-height:50px;">'
                  +'                      <span id="addG" style="padding:8px 5px;background:#21B694;border-radius:3px !important;cursor:pointer;margin-left:5px;"><img src="addG.png" style="width:16px;height:16px;" />  添加资产分类</span>'
                  +'                      <span id="addT" style="padding:8px 5px;background:#3D95D5;border-radius:3px !important;margin-left:5px;cursor:pointer;"><img src="addG.png" style="width:16px;height:16px;" />  资产病情</span>'
                  +'                </div>'
                  +'                <div style="width:96%;height:50px;margin-left:2%;color:#fff;font-size:1.2rem;line-height:50px;margin-top:-10px;">'
                  +'                      <span id="delnode" style="padding:8px 5px;background:#E25657;border-radius:3px !important;margin-left:5px;cursor:pointer;"><img src="del.png" style="width:16px;height:10px;" />  删除</span>'
                  +'                      <span id="savetree" style="padding:8px 5px;background:#F3A832;border-radius:3px !important;margin-left:5px;cursor:pointer;"><img src="save.png" style="width:16px;height:10px;" />  保存</span>'
                  //+'                      <span id="attra" style="padding:8px 5px;background:#72BE61;border-radius:3px !important;margin-left:5px;cursor:pointer;"><img src="attr.png" style="width:16px;height:16px;" />  属性</span>'
                  +'                </div>'
                  +'                <div id="jstree1" style="width:28%;margin-left:2%;overflow-y:auto;float:left"></div>'
                  +'                <div id="table-wrap" style="width:69%;overflow:auto;float:left"></div>'
                  +'          </div>'
                  +'      </div>  '               
                  +'    </form>'
                  +'              <form  method="POST" action="" id="importprofile" name="importprofile" enctype="multipart/form-data" style="float:right;height:60px;position:absolute;top:50px;right:50px;">'
                  +'                  <div class="form-group" style="float:left;">'
                  +'                      <lebal for="fulAvatar"></lebal>'
                  +'                      <input type="file" id="uploadstu" name="upload" multiple="multiple"/>'
                  +'                  </div>'
                  +'                  <span id="drwrap"></span>'
                  //+'                  <span id="btnSub" style="background:#21B694;color:#fff;float:left;margin-left:7px;display:inline-block;width:80px;height:34px;font-size:1.2rem;line-height:34px;text-align:center;border-radius:3px !important;cursor:pointer;" type="submit">导 入</span>'
                  +'              </form>'
                  +'</div>';
            $('#mainFrame').empty(); 
            $('#mainFrame').html(sbase);
            var c = document.body.clientHeight;
            $('.form').css({'height': (c-120) +'px'});
            $('#t_wrap').css({'height': ($('.form').height()-80) +'px'});
            $('#jstree1').css({'height': ($('#t_wrap').height()-120) +'px'});
            $('#table-wrap').css({'height': ($('#t_wrap').height()-120) +'px'});
            $('#attr_wrap').css({'height': ($('#t_wrap').height()-70) +'px'});
            myApp.gettree(config,myApp);
            myApp.loadtree(config,myApp);
            var str11='';
            for(var i=0;i<G_mb.length;i++){
              if(G_mb[i].AttrType.split('_')[0] == 'T'){
                str11+='<span class="btnSub" name="'+G_mb[i].AttrType+'" AttrID="'+G_mb[i].AttrID+'" AttrName="'+G_mb[i].AttrName+'" style="background:#21B694;color:#fff;float:left;margin-left:7px;display:inline-block;width:80px;height:34px;font-size:1.2rem;line-height:34px;text-align:center;border-radius:3px !important;cursor:pointer;" type="submit">导入'+G_mb[i].AttrName+'</span>'
              }
            }
            $('#drwrap').html(str11);

           
            //删除节点
            $('#delnode').click(function(){
                  if($('.jstree-clicked').length == 0){
                        alert('请选择一个节点！')
                  }else{
                        var arr = [];
                        // console.log(daa)
                        for(var i=0;i<daa.length;i++){
                              if($('#'+daa[i].id+'>a').is('.jstree-clicked') == true){
                                    arr.push(daa[i].id)
                              }
                        }
                        // console.log(arr)
                        for(var j=0;j<arr.length;j++){
                              var arr1 = [];
                              for(var i=0;i<daa.length;i++){
                                    $("#jstree1").jstree('delete_node', arr[j]);
                                    if(daa[i].id != arr[j]){
                                          arr1.push(daa[i])
                                    }
                              }
                              daa=arr1;
                        }
                  }
            })
            //导入数据
            $('.btnSub').unbind('click');
            $('.btnSub').click(function(){
              var type=$(this).attr('name');
              var AttrID=$(this).attr('AttrID');
              var AttrName=$(this).attr('AttrName');
              if($('.jstree-clicked').length == 0){
                      alert('请选择一个节点！')
              }else{
                  var parentid;
                  // console.log(daa)
                  for(var i=0;i<daa.length;i++){
                        if($('#'+daa[i].id+'>a').is('.jstree-clicked') == true){
                              parentid=daa[i].id;
                        }
                  }
                  // console.log(parentid)
                  var img =document.getElementById("uploadstu").files[0];
                  var fm = new FormData();
                  fm.append('upload', img);
                  fm.append('Tag', 'Property');
                  fm.append("ProjectID", Wind.config.actitem);
                  fm.append("CompanyID",sessionStorage.getItem('CompanyID'));
                  fm.append("AttrID", AttrID);
                  fm.append("AttrName", AttrName);
                  fm.append("NodeType", type);
                  fm.append("ParentID", parentid);
                  //fm.append("ProjectID", "6006");
                        //fm.append('companyid', companyid);
                  var url = "../api/wind/importCommNodeInfo.js"; 
                  $.ajax({  
                    url:url,
                    cache:false,
                    type:"POST",
                    //dataType:'json',
                    data:fm, 
                    processData:false,
                    contentType:false,
                    //data:{"ProjectID":"6006"},
                    success: function(data) { // data 保存提交后返回的数据，一般为 json 数据  
                      debugger;
                      var obj = data;    
                      if(obj.state.return=="true")  {  
                        alert('导入完成!')
                        myApp.gettree(config,myApp);
                      }   
                      else {  
                       alert(" 失败,请重试!");                       
                      }  
                    }  
                  }); 
              }
            });
            //上传将资产树
            $('#savetree').click(function(){
                  // for(var i=0;i<daa.length;i++){
                  //       daa[i].text = $('#'+daa[i].id+'>a').text()
                  // }
                  // console.log(daa)
                  var apipath = "/api/wind/postCommTree.js?"; 
                  var urlData = {
                                    CompanyID:sessionStorage.getItem('CompanyID'),
                                    ProjectID:Wind.config.actitem,
                                    Name:"资产树",
                                    Tag:"Property",
                                    Data:daa
                              }; 
                  $.post(apipath,urlData,function(result){ 
                        if(result.state.return=="true"){ 
                              alert('添加成功！')
                        }
                  })
            })
      },
      gettree:function(config,myApp){
          var apipath = "/api/wind/getCommTree"; 
          var urlData = {
                CompanyID:sessionStorage.getItem('CompanyID'),
                ProjectID:Wind.config.actitem,
                Name:"资产树",
                Tag:"Property"
          }; 
          $.get(apipath,urlData,function(result){ 
                if(result.state.return=="true"){ 
                      // console.log(result)
                      daa=[]
                      if(result.data != null){
                        for(var i=0;i<result.data.Data.length;i++){
                            daa.push({'id':result.data.Data[i].id,'attr':{'type':result.data.Data[i].attr.type},'parent':result.data.Data[i].parent,'text': result.data.Data[i].text})                              
                        }
                      }
                      var core_data ={
                            'plugins': ["checkbox", "state","contextmenu"],
                            "checkbox": { 
                            // "undetermined": false, 
                                  "three_state" : false 
                            },
                            'core': {
                                  'data': daa,
                                  'multiple': false,
                                  'check_callback': true,
                            }, 
                            "contextmenu":{
                                  select_node:false,
                                  show_at_node:true,
                                  items:{
                                      "修改名称":{
                                        "separator_before"      : false,
                                                    "separator_after" : false,
                                                    "_disabled"             : false, //(this.check("rename_node", data.reference, this.get_parent(data.reference), "")),
                                                    "label"                       : "修改",
                                                    "shortcut_label"  : 'F2',
                                                    "icon"                        : "glyphicon glyphicon-leaf",
                                                    "action":function (data) {
                                                          var inst = $.jstree.reference(data.reference),
                                                                obj = inst.get_node(data.reference);
                                                          inst.edit(obj);
                                                          $("input").blur(function(){
                                                            for(var i=0;i<daa.length;i++){
                                                              if(daa[i].id == data.reference.context.id){
                                                                daa[i].text = data.reference.context.innerText
                                                              }
                                                            }
                                                          })
                                                    }
                                        },
                       
                                  }
                            },
                      }
                      $('#jstree1').jstree("destroy");
                      $('#jstree1').jstree(core_data )
                      .on("changed.jstree", function (e, data) {
                            // console.log(data)
                            // doSelectNode(data);
                            myApp.doSelectNode(config,myApp,data);
                      });
                }
          })
      },
      loadtree:function(config,myApp){
            var apipath = "/api/wind/getCommModelAttr"; 
            var urlData = {
                  CompanyID:sessionStorage.getItem('CompanyID'),
                  ProjectID:Wind.config.actitem,
                  Tag:'Property',
            }; 
              // console.log(urlData)
            $.get(apipath,urlData,function(result){ 
                // console.log(result)
                  if(result.state.return=="true"){ 
                        var str1='';
                        for(var i=0;i<result.data.length;i++){
                              if(result.data[i].AttrType.split('_')[0] == 'G'){
                                str1+='<span class="sx" id="'+result.data[i]._id+'" name="'+result.data[i].AttrType+'" name1="'+result.data[i].AttrName+'" style="padding:8px 5px;background:#FCEBFB;border-radius:3px !important;cursor:pointer;margin-left:5px;border:1px solid #935190;color:#935190;"><img src="addG.png" style="width:16px;height:16px;" />  添加'+result.data[i].AttrName+'</span>'
                              }else{
                                str1+='<span class="sx" id="'+result.data[i]._id+'" name="'+result.data[i].AttrType+'" name1="'+result.data[i].AttrName+'" style="padding:8px 5px;background:#56B396;border-radius:3px !important;cursor:pointer;margin-left:5px;"><img src="addT.png" style="width:16px;height:16px;" />  添加'+result.data[i].AttrName+'</span>'
                              }
                              

                        }
                        $('#addsx').html(str1)
                        $('.sx').click(function(){
                              // console.log($(this).attr('id'))
                              var zcName = $(this).attr('name1');
                              var zcNum = $(this).attr('name');

                              if($('.jstree-clicked').length == 0){
                                    var timestamp = (new Date()).getTime();
                                    var parent = '#';
                                    createNode(parent, timestamp, zcName, "last",zcNum);
                              }else if($('.jstree-clicked').length >1){
                                    alert('只能选择一个节点！')
                              }else{
                                    var timestamp = (new Date()).getTime();
                                    var parent = $('.jstree-clicked').parent('li').attr('id');
                                    createNode(parent, timestamp, zcName, "last",zcNum);
                              }
                        })
                        function createNode(parent_node, new_node_id, new_node_text, position,type) {
                              $('#jstree1').jstree('create_node', parent_node, { "text":new_node_text, "id":new_node_id,"attr":{"type":type}}, position, false, false); 
                              daa.push({"text": new_node_text,"id": new_node_id,"parent":parent_node,"attr":{"type":type}})
                              // console.log(daa)
                        }
                  }
            })
      },
      triInfo: function(config,myApp) {
            $('#mainFrame').css('background','#F2F2F2')
            $("#mainFrame").empty();
            var sbase ='<div class="row" style="height:50px;line-height:50px;color:#9f9f9f;font-size:1em;margin:0;margin-top:-25px;">' + Wind.config.actProjectName + ' / 资产建模 /<span class="text1">录入模板</span></div>'
                  +'<div class="portlet-body form" style="">'
                  +'  <form   id="baseauth_form" role="form" class="form-horizontal" style="height:100%;background:#ffffff;">'
                  +'      <div class="form-body"  style="height:100%;">'
                  +'          <div id="t_wrap" class="row" style="margin-top:-20px;">'
                  +'          <div style="width:100%;height:100%;background:#fff;float:right;">'
                  // +'                <div id="textD" style="width:96%;height:50px;line-height:50px;font-size:2rem;margin-left:2%;border-bottom:1px solid #e6e6e6;">  资产信息表</div>'
                  +'                <div id="attr_wrap" style="width:100%;overflow-y:auto">'
                  // +'<div class="input-group input-medium date date-picker" data-date-format="yyyy-mm-dd" style="float:right; margin-right:10px;">'
                  //                         +'          <input id="" style="background-color:#ffffff;margin-top:8px;" type="text" class="form-control" readonly>'
                  //                         +'          <span class="input-group-btn">'
                  //                         +'          <button style="background-color:#ffffff;" class="btn default" type="button">'
                  //                         +'                <i class="fa fa-calendar"></i>'
                  //                         +'          </button>'
                  //                         +'          </span>'
                  //                         +'     </div>'
                  +'                </div>'
                  +'          </div>'
                  +'          </div>'
                  +'      </div>  '               
                  +'    </form>'
                  +'</div>';
            $('#mainFrame').empty(); 
            $('#mainFrame').html(sbase);
            var c = document.body.clientHeight;
            $('.form').css({'height': (c-120) +'px'})
            $('#t_wrap').css({'height': ($('.form').height()-80) +'px'})
            // $('#jstree1').css({'height': ($('#t_wrap').height()-120) +'px'})
            $('#attr_wrap').css({'height': $('#t_wrap').height() +'px'})
            var modal1 = '<div class="modal fade" id="fade_con" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style=""> '
                  +'      <div class="modal-content">'
                  +'          <div class="modal-header" style="">'
                  +'                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>'
                  +'                <h4 class="modal-title" style="font-weight:bold;">修改字段信息</h4>'
                  +'           </div>'
                  +'           <div class="modal-body">'
                  +'          <div class="form-group" style="width:100%;margin-left:0;height:34px;">'
                  +'              <label  class="control-label col-md-3 col-md-offset-1" style="color:#888888">字段名称：</label>'
                  +'              <div class="col-md-5"><input type="text" id="tName1_1" class="form-control inp" > </div> '
                  +'         </div>'
                  +'          <div class="form-group" style="width:100%;margin-left:0;height:34px;margin-top:10px;">'
                  +'              <label  class="control-label col-md-3 col-md-offset-1" style="color:#888888">英文名称：</label>'
                  +'              <div class="col-md-5"><input type="text" id="eName1_1" class="form-control inp" > </div> '
                  +'         </div>'
                  +'          <div class="form-group" style="width:100%;margin-left:0;height:34px;margin-top:10px;">'
                  +'              <label  class="control-label col-md-3 col-md-offset-1" style="color:#888888">字段类型：</label>'
                  +'              <div class="col-md-5"><select type="text" id="stype1_1" class="form-control inp" >'
                  +'                  <option name="String">字符串</option>'
                  +'                  <option name="Number">数字</option>'
                  +'                  <option name="Date">日期</option>'
                  +'                  <option name="Buffer">缓冲区</option>'
                  +'                  <option name="Boolean">布尔值</option>'
                  +'                  <option name="Mixed">混合</option>'
                  +'                  <option name="Objectid">对象ID</option>'
                  +'                  <option name="Array">数组</option>'
                  +'              </select> </div> '
                  +'         </div>'
                  +'          <div class="form-group" style="width:100%;margin-left:0;height:34px;margin-top:10px;">'
                  +'              <label  class="control-label col-md-3 col-md-offset-1" style="color:#888888">是否必填：</label>'
                  +'              <div class="col-md-5" style="margin-top:7px;"><input type="radio" id="isNull1_1" class="" name="isnull">是<input type="radio" id="" style="margin-left:20px;" name="isnull">否</div> '
                  +'         </div>'
                  +'           </div>'
                  +'           <div class="modal-footer" style="border:none">'
                  +'                <button type="button" id="updateAddr" class="btn"  style="float:left;margin-left:30%;width:40%;background:#21B694;color:#fff;border-radius: 17px !important;margin-top:-30px;">确定修改</button>'
                  +'            </div>'
                  +'        </div> '
                  +'    </div>';
            var tab =modal1+'<ul id="mb_p" class="nav nav-tabs nav-justified">'
                +'    </ul>'
                +'  <div class="tab-content" id="mb_con">'
                +'  </div>';
            $('#attr_wrap').html(tab);
            var str='';
            var str1='';
            // console.log(G_mb)
            for(var i=0;i<G_mb.length;i++){
              if(G_mb[i].AttrType.split('_')[0] != 'G'){
                str+='<li><a href="#'+G_mb[i].AttrType+'con" data-toggle="tab">'+G_mb[i].AttrName+'</a></li>';
                str1+=' <div class="tab-pane" id="'+G_mb[i].AttrType+'con">'
                    +'  </div>';
              }
            }
            $('#mb_p').html(str);
            $('#mb_p').children('li').eq(0).addClass('active');
            $('#mb_con').html(str1);
            $('#mb_con .tab-pane').eq(0).addClass('active');
            for(var i=0;i<G_mb.length;i++){
              if(G_mb[i].AttrType.split('_')[0] != 'G'){
                  str2='       <div class="form-group" style="width:100%;margin-left:0;">'
                      +'              <label  class="control-label col-md-3 col-md-offset-1" style="color:#888888">字段名称：</label>'
                      +'              <div class="col-md-5"><input type="text" id="'+G_mb[i].AttrType+'1" class="form-control inp" > </div> '
                      +'         </div>'
                      +'          <div class="form-group" style="width:100%;margin-left:0;">'
                      +'              <label  class="control-label col-md-3 col-md-offset-1" style="color:#888888">英文名称：</label>'
                      +'              <div class="col-md-5"><input type="text" id="'+G_mb[i].AttrType+'2" class="form-control inp" > </div> '
                      +'         </div>'
                      +'          <div class="form-group" style="width:100%;margin-left:0;">'
                      +'              <label  class="control-label col-md-3 col-md-offset-1" style="color:#888888">字段类型：</label>'
                      +'              <div class="col-md-5"><select type="text" id="'+G_mb[i].AttrType+'3" class="form-control inp" >'
                      +'                  <option name="String">字符串</option>'
                      +'                  <option name="Number">数字</option>'
                      +'                  <option name="Date">日期</option>'
                      +'                  <option name="Buffer">缓冲区</option>'
                      +'                  <option name="Boolean">布尔值</option>'
                      +'                  <option name="Mixed">混合</option>'
                      +'                  <option name="Objectid">对象ID</option>'
                      +'                  <option name="Array">数组</option>'
                      +'              </select> </div> '
                      +'         </div>'
                      +'          <div class="form-group" style="width:100%;margin-left:0;">'
                      +'              <label  class="control-label col-md-3 col-md-offset-1" style="color:#888888">是否必填：</label>'
                      +'              <div class="col-md-5" style="margin-top:7px;"><input type="radio" id="'+G_mb[i].AttrType+'4" class="" name="'+G_mb[i].AttrType+'_4">是<input type="radio" id="" style="margin-left:20px;" name="'+G_mb[i].AttrType+'_4">否</div> '
                      +'         </div>'
                      +'          <div class="form-group" style="width:100%;margin-left:0;">'
                      +'              <label  class="control-label col-md-3 col-md-offset-1" style="color:#888888"></label>'
                      +'              <div id="'+G_mb[i].AttrType+'add" name="'+G_mb[i].AttrType+'" name1="'+G_mb[i].AttrName+'" id1="'+G_mb[i].AttrID+'" class="col-md-3" style="background:#21B694;height:34px;line-height:34px;text-align:center;color:#fff;cursor:pointer;">添加字段</div> '
                      +'         </div>'
                      +'          <div class="form-group" style="width:100%;margin-left:0;">'
                      +'              <table class="table table-striped table-hover col-md-12" style="text-align:center;">'
                      +'                  <thead>'
                      +'                        <tr id="daytr" style="background:#21B694;color:#fff;height:40px;line-height:40px;">'
                      +'                              <td>字段名称</td>'
                      +'                              <td>英文名称</td>'
                      +'                              <td>字段类型</td>'
                      +'                              <td>是否必填</td>'
                      +'                              <td>编辑</td>'
                      +'                       </tr>'
                      +'                  </thead>'
                      +'                  <tbody id="'+G_mb[i].AttrType+'G"></tbody>'
                      +'              </table> '
                      +'         </div>';
                  $('#'+G_mb[i].AttrType+'con').html(str2);
                  myApp.getaddrG(myApp,config,G_mb[i].AttrID,G_mb[i].AttrName,G_mb[i].AttrType); 
                }
            }
            for(var i=0;i<G_mb.length;i++){
              if(G_mb[i].AttrType.split('_')[0] != 'G'){
                $('#'+G_mb[i].AttrType+'add').unbind('click');
                  $('#'+G_mb[i].AttrType+'add').click(function(){
                        var zcNum = $(this).attr('name')
                        var zcName=$(this).attr('name1');
                        var id=$(this).attr('id1');
                        var IsNull;
                        if($('#'+zcNum+'4').attr('checked') == 'checked'){
                              IsNull =true;
                        }else{
                              IsNull =false;  
                      
                        }
                        var apipath = "/api/wind/postCommAttr"; 
                        var urlData = {
                              CompanyID:sessionStorage.getItem('CompanyID'),
                              ProjectID:Wind.config.actitem,
                              Tag:"Property",
                              AttrID:id,
                              AttrName:zcName,
                              NodeType:zcNum,
                              StrName:$('#'+zcNum+'1').val(),
                              StrField:$('#'+zcNum+'2').val(),
                              Type:$('#'+zcNum+'3 option:selected').attr('name'),
                              IsNull:IsNull
                        };
                        $.post(apipath,urlData,function(result){ 
                              if(result.state.return=="true"){ 
                                    alert('添加成功！');
                                    myApp.getaddrG(myApp,config,id,zcName,zcNum)
                              }else{  
                                  // console.log(result)
                              }
                        })
                  })
              }
            }
      },
      getaddrG:function(myApp,config,AttrID,AttrName,NodeType){
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
                  if(result.state.return=="true"){ 
                        // console.log(result.data);
                        var str = '';
                        for(var i=0;i<result.data[0].Data.length;i++){
                              var isnull;
                              if(result.data[0].Data[i].IsNull == true){
                                    isnull ='是'
                              }else{
                                    isnull ='否' 
                              }
                              str+='<tr id="'+result.data[0].Data[i]._id+'">'
                                    +'      <td>'+result.data[0].Data[i].StrName+'</td>'
                                    +'      <td>'+result.data[0].Data[i].StrField+'</td>'
                                    +'      <td>'+result.data[0].Data[i].Type+'</td>'
                                    +'      <td>'+isnull+'</td>'
                                    +'      <td><a style="color:#5a5a5a;" class="delattrG"><i class="fa fa-times" style="color:#FF3F3F;"></i> 删除</a><a class="reviseattrG" style="margin-left:10px;color:#5a5a5a;"><i class="fa fa-retweet" style="color:#38A127;"></i> 修改</a></td>'
                                    +'</tr>'
                        }
                        $('#'+result.data[0].NodeType+'G').html(str);
                        $('.reviseattrG').click(function(){
                              $('#fade_con').modal('show');
                              $('#tName1_1').val($(this).parents('tr').find('td').eq(0).text())
                              $('#eName1_1').val($(this).parents('tr').find('td').eq(1).text())
                              $("#stype1_1").find("option[name='"+$(this).parents('tr').find('td').eq(2).text()+"']").attr("selected",true);
                              if($(this).parents('tr').find('td').eq(3).text() == '是'){
                                    $('#isNull1_1').attr('checked','checked')
                              }else{
                                    $('#isNull1_1').siblings('input').attr('checked','checked')
                              }
                              var id = $(this).parents('tr').attr('id')
                              $('#updateAddr').click(function(){
                                    myApp.updata(myApp,config,AttrID,AttrName,NodeType,id)
                              })
                        })
                        $('.delattrG').click(function(){
                              var id = $(this).parents('tr').attr('id');
                              var apipath = "/api/wind/delCommAttr"; 
                              var urlData = {
                                    CompanyID:sessionStorage.getItem('CompanyID'),
                                    ProjectID:Wind.config.actitem,
                                    Tag:"Property",
                                    AttrID:AttrID,
                                    AttrName:AttrName,
                                    NodeType:NodeType,
                                    id:id
                              }; 
                              $.post(apipath,urlData,function(result){ 
                                    if(result.state.return=="true"){ 
                                          alert('删除成功！');
                                          myApp.getaddrG(myApp,config,AttrID,AttrName,NodeType)
                                    }else{  
                                          console.log(result)
                                    }
                              })
                        })
                  }else{
                        console.log(result)
                  }
            })
      },
      updata:function(myApp,config,AttrID,AttrName,NodeType,id){
            var IsNull;
            if($('#isNull1_1').attr('checked') == 'checked'){
                  IsNull =true;
            }else{
                  IsNull =false;  
        
            }
            var apipath = "/api/wind/updateCommAttr"; 
            var urlData = {
                  CompanyID:sessionStorage.getItem('CompanyID'),
                  ProjectID:Wind.config.actitem,
                  Tag:"Property",
                  AttrID:AttrID,
                  AttrName:AttrName,
                  NodeType:NodeType,
                  StrName:$('#tName1_1').val(),
                  StrField:$('#eName1_1').val(),
                  Type:$('#stype1_1 option:selected').attr('name'),
                  IsNull:IsNull,
                  id:id
            }; 
            $.post(apipath,urlData,function(result){ 
                  if(result.state.return=="true"){ 
                        $('#fade_con').modal('hide');
                        myApp.getaddrG(myApp,config,AttrID,AttrName,NodeType)
                  }else{
                        console.log(result)
                  }
            })
      },
      loadDevTree: function(myApp,config,d) {  //所有对树的操作必须在树加载完成后处理
            var core_data = { "core" : {  
                     "check_callback" : true,
                        
                     "data" : d
                     },"plugins" : [
                        'changed',"wholerow"  
                     ]};
            // console.log(core_data)
            $('#Equipment_3_jstree').jstree("destroy");
            $('#Equipment_3_jstree').jstree(core_data )
            .on("changed.jstree", function (e, data) {
                  myApp.doSelectNode1(config,myApp,data);
            });
             
      },
      forInfo: function(config,myApp) {
            $('#mainFrame').css('background','#F2F2F2')
            $("#mainFrame").empty();
            var sbase ='<div class="row" style="height:50px;line-height:50px;color:#9f9f9f;font-size:1em;margin:0;margin-top:-25px;">' + Wind.config.actProjectName + ' / 资产建模 /<span class="text1">维护模板</span></div>'
                  +'<div class="portlet-body form" style="">'
                  +'  <form   id="baseauth_form" role="form" class="form-horizontal" style="height:100%;background:#ffffff;">'
                  +'      <div class="form-body"  style="height:100%;">'
                  +'          <div id="t_wrap" class="row" style="margin-top:-20px;">'
                  +'          <div style="width:100%;height:100%;background:#fff;float:right;">'
                  // +'                <div id="textD" style="width:96%;height:50px;line-height:50px;font-size:2rem;margin-left:2%;border-bottom:1px solid #e6e6e6;">  资产信息表</div>'
                  +'                <div id="attr_wrap" style="width:100%;overflow-y:auto">'
                  // +'<div class="input-group input-medium date date-picker" data-date-format="yyyy-mm-dd" style="float:right; margin-right:10px;">'
                  //                         +'          <input id="" style="background-color:#ffffff;margin-top:8px;" type="text" class="form-control" readonly>'
                  //                         +'          <span class="input-group-btn">'
                  //                         +'          <button style="background-color:#ffffff;" class="btn default" type="button">'
                  //                         +'                <i class="fa fa-calendar"></i>'
                  //                         +'          </button>'
                  //                         +'          </span>'
                  //                         +'     </div>'
                  +'                </div>'
                  +'          </div>'
                  +'          </div>'
                  +'      </div>  '               
                  +'    </form>'
                  +'</div>';
            $('#mainFrame').empty(); 
            $('#mainFrame').html(sbase);
            var c = document.body.clientHeight;
            $('.form').css({'height': (c-120) +'px'})
            $('#t_wrap').css({'height': ($('.form').height()-80) +'px'})
            // $('#jstree1').css({'height': ($('#t_wrap').height()-120) +'px'})
            $('#attr_wrap').css({'height': $('#t_wrap').height() +'px'})
            var modal1 = '<div class="modal fade" id="fade_con" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style=""> '
                  +'      <div class="modal-content">'
                  +'          <div class="modal-header" style="">'
                  +'                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>'
                  +'                <h4 class="modal-title" style="font-weight:bold;">修改字段信息</h4>'
                  +'           </div>'
                  +'           <div class="modal-body">'
                  +'          <div class="form-group" style="width:100%;margin-left:0;height:34px;">'
                  +'              <label  class="control-label col-md-3 col-md-offset-1" style="color:#888888">字段名称：</label>'
                  +'              <div class="col-md-5"><input type="text" id="tName1_1" class="form-control inp" > </div> '
                  +'         </div>'
                  +'          <div class="form-group" style="width:100%;margin-left:0;height:34px;margin-top:10px;">'
                  +'              <label  class="control-label col-md-3 col-md-offset-1" style="color:#888888">英文名称：</label>'
                  +'              <div class="col-md-5"><input type="text" id="eName1_1" class="form-control inp" > </div> '
                  +'         </div>'
                  +'          <div class="form-group" style="width:100%;margin-left:0;height:34px;margin-top:10px;">'
                  +'              <label  class="control-label col-md-3 col-md-offset-1" style="color:#888888">字段类型：</label>'
                  +'              <div class="col-md-5"><select type="text" id="stype1_1" class="form-control inp" >'
                  +'                  <option name="String">字符串</option>'
                  +'                  <option name="Number">数字</option>'
                  +'                  <option name="Date">日期</option>'
                  +'                  <option name="Buffer">缓冲区</option>'
                  +'                  <option name="Boolean">布尔值</option>'
                  +'                  <option name="Mixed">混合</option>'
                  +'                  <option name="Objectid">对象ID</option>'
                  +'                  <option name="Array">数组</option>'
                  +'              </select> </div> '
                  +'         </div>'
                  +'          <div class="form-group" style="width:100%;margin-left:0;height:34px;margin-top:10px;">'
                  +'              <label  class="control-label col-md-3 col-md-offset-1" style="color:#888888">是否必填：</label>'
                  +'              <div class="col-md-5" style="margin-top:7px;"><input type="radio" id="isNull1_1" class="" name="isnull">是<input type="radio" id="" style="margin-left:20px;" name="isnull">否</div> '
                  +'         </div>'
                  +'           </div>'
                  +'           <div class="modal-footer" style="border:none">'
                  +'                <button type="button" id="updateAddr" class="btn"  style="float:left;margin-left:30%;width:40%;background:#21B694;color:#fff;border-radius: 17px !important;margin-top:-30px;">确定修改</button>'
                  +'            </div>'
                  +'        </div> '
                  +'    </div>';
            var tab =modal1+'<ul id="mb_p" class="nav nav-tabs nav-justified">'
                +'    </ul>'
                +'  <div class="tab-content" id="mb_con">'
                +'  </div>';
            $('#attr_wrap').html(tab);
            var str='';
            var str1='';
            // console.log(G_mb)
            for(var i=0;i<G_mb.length;i++){
              if(G_mb[i].AttrType.split('_')[0] != 'G'){
                str+='<li><a href="#'+G_mb[i].AttrType+'con" data-toggle="tab">'+G_mb[i].AttrName+'</a></li>';
                str1+=' <div class="tab-pane" id="'+G_mb[i].AttrType+'con">'
                   +'  </div>'
              }
            }
            $('#mb_p').html(str);
            $('#mb_p').children('li').eq(0).addClass('active');
            $('#mb_con').html(str1);
            $('#mb_con .tab-pane').eq(0).addClass('active');
            var str2='';
            for(var i=0;i<G_mb.length;i++){
              if(G_mb[i].AttrType.split('_')[0] != 'G'){
                  str2='       <div class="form-group" style="width:100%;margin-left:0;">'
                          +'              <label  class="control-label col-md-3 col-md-offset-1" style="color:#888888">字段名称：</label>'
                          +'              <div class="col-md-5"><input type="text" id="'+G_mb[i].AttrType+'1" class="form-control inp" > </div> '
                          +'         </div>'
                          +'          <div class="form-group" style="width:100%;margin-left:0;">'
                          +'              <label  class="control-label col-md-3 col-md-offset-1" style="color:#888888">英文名称：</label>'
                          +'              <div class="col-md-5"><input type="text" id="'+G_mb[i].AttrType+'2" class="form-control inp" > </div> '
                          +'         </div>'
                          +'          <div class="form-group" style="width:100%;margin-left:0;">'
                          +'              <label  class="control-label col-md-3 col-md-offset-1" style="color:#888888">字段类型：</label>'
                          +'              <div class="col-md-5"><select type="text" id="'+G_mb[i].AttrType+'3" class="form-control inp" >'
                          +'                  <option name="String">字符串</option>'
                          +'                  <option name="Number">数字</option>'
                          +'                  <option name="Date">日期</option>'
                          +'                  <option name="Buffer">缓冲区</option>'
                          +'                  <option name="Boolean">布尔值</option>'
                          +'                  <option name="Mixed">混合</option>'
                          +'                  <option name="Objectid">对象ID</option>'
                          +'                  <option name="Array">数组</option>'
                          +'              </select> </div> '
                          +'         </div>'
                          +'          <div class="form-group" style="width:100%;margin-left:0;">'
                          +'              <label  class="control-label col-md-3 col-md-offset-1" style="color:#888888">是否必填：</label>'
                          +'              <div class="col-md-5" style="margin-top:7px;"><input type="radio" id="'+G_mb[i].AttrType+'4" class="" name="'+G_mb[i].AttrType+'_4">是<input type="radio" id="" style="margin-left:20px;" name="'+G_mb[i].AttrType+'_4">否</div> '
                          +'         </div>'
                          +'          <div class="form-group" style="width:100%;margin-left:0;">'
                          +'              <label  class="control-label col-md-3 col-md-offset-1" style="color:#888888"></label>'
                          +'              <div id="'+G_mb[i].AttrType+'add" name="'+G_mb[i].AttrType+'" name1="'+G_mb[i].AttrName+'" id1="'+G_mb[i].AttrID+'" class="col-md-3" style="background:#21B694;height:34px;line-height:34px;text-align:center;color:#fff;cursor:pointer;">添加字段</div> '
                          +'         </div>'
                          +'          <div class="form-group" style="width:100%;margin-left:0;">'
                          +'              <table class="table table-striped table-hover col-md-12" style="text-align:center;">'
                          +'                  <thead>'
                          +'                        <tr id="daytr" style="background:#21B694;color:#fff;height:40px;line-height:40px;">'
                          +'                              <td>字段名称</td>'
                          +'                              <td>英文名称</td>'
                          +'                              <td>字段类型</td>'
                          +'                              <td>是否必填</td>'
                          +'                              <td>编辑</td>'
                          +'                       </tr>'
                          +'                  </thead>'
                          +'                  <tbody id="'+G_mb[i].AttrType+'G"></tbody>'
                          +'              </table> '
                          +'         </div>';
                  $('#'+G_mb[i].AttrType+'con').html(str2)
                  var id1 = parseInt(G_mb[i].AttrID)+1;
                  var zcName1=G_mb[i].AttrName+'维护';
                  var zcNum1 =G_mb[i].AttrType+'_wh';
                  myApp.getaddrG1(myApp,config,id1,zcName1,zcNum1)
              }
            }
            for(var i=0;i<G_mb.length;i++){
              if(G_mb[i].AttrType.split('_')[0] != 'G'){
                  $('#'+G_mb[i].AttrType+'add').unbind('click');
                  $('#'+G_mb[i].AttrType+'add').click(function(){
                        var zcNum = $(this).attr('name');
                        var zcName=$(this).attr('name1');
                        var id=parseInt($(this).attr('id1'))+1;
                        var zcNum1 =$(this).attr('name')+'_wh';
                        var zcName1=$(this).attr('name1')+'维护';
                        var IsNull;
                        if($('#'+zcNum+'4').attr('checked') == 'checked'){
                              IsNull =true;
                        }else{
                              IsNull =false;  
                        }
                        var apipath = "/api/wind/postCommAttr"; 
                        var urlData = {
                              CompanyID:sessionStorage.getItem('CompanyID'),
                              ProjectID:Wind.config.actitem,
                              Tag:"Property",
                              AttrID:id,
                              AttrName:zcName1,
                              NodeType:zcNum1,
                              StrName:$('#'+zcNum+'1').val(),
                              StrField:$('#'+zcNum+'2').val(),
                              Type:$('#'+zcNum+'3 option:selected').attr('name'),
                              IsNull:IsNull
                        }; 
                // console.log(urlData)
                        $.post(apipath,urlData,function(result){ 
                              if(result.state.return=="true"){ 
                                    alert('添加成功！');
                                    myApp.getaddrG1(myApp,config,id,zcName1,zcNum1)
                              }
                        })
                  })
              }
            }
      },
      getaddrG1:function(myApp,config,AttrID,AttrName,NodeType){
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
                  if(result.state.return=="true"){ 
                        var str = '';
                        if(result.data.length>0){
                              for(var i=0;i<result.data[0].Data.length;i++){
                                    var isnull;
                                    if(result.data[0].Data[i].IsNull == true){
                                          isnull ='是'
                                    }else{
                                          isnull ='否' 
                                    }
                                    str+='<tr id="'+result.data[0].Data[i]._id+'">'
                                        +'      <td>'+result.data[0].Data[i].StrName+'</td>'
                                        +'      <td>'+result.data[0].Data[i].StrField+'</td>'
                                        +'      <td>'+result.data[0].Data[i].Type+'</td>'
                                        +'      <td>'+isnull+'</td>'
                                        +'      <td><a style="color:#5a5a5a;" class="delattrG"><i class="fa fa-times" style="color:#FF3F3F;"></i> 删除</a><a class="reviseattrG" style="margin-left:10px;color:#5a5a5a;"><i class="fa fa-retweet" style="color:#38A127;"></i> 修改</a></td>'
                                        +'</tr>'
                              }
                              var st = result.data[0].NodeType.split('_wh')[0];
                              $('#'+st+'G').html(str);
                              $('.reviseattrG').click(function(){
                                    $('#fade_con').modal('show');
                              // console.log()
                                    $('#tName1_1').val($(this).parents('tr').find('td').eq(0).text())
                                    $('#eName1_1').val($(this).parents('tr').find('td').eq(1).text())
                              // $('#stype1_1 option:selected').attr('name',)
                                    $("#stype1_1").find("option[name='"+$(this).parents('tr').find('td').eq(2).text()+"']").attr("selected",true);
                                    if($(this).parents('tr').find('td').eq(3).text() == '是'){
                                          $('#isNull1_1').attr('checked','checked')
                                    }else{
                                          $('#isNull1_1').siblings('input').attr('checked','checked')
                                    }
                                    var id = $(this).parents('tr').attr('id')
                                    $('#updateAddr').unbind('click');
                                    $('#updateAddr').click(function(){
                                          myApp.updata1(myApp,config,AttrID,AttrName,NodeType,id)
                                    })
                              })
                              $('.delattrG').click(function(){
                                    var id = $(this).parents('tr').attr('id');
                                    var apipath = "/api/wind/delCommAttr"; 
                                    var urlData = {
                                          CompanyID:sessionStorage.getItem('CompanyID'),
                                          ProjectID:Wind.config.actitem,
                                          Tag:"Property",
                                          AttrID:AttrID,
                                          AttrName:AttrName,
                                          NodeType:NodeType,
                                          id:id
                                    }; 
                                    $.post(apipath,urlData,function(result){ 
                                          if(result.state.return=="true"){ 
                                                alert('删除成功！');
                                                myApp.getaddrG1(myApp,config,AttrID,AttrName,NodeType);
                                          }else{
                                                console.log(result)
                                          }
                                    })
                              })
                        } 
                  }else{
                    console.log(result)
                  }
            })
      },
      updata1:function(myApp,config,AttrID,AttrName,NodeType,id){
            var IsNull;
            if($('#isNull1_1').attr('checked') == 'checked'){
                  IsNull =true;
            }else{
                IsNull =false;  
            
            }
            var apipath = "/api/wind/updateCommAttr"; 
            var urlData = {
                  CompanyID:sessionStorage.getItem('CompanyID'),
                  ProjectID:Wind.config.actitem,
                  Tag:"Property",
                  AttrID:AttrID,
                  AttrName:AttrName,
                  NodeType:NodeType,
                  StrName:$('#tName1_1').val(),
                  StrField:$('#eName1_1').val(),
                  Type:$('#stype1_1 option:selected').attr('name'),
                  IsNull:IsNull,
                  id:id
            }; 
            $.post(apipath,urlData,function(result){ 
                  if(result.state.return=="true"){ 
                        $('#fade_con').modal('hide');
                        myApp.getaddrG1(myApp,config,AttrID,AttrName,NodeType);
                  }else{
                        console.log(result)
                  }
            })
      },
      loadDevTree1: function(myApp,config,d) {  //所有对树的操作必须在树加载完成后处理
            var core_data = { "core" : {  
                     "check_callback" : true,
                        
                     "data" : d
                     },"plugins" : [
                        'changed',"wholerow"  
                     ]};
            // console.log(core_data)
            $('#Equipment_4_jstree').jstree("destroy");
            $('#Equipment_4_jstree').jstree(core_data )
            .on("changed.jstree", function (e, data) {
                  myApp.doSelectNode2(config,myApp,data);
            });
             
      },
      // doSelectNode2:function(config,myApp,data){
      //       var title = data.node.data.title.slice(0,2)
      //       if(title == 'SC'){
      //             $('.text1').text(data.node.text+'新生信息') 
      //             var table ='           <table class="table table-striped table-hover" id="sample_1" style="margin-top:10px;height:30%;overflow-y:auto;overflow-x:hidden;">'
      //             +'                        <thead>'
      //             +'                            <tr id="daytr" style="background:#21B694;color:#fff;text-align:center;height:40px;line-height:40px;">'
      //             +'                                  <td>学生姓名</td>'
      //             +'                                  <td>身份证号</td>'
      //             +'                                  <td>性别</td>'
      //             +'                                  <td>现身高</td>'
      //             +'                                  <td>现体重</td>'
      //             +'                                  <td>园服尺寸</td>'
      //             +'                                  <td>父亲姓名</td>'
      //             +'                                  <td>父亲电话</td>'
      //             +'                                  <td>母亲姓名</td>'
      //             +'                                  <td>母亲电话</td>'
      //             +'                                  <td>编辑</td>'
      //             +'                            </tr>'
      //             +'                        </thead>'
      //             +'                  <tbody id="table-d" >'
      //             +'                  </tbody>'
      //             +'              </table>';
      //             $('.info_wrap').html(table);
      //             $.get("/api/sihs/selectStudent.js",{ProjectID:Wind.config.actitem,selectType:2,schoolNum:data.node.data.title,classNum:''},function(rt){
      //                   if(rt.state.return=="true"){
      //                         // console.log(rt.data)
      //                         var str='';
      //                         for(var i=0;i<rt.data.length;i++){
      //                               var gander ='';
      //                               if(rt.data[i].gander == 1){
      //                                     gander='男'
      //                               }else if(rt.data[i].gander == 2){
      //                                     gander='女'
      //                               }
      //                               str+='<tr style="text-align:center;">'
      //                                 +'        <td>'+rt.data[i].Stu_Name+'</td>'
      //                                 +'        <td>'+rt.data[i].Stu_ID+'</td>'
      //                                 +'        <td>'+gander+'</td>'
      //                                 +'        <td>'+rt.data[i].s_hight+'</td>'
      //                                 +'        <td>'+rt.data[i].s_wight+'</td>'
      //                                 +'        <td>'+rt.data[i].s_size+'</td>'
      //                                 +'        <td>'+rt.data[i].Stu_F_one+'</td>'
      //                                 +'        <td>'+rt.data[i].Stu_F_M1+'</td>'
      //                                 +'        <td>'+rt.data[i].Stu_F_two+'</td>'
      //                                 +'        <td>'+rt.data[i].Stu_F_M2+'</td>'
      //                                 +'      <td><a style="color:#5a5a5a;" class="delnew"><i class="fa fa-times" style="color:#FF3F3F;"></i> 删除</a><a class="revisenew" style="margin-left:10px;color:#5a5a5a;"><i class="fa fa-retweet" style="color:#38A127;"></i> 修改</a></td>'
      //                                 +'  </tr>'
      //                         }
      //                         $('#table-d').html(str)
      //                         myApp.dataTable_1(config,myApp)
      //                   }
      //             });
      //       }
      // },
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
                        "search": "搜索:",
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
                $('#sample_1_tools > li > a.tool-action').unbind('click').on('click', function() {
                  var action = $(this).attr('data-action');
                  oTable1.DataTable().button(action).trigger();
                });
                $('.dataTables_filter').css({ 'margin-right':'15px'});
            // });
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
                        "search": "搜索:",
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