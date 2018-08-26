export class Cell {
    // defaults are always false
    public used: boolean = false;
    public isShip: boolean = false;
    public row: number;
    public col: number;

    public constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
    }
}