import { System } from "treecs";
import { Ball } from "../Components/Ball";
import { Position } from "../Components/Common/Position";
import { RenderShape } from "../Components/Common/RenderShape";
import { Velocity } from "../Components/Common/Velocity";
import { Game } from "../Components/Game";
import { Paddle } from "../Components/Paddle";
import { ParticleManager } from "../Particles/Particles";
import { PSBigExplosion, PSExplosion } from "../Particles/ParticleSystems";
import SceneManager from "../SceneManager";
import { constrain } from "../Util";

export class BallController extends System {
    init() {
        this.eventManager = SceneManager.getEventManager();
        this.eventManager.register('ColisionInProgress');
    }

    update() {
        this.queries.ball.entities.forEach(entity => {
            const velocity = entity.getComponent(Velocity);
            const position = entity.getComponent(Position);
            const renderShape = entity.getComponent(RenderShape);
            const canvas = SceneManager.getRenderContext().canvas;
            const game = this.queries.singleton.getComponent(Game);
            const particleManager = this.queries.singleton.getComponent(ParticleManager);
            const soundManager = SceneManager.getSoundManager();

            if (position.y <= 0) {
                if (velocity.y < 0) {
                    velocity.y = -velocity.y;
                    particleManager.addSystem(new PSExplosion(position.x, position.y));
                    soundManager.playSound('hit');
                }
            }
            if (position.y >= canvas.height - renderShape.height) {
                if (velocity.y > 0) {
                    velocity.y = -velocity.y;
                    particleManager.addSystem(new PSExplosion(position.x, position.y));
                    soundManager.playSound('hit');
                }
            }
            if (position.x + renderShape.width <= 0) {
                this.eventManager.send('PlayerTwoScored');
                particleManager.addSystem(new PSBigExplosion(position.x, position.y));
                soundManager.playSound('score');
            }
            if (position.x >= canvas.width) {
                this.eventManager.send('PlayerOneScored');
                particleManager.addSystem(new PSBigExplosion(position.x, position.y));
                soundManager.playSound('score');
            }

            this.eventManager.receive('ColisionInProgress').forEach(payload => {
                if (payload.bodyOne.hasComponent(Ball) && payload.bodyTwo.hasComponent(Paddle)) {
                    game.volley++;
                    if (payload.bodyTwo.getComponent(Paddle).player === 1) {
                        if (velocity.x < 0) {
                            velocity.x = -velocity.x + 1;
                            velocity.y += payload.bodyTwo.getComponent(Velocity).y / 5;
                            particleManager.addSystem(new PSExplosion(position.x, position.y));
                            soundManager.playSound('hit2');
                        }
                    } else {
                        if (velocity.x > 0) {
                            velocity.x = -velocity.x - 1;
                            velocity.y += payload.bodyTwo.getComponent(Velocity).y / 5;
                            particleManager.addSystem(new PSExplosion(position.x, position.y))
                            soundManager.playSound('hit2');
                        }
                    }
                }
            })

            velocity.x = constrain(velocity.x, -16, 16);
            velocity.y = constrain(velocity.y, -16, 16)
        })
    }
}