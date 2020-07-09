import { System } from 'treecs';
import { Position } from '../../Components/Common/Position';
import { RenderShape } from '../../Components/Common/RenderShape';
import { ParticleManager } from '../../Particles/Particles';
import SceneManager from '../../SceneManager';
import { UIManager } from '../../UI/UIManager';

export class RenderSystem extends System {
    init() {
        this.uiManager = this.queries.singleton.getComponent(UIManager);
        this.uiManager.init();
    }

    update() {
        const ctx = SceneManager.getRenderContext();
        const particleManager = this.queries.singleton.getComponent(ParticleManager);
        // Clear screen
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#323232";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // UI
        this.uiManager.draw(ctx);

        // Draw entities
        if (this.queries.renderable) {
            ctx.beginPath();
            this.queries.renderable.entities.forEach(entity => {
                const position = entity.getComponent(Position);
                const renderShape = entity.getComponent(RenderShape);

                ctx.fillStyle = renderShape.color;
                ctx.moveTo(position.x, position.y);
                if (renderShape.shape === "rectangle") {
                    ctx.rect(position.x, position.y, renderShape.width, renderShape.height);
                } else {
                    ctx.arc(position.x, position.y, renderShape.radius, 0, Math.PI * 2, false)
                }
            });
            ctx.fill();
        }
        if (particleManager) particleManager.draw(ctx);
    }
}