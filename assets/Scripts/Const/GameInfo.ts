
import * as Interface from "./Interfaces";

/**
 * Predefined variables
 * Name = GameInfo
 * DateTime = Thu Jan 02 2025 13:06:12 GMT+0700 (Indochina Time)
 * Author = hoanghiep2001
 * FileBasename = GameInfo.ts
 * FileBasenameNoExtension = GameInfo
 * URL = db://assets/Scripts/Const/GameInfo.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */


export class GameInfo {

    // Main State
    static isToStore: boolean = false;
    static IsPlaying : boolean = false;
    static GamePause: boolean = false;

    static isTouching: boolean = false;
    static isCanTouch: boolean = true;
    
    static IsShowPopupInstall: boolean = false;
    static isLose: boolean = false;
    static isWin: boolean = false;

    // Game Variables

    
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */
