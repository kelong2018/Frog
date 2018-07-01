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
    var Sprite = Laya.Sprite;
    var Image = Laya.Image;
    var RepeatImageView = /** @class */ (function (_super) {
        __extends(RepeatImageView, _super);
        function RepeatImageView(pic) {
            var _this = _super.call(this) || this;
            _this.contentHeight = 0;
            _this.source = pic;
            _this.init();
            return _this;
        }
        RepeatImageView.prototype.init = function () {
            var _this = this;
            this.img1 = new Image(this.source);
            this.img1.x = 0;
            this.addChild(this.img1);
            this.contentHeight = this.img1.height;
            this.img2 = new Image(this.source);
            this.img2.anchorX = 1;
            this.img2.scaleX = -1;
            this.addChild(this.img2);
            this.img2.x = this.img1.x + this.img1.width;
            this.img1.on(Laya.Event.LOADED, this, function () {
                _this.contentHeight = _this.img1.height;
                _this.img2.x = _this.img1.x + _this.img1.width;
            });
        };
        RepeatImageView.prototype.run = function (rate) {
            if (this.img1.x + this.img1.width < -1) {
                this.img1.x = this.img2.x + this.img2.width;
            }
            if (this.img2.x + this.img2.width < -1) {
                this.img2.x = this.img1.x + this.img1.width;
            }
            this.img1.x -= rate;
            this.img2.x -= rate;
        };
        return RepeatImageView;
    }(Sprite));
    game.RepeatImageView = RepeatImageView;
})(game || (game = {}));
//# sourceMappingURL=RepeatImageView.js.map