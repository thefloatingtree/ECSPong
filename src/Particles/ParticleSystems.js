import { Position } from '../Components/Common/Position';
import { RenderShape } from '../Components/Common/RenderShape';
import { random } from '../Util';
import { Particle, ParticleSystem } from './Particles';

export class PSSparkleTrail extends ParticleSystem {
    constructor(entity) {
        super();
        this.position = entity.getComponent(Position);
        this.renderShape = entity.getComponent(RenderShape);
        this.counter = 0;
        this.particleLife = 30;
    }

    generateParticle() {
        return new Particle({ 
            x: random(this.position.x, this.position.x + this.renderShape.width), 
            y: random(this.position.y, this.position.y + this.renderShape.height), 
            vx: random(-0.5, 0.5), 
            vy: random(-0.5, 0.5), 
            life: this.particleLife 
        });
    }

    update() {
        if (this.counter % Math.floor(random(1, 30)) === 0) {
            this.particles.push(this.generateParticle());
        }
        this.particles = this.particles.filter(particle => {
            particle.update();
            return particle.life >= 0;
        });
        this.counter++;
        return true;
    }

    draw(renderContext) {

        this.particles.forEach(particle => {
            renderContext.beginPath();
            renderContext.fillStyle = `rgba(255, 255, 255, ${particle.life / this.particleLife})`;
            const quantizedX = Math.floor(particle.x / 5) * 5;
            const quantizedY = Math.floor(particle.y / 5) * 5;
            renderContext.moveTo(quantizedX, quantizedY);
            renderContext.rect(quantizedX, quantizedY, 5, 5);
            renderContext.fill();
        });
    }
}

export class PSExplosion extends ParticleSystem {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y
        this.particleLife = 20;
        Array.from(Array(8)).map(() => {
            this.particles.push(this.generateParticle());
        });
    }

    generateParticle() {
        const magnitude = random(0.2, 3);
        const direction = random(0, Math.PI * 2);
        return new Particle({ 
            x: this.x, 
            y: this.y, 
            vx: magnitude * Math.cos(direction), 
            vy: magnitude * Math.sin(direction), 
            life: random(5, 30) 
        });
    }

    update() {
        this.particles = this.particles.filter(particle => {
            particle.update();
            return particle.life >= 0;
        });
        return this.particles.length !== 0;
    }

    draw(renderContext) {
        this.particles.forEach(particle => {
            renderContext.beginPath();
            renderContext.fillStyle = `rgba(255, 255, 255, ${(particle.life + 10) / this.particleLife})`;
            const quantizedX = Math.floor(particle.x / 5) * 5;
            const quantizedY = Math.floor(particle.y / 5) * 5;
            renderContext.moveTo(quantizedX, quantizedY);
            renderContext.rect(quantizedX, quantizedY, 5, 5);
            renderContext.fill();
        });
    }
}

export class PSBigExplosion extends ParticleSystem {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y
        this.particleLife = 25;
        Array.from(Array(30)).map(() => {
            this.particles.push(this.generateParticle());
        });
    }

    generateParticle() {
        const magnitude = random(3, 12);
        const direction = random(0, Math.PI * 2);
        return new Particle({ 
            x: this.x, 
            y: this.y, 
            vx: magnitude * Math.cos(direction), 
            vy: magnitude * Math.sin(direction), 
            life: random(5, 30) 
        });
    }

    update() {
        this.particles = this.particles.filter(particle => {
            particle.update();
            particle.vx *= 0.95;
            particle.vy *= 0.95;
            return particle.life >= 0;
        });
        return this.particles.length !== 0;
    }

    draw(renderContext) {
        this.particles.forEach(particle => {
            renderContext.beginPath();
            renderContext.fillStyle = `rgba(255, 255, 255, ${(particle.life + 10) / this.particleLife})`;
            const quantizedX = Math.floor(particle.x / 5) * 5;
            const quantizedY = Math.floor(particle.y / 5) * 5;
            renderContext.moveTo(quantizedX, quantizedY);
            renderContext.rect(quantizedX, quantizedY, 5, 5);
            renderContext.fill();
        });
    }
}