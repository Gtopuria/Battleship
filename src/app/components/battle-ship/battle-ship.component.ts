import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Game } from '../../models/game';

@Component({
  selector: 'app-battle-ship',
  templateUrl: './battle-ship.component.html',
  styleUrls: ['./battle-ship.component.css']
})
export class BattleShipComponent implements OnInit {

  public game: Game;

  constructor(private gameService: GameService) { }



  ngOnInit() {
    this.game = this.gameService.CreateGame();
  }

}
