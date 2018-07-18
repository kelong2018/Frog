
namespace game {
    import GameConfig = def.GameConfig;
    import Sprite = Laya.Sprite;
    import Image = Laya.Image;

    /**
     * 青蛙
     */
    export class Pillar extends Sprite {
        static PILLARTAG = "pillar";
        
        LUCKRATE = 1; //道具出现概率[0, 1]
        //1-柱子，2-没有柱子，3-柱子上有刺，4-柱子掉落
        static BEGINARRAY = [1, 1, 1, 1, ]//1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 3, 1, 1, 2];
        static NEXTARRAY = [[1, 2, 1, 3, 1], [1, 3, 1, 1, 2], [1, 2, 1, 3, 1], [1, 3, 1, 2, 1], [1, 4, 1, 2, 1], [1, 3, 4, 1]];
        haveTrap = false;
        trap;//: Laya.Image; //陷阱

        coinAction;
        luckyAction;
        haveCoin = false;
        isLucky = false;

        constructor() {
            super();
            this.size(GameConfig.PILLARWIDTH, Laya.stage.height / 2);
            this.pivot(this.width / 2, 0);

            this.trap = new Sprite();
            let ttrap: Laya.Texture = Laya.loader.getRes("frog/xianjing.png");
            let trapWidth = GameConfig.PILLARWIDTH - 26
            let ttH = trapWidth * 0.31;
            this.trap.graphics.drawTexture(ttrap, 0, 0, trapWidth, ttH);
            this.trap.size(GameConfig.PILLARWIDTH, ttH);
            this.trap.pos(13, -ttH + 25);
            this.addChildren(this.trap);

            this.coinAction = new Laya.Animation();
            this.coinAction.pos(this.width/2 , -40);
            this.addChild(this.coinAction);
            let anim = def.SourceConfig.animationSource.coinAction + "#aniUD";
            this.coinAction.play(0, true, anim);
            this.coinAction.visible = false;

            this.luckyAction = new Laya.Animation();
            this.luckyAction.pos(this.width/2 , -40);
            this.addChild(this.luckyAction);
            let animL = def.SourceConfig.animationSource.coinAction + "#ani_lucky";
            this.luckyAction.play(0, true, animL);
            this.luckyAction.visible = false;

            // this.trap = new Image("frog/xianjing.png")
            let p = new Sprite;
            let t: Laya.Texture = Laya.loader.getRes("frog/zhuzi.png");
            p.graphics.drawTexture(t, 0, 0, GameConfig.PILLARWIDTH, Laya.stage.height / 2);
            p.pos(0, 0);
            this.addChild(p);
        }

        init(x, y, haveCoin, isLucky, haveTrap?) {
            this.pos(x, y);
            this.haveCoin = haveCoin;
            this.isLucky = isLucky;
            this.coinAction.visible = haveCoin;
            this.luckyAction.visible = isLucky;
            this.trap.visible = haveTrap;
            this.haveTrap = haveTrap;
        }

        hideProp() {
            this.coinAction.visible = false;
            this.luckyAction.visible = false;
        }

        /**
         * 获取展示 array
         * @param begin 游戏开始显示的数组
         * @param idxO 柱子显示数组下标
         */
        static getPillarShowArray(begin, idxO?) {
            if (begin) {
                return {
                    array: Pillar.BEGINARRAY,
                    idx: 0
                };
            } else {
                let ran = Math.random();
                let idx = Math.floor(ran * Pillar.NEXTARRAY.length);
                if (idx == Pillar.NEXTARRAY.length) {
                    idx--;
                }
                if (idx == idxO) {    //跟上一组一样了
                    idx = idxO == Pillar.NEXTARRAY.length - 1 ? 0 : idx + 1;
                }
                return {
                    array: Pillar.NEXTARRAY[idx],
                    idx: idx
                }
            }
        }
    }
}