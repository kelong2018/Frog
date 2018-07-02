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
            function KColorButton(txt) {
                var _this = _super.call(this) || this;
                _this.size(240, 67);
                var sp_bg = new Sprite;
                sp_bg.graphics.drawRect(0, 0, _this.width, _this.height, "#000000");
                sp_bg.alpha = 0.1;
                _this.addChild(sp_bg);
                var sp_line = new Sprite;
                sp_line.graphics.drawLines(0, 0, [0, 0, _this.width, 0, _this.width, _this.height, 0, _this.height, 0, 0], "#ffffff", 2);
                _this.addChild(sp_line);
                var label = new Label(txt);
                label.font = "黑体";
                label.color = "#ffffff";
                label.fontSize = 48;
                label.bold = true;
                label.centerX = 0;
                label.centerY = 0;
                _this.addChild(label);
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
            return KColorButton;
        }(Box));
        ui.KColorButton = KColorButton;
    })(ui = kelong.ui || (kelong.ui = {}));
})(kelong || (kelong = {}));
//# sourceMappingURL=KColorButton.js.map