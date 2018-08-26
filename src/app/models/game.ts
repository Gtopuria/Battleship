import { Board } from "./board";
import { Cell } from "./cell";

export class Game {
    board: Board;
    status: string;

    constructor(board: Board, status: string) {
        this.board = board;
        this.status = status;

    }

    CheckScore() {
        const totalScore = this.board.fleet.reduce((a, b) => a + b.length, 0);
        if (this.board.player.score === totalScore) {
            this.status = 'finished';
        }
    }

    Hit(cell: Cell) {
        this.board.player.IncreaseScore();
        this.CheckScore();
        const ship = this.board.fleet.find((ship) => {
            let s = ship.cells.find(c => c.row == cell.row && c.col == cell.col);
            if (s != undefined) {
                return true;
            }
        });
        const isDestroyed = ship.cells.map(c => c.used).every(used => used);
        if (isDestroyed) {
            ship.cells.forEach(elem => {
                let cell = this.board.cells[elem.row][elem.col];
                cell.isDestroyed = true;
            });
        }
    }

    Miss(){
        this.board.player.IncreaseMissCount();
    }
}