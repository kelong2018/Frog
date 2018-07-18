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
     * 青蛙
     */
    var Pillar = /** @class */ (function (_super) {
        __extends(Pillar, _super);
        function Pillar() {
            var _this = _super.call(this) || this;
            _this.LUCKRATE = 1; //道具出现概率[0, 1]
            _this.haveTrap = false;
            _this.haveCoin = false;
            _this.isLucky = false;
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
            _this.coinAction = new Laya.Animation();
            _this.coinAction.pos(_this.width / 2, -40);
            _this.addChild(_this.coinAction);
            var anim = def.SourceConfig.animationSource.coinAction + "#aniUD";
            _this.coinAction.play(0, true, anim);
            _this.coinAction.visible = false;
            _this.luckyAction = new Laya.Animation();
            _this.luckyAction.pos(_this.width / 2, -40);
            _this.addChild(_this.luckyAction);
            var animL = def.SourceConfig.animationSource.coinAction + "#ani_lucky";
            _this.luckyAction.play(0, true, animL);
            _this.luckyAction.visible = false;
            // this.trap = new Image("frog/xianjing.png")
            var p = new Sprite;
            var t = Laya.loader.getRes("frog/zhuzi.png");
            p.graphics.drawTexture(t, 0, 0, GameConfig.PILLARWIDTH, Laya.stage.height / 2);
            p.pos(0, 0);
            _this.addChild(p);
            return _this;
        }
        Pillar.prototype.init = function (x, y, haveCoin, isLucky, haveTrap) {
            this.pos(x, y);
            this.haveCoin = haveCoin;
            this.isLucky = isLucky;
            this.coinAction.visible = haveCoin;
            this.luckyAction.visible = isLucky;
            this.trap.visible = haveTrap;
            this.haveTrap = haveTrap;
        };
        Pillar.prototype.hideProp = function () {
            this.coinAction.visible = false;
            this.luckyAction.visible = false;
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
        Pillar.PILLARTAG = "pillar";
        //1-柱子，2-没有柱子，3-柱子上有刺，4-柱子掉落
        Pillar.BEGINARRAY = [1, 1, 1, 1,]; //1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 3, 1, 1, 2];
        Pillar.NEXTARRAY = [[1, 2, 1, 3, 1], [1, 3, 1, 1, 2], [1, 2, 1, 3, 1], [1, 3, 1, 2, 1], [1, 4, 1, 2, 1], [1, 3, 4, 1]];
        return Pillar;
    }(Sprite));
    game.Pillar = Pillar;
})(game || (game = {}));
//# sourceMappingURL=Pillar.js.map