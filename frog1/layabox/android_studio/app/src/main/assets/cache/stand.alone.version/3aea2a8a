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
    var GameConfig = def.GameConfig;
    var Image = Laya.Image;
    var Tween = Laya.Tween;
    var FrogJumpView = /** @class */ (function (_super) {
        __extends(FrogJumpView, _super);
        function FrogJumpView() {
            var _this = _super.call(this) || this;
            _this.inJump = false;
            _this.falling = false;
            _this.actionInterval = 0;
            _this.speedDif = 0;
            _this.initYPos = 0;
            _this.havePlayBlast = false;
            _this.inFly = false;
            _this.waitLand = false; //飞行等落地
            _this.inDoor = false; //任意门中
            _this.doorDie = false; //通过任意门掉到陷阱里面
            _this.pivot(0, _this.height);
            _this.coin = new Image("frog/+1.png");
            _this.coin.visible = false;
            _this.addChild(_this.coin);
            _this.jump_small.on(Laya.Event.COMPLETE, _this, function () {
                _this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_STOP);
                _this.playAction(FrogJumpView.ACTIONS.stand);
                _this.x += GameConfig.SMALLSTEP;
            });
            _this.jump_big.on(Laya.Event.COMPLETE, _this, function () {
                _this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_STOP);
                _this.playAction(FrogJumpView.ACTIONS.stand);
                _this.x += GameConfig.BIGSTEP;
            });
            _this.stand_blast.on(Laya.Event.COMPLETE, _this, function () {
                _this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_DIE);
            });
            _this.jump_small_blast.on(Laya.Event.COMPLETE, _this, function () {
                _this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_DIE);
            });
            _this.jump_small_fall.on(Laya.Event.COMPLETE, _this, function () {
                _this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_DIE);
            });
            _this.jump_big_blast.on(Laya.Event.COMPLETE, _this, function () {
                _this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_DIE);
            });
            _this.jump_big_fall.on(Laya.Event.COMPLETE, _this, function () {
                _this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_DIE);
            });
            _this.jump_up.on(Laya.Event.COMPLETE, _this, function () {
                _this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_STOP);
                _this.playAction(FrogJumpView.ACTIONS.stand);
                _this.x += GameConfig.SMALLSTEP;
            });
            _this.jump_up_blast.on(Laya.Event.COMPLETE, _this, function () {
                _this.playBlastSound();
                _this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_DIE);
            });
            _this.jump_to_fly.on(Laya.Event.COMPLETE, _this, function () {
                _this.playAction(FrogJumpView.ACTIONS.in_fly);
            });
            _this.in_fly.on(Laya.Event.COMPLETE, _this, function () {
            });
            _this.fly_to_land.on(Laya.Event.COMPLETE, _this, function () {
                _this.inJump = false;
                _this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_FLYEND);
                _this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_STOP);
            });
            _this.seat_coffee.on(Laya.Event.COMPLETE, _this, function () {
            });
            _this.jump_to_rocket.on(Laya.Event.COMPLETE, _this, function () {
                _this.playAction(FrogJumpView.ACTIONS.in_fly_rocket);
            });
            _this.in_fly_rocket.on(Laya.Event.COMPLETE, _this, function () {
            });
            _this.actionInterval = _this.jump_small.interval;
            return _this;
        }
        //设置初始位置
        FrogJumpView.prototype.initPos = function (x, y) {
            this.pos(x, y);
            this.initYPos = y;
        };
        FrogJumpView.prototype.getRealPosX = function () {
            return this.x + this.img_frog.x;
        };
        FrogJumpView.prototype.getRealPosY = function () {
            return this.y + this.img_frog.y - this.height;
        };
        FrogJumpView.prototype.playAction = function (actionName, posY, posX) {
            // console.log("playAction////", actionName);
            this.inJump = true;
            if (actionName == FrogJumpView.ACTIONS.stand) {
                if (posY && posY > 0) { //保证在柱子顶端
                    this.y = posY;
                }
                else {
                    this.y = this.initYPos;
                }
                if (posX) {
                    this.x = posX;
                }
                this.jump_stand.play(0, false);
                this.inJump = false;
            }
            else if (actionName == FrogJumpView.ACTIONS.jump_small) {
                utl.MusicSoundTool.playSound(def.MusicConfig.CommonSound.jump);
                this.jump_small.play(0, false);
            }
            else if (actionName == FrogJumpView.ACTIONS.jump_big) {
                utl.MusicSoundTool.playSound(def.MusicConfig.CommonSound.jump);
                this.jump_big.play(0, false);
            }
            else if (actionName == FrogJumpView.ACTIONS.stand_blast) {
                this.playBlastSound();
                this.stand_blast.play(0, false);
            }
            else if (actionName == FrogJumpView.ACTIONS.jump_small_blast) {
                this.jump_small_blast.play(0, false);
            }
            else if (actionName == FrogJumpView.ACTIONS.jump_small_fall) {
                this.jump_small_fall.play(0, false);
            }
            else if (actionName == FrogJumpView.ACTIONS.jump_big_blast) {
                this.jump_big_blast.play(0, false);
            }
            else if (actionName == FrogJumpView.ACTIONS.jump_big_fall) {
                this.jump_big_fall.play(0, false);
            }
            else if (actionName == FrogJumpView.ACTIONS.jump_up) {
                this.jump_up.play(0, false);
            }
            else if (actionName == FrogJumpView.ACTIONS.jump_up_blast) {
                this.jump_up_blast.play(0, false);
            }
            else if (actionName == FrogJumpView.ACTIONS.jump_to_fly) {
                this.jump_to_fly.play(0, false);
            }
            else if (actionName == FrogJumpView.ACTIONS.in_fly) {
                this.in_fly.play(0, true);
                this.inFly = true;
            }
            else if (actionName == FrogJumpView.ACTIONS.in_fly_rocket) {
                this.in_fly_rocket.play(0, true);
                this.inFly = true;
            }
            else if (actionName == FrogJumpView.ACTIONS.fly_to_land) {
                this.in_fly_rocket.stop();
                this.in_fly.stop();
                this.fly_to_land.play(0, false);
            }
            else if (actionName == FrogJumpView.ACTIONS.seat_coffee) {
                this.seat_coffee.play(0, false);
            }
            else if (actionName == FrogJumpView.ACTIONS.jump_to_rocket) {
                this.jump_to_rocket.play(0, false);
            }
        };
        FrogJumpView.prototype.checkSpeed = function (speed) {
            var dif = speed - GameConfig.SPEED;
            var difNum = Math.floor(dif / 0.5);
            if (this.speedDif != difNum) {
                this.setInterval(this.actionInterval - 5, speed);
                this.speedDif = difNum;
            }
        };
        FrogJumpView.prototype.setInterval = function (interval, speed) {
            if (interval == this.actionInterval) {
                return;
            }
            //console.log("this.actionIntervalNNxxxxxx", interval, speed);
            this.actionInterval = interval;
            this.jump_small.interval = interval;
            this.jump_big.interval = interval;
            this.stand_blast.interval = interval;
            this.jump_small_blast.interval = interval;
            this.jump_small_fall.interval = interval;
            this.jump_big_blast.interval = interval;
            this.jump_big_fall.interval = interval;
            this.jump_up.interval = interval;
            this.jump_up_blast.interval = interval;
        };
        FrogJumpView.prototype.getCoin = function (inFly) {
            var _this = this;
            this.coin.visible = true;
            var posX = inFly ? this.img_frog.x - 20 : -10;
            this.coin.pos(posX, this.img_frog.y - 80);
            utl.MusicSoundTool.playSound(def.MusicConfig.CommonSound.eat);
            var tw = Tween.to(this.coin, { y: this.img_frog.y - 120 }, 300, null, Laya.Handler.create(this, function () {
                _this.coin.visible = false;
                Tween.clear(tw);
            }));
        };
        FrogJumpView.prototype.playBlastSound = function () {
            if (!this.havePlayBlast) {
                this.havePlayBlast = true;
                utl.MusicSoundTool.playSound(def.MusicConfig.CommonSound.blast);
            }
        };
        //event
        FrogJumpView.ACTIONEND = "actionEnd";
        FrogJumpView.EVENT_DIE = "event_die";
        FrogJumpView.EVENT_STOP = "event_stop";
        FrogJumpView.EVENT_FLYEND = "event_flyEnd";
        FrogJumpView.ACTIONS = {
            stand: "stand",
            jump_small: "jump_small",
            jump_big: "jump_big",
            stand_blast: "stand_blast",
            jump_small_blast: "jump_small_blast",
            jump_small_fall: "jump_small_fall",
            jump_big_blast: "jump_big_blast",
            jump_big_fall: "jump_big_fall",
            jump_up: "jump_up",
            jump_up_blast: "jump_up_blast",
            jump_to_fly: "jump_to_fly",
            in_fly: "in_fly",
            fly_to_land: "fly_to_land",
            seat_coffee: "seat_coffee",
            jump_to_rocket: "jump_to_rocket",
            in_fly_rocket: "in_fly_rocket"
        };
        return FrogJumpView;
    }(ui.game.FrogViewUI));
    game.FrogJumpView = FrogJumpView;
})(game || (game = {}));
//# sourceMappingURL=FrogJumpView.js.map