var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var GameConfig = def.GameConfig;
    var Sprite = Laya.Sprite;
    /**
     * 柱子
     */
    var Pillar = /** @class */ (function (_super) {
        __extends(Pillar, _super);
        function Pillar() {
            var _this = _super.call(this) || this;
            //event
            _this.EVENT_DOOR_OPEN = "event_door_open";
            _this.LUCKRATE = 1; //道具出现概率[0, 1]
            _this.haveTrap = false;
            _this.haveCoin = false;
            _this.isLucky = false;
            _this.haveDoor = false;
            _this.size(GameConfig.PILLARWIDTH, Laya.stage.height / 2);
            _this.pivot(_this.width / 2, 0);
            _this.trap = new Sprite();
            var ttrap = Laya.loader.getRes("frog/xianjing.png");
            var trapWidth = GameConfig.PILLARWIDTH - 26;
            var ttH = trapWidth * 0.31;
            _this.trap.graphics.drawTexture(ttrap, 0, 0, trapWidth, ttH);
            _this.trap.size(GameConfig.PILLARWIDTH, ttH);
            _this.trap.pos(13, -ttH + 25);
            _this.addChildren(_this.trap);
            _this.action = new Laya.Animation();
            _this.action.pos(_this.width / 2, -40);
            _this.addChild(_this.action);
            _this.action.visible = false;
            _this.action.on(Laya.Event.COMPLETE, _this, function () {
                if (_this.actionName == Pillar.ACTIONS.openDoor) {
                    _this.event(_this.EVENT_DOOR_OPEN);
                }
            });
            var p = new Sprite;
            var t = Laya.loader.getRes("frog/zhuzi.png");
            p.graphics.drawTexture(t, 0, 0, GameConfig.PILLARWIDTH, Laya.stage.height / 2);
            p.pos(0, 0);
            _this.addChild(p);
            return _this;
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
        Pillar.prototype.init = function (x, y, haveCoin, isLucky, haveDoor, haveTrap) {
            this.pos(x, y);
            this.action.visible = false;
            this.haveCoin = haveCoin;
            this.isLucky = isLucky;
            this.haveDoor = haveDoor;
            this.actionName = "";
            var anim;
            if (haveCoin) {
                anim = def.SourceConfig.animationSource.coinAction + "#aniUD";
            }
            else if (isLucky) {
                anim = def.SourceConfig.animationSource.coinAction + "#ani_lucky";
            }
            else if (haveDoor) {
                anim = def.SourceConfig.animationSource.coinAction + "#ani_door";
            }
            if (anim) {
                this.action.visible = true;
                this.action.play(0, true, anim);
            }
            this.trap.visible = haveTrap;
            this.haveTrap = haveTrap;
        };
        Pillar.prototype.hideProp = function () {
            this.action.visible = false;
        };
        Pillar.prototype.openDoor = function () {
            this.actionName = Pillar.ACTIONS.openDoor;
            this.action.visible = true;
            var animDO = def.SourceConfig.animationSource.coinAction + "#ani_door_open";
            this.action.play(0, false, animDO);
        };
        Pillar.prototype.closeDoor = function () {
            this.actionName = Pillar.ACTIONS.closeDoor;
            var animDC = def.SourceConfig.animationSource.coinAction + "#ani_door_close";
            this.action.play(0, false, animDC);
        };
        /**
         * 获取展示 array
         * @param begin 游戏开始显示的数组
         * @param idxO 柱子显示数组下标
         */
        Pillar.getPillarShowArray = function (begin, idxO) {
            if (begin) {
                return {
                    array: Pillar.BEGINARRAY,
                    idx: 0
                };
            }
            else {
                var ran = Math.random();
                var idx = Math.floor(ran * Pillar.NEXTARRAY.length);
                if (idx == Pillar.NEXTARRAY.length) {
                    idx--;
                }
                if (idx == idxO) { //跟上一组一样了
                    idx = idxO == Pillar.NEXTARRAY.length - 1 ? 0 : idx + 1;
                }
                return {
                    array: Pillar.NEXTARRAY[idx],
                    idx: idx
                };
            }
        };
        Pillar.ACTIONS = {
            openDoor: "openDoor",
            closeDoor: "closeDoor",
            coinAction: "coinAction",
            propAction: "propAction",
        };
        Pillar.PILLARTAG = "pillar";
        //1-柱子，2-没有柱子，3-柱子上有刺，4-柱子掉落
        Pillar.BEGINARRAY = [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 3, 1, 1, 2];
        Pillar.NEXTARRAY = [[1, 2, 1, 3, 1], [1, 3, 1, 1, 2], [1, 2, 1, 3, 1], [1, 3, 1, 2, 1], [1, 4, 1, 2, 1], [1, 3, 4, 1]];
        return Pillar;
    }(Sprite));
    game.Pillar = Pillar;
})(game || (game = {}));
//# sourceMappingURL=Pillar.js.map