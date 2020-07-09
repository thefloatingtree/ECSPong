export class ParticleManager {
    constructor() {
        this.systems = [];
    }

    addSystem(system) {
        this.systems.push(system);
    }

    update() {
        this.systems = this.systems.filter(system => {
            return system.update();
        });
    }

    draw(renderContext) {
        this.systems.forEach(system => {
            system.draw(renderContext);
        });
    }
}

export class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    generateParticle() {} // Return particle

    update(delta) {}

    draw(renderContext) {}
}

export class Particle {
    constructor({x, y, vx, vy, life} = {}) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.life = life;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
    }
}