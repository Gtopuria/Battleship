import { Cell } from "./cell";
import { Player } from "./player";
import { Ship } from "./ship";

export class Board {
    cells: Cell[];
    fleet: Ship[];
    player: Player;

    constructor(cells: Cell[], player: Player, fleet: Ship[]) {
        this.cells = cells;
        this.player = player;
        this.fleet = fleet;
    }
}