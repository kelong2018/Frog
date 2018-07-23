
namespace game {
    import GameConfig = def.GameConfig;
    import Sprite = Laya.Sprite;
    import Image = Laya.Image;

    /**
     * 柱子
     */
    export class Pillar extends Sprite {

        //event
        EVENT_DOOR_OPEN = "event_door_open";

        static ACTIONS = {
            openDoor: "openDoor",
            closeDoor: "closeDoor",
            coinAction: "coinAction",
            propAction: "propAction",
        }

        static PILLARTAG = "pillar";

        LUCKRATE = 1; //道具出现概率[0, 1]
        //1-柱子，2-没有柱子，3-柱子上有刺，4-柱子掉落
        static BEGINARRAY = [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 3, 1, 1, 2];
        static NEXTARRAY = [[1, 2, 1, 3, 1], [1, 3, 1, 1, 2], [1, 2, 1, 3, 1], [1, 3, 1, 2, 1], [1, 4, 1, 2, 1], [1, 3, 4, 1]];
        haveTrap = false;
        trap;//: Laya.Image; //陷阱

        action;
        actionName;
        haveCoin = false;
        isLucky = false;
        haveDoor = false;

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

            this.action = new Laya.Animation();
            this.action.pos(this.width / 2, -40);
            this.addChild(this.action);
            this.action.visible = false;
            this.action.on(Laya.Event.COMPLETE, this, () => {
                if (this.actionName == Pillar.ACTIONS.openDoor) {
                    this.event(this.EVENT_DOOR_OPEN);
                }
            });

            let p = new Sprite;
            let t: Laya.Texture = Laya.loader.getRes("frog/zhuzi.png");
            p.graphics.drawTexture(t, 0, 0, GameConfig.PILLARWIDTH, Laya.stage.height / 2);
            p.pos(0, 0);
            this.addChild(p);
        }

        /**
         * 
         * @param x 
         * @param y 
         * @param haveCoin 是否有金币
         * @param isLucky  是否有道具
         * @param haveDoor 是否有门
         * @param haveTrap 是否有陷阱
         */
        init(x, y, haveCoin, isLucky, haveDoor, haveTrap?) {
            this.pos(x, y);
            this.action.visible = false;
            this.haveCoin = haveCoin;
            this.isLucky = isLucky;
            this.haveDoor = haveDoor;
            this.actionName = "";
            let anim;
            if (haveCoin) {
                anim = def.SourceConfig.animationSource.coinAction + "#aniUD";
            } else if (isLucky) {
                anim = def.SourceConfig.animationSource.coinAction + "#ani_lucky";
            } else if (haveDoor) {
                anim = def.SourceConfig.animationSource.coinAction + "#ani_door";
            }
            if (anim) {
                this.action.visible = true;
                this.action.play(0, true, anim);
            }
            this.trap.visible = haveTrap;
            this.haveTrap = haveTrap;
        }

        hideProp() {
            this.action.visible = false;
        }

        openDoor() {
            this.actionName = Pillar.ACTIONS.openDoor;
            this.action.visible = true;
            let animDO = def.SourceConfig.animationSource.coinAction + "#ani_door_open";
            this.action.play(0, false, animDO);
        }

        closeDoor() {
            this.actionName = Pillar.ACTIONS.closeDoor;
            let animDC = def.SourceConfig.animationSource.coinAction + "#ani_door_close";
            this.action.play(0, false, animDC);
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