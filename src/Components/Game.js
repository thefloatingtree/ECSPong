export class Game {
    constructor() {
        this.playerOneScore = this.playerTwoScore = this.volley = 0;
        this.ai = false;
        this.winningScore = 5;
        this.paused = false;
    }
}