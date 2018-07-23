namespace lobby {
    import GameMainView = game.GameMainView;
    import Frog = ui.game.FrogJumpUI;
    import ViewColor = kelong.ui.ViewColor;
    import Image = Laya.Image;
    import Label = Laya.Label;
    import Event = Laya.Event;
    import Browser = Laya.Browser;
    import Storage = laya.net.LocalStorage;
    import KColorButton = kelong.ui.KColorButton;
    import LangConfig = def.LanguageConfig;
    
    export class LobbyMainView extends ViewColor {

        index = 0;
        label_loading: Label;
        button: Image;
        ha: Image;
        setBtn: KColorButton;
        rank: Label;
        tip: Image;

        constructor() {
            super();
            this.color = "#3584fb";
            this.size(Laya.stage.width, Laya.stage.height);
            this.graphics.drawRect(0, 0, this.width, this.height, this.color);
            
            this.getMyScore();
            this.initView();
            this.loadSomeAnimation();
        }
        
        //加载一些游戏中要使用的动画，生成模板
        loadSomeAnimation() {
            let anis = def.SourceConfig.animationSource;
            for (let ani in anis) {
                let animation = new Laya.Animation();
                animation.loadAnimation(anis[ani], Laya.Handler.create(this, () => {                    
                }));
            }
        }

        initView() {
            //背景
            let bg = new Image("frog/bg.png");
            bg.bottom = 0;
            bg.width = this.width;
            this.addChild(bg);
            this.ha = new Image();
            this.ha.skin = def.getSource("ha.png");
            this.ha.bottom = 0;
            let rate = this.width/this.ha.width;
            this.ha.scale(rate, rate);
            this.addChild(this.ha);
            //语言切换
            let langStr = def.getLanguageStr(def.LanguageConfig.Keys.LANGUAGE);
            //语言设置
            this.setBtn = new KColorButton(100, 50, 25, "#e6755b", langStr);
            this.setBtn.top = 100;
            this.setBtn.right = 30;
            this.setBtn.on(Event.CLICK, this, ()=>{
                let value = "ch";
                if(LangConfig.Lang == LangConfig.Langs.ch) {
                    value = "en";
                }
                Storage.setItem("language", value);
                // Browser.window.location.reload(); //重启(bug)
                LangConfig.Lang = value;
                this.setLanguage();
            });
            this.addChild(this.setBtn);

            if(def.GameConfig.MYSCORE > 0) {
                this.tip = new Image("frog/img_tip.png");
                this.tip.top = 0;
                this.tip.centerX = 0;
                this.tip.width = 490;
                if(def.LanguageConfig.Lang == def.LanguageConfig.Langs.en) {
                    this.tip.width = 520;
                }
                this.addChild(this.tip);
                let str = def.getLanguageStr(LangConfig.Keys.RANK) + this.getRanck() + def.getLanguageStr(LangConfig.Keys.RANK1);
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
            this.button.anchorX=0.5
            this.button.anchorY=0.5
            this.button.centerX = 0;
            this.button.y = this.ha.height * 0.36
            this.ha.addChild(this.button);
            this.button.on(Event.MOUSE_OUT, this, () => {
                this.button.scale(1, 1);
            });
            this.button.on(Event.MOUSE_DOWN, this, () =>{
                this.button.scale(0.9, 0.9);
            });
            this.button.on(Event.MOUSE_UP, this, () => {
                this.button.scale(1, 1);
            });
            this.button.on(Event.CLICK, this, this.beginGame);

            let frog = new Frog;
            frog.centerX = 0;
            frog.y = this.button.y - 240;
            frog.scale(2.5,2.5);
            frog.jump.play(0, true);
            this.ha.addChild(frog);

            this.label_loading = new Label;
            this.label_loading.text = def.getLanguageStr(LangConfig.Keys.LOADING);
            this.label_loading.font = "黑体"
            this.label_loading.bold = true;
            this.label_loading.color = "#e6755b";
            this.label_loading.centerX = 0;
            this.label_loading.y = this.button.y + 20;
            this.label_loading.fontSize = 40;
            this.ha.addChild(this.label_loading);

            this.showAd();
        }

        showAd() {
            //广告加载后方可进入游戏          
            this.label_loading.visible = true;
            this.button.visible = false;
            utl.ThirdSdk.bannerAD(true, (json)=>{
                console.log("======>>>>>> bannerAd back : " + json);
                let val = JSON.parse(json);
                console.log(val.ret);
                this.label_loading.visible = false;
                this.button.visible = true;
            })

            //3秒后可以进入游戏
            let countDown = 3;
            Laya.timer.loop(1000, this, () => {  //倒计时
                countDown--;
                if (countDown < 0) {
                    Laya.timer.clearAll(this);
                    this.label_loading.visible = false;
                    this.button.visible = true;
                }
            });
        }

        beginGame() {
            utl.ThirdSdk.bannerAD(false, (json)=>{
                console.log("======>>>>>> bannerAd back : ", json);
            });
            let game = new GameMainView(def.GAMEMODE.MODE1);
            Laya.stage.addChild(game);
            this.destroy();
        }

        getMyScore() {
            let score = Storage.getItem("score");
            if(score != null && score != "") {
                def.GameConfig.MYSCORE = parseInt(score);
            }
        }

        setView() {
            this.ha.skin = def.getSource("ha.png");

            if(def.GameConfig.MYSCORE > 0) {
                this.tip.width = 490;
                if(def.LanguageConfig.Lang == def.LanguageConfig.Langs.en) {
                    this.tip.width = 520;
                }
                this.rank.text = def.getLanguageStr(LangConfig.Keys.RANK) + this.getRanck() + def.getLanguageStr(LangConfig.Keys.RANK1);
            }
            
            this.button.skin = def.getSource("button_begin.png");
            this.setBtn.setLabel(def.getLanguageStr(def.LanguageConfig.Keys.LANGUAGE));
            this.label_loading.text = def.getLanguageStr(LangConfig.Keys.LOADING);
        }

        setLanguage() {
            let lanSource = def.SourceConfig.gameSourceEn;
            let nenSource = def.SourceConfig.gameSourceCh;
            if (LangConfig.Lang == LangConfig.Langs.en) {
                lanSource = def.SourceConfig.gameSourceCh;
                nenSource = def.SourceConfig.gameSourceEn;
            }
            let logo = new LogoView;
            this.addChild(logo);
            for (let i = 0; i < lanSource.length; ++i) {
                Laya.loader.clearRes(lanSource[i].url);
            }
            Laya.loader.load(nenSource, new Laya.Handler(this, () => {
                nenSource = null;
                this.setView();
                this.showAd();
                logo.removeSelf();
                logo.destroy();
            }));
        }

        getRanck() {
            // let now = new Date().getTime();
            // let begin = new Date("2018.7.1").getTime();
            // let difDays = Math.floor((now - begin)/(1000*60*60*24));
            let myScore = def.GameConfig.MYSCORE;
            let maxScore = 200;  //设计一个区间
            let begin = 0;
            let add = 0;
            if(myScore > 500) {
                begin = 99;
            } else if(myScore > 400) {
                begin = 90;
                add = (myScore - 400) * 9 / (500-400)
            } else if(myScore > 300) {
                begin = 84;
                add = (myScore - 300) * 6 / (400-300)
            } else if(myScore > 200) {
                begin = 76;
                add = (myScore - 200) * 8 / (300-200)
            } else if(myScore > 160) {
                begin = 70;
                add = (myScore - 160) * 6 / (200-160)
            } else if(myScore > 140) {
                begin = 60;
                add = (myScore - 140) * 10 / (160-140)
            } else if(myScore > 90){
                begin = 40;
                add = (myScore - 90) * 20 / (140-90)
            } else if(myScore > 80) {
                begin = 20;
                add = (myScore - 80) * 20 / (90-80);
            } else if(myScore > 40) {
                begin = 8;
                add = (myScore - 40) * 12 / (50-40);
            } else if(myScore > 30) {
                begin = 3;
                add = (myScore - 30) * 10 / (40-30)
            } else if(myScore > 0){
                begin = 1
            } else {
                begin = 0;
            }
            return Math.floor(begin + add) + "%";
        }
    }
}