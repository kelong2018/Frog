var def;
(function (def) {
    var SourceConfig = /** @class */ (function () {
        function SourceConfig() {
        }
        //大厅资源
        SourceConfig.lobbySource = [
            { url: "frog/bg.png", type: Laya.Loader.IMAGE },
        ];
        //游戏资源
        SourceConfig.gameSource = [
            { url: "res/atlas/frog.atlas", type: Laya.Loader.ATLAS },
            { url: "frog/yuanjingcen.png", type: Laya.Loader.IMAGE },
            { url: "frog/yun.png", type: Laya.Loader.IMAGE },
        ];
        return SourceConfig;
    }());
    def.SourceConfig = SourceConfig;
})(def || (def = {}));
//# sourceMappingURL=SourceConfig.js.map