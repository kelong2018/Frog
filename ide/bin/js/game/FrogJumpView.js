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
    var FrogJumpView = /** @class */ (function (_super) {
        __extends(FrogJumpView, _super);
        function FrogJumpView() {
            var _this = _super.call(this) || this;
            _this.inJump = false;
            _this.falling = false;
            _this.actionInterval = 0;
            _this.speedDif = 0;
            _this.initYPos = 0;
            _this.pivot(0, _this.height);
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
                _this.event(FrogJumpView.ACTIONEND, FrogJumpView.EVENT_DIE);
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
        FrogJumpView.prototype.playAction = function (actionName) {
            this.inJump = true;
            if (actionName == FrogJumpView.ACTIONS.stand) {
                this.y = this.initYPos;
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
                utl.MusicSoundTool.playSound(def.MusicConfig.CommonSound.blast);
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
        //event
        FrogJumpView.ACTIONEND = "actionEnd";
        FrogJumpView.EVENT_DIE = "event_die";
        FrogJumpView.EVENT_STOP = "event_stop";
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
            jump_up_blast: "jup_up_blast",
        };
        return FrogJumpView;
    }(ui.game.FrogViewUI));
    game.FrogJumpView = FrogJumpView;
})(game || (game = {}));
//# sourceMappingURL=FrogJumpView.js.map