import { Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()

export class DataService{

    public activeTab = new BehaviorSubject<Array<boolean>>([false, true, true, true]);
    currentTab = this.activeTab.asObservable();

    constructor(){}

    changeTab(tab: Array<boolean>){
    this.activeTab.next(tab);
    }
}