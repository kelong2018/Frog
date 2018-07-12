namespace game {
    import View = Laya.View;
    import KColorButton = kelong.ui.KColorButton;
    import Event = Laya.Event;
    import Label = Laya.Label;

    export class AdLoadingView extends View {
        //event
        CLOSEEVENT = "close_event";

        constructor(w, h, color) {
            super();
            this.size(w, h);
            this.graphics.drawRect(0, 0, w, h, color);

            let closeBtn = new KColorButton(100, 50, 25, "#ffffff", def.getLanguageStr(def.LanguageConfig.Keys.CLOSE));
            closeBtn.top = 100;
            closeBtn.right = 30;
            closeBtn.on(Event.CLICK, this, ()=>{
                this.event(this.CLOSEEVENT);
            });
            this.addChild(closeBtn);

            let tip = new Label(def.getLanguageStr(def.LanguageConfig.Keys.ADLOADING));
            tip.color = "#ffffff";
            tip.font = "黑体";
            tip.fontSize = 40;
            tip.centerX = 0;
            tip.centerY = 0;
            this.addChild(tip);
        }
    }
}