namespace lobby {
    import GameMainView = game.GameMainView;
    import FrogJumpView = game.FrogJumpView;
    import ViewColor = kelong.ui.ViewColor;
    import Image = Laya.Image;
    import Tween = Laya.Tween;
    import Handler = Laya.Handler;

    export class LogoView extends ViewColor {

        index = 0;
        countDown = 3;
        ready: false;

        constructor() {
            super();
            this.size(Laya.stage.width, Laya.stage.height);
            this.color = "#ffffff";

            let logo = new Image("frog/logo.jpg")
            let rate = logo.height / logo.width;
            logo.width = Laya.stage.width;
            logo.height = logo.width * rate;
            logo.centerX = 0;
            logo.centerY = 0;
            this.addChild(logo);
            Laya.timer.loop(1000, this, () => {  //倒计时
                this.countDown--;
                if (this.countDown < 1) {
                    Laya.timer.clearAll(this);
                    Tween.to(logo, { opacity: 0.2 }, 800, null, Handler.create(this, () => {
                        this.beginGame();
                    }));
                }
            });
        }

        beginGame() {
            if (this.countDown < 1 && this.ready) {
                let lobby = new LobbyMainView();
                Laya.stage.addChild(lobby);
                this.clear();
            }
        }
        clear() {
            Laya.loader.clearRes("frog/logo.png");
            this.destroy();
        }
    }
}