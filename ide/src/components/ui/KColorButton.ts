namespace kelong.ui {
    import Label = Laya.Label;
    import Event = Laya.Event;
    import Box = Laya.Box;
    import Sprite = Laya.Sprite;

    export class KColorButton extends Box {

        label: Label;

        constructor(w, h, fontSize, color, txt) {
            super();

            this.size(w, h);
            this.anchorX = 0.5;
            this.anchorY = 0.5;
            let sp_bg = new Sprite;
            sp_bg.graphics.drawRect(0, 0, this.width, this.height, "#000000");
            sp_bg.alpha = 0.2;
            this.addChild(sp_bg);
            let sp_line = new Sprite;
            sp_line.graphics.drawLines(0, 0, [0, 0, this.width, 0, this.width, this.height, 0, this.height, 0, 0], color, 2);
            this.addChild(sp_line);

            this.label = new Label(txt);
            this.label.font = "黑体";
            this.label.color = color;
            this.label.fontSize = fontSize;
            this.label.bold = true;
            this.label.centerX = 0;
            this.label.centerY = 0;
            this.addChild(this.label);
            
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
        //设置文字
        setLabel(str) {
            this.label.text = str;
        }
    }
}