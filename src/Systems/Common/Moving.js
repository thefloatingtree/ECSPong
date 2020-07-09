import { System } from "treecs";
import { Position } from "../../Components/Common/Position";
import { Velocity } from "../../Components/Common/Velocity";

export class Moving extends System {
    update(delta) {
        this.queries.moving.entities.forEach(entity => {
            const position = entity.getComponent(Position);
            const velocity = entity.getComponent(Velocity);
            position.x += velocity.x * delta;
            position.y += velocity.y * delta;
        })
    }
}