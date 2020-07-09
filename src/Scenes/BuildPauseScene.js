import { Scene } from 'treecs';
import { RenderSystem } from '../Systems/Common/RenderSystem';
import { UIManager } from '../UI/UIManager';
import { ControlsUIElement, TitleUIElement } from '../UI/UIElements';
import { Game } from '../Components/Game';
import SceneManager from '../SceneManager';
import { PausedController } from '../Systems/PausedSceneController';

export function buildPauseScene() {
    const scene = new Scene();
    scene
        .registerSystem(PausedController)
        .registerSystem(RenderSystem)
        .addSingletonComponent(UIManager, { scene })
        .addSingletonComponent(Game);

    const uiManager = scene.queries.singleton.getComponent(UIManager);
    const canvas = SceneManager.getRenderContext().canvas;

    uiManager.addElement(new ControlsUIElement());
    uiManager.addElement(new TitleUIElement('paused', canvas.width / 2, canvas.height / 2, { 
        font: '120px montserrat', 
        textAlign: 'center', 
        textBaseline: 'middle' 
    }));

    return scene;
}