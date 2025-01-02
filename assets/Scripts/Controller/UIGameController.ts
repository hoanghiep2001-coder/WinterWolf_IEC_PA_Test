
import { _decorator, Component, Label, Node, screen, view } from 'cc';
import { GameInfo } from '../Const/GameInfo';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = UIGameController
 * DateTime = Thu Jan 02 2025 15:46:36 GMT+0700 (Indochina Time)
 * Author = hoanghiep2001
 * FileBasename = UIGameController.ts
 * FileBasenameNoExtension = UIGameController
 * URL = db://assets/Scripts/Controller/UIGameController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('UIGameController')
export class UIGameController extends Component {

    @property(Node)
    Score: Node = null;

    @property(Label)
    cubesFall_Label: Label = null;
    @property(Label)
    cylindersFall_Label: Label = null;
    @property(Label)
    betonsFall_Label: Label = null;


    protected start(): void {
        this.handleYourOrientation();

        view.setResizeCallback(() => {
            this.handleYourOrientation();
        });
    }


    private handleYourOrientation(): void {
        if (screen.windowSize.width > screen.windowSize.height) {
            this.Score.setScale(1.1, 1.1, 1.1);
        } else {
            this.Score.setScale(1, 1, 1);
        }
    }


    protected update(dt: number): void {
        this.cubesFall_Label.string = `${GameInfo.currentCubesFall}`;
        this.cylindersFall_Label.string = `${GameInfo.currentCylindersFall}`;
        this.betonsFall_Label.string = `${GameInfo.currentBetonsFall}`;
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
