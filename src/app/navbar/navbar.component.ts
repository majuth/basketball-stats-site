import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  /*nbaData;
  constructor(http: HttpClient){
    const path = 'https://www.balldontlie.io/api/v1/players';
    this.nbaData = http.get<any>(path)
      .pipe(
        map(obj => obj.data)
      )
  }
  */

  url = 'https://www.balldontlie.io/api/v1/players';
  names = [];
  names2: Array<string> = [];
  

  constructor(private http: HttpClient){
    this.http.get(this.url).toPromise().then(data =>{
      console.log(data);

        for(let key in data)
          if (data.hasOwnProperty(key))
            this.names.push(data[key]);

        this.names = this.names[0];

        console.log(this.names);

        for(let key in this.names)
          if (this.names.hasOwnProperty(key))
        this.names2.push(this.names[key].first_name + " " + this.names[key].last_name);

        console.log(this.names2);

    });
  }
  
  

  myControl = new FormControl();
  options = this.names2/*['One', 'Two', 'Three']*/;
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }


}
