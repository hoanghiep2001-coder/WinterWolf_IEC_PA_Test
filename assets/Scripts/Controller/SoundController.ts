
import { _decorator, AudioSource, Component, Node } from 'cc';
import Singleton from '../Plugin/Singleton';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = SoundController
 * DateTime = Thu Jan 02 2025 13:39:01 GMT+0700 (Indochina Time)
 * Author = hoanghiep2001
 * FileBasename = SoundController.ts
 * FileBasenameNoExtension = SoundController
 * URL = db://assets/Scripts/Controller/SoundController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('SoundController')
export class SoundController extends Singleton<SoundController> {
    public sounds: AudioSource[] = [];

    constructor() {
        super();
        SoundController._instance = this;
    }


    protected onLoad(): void {

    }


    protected start(): void {
        this.sounds = this.node.getComponentsInChildren(AudioSource);
    }


    public playSound(soundName: string): void {
        let result = this.sounds.find(sound => sound.node.name === soundName);
        result.volume = 1;
        result.play();
    }


    public muteSound(soundName: string, isMuted: boolean): void {
        let result = this.sounds.find(sound => sound.node.name === soundName);
        if (isMuted) result.volume = 0;
        else result.volume = 1;
    }


    public stopSound(soundName: string): void {
        let result = this.sounds.find(sound => sound.node.name === soundName);
        result.stop();
    }


    public stopAllSound(): void {
        this.sounds.forEach(sound => sound.stop());
    }
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
