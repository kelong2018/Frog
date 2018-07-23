var def;
(function (def) {
    var MusicConfig;
    (function (MusicConfig) {
        //通用音效url
        MusicConfig.CommonMusic = {
            game_bg: "beijin"
        };
        MusicConfig.CommonSound = {
            blast: "did",
            jump: "jump",
            eat: "eat" //吃金币
        };
        function initMusic(type) {
            for (var m in MusicConfig.CommonMusic) {
                MusicConfig.CommonMusic[m] = "music/" + type + "/" + MusicConfig.CommonMusic[m] + "." + type;
            }
            for (var m in MusicConfig.CommonSound) {
                MusicConfig.CommonSound[m] = "music/" + type + "/" + MusicConfig.CommonSound[m] + "." + type;
            }
        }
        MusicConfig.initMusic = initMusic;
    })(MusicConfig = def.MusicConfig || (def.MusicConfig = {}));
})(def || (def = {}));
//# sourceMappingURL=MusicConfig.js.map