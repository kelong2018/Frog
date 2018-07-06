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
var lobby;
(function (lobby_1) {
    var ViewColor = kelong.ui.ViewColor;
    var Image = Laya.Image;
    var Tween = Laya.Tween;
    var Handler = Laya.Handler;
    var LogoView = /** @class */ (function (_super) {
        __extends(LogoView, _super);
        function LogoView() {
            var _this = _super.call(this) || this;
            _this.index = 0;
            _this.size(Laya.stage.width, Laya.stage.height);
            _this.color = "#ffffff";
            var logo = new Image("frog/logo.png");
            logo.centerX = 0;
            logo.centerY = 0;
            _this.addChild(logo);
            var countDown = 3;
            Laya.timer.loop(1000, _this, function () {
                countDown--;
                if (countDown < 0) {
                    Laya.timer.clearAll(_this);
                    Tween.to(logo, { opacity: 0.2 }, 800, null, Handler.create(_this, function () {
                        _this.beginGame();
                    }));
                }
            });
            return _this;
        }
        LogoView.prototype.beginGame = function () {
            var lobby = new lobby_1.LobbyMainView();
            Laya.stage.addChild(lobby);
            this.clear();
        };
        LogoView.prototype.clear = function () {
            Laya.loader.clearRes("frog/logo.png");
            this.destroy();
        };
        return LogoView;
    }(ViewColor));
    lobby_1.LogoView = LogoView;
})(lobby || (lobby = {}));
//# sourceMappingURL=LogoView.js.map