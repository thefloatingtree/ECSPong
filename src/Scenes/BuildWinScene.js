import { Scene } from 'treecs';
import { RenderSystem } from '../Systems/Common/RenderSystem';
import { UIManager } from '../UI/UIManager';
import { ControlsUIElement, TitleUIElement, WinTextUIElement } from '../UI/UIElements';
import { Game } from '../Components/Game';
import SceneManager from '../SceneManager';
import { PausedController } from '../Systems/PausedSceneController';
import { WinSceneController } from '../Systems/WinSceneController';

export function buildWinScene() {
    const scene = new Scene();
    scene
        .registerSystem(WinSceneController)
        .registerSystem(RenderSystem)
        .addSingletonComponent(UIManager, { scene })

    const canvas = SceneManager.getRenderContext().canvas;
    const uiManager = scene.queries.singleton.getComponent(UIManager);

    uiManager.addElement(new WinTextUIElement());
    uiManager.addElement(new TitleUIElement('Play Again (R)', canvas.width / 2, canvas.height / 2 + 80, { 
        font: 'bold 24px montserrat', 
        textAlign: 'center', 
        textBaseline: 'top' 
    }))

    return scene;
}