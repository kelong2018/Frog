var loadingView= window.loadingView;
if(loadingView)
{
    loadingView.loadingAutoClose=true;
	loadingView.showTextInfo=true;
    loadingView.bgColor("#3584fb");
    loadingView.setFontColor("#ffffff");
    loadingView.setTips(["蛙世界的大门即将打开");
}
window.onLayaInitError=function(e)
{
	console.log("onLayaInitError error=" + e);
	alert("加载游戏失败，可能由于您的网络不稳定，请退出重进");
}