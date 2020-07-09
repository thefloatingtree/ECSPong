import { System } from 'treecs';
import SceneManager from '../SceneManager';

export class WinSceneController extends System {
    update() {
        if (SceneManager.getInputManager().getInput('Reset')) {
            SceneManager.getEventManager().send('ResetGame');
            SceneManager.playScene('gameScene');

            console.log(SceneManager)
        }
    }
}