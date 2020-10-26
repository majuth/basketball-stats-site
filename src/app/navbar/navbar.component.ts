import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  siteName = 'Basketball Stats Site V.1';
  pages = ["Homepage", "Players", "Teams"];

  constructor() { }

  ngOnInit(): void {
  }

}
