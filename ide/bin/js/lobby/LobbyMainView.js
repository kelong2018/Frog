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
    var KColorButton = kelong.ui.KColorButton;
    var LangConfig = def.LanguageConfig;
    var LobbyMainView = /** @class */ (function (_super) {
        __extends(LobbyMainView, _super);
        function LobbyMainView() {
            var _this = _super.call(this) || this;
            _this.index = 0;
            _this.color = "#3584fb";
            _this.size(Laya.stage.width, Laya.stage.height);
            _this.graphics.drawRect(0, 0, _this.width, _this.height, _this.color);
            _this.getMyScore();
            _this.initView();
            _this.loadSomeAnimation();
            return _this;
        }
        //加载一些游戏中要使用的动画，生成模板
        LobbyMainView.prototype.loadSomeAnimation = function () {
            var anis = def.SourceConfig.animationSource;
            for (var ani in anis) {
                var animation = new Laya.Animation();
                animation.loadAnimation(anis[ani], Laya.Handler.create(this, function () {
                }));
            }
        };
        LobbyMainView.prototype.initView = function () {
            var _this = this;
            //背景
            var bg = new Image("frog/bg.png");
            bg.bottom = 0;
            bg.width = this.width;
            this.addChild(bg);
            this.ha = new Image();
            this.ha.skin = def.getSource("ha.png");
            this.ha.bottom = 0;
            var rate = this.width / this.ha.width;
            this.ha.scale(rate, rate);
            this.addChild(this.ha);
            //语言切换
            var langStr = def.getLanguageStr(def.LanguageConfig.Keys.LANGUAGE);
            //语言设置
            this.setBtn = new KColorButton(100, 50, 25, "#e6755b", langStr);
            this.setBtn.top = 100;
            this.setBtn.right = 30;
            this.setBtn.on(Event.CLICK, this, function () {
                var value = "ch";
                if (LangConfig.Lang == LangConfig.Langs.ch) {
                    value = "en";
                }
                Storage.setItem("language", value);
                // Browser.window.location.reload(); //重启(bug)
                LangConfig.Lang = value;
                _this.setLanguage();
            });
            this.addChild(this.setBtn);
            if (def.GameConfig.MYSCORE > 0) {
                this.tip = new Image("frog/img_tip.png");
                this.tip.top = 0;
                this.tip.centerX = 0;
                this.tip.width = 490;
                if (def.LanguageConfig.Lang == def.LanguageConfig.Langs.en) {
                    this.tip.width = 520;
                }
                this.addChild(this.tip);
                var str = def.getLanguageStr(LangConfig.Keys.RANK) + this.getRanck() + def.getLanguageStr(LangConfig.Keys.RANK1);
                this.rank = new Label(str);
                this.rank.font = "黑体";
                this.rank.fontSize = 24;
                this.rank.color = "#ffffff";
                this.rank.centerX = 0;
                this.rank.centerY = 0;
                this.tip.addChild(this.rank);
            }
            this.button = new Image();
            this.button.skin = def.getSource("button_begin.png");
            this.button.anchorX = 0.5;
            this.button.anchorY = 0.5;
            this.button.centerX = 0;
            this.button.y = this.ha.height * 0.36;
            this.ha.addChild(this.button);
            this.button.on(Event.MOUSE_OUT, this, function () {
                _this.button.scale(1, 1);
            });
            this.button.on(Event.MOUSE_DOWN, this, function () {
                _this.button.scale(0.9, 0.9);
            });
            this.button.on(Event.MOUSE_UP, this, function () {
                _this.button.scale(1, 1);
            });
            this.button.on(Event.CLICK, this, this.beginGame);
            var frog = new Frog;
            frog.centerX = 0;
            frog.y = this.button.y - 240;
            frog.scale(2.5, 2.5);
            frog.jump.play(0, true);
            this.ha.addChild(frog);
            this.label_loading = new Label;
            this.label_loading.text = def.getLanguageStr(LangConfig.Keys.LOADING);
            this.label_loading.font = "黑体";
            this.label_loading.bold = true;
            this.label_loading.color = "#e6755b";
            this.label_loading.centerX = 0;
            this.label_loading.y = this.button.y + 20;
            this.label_loading.fontSize = 40;
            this.ha.addChild(this.label_loading);
            this.showAd();
        };
        LobbyMainView.prototype.showAd = function () {
            var _this = this;
            //广告加载后方可进入游戏          
            this.label_loading.visible = true;
            this.button.visible = false;
            utl.ThirdSdk.bannerAD(true, function (json) {
                console.log("======>>>>>> bannerAd back : " + json);
                var val = JSON.parse(json);
                console.log(val.ret);
                _this.label_loading.visible = false;
                _this.button.visible = true;
            });
            //3秒后可以进入游戏
            var countDown = 3;
            Laya.timer.loop(1000, this, function () {
                countDown--;
                if (countDown < 0) {
                    Laya.timer.clearAll(_this);
                    _this.label_loading.visible = false;
                    _this.button.visible = true;
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
        LobbyMainView.prototype.setView = function () {
            this.ha.skin = def.getSource("ha.png");
            if (def.GameConfig.MYSCORE > 0) {
                this.tip.width = 490;
                if (def.LanguageConfig.Lang == def.LanguageConfig.Langs.en) {
                    this.tip.width = 520;
                }
                this.rank.text = def.getLanguageStr(LangConfig.Keys.RANK) + this.getRanck() + def.getLanguageStr(LangConfig.Keys.RANK1);
            }
            this.button.skin = def.getSource("button_begin.png");
            this.setBtn.setLabel(def.getLanguageStr(def.LanguageConfig.Keys.LANGUAGE));
            this.label_loading.text = def.getLanguageStr(LangConfig.Keys.LOADING);
        };
        LobbyMainView.prototype.setLanguage = function () {
            var _this = this;
            var lanSource = def.SourceConfig.gameSourceEn;
            var nenSource = def.SourceConfig.gameSourceCh;
            if (LangConfig.Lang == LangConfig.Langs.en) {
                lanSource = def.SourceConfig.gameSourceCh;
                nenSource = def.SourceConfig.gameSourceEn;
            }
            var logo = new lobby.LogoView;
            this.addChild(logo);
            for (var i = 0; i < lanSource.length; ++i) {
                Laya.loader.clearRes(lanSource[i].url);
            }
            Laya.loader.load(nenSource, new Laya.Handler(this, function () {
                nenSource = null;
                _this.setView();
                _this.showAd();
                logo.removeSelf();
                logo.destroy();
            }));
        };
        LobbyMainView.prototype.getRanck = function () {
            // let now = new Date().getTime();
            // let begin = new Date("2018.7.1").getTime();
            // let difDays = Math.floor((now - begin)/(1000*60*60*24));
            var myScore = def.GameConfig.MYSCORE;
            var maxScore = 200; //设计一个区间
            var begin = 0;
            var add = 0;
            if (myScore > 150) {
                begin = 99;
            }
            else if (myScore > 120) {
                begin = 90;
                add = (myScore - 120) * 9 / (150 - 120);
            }
            else if (myScore > 100) {
                begin = 84;
                add = (myScore - 100) * 6 / (120 - 100);
            }
            else if (myScore > 90) {
                begin = 76;
                add = (myScore - 90) * 8 / (100 - 90);
            }
            else if (myScore > 80) {
                begin = 70;
                add = (myScore - 80) * 6 / (90 - 80);
            }
            else if (myScore > 70) {
                begin = 60;
                add = (myScore - 70) * 10 / (80 - 70);
            }
            else if (myScore > 60) {
                begin = 40;
                add = (myScore - 60) * 20 / (70 - 60);
            }
            else if (myScore > 40) {
                begin = 20;
                add = (myScore - 40) * 20 / (60 - 40);
            }
            else if (myScore > 20) {
                begin = 8;
                add = (myScore - 20) * 12 / (40 - 20);
            }
            else if (myScore > 10) {
                begin = 3;
                add = (myScore - 10) * 10 / (20 - 10);
            }
            else if (myScore > 0) {
                begin = 1;
            }
            else {
                begin = 0;
            }
            return Math.floor(begin + add) + "%";
        };
        return LobbyMainView;
    }(ViewColor));
    lobby.LobbyMainView = LobbyMainView;
})(lobby || (lobby = {}));
//# sourceMappingURL=LobbyMainView.js.map