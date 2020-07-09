export function createCanvasContext() {
    const canvas = document.querySelector("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight;
    }, false);

    return ctx;
}

export function subscribeInputs(input) {
    window.addEventListener('keydown', event => {
        if (input[event.code] === undefined) return;
        input[event.code] = true;
    });

    window.addEventListener('keyup', event => {
        if (input[event.code] === undefined) return;
        input[event.code] = false;
    });
}

export function AABBCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
    return (
        x1 < x2 + w2 &&
        x1 + w1 > x2 &&
        y1 < y2 + h2 &&
        y1 + h1 > y2
    );
}

export function constrain(val, min, max) {
    return (val > min) ? ((val < max) ? val : max) : min;
}

export function random(min, max) {
    return Math.random() * (max - min) + min;
}

export function randomBool() {
    return !!Math.round(Math.random())
}

export function randomSign() {
    return randomBool() ? 1 : -1;
}

export class DeltaTimer {
    constructor () {
        this._perfectFrameTime = 1000 / 60;
        this._deltaTime = 0;
        this._lastTimestamp = Date.now();
    }

    step() {
        this._deltaTime = (Date.now() - this._lastTimestamp) / this._perfectFrameTime;
        this._lastTimestamp = Date.now();
        return this._deltaTime;
    }

    get() {
        return this._deltaTime;
    }
}