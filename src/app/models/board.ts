import { Cell } from "./cell";
import { Player } from "./player";

export class Board {
    cells: Cell[];
    player: Player;

    constructor(cells: Cell[], player: Player) {
        this.cells = cells;
        this.player = player;
    }
}