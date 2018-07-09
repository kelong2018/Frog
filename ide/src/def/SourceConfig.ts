namespace def {
    export class SourceConfig {
        static logoSource = [
            { url: "frog/logo.jpg", type: Laya.Loader.IMAGE },
        ];

        //大厅资源
        static lobbySource = [
            { url: "frog/bg.png", type: Laya.Loader.IMAGE },
        ];
        //游戏资源
        static gameSourceCommon = [
            { url: "res/atlas/frog.atlas", type: Laya.Loader.ATLAS },
            { url: "frog/yuanjingcen.png", type: Laya.Loader.IMAGE },
            { url: "frog/yun.png", type: Laya.Loader.IMAGE },
            { url: "frog/overBg.png", type: Laya.Loader.IMAGE },
        ];
        static gameSourceCh = [
            { url: "res/atlas/ch.atlas", type: Laya.Loader.ATLAS },
            { url: "ch/ha.png", type: Laya.Loader.IMAGE },
        ]
        static gameSourceEn = [
            { url: "res/atlas/en.atlas", type: Laya.Loader.ATLAS },
            { url: "en/ha.png", type: Laya.Loader.IMAGE },
        ]
        //游戏动画
        static animationSource = {
            "coinAction": "game/CoinAction.ani",
        }
    }

    export function getSource(name) {
        let ret = "";
        if(LangConfig.Lang == LangConfig.Langs.en) {
            ret = "en/" + name;
        } else {
            ret = "ch/" + name;
        }
        return ret;
    }
}
