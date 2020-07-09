import { System } from 'treecs';
import { Position } from '../Components/Common/Position';
import { RenderShape } from '../Components/Common/RenderShape';
import { Velocity } from '../Components/Common/Velocity';
import { Constants } from '../Components/Constants';
import { Paddle } from '../Components/Paddle';
import SceneManager from '../SceneManager';
import { constrain } from '../Util';

export class PaddleController extends System {
    init() {
        this.eventManager = SceneManager.getEventManager();
        this.eventManager.register('AIControl');
    }

    update() {
        this.queries.paddles.entities.forEach(entity => {
            const paddle = entity.getComponent(Paddle);
            const position = entity.getComponent(Position);
            const velocity = entity.getComponent(Velocity);
            const renderShape = entity.getComponent(RenderShape);
            const input = SceneManager.getInputManager();
            const canvasHeight = SceneManager.getRenderContext().canvas.height;
            const constants = this.queries.singleton.getComponent(Constants);
            
            if (paddle.player === 1) {
                const aiDirection = this.eventManager.receive('AIControl')[0];
                this.movePaddles(input.getInput('PlayerOneUp') || aiDirection === 'up', input.getInput('PlayerOneDown') || aiDirection === 'down', paddle, velocity);
            } else {
                this.movePaddles(input.getInput('PlayerTwoUp'), input.getInput('PlayerTwoDown'), paddle, velocity);
            }

            paddle.y = constrain(velocity.y, -paddle.speed, paddle.speed);

            if (position.y <= 0) {
                velocity.y = paddle.bounce;
            }
            if (position.y >= canvasHeight - constants.paddleHeight) {
                velocity.y = -paddle.bounce;
            }

            // Stretch paddle based on velocity
            renderShape.height = (constants.paddleHeight * Math.abs(velocity.y) / 280) + constants.paddleHeight;
        });
    }

    movePaddles(up, down, paddle, velocity) {
        if (up) {
            velocity.y -= paddle.acceleration; 
            return; 
        } else if (down) {
            velocity.y += paddle.acceleration; 
            return;
        } else {
            velocity.y *= paddle.friction;
        }
    }
}