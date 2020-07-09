import { buildGameScene } from './Scenes/BuildGameScene';
import { DeltaTimer } from './Util';
import SceneManager from './SceneManager';
import { DOWN, RELEASED } from './InputManager';
import { buildPauseScene } from './Scenes/BuildPauseScene';
import { buildWinScene } from './Scenes/BuildWinScene';

const deltaTimer = new DeltaTimer();
SceneManager.registerScene('gameScene', buildGameScene());
SceneManager.registerScene('pauseScene', buildPauseScene());
SceneManager.registerScene('winScene', buildWinScene());

SceneManager
    .getInputManager()
    .registerBinding('PlayerOneUp', 'W', DOWN)
    .registerBinding('PlayerOneDown', 'S', DOWN)
    .registerBinding('PlayerTwoUp', 'ARROWUP', DOWN)
    .registerBinding('PlayerTwoDown', 'ARROWDOWN', DOWN)
    .registerBinding('Pause', 'P', RELEASED)
    .registerBinding('Reset', 'R', RELEASED)
    .registerBinding('AI', 'K', RELEASED);

function run() {
    SceneManager.update(deltaTimer.step());
    requestAnimationFrame(run);
}
run();