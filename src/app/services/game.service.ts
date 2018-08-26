import { Injectable } from '@angular/core';
import { Cell } from '../models/cell';
import { Ship, ShipType } from '../models/ship';
import { Game } from '../models/game';
import { Board } from '../models/board';
import { Player } from '../models/player';
import { Direction } from '../models/direction';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }
  // Rule 10x10 cell board
  private size = 10;

  public CreateGame() {
    const cells = [];
    for (let i: number = 0; i < this.size; i++) {
      cells[i] = [];
      for (let j: number = 0; j < this.size; j++) {
        cells[i][j] = new Cell(i, j);
      }
    }
    this.RandomizeShips(cells);
    return new Game(new Board(cells, new Player(), this.getFleet()), "In progress");
  }

  private getFleet() {
    // Rules
    // 2 - 1 cell ships
    // 1 - L shaped 4 cell ship
    // 1 - I shaped 4 cell ship
    return [
      new Ship({ length: 4, type: ShipType.L }),
      new Ship({ length: 4, type: ShipType.Dot }),
      new Ship({ length: 1, type: ShipType.Dot }),
      new Ship({ length: 1, type: ShipType.Dot }),
    ]
  }

  private RandomizeShips(cells: any[]) {
    this.getFleet().forEach(ship => {
      this.CreateShip(ship, cells);
    });
  }

  private CreateShip(ship: Ship, cells: Cell[][]) {
    const randRow = this.randomIntFromInterval(this.size);
    const randCol = this.randomIntFromInterval(this.size);
    const direction = this.getRandomDirection();
    const isPlaced = this.PlaceShip(ship, cells, randRow, randCol, direction);
    if (!isPlaced) {
      this.CreateShip(ship, cells);
    }
  }

  private PlaceShip(ship: Ship, cells: Cell[][], row: number, col: number, direction: Direction) {
    //place actual ship
    let isPlaced = true;
    let coordinates = { row, col };
    let toBeDeployedShipCoordinates = [];
    for (let i: number = 0; i < ship.length; i++) {
      // moving towards direction
      let firstCell = i == 0;
      if (!firstCell) {
        // in case of Ship type L
        if (ship.type === ShipType.L && (i + 1) == ship.length) {
          direction = this.Rotate90degrees(direction);
        }
        coordinates = this.DetermineNextCellCoordinates(coordinates.row, coordinates.col, direction);

      }
      const areValid = this.validateCoordinates(coordinates);
      if (!areValid) {
        isPlaced = false;
        break;
      }
      const currentCell = this.CheckCell(cells, coordinates.row, coordinates.col, direction, firstCell);
      if (!currentCell) {
        isPlaced = false;
        return;
      }
      toBeDeployedShipCoordinates.push(coordinates);
    }
    if (isPlaced) {
      toBeDeployedShipCoordinates.forEach(coordinate => {
        cells[coordinate.row][coordinate.col].isShip = true;
      });
    }
    return isPlaced;
  }

  private DetermineNextCellCoordinates(row: number, col: number, direction: Direction) {
    switch (direction) {
      case 0: {
        row = row + 1;
        break;
      }
      case 1: {
        row = row - 1;
        break;
      }
      case 2: {
        col = col - 1;
        break;
      }
      case 3: {
        col = col + 1;
        break;
      }
      case 4: {
        row = row - 1;
        col = col - 1;
        break;
      }
      case 5: {
        col = col + 1;
        row = row - 1;
        break;
      }
      case 6: {
        col = col - 1;
        row = row + 1;
        break;
      }
      case 7: {
        col = col + 1;
        row = row + 1;
        break;
      }
      default: {
        break;
      }
    }
    return { row, col };
  }

  private CheckCell(cells: Cell[][], row: number, col: number, direction: Direction, firstCell: boolean): boolean {
    let isFree = this.IsCellFree(cells, row, col);
    if (!isFree) {
      return isFree;
    }
    // check surrounding cells
    // ignoring previous cell
    var isRoom = this.IsRoom(cells, row, col, direction, firstCell);
    if (!isRoom) {
      return isRoom;
    }

    return true;
  }

  private IsRoom(cells: Cell[][], row: number, col: number, direction: Direction, firstCell: boolean) {
    // check surroundings
    let isRoom = true;
    const checkDirection = firstCell ? direction : this.ReverseDirection(direction);
    // checking up,down,left,right,upleft,upright,downleft,downright
    Object.values(Direction).forEach(item => {
      const enumDirection = Direction[Direction[item]];
      if (enumDirection == checkDirection && !firstCell) {
        // direction matched skipping check
      } else {
        let nextCell = this.DetermineNextCellCoordinates(row, col, item);
        let areValid = this.validateCoordinates(nextCell);
        let isFree = areValid && this.IsCellFree(cells, nextCell.row, nextCell.col);
        if (!isFree) {
          isRoom = false;
          return false;
        }
      }
    });
    return isRoom;
  }

  private IsCellFree(cells: Cell[][], row: number, col: number) {
    const cell = cells[row][col];
    if (cell != undefined) {
      return !cell.isShip;
    }
  }

  private ReverseDirection(direction: Direction) {
    let reversed;
    switch (direction) {
      case Direction.up: {
        reversed = Direction.down;
        break;
      }
      case Direction.down: {
        reversed = Direction.up;
        break;
      }
      case Direction.left: {
        reversed = Direction.right;
        break;
      }
      case Direction.right: {
        reversed = Direction.left;
        break;
      }
    }
    return reversed;
  }

  private Rotate90degrees(direction: Direction) {
    let rotated;
    switch (direction) {
      case Direction.up: {
        rotated = Direction.right
        break;
      }
      case Direction.down: {
        rotated = Direction.left
        break;
      }
      case Direction.left: {
        rotated = Direction.up;
        break;
      }
      case Direction.right: {
        rotated = Direction.down;
        break;
      }
    }
    return rotated;
  }

  private randomIntFromInterval(max: number) {
    return Math.floor(Math.random() * ((max - 1) - 0 + 1) + 0);
  }

  private getRandomDirection() {
    const randomNumber = this.randomIntFromInterval(4);
    const randDirection = Direction[Direction[randomNumber]];
    return randDirection;
  }

  validateCoordinates(coordinates): boolean {
    if (coordinates.row < 0 || coordinates.row > 9 || coordinates.col < 0 || coordinates.col > 9) {
      return false;
    }
    return true;
  }
}
