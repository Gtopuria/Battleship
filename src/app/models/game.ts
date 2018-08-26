import { Board } from "./board";
import { Player } from "./player";

export class Game {
    board: Board;
    
    constructor(board: Board) {
        this.board = board;
        
    }
}