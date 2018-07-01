namespace kelong.ui {
    import Event = Laya.Event;
    // import Box = laya.editerUI.View;
    import View = laya.ui.View;

    export class ViewColor extends View {
        color:string;
        constructor() {
            super();
            
            this.left = this.right = this.top = this.bottom = 0;

            //this.width = Laya.stage.width;
            //this.height = Laya.stage.height;
            // if (Laya.Browser.onPC) {
            //     Laya.stage.on(Laya.Event.RESIZE, this, () => {

            //         let w = Browser.clientWidth * Browser.pixelRatio;
            //         let h = Browser.clientHeight * Browser.pixelRatio;

            //         Laya.stage.desginWidth = w;
            //         Laya.stage.desginHeight = h;
            //         setTimeout(() => {
            //             Laya.stage.setScreenSize(w, h);
            //             try {
            //                 this.width = w;
            //                 this.height = h;
            //             } catch (e) { }

            //         }, 10);

            //     });
                
            // }

            this.on(Event.RESIZE, this, () => {
                if (this.color) {
                    this.graphics.drawRect(0, 0, this.width, this.height, this.color);
                }
            });    

        }
    }
}