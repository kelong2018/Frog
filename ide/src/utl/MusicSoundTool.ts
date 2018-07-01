namespace utl {

    import SoundManager = Laya.SoundManager;

    export class MusicSoundTool {
        static musicUrl;
        //播放音乐
        static playMusic(url) {
            if (MusicSoundTool.musicUrl) {
                //MusicSoundTool.destroySound([MusicSoundTool.musicUrl]);
            }
            MusicSoundTool.musicUrl = url;
            SoundManager.playMusic(url, 0);
        }
        //停止音乐
        static stopMusic() {
            SoundManager.stopMusic();
        }

        //设置背景音乐音量
        static setMusicVolume(vol) {
            SoundManager.setMusicVolume(vol);
        }

        //播放音效
        static playSound(url, volume?, loop?, cb?) {
            loop = loop || 1;
            let chanel = SoundManager.playSound(url, loop, cb);
            if (volume && chanel)
                chanel.volume = volume;
        }
        //关闭所有声音
        static stopAll() {
            SoundManager.stopAll();
        }

        //释放声音资源
        static destroySound(urls) {
            for (let i = 0; i < urls.length; i++) {
                SoundManager.destroySound(urls[i]);
            }
        }
    }
}