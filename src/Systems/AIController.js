import { System } from 'treecs';
import { Position } from '../Components/Common/Position';
import { RenderShape } from '../Components/Common/RenderShape';
import { Velocity } from '../Components/Common/Velocity';
import { Game } from '../Components/Game';
import { Paddle } from '../Components/Paddle';
import SceneManager from '../SceneManager';

export class AIController extends System {
    init() {
        this.eventManager = SceneManager.getEventManager();
    }

    update() {
        const game = this.queries.singleton.getComponent(Game);
        if (!game.ai) return;
        this.queries.paddles.entities.forEach(paddle => {
            if (paddle.getComponent(Paddle).player === 1) {
                this.queries.ball.entities.forEach(entity => {
                    const ballPosition = entity.getComponent(Position);
                    const ballVelocity = entity.getComponent(Velocity);
                    const position = paddle.getComponent(Position);
                    const velocity = paddle.getComponent(Velocity);
                    const renderShape = paddle.getComponent(RenderShape);
                    if (
                        ballVelocity.x > 0 ||
                        velocity.y > 20 ||
                        velocity.y < -20 ||
                        ballPosition.x < position.x + renderShape.width + 50
                    ) {
                        this.eventManager.send('AIControl', 'none');
                        return;
                    }
                    if (ballPosition.y > position.y + renderShape.height / 2) {
                        this.eventManager.send('AIControl', 'down');
                    }
                    if (ballPosition.y < position.y + renderShape.height / 2) {
                        this.eventManager.send('AIControl', "up");
                    }
                })
            }
        });
    }
}