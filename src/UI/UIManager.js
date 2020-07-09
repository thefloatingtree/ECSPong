export class UIManager {
    constructor() {
        this.elements = [];
        this.scene = {};
    }

    addElement(uiElement) {
        uiElement.scene = this.scene;
        this.elements.push(uiElement);
    }

    draw(renderContext){
        this.elements.forEach(element => {
            element.draw(renderContext);
        })
    }

    init() {
        this.elements.forEach(element => {
            if (element.init) element.init();
        })
    }
}

export class UIElement {
    constructor() {}
    init() {}
    draw(renderContext) {}
}