import { Injectable} from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { playerData, rawPlayerIDData } from './interfaces';

@Injectable()

export class PlayerpicService{

    constructor(private data: DataService, private http: HttpClient) {
        this.data.currentSeason.subscribe((season) => {this.currentSeason = season});
        this.loadArray();
    }

    currentSeason: number;
    playerData: playerData[];
    playerNameArray = [];
    playerIdArray = [];

    ngOnInit(){
    }

    loadArray(){
    console.log("runnning")
    this.http.get<rawPlayerIDData>("http://data.nba.net/data/10s/prod/v1/"+ this.currentSeason +"/players.json").subscribe( res => (this.playerData = res.league.standard));
    }
}
