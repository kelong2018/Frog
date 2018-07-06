namespace def.MusicConfig {

    //通用音效url
    export var CommonMusic = {
        game_bg: "beijin"
    }
    export var CommonSound = {
        blast: "did", //爆炸
        jump: "jump",  //跳
        eat: "eat" //吃金币
    }

    export function initMusic(type) {
        for(var m in CommonMusic) {
            CommonMusic[m] = "music/" + type + "/" + CommonMusic[m] + "." + type;
        }
        for(var m in CommonSound) {
            CommonSound[m] = "music/" + type + "/" + CommonSound[m] + "." + type;
        }
    }
}