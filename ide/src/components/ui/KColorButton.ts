namespace kelong.ui {
    import Label = Laya.Label;
    import Event = Laya.Event;
    import Box = Laya.Box;
    import Sprite = Laya.Sprite;

    export class KColorButton extends Box {
        constructor(txt) {
            super();

            this.size(240, 67);
            let sp_bg = new Sprite;
            sp_bg.graphics.drawRect(0, 0, this.width, this.height, "#000000");
            sp_bg.alpha = 0.1;
            this.addChild(sp_bg);
            let sp_line = new Sprite;
            sp_line.graphics.drawLines(0, 0, [0, 0, this.width, 0, this.width, this.height, 0, this.height, 0, 0], "#ffffff", 2);
            this.addChild(sp_line);

            let label = new Label(txt);
            label.font = "黑体";
            label.color = "#ffffff";
            label.fontSize = 48;
            label.bold = true;
            label.centerX = 0;
            label.centerY = 0;
            this.addChild(label);
            
            this.on(Event.MOUSE_OUT, this, () => {
                this.scale(1, 1);
            });
            this.on(Event.MOUSE_DOWN, this, () =>{
                this.scale(0.9, 0.9);
            });
            this.on(Event.MOUSE_UP, this, () => {
                this.scale(1, 1);
            });
        }
    }
}