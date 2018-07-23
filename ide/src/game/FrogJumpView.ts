namespace game {

    import GameConfig = def.GameConfig;
    import Image = Laya.Image;
    import Tween = Laya.Tween;

    export class FrogJumpView extends ui.game.FrogViewUI {

        //event
        static ACTIONEND = "actionEnd";
        static EVENT_DIE = "event_die";
        static EVENT_STOP = "event_stop";
        static EVENT_FLYEND = "event_flyEnd"

        static ACTIONS = {
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
        }

        inJump: boolean = false;
        falling: boolean = false;
        actionInterval = 0;
        speedDif = 0;
        initYPos = 0;
        coin: Image;
        havePlayBlast = false;
        inFly = false;
        waitLand = false; //飞行等落地
        inDoor = false; //任意门中
        doorDie = false; //通过任意门掉到陷阱里面

        constructor() {
            super();

            this.pivot(0, this.height);
            this.coin = new Image("frog/+1.png");
            this.coin.visible = false;
            this.addChild(this.coin);

            this.jump_small.on(Laya.Event.COMPLETE, this, () => {
                this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_STOP);
                this.playAction(FrogJumpView.ACTIONS.stand);
                this.x += GameConfig.SMALLSTEP;
            });
            this.jump_big.on(Laya.Event.COMPLETE, this, () => {
                this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_STOP);
                this.playAction(FrogJumpView.ACTIONS.stand);
                this.x += GameConfig.BIGSTEP;
            });
            this.stand_blast.on(Laya.Event.COMPLETE, this, () => {
                this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_DIE);
            });
            this.jump_small_blast.on(Laya.Event.COMPLETE, this, () => {
                this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_DIE);
            });
            this.jump_small_fall.on(Laya.Event.COMPLETE, this, () => {
                this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_DIE);
            });
            this.jump_big_blast.on(Laya.Event.COMPLETE, this, () => {
                this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_DIE);
            });
            this.jump_big_fall.on(Laya.Event.COMPLETE, this, () => {
                this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_DIE);
            });
            this.jump_up.on(Laya.Event.COMPLETE, this, () => {
                this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_STOP);
                this.playAction(FrogJumpView.ACTIONS.stand);
                this.x += GameConfig.SMALLSTEP;
            });
            this.jump_up_blast.on(Laya.Event.COMPLETE, this, () => {
                this.playBlastSound();
                this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_DIE);
            });
            this.jump_to_fly.on(Laya.Event.COMPLETE, this, () => {
                this.playAction(FrogJumpView.ACTIONS.in_fly);
            });
            this.in_fly.on(Laya.Event.COMPLETE, this, () => {
            });
            this.fly_to_land.on(Laya.Event.COMPLETE, this, () => {
                this.inJump = false;
                this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_FLYEND);
                this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_STOP);
            });
            this.seat_coffee.on(Laya.Event.COMPLETE, this, () => {
            });
            this.jump_to_rocket.on(Laya.Event.COMPLETE, this, () => {
                this.playAction(FrogJumpView.ACTIONS.in_fly_rocket);
            });
            this.in_fly_rocket.on(Laya.Event.COMPLETE, this, () => {
            });
            this.actionInterval = this.jump_small.interval;
        }

        //设置初始位置
        initPos(x, y) {
            this.pos(x, y);
            this.initYPos = y;
        }

        getRealPosX() {
            return this.x + this.img_frog.x;
        }

        getRealPosY() {
            return this.y + this.img_frog.y - this.height;
        }

        playAction(actionName, posY?, posX?) {
            // console.log("playAction////", actionName);
            this.inJump = true;
            if (actionName == FrogJumpView.ACTIONS.stand) {
                if (posY && posY > 0) { //保证在柱子顶端
                    this.y = posY
                } else {
                    this.y = this.initYPos
                }
                if(posX) {
                    this.x = posX;
                }
                this.jump_stand.play(0, false);
                this.inJump = false;
            } else if (actionName == FrogJumpView.ACTIONS.jump_small) {
                utl.MusicSoundTool.playSound(def.MusicConfig.CommonSound.jump);
                this.jump_small.play(0, false);
            } else if (actionName == FrogJumpView.ACTIONS.jump_big) {
                utl.MusicSoundTool.playSound(def.MusicConfig.CommonSound.jump);
                this.jump_big.play(0, false);
            } else if (actionName == FrogJumpView.ACTIONS.stand_blast) {
                this.playBlastSound();
                this.stand_blast.play(0, false);
            } else if (actionName == FrogJumpView.ACTIONS.jump_small_blast) {
                this.jump_small_blast.play(0, false);
            } else if (actionName == FrogJumpView.ACTIONS.jump_small_fall) {
                this.jump_small_fall.play(0, false);
            } else if (actionName == FrogJumpView.ACTIONS.jump_big_blast) {
                this.jump_big_blast.play(0, false);
            } else if (actionName == FrogJumpView.ACTIONS.jump_big_fall) {
                this.jump_big_fall.play(0, false);
            } else if (actionName == FrogJumpView.ACTIONS.jump_up) {
                this.jump_up.play(0, false);
            } else if (actionName == FrogJumpView.ACTIONS.jump_up_blast) {
                this.jump_up_blast.play(0, false);
            } else if (actionName == FrogJumpView.ACTIONS.jump_to_fly) {
                this.jump_to_fly.play(0, false);
            } else if (actionName == FrogJumpView.ACTIONS.in_fly) {
                this.in_fly.play(0, true);
                this.inFly = true;
            } else if(actionName == FrogJumpView.ACTIONS.in_fly_rocket) {
                this.in_fly_rocket.play(0, true);
                this.inFly = true;
            } else if (actionName == FrogJumpView.ACTIONS.fly_to_land) {
                this.in_fly_rocket.stop();
                this.in_fly.stop();
                this.fly_to_land.play(0, false);
            } else if (actionName == FrogJumpView.ACTIONS.seat_coffee) {
                this.seat_coffee.play(0, false);
            } else if (actionName == FrogJumpView.ACTIONS.jump_to_rocket) {
                this.jump_to_rocket.play(0, false);
            }
        }

        checkSpeed(speed) {
            let dif = speed - GameConfig.SPEED;
            let difNum = Math.floor(dif / 0.5);
            if (this.speedDif != difNum) {
                this.setInterval(this.actionInterval - 5, speed);
                this.speedDif = difNum;
            }
        }

        setInterval(interval, speed) {
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
        }

        getCoin(inFly?) {
            this.coin.visible = true;
            let posX = inFly ? this.img_frog.x - 20 : -10;
            this.coin.pos(posX, this.img_frog.y - 80);
            utl.MusicSoundTool.playSound(def.MusicConfig.CommonSound.eat);
            let tw = Tween.to(this.coin, { y: this.img_frog.y - 120 }, 300, null, Laya.Handler.create(this, () => {
                this.coin.visible = false;
                Tween.clear(tw);
            }));
        }

        playBlastSound() {
            if (!this.havePlayBlast) {
                this.havePlayBlast = true;
                utl.MusicSoundTool.playSound(def.MusicConfig.CommonSound.blast);
            }
        }
    }
}