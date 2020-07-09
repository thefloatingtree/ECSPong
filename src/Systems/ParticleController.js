import { System } from 'treecs';
import { ParticleSystemContainer } from '../Components/ParticleSystemContainer';
import { ParticleManager } from '../Particles/Particles';

export class ParticleController extends System {
    init() {
        this.particleManager = this.queries.singleton.getComponent(ParticleManager);
        this.queries.particleSystems.entities.forEach(entity => {
            this.particleManager.addSystem(new (entity.getComponent(ParticleSystemContainer).particleSystem)(entity));
        });
    }

    update() {
        this.particleManager.update();
    }
}