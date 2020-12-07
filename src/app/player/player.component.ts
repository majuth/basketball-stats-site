import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  constructor(private data: DataService, private http: HttpClient) { }

  playerID: number;
  playerData: Array<string>;

  ngOnInit(){
    this.data.currentPlayer.subscribe((player) => {this.playerID = player; this.loadPlayerData()});
  }

  loadPlayerData(){
    var playerData= [];
    
    this.http.get("https://www.balldontlie.io/api/v1/players/" + this.playerID).toPromise().then(data =>{
      console.log(data);

        for(let key in data)
          if (data.hasOwnProperty(key))
          playerData.push(data[key]);

        console.log(playerData);

        this.playerData = playerData;
  });}

  
}
