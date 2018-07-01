namespace kelong.ui {
    import Label = Laya.Label;
    import Event = Laya.Event;

    export class KLabelButton extends Label {
        constructor(txt) {
            super();
            this.text = txt;
            this.font = "黑体";
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