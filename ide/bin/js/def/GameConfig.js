var def;
(function (def) {
    var GameConfig = (function () {
        function GameConfig() {
        }
        GameConfig.SPEED = 3;
        GameConfig.BIGSTEP = 320;
        GameConfig.SMALLSTEP = 160;
        GameConfig.PILLARWIDTH = 160;
        return GameConfig;
    }());
    def.GameConfig = GameConfig;
})(def || (def = {}));
//# sourceMappingURL=GameConfig.js.map