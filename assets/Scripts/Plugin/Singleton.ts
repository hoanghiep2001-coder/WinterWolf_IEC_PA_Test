
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Singleton
 * DateTime = Thu Jan 02 2025 13:39:44 GMT+0700 (Indochina Time)
 * Author = hoanghiep2001
 * FileBasename = Singleton.ts
 * FileBasenameNoExtension = Singleton
 * URL = db://assets/Scripts/Plugin/Singleton.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass
export default class Singleton<T> extends Component{
    public static Instance<T>(c: {new(): T; }) : T{
        if (this._instance == null){
            this._instance = new c();
        }
        return this._instance;
    }
    public static _instance = null;
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
