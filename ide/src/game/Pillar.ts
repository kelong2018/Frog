
namespace game {
    import GameConfig = def.GameConfig;
    import Sprite = Laya.Sprite;
    import Image = Laya.Image;

    /**
     * 青蛙
     */
    export class Pillar extends Sprite {
        static PILLARTAG = "pillar";
        //1-柱子，2-没有柱子，3-柱子上有刺，4-柱子掉落
        static BEGINARRAY = [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 3, 1, 1, 2];
        static NEXTARRAY = [[1, 2, 1, 3, 1], [1, 3, 1, 1, 2], [1, 2, 1, 3, 1], [1, 3, 1, 2, 1], [1, 4, 1, 2, 1]];
        haveTrap = false;
        trap;//: Laya.Image; //陷阱
        constructor() {
            super();
            this.size(GameConfig.PILLARWIDTH, Laya.stage.height / 2);
            this.pivot(this.width / 2, 0);

            this.trap = new Sprite();
            let ttrap: Laya.Texture = Laya.loader.getRes("frog/xianjing.png");
            let trapWidth = GameConfig.PILLARWIDTH - 10
            let ttH = trapWidth * 0.31;
            this.trap.graphics.drawTexture(ttrap, 0, 0, trapWidth, ttH);
            this.trap.size(GameConfig.PILLARWIDTH, ttH);
            this.trap.pos(5, -ttH + 25);
            this.addChildren(this.trap);

            // this.trap = new Image("frog/xianjing.png")
            let p = new Sprite;
            let t: Laya.Texture = Laya.loader.getRes("frog/zhuzi.png");
            p.graphics.drawTexture(t, 0, 0, GameConfig.PILLARWIDTH, Laya.stage.height / 2);
            p.pos(0, 0);
            this.addChild(p);
        }

        init(x, y, haveTrap?) {
            this.pos(x, y);
            this.trap.visible = haveTrap;
            this.haveTrap = haveTrap;
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
                console.log("pillar", idx, ran);
                if (idx == Pillar.NEXTARRAY.length) {
                    idx--;
                }
                if (idx == idxO) {    //跟上一组一样了
                    idx = idxO == Pillar.NEXTARRAY.length - 1 ? 0 : idx + 1;
                }
                return {
                    array: [1, 4, 1, 2, 1],//Pillar.NEXTARRAY[idx],
                    idx: idx
                }
            }
        }
    }
}