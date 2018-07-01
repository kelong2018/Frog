var utl;
(function (utl) {
    var SoundManager = Laya.SoundManager;
    var MusicSoundTool = /** @class */ (function () {
        function MusicSoundTool() {
        }
        //播放音乐
        MusicSoundTool.playMusic = function (url) {
            if (MusicSoundTool.musicUrl) {
                //MusicSoundTool.destroySound([MusicSoundTool.musicUrl]);
            }
            MusicSoundTool.musicUrl = url;
            SoundManager.playMusic(url, 0);
        };
        //停止音乐
        MusicSoundTool.stopMusic = function () {
            SoundManager.stopMusic();
        };
        //设置背景音乐音量
        MusicSoundTool.setMusicVolume = function (vol) {
            SoundManager.setMusicVolume(vol);
        };
        //播放音效
        MusicSoundTool.playSound = function (url, volume, loop, cb) {
            loop = loop || 1;
            var chanel = SoundManager.playSound(url, loop, cb);
            if (volume && chanel)
                chanel.volume = volume;
        };
        //关闭所有声音
        MusicSoundTool.stopAll = function () {
            SoundManager.stopAll();
        };
        //释放声音资源
        MusicSoundTool.destroySound = function (urls) {
            for (var i = 0; i < urls.length; i++) {
                SoundManager.destroySound(urls[i]);
            }
        };
        return MusicSoundTool;
    }());
    utl.MusicSoundTool = MusicSoundTool;
})(utl || (utl = {}));
//# sourceMappingURL=MusicSoundTool.js.map