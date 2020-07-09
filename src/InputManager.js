import { Pinput } from "../lib/pinput";

export const RELEASED = "released";
export const PRESSED = "pressed";
export const DOWN = "down";

class InputBinding {
    constructor(keys, type) {
        this.active = true;
        this.clearImmediately = false;
        this.keys = keys;
        this.type = type;
    }

    disable() { this.active = false; }

    enable() { this.active = true; }
}

export class InputManager {
    constructor() {
        this.pinput = new Pinput();
        this.bindings = new Map();
        this.sources
    }

    getPinput() {
        return this.pinput;
    }

    // ClearImmediately if you have issues where two systems that
    // are trying to access the same input and causing undesireable behavior
    getInput(name, clearImmediately = false) {
        const binding = this.bindings.get(name);
        if (binding.clearImmediately) return false;
        if (binding.active) {
            binding.clearImmediately = clearImmediately;
            switch (binding.type) {
                case RELEASED:
                    return this.pinput.isReleased(binding.keys);
                case PRESSED:
                    return this.pinput.isPressed(binding.keys);
                case DOWN:
                    return this.pinput.isDown(binding.keys);
            }
        }
        return false;
    }

    registerBinding(name, keys, type) {
        this.bindings.set(name, new InputBinding(keys, type));
        return this;
    }

    removeBinding(name) {
        this.bindings.delete(name);
        return this;
    }

    disableBinding(name) {
        this.bindings.get(name).disable();
        return this;
    }

    enableBinding(name) {
        this.bindings.get(name).enable();
        return this;
    }

    update() {
        this.bindings.forEach(binding => {
            binding.clearImmediately = false;
        });
        this.pinput.update();
    }
}