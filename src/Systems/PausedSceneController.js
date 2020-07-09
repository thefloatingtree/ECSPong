import { System } from 'treecs';
import { Game } from '../Components/Game';
import SceneManager from '../SceneManager';

export class PausedController extends System {
    update() {
        let game = this.queries.singleton.getComponent(Game);
        game.ai = SceneManager.getScene('gameScene').queries.singleton.getComponent(Game).ai;
        game.paused = true;
        
        const input = SceneManager.getInputManager();
        if (input.getInput('Pause')) {
            SceneManager.playScene('gameScene', true);
        }
    }
}