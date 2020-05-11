/*
依赖Jquery，H5依赖hammer.min.js组件
{
"name": "slider.js",
"version": "1.0.0",
"description": "一个简单的图片放大，轮播插件兼容H5",
"author": "JakeChiu <zhaokai@staff.hexun.com>",
"parmas":{
	obj:'当前点击图片的对象',
	id:'包含点击对象上一层的容器组id',
}
图片组要求图片样式名称为ps_img
例如：'<div id="warp"><img src="" class="ps_img"><img src="" class="ps_img"><img src="" class="ps_img"><img src="" class="ps_img"></div>'
*/
function zhiboHxSlide(obj,id){
	function eveclick(event){
		var $this=$(event.target);
		var type=$this.attr('data-type')||$this.parent().attr('data-type');
		switch(type) {
			case "pre":  
				imgShow(slidebtn('pre'));
				break;
			case "next": 
				imgShow(slidebtn('next'));
				break;
			case "close":
				imgClose();
				break;
		}
	}
	function evetouch(event){
		if(touchs.loading){return;}
		var event = event || window.event;
		switch(event.type) {
			case "dblclick":
				imgClose();
				break;
			case "touchstart":  
				swiper(event);
				break;
			case "touchend": 
				swiper(event);
				break;
			case "pinchstart":
				pinch(event)
			    break;
			case "pinchmove":
				pinch(event)
			    break;
			case "pinchend":
				pinch(event)
			    break;
			case "panstart":
				imgmove(event);
			    break;
			case "panmove":
				imgmove(event);
			    break;
			case "panend":
				imgmove(event);
			    break;			    			    
		}
	}
	function pinch(ev){
		if(touchs.long==false)
		{
			if(ev.type=='pinchstart'){
				touchs.intscale = touchs.scale || 1;
			}
			if(ev.type=='pinchmove'){
				touchs.scale = touchs.intscale * ev.scale;
			}
			if(ev.type=='pinchend'){
				if(touchs.scale<=1)
				{
					touchs.panX=0
					touchs.panY=0;
					touchs.scale=1
				}
			}
			
			$('#zhibohxslidebox .m-center img').css('transform','translate('+touchs.panX+'px,'+touchs.panY+'px) scale('+touchs.scale+')');
		}
	}
	function reset(){
		touchs.sx=0;
		touchs.sy=0;
		touchs.zoom=false;
		touchs.scale=1;
		touchs.panX=0;
		touchs.panY=0;
		touchs.pandeltaX=0
		touchs.pandeltay=0;
		touchs.loading=false;
		$('#zhibohxslidebox .m-center img').css('transform','');
	}
	function swiper(ev){
		if(touchs.scale<=1)
		{
			var o =ev.originalEvent;
			if(ev.type=='touchstart'){
				touchs.sx = o.targetTouches[0].pageX;
			}
			if(ev.type=='touchend'){
				touchs.ex= o.changedTouches[0].pageX;
				if(touchs.ex-touchs.sx>=touchs.touchRange)
				{
					imgShow(slidebtn('pre'));
					reset();
				}
				if(touchs.sx-touchs.ex>=touchs.touchRange)
				{
					imgShow(slidebtn('next'));
					reset();
				}
			}			
		}
	}
	function imgmove(ev){
		if(touchs.scale>1)
		{
		  if(ev.type=='panstart')
          {
              touchs.pandeltaX = touchs.panX||0;
              touchs.pandeltaY = touchs.panY||0;
          }
          if(ev.type=='panmove')
          {
          	  touchs.panX=touchs.pandeltaX+ev.deltaX;
	          touchs.panY=touchs.pandeltaY+ev.deltaY;    
          	  var imgw=$('#zhibohxslidebox .m-center img').width();
              var imgh=$('#zhibohxslidebox .m-center img').height();
              var pyx=$('#zhibohxslidebox .m-center img').offset().left;
              var pyy=$('#zhibohxslidebox .m-center img').offset().top;
              var ismoveX = function(){
                if(pyx<0&&pyx+imgw*touchs.scale>$(window).width())
                {
                  return false
                }
                return true;
              }
              var ismoveY = function(){
	                if(pyy<0&&pyy+imgh*touchs.scale>$(window).height())
	                {
	                  return false
	                }
	                return true;
	            }
              // if(touchs.panX>0)
              // {
              //   //右
              //   if(pyx>0&&ismoveX()&&pyx+imgw*touchs.scale>$(window).width())
              //   {
              //     return false
              //   }
              // }
              // if(touchs.panX<0)
              // {
              //   //左
              //   if(ismoveX()&&pyx<0)
              //   {
              //     return false
              //   }
              // }
              // if(touchs.panY>0)
              // {
              //   //下
              //   if(pyy&&ismoveY()&&pyy+imgh*touchs.scale>$(window).height())
              //   {
              //     return false
              //   }
              // }
              // if(touchs.panY<0)
              // {
              //   //上
              //   if(ismoveY()&&pyy<0)
              //   {
              //     return false
              //   }
              // }
          }
          if(ev.type=='panend')
          {
 			if(touchs.scale<=1)
 			{
 				reset();
 			}
          }
          $('#zhibohxslidebox .m-center img').css('transform','translate('+touchs.panX+'px,'+touchs.panY+'px) scale('+touchs.scale+')');
      }
	}
	function slidebtn(type)
	{
		var arr = this.arrimg;
		    var nowsrc = $("#zhibohxslideshowImg").find('.m-center img').attr('src'),postsrc='';
            for(var i in arr)
            {
                if($(arr[i]).attr('src').replace('s_','b_')==nowsrc)
                {
                    if(type=='pre')
                    {
                        postsrc=arr[parseInt(i)-1];
                    }else
                    {
                        postsrc=arr[parseInt(i)+1];
                    }
                    break;
                }
            }
            return postsrc;
	}
	function bindevent(){
		//增加图片滚动
        if(ispc)
        {
        	$("#zhibohxslideshowImg").on('click',eveclick)
        }else
        {
	        if(window.navigator.userAgent.toLowerCase().indexOf('12_1')<1)
	        {
        	$("#zhibohxslideshowImg").on('touchstart touchmove touchend',evetouch);
        	var mc = new Hammer(document.getElementById('zhibohxslideshowImg'));
        	mc.get('pinch').set({
		      enable: true
		    });
		    mc.add(new Hammer.Pinch({
		         threshold: 0
		       })).recognizeWith(mc.get('pan'));
        	mc.on("panstart panmove panend pinchstart pinchmove pinchend",evetouch);
        	}
        }
	    $("#zhibohxslidelayer").on('click',function(event){
	        imgClose();
	    });  
	}
	function showBox(){
	    $('#zhibohxslidelayer').show();
	    imgShow(obj);
	};
	function imgShow(selectimg){
		var arr = this.arrimg;
		if(typeof selectimg == "undefined"||touchs.loading)return;
		touchs.loading=true;
		$('#zhibohxslideload').show();
	    var img=selectimg.clone(true);
	    img.removeAttr('class');
	    img.removeAttr('data-p');
	    img.attr('src',img.attr('src').replace('s_','b_'));
	    img.load(function(){
	        img.css('display','block');
	        $('#zhibohxslideload').hide()
	        $("#zhibohxslideshowImg .m-center").html(img);
	        $("#zhibohxslideshowImg .f-main,#zhibohxslideshowImg .imgClose").css('opacity',0);
	        if(arr.length>1)
	        {
	            var imgsrc = selectimg.attr('src');
	            $("#zhibohxslideshowImg").find('.f-main a').show();
	            if(imgsrc==arr[0].attr('src'))
	            {
	                $("#zhibohxslideshowImg").find('.fm-l').hide()
	            }
	            else if(imgsrc==arr[arr.length-1].attr('src'))
	            {
	                $("#zhibohxslideshowImg").find('.fm-r').hide()
	            }
	        }
	        setTimeout(function(){
	        	var minheight=230,maxheight = $(window).height()-100;
	        	var width = ispc?img[0].naturalWidth:$(window).width(),height=ispc?img[0].naturalHeight:img.height();
	            var laywidth = width<minheight?minheight:width,
	            layheight = height<minheight?minheight:height; 
	            $("#zhibohxslidebox").attr('class','');
	            $("#zhibohxslidebox,#zhibohxslidebox .m-img").attr('style','')
	            touchs.long=false;
	            if(layheight>maxheight)
	            {
	            	touchs.long=true;
	                $("#zhibohxslidebox").addClass('long').css({width:laywidth+'px',height:maxheight+'px',marginTop:-(maxheight/2)+'px'});
	                $("#zhibohxslidebox .m-img").height(maxheight)
	            }else if(layheight<=minheight)
	            {
	            	$("#zhibohxslidebox").css({marginTop:-(layheight/2)+'px',width:laywidth+'px',height:minheight+'px'});
	            }else
	            {
	                $("#zhibohxslidebox").css({marginTop:-(layheight/2)+'px',width:laywidth+'px',height:'auto'});
	            }
	            $("#zhibohxslideshowImg").removeClass('visible');
	            setTimeout(function(){$("#zhibohxslideshowImg .f-main,#zhibohxslideshowImg .imgClose").animate({'opacity':1},200)},300);
	            reset();
	        },100);
	    })
	};
	function imgClose(){
	    /*关闭图片预览*/
	    $('#zhibohxslideshowImg').hide();
	    $('#zhibohxslidelayer').hide();
	};
	var closeimg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAsCAYAAAAacYo8AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAALqADAAQAAAABAAAALAAAAAAoUndkAAAEWElEQVRYCdWZz2sTQRTHZzb4s6L2JjmVFvTWU0ELevNgkQpNsLdeexMVWm+l9GoLWvwvapNCpeDBW4Uq+A8oNL2l3uKvUhF21+93uhMnk2x2djdJ8UG6s7sz733m9c3s27dS5JQwDOWPcvlmIMT9MAhGpRBFIWUx5JE3pTzEsY7zuvS8mifEzuVK5SOu41J2gZ1s8q1cvhv4/kNAPgDYtVRapPyKMdteofD6aqXyLtXYqHNq8O+l0q0gCJ7DXXeyGLTHAGDX87xnV6rVD/a9bufO4PDwKEJhFf/9UjeFWe8hdKoIpUX8B2ouOpzAGRah72/Ay8MuSrP2AUxDFgqzLuGDtdJdGqXSI3j6bb+hSUEbtEWb3amE6OrxxszMS4TG4yQl/biP0Fkf3tp6Eqc71uPK06cETVg6rJvnO3pcxTTDIwwLcTMexHV43ceCvdcp5tvA1e7h+58GEdMuk48W7IS927SFitry+rx7uADrPtGCXdXn+tgCzodL0j5dGBkR56amhPBahmp96Y7QQV3U2U3IRDazT4t1PwzbZmZ2Zvv87Ky4OD8vhhYW8sEDmjqoizqTxGZrgnNBYinfTlLwe3NTBEdH4uzkZHb4CJo6qIs6EwVsijHq2ARH/pE8bQzyazXxa3k5O7wFTV3U6SIqqTPBEUPcXaZdBrOPv7+fDb4TNHQ5CzLRiFUojzOfTpuapobPC83ZIX1WrGgqcL4EOM/a6OgM3wvoyK5mVeDYu0cNnlTNRPgeQhNMsypwBHgxFa3VORa+x9A0q1m5KAWywM8I+uts55HC2Ji4tLIivKEh8WdvT6nSW57aPdIsxBgQ5C9fkDXeOAmVnB7XNmzP9xqadpACqOhQ4MwhtfG8R//gQG2XWg8nw2s9k4j1JMZZQuiFRDF9ZnxcBMfHIsSP7dzpgcGGUFGs2uN14162pr0Ql5bET/xypwc2DWo0vKRjPB+4Dc3HOEMEv1zpgQ2Nc8T0P3BWmDr0cbsUA60H9xpesyqP48+ONpTqmACtdfUSXrOqfZyJC15M66nyFUdoDc+jvc8fra0JEeAh7ioo3Q1Xq0Us0FB5nA1Ab7uO59sPd4q0+3Ruz4NRsQJUgROYBUgn8IzQWnceeJOxCc4SAOJmVxuIO16Ym0vtaVuXDU+dSUI2s0zRBOdAVk2TFPCh4h8eqm2OAFlFw1MXdSaJzaYWpzkICVcFi7UvFVnTTpo24rqKxKpsjmnxOG+w1IvZNMxOp9kmC5lshjZwVoxY6sUsfbvzoM/JEJWd2x6QbeCEU4tAyqeDBm2zBwZzQZr3O4KzAzb6V5jxutl5kG3aJkOczbbFaXdUpd4wfIEFO5DKrQpReLobNBkTwdlJlZ3/t08pBGecYZFMwBtVnvdDqJs24mLatunkcXMQq6aqAOlQZzTHxbalfF+QcrFvnwttwwyfqN44nSqrpCJ+oBXiDZ6GG64etu2n9ritgClx7CdxMvKNpQ+fxP8CdPSnzUiMjeoAAAAASUVORK5CYII="
	var style = '<style>#zhibohxslideload{width: 100%;height: 100%;text-align: center;z-index: 99999;position: fixed;top: 0;left: 0;display: flex;align-items: center;justify-items: center;background: rgba(0,0,0,0.3);}#zhibohxslidelayer{display:none;width:100%;height:100%;z-index:9999;position:fixed;top:0;left:0;background-color:#000;opacity:0.5;filter:alpha(opacity=50)}#zhibohxslideshowImg.visible{visibility: hidden;display:block}#zhibohxslideshowImg .imgClose{padding:0;margin:0;width:22px;height:22px;line-height:25px;position:absolute;top:0;right:-30px;color:#a86363;background:#fff;text-align:center;vertical-align:middle;cursor:pointer;background:url('+closeimg+') no-repeat center/cover;overflow: hidden;text-indent: -99999px}#zhibohxslideshowImg{position:fixed;z-index:99999;width:100%;height:100%;left:0;top:0;display:none;    user-select: none;}#zhibohxslidebox{position:absolute;top:50%;left:0;right:0;z-index:99999;margin:0 auto;transition: all 0.2s;}#zhibohxslideshowImg img{display:block;width: 100%;}#zhibohxslideshowImg .m-img{width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;background: rgba(0,0,0,0.5);}#zhibohxslidebox.long .m-img{align-items:flex-start;overflow-y:scroll;display: block;}#zhibohxslideshowImg .m-center{    display: inline-block;}#zhibohxslideshowImg .f-main{position: absolute;width: 100%;top:42%;opacity：0}#zhibohxslideshowImg .f-main a{position: absolute;width: 40px;display:none}#zhibohxslideshowImg .f-main a img{opacity: 0.7}#zhibohxslideshowImg .f-main a:hover img{opacity: 1}#zhibohxslideshowImg .f-main .fm-l{left: 10px}#zhibohxslideshowImg .f-main .fm-l img{transform:rotate(180deg);}#zhibohxslideshowImg .f-main .fm-r{right: 10px}#zhibohxslideload img{display: block;margin: 0 auto;width:30px}</style>';
		var jt='<div class="f-main"><a class="fm-l" data-type="pre" target="_self" href="javascript:void(0)"><img src="data:image/png;base64,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"></a><a class="fm-r" data-type="next" target="_self" href="javascript:void(0)"><img src="data:image/png;base64,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"></a></div>'
	    var close='<div class="m-img"><div class="m-center"></div></div><div class="imgClose" title="关闭" data-type="close">关 闭</div>';
	    var ispc = zhibohxslideispc();
	    this.arrimg=[];
	    this.touchs={
	    	sx:0,sy:0,ex:0,ey:0,touchRange:100,zoom:false,intscale:1,scale:1,pandeltaX:0,pandeltaY:0,panX:0,panY:0,loading:false,long:false
	    }
        for(var i=0;i<$('#'+id).find('.ps_img').length;i++)
        {
            this.arrimg.push($('#'+id).find('.ps_img').eq(i));    
        }
	    var cssH5 = ispc?'':"<style>#zhibohxslideshowImg .imgClose,#zhibohxslideshowImg .f-main{display:none}#zhibohxslideload img{width:10%}#zhibohxslidelayer{background:rgba(0,0,0,0.7) url("+closeimg+")no-repeat center 98.6%/30px auto;opacity:1}</style>";
	    if($("#zhibohxslideshowImg").length<1){
	    	$('body').append('<div id="zhibohxslideshowImg"><div id="zhibohxslidebox"></div><div id="zhibohxslidelayer"></div><div id="zhibohxslideload"><img src="https://imgcd.homeway.com.cn/toolbar/img/onload.gif"></div></div>'+style+cssH5);
	    	bindevent();
	    };
	    $("#zhibohxslidebox").html(jt+close);
	    $("#zhibohxslideshowImg").show().addClass('visible');
		showBox();
};
function zhibohxslideispc() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

if(!zhibohxslideispc())
{
	$(function(){$('body').append('<script src="https://zhibo.homeway.com.cn/room/static/hammer.min.js"></script>')});
}