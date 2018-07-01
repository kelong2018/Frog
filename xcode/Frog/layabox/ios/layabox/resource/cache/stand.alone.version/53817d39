var LobbyView = lobby.LobbyMainView;
var GameMainView = game.GameMainView;
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
if (Laya.Browser.onAndriod) {
    def.MusicConfig.initMusic("ogg");
}
else {
    def.MusicConfig.initMusic("mp3");
}
var asset = def.SourceConfig.lobbySource.concat(def.SourceConfig.gameSource);
Laya.loader.load(asset, new Laya.Handler(this, function () {
    asset = null;
    var lobby = new LobbyView;
    Laya.stage.addChild(lobby);
}));
//# sourceMappingURL=main.js.map