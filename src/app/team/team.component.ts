import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { game, gameData, nbaTeam, rawSportsData, rawTeamAvgData } from '../interfaces';
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
  teamAvg: Array<nbaTeam>;
  nbaTeamID = [0, 1, 14, 29, 4, 2, 5, 6, 28, 7, 8, 17, 9, 10, 26, 11, 12, 13, 3, 15, 23, 16, 18, 19, 20, 21, 22, 24, 25, 27];

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
    console.log(this.currentSeason);

    //add interface to get team stats and store it
    this.http.get<rawTeamAvgData>("https://data.nba.net/data/10s/prod/v1/" +this.currentSeason +"/team_stats_rankings.json").subscribe( res => (this.teamAvg = res.league.standard.regularSeason.teams));
    console.log(this.teamAvg);
  }

}
