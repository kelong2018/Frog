var utl;
(function (utl) {
    var Storage = laya.net.LocalStorage;
    var AppInit = /** @class */ (function () {
        function AppInit() {
        }
        AppInit.init = function () {
            AppInit.initMusic();
            AppInit.initLanguage();
        };
        AppInit.initMusic = function () {
            //配置音乐
            if (Laya.Browser.onAndriod || Laya.Browser.onIOS) {
                def.MusicConfig.initMusic("ogg");
            }
            else {
                def.MusicConfig.initMusic("mp3");
            }
        };
        AppInit.initLanguage = function () {
            //获取语言
            var lan = Storage.getItem("language");
            if (lan != null && lan != "") {
                def.LanguageConfig.Lang = lan;
            }
            else {
                def.LanguageConfig.Lang = def.LanguageConfig.Langs.en;
            }
        };
        return AppInit;
    }());
    utl.AppInit = AppInit;
})(utl || (utl = {}));
//# sourceMappingURL=AppInit.js.map