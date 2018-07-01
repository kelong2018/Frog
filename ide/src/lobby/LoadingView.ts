namespace lobby {
    import GameMainView = game.GameMainView;
    import FrogJumpView = game.FrogJumpView;
    import ViewColor = kelong.ui.ViewColor;

    export class LoadingView extends ViewColor {

        index = 0;
        constructor() {
            super();
            this.size(Laya.stage.width, Laya.stage.height);
            this.color = "3584fb";

            // label_begin

            this.on(Laya.Event.CLICK, this, this.beginGame);
            
            let frog = new ui.game.FrogJumpUI;
            frog.centerX = 0;
            frog.centerY = 0;
            frog.jump.play(0, true);
            this.addChild(frog);
        }

        beginGame() {
            let lobby = new LobbyMainView();
            Laya.stage.addChild(lobby);
            this.destroy();
        }
    }
}