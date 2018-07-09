import LogoView = lobby.LogoView;
import LobbyMain = lobby.LobbyMainView;
import Stage = Laya.Stage;
import AppInit = utl.AppInit;
import LangConfig = def.LanguageConfig;

Laya.init(640, 960, Laya.WebGL);
// 设置适配模式
Laya.stage.scaleMode = Stage.SCALE_FIXED_WIDTH;
Laya.stage.alignV = Stage.ALIGN_MIDDLE;
Laya.stage.alignH = Stage.ALIGN_CENTER;
Laya.stage.screenMode = Stage.SCREEN_VERTICAL;

//显示FPS
// Laya.Stat.show(0, 50);
AppInit.init();

let lanSource = def.SourceConfig.gameSourceCh;
if (LangConfig.Lang == LangConfig.Langs.en) {
    lanSource = def.SourceConfig.gameSourceEn;
}

// let logoView = null;
// let assetLogo = def.SourceConfig.logoSource;
// Laya.loader.load(assetLogo, new Laya.Handler(this, () => {
//     assetLogo = null;
//     logoView = new LogoView;
//     Laya.stage.addChild(logoView);
// }));

let asset = def.SourceConfig.lobbySource.concat(def.SourceConfig.gameSourceCommon).concat(lanSource);
Laya.loader.load(asset, new Laya.Handler(this, () => {
    asset = null;
    // if(logoView) {
    //     logoView.ready = true;
    //     logoView.beginGame();
    // }    
    let lobby = new LobbyMain;
    Laya.stage.addChild(lobby);
}));