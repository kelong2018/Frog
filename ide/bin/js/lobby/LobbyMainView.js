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
(function (lobby) {
    var GameMainView = game.GameMainView;
    var Frog = ui.game.FrogJumpUI;
    var ViewColor = kelong.ui.ViewColor;
    var Image = Laya.Image;
    var Label = Laya.Label;
    var Event = Laya.Event;
    var LobbyMainView = /** @class */ (function (_super) {
        __extends(LobbyMainView, _super);
        function LobbyMainView() {
            var _this = _super.call(this) || this;
            _this.index = 0;
            _this.a = false;
            _this.size(Laya.stage.width, Laya.stage.height);
            _this.color = "3584fb";
            //背景
            var bg = new Image("frog/bg.png");
            bg.bottom = 0;
            bg.width = _this.width;
            _this.addChild(bg);
            var tip = new Image("frog/img_tip.png");
            tip.top = 0;
            tip.centerX = 0;
            // tip.visible = false;
            _this.addChild(tip);
            var rank = new Label("你超过越了全世界85%的蛙");
            rank.font = "黑体";
            rank.fontSize = 30;
            rank.color = "#ffffff";
            rank.centerX = 0;
            rank.centerY = 0;
            tip.addChild(rank);
            var button = new Image("frog/button_begin.png");
            button.centerX = 0;
            button.centerY = 0;
            _this.addChild(button);
            button.on(Event.MOUSE_OUT, _this, function () {
                button.scale(1, 1);
            });
            button.on(Event.MOUSE_DOWN, _this, function () {
                button.scale(0.9, 0.9);
            });
            button.on(Event.MOUSE_UP, _this, function () {
                button.scale(1, 1);
            });
            button.on(Event.CLICK, _this, _this.beginGame);
            var logo = new Image("frog/logo.png");
            logo.centerX = 0;
            logo.y = 160;
            _this.addChild(logo);
            var frog = new Frog;
            frog.centerX = 0;
            frog.y = 240;
            frog.scale(2.5, 2.5);
            frog.jump.play(0, true);
            _this.addChild(frog);
            _this.label_loading = new Label;
            _this.label_loading.text = "加载中...";
            _this.label_loading.font = "黑体";
            _this.label_loading.bold = true;
            _this.label_loading.color = "#ffffff";
            _this.label_loading.centerX = 0;
            _this.label_loading.y = 460;
            _this.label_loading.fontSize = 40;
            _this.addChild(_this.label_loading);
            //广告加载后方可进入游戏          
            _this.label_loading.visible = true;
            button.visible = false;
            utl.ThirdSdk.bannerAD(true, function (json) {
                console.log("======>>>>>> bannerAd back : " + json);
                var val = JSON.parse(json);
                console.log(val.ret);
                _this.label_loading.visible = false;
                button.visible = true;
            });
            //5秒后可以进入游戏
            var countDown = 3;
            Laya.timer.loop(1000, _this, function () {
                countDown--;
                if (countDown < 0) {
                    Laya.timer.clearAll(_this);
                    _this.label_loading.visible = false;
                    button.visible = true;
                }
            });
            return _this;
        }
        LobbyMainView.prototype.beginGame = function () {
            utl.ThirdSdk.bannerAD(false, function (json) {
                console.log("======>>>>>> bannerAd back : ", json);
            });
            var game = new GameMainView(def.GAMEMODE.MODE1);
            Laya.stage.addChild(game);
            this.destroy();
        };
        return LobbyMainView;
    }(ViewColor));
    lobby.LobbyMainView = LobbyMainView;
})(lobby || (lobby = {}));
//# sourceMappingURL=LobbyMainView.js.map