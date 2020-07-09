import { createCanvasContext } from "./Util";
import { SoundManager } from "./SoundManager";
import { InputManager } from "./InputManager";
import { EventManager } from "./EventManager";

class SceneContainer {
    constructor(scene, paused = true) {
        this.paused = paused;
        this.scene = scene;
    }
}

class SceneManager {
    constructor() {
        this.scenes = new Map();
        this._renderContext = createCanvasContext();
        this._soundManager = new SoundManager();
        this._inputManager = new InputManager();
        this._eventManager = new EventManager();
    }

    getRenderContext() {
        return this._renderContext;
    }

    getSoundManager() {
        return this._soundManager;
    }

    getInputManager() {
        return this._inputManager;
    }

    getEventManager() {
        return this._eventManager;
    }

    registerScene(name, scene) {
        if (this.scenes.has(name)) return console.warn("You cannot register a scene with an existing name. Name:" + name);
        this.scenes.set(name, new SceneContainer(scene, !!this.scenes.size)); // Paused by default unless it's the first
    }

    getScene(name) {
        return this.scenes.get(name).scene;
    }

    playScene(name, solo = true) {
        if (solo) this.pauseAllScenes();
        this.scenes.get(name).paused = false;
    }

    pauseScene(name) {
        this.scenes.get(name).paused = true;
    }

    pauseAllScenes() {
        this.scenes.forEach(sceneContainer => {
            sceneContainer.paused = true;
        });
    }

    update(delta) {
        this.scenes.forEach(sceneContainer => {
            if (!sceneContainer.paused) sceneContainer.scene.update(delta);
        });
        this._inputManager.update();
    }
}

export default Object.freeze(new SceneManager()); // Export as a singleton