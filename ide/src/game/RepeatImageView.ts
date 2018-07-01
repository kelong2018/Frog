namespace game {
    import Sprite = Laya.Sprite;
    import Image = Laya.Image;

    export class RepeatImageView extends Sprite {
        source;
        img1: Image;
        img2: Image;
        contentHeight = 0;

        constructor(pic) {
            super();
            this.source = pic;
            this.init();
        }

        init() {
            this.img1 = new Image(this.source);
            this.img1.x = 0;
            this.addChild(this.img1);
            this.contentHeight = this.img1.height;

            this.img2 = new Image(this.source);
            this.img2.anchorX = 1;
            this.img2.scaleX = -1;
            this.addChild(this.img2);
            this.img2.x = this.img1.x + this.img1.width;

            this.img1.on(Laya.Event.LOADED, this, () => {
                this.contentHeight = this.img1.height;
                this.img2.x = this.img1.x + this.img1.width;
            });
        }

        run(rate) {
            if(this.img1.x + this.img1.width < -1) {
                this.img1.x = this.img2.x + this.img2.width;
            }
            if(this.img2.x + this.img2.width < -1) {
                this.img2.x = this.img1.x + this.img1.width;
            }
            this.img1.x -= rate;
            this.img2.x -= rate;
        }
    }
}