import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { PlayerpicService } from '../playerpic.service';
import { HttpClient } from '@angular/common/http';
import { playerCurrentSeasonStats, playerData, rawPlayerIDData } from '../interfaces';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  constructor(private data: DataService, private http: HttpClient, private playerpic: PlayerpicService) { }

  playerID: number;
  playerData: Array<string>;
  currentSeason;
  playerCurrentSeasonStats;
  playerIDData: playerData[];

  ngOnInit(){
    this.data.currentPlayer.subscribe((player) => {this.playerID = player; this.loadPlayerData()});
    this.data.currentSeason.subscribe((season) => {this.currentSeason = season});
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

    this.getSeasonStats();
    this.getPlayerPic();
  });}

  getSeasonStats(){
    this.http.get<playerCurrentSeasonStats>("https://www.balldontlie.io/api/v1/season_averages?season=" + this.currentSeason +"&player_ids[]=" + this.playerID).subscribe( res => (this.playerCurrentSeasonStats = res.data[0]));
    console.log(this.playerCurrentSeasonStats);
  }

  getPlayerPic(){
    this.playerIDData = this.playerpic.playerData;
    console.log(this.playerIDData);
  }
  
}
