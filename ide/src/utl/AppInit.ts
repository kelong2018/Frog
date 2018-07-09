namespace utl {
    import Storage = laya.net.LocalStorage;

    export class AppInit {
        static init() {
            AppInit.initMusic();
            AppInit.initLanguage();
        }

        static initMusic() {            
            //配置音乐
            if (Laya.Browser.onAndriod || Laya.Browser.onIOS) {
                def.MusicConfig.initMusic("ogg");
            } else {
                def.MusicConfig.initMusic("mp3");
            }
        }

        static initLanguage() {
            //获取语言
            let lan = Storage.getItem("language");
            if (lan != null && lan != "") {
                def.LanguageConfig.Lang = lan;
            } else {
                def.LanguageConfig.Lang = def.LanguageConfig.Langs.en;
            }
        }
    }
}