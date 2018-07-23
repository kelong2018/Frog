var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var Event = Laya.Event;
    var Storage = laya.net.LocalStorage;
    var AdLoadingView = game.AdLoadingView;
    var GameOverView = /** @class */ (function (_super) {
        __extends(GameOverView, _super);
        function GameOverView(score) {
            var _this = _super.call(this) || this;
            //event
            _this.AGIN = "playAgin";
            _this.ADEND = "adEnd";
            _this.BACKMAIN = "backMain";
            _this.size(Laya.stage.width, Laya.stage.height);
            _this.sp_bg.graphics.drawRect(0, 0, _this.width, _this.height, "#3485fb");
            _this.list.renderHandler = new Laya.Handler(_this, _this.renderItem);
            _this.loadView = new AdLoadingView(Laya.stage.width, Laya.stage.height, "#3485fb");
            _this.loadView.on(_this.loadView.CLOSEEVENT, _this, function () {
                _this.loadView.visible = false;
                utl.ThirdSdk.closeVideoAD();
            });
            _this.addChild(_this.loadView);
            _this.loadView.visible = false;
            _this.storageScore(score);
            utl.ThirdSdk.bannerAD(true, function (json) {
                console.log("======>>>>>> bannerAd back : " + json);
                var val = JSON.parse(json);
                console.log(val.ret);
            });
            _this.box_title.graphics.drawRect(0, 0, _this.box_title.width, _this.box_title.height, "#78cbbb");
            _this.box_listBg.graphics.drawRect(0, 0, _this.box_listBg.width, _this.box_listBg.height, "#cdffe3");
            _this.sp_rect.graphics.drawLines(0, 0, [2, 2, _this.box_list.width - 4, 2, _this.box_list.width - 4, _this.box_list.height - 4, 2, _this.box_list.height - 4, 2, 2], "#010303", 4);
            _this.sp_rect.graphics.drawLines(0, 0, [0, 0, _this.box_list.width, 0, _this.box_list.width, _this.box_list.height, 0, _this.box_list.height, 0, 0], "#ffffff", 2);
            _this.label_get.text = def.getLanguageStr(def.LanguageConfig.Keys.SCORE2);
            _this.label_history.text = def.getLanguageStr(def.LanguageConfig.Keys.HISTORY);
            _this.btn_agin.skin = def.getSource("imgAgin.png");
            _this.btn_ad.skin = def.getSource("adAgin.png");
            _this.btn_backMain.skin = def.getSource("backMain.png");
            _this.label_score.text = score;
            if (score > def.GameConfig.MYSCORE) {
                _this.label_high.text = score + "";
                _this.img_new.visible = true;
            }
            else {
                _this.label_high.text = def.GameConfig.MYSCORE + "";
                _this.img_new.visible = false;
            }
            //排行榜-关闭
            _this.img_close.on(Event.MOUSE_OUT, _this, function () {
                _this.img_close.scale(1, 1);
            });
            _this.img_close.on(Event.MOUSE_DOWN, _this, function () {
                _this.img_close.scale(0.9, 0.9);
            });
            _this.img_close.on(Event.MOUSE_UP, _this, function () {
                _this.img_close.scale(1, 1);
            });
            _this.img_close.on(Event.CLICK, _this, function () {
                _this.box_list.visible = false;
                _this.label_get.visible = true;
                _this.label_score.visible = true;
                _this.btn_ad.visible = true;
                _this.btn_rank.visible = true;
                _this.btn_agin.visible = true;
            });
            //再来一次
            _this.btn_agin.on(Event.MOUSE_OUT, _this, function () {
                _this.btn_agin.scale(1, 1);
            });
            _this.btn_agin.on(Event.MOUSE_DOWN, _this, function () {
                _this.btn_agin.scale(0.9, 0.9);
            });
            _this.btn_agin.on(Event.MOUSE_UP, _this, function () {
                _this.btn_agin.scale(1, 1);
            });
            _this.btn_agin.on(Event.CLICK, _this, function () {
                _this.event(_this.AGIN);
                _this.clearSelf();
            });
            //广告续命
            _this.btn_ad.on(Event.MOUSE_OUT, _this, function () {
                _this.btn_ad.scale(1, 1);
            });
            _this.btn_ad.on(Event.MOUSE_DOWN, _this, function () {
                _this.btn_ad.scale(0.9, 0.9);
            });
            _this.btn_ad.on(Event.MOUSE_UP, _this, function () {
                _this.btn_ad.scale(1, 1);
            });
            _this.btn_ad.on(Event.CLICK, _this, function () {
                console.log("click........");
                _this.adOperator();
            });
            //返回主页
            _this.btn_backMain.on(Event.MOUSE_OUT, _this, function () {
                _this.btn_backMain.scale(1, 1);
            });
            _this.btn_backMain.on(Event.MOUSE_DOWN, _this, function () {
                _this.btn_backMain.scale(0.9, 0.9);
            });
            _this.btn_backMain.on(Event.MOUSE_UP, _this, function () {
                _this.btn_backMain.scale(1, 1);
            });
            _this.btn_backMain.on(Event.CLICK, _this, function () {
                _this.event(_this.BACKMAIN);
                _this.clearSelf();
            });
            _this.box_my.graphics.drawRect(0, 0, _this.box_my.width, _this.box_my.height, "#d5ff79");
            _this.box_my.graphics.drawCircle(20, _this.box_my.height - 40, 20, "#8dc9a5");
            _this.box_my.graphics.drawCircle(_this.box_my.width - 20, _this.box_my.height - 40, 20, "#8dc9a5");
            _this.box_my.graphics.drawRect(20, _this.box_my.height - 60, _this.box_my.width - 40, 40, "#8dc9a5");
            _this.list.vScrollBarSkin = "";
            return _this;
            //排行
            // this.btn_rank = new KColorButton("排行总榜");
            // this.btn_rank.visible = false;
            // this.btn_rank.centerX = 0;
            // this.btn_rank.centerY = 40;
            // this.addChild(this.btn_rank);
            // this.btn_rank.on("click", this, () => {
            //     this.showRank();
            // });
        }
        GameOverView.prototype.storageScore = function (score) {
            if (score > def.GameConfig.MYSCORE) {
                def.GameConfig.MYSCORE = score;
                Storage.setItem("score", score + "");
            }
        };
        //广告
        GameOverView.prototype.adOperator = function () {
            var _this = this;
            this.loadView.visible = true;
            utl.ThirdSdk.videoAD(function (json) {
                console.log("======>>>>>> video back : " + json);
                var val = JSON.parse(json);
                console.log(val.ret);
                // ret == true 表示广告播完并获得奖励
                // ret == false 表示广告被关闭或者终止
                if (val.ret) {
                    _this.event(_this.ADEND);
                    _this.clearSelf();
                }
                else if (val.ret == false) {
                    _this.loadView.visible = false;
                }
            });
        };
        GameOverView.prototype.clearSelf = function () {
            utl.ThirdSdk.bannerAD(false, function (json) {
                console.log("======>>>>>> bannerAd back : ", json);
            });
            this.removeSelf();
            this.destroy();
        };
        //排行榜
        GameOverView.prototype.showRank = function () {
            this.label_get.visible = false;
            this.label_score.visible = false;
            this.btn_ad.visible = false;
            this.btn_rank.visible = false;
            this.btn_agin.visible = false;
            this.box_list.visible = true;
            if (this.list.array == null || this.list.array.length == 0) {
                var listArr = [];
                for (var i = 0; i < 10; i++) {
                    // let data = arr[i];
                    var item = {
                        label_rank: { text: i + "" },
                        img_head: { skin: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1528762687&di=e64ab46df2f8aa276b537ed67943c63a&src=http://imgsrc.baidu.com/imgad/pic/item/9d82d158ccbf6c8154bdd5ccb63eb13533fa4008.jpg" },
                        label_name: { text: "wang" + i },
                        label_score: { text: (10000 + i) + "" },
                    };
                    listArr.push(item);
                }
                this.list.array = listArr;
            }
            this.label_Myrank.text = "1";
            this.img_Myhead.skin = "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1528762687&di=e64ab46df2f8aa276b537ed67943c63a&src=http://imgsrc.baidu.com/imgad/pic/item/9d82d158ccbf6c8154bdd5ccb63eb13533fa4008.jpg";
            this.label_Myname.text = "100";
            this.label_Myscore.text = "1000";
        };
        /**
         * 渲染集体item
         * @param cell
         * @param idx
         */
        GameOverView.prototype.renderItem = function (cell, idx) {
            // cell.graphics.clear();
            if (idx == 0) {
                var bg = cell.getChildByName("rank_bg");
                bg.visible = true;
                bg.skin = "frog/rank1.png";
                var lable = cell.getChildByName("label_rank");
                lable.color = "#585959";
            }
            else if (idx == 1) {
                var bg = cell.getChildByName("rank_bg");
                bg.visible = true;
                bg.skin = "frog/rank1.png";
                var lable = cell.getChildByName("label_rank");
                lable.color = "#585959";
            }
            else if (idx == 2) {
                var bg = cell.getChildByName("rank_bg");
                bg.visible = true;
                bg.skin = "frog/rank1.png";
                var lable = cell.getChildByName("label_rank");
                lable.color = "#585959";
            }
            cell.graphics.drawCircle(20, cell.height - 20, 20, "#8dc9a5");
            cell.graphics.drawCircle(cell.width - 20, cell.height - 20, 20, "#8dc9a5");
            cell.graphics.drawRect(20, cell.height - 40, cell.width - 40, 40, "#8dc9a5");
        };
        return GameOverView;
    }(ui.game.GameOverUI));
    game.GameOverView = GameOverView;
})(game || (game = {}));
//# sourceMappingURL=GameOverView.js.map