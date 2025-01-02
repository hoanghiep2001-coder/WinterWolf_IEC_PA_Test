
import { _decorator, Component, EventTouch, Node, UITransform, Vec2, Vec3 } from 'cc';
import { GameInfo } from '../Const/GameInfo';
import { BlackHole } from './BlackHole';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = JoyStick
 * DateTime = Thu Jan 02 2025 12:57:50 GMT+0700 (Indochina Time)
 * Author = hoanghiep2001
 * FileBasename = JoyStick.ts
 * FileBasenameNoExtension = JoyStick
 * URL = db://assets/Scripts/GamePlay/JoyStick.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('JoyStick')
export class JoyStick extends Component {
    @property(BlackHole)
    BlackHole: BlackHole = null;

    currentTouchPos: Vec3 = null;

    @property(Node)
    max_r: Node = null;
    @property(Node)
    stick: Node = null;


    protected start(): void {
        this.initProps();
        this.registerEvent();
    }


    private initProps(): void {
        this.max_r.active = false;
        this.stick.active = false;
    }


    private registerEvent(): void {
        this.node.on(Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
    }


    private touchStart(event: EventTouch): void {
        if (!GameInfo.isCanTouch) return;

        GameInfo.IsPlaying = true;

        GameInfo.isTouching = true;

        this.toggleJoystickUI();

        this.currentTouchPos = this.getLocalTouchPos(event);

        this.max_r.setPosition(this.currentTouchPos);

        this.stick.setPosition(this.currentTouchPos);

        // this.BlackHole.bonceAnim();
    }


    private touchMove(event: EventTouch): void {
        if (!GameInfo.isCanTouch) return;

        this.currentTouchPos = this.getLocalTouchPos(event);

        const distance = this.currentTouchPos.clone().subtract(this.max_r.position),
            max_r_ratio = this.max_r.getComponent(UITransform).width / 2;

        // convert stick to max_r ratio
        if (distance.length() > max_r_ratio) {
            distance.normalize().multiplyScalar(max_r_ratio);
            this.currentTouchPos = this.max_r.position.clone().add(distance);
        }

        this.stick.setPosition(this.currentTouchPos);

        this.BlackHole.radian = this.getRadian();
    }


    private touchEnd(): void {
        GameInfo.isTouching = false;

        this.toggleJoystickUI();
    }


    private toggleJoystickUI(): void {
        this.max_r.active = !this.max_r.active;
        this.stick.active = !this.stick.active;
    }


    private getLocalTouchPos(event: EventTouch): Vec3 {
        let result = new Vec3();

        const PROJECT_DESIGN_WIDTH: number = 320,
            PROJECT_DESIGN_HEIGHT: number = 480,
            screenPos = event.getUILocation(),
            x = screenPos.x - PROJECT_DESIGN_WIDTH / 2,
            y = screenPos.y - PROJECT_DESIGN_HEIGHT / 2,
            z = 0;

        result = new Vec3(x, y, z);

        return result;
    }


    private getRadian(): number {
        let result: number = null;
        let directionVector: Vec3;
        let max_r_pos = this.max_r.getPosition();

        let newPos: Vec2 = new Vec2(max_r_pos.x, max_r_pos.y);
        directionVector = this.stick.getPosition().subtract(new Vec3(newPos.x, newPos.y, 0));

        result = Math.atan2(directionVector.y, directionVector.x);
        return result;
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
