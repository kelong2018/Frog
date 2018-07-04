namespace game {
    import Sprite = Laya.Sprite;
    import Image = Laya.Image;

    export class ScrollView extends Sprite {

        waters = [];
        picWidth = 0;
        picHeight = 0;
        lastPic = null;
        source;

        constructor(src) {
            super();
            this.source = src;
            this.init();
        }

        init() {
            let water1 = new Image();
            water1.skin = this.source;
            water1.x = 0;
            this.addChild(water1);
            this.waters.push(water1);
            
            this.picWidth = water1.width;
            this.picHeight = water1.height;
            
            let num = Math.floor(Laya.stage.width/water1.width);
            for(let i = 0; i < num + 1; i++) {
                let water = new Image(this.source);
                water.x = this.picWidth * (i + 1);
                this.addChild(water);
                this.waters.push(water);
            }
            this.lastPic = this.waters[this.waters.length - 1];
        }

        run(rate) {
            for(let i = 0; i < this.waters.length; i++) {
                if(this.waters[i].x + this.picWidth < -1) {
                    this.waters[i].x = this.lastPic.x + this.picWidth;
                    this.lastPic = this.waters[i];
                }
                this.waters[i].x -= rate;
            }
        }
    }
}