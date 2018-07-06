var LogoView = lobby.LogoView;
// import LobbyMain = lobby.LobbyMainView;
var Stage = Laya.Stage;
Laya.init(640, 960, Laya.WebGL);
// 设置适配模式
Laya.stage.scaleMode = Stage.SCALE_FIXED_WIDTH;
Laya.stage.alignV = Stage.ALIGN_MIDDLE;
Laya.stage.alignH = Stage.ALIGN_CENTER;
Laya.stage.screenMode = Stage.SCREEN_VERTICAL;
//显示FPS
// Laya.Stat.show(0, 50);
//配置音乐
if (Laya.Browser.onAndriod || Laya.Browser.onIOS) {
    def.MusicConfig.initMusic("ogg");
}
else {
    def.MusicConfig.initMusic("mp3");
}
var asset = def.SourceConfig.lobbySource.concat(def.SourceConfig.gameSource);
Laya.loader.load(asset, new Laya.Handler(this, function () {
    asset = null;
    var logoView = new LogoView;
    Laya.stage.addChild(logoView);
}));
//# sourceMappingURL=main.js.map