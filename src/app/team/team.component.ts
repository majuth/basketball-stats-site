import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { game, gameData, rawSportsData } from '../interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  constructor(private data: DataService, private http: HttpClient) { }

  teamID:number;
  teamData: Array<string>;
  teamGames: Array<game>;
  currentSeason;

  ngOnInit() {
    this.data.currentTeam.subscribe((team) => {this.teamID = team; this.loadTeamData()});
  }

  loadTeamData(){
    var teamData= [];
    
    this.http.get("https://www.balldontlie.io/api/v1/teams/" + this.teamID).toPromise().then(data =>{

        for(let key in data)
          if (data.hasOwnProperty(key))
          teamData.push(data[key]);


        this.teamData = teamData;

        
  });

  this.loadTeamGames();
  this.loadTeamStats();
  }
  
  loadTeamGames(){
    var startDate = new Date();

    startDate.setMonth(startDate.getMonth() - 10);
    
    var dateString = startDate.getFullYear() + "-" + startDate.getMonth() + "-" + startDate.getDate();
    this.getGameData(dateString).subscribe( res => this.teamGames = res.data.sort((a,b) => b.date.localeCompare(a.date)));
    //console.log(this.teamGames);
  }

  getGameData(dateString: string): Observable<gameData>{
    return this.http.get<gameData>("https://www.balldontlie.io/api/v1/games?team_ids[]=" + this.teamID + "&start_date=%27"+ dateString +"%27&per_page=100");
  }

  

  loadTeamStats(){
    this.http.get<rawSportsData>("http://data.nba.net/json/cms/today.json").subscribe( res => (this.currentSeason = res.sports_content.sports_meta.season_meta.season_year));
    
    //add interface to get team stats and store it
    //this.http.get<______>("https://data.nba.net/data/10s/prod/v1/" +this.currentSeason +"/team_stats_rankings.json").subscribe( res => (this._____ = res._______));
  }

}
