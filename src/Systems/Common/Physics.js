import { System } from "treecs";
import { Position } from "../../Components/Common/Position";
import { RenderShape } from "../../Components/Common/RenderShape";
import SceneManager from "../../SceneManager";
import { AABBCollision } from "../../Util";

export class Physics extends System {
    update() {
        const eventManager = SceneManager.getEventManager();
        this.queries.physicsBodies.entities.forEach(bodyOne => {
            const bodyOnePosition = bodyOne.getComponent(Position);
            const bodyOneRenderShape = bodyOne.getComponent(RenderShape);

            this.queries.physicsBodies.entities.forEach(bodyTwo => {
                if (bodyOne.id === bodyTwo.id) return;

                const bodyTwoPosition = bodyTwo.getComponent(Position);
                const bodyTwoRenderShape = bodyTwo.getComponent(RenderShape);

                const colliding = AABBCollision(
                    bodyOnePosition.x,
                    bodyOnePosition.y,
                    bodyOneRenderShape.width,
                    bodyOneRenderShape.height,
                    bodyTwoPosition.x,
                    bodyTwoPosition.y,
                    bodyTwoRenderShape.width,
                    bodyTwoRenderShape.height,
                );

                if (colliding) {
                    eventManager.send("ColisionInProgress", { bodyOne, bodyTwo })
                }
            })
        });
    }
}