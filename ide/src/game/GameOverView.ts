namespace game {
    import Event = Laya.Event;
    import GameConfig = def.GameConfig;
    import Sprite = Laya.Sprite;
    import KLabelButton = kelong.ui.KLabelButton;
    import KColorButton = kelong.ui.KColorButton;
    import Image = Laya.Image;
    import Browser = Laya.Browser;

    export class GameOverView extends ui.game.GameOverUI {
        btn_ad: KColorButton;
        btn_rank: KColorButton;
        btn_agin: KColorButton;

        //event
        AGIN = "playAgin";
        ADEND = "adEnd";

        constructor(socre) {
            super();
            this.size(Laya.stage.width, Laya.stage.height);
            this.sp_bg.graphics.drawRect(0, 0, this.width, this.height, "#3485fb");
            this.list.renderHandler = new Laya.Handler(this, this.renderItem);

            this.box_title.graphics.drawRect(0, 0, this.box_title.width, this.box_title.height, "#78cbbb");
            this.box_listBg.graphics.drawRect(0, 0, this.box_listBg.width, this.box_listBg.height, "#cdffe3");            
            this.sp_rect.graphics.drawLines(0, 0, [2, 2, this.box_list.width-4, 2, this.box_list.width-4, this.box_list.height-4, 2, this.box_list.height-4, 2, 2], "#010303", 4);
            this.sp_rect.graphics.drawLines(0, 0, [0, 0, this.box_list.width, 0, this.box_list.width, this.box_list.height, 0, this.box_list.height, 0, 0], "#ffffff", 2);
            this.img_close.on(Event.MOUSE_OUT, this, () => {
                this.img_close.scale(1, 1);
            });
            this.img_close.on(Event.MOUSE_DOWN, this, () =>{
                this.img_close.scale(0.9, 0.9);
            });
            this.img_close.on(Event.MOUSE_UP, this, () => {
                this.img_close.scale(1, 1);
            });
            this.img_close.on(Event.CLICK, this, () => {
                this.box_list.visible = false;
                this.label_get.visible = true;
                this.label_score.visible = true;
                this.btn_ad.visible = true;
                this.btn_rank.visible = true;
                this.btn_agin.visible = true;
            });
            this.box_my.graphics.drawRect(0,0, this.box_my.width, this.box_my.height, "#d5ff79");
            this.box_my.graphics.drawCircle(20, this.box_my.height-40, 20, "#8dc9a5");
            this.box_my.graphics.drawCircle(this.box_my.width-20, this.box_my.height-40, 20, "#8dc9a5");
            this.box_my.graphics.drawRect(20, this.box_my.height-60, this.box_my.width-40, 40, "#8dc9a5");

            this.list.vScrollBarSkin = "";
            this.label_score.text = socre;

            //广告
            this.btn_ad = new KColorButton("广告续命");
            this.btn_ad.centerX = 0;
            this.btn_ad.centerY = -80;
            this.addChild(this.btn_ad);
            this.btn_ad.on("click", this, () => {
                this.adOperator();
            });

            //排行
            this.btn_rank = new KColorButton("排行总榜");
            this.btn_rank.centerX = 0;
            this.btn_rank.centerY = 40;
            this.addChild(this.btn_rank);
            this.btn_rank.on("click", this, () => {
                this.showRank();
            });

            //再来一把
            this.btn_agin = new KColorButton("再来一盘");
            this.btn_agin.centerX = 0;
            this.btn_agin.centerY = 160;
            this.addChild(this.btn_agin);
            this.btn_agin.on("click", this, () => {
                this.event(this.AGIN);
                this.removeSelf();
                this.destroy();
            });

            if(Browser.onAndriod || Browser.onIOS) {
                this.btn_rank.visible = false;
                this.btn_ad.centerY = -60;
                this.btn_agin.centerY = 60;
            }
        }

        //广告
        adOperator() {
            utl.ThirdSdk.videoAD((finish)=>{
                if(finish) {                    
                    this.event(this.ADEND);
                    this.removeSelf();
                    this.destroy();
                }
            })
        }

        //排行榜
        showRank() {
            this.label_get.visible = false;
            this.label_score.visible = false;
            this.btn_ad.visible = false;
            this.btn_rank.visible = false;
            this.btn_agin.visible = false;
            this.box_list.visible = true;

            if (this.list.array == null || this.list.array.length == 0) {
                let listArr = [];
                for (let i = 0; i < 10; i++) {
                    // let data = arr[i];
                    let item = {
                        label_rank: { text: i + "" },
                        img_head: { skin: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1528762687&di=e64ab46df2f8aa276b537ed67943c63a&src=http://imgsrc.baidu.com/imgad/pic/item/9d82d158ccbf6c8154bdd5ccb63eb13533fa4008.jpg" },
                        label_name: { text: "wang" + i },
                        label_score: { text: (10000 + i) + "" },
                    }
                    listArr.push(item);
                }
                this.list.array = listArr;
            }

            this.label_Myrank.text = "1";
            this.img_Myhead.skin = "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1528762687&di=e64ab46df2f8aa276b537ed67943c63a&src=http://imgsrc.baidu.com/imgad/pic/item/9d82d158ccbf6c8154bdd5ccb63eb13533fa4008.jpg";
            this.label_Myname.text = "100";
            this.label_Myscore.text = "1000";
        }

        /**
         * 渲染集体item
         * @param cell 
         * @param idx 
         */
        renderItem(cell: Laya.Box, idx: number) {
            // cell.graphics.clear();
            if(idx == 0) {
                let bg = cell.getChildByName("rank_bg") as Image;
                bg.visible = true;
                bg.skin = "frog/rank1.png";
                let lable = cell.getChildByName("label_rank") as Laya.Label;
                lable.color = "#585959"
            } else if(idx == 1) {
                let bg = cell.getChildByName("rank_bg") as Image;
                bg.visible = true;
                bg.skin = "frog/rank1.png";
                let lable = cell.getChildByName("label_rank") as Laya.Label;
                lable.color = "#585959"
            } else if(idx == 2) {
                let bg = cell.getChildByName("rank_bg") as Image;
                bg.visible = true;
                bg.skin = "frog/rank1.png";
                let lable = cell.getChildByName("label_rank") as Laya.Label;
                lable.color = "#585959"
            }
            cell.graphics.drawCircle(20, cell.height-20, 20, "#8dc9a5");
            cell.graphics.drawCircle(cell.width-20, cell.height-20, 20, "#8dc9a5");
            cell.graphics.drawRect(20, cell.height-40, cell.width-40, 40, "#8dc9a5");
        }
    }
}
