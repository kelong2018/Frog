var utl;
(function (utl) {
    var ThirdSdk = /** @class */ (function () {
        function ThirdSdk() {
        }
        //文档：https://ldc.layabox.com/doc/?nav=zh-as-7-2-2
        /**
         * banner广告
         * @param show true-显示，false-关闭
         * @param callback 显示后回调
         */
        ThirdSdk.bannerAD = function (show, callback) {
            if (Laya.Browser.onIOS) {
                // // a、创建Test类
                var ThirdSdk = Laya.PlatformClass.createClass("ThirdSdk"); // 这个名字要与下面声明的OC的类名匹配 iOS不用包名
                ThirdSdk.callWithBack(callback, "bannerAdd:", show);
            }
            else {
            }
        };
        /**
         * 视频广告
         * @param callback 播放完成回调(完整播放后返回true)
         */
        ThirdSdk.videoAD = function (callback) {
            if (Laya.Browser.onIOS) {
                var ThirdSdk = Laya.PlatformClass.createClass("ThirdSdk"); // 这个名字要与下面声明的OC的类名匹配 iOS不用包名
                ThirdSdk.callWithBack(callback, "videoAdd");
            }
            else {
                callback(false);
            }
        };
        ThirdSdk.onVideoResult = function (json) {
            console.log("onVideoResult ::: " + json);
        };
        return ThirdSdk;
    }());
    utl.ThirdSdk = ThirdSdk;
})(utl || (utl = {}));
//# sourceMappingURL=ThirdSdk.js.map