namespace game {

    import GameConfig = def.GameConfig;

    export class FrogJumpView extends ui.game.FrogViewUI {

        //event
        static ACTIONEND = "actionEnd";
        static EVENT_DIE = "event_die";
        static EVENT_STOP = "event_stop";

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
            jump_up_blast: "jup_up_blast",
        }

        inJump:boolean = false;
        falling: boolean = false;
        actionInterval = 0;
        speedDif = 0;
        initYPos = 0;

        constructor() {
            super();
            
            this.pivot(0, this.height);
            
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
                this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_DIE);
            });
            this.actionInterval = this.jump_small.interval;
            console.log("this.actionInterval", this.actionInterval);
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

        playAction(actionName) {
            this.inJump = true;
            if (actionName == FrogJumpView.ACTIONS.stand) {
                this.y = this.initYPos
                this.jump_stand.play(0, false);
                this.inJump = false;
            } else if (actionName == FrogJumpView.ACTIONS.jump_small) {
                utl.MusicSoundTool.playSound(def.MusicConfig.CommonSound.jump);
                this.jump_small.play(0, false);
            } else if (actionName == FrogJumpView.ACTIONS.jump_big) {
                utl.MusicSoundTool.playSound(def.MusicConfig.CommonSound.jump);
                this.jump_big.play(0, false);
            } else if (actionName == FrogJumpView.ACTIONS.stand_blast) {
                utl.MusicSoundTool.playSound(def.MusicConfig.CommonSound.blast);
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
            }
        }

        checkSpeed(speed) {
            let dif = speed - GameConfig.SPEED;
            let difNum = Math.floor(dif / 0.5);
            if(this.speedDif != difNum) {
                this.setInterval(this.actionInterval - 5);
                this.speedDif = difNum;
            }
            
        }

        setInterval(interval) {
            if(interval == this.actionInterval) {
                return;
            }
            console.log("this.actionIntervalxxx", this.actionInterval);
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
    }
}