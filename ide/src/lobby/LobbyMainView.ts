namespace lobby {
    import GameMainView = game.GameMainView;
    import Frog = ui.game.FrogJumpUI;
    import ViewColor = kelong.ui.ViewColor;
    import Image = Laya.Image;
    import Label = Laya.Label;
    import Event = Laya.Event;
    import Browser = Laya.Browser;
    import Storage = laya.net.LocalStorage;

    export class LobbyMainView extends ViewColor {

        index = 0;
        label_loading: Label;
        
        a = false;

        constructor() {
            super();
            this.color = "#3584fb";
            this.size(Laya.stage.width, Laya.stage.height);
            this.graphics.drawRect(0, 0, this.width, this.height, this.color);
            
            this.getMyScore();
            this.initView();
        }

        initView() {
            //背景
            let bg = new Image("frog/bg.png");
            bg.bottom = 0;
            bg.width = this.width;
            this.addChild(bg);
            if(def.GameConfig.MYSCORE > 0) {
                let tip = new Image("frog/img_tip.png");
                tip.top = 0;
                tip.centerX = 0;
                this.addChild(tip);
                let rank = new Label("你超过越了全世界"+this.getRanck()+"的蛙");
                rank.font = "黑体";
                rank.fontSize = 30;
                rank.color = "#ffffff";
                rank.centerX = 0;
                rank.centerY = 0;
                tip.addChild(rank);
            }
            let button = new Image("frog/button_begin.png");
            button.centerX = 0;
            button.centerY = 0;
            this.addChild(button);
            button.on(Event.MOUSE_OUT, this, () => {
                button.scale(1, 1);
            });
            button.on(Event.MOUSE_DOWN, this, () =>{
                button.scale(0.9, 0.9);
            });
            button.on(Event.MOUSE_UP, this, () => {
                button.scale(1, 1);
            });
            button.on(Event.CLICK, this, this.beginGame);

            let logo = new Image("frog/logo.png");
            logo.centerX = 0;
            logo.y = 160;
            this.addChild(logo);

            let frog = new Frog;
            frog.centerX = 0;
            frog.y = 240;
            frog.scale(2.5,2.5);
            frog.jump.play(0, true);
            this.addChild(frog);

            this.label_loading = new Label;
            this.label_loading.text = "加载中..."
            this.label_loading.font = "黑体"
            this.label_loading.bold = true;
            this.label_loading.color = "#ffffff";
            this.label_loading.centerX = 0;
            this.label_loading.y = 460;
            this.label_loading.fontSize = 40;
            this.addChild(this.label_loading);

            //广告加载后方可进入游戏          
            this.label_loading.visible = true;
            button.visible = false;
            utl.ThirdSdk.bannerAD(true, (json)=>{
                console.log("======>>>>>> bannerAd back : " + json);
                let val = JSON.parse(json);
                console.log(val.ret);
                this.label_loading.visible = false;
                button.visible = true;
            })

            //5秒后可以进入游戏
            let countDown = 3;
            Laya.timer.loop(1000, this, () => {  //倒计时
                countDown--;
                if (countDown < 0) {                    
                    Laya.timer.clearAll(this);
                    this.label_loading.visible = false;
                    button.visible = true;
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

        getRanck() {
            // let now = new Date().getTime();
            // let begin = new Date("2018.7.1").getTime();
            // let difDays = Math.floor((now - begin)/(1000*60*60*24));
            let myScore = def.GameConfig.MYSCORE;
            let maxScore = 200;  //设计一个区间
            let begin = 0;
            let add = 0;
            if(myScore < 10) {
                begin = 1;
            } else if(myScore < 20) { // %5
                begin = 5;
                add = Math.floor((myScore - 10) * 10 / 10)/10;
            } else if(myScore < 30) { //10
                begin = 10;
                add = Math.floor((myScore - 20) * 10 / 10)/10;
            } else if(myScore < 40) { //15
                begin = 15;
                add = Math.floor((myScore - 30) * 10 / 10)/10;
            } else if(myScore < 45) { //20
                begin = 20;
                add = Math.floor((myScore - 40) * 10 / 5)/10;
            } else if(myScore < 50) { //40
                begin = 40;
                add = Math.floor((myScore - 45) * 10 / 5)/10;      
            } else if(myScore < 60) { //60
                begin = 60;
                add = Math.floor((myScore - 50) * 10 / 10)/10;      
            } else if(myScore < 70) { //70
                begin = 70;
                add = Math.floor((myScore - 60) * 10 / 10)/10;
            } else if(myScore < 80) { //80
                begin = 80;
                add = Math.floor((myScore - 70) * 10 / 10)/10;
            } else if(myScore < 90) { //80
                begin = 20;
                add = Math.floor((myScore - 80) * 10 / 10)/10;
            } else if(myScore < 100) { //85
                begin = 85;
                add = Math.floor((myScore - 90) * 10 / 10)/10;
            } else if(myScore < 120) { //90
                begin = 90;
                add = Math.floor((myScore - 100) * 10 / 20)/10;
            } else {
                begin = 99;
            }
            return (begin + add) + "%";
        }
    }
}