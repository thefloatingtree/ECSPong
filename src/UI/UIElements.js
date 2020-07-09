import { UIElement } from "./UIManager";
import { Game } from "../Components/Game";
import SceneManager from "../SceneManager";

export class TitleUIElement extends UIElement {
    constructor(text, x, y, { font = '24px Helvetica', fillStyle = '#FFFFFF', textAlign = 'left', textBaseline = 'bottom' } = {}) {
        super();
        this.text = text;
        this.x = x;
        this.y = y;
        this.font = font;
        this.fillStyle = fillStyle;
        this.textAlign = textAlign;
        this.textBaseline = textBaseline;    
    }

    draw(ctx) {
        ctx.fillStyle = this.fillStyle;
        ctx.textAlign = this.textAlign;
        ctx.textBaseline = this.textBaseline;
        ctx.font = this.font;
        ctx.fillText(this.text, this.x, this.y);
    }
}

export class ScoreUIElement extends UIElement {
    init() {
        this.game = this.scene.queries.singleton.getComponent(Game);
    }

    // This is a MESS but it works so here it will stay
    draw(ctx) {
        const number = this.game.winningScore * 2 - 1;
        const width = 305;
        let radius = 7;
        for (let i = -Math.floor(number / 2); i <= Math.floor(number / 2); i++) {
            let x = ctx.canvas.width / 2 + i * (width / number);
            let y = ctx.canvas.height / 2 - 50;
            ctx.beginPath();
            if (i === 0) {
                ctx.strokeStyle = '#ffffff';
                ctx.fillStyle = '#ffffff';
                ctx.lineWidth = 6;
                ctx.arc(x, y, radius + 3, 0, Math.PI * 2);
                if (this.game.playerOneScore >= this.game.winningScore || this.game.playerTwoScore >= this.game.winningScore) {
                    ctx.fill();
                }
            } else {
                ctx.strokeStyle = '#1d1d1f';
                ctx.lineWidth = 5;
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                if (
                    (this.game.playerOneScore - this.game.winningScore >= i && i < 0) ||
                    (-this.game.playerTwoScore + this.game.winningScore <= i && i > 0)
                ) {
                    ctx.strokeStyle = '#ffffff'
                    ctx.fillStyle = '#ffffff';
                    ctx.fill()
                }
            }
            ctx.stroke();
        }
    }
}

export class ControlsUIElement extends UIElement {
    init() {
        this.game = this.scene.queries.singleton.getComponent(Game);
    }

    draw(ctx) {
        const margin = 15;

        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';
        ctx.font = 'bold 24px montserrat';
        ctx.fillStyle = this.game.ai ? '#FFFFFF' : '#1d1d1f';
        ctx.fillText('AI (K)', 25, ctx.canvas.height - margin);
        ctx.fillStyle = this.game.paused ? '#FFFFFF' : '#1d1d1f';
        ctx.fillText('Pause (P)', 25 + margin + ctx.measureText('AI (K)').width, ctx.canvas.height - margin);
        ctx.fillStyle = '#1d1d1f';
        ctx.fillText('Reset (R)', 25 + margin * 2 + ctx.measureText('AI (K)').width + ctx.measureText('Pause (P)').width, ctx.canvas.height - margin);
    }
}

export class WinTextUIElement extends UIElement {
    constructor() {
        super();
        const canvas = SceneManager.getRenderContext().canvas;
        this.title = new TitleUIElement('', canvas.width / 2, canvas.height / 2, { 
            font: '120px montserrat', 
            textAlign: 'center', 
            textBaseline: 'middle' 
        });
    }

    draw(ctx) {
        const game = SceneManager.getScene('gameScene').queries.singleton.getComponent(Game);
        this.title.text = game.playerOneScore === game.winningScore ? 'left player wins' : 'right player wins';
        this.title.draw(ctx);
    }
}