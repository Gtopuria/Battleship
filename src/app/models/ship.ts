export class Ship {
    length: number;
    type: ShipType;

    constructor(init) {
        Object.assign(this, init);
        
    }
}

export enum ShipType {
    Dot,
    L,
}