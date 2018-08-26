import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { GameService } from '../../services/game.service';
import { ToastsManager } from 'ng6-toastr';
import { Game } from '../../models/game';
import { Cell } from '../../models/cell';

@Component({
  selector: 'app-battle-ship',
  templateUrl: './battle-ship.component.html',
  styleUrls: ['./battle-ship.component.css']
})
export class BattleShipComponent implements OnInit {

  public game: Game;

  constructor(private gameService: GameService, private toast: ToastsManager, private vcr: ViewContainerRef) {
    this.toast.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.game = this.gameService.CreateGame();
  }

  Shoot(cell: Cell) {
    if (this.game.status == 'finished') {
      this.toast.info('Game is Over, start new game');
    }
    if (cell.used == true) {
      this.toast.warning('Cell is already used');
      return;
    }
    if (cell.isShip) {
      this.game.Shoot(cell);
      this.toast.success('Hit');

    } else {
      this.game.board.player.IncreaseMissCount();
    }
    cell.used = true;
  }

  newGame() {
    this.game = this.gameService.CreateGame();
  }


}
