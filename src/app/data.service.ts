import { Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()

export class DataService{

    public activeTab = new BehaviorSubject<Array<boolean>>([false, true, true, true]);
    currentTab = this.activeTab.asObservable();

    constructor(){}

    public teamID = new BehaviorSubject<number>(1);
    currentTeam = this.teamID.asObservable();

    public playerID = new BehaviorSubject<number>(0);
    currentPlayer = this.playerID.asObservable();

    changeTab(tab: Array<boolean>){
    this.activeTab.next(tab);
    }

    changeTeam(team: number){
    this.teamID.next(team);
    }

    changePlayer(player: number){
    this.playerID.next(player);
    }
}