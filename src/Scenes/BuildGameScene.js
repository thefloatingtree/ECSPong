import { Scene } from 'treecs';
import { Ball } from "../Components/Ball";
import { Collider } from "../Components/Common/Collider";
import { Position } from "../Components/Common/Position";
import { RenderShape } from "../Components/Common/RenderShape";
import { Velocity } from "../Components/Common/Velocity";
import { Constants } from "../Components/Constants";
import { Game } from "../Components/Game";
import { Paddle } from "../Components/Paddle";
import { ParticleSystemContainer } from "../Components/ParticleSystemContainer";
import { ParticleManager } from "../Particles/Particles";
import { PSSparkleTrail } from '../Particles/ParticleSystems';
import SceneManager from '../SceneManager';
import { AIController } from "../Systems/AIController";
import { BallController } from "../Systems/BallController";
import { Moving } from "../Systems/Common/Moving";
import { Physics } from "../Systems/Common/Physics";
import { RenderSystem } from "../Systems/Common/RenderSystem";
import { GameController } from "../Systems/GameController";
import { PaddleController } from "../Systems/PaddleController";
import { ParticleController } from "../Systems/ParticleController";
import { ScoreUIElement, TitleUIElement, ControlsUIElement } from '../UI/UIElements';
import { UIManager } from "../UI/UIManager";

export function buildGameScene() {
    const scene = new Scene();
    scene
        .registerSystem(PaddleController)
        .registerSystem(BallController)
        .registerSystem(Moving)
        .registerSystem(Physics)
        .registerSystem(GameController)
        .registerSystem(ParticleController)
        .registerSystem(AIController)
        .registerSystem(RenderSystem);

    scene
        .addSingletonComponent(Constants)
        .addSingletonComponent(Game)
        .addSingletonComponent(ParticleManager)
        .addSingletonComponent(UIManager, { scene });

    const constants = scene.singletonComponents.getComponent(Constants);
    const canvas = SceneManager.getRenderContext().canvas;
    const uiManager = scene.singletonComponents.getComponent(UIManager);
    const soundManager = SceneManager.getSoundManager();

    scene
        .registerQuery("renderable", [RenderShape, Position])
        .registerQuery("paddles", [Paddle])
        .registerQuery("ball", [Ball])
        .registerQuery("moving", [Position, Velocity])
        .registerQuery("physicsBodies", [Collider, Position, RenderShape])
        .registerQuery("particleSystems", [ParticleSystemContainer]);

    scene
        .createEntity()
        .addComponent(Paddle, { player: 1 })
        .addComponent(Position, {
            x: constants.paddleMargin,
            y: canvas.height / 2 - constants.paddleHeight / 2
        })
        .addComponent(Velocity)
        .addComponent(RenderShape, { width: constants.paddleWidth, height: constants.paddleHeight })
        .addComponent(Collider)
        .addComponent(ParticleSystemContainer, { particleSystem: PSSparkleTrail })
    scene
        .createEntity()
        .addComponent(Paddle, { player: 2 })
        .addComponent(Position, {
            x: canvas.width - (constants.paddleMargin + constants.paddleWidth),
            y: canvas.height / 2 - constants.paddleHeight / 2
        })
        .addComponent(Velocity)
        .addComponent(RenderShape, { width: constants.paddleWidth, height: constants.paddleHeight })
        .addComponent(Collider)
        .addComponent(ParticleSystemContainer, { particleSystem: PSSparkleTrail })
    scene
        .createEntity()
        .addComponent(Ball)
        .addComponent(Position)
        .addComponent(Velocity)
        .addComponent(RenderShape, { width: 15, height: 15 })
        .addComponent(Collider)
        .addComponent(ParticleSystemContainer, { particleSystem: PSSparkleTrail })

    uiManager.addElement(new TitleUIElement('pong', canvas.width / 2, canvas.height / 2, { 
        font: '120px montserrat', 
        textAlign: 'center', 
        textBaseline: 'middle' 
    }));
    uiManager.addElement(new ScoreUIElement());
    uiManager.addElement(new ControlsUIElement());

    soundManager.loadSound('hit', ['hit.wav']);
    soundManager.loadSound('hit2', ['hit2.wav']);
    soundManager.loadSound('score', ['explosion.wav']);

    return scene;
}