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
    var Storage = laya.net.LocalStorage;
    var LobbyMainView = /** @class */ (function (_super) {
        __extends(LobbyMainView, _super);
        function LobbyMainView() {
            var _this = _super.call(this) || this;
            _this.index = 0;
            _this.a = false;
            _this.color = "#3584fb";
            _this.size(Laya.stage.width, Laya.stage.height);
            _this.graphics.drawRect(0, 0, _this.width, _this.height, _this.color);
            _this.getMyScore();
            _this.initView();
            return _this;
        }
        LobbyMainView.prototype.initView = function () {
            var _this = this;
            //背景
            var bg = new Image("frog/bg.png");
            bg.bottom = 0;
            bg.width = this.width;
            this.addChild(bg);
            if (def.GameConfig.MYSCORE > 0) {
                var tip = new Image("frog/img_tip.png");
                tip.top = 0;
                tip.centerX = 0;
                this.addChild(tip);
                var rank = new Label("你超过越了全世界" + this.getRanck() + "的蛙");
                rank.font = "黑体";
                rank.fontSize = 30;
                rank.color = "#ffffff";
                rank.centerX = 0;
                rank.centerY = 0;
                tip.addChild(rank);
            }
            var button = new Image("frog/button_begin.png");
            button.centerX = 0;
            button.centerY = 0;
            this.addChild(button);
            button.on(Event.MOUSE_OUT, this, function () {
                button.scale(1, 1);
            });
            button.on(Event.MOUSE_DOWN, this, function () {
                button.scale(0.9, 0.9);
            });
            button.on(Event.MOUSE_UP, this, function () {
                button.scale(1, 1);
            });
            button.on(Event.CLICK, this, this.beginGame);
            var logo = new Image("frog/logo.png");
            logo.centerX = 0;
            logo.y = 160;
            this.addChild(logo);
            var frog = new Frog;
            frog.centerX = 0;
            frog.y = 240;
            frog.scale(2.5, 2.5);
            frog.jump.play(0, true);
            this.addChild(frog);
            this.label_loading = new Label;
            this.label_loading.text = "加载中...";
            this.label_loading.font = "黑体";
            this.label_loading.bold = true;
            this.label_loading.color = "#ffffff";
            this.label_loading.centerX = 0;
            this.label_loading.y = 460;
            this.label_loading.fontSize = 40;
            this.addChild(this.label_loading);
            //广告加载后方可进入游戏          
            this.label_loading.visible = true;
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
            Laya.timer.loop(1000, this, function () {
                countDown--;
                if (countDown < 0) {
                    Laya.timer.clearAll(_this);
                    _this.label_loading.visible = false;
                    button.visible = true;
                }
            });
        };
        LobbyMainView.prototype.beginGame = function () {
            utl.ThirdSdk.bannerAD(false, function (json) {
                console.log("======>>>>>> bannerAd back : ", json);
            });
            var game = new GameMainView(def.GAMEMODE.MODE1);
            Laya.stage.addChild(game);
            this.destroy();
        };
        LobbyMainView.prototype.getMyScore = function () {
            var score = Storage.getItem("score");
            if (score != null && score != "") {
                def.GameConfig.MYSCORE = parseInt(score);
            }
        };
        LobbyMainView.prototype.getRanck = function () {
            // let now = new Date().getTime();
            // let begin = new Date("2018.7.1").getTime();
            // let difDays = Math.floor((now - begin)/(1000*60*60*24));
            var myScore = def.GameConfig.MYSCORE;
            var maxScore = 200; //设计一个区间
            var begin = 0;
            var add = 0;
            if (myScore < 10) {
                begin = 1;
            }
            else if (myScore < 20) { // %5
                begin = 5;
                add = Math.floor((myScore - 10) * 10 / 10) / 10;
            }
            else if (myScore < 30) { //10
                begin = 10;
                add = Math.floor((myScore - 20) * 10 / 10) / 10;
            }
            else if (myScore < 40) { //15
                begin = 15;
                add = Math.floor((myScore - 30) * 10 / 10) / 10;
            }
            else if (myScore < 45) { //20
                begin = 20;
                add = Math.floor((myScore - 40) * 10 / 5) / 10;
            }
            else if (myScore < 50) { //40
                begin = 40;
                add = Math.floor((myScore - 45) * 10 / 5) / 10;
            }
            else if (myScore < 60) { //60
                begin = 60;
                add = Math.floor((myScore - 50) * 10 / 10) / 10;
            }
            else if (myScore < 70) { //70
                begin = 70;
                add = Math.floor((myScore - 60) * 10 / 10) / 10;
            }
            else if (myScore < 80) { //80
                begin = 80;
                add = Math.floor((myScore - 70) * 10 / 10) / 10;
            }
            else if (myScore < 90) { //80
                begin = 20;
                add = Math.floor((myScore - 80) * 10 / 10) / 10;
            }
            else if (myScore < 100) { //85
                begin = 85;
                add = Math.floor((myScore - 90) * 10 / 10) / 10;
            }
            else if (myScore < 120) { //90
                begin = 90;
                add = Math.floor((myScore - 100) * 10 / 20) / 10;
            }
            else {
                begin = 99;
            }
            return (begin + add) + "%";
        };
        return LobbyMainView;
    }(ViewColor));
    lobby.LobbyMainView = LobbyMainView;
})(lobby || (lobby = {}));
//# sourceMappingURL=LobbyMainView.js.map