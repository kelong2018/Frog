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
    var View = Laya.View;
    var KColorButton = kelong.ui.KColorButton;
    var Event = Laya.Event;
    var Label = Laya.Label;
    var AdLoadingView = /** @class */ (function (_super) {
        __extends(AdLoadingView, _super);
        function AdLoadingView(w, h, color) {
            var _this = _super.call(this) || this;
            //event
            _this.CLOSEEVENT = "close_event";
            _this.size(w, h);
            _this.graphics.drawRect(0, 0, w, h, color);
            var closeBtn = new KColorButton(100, 50, 25, "#ffffff", def.getLanguageStr(def.LanguageConfig.Keys.CLOSE));
            closeBtn.top = 100;
            closeBtn.right = 30;
            closeBtn.on(Event.CLICK, _this, function () {
                _this.event(_this.CLOSEEVENT);
            });
            _this.addChild(closeBtn);
            var tip = new Label(def.getLanguageStr(def.LanguageConfig.Keys.ADLOADING));
            tip.color = "#ffffff";
            tip.font = "黑体";
            tip.fontSize = 40;
            tip.centerX = 0;
            tip.centerY = 0;
            _this.addChild(tip);
            return _this;
        }
        return AdLoadingView;
    }(View));
    game.AdLoadingView = AdLoadingView;
})(game || (game = {}));
//# sourceMappingURL=AdLoadingView.js.map