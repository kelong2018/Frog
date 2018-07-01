namespace lobby {
    import GameMainView = game.GameMainView;
    import Frog = ui.game.FrogJumpUI;
    import ViewColor = kelong.ui.ViewColor;
    import Image = Laya.Image;
    import Label = Laya.Label;
    import Event = Laya.Event;
    import Browser = Laya.Browser;

    export class LobbyMainView extends ViewColor {

        index = 0;
        label_loading: Label;
        
        a = false;

        constructor() {
            super();
            this.size(Laya.stage.width, Laya.stage.height);
            this.color = "3584fb";
            
            //背景
            let bg = new Image("frog/bg.png");
            bg.bottom = 0;
            bg.width = this.width;
            this.addChild(bg);
            let tip = new Image("frog/img_tip.png");
            tip.top = 0;
            tip.centerX = 0;
            // tip.visible = false;
            this.addChild(tip);
            let rank = new Label("你超过越了全世界85%的蛙");
            rank.font = "黑体";
            rank.fontSize = 30;
            rank.color = "#ffffff";
            rank.centerX = 0;
            rank.centerY = 0;
            tip.addChild(rank);
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
    }
}