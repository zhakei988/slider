// 实践拖动图片的放大后禁止超出边缘
// 完善slider功能
var pageX=0,pageY=0;ismove=false;
var boxleft=0,boxtop=0;
var  boxw = $('#box').width(),boxh=$('#box').height();
function isout(){
	if(boxleft<=0)
	{
		boxleft=0
	}
	if(boxleft>=$(window).width()-boxw)
	{
		boxleft = $(window).width()-boxw;
	}
	if(boxtop<=0)
	{
		boxtop=0
	}
	if(boxtop>=$(window).height()-boxh)
	{
		boxtop = $(window).height()-boxh;
	}
}
$('#box').on('mousedown',function(e) {
	ismove=true;
	pageX=e.pageX;
	pageY=e.pageY;
	// pageX=e.pageX
	// pageY=e.pageY;
})
$(document).on('mousemove',function(e) {
	if(ismove)
	{
		boxleft=(e.pageX-pageX)+$('#box').position().left;
		boxtop=(e.pageY-pageY)+$('#box').position().top;
		isout();
		$('#box').css({left:boxleft,top:boxtop});
		pageX = e.pageX;
		pageY = e.pageY;
	}

})
$(document).on('mouseup',function(e) {
	ismove=false;
})