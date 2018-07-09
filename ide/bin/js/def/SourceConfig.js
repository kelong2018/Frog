var def;
(function (def) {
    var SourceConfig = /** @class */ (function () {
        function SourceConfig() {
        }
        SourceConfig.logoSource = [
            { url: "frog/logo.jpg", type: Laya.Loader.IMAGE },
        ];
        //大厅资源
        SourceConfig.lobbySource = [
            { url: "frog/bg.png", type: Laya.Loader.IMAGE },
        ];
        //游戏资源
        SourceConfig.gameSourceCommon = [
            { url: "res/atlas/frog.atlas", type: Laya.Loader.ATLAS },
            { url: "frog/yuanjingcen.png", type: Laya.Loader.IMAGE },
            { url: "frog/yun.png", type: Laya.Loader.IMAGE },
            { url: "frog/overBg.png", type: Laya.Loader.IMAGE },
        ];
        SourceConfig.gameSourceCh = [
            { url: "res/atlas/ch.atlas", type: Laya.Loader.ATLAS },
            { url: "ch/ha.png", type: Laya.Loader.IMAGE },
        ];
        SourceConfig.gameSourceEn = [
            { url: "res/atlas/en.atlas", type: Laya.Loader.ATLAS },
            { url: "en/ha.png", type: Laya.Loader.IMAGE },
        ];
        //游戏动画
        SourceConfig.animationSource = {
            "coinAction": "game/CoinAction.ani",
        };
        return SourceConfig;
    }());
    def.SourceConfig = SourceConfig;
    function getSource(name) {
        var ret = "";
        if (LangConfig.Lang == LangConfig.Langs.en) {
            ret = "en/" + name;
        }
        else {
            ret = "ch/" + name;
        }
        return ret;
    }
    def.getSource = getSource;
})(def || (def = {}));
//# sourceMappingURL=SourceConfig.js.map