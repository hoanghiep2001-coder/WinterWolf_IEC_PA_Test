
import { _decorator, Component, Node } from 'cc';
import { GameInfo } from '../Const/GameInfo';
import { SoundController } from './SoundController';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = GameController
 * DateTime = Thu Jan 02 2025 13:42:21 GMT+0700 (Indochina Time)
 * Author = hoanghiep2001
 * FileBasename = GameController.ts
 * FileBasenameNoExtension = GameController
 * URL = db://assets/Scripts/Controller/GameController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('GameController')
export class GameController extends Component {
    protected start(): void {
        window.gameReady && window.gameReady();
    }


    public handleInstall(): void {
        console.log("install");

        GameInfo.IsShowPopupInstall = true;
        SoundController.Instance(SoundController).stopAllSound();

        window.gameEnd && window.gameEnd();

        //If ad network is tiktok
        if (typeof (playableSDK) != "undefined") {
            window.playableSDK.openAppStore();
            return;
        }

        // If ad network is google ads
        if (typeof (ExitApi) != "undefined") {
            ExitApi.exit();
            return;
        }

        // If ad netwrok is ironsources
        if (typeof (dapi) != "undefined") {
            dapi.openStoreUrl();
            return;
        }

        // If ad network support MRAID 2.0
        if (typeof (mraid) != "undefined") {
            if (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.ANDROID) {
                mraid.open("https://play.google.com/store/apps/details?id=com.bus.sort.color.car.parkingjam");
                return;
            }

            if (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.IPHONE || cc.sys.os == cc.sys.IPAD) {
                mraid.open("https://itunes.apple.com/us/app/id6689494845?mt=8");
                return;
            }

            mraid.open("https://play.google.com/store/apps/details?id=com.bus.sort.color.car.parkingjam");
            return;
        }

        // If ad network is mindwork. window alway avaiable so skip undefined check
        window.install && window.install();
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
