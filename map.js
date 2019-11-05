/**
 * Created by Administrator on 2014/9/6.
 增加系统入口页面，和平台系统入口配置、程序
 */
 
//
// var data = [];
// var totalPoints = 250;
// function getRandomData() {
// 	if (data.length > 0) data = data.slice(1);
// 	// do a random walk
// 	while (data.length < totalPoints) {
// 		var prev = data.length > 0 ? data[data.length - 1] : 50;
// 		var y = prev + Math.random() * 10 - 5;
// 		if (y < 0) y = 0;
// 		if (y > 100) y = 100;
// 		data.push(y);
// 	}
// 	// zip the generated y values with the x values
// 	var res = [];
// 	for (var i = 0; i < data.length; ++i) res.push([i, data[i]])
// 	return res;
// }


Wind.Map = function(container, config) { 
    var initChartover1 = function() {
         
    };
	var initTableOver1 = function () { 
 
    };
    return {
        init: function() {
            // this.container = container;
            var cfg = config ? config : {};
		  
            var myApp  = new  Wind.Map();
             myApp.secondInfo(cfg,myApp);
			$('.map_1').unbind('click');
            $('.map_1').bind('click',{handle: this},function(e){ 
				$(this).addClass("active open").siblings("li").removeClass("active open");
				 e.data.handle.loadInfo(cfg,myApp);  	
			});       
            $('.map_2').unbind('click');
            $('.map_2').bind('click',{handle: this},function(e){ 
                $(this).addClass("active open").siblings("li").removeClass("active open");
                 e.data.handle.secondInfo(cfg,myApp);     
            }); 
        },
        loadInfo:function(config,myApp){
            $('#mainFrame').empty();
            $('#mainFrame').css({"position":'relative'});
        	var body = '';
        	body  +='	<div id="mapPanel" >'
				+'          <div id="viewport">'
				+'	            <div id="layer1" style="background: url(resources/Images/map/chuanganwang.png) no-repeat;background-size:cover;width: 2000px; height: 1000px;">'
				+'	            </div>'
				+'	        </div>'
                +'	    </div>'
            $('#mainFrame').html(body);
            myApp.loadsec(config,myApp);
        },
        secondInfo:function(config,myApp){
            // 百度地图API功能
            $('#mainFrame').css('background','white')
            $('#mainFrame').html('<div id="baidu_map" style="margin:-25px -20px -10px"></div>');
			var height=document.getElementById('baidu_map');
            function realHeight(){
                height.style.height=$(window).height()+'px';
            }
            realHeight();
            $(window).on('resize', function () {
                realHeight();
            });
            var map = new BMap.Map("baidu_map");    // 创建Map实例
            var point = new BMap.Point(121.193525,31.349201);
			// var marker = new BMap.Marker(point);
			// var point1 = new BMap.Point(113.334388,22.582888);
			// var marker1 = new BMap.Marker(point1);
			// var point2 = new BMap.Point(110.884609,32.591654);
			// var marker2 = new BMap.Marker(point2);
			// map.addOverlay(marker);              // 将标注添加到地图中
			// map.addOverlay(marker1);
			// map.addOverlay(marker2);
			$.get("../api/wind/getDeviceTree.js?",{ProjectID:1013},function(rt){
				if(rt.state.return=="true"){
					var str = '';
					var str1='';
					for(var i=0;i<rt.data.length;i++){
						if(rt.data[i].parent == '#'){
							// G_data.push(rt.data[i])
							$.get('/api/wind/getGroup.js',{ProjectID:1013,GroupID:rt.data[i].id},function(result){
				                if(result.state.return=='true'){
				      				// data.push({value:[result.data.longitude,result.data.latitude,0],name:result.data.szName,attr:result.data.szAddress})
				      				
									//console.log(result)
									var point = new BMap.Point(result.data.longitude,result.data.latitude);
									var marker = new BMap.Marker(point);
									map.addOverlay(marker);       
									marker.addEventListener("click",function(e){
                                             
                                        //var infoWindow = new BMap.InfoWindow(red_points[n].code, opts);  // 创建信息窗口对象  
                                        
                                         //map.openInfoWindow(infoWindow, map.getCenter());  
                                        // alert(red_points[n].code)
                                        $.get("/api/jpms/getsta.js?",{ProjectID:3105},function(rt){
								            if(rt.state.return=="true"){
								              for(var i=0;i<rt.data.length;i++){
								                if(rt.data[i].station == result.data.szName){
								                  	var point = new BMap.Point(result.data.longitude,result.data.latitude);
			                                        var infoWindow = new BMap.InfoWindow("<h3 class='iw_poi_title' style='width:100%;text-align:center;margin:0px;'>"+result.data.szName+"</h3><table class='iw_poi_content' style='text-align:center;width:100%;margin-top:10px;'><tr style='height:100px;line-height:75px;'><td ><img src='mappic.png' style='width:70px;height:75px;' /></td><td style='font-weight:bold;font-size:16px;'>"+rt.data[i].state+"</td></tr><tr style=''><td colspan='2'>"+result.data.szAddress+"</td></tr></table>");  // 创建信息窗口对象 
			                                        map.openInfoWindow(infoWindow,point); //开启信息窗口  
								                }
								              }
								            }
								          });
                                        
                                    }); 

				                }
				            });
						}
					}
				}
			});
			// for(var i=0;i<G_data.length;i++){
				
	            
			// }
			// function _createTip_A1(){
   //                  // console.log(json);
   //                  // if(!json.top){
   //                  //     json.top = '';
   //                  // }
   //                  // if(!json.bottom){
   //                  //     json.bottom = '';
   //                  // }
   //                  // var str_c='';
   //                  // for(var i=0;i<json.cross;i++){
   //                  //  var j= i+1;
   //                  //  str_c+= "<p>管径"+j+": "+" "+"</p>";
   //                  // }
   //                var iw = new BMap.InfoWindow("<h3 class='iw_poi_title' style='width:100%;text-align:center;margin:0px;'>设备运行信息</h3><table class='iw_poi_content' style='text-align:center;width:100%;margin-top:10px;'><tr style='height:100px;line-height:75px;border-bottom:1px solid #e5e5e5;'><td ><img src='mappic.jpg' style='width:70px;height:75px;' /></td><td style='font-weight:bold;font-size:16px;'>上海电驱动站</td></tr><tr style='height:40px;line-height:40px;font-size:16px;'><td>正常</td><td style='color:#92EB13;font-size:20px;font-weight:bold;'>32</td></tr><tr style='height:40px;line-height:40px;font-size:16px;'><td>异常</td><td style='color:#FF440D;font-size:20px;font-weight:bold;'>2</td></tr></table>");

   //              return iw;
   //          };
			// marker.addEventListener('click',function(){
			// 	// $('.map_1').addClass("active open").siblings("li").removeClass("active open");
			// 	// myApp.loadInfo(config,myApp); 
			// 	var _iw = _createTip_A1();
			// 	this.openInfoWindow(_iw);  
			// });
			// function _createTip_A2(){
   //                  // console.log(json);
   //                  // if(!json.top){
   //                  //     json.top = '';
   //                  // }
   //                  // if(!json.bottom){
   //                  //     json.bottom = '';
   //                  // }
   //                  // var str_c='';
   //                  // for(var i=0;i<json.cross;i++){
   //                  //  var j= i+1;
   //                  //  str_c+= "<p>管径"+j+": "+" "+"</p>";
   //                  // }
   //                var iw = new BMap.InfoWindow("<h3 class='iw_poi_title' style='width:100%;text-align:center;margin:0px;'>设备运行信息</h3><table class='iw_poi_content' style='text-align:center;width:100%;margin-top:10px;'><tr style='height:100px;line-height:75px;border-bottom:1px solid #e5e5e5;'><td ><img src='mappic.jpg' style='width:70px;height:75px;' /></td><td style='font-weight:bold;font-size:16px;'>中山大洋站</td></tr><tr style='height:40px;line-height:40px;font-size:16px;'><td>正常</td><td style='color:#92EB13;font-size:20px;font-weight:bold;'>29</td></tr><tr style='height:40px;line-height:40px;font-size:16px;'><td>异常</td><td style='color:#FF440D;font-size:20px;font-weight:bold;'>3</td></tr></table>");

   //              return iw;
   //          };
			// marker1.addEventListener('click',function(){
			// 	// $('.map_1').addClass("active open").siblings("li").removeClass("active open");
			// 	// myApp.loadInfo(config,myApp); 
			// 	var _iw = _createTip_A2();
			// 	this.openInfoWindow(_iw);  
			// });
			// function _createTip_A3(){
   //                  // console.log(json);
   //                  // if(!json.top){
   //                  //     json.top = '';
   //                  // }
   //                  // if(!json.bottom){
   //                  //     json.bottom = '';
   //                  // }
   //                  // var str_c='';
   //                  // for(var i=0;i<json.cross;i++){
   //                  //  var j= i+1;
   //                  //  str_c+= "<p>管径"+j+": "+" "+"</p>";
   //                  // }
   //                var iw = new BMap.InfoWindow("<h3 class='iw_poi_title' style='width:100%;text-align:center;margin:0px;'>设备运行信息</h3><table class='iw_poi_content' style='text-align:center;width:100%;margin-top:10px;'><tr style='height:100px;line-height:75px;border-bottom:1px solid #e5e5e5;'><td ><img src='mappic.jpg' style='width:70px;height:75px;' /></td><td style='font-weight:bold;font-size:16px;'>湖北十堰站</td></tr><tr style='height:40px;line-height:40px;font-size:16px;'><td>正常</td><td style='color:#92EB13;font-size:20px;font-weight:bold;'>29</td></tr><tr style='height:40px;line-height:40px;font-size:16px;'><td>异常</td><td style='color:#FF440D;font-size:20px;font-weight:bold;'>3</td></tr></table>");

   //              return iw;
   //          };
			// marker2.addEventListener('click',function(){
			// 	// $('.map_1').addClass("active open").siblings("li").removeClass("active open");
			// 	// myApp.loadInfo(config,myApp); 
			// 	var _iw = _createTip_A3();
			// 	this.openInfoWindow(_iw);  
			// });
            map.centerAndZoom(point, 5);

            //导航控件
            map.addControl(new BMap.NavigationControl());
            //缩放控件
            map.addControl(new BMap.ScaleControl());
            //概览图控件
            map.addControl(new BMap.OverviewMapControl());
            //地图类型
            map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_SATELLITE_MAP ]}));
            map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放       
        },
        loadsec:function(config,myApp){
			var mapPoint = new Array();
			var opcGroupObj;
			var myVoltChart, myAcChart, myTempChart;
			var bTipShowFlag = 0;
			var nTipShowTab1 = 0;
			var nTipShowTab2 = 0;
			var nTipShowTab3 = 0;
			var nTipShowTab4 = 0;
			var nTransformers = 0;
			var TipOPCPath;
			var TipOPCName;
			var nAlarmCount = 0;
			var bAlarmShowFlag = 0;
			var dsCurrent;

			var bSupportTouch = 'ontouchend' in document;

			$(document).ready(function () {
					//debugger;
					// kendo.culture("zh");
					// //
					// //debugger;
					// nAlarmCount = $.cookie("nAlarmCount");
					//
					//debugger;
					$("#viewport").mapbox({
						mousewheel: true,
						layerSplit: 4,
						afterZoom: function (layer, xcoord, ycoord, viewport) {
							var scaleX = $(layer).width() / layer.defaultWidth;
							var scaleY = $(layer).height() / layer.defaultHeight;
							var i;
							// debugger;
							var mapContent1 = $(layer).find(".mapcontent").find(".subpoint");
							for (i = 0; i < mapContent1.length; i++) {
								var mapX = Math.round(mapPoint[mapContent1[i].id][0] * scaleX) + 16 * (scaleX - 1);
								var mapY = Math.round(mapPoint[mapContent1[i].id][1] * scaleY) + 32 * (scaleY - 1);
								$(mapContent1[i]).css({
									left: mapX + "px",
									top: mapY + "px"
								});
							}
							//
							var mapContent2 = $(layer).find(".mapcontent").find(".mainpoint");
							for (i = 0; i < mapContent2.length; i++) {
								var mapX = Math.round(mapPoint[mapContent2[i].id][0] * scaleX + 32 * (scaleX - 1));
								var mapY = Math.round(mapPoint[mapContent2[i].id][1] * scaleY + 64 * (scaleY - 1));
								// debugger;
								$(mapContent2[i]).css({
									left: mapX + "px",
									top: mapY + "px"
								});
							}
						}
						
					});
					//加载地图标签
					opcGroupObj = [{type:"mainpoint",longitude:500,latitude:450,name:"",fullname:'江南.b1',path:'变1',fullpath:'jiannan.b1'},
					// {type:"subpoint",longitude:200,latitude:400,name:"料场1",fullname:'江南.b1',path:'M0100',fullpath:'jiannan.b1'}
					]
		 
				for (var i = 0; i < opcGroupObj.length; i++) {
					var type = opcGroupObj[i].type;
					if (type == "mainpoint") {
						addSubStation("layer1 layer2 layer3",
										"1 2 5",
										"mainpoint",
										opcGroupObj[i].longitude,
										opcGroupObj[i].latitude,
										opcGroupObj[i].name,
										opcGroupObj[i].fullname,
										opcGroupObj[i].path,
										opcGroupObj[i].fullpath);
					}
					else if (type == "subpoint") {
						addSubStation("layer1 layer2 layer3",
										"1 2 5",
										"subpoint",
										opcGroupObj[i].longitude,
										opcGroupObj[i].latitude,
										opcGroupObj[i].name,
										opcGroupObj[i].fullname,
										opcGroupObj[i].path,
										opcGroupObj[i].fullpath);
					}
				}
				
				//
				$("#tipPanel").find(".CloseTip").bind('click', function () {
					if (bTipShowFlag) {
						$("#tipPanel").fadeOut("fast", function () {
							bTipShowFlag = 0;
							if (myVoltChart)
								RGraph.Clear(myVoltChart.canvas);
							if (myAcChart)
								RGraph.Clear(myAcChart.canvas);
						});
					}
				});
				//
				$("#mapPanel").bind('click', function () {
					if (bTipShowFlag) {
						$("#tipPanel").fadeOut("fast", function () {
							bTipShowFlag = 0;
							if (myVoltChart)
								RGraph.Clear(myVoltChart.canvas);
							if (myAcChart)
								RGraph.Clear(myAcChart.canvas);
						});
					}
				});
				//

			});

			function getStationType(OPCTag) {
					var reg = /^M[0-9]{2}00$/;
					if (reg.exec(OPCTag) != null)
						return "mainpoint";
					//
					reg = /^M[0-9]{4}$/;
					if (reg.exec(OPCTag) != null)
						return "subpoint";
					//
					return null;
			}

			function addSubStation(layer, ratio, type, x, y, name, fullname, tag, opcpath) {
				var myLayer = layer.split(" ");
				var myRatio = ratio.split(" ");
				var x1 = x, y1 = y;
				//debugger;
				//
					for (i = 0; i < myLayer.length; i++) {
						myRatio[i] = eval(myRatio[i]);
						//
						$("#" + myLayer[i]).append(
							'<div class="' + type + '" id="' + myLayer[i] + '_' + tag + '" title="' + fullname + '"></div>');
						//
						if (type == "mainpoint") {
							x1 = x * myRatio[i] + 32 * (myRatio[i] - 1);
							y1 = y * myRatio[i] + 64 * (myRatio[i] - 1);
						}
						else {
							x1 = x * myRatio[i] + 16 * (myRatio[i] - 1);
							y1 = y * myRatio[i] + 32 * (myRatio[i] - 1);
						}
						mapPoint[myLayer[i] + "_" + tag] = [x1, y1];
						//
						$("#" + myLayer[i] + "_" + tag).css({ position: "absolute", zIndex: "1", top: y1 + "px", left: x1 + "px" });

						//点击事件
						// if (!bSupportTouch) {
						//     $("#" + myLayer[i] + "_" + tag).click({ opcpath: opcpath, name: name, layer: myLayer[i] + "_" + tag }, function (e) {
						//         dispSubStation(e.data.opcpath, e.data.name, e.data.layer);
						//     });
						// }
					//
					$("#" + myLayer[i] + "_" + tag).poshytip({
						className: 'tip-skyblue',
						bgImageFrameSize: 9,
						content:'<div class="row" style="background:#ffffff;width:250px;">'
                        +'  <div class="col-md-12">'
                        +'      <div class="col-md-5">'
                        +'          <img src="resources/Images/map/electricity.png">'
                        +'      </div>'
                        +'      <div class="col-md-7">'
                        +'          <div>用电量</div>'
                        +'          <div style="color:#4176E4;">1442 Kwh</div>'
                        +'      </div>'
                        +'  </div>'
                        +'  <div class="col-md-12" style="border-top-style:dotted;color:#B0B1AF; margin:7px 0;"></div>'
                        +'  <div class="col-md-12">'
                        +'      <div class="col-md-5">'
                        +'          <img src="resources/Images/map/water.png">'
                        +'      </div>'
                        +'      <div class="col-md-7">'
                        +'          <div>用水量</div>'
                        +'          <div style="color:#D67D58;">488 m³</div>'
                        +'      </div>'
                        +'  </div>'
                        +'</div>',
						alignTo: 'cursor',
						offsetX: 20,
						offsetY: -100
					});
					}
			}
			function dispSubStation(opcPath, opcName, layer) {
				// $("#" + layer).poshytip('hide');
				//
				$("#tipPanel").fadeIn("normal", function () {
					bTipShowFlag = 1;
				});
				//	
				nTipShowTab1 = 0;
				nTipShowTab2 = 0;
				nTipShowTab3 = 0;
				nTipShowTab4 = 0;
				nTransformers = 0;
				TipOPCPath = opcPath;
				TipOPCName = opcName;
				//
				// LoadStation(opcPath, opcName, 0);
				// DrawAcChart(opcPath, 0);
				// DrawVoltChart(opcPath, 0);
				// DrawTempChart(opcPath, 0);
				//
			}
			function LoadStation(opcPath, opcName, bRefresh) {
		
					var n1, n2 = 0;
					var szHtml = '<span class="infoHead"><b>料场 </b></span>';
					 szHtml += '<div class="tab1">';
						szHtml += '<span class="lable">&nbsp;温度：</span>88.8 ℃<br>';
						szHtml += '<span class="lable">&nbsp;湿度：</span>10%<br>';
						szHtml += '</div>';
		
					$("#tipPanel").find(".BaseTip").html(szHtml);

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