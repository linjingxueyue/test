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
var G_list1=[];
Wind.Analyhis = function(container, config) { 
    var initChartover1 = function() {
         
    };
	var initTableOver1 = function () { 
 
    };
    return {
        init: function() {
            // this.container = container;
            var cfg = config ? config : {};
            var myApp  = new  Wind.Analyhis();
            myApp.loadInfo(cfg,myApp);                   

        },
        loadInfo: function(config,myApp) {
            $('#mainFrame').empty();
            $('.page-content').css({'background':'#fffcf7'})
           // var apipath = "../api/wind/getDeviceTree.js?";
           // var urlData = {ProjectID:Wind.config.actitem};
           // $.get(apipath,urlData,function(rt){
                // var d  =  JSON_getDeviceTree.data;
                // myApp.loadDevTree( myApp,config,d);
                var mytools=' <div class="page-bar" style="margin-left:-20px; border-bottom:2px solid #178CFC; margin-bottom:20px;">'
                    +'          <ul class="page-breadcrumb">'
                    +'              <li>'
                    +'                  <a href="#" style="color:#8f8f8f;">氢枫能源</a>&nbsp;'
                    +'                  <span>/</span>'
                    +'              </li>'
                    +'              <li>'
                    +'                  &nbsp;<span>历史数据</span>&nbsp;'
                    // +'                  <span>/</span>'
                    +'              </li>'
                    +'          </ul> '
                    +'      </div>  ';
                var modal = '<div class="modal fade" id="fade_param" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="top:20%;"> '
                    +'      <div class="modal-content">'
                    +'          <div class="modal-header">'
                    +'                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>'
                    +'                <h4 class="modal-title" style="font-weight:bold;">勾选参数</h4>'
                    +'            </div>'
                    +'            <div class="modal-body" id="paramlist" style="height:200px;overflow-y:auto">'
                    
                    +'             </div>'
                    +'            <div class="modal-footer" style="border:none;">'
                    +'                <button type="button" id="param_save" class="btn blue"  style="float:left;margin-left:30%;width:40%;background:#1B8BF9;color:#fff;border-radius: 17px !important;margin-top:0px;">确定</button>'
                    +'            </div>'
                    +'        </div> '
                    +'    </div>'
                var strtable =modal+'<div class="row">'
                    +'        <div class="col-md-12">'
                    +'          <div class="portlet-body">'
                    +'               <div class="row">'
                    +'                   <div class="col-md-6">'
                    +'                      <label style="float:left;width:12%;height:34px;line-height:34px;font-size:13px;text-align:center;">温度</label>'
                    +'                      <input id="wdMin" style="float:left;width:5%;height:34px;" value="0">'
                    +'                      <label style="float:left;height:34px;line-height:34px;">-</label>'
                    +'                      <input id="wdMax" style="float:left;width:5%;height:34px;" value="60">'
                    +'                      <label style="float:left;width:12%;height:34px;line-height:34px;font-size:13px;text-align:center;">压力</label>'
                    +'                      <input id="ylMin" style="float:left;width:5%;height:34px;" value="0">'
                    +'                      <label style="float:left;height:34px;line-height:34px;">-</label>'
                    +'                      <input id="ylMax" style="float:left;width:5%;height:34px;" value="40">'
                    +'                      <label style="float:left;width:12%;height:34px;line-height:34px;font-size:13px;text-align:center;">流量</label>'
                    +'                      <input id="jqMin" style="width:5%;height:34px;float:left;" value="0">'
                    +'                      <label style="float:left;height:34px;line-height:34px;">-</label>'
                    +'                      <input id="jqMax" style="width:5%;height:34px;float:left;" value="3">'
                    +'                      <span id="setMax" style="float:left;margin-left:10px;display:inline-block;width:100px;height:30px;background:#008CD7;color:#fff;margin-top:20px;line-height: 30px;text-align: center;cursor:pointer;margin-top:2px;">设定区间</span>'
                    +'                   </div>'
                    +'      <div class="col-md-6" style="">'
                    +'         <span id="DaySearch" style="float:right;margin-right:20px;display:inline-block;width:60px;height:30px;background:#008CD7;color:#fff;margin-top:20px;line-height: 30px;text-align: center;cursor:pointer;margin-top:0;">查询</span>'
                    +'         <div class="input-group date form_meridian_datetime"  style="width:50%;float:right;margin-right:15px;">'
                    +'              <input id="day_start" type="text" size="16" class="form-control">'
                    +'              <span class="input-group-btn">'
                    +'                  <button class="btn default date-reset" type="button">'
                    +'                      <i class="fa fa-times"></i>'
                    +'                  </button>'
                    +'                  <button class="btn default date-set" type="button">'
                    +'                      <i class="fa fa-calendar"></i>'
                    +'                  </button>'
                    +'              </span>'
                    +'          </div>'
                    +'         <span href="#fade_param" data-toggle="modal"  style="float:right;margin-right:20px;display:inline-block;width:80px;height:30px;background:#008CD7;color:#fff;margin-top:20px;line-height: 30px;text-align: center;cursor:pointer;margin-top:0;">参数勾选</span>'
                    // +'         <div style="float:right;margin-top:5px;margin-right:10px;">到</div>'
                    // +'         <div class="input-group input-medium date date-picker" data-date-format="yyyy-mm-dd" style="float:right;margin-right:10px;">'
                    // +'             <input id="day_start" style="background-color:#ffffff;" type="text" class="form-control" readonly>'
                    // +'             <span class="input-group-btn">'
                    // +'                 <button style="background-color:#ffffff;" class="btn default" type="button">'
                    // +'                     <i class="fa fa-calendar"></i>'
                    // +'                 </button>'
                    // +'             </span>'
                    // +'         </div>'
                    // +'         <div style="float:right;margin-top:5px;margin-right:10px;">从</div>'      
                    +'      </div>' 
                    // +'                   <div style="width:50%;padding-left:15px;padding-right:15px;">'
                    // +'                      <label style="float:left;width:15%;height:34px;line-height:34px;font-size:15px;text-align:center;">Min:温度</label>'
                    
                    // +'                      <label style="float:left;width:15%;height:34px;line-height:34px;font-size:15px;text-align:center;">压力</label>'
                    
                    // +'                      <label style="float:left;width:25%;height:34px;line-height:34px;font-size:15px;text-align:center;">加氢注流量</label>'
                   
                    // +'                      <span id="setMax" style="float:left;margin-left:10px;display:inline-block;width:100px;height:30px;background:#008CD7;color:#fff;margin-top:20px;line-height: 30px;text-align: center;cursor:pointer;margin-top:0;">设定区间</span>'
                    // +'                   </div>'
                    // +'                   <div class="col-md-6">'
                    // +'                   </div>'
                    +'               </div>'
                    +'              <div id="chart" style="height: 500px;width:100%;margin-top:15px;">'
                    +'              </div>'
                    +'              <div id="chart1" style="height: 500px;width:100%;margin-top:15px;display:none">'
                    +'              </div>'
                    +'          </div>'
                    +'        </div>'
                    +'    <div>';
                $('#mainFrame').html(mytools+strtable);
                myApp.datepickers(config,myApp);
                G_list=[];
                G_list1=[];
                // $.get("http://122.14.192.147:8000/ppi/wind/getDevTemplet.js",{ProjectID:Wind.config.actitem},function(rt){
                //     if(rt.state.return=="true"){
                //         var c = rt.data.info;
                //         // console.log(rt)
                //         for(var i=0;i<c.length;i++){
                //             if(c[i].szName == '浙大中控03' || c[i].szName == '浙大中控04'){
                //                 for(var j=0;j<c[i].Values.length;j++){
                //                     if(c[i].Values[j].bLockFlag > 0){
                //                         G_list.push(c[i].Values[j])
                //                     }
                //                 }
                //             }
                          
                //         }
                //     }
                // });
                $.ajax({
                    type: "get",
                    url: "http://122.14.192.147:8000/ppi/wind/getDevTemplet.js",
                    async:false,
                    data: {ProjectID:Wind.config.actitem},
                    dataType: "json",
                    success: function(rt){
                        if(rt.state.return=="true"){
                            var c = rt.data.info;
                            // console.log(rt)
                            for(var i=0;i<c.length;i++){
                                if(c[i].szName == '浙大中控03' || c[i].szName == '浙大中控04'){
                                    for(var j=0;j<c[i].Values.length;j++){
                                        if(c[i].Values[j].bLockFlag > 0){
                                            G_list.push(c[i].Values[j])
                                        }
                                    }
                                }
                              
                            }
                        }
                    }
                });
                // var curDate = new Date();
                var startdata = new Date().getTime();
                // var startdata = new Date(curDate.getTime() - 1*24*60*60*1000);
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
                var start = format(startdata);
                $('#day_start').val(start);
                $('#setMax').click(function(){
                    var date = $('#day_start').val().split(' ')[2];
                    if(date == "上午"){
                        date = $('#day_start').val().split(' ')[0]+' '+$('#day_start').val().split(' ')[1]
                         // date = date.substring(0,19);    
                        date = date.replace(/-/g,'/'); 
                        timestamp = new Date(date).getTime();
                    }else if(date == "下午"){
                        var c = parseInt($('#day_start').val().split(' ')[1].split(':')[0])+12;
                        date = $('#day_start').val().split(' ')[0]+' '+c+':'+$('#day_start').val().split(' ')[1].split(':')[1];
                        date = date.replace(/-/g,'/'); 
                        timestamp = new Date(date).getTime();
                    }else{
                        // var c = parseInt($('#day_start').val().split(' ')[1].split(':')[0]);
                        date = $('#day_start').val();
                        date = date.replace(/-/g,'/'); 
                        timestamp = new Date(date).getTime();
                    }
                    myApp.getecharts1(myApp,config,timestamp,$('#wdMax').val(),$('#ylMax').val(),$('#jqMax').val(),$('#wdMin').val(),$('#ylMin').val(),$('#jqMin').val())
                })   
                // setTimeout(function(){
                    var str = '';
                    for(var i=0;i<G_list.length;i++){
                        str+='            <div style="width: 100%;height: 30px;">'
                        +'                    <div style="float: left;width:10%;height: 30px;line-height: 30px;font-size: 1rem;text-align: center;"></div>'
                        +'                    <div style="float: left;width:90%;height: 30px;line-height: 30px;font-size: 1rem;">'
                        +'                        <div class=" control-label" style="width:20%;float:left"><input  type="checkbox" style="float:right;margin-top:5px;" id="'+G_list[i].szOPCValue+'" name="param" /></div>'
                        +'                        <label class=" control-label" style="width:70%;float:left;">&nbsp;&nbsp;'+G_list[i].szOPCValue+' '+G_list[i].szName+'</label>'
                        +'                    </div>'
                        +'                </div>'
                    }
                    $('#paramlist').html(str);
                    $('#RTU1_TT_501').attr('checked','checked');
                    $('#RTU1_PT_903').attr('checked','checked');
                    $('#RTU1_FT_903LJ').attr('checked','checked');
                    G_list1.push('RTU1_TT_501','RTU1_PT_903','RTU1_FT_903LJ')
                // },700)
                // $('#setMax').click()
                // setTimeout(function(){
                    // console.log($('#wdMax').val())
                    
                    myApp.getecharts1(myApp,config,startdata,$('#wdMax').val(),$('#ylMax').val(),$('#jqMax').val(),$('#wdMin').val(),$('#ylMin').val(),$('#jqMin').val())
                // },800)
                $('#param_save').click(function(){
                    G_list1=[];
                    var para = []
                    $("input:checkbox[name='param']:checked").each(function(){
                        para.push($(this).attr('id'))
                    })
                    if(para.length>6){
                        alert('参数不能超过6条，请重新勾选！')
                    }else{
                        G_list1 = para;
                        $('.close').click()
                        var date = $('#day_start').val().split(' ')[2];
                        var timestamp;
                        if(date == "上午"){
                            date = $('#day_start').val().split(' ')[0]+' '+$('#day_start').val().split(' ')[1]
                             // date = date.substring(0,19);    
                            date = date.replace(/-/g,'/'); 
                            timestamp = new Date(date).getTime();
                        }else if(date == "下午"){
                            var c = parseInt($('#day_start').val().split(' ')[1].split(':')[0])+12;
                            date = $('#day_start').val().split(' ')[0]+' '+c+':'+$('#day_start').val().split(' ')[1].split(':')[1];
                            date = date.replace(/-/g,'/'); 
                            timestamp = new Date(date).getTime();
                        }else{
                            // var c = parseInt($('#day_start').val().split(' ')[1].split(':')[0]);
                            date = $('#day_start').val();
                            date = date.replace(/-/g,'/'); 
                            timestamp = new Date(date).getTime();
                        }
                        myApp.getecharts1(myApp,config,timestamp,$('#wdMax').val(),$('#ylMax').val(),$('#jqMax').val(),$('#wdMin').val(),$('#ylMin').val(),$('#jqMin').val())
                    }
                    // console.log(para)
                })
                $('#DaySearch').click(function(){
                    var date = $('#day_start').val().split(' ')[2];
                    var timestamp;
                    if(date == "上午"){
                        date = $('#day_start').val().split(' ')[0]+' '+$('#day_start').val().split(' ')[1]
                         // date = date.substring(0,19);    
                        date = date.replace(/-/g,'/'); 
                        timestamp = new Date(date).getTime();
                    }else if(date == "下午"){
                        var c = parseInt($('#day_start').val().split(' ')[1].split(':')[0])+12;
                        date = $('#day_start').val().split(' ')[0]+' '+c+':'+$('#day_start').val().split(' ')[1].split(':')[1];
                        date = date.replace(/-/g,'/'); 
                        timestamp = new Date(date).getTime();
                    }else{
                        // var c = parseInt($('#day_start').val().split(' ')[1].split(':')[0]);
                        date = $('#day_start').val();
                        date = date.replace(/-/g,'/'); 
                        timestamp = new Date(date).getTime();
                    }
                    myApp.getecharts1(myApp,config,timestamp,$('#wdMax').val(),$('#ylMax').val(),$('#jqMax').val(),$('#wdMin').val(),$('#ylMin').val(),$('#jqMin').val())
                })
            $.get("../api/wind/getDeviceTree.js?",{ProjectID:Wind.config.actitem},function(rt){
                if(rt.state.return == "true"){
                    var d = [];
                    for(var i=0;i<rt.data.length;i++){
                        if(rt.data[i].parent == '#'){
                            d.push(rt.data[i])
                        }
                    }
                    myApp.loadDevTree(myApp,config,d);
                    // realdata(d);
                }
            });
           // });
        },
        getecharts1:function(myApp,config,startdata,wdMax,ylMax,jqMax,wdMin,ylMin,jqMin){
            var colors = [ '#E68885', '#556671', '#A0C6CB', '#F2BC28', '#C5D9E9','#B2CEBC', '#EBBE7B', '#E2D1CB', '#AEAFB2', '#9DA8AF','#E7EDF1', '#DA8583', '#84929D'];
            var dom=document.getElementById('chart');
            var myChart = echarts.init(dom);
                    var option1 = {
                        toolbox: {
                            show : true,
                            feature : {
                                mark : {show: true},
                                dataView : {show: true, readOnly: false},
                                magicType : {show: true, type: ['line', 'bar']},
                                restore : {show: true},
                                saveAsImage : {show: true}
                            },
                            x:'left'
                        },
                        // backgroundColor:'#f9f1d9',
                        tooltip : {
                            trigger: 'item',
                            axisPointer:{
                                show: true,
                                type : 'cross',
                                lineStyle: {
                                    type : 'dashed',
                                    width : 1
                                }
                            },
                            formatter : function (params) {
                                return params.value[2] + '<br/>'
                                    +'数值 : '+params.value[1]+' '+'&nbsp;时间 : '+params.value[0]+'<br/>'
                                    // +'最大值 : '+params.value[3]+'  '+'&nbsp;时间 : '+params.value[4]+'<br/>'
                                    // +'最小值 : '+params.value[5]+'  '+'&nbsp;时间 : '+params.value[6]+'<br/>'
                            }
                        },
                        dataZoom: [{
                            type: 'inside',
                            start: 0,
                            end: 80
                        }, {
                            start: 0,
                            end: 10,
                            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                            handleSize: '80%',
                            handleStyle: {
                                color: '#fff',
                                shadowBlur: 3,
                                shadowColor: 'rgba(0, 0, 0, 0.6)',
                                shadowOffsetX: 2,
                                shadowOffsetY: 2
                            }
                        }],
                        legend : {
                            orient: 'vertical', // 'vertical'
                            x: 'right', // 'center' | 'left' | {number},
                            y: 'top', // 'center' | 'bottom' | {number}
                            // // right: "15%",
                            // padding: -3,  
                            itemGap: 5, 
                            itemWidth:15,itemHeight:8,textStyle:{fontSize:8},
                            // data:[]
                        },
                        grid: {
                            top:'15%',
                            left:'15%',
                            right : '20%',
                            y2: 80
                        },
                        xAxis : [
                            {
                                type : 'time',
                                splitNumber:10,
                                name : '日期'
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                name : '单位:℃',
                                min : wdMin,
                                max : wdMax,
                                // offset : 45,
                                position : 'left',
                                axisLabel : {
                                    formatter : '{value}'
                                },
                                axisLine : {
                                    lineStyle : {
                                        color : colors[1]
                                    }
                                }
                            },
                            {
                                type : 'value',
                                name : '单位:MPa',
                                min : ylMin,
                                max : ylMax,
                                offset : 60,
                                position : 'left',
                                axisLabel : {
                                    formatter : '{value}'
                                },
                                axisLine : {
                                    lineStyle : {
                                        color : colors[0]
                                    }
                                }
                            },
                            
                            {
                                type : 'value',
                                name : '单位:kg/min',
                                min : jqMin,
                                max : jqMax,
                                offset : 120,
                                position : 'left',
                                axisLabel : {
                                    formatter : '{value}'
                                },
                                axisLine : {
                                    lineStyle : {
                                        color : colors[2]
                                    }
                                }
                            }
                        ],
                    };
                    option1.legend.data=[];
                    option1.series=[];
                    var arre=[];
                    var data1=[],data2=[];
                    var arr5 = [];
                    for(var i=0;i<G_list.length;i++){
                        for(var j=0;j<G_list1.length;j++){
                            if(G_list[i].szOPCValue == G_list1[j]){
                                arr5.push(G_list[i])
                            }
                        } 
                    }
                    for(var i=0;i<arr5.length;i++){
                            var arr3 =[];
                            var c = arr5[i].szOPCValue+' '+arr5[i].szName;
                            option1.legend.data.push(c);
                            $.ajax({
                                url : '/api/apply/hisdata.js',
                                type : 'get',
                                async: false,//使用同步的方式,true为异步方式
                                data : {dev:[{devid: 'qfny-yh-001',timestamp:startdata,param:arr5[i].szOPCValue,hours:12}]},//这里使用json对象
                                success : function(result){
                                    var data = result.data.dev[0].hdatas;
                                    var arr1 = [];
                                    // console.log(result)
                                    for(var j=0;j<data.length;j++){
                                        if(data[j].length != 0){
                                            arr1.push(data[j])
                                        }
                                    }

                                    if(arr1.length >0){
                                        // getechart(arr1,id)
                                        arr3.push({text:result.data.dev[0].param,data:arr1})
                                    }
                                }
                            });
                            $.ajax({
                                url : '/api/apply/hisdata.js',
                                type : 'get',
                                async: false,//使用同步的方式,true为异步方式
                                data : {dev:[{devid: 'qfny-yh-002',timestamp:startdata,param:arr5[i].szOPCValue,hours:12}]},//这里使用json对象
                                success : function(result){
                                    var data = result.data.dev[0].hdatas;
                                    var arr2 = [];
                                    for(var j=0;j<data.length;j++){
                                        if(data[j].length != 0){
                                            arr2.push(data[j])
                                        }
                                    }

                                    if(arr2.length >0){
                                        // getechart(arr1,id)
                                        arr3.push({text:result.data.dev[0].param,data:arr2})
                                    }
                                }
                            });
                            for(var j=0;j<arr3.length;j++){
                                // console.log(data3[j][0])
                                var name2;
                                name2 = c;
                                var ind;
                                if(arr3[j].text.split('_')[0] == 'PIT' || arr3[j].text.split('_')[0] == 'PT' || arr3[j].text.split('_')[1] == 'PIT' || arr3[j].text.split('_')[1] == 'PT'){
                                    ind = 1
                                }else if(arr3[j].text.split('_')[0] == 'TT' || arr3[j].text.split('_')[1] == 'TT'){
                                    ind =0
                                }else{
                                    ind =2
                                }
                                // console.log(ind)
                                var obj={
                                    name: name2,
                                    type: 'line',
                                    // showAllSymbol: true,
                                    // symbol:'circle',//拐点样式
                                    symbolSize: 1,//拐点大小
                                    yAxisIndex:ind,
                                    data:(function () {
                                        var d = [];
                                        for(var q=0;q<arr3[j].data.length;q++){
                                            var date=format(arr3[j].data[q].time);
                                            var value=arr3[j].data[q].value;
                                            d.push([date,value,name2]);
                                        }
                                        myChart.setOption(option1);
                                        window.onresize = function(){
                                            myChart.resize();
                                        } 
                                        return d;
                                    })()
                                };
                                option1.series.push(obj);
                                myChart.setOption(option1);
                            }
                        }
        },
        getecharts2:function(myApp,config,startdata,wdMax,ylMax,jqMax,wdMin,ylMin,jqMin){
            var colors = [ '#E68885', '#556671', '#A0C6CB', '#F2BC28', '#C5D9E9','#B2CEBC', '#EBBE7B', '#E2D1CB', '#AEAFB2', '#9DA8AF','#E7EDF1', '#DA8583', '#84929D'];
            var dom=document.getElementById('chart');
            var myChart = echarts.init(dom);
            var option1 = {
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {show: true, type: ['line', 'bar']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    },
                    x:'left'
                },
                // backgroundColor:'#f9f1d9',
                tooltip : {
                    trigger: 'item',
                    axisPointer:{
                        show: true,
                        type : 'cross',
                        lineStyle: {
                            type : 'dashed',
                            width : 1
                        }
                    },
                    formatter : function (params) {
                        return params.value[2] + '<br/>'
                            +'数值 : '+params.value[1]+' '+'&nbsp;时间 : '+params.value[0]+'<br/>'
                            // +'最大值 : '+params.value[3]+'  '+'&nbsp;时间 : '+params.value[4]+'<br/>'
                            // +'最小值 : '+params.value[5]+'  '+'&nbsp;时间 : '+params.value[6]+'<br/>'
                    }
                },
                dataZoom: [{
                    type: 'inside',
                    start: 0,
                    end: 80
                }, {
                    start: 0,
                    end: 10,
                    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '80%',
                    handleStyle: {
                        color: '#fff',
                        shadowBlur: 3,
                        shadowColor: 'rgba(0, 0, 0, 0.6)',
                        shadowOffsetX: 2,
                        shadowOffsetY: 2
                    }
                }],
                legend : {
                    orient: 'vertical', // 'vertical'
                    x: 'right', // 'center' | 'left' | {number},
                    y: 'top', // 'center' | 'bottom' | {number}
                    // // right: "15%",
                    // padding: -3,  
                    itemGap: 5, 
                    itemWidth:15,itemHeight:8,textStyle:{fontSize:8},
                    // data:[]
                },
                grid: {
                    top:'15%',
                    left:'15%',
                    right : '20%',
                    y2: 80
                },
                xAxis : [
                    {
                        type : 'time',
                        splitNumber:10,
                        name : '日期'
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name : '单位:℃',
                        min : wdMin,
                        max : wdMax,
                        // offset : 45,
                        position : 'left',
                        axisLabel : {
                            formatter : '{value}'
                        },
                        axisLine : {
                            lineStyle : {
                                color : colors[1]
                            }
                        }
                    },
                    {
                        type : 'value',
                        name : '单位:MPa',
                        min : ylMin,
                        max : ylMax,
                        offset : 60,
                        position : 'left',
                        axisLabel : {
                            formatter : '{value}'
                        },
                        axisLine : {
                            lineStyle : {
                                color : colors[0]
                            }
                        }
                    },
                    
                    {
                        type : 'value',
                        name : '单位:kg/min',
                        min : jqMin,
                        max : jqMax,
                        offset : 120,
                        position : 'left',
                        axisLabel : {
                            formatter : '{value}'
                        },
                        axisLine : {
                            lineStyle : {
                                color : colors[2]
                            }
                        }
                    }
                ],
            };
            option1.legend.data=[];
            option1.series=[];
            var arre=[];
            var data1=[],data2=[];
            var arr5 = [];
            for(var i=0;i<G_list.length;i++){
                for(var j=0;j<G_list1.length;j++){
                    if(G_list[i].szOPCValue == G_list1[j]){
                        arr5.push(G_list[i])
                    }
                } 
            }
            for(var i=0;i<arr5.length;i++){
                    var arr3 =[];
                    var c = arr5[i].szOPCValue+' '+arr5[i].szName;
                    option1.legend.data.push(c);
                    $.ajax({
                        url : '/api/apply/hisdata.js',
                        type : 'get',
                        async: false,//使用同步的方式,true为异步方式
                        data : {dev:[{devid: 'qfny-yh-003',timestamp:startdata,param:arr5[i].szOPCValue,hours:12}]},//这里使用json对象
                        success : function(result){
                            var data = result.data.dev[0].hdatas;
                            var arr1 = [];
                            for(var j=0;j<data.length;j++){
                                if(data[j].length != 0){
                                    arr1.push(data[j])
                                }
                            }

                            if(arr1.length >0){
                                // getechart(arr1,id)
                                arr3.push({text:result.data.dev[0].param,data:arr1})
                            }
                        }
                    });
                    for(var j=0;j<arr3.length;j++){
                        // console.log(data3[j][0])
                        var name2;
                        name2 = c;
                        var ind;
                        if(arr3[j].text.split('_')[0] == 'PIT' || arr3[j].text.split('_')[0] == 'PT' || arr3[j].text.split('_')[1] == 'PIT' || arr3[j].text.split('_')[1] == 'PT'){
                            ind = 1
                        }else if(arr3[j].text.split('_')[0] == 'TT' || arr3[j].text.split('_')[1] == 'TT'){
                            ind =0
                        }else{
                            ind =2
                        }
                        // console.log(ind)
                        var obj={
                            name: name2,
                            type: 'line',
                            // showAllSymbol: true,
                            // symbol:'circle',//拐点样式
                            symbolSize: 1,//拐点大小
                            yAxisIndex:ind,
                            data:(function () {
                                var d = [];
                                for(var q=0;q<arr3[j].data.length;q++){
                                    var date=format(arr3[j].data[q].time);
                                    var value=arr3[j].data[q].value;
                                    d.push([date,value,name2]);
                                }
                                myChart.setOption(option1);
                                window.onresize = function(){
                                    myChart.resize();
                                } 
                                return d;
                            })()
                        };
                        option1.series.push(obj);
                        myChart.setOption(option1);
                    }
            }
        },
        getecharts3:function(myApp,config,startdata,wdMax,ylMax,jqMax,wdMin,ylMin,jqMin){
            var colors = [ '#E68885', '#556671', '#A0C6CB', '#F2BC28', '#C5D9E9','#B2CEBC', '#EBBE7B', '#E2D1CB', '#AEAFB2', '#9DA8AF','#E7EDF1', '#DA8583', '#84929D'];
            var dom=document.getElementById('chart');
            var myChart = echarts.init(dom);
            var option1 = {
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {show: true, type: ['line', 'bar']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    },
                    x:'left'
                },
                // backgroundColor:'#f9f1d9',
                tooltip : {
                    trigger: 'item',
                    axisPointer:{
                        show: true,
                        type : 'cross',
                        lineStyle: {
                            type : 'dashed',
                            width : 1
                        }
                    },
                    formatter : function (params) {
                        return params.value[2] + '<br/>'
                            +'数值 : '+params.value[1]+' '+'&nbsp;时间 : '+params.value[0]+'<br/>'
                            // +'最大值 : '+params.value[3]+'  '+'&nbsp;时间 : '+params.value[4]+'<br/>'
                            // +'最小值 : '+params.value[5]+'  '+'&nbsp;时间 : '+params.value[6]+'<br/>'
                    }
                },
                dataZoom: [{
                    type: 'inside',
                    start: 0,
                    end: 80
                }, {
                    start: 0,
                    end: 10,
                    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '80%',
                    handleStyle: {
                        color: '#fff',
                        shadowBlur: 3,
                        shadowColor: 'rgba(0, 0, 0, 0.6)',
                        shadowOffsetX: 2,
                        shadowOffsetY: 2
                    }
                }],
                legend : {
                    orient: 'vertical', // 'vertical'
                    x: 'right', // 'center' | 'left' | {number},
                    y: 'top', // 'center' | 'bottom' | {number}
                    // // right: "15%",
                    // padding: -3,  
                    itemGap: 5, 
                    itemWidth:15,itemHeight:8,textStyle:{fontSize:8},
                    // data:[]
                },
                grid: {
                    top:'15%',
                    left:'15%',
                    right : '20%',
                    y2: 80
                },
                xAxis : [
                    {
                        type : 'time',
                        splitNumber:10,
                        name : '日期'
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name : '单位:℃',
                        min : wdMin,
                        max : wdMax,
                        // offset : 45,
                        position : 'left',
                        axisLabel : {
                            formatter : '{value}'
                        },
                        axisLine : {
                            lineStyle : {
                                color : colors[1]
                            }
                        }
                    },
                    {
                        type : 'value',
                        name : '单位:MPa',
                        min : ylMin,
                        max : ylMax,
                        offset : 60,
                        position : 'left',
                        axisLabel : {
                            formatter : '{value}'
                        },
                        axisLine : {
                            lineStyle : {
                                color : colors[0]
                            }
                        }
                    },
                    
                    {
                        type : 'value',
                        name : '单位:kg/min',
                        min : jqMin,
                        max : jqMax,
                        offset : 120,
                        position : 'left',
                        axisLabel : {
                            formatter : '{value}'
                        },
                        axisLine : {
                            lineStyle : {
                                color : colors[2]
                            }
                        }
                    }
                ],
            };
            option1.legend.data=[];
            option1.series=[];
            var arre=[];
            var data1=[],data2=[];
            var arr5 = [];
            for(var i=0;i<G_list.length;i++){
                for(var j=0;j<G_list1.length;j++){
                    if(G_list[i].szOPCValue == G_list1[j]){
                        arr5.push(G_list[i])
                    }
                } 
            }
            for(var i=0;i<arr5.length;i++){
                    var arr3 =[];
                    var c = arr5[i].szOPCValue+' '+arr5[i].szName;
                    option1.legend.data.push(c);
                    $.ajax({
                        url : '/api/apply/hisdata.js',
                        type : 'get',
                        async: false,//使用同步的方式,true为异步方式
                        data : {dev:[{devid: 'qfny-yh-004',timestamp:startdata,param:arr5[i].szOPCValue,hours:12}]},//这里使用json对象
                        success : function(result){
                            var data = result.data.dev[0].hdatas;
                            var arr1 = [];
                            // console.log(result)
                            for(var j=0;j<data.length;j++){
                                if(data[j].length != 0){
                                    arr1.push(data[j])
                                }
                            }

                            if(arr1.length >0){
                                // getechart(arr1,id)
                                arr3.push({text:result.data.dev[0].param,data:arr1})
                            }
                        }
                    });
                    // console.log(arr3)
                    for(var j=0;j<arr3.length;j++){
                        // console.log(data3[j][0])
                        var name2;
                        name2 = c;
                        var ind;
                        if(arr3[j].text.split('_')[0] == 'PIT' || arr3[j].text.split('_')[0] == 'PT' || arr3[j].text.split('_')[1] == 'PIT' || arr3[j].text.split('_')[1] == 'PT'){
                            ind = 1
                        }else if(arr3[j].text.split('_')[0] == 'TT' || arr3[j].text.split('_')[1] == 'TT'){
                            ind =0
                        }else{
                            ind =2
                        }
                        // console.log(ind)
                        var obj={
                            name: name2,
                            type: 'line',
                            // showAllSymbol: true,
                            // symbol:'circle',//拐点样式
                            symbolSize: 1,//拐点大小
                            yAxisIndex:ind,
                            data:(function () {
                                var d = [];
                                for(var q=0;q<arr3[j].data.length;q++){
                                    var date=format(arr3[j].data[q].time);
                                    var value=arr3[j].data[q].value;
                                    d.push([date,value,name2]);
                                }
                                myChart.setOption(option1);
                                window.onresize = function(){
                                    myChart.resize();
                                } 
                                return d;
                            })()
                        };
                        option1.series.push(obj);
                        myChart.setOption(option1);
                    }
            }
        },
        loadDevTree: function(myApp,config,d) {  //所有对树的操作必须在树加载完成后处理
            // console.log(d)
            var core_data = { "core" : { 	
                "check_callback" : true,               
                "data" : d
                },"plugins" : [
                'changed',"wholerow"  
                ]};
               $('#analyhis_jstree').jstree("destroy");
               $('#analyhis_jstree').jstree(core_data ).on("select_node.jstree", function (e,data) {
                   myApp.doSelectNode( myApp,config,data);
               });
        },  
        doSelectNode:function(myApp,config,data){
            if(data.node.parent == '#'){
                // var id=data.node.id;
                var mytools=' <div class="page-bar" style="margin-left:-20px; border-bottom:2px solid #178CFC; margin-bottom:20px;">'
                    +'          <ul class="page-breadcrumb">'
                    +'              <li>'
                    +'                  <a href="#" style="color:#8f8f8f;">氢枫能源</a>&nbsp;'
                    +'                  <span>/</span>'
                    +'              </li>'
                    +'              <li>'
                    +'                  &nbsp;<span>历史数据</span>&nbsp;'
                    +'                  <span>/</span>'
                    +'              </li>'
                    +'              <li>'
                    +'                  &nbsp;<span>'+data.node.text+'</span>'
                    +'              </li>'
                    +'          </ul> '
                    +'      </div>  '; 
                var modal = '<div class="modal fade" id="fade_param" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="top:20%;"> '
                    +'      <div class="modal-content">'
                    +'          <div class="modal-header">'
                    +'                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>'
                    +'                <h4 class="modal-title" style="font-weight:bold;">勾选参数</h4>'
                    +'            </div>'
                    +'            <div class="modal-body" id="paramlist" style="height:200px;overflow-y:auto">'
                    
                    +'             </div>'
                    +'            <div class="modal-footer" style="border:none;">'
                    +'                <button type="button" id="param_save" class="btn blue"  style="float:left;margin-left:30%;width:40%;background:#1B8BF9;color:#fff;border-radius: 17px !important;margin-top:0px;">确定</button>'
                    +'            </div>'
                    +'        </div> '
                    +'    </div>'     
                var strtable = modal+'<div class="row">'
                    +'        <div class="col-md-12">'
                    +'          <div class="portlet-body">'
                    +'               <div class="row">'
                   +'                   <div class="col-md-6">'
                    +'                      <label style="float:left;width:12%;height:34px;line-height:34px;font-size:13px;text-align:center;">温度</label>'
                    +'                      <input id="wdMin" style="float:left;width:5%;height:34px;" value="0">'
                    +'                      <label style="float:left;height:34px;line-height:34px;">-</label>'
                    +'                      <input id="wdMax" style="float:left;width:5%;height:34px;" value="60">'
                    +'                      <label style="float:left;width:12%;height:34px;line-height:34px;font-size:13px;text-align:center;">压力</label>'
                    +'                      <input id="ylMin" style="float:left;width:5%;height:34px;" value="0">'
                    +'                      <label style="float:left;height:34px;line-height:34px;">-</label>'
                    +'                      <input id="ylMax" style="float:left;width:5%;height:34px;" value="40">'
                    +'                      <label style="float:left;width:12%;height:34px;line-height:34px;font-size:13px;text-align:center;">流量</label>'
                    +'                      <input id="jqMin" style="width:5%;height:34px;float:left;" value="0">'
                    +'                      <label style="float:left;height:34px;line-height:34px;">-</label>'
                    +'                      <input id="jqMax" style="width:5%;height:34px;float:left;" value="3">'
                    +'                      <span id="setMax" style="float:left;margin-left:10px;display:inline-block;width:100px;height:30px;background:#008CD7;color:#fff;margin-top:20px;line-height: 30px;text-align: center;cursor:pointer;margin-top:2px;">设定区间</span>'
                    +'                   </div>'
                    +'      <div class="col-md-6" style="float:right;">'
                    +'         <span id="DaySearch" style="float:right;margin-right:20px;display:inline-block;width:60px;height:30px;background:#008CD7;color:#fff;margin-top:20px;line-height: 30px;text-align: center;cursor:pointer;margin-top:0;">查询</span>'
                    +'         <div class="input-group date form_meridian_datetime"  style="width:50%;float:right;margin-right:15px;">'
                    +'              <input id="day_start" type="text" size="16" class="form-control">'
                    +'              <span class="input-group-btn">'
                    +'                  <button class="btn default date-reset" type="button">'
                    +'                      <i class="fa fa-times"></i>'
                    +'                  </button>'
                    +'                  <button class="btn default date-set" type="button">'
                    +'                      <i class="fa fa-calendar"></i>'
                    +'                  </button>'
                    +'              </span>'
                    +'          </div>'
                    +'         <span href="#fade_param" data-toggle="modal"  style="float:right;margin-right:20px;display:inline-block;width:80px;height:30px;background:#008CD7;color:#fff;margin-top:20px;line-height: 30px;text-align: center;cursor:pointer;margin-top:0;">参数勾选</span>'
                    +'      </div>' 
                    // +'                   <div style="width:50%;padding-left:15px;padding-right:15px;">'
                    // +'                      <label style="float:left;width:15%;height:34px;line-height:34px;font-size:15px;text-align:center;">Min:温度</label>'
                    // +'                      <input id="wdMin" style="float:left;width:5%;height:34px;" value="0">'
                    // +'                      <label style="float:left;width:15%;height:34px;line-height:34px;font-size:15px;text-align:center;">压力</label>'
                    // +'                      <input id="ylMin" style="float:left;width:5%;height:34px;" value="0">'
                    // +'                      <label style="float:left;width:25%;height:34px;line-height:34px;font-size:15px;text-align:center;">加氢注流量</label>'
                    // +'                      <input id="jqMin" style="width:5%;height:34px;float:left;" value="0">'
                    // +'                      <span id="setMax" style="float:left;margin-left:10px;display:inline-block;width:100px;height:30px;background:#008CD7;color:#fff;margin-top:20px;line-height: 30px;text-align: center;cursor:pointer;margin-top:0;">设定区间</span>'
                    // +'                   </div>'
                    +'               </div>'
                    +'              <div id="chart" style="height: 500px;width:100%;margin-top:15px;">'
                    +'              </div>' 
                    +'              <div id="chart1" style="height: 500px;width:100%;margin-top:15px;display:none">'
                    +'              </div>'                  
                    +'          </div>'
                    +'        </div>'
                    +'    <div>';
                    $('#mainFrame').html(mytools+strtable);
                    myApp.datepickers(config,myApp);
                    G_list=[];
                    G_list1=[];
                    // $.get("http://122.14.192.147:8000/ppi/wind/getDevTemplet.js",{ProjectID:Wind.config.actitem},function(rt){
                    //     if(rt.state.return=="true"){
                    //         var c = rt.data.info;
                    //         for(var i=0;i<c.length;i++){
                          

                    //             if(data.node.text == '上海电驱动'){
                    //                 if(c[i].szName == '浙大中控03' || c[i].szName == '浙大中控04'){
                    //                     for(var j=0;j<c[i].Values.length;j++){
                    //                         if(c[i].Values[j].bLockFlag > 0){
                    //                             G_list.push(c[i].Values[j])
                    //                         }
                    //                     }
                    //                 }
                    //             }else if(data.node.text == '中山大洋站'){
                    //                 if(c[i].szName == '浙大中控05'){
                    //                     for(var j=0;j<c[i].Values.length;j++){
                    //                         if(c[i].Values[j].bLockFlag > 0){
                    //                             G_list.push(c[i].Values[j])
                    //                         }
                    //                     }
                    //                 }
                    //             }else if(data.node.text == '湖北十堰站'){
                    //                 if(c[i].szName == '湖北十堰'){
                    //                     for(var j=0;j<c[i].Values.length;j++){
                    //                         if(c[i].Values[j].bLockFlag > 0){
                    //                             G_list.push(c[i].Values[j])
                    //                         }
                    //                     }
                    //                 }
                    //             }
                    //         }
                    //     }
                    // });
                    $.ajax({
                        type: "get",
                        url: "http://122.14.192.147:8000/ppi/wind/getDevTemplet.js",
                        async:false,
                        data: {ProjectID:Wind.config.actitem},
                        dataType: "json",
                        success: function(rt){
                            if(rt.state.return=="true"){
                                var c = rt.data.info;
                                for(var i=0;i<c.length;i++){
                                    if(data.node.text == '上海电驱动'){
                                        if(c[i].szName == '浙大中控03' || c[i].szName == '浙大中控04'){
                                            for(var j=0;j<c[i].Values.length;j++){
                                                if(c[i].Values[j].bLockFlag > 0){
                                                    G_list.push(c[i].Values[j])
                                                }
                                            }
                                        }
                                    }else if(data.node.text == '中山大洋站'){
                                        if(c[i].szName == '浙大中控05'){
                                            for(var j=0;j<c[i].Values.length;j++){
                                                if(c[i].Values[j].bLockFlag > 0){
                                                    G_list.push(c[i].Values[j])
                                                }
                                            }
                                        }
                                    }else if(data.node.text == '湖北十堰站'){
                                        if(c[i].szName == '湖北十堰'){
                                            for(var j=0;j<c[i].Values.length;j++){
                                                if(c[i].Values[j].bLockFlag > 0){
                                                    G_list.push(c[i].Values[j])
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    });
                    // var curDate = new Date();
                    // var enddata = new Date(curDate.getTime());
                    // var startdata = new Date(curDate.getTime() - 1*24*60*60*1000);
                    var startdata = new Date().getTime();
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
                    var start = format(startdata);
                    $('#day_start').val(start);
                    // $.get("../api/wind/getDeviceTree.js?",{ProjectID:Wind.config.actitem},function(rt){
                    var Sel=document.getElementById('sel');
                    var dom=document.getElementById('chart');
                    var str = '';
                    for(var i=0;i<G_list.length;i++){
                        str+='            <div style="width: 100%;height: 30px;">'
                        +'                    <div style="float: left;width:10%;height: 30px;line-height: 30px;font-size: 1rem;text-align: center;"></div>'
                        +'                    <div style="float: left;width:90%;height: 30px;line-height: 30px;font-size: 1rem;">'
                        +'                        <div class=" control-label" style="width:20%;float:left"><input  type="checkbox" style="float:right;margin-top:5px;" id="'+G_list[i].szOPCValue+'" name="param" /></div>'
                        +'                        <label class=" control-label" style="width:70%;float:left;">&nbsp;&nbsp;'+G_list[i].szOPCValue+' '+G_list[i].szName+'</label>'
                        +'                    </div>'
                        +'                </div>'
                    }
                    $('#paramlist').html(str);
                    $('#RTU1_TT_501').attr('checked','checked');
                    $('#RTU1_PT_903').attr('checked','checked');
                    $('#RTU1_FT_903LJ').attr('checked','checked');
                    G_list1.push('RTU1_TT_501','RTU1_PT_903','RTU1_FT_903LJ')
                    // setTimeout(function(){
                    if(data.node.text == '上海电驱动'){
                        myApp.getecharts1(myApp,config,startdata,$('#wdMax').val(),$('#ylMax').val(),$('#jqMax').val(),$('#wdMin').val(),$('#ylMin').val(),$('#jqMin').val())
                    }else if(data.node.text == '中山大洋站'){
                        myApp.getecharts2(myApp,config,startdata,$('#wdMax').val(),$('#ylMax').val(),$('#jqMax').val(),$('#wdMin').val(),$('#ylMin').val(),$('#jqMin').val())
                    }else if(data.node.text == '湖北十堰站'){
                        myApp.getecharts3(myApp,config,startdata,$('#wdMax').val(),$('#ylMax').val(),$('#jqMax').val(),$('#wdMin').val(),$('#ylMin').val(),$('#jqMin').val())
                    }
                    $('#param_save').click(function(){
                    G_list1=[];
                    var para = []
                    $("input:checkbox[name='param']:checked").each(function(){
                        para.push($(this).attr('id'))
                    })
                    if(para.length>6){
                        alert('参数不能超过6条，请重新勾选！')
                    }else{
                        G_list1 = para;
                        $('.close').click()
                        var date = $('#day_start').val().split(' ')[2];
                        var timestamp;
                        if(date == "上午"){
                            date = $('#day_start').val().split(' ')[0]+' '+$('#day_start').val().split(' ')[1]
                             // date = date.substring(0,19);    
                            date = date.replace(/-/g,'/'); 
                            timestamp = new Date(date).getTime();
                        }else if(date == "下午"){
                            var c = parseInt($('#day_start').val().split(' ')[1].split(':')[0])+12;
                            date = $('#day_start').val().split(' ')[0]+' '+c+':'+$('#day_start').val().split(' ')[1].split(':')[1];
                            date = date.replace(/-/g,'/'); 
                            timestamp = new Date(date).getTime();
                        }else{
                            // var c = parseInt($('#day_start').val().split(' ')[1].split(':')[0]);
                            date = $('#day_start').val();
                            date = date.replace(/-/g,'/'); 
                            timestamp = new Date(date).getTime();
                        }
                        if(data.node.text == '上海电驱动'){
                            myApp.getecharts1(myApp,config,startdata,$('#wdMax').val(),$('#ylMax').val(),$('#jqMax').val(),$('#wdMin').val(),$('#ylMin').val(),$('#jqMin').val())
                        }else if(data.node.text == '中山大洋站'){
                            myApp.getecharts2(myApp,config,startdata,$('#wdMax').val(),$('#ylMax').val(),$('#jqMax').val(),$('#wdMin').val(),$('#ylMin').val(),$('#jqMin').val())
                        }else if(data.node.text == '湖北十堰站'){
                            myApp.getecharts3(myApp,config,startdata,$('#wdMax').val(),$('#ylMax').val(),$('#jqMax').val(),$('#wdMin').val(),$('#ylMin').val(),$('#jqMin').val())
                        }
                    }
                    // console.log(para)
                })    
                    // },800)
                    $('#DaySearch').click(function(){
                        var date = $('#day_start').val().split(' ')[2];
                        var timestamp;
                        if(date == "上午"){
                            date = $('#day_start').val().split(' ')[0]+' '+$('#day_start').val().split(' ')[1]
                             // date = date.substring(0,19);    
                            date = date.replace(/-/g,'/'); 
                            timestamp = new Date(date).getTime();
                        }else if(date == "下午"){
                            var c = parseInt($('#day_start').val().split(' ')[1].split(':')[0])+12;
                            date = $('#day_start').val().split(' ')[0]+' '+c+':'+$('#day_start').val().split(' ')[1].split(':')[1];
                            console.log(date)
                            date = date.replace(/-/g,'/'); 
                            timestamp = new Date(date).getTime();
                        }else{
                            // var c = parseInt($('#day_start').val().split(' ')[1].split(':')[0]);
                            date = $('#day_start').val();
                            date = date.replace(/-/g,'/'); 
                            timestamp = new Date(date).getTime();
                        }
                        if(data.node.text == '上海电驱动'){
                            myApp.getecharts1(myApp,config,timestamp,$('#wdMax').val(),$('#ylMax').val(),$('#jqMax').val(),$('#wdMin').val(),$('#ylMin').val(),$('#jqMin').val())
                        }else if(data.node.text == '中山大洋站'){
                            myApp.getecharts2(myApp,config,timestamp,$('#wdMax').val(),$('#ylMax').val(),$('#jqMax').val(),$('#wdMin').val(),$('#ylMin').val(),$('#jqMin').val())
                        }else if(data.node.text == '湖北十堰站'){
                            myApp.getecharts3(myApp,config,timestamp,$('#wdMax').val(),$('#ylMax').val(),$('#jqMax').val(),$('#wdMin').val(),$('#ylMin').val(),$('#jqMin').val())
                        }
                    })
                    $('#setMax').click(function(){
                        var date = $('#day_start').val().split(' ')[2];
                        var timestamp;
                        if(date == "上午"){
                            date = $('#day_start').val().split(' ')[0]+' '+$('#day_start').val().split(' ')[1]
                             // date = date.substring(0,19);    
                            date = date.replace(/-/g,'/'); 
                            timestamp = new Date(date).getTime();
                        }else if(date == "下午"){
                            var c = parseInt($('#day_start').val().split(' ')[1].split(':')[0])+12;
                            date = $('#day_start').val().split(' ')[0]+' '+c+':'+$('#day_start').val().split(' ')[1].split(':')[1];
                            date = date.replace(/-/g,'/'); 
                            timestamp = new Date(date).getTime();
                        }else{
                            // var c = parseInt($('#day_start').val().split(' ')[1].split(':')[0]);
                            date = $('#day_start').val();
                            date = date.replace(/-/g,'/'); 
                            timestamp = new Date(date).getTime();
                        }
                        if(data.node.text == '上海电驱动'){
                            myApp.getecharts1(myApp,config,timestamp,$('#wdMax').val(),$('#ylMax').val(),$('#jqMax').val(),$('#wdMin').val(),$('#ylMin').val(),$('#jqMin').val())
                        }else if(data.node.text == '中山大洋站'){
                            myApp.getecharts2(myApp,config,timestamp,$('#wdMax').val(),$('#ylMax').val(),$('#jqMax').val(),$('#wdMin').val(),$('#ylMin').val(),$('#jqMin').val())
                        }else if(data.node.text == '湖北十堰站'){
                            myApp.getecharts3(myApp,config,timestamp,$('#wdMax').val(),$('#ylMax').val(),$('#jqMax').val(),$('#wdMin').val(),$('#ylMin').val(),$('#jqMin').val())
                        }
                    })
                    // if(Sel.options[Sel.selectedIndex].text==='压力'){
                    //     var start = $('#day_start').val();
                    //     var end = $('#day_end').val();
                    //     $('#chart').css('display','block')
                    //     $('#chart1').css('display','none')
                    //     myApp.getecharts1(myApp,config,start,end)
                    // }else if(Sel.options[Sel.selectedIndex].text==='温度'){
                    //     var start = $('#day_start').val();
                    //     var end = $('#day_end').val();
                    //     $('#chart1').css('display','block')
                    //     $('#chart').css('display','none')
                    //     myApp.getecharts2(myApp,config,start,end)
                    // }
                    // });
                
            }
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
                        $(".form_meridian_datetime").datetimepicker({
                            isRTL: App.isRTL(),
                            format: "yyyy-mm-dd HH:ii p",
                            showMeridian: !0,
                            language: 'zh-cn',
                            autoclose: true,
                            pickerPosition: App.isRTL() ? "bottom-right": "bottom-left",
                            // todayBtn: !0
                        })
                        //$('body').removeClass("modal-open"); // fix bug when inline picker is used in modal
                    }
            
                    /* Workaround to restrict daterange past date select: http://stackoverflow.com/questions/11933173/how-to-restrict-the-selectable-date-ranges-in-bootstrap-datepicker */
                
                    // Workaround to fix datepicker position on window scroll
                    $( document ).scroll(function(){
                       $("#form_modal1 .form_datetime, #form_modal1 .form_advance_datetime, #form_modal1 .form_meridian_datetime").datetimepicker("place")
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