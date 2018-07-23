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
        var KButtonGO = /** @class */ (function (_super) {
            __extends(KButtonGO, _super);
            function KButtonGO(txt) {
                var _this = _super.call(this) || this;
                _this.size(366, 300);
                var label1 = new Label(txt);
                label1.fontSize = 300;
                label1.color = "#888888";
                label1.font = "SimHei";
                label1.bold = true;
                label1.centerX = 10;
                label1.centerY = 0;
                _this.addChild(label1);
                var label2 = new Label(txt);
                label2.fontSize = 300;
                label2.color = "#ffffff";
                label2.font = "SimHei";
                label2.bold = true;
                label2.centerX = 0;
                label2.centerY = 0;
                _this.addChild(label2);
                _this.on(Event.MOUSE_OUT, _this, function () {
                    label2.centerX = 0;
                });
                _this.on(Event.MOUSE_DOWN, _this, function () {
                    label2.centerX = 10;
                });
                _this.on(Event.MOUSE_UP, _this, function () {
                    label2.centerX = 0;
                });
                return _this;
            }
            return KButtonGO;
        }(Box));
        ui.KButtonGO = KButtonGO;
    })(ui = kelong.ui || (kelong.ui = {}));
})(kelong || (kelong = {}));
//# sourceMappingURL=KButtonGo.js.map