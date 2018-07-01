namespace kelong.ui {
    import Label = Laya.Label;
    import Event = Laya.Event;
    import Box = Laya.Box;
    import Sprite = Laya.Sprite;

    export class KButtonGO extends Box {
        constructor(txt) {
            super();

            this.size(366, 300);

            let label1 = new Label(txt);
            label1.fontSize = 300;
            label1.color = "#888888";
            label1.font = "SimHei";
            label1.bold = true;
            label1.centerX = 10;
            label1.centerY = 0;
            this.addChild(label1);
            
            let label2 = new Label(txt);
            label2.fontSize = 300;
            label2.color = "#ffffff";
            label2.font = "SimHei";
            label2.bold = true;
            label2.centerX = 0;
            label2.centerY = 0;
            this.addChild(label2);
            
            this.on(Event.MOUSE_OUT, this, () => {
                label2.centerX = 0;
            });
            this.on(Event.MOUSE_DOWN, this, () =>{
                label2.centerX = 10;
            });
            this.on(Event.MOUSE_UP, this, () => {
                label2.centerX = 0;
            });
        }
    }
}