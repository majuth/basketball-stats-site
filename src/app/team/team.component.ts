import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  constructor(private data: DataService, private http: HttpClient) { }

  teamID:number;
  teamData: Array<string>;

  ngOnInit() {
    this.data.currentTeam.subscribe((team) => {this.teamID = team; this.loadTeamData()});
  }

  loadTeamData(){
    var teamData= [];
    
    this.http.get("https://www.balldontlie.io/api/v1/teams/" + this.teamID).toPromise().then(data =>{
      console.log(data);

        for(let key in data)
          if (data.hasOwnProperty(key))
          teamData.push(data[key]);

        console.log(teamData);

        this.teamData = teamData;
  });}

}
