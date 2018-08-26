import { Board } from "./board";
import { Player } from "./player";

export class Game {
    board: Board;
    status: string;
    
    constructor(board: Board, status: string) {
        this.board = board;
        this.status = status;
        
    }

    CheckScore(){
        const totalScore = this.board.fleet.reduce((a,b) => a + b.length, 0);
        if(this.board.player.score === totalScore){
            this.status = 'finished';
        }
    }
}