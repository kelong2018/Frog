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
            _this.haveTrap = false;
            _this.size(GameConfig.PILLARWIDTH, Laya.stage.height / 2);
            _this.pivot(_this.width / 2, 0);
            _this.trap = new Sprite();
            var ttrap = Laya.loader.getRes("frog/xianjing.png");
            var trapWidth = GameConfig.PILLARWIDTH - 10;
            var ttH = trapWidth * 0.31;
            _this.trap.graphics.drawTexture(ttrap, 0, 0, trapWidth, ttH);
            _this.trap.size(GameConfig.PILLARWIDTH, ttH);
            _this.trap.pos(5, -ttH + 25);
            _this.addChildren(_this.trap);
            // this.trap = new Image("frog/xianjing.png")
            var p = new Sprite;
            var t = Laya.loader.getRes("frog/zhuzi.png");
            p.graphics.drawTexture(t, 0, 0, GameConfig.PILLARWIDTH, Laya.stage.height / 2);
            p.pos(0, 0);
            _this.addChild(p);
            return _this;
        }
        Pillar.prototype.init = function (x, y, haveTrap) {
            this.pos(x, y);
            this.trap.visible = haveTrap;
            this.haveTrap = haveTrap;
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
                console.log("pillar", idx, ran);
                if (idx == Pillar.NEXTARRAY.length) {
                    idx--;
                }
                if (idx == idxO) { //跟上一组一样了
                    idx = idxO == Pillar.NEXTARRAY.length - 1 ? 0 : idx + 1;
                }
                return {
                    array: [1, 4, 1, 2, 1],
                    idx: idx
                };
            }
        };
        Pillar.PILLARTAG = "pillar";
        //1-柱子，2-没有柱子，3-柱子上有刺，4-柱子掉落
        Pillar.BEGINARRAY = [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 3, 1, 1, 2];
        Pillar.NEXTARRAY = [[1, 2, 1, 3, 1], [1, 3, 1, 1, 2], [1, 2, 1, 3, 1], [1, 3, 1, 2, 1], [1, 4, 1, 2, 1]];
        return Pillar;
    }(Sprite));
    game.Pillar = Pillar;
})(game || (game = {}));
//# sourceMappingURL=Pillar.js.map