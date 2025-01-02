
import { _decorator, Collider, Component, easing, ICollisionEvent, log, Material, MeshRenderer, Node, RigidBody, tween, Tween, Vec3 } from 'cc';
import { GameInfo } from '../Const/GameInfo';
import { SoundController } from '../Controller/SoundController';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = BlackHole
 * DateTime = Thu Jan 02 2025 13:47:24 GMT+0700 (Indochina Time)
 * Author = hoanghiep2001
 * FileBasename = BlackHole.ts
 * FileBasenameNoExtension = BlackHole
 * URL = db://assets/Scripts/GamePlay/BlackHole.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('BlackHole')
export class BlackHole extends Component {

    @property(Node)
    ProgressStroke: Node = null;
    progressStrokeMaterial: Material = null;
    currentStrokeProgress: number = 0;


    speed: number = 8;
    deltaTime: number = 0.01;
    radian: number = null;
    thisWorldPos: Vec3 = new Vec3();

    rigidbody: RigidBody = null;
    collider: Collider = null;

    isActiveBounceAnim: boolean = false;
    scheduleCallback: void = null;
    bounceTimes: number = 0;
    tweenBounceAnim: Tween<Node> = null;


    protected start(): void {
        this.initProgressStroke();
        this.initRigidbody();
        this.registerPhysics();
    }


    private initProgressStroke(): void {
        this.progressStrokeMaterial = this.ProgressStroke.getComponent(MeshRenderer).material;

    }


    private initRigidbody(): void {
        this.rigidbody = this.getComponent(RigidBody);
        this.collider = this.getComponent(Collider);
    }


    private registerPhysics(): void {
        this.collider.on("onCollisionEnter", (e: ICollisionEvent) => {
            const colliderNode = e.otherCollider.node;
            const colliderName = colliderNode.name;

            if (colliderName.includes("beton")
                || colliderName.includes("Cube")
                || colliderName.includes("Cylinder")
            ) {

                if (colliderName.includes("beton")) {
                    GameInfo.currentBetonsFall += 1;

                }

                else if (colliderName.includes("Cube")) {
                    GameInfo.currentCubesFall += 1;

                }

                else {
                    GameInfo.currentCylindersFall += 1;
                }


                e.otherCollider.getComponent(RigidBody).setGroup(0);
                SoundController.Instance(SoundController).playSound("EatSound");
                // tween(e.otherCollider.node)
                // .to(0.1, {worldPosition: this.thisWorldPos}, {easing: easing.smooth})
                // .start()

                // e.otherCollider.getComponent(RigidBody).type = ERigidBodyType.DYNAMIC;

                // this.scheduleOnce(() => {
                //     log("destroy")
                //     this.node.active = false;
                //     this.node.destroy();
                // }, 1);
            }
        })

        // this.collider.on("onCollisionExit", (e: ICollisionEvent) => {

        //     if (e.otherCollider.node.name.includes("Capsule")
        //         || e.otherCollider.node.name.includes("Cube")
        //         || e.otherCollider.node.name.includes("Cylinder")
        //     ) {
        //         e.otherCollider.getComponent(RigidBody).group = 2;   
        //         e.otherCollider.getComponent(RigidBody).type = ERigidBodyType.STATIC;             

        //     }
        // })
    }


    public bounceAnim(): void {
        // if(this.isActiveBounceAnim) return;

        // this.isActiveBounceAnim = true;

        this.bounceTimes += 1;
        this.speed += 1;

        const currentScale = this.node.getScale(),
            scaleUpNumber = 0.36,
            newScale = new Vec3(currentScale.x + scaleUpNumber, currentScale.y + scaleUpNumber, currentScale.z + scaleUpNumber)

        this.tweenBounceAnim = tween(this.node)
            .to(0.2, { scale: newScale }, { easing: easing.elasticOut })
            .start();

        SoundController.Instance(SoundController).playSound("increaseScale");
    }


    public move(radian: number): void {
        const moveDirection = new Vec3(Math.sin(radian), 0, Math.cos(radian));
        moveDirection.normalize();
        moveDirection.multiplyScalar(this.speed * this.deltaTime);

        let pos = new Vec3(moveDirection.x, 0, moveDirection.z)

        this.node.setPosition(this.node.position.add(pos));
    }


    private increaseProgressStroke(): void {
        if (this.bounceTimes >= 8) {
            this.ProgressStroke.active = false;
            this.ProgressStroke.destroy();
            return
        };

        if (this.progressStrokeMaterial) {
            this.currentStrokeProgress += 0.003;
            let temp = this.currentStrokeProgress;

            if (this.currentStrokeProgress >= 1) {
                this.bounceAnim();
                this.currentStrokeProgress = 0;
            }

            this.progressStrokeMaterial.setProperty("progress", temp)
        }
    }


    protected update(dt: number): void {
        GameInfo.isTouching && this.move(this.radian);
        this.thisWorldPos = this.node.worldPosition;
        GameInfo.IsPlaying && this.ProgressStroke.active && this.increaseProgressStroke();
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
