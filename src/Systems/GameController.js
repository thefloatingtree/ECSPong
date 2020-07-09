import { System } from 'treecs';
import { Position } from '../Components/Common/Position';
import { Velocity } from '../Components/Common/Velocity';
import { Game } from '../Components/Game';
import SceneManager from '../SceneManager';
import { random } from '../Util';

export class GameController extends System {
    init() {
        this.eventManager = SceneManager.getEventManager();
        this.eventManager.register('PlayerOneScored');
        this.eventManager.register('PlayerTwoScored');
        this.eventManager.register('ResetGame');
        this.resetBall();
    }

    update() {
        const game = this.queries.singleton.getComponent(Game);
        const input = SceneManager.getInputManager();

        if (input.getInput('AI')) {
            game.ai = !game.ai;
        }

        if (input.getInput('Reset')) {
            this.reset();
        }

        if (input.getInput('Pause', true)) {
            SceneManager.playScene('pauseScene');
        }

        if (game.ai) {
            input.disableBinding('PlayerOneUp')
            input.disableBinding('PlayerOneDown')
        } else {
            input.enableBinding('PlayerOneUp')
            input.enableBinding('PlayerOneDown')
        }

        this.eventManager.receive('PlayerOneScored').forEach(() => {
            game.playerOneScore++;
            game.volley = 0;
            this.resetBall();
        });
        this.eventManager.receive('PlayerTwoScored').forEach(() => {
            game.playerTwoScore++;
            game.volley = 0;
            this.resetBall();
        });

        this.eventManager.receive('ResetGame').forEach(() => {
            this.reset();
        })

        if (game.playerOneScore === game.winningScore || game.playerTwoScore === game.winningScore) {
            SceneManager.playScene('winScene');
        }
    }

    reset() {
        const game = this.queries.singleton.getComponent(Game);
        game.playerOneScore = 0;
        game.playerTwoScore = 0;
        game.volley = 0;
        this.resetBall();
    }

    resetBall() {
        const canvas = SceneManager.getRenderContext().canvas;
        const game = this.queries.singleton.getComponent(Game);
        this.queries.ball.entities.forEach(entity => {
            let position = entity.getComponent(Position);
            let velocity = entity.getComponent(Velocity);
            position.x = canvas.width / 2;
            position.y = canvas.height / 2;
            velocity.x = ((game.playerOneScore + game.playerTwoScore) % 2 ? 1 : -1) * 6;
            velocity.y = random(-2, 2);
        })
    }
}