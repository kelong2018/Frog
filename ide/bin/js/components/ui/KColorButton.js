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
var kelong;
(function (kelong) {
    var ui;
    (function (ui) {
        var Label = Laya.Label;
        var Event = Laya.Event;
        var Box = Laya.Box;
        var Sprite = Laya.Sprite;
        var KColorButton = /** @class */ (function (_super) {
            __extends(KColorButton, _super);
            function KColorButton(w, h, fontSize, color, txt) {
                var _this = _super.call(this) || this;
                _this.size(w, h);
                _this.anchorX = 0.5;
                _this.anchorY = 0.5;
                var sp_bg = new Sprite;
                sp_bg.graphics.drawRect(0, 0, _this.width, _this.height, "#000000");
                sp_bg.alpha = 0.2;
                _this.addChild(sp_bg);
                var sp_line = new Sprite;
                sp_line.graphics.drawLines(0, 0, [0, 0, _this.width, 0, _this.width, _this.height, 0, _this.height, 0, 0], color, 2);
                _this.addChild(sp_line);
                _this.label = new Label(txt);
                _this.label.font = "黑体";
                _this.label.color = color;
                _this.label.fontSize = fontSize;
                _this.label.bold = true;
                _this.label.centerX = 0;
                _this.label.centerY = 0;
                _this.addChild(_this.label);
                _this.on(Event.MOUSE_OUT, _this, function () {
                    _this.scale(1, 1);
                });
                _this.on(Event.MOUSE_DOWN, _this, function () {
                    _this.scale(0.9, 0.9);
                });
                _this.on(Event.MOUSE_UP, _this, function () {
                    _this.scale(1, 1);
                });
                return _this;
            }
            //设置文字
            KColorButton.prototype.setLabel = function (str) {
                this.label.text = str;
            };
            return KColorButton;
        }(Box));
        ui.KColorButton = KColorButton;
    })(ui = kelong.ui || (kelong.ui = {}));
})(kelong || (kelong = {}));
//# sourceMappingURL=KColorButton.js.map