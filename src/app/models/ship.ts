import { Cell } from "./cell";


export class Ship {
    length: number;
    type: ShipType;
    cells: Cell[];

    constructor(init) {
        Object.assign(this, init);
        
    }
}

export enum ShipType {
    Dot,
    L,
}