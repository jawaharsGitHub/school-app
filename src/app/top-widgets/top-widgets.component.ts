import { Component, OnInit } from '@angular/core';
// import {
//   faLocation,
//   faShop,
//   faBoxes,
//   faMoneyBill,
// } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-top-widgets',
  templateUrl: './top-widgets.component.html',
  styleUrls: ['./top-widgets.component.scss'],
  standalone: true,
  imports: [FontAwesomeModule],
})
export class TopWidgetsComponent implements OnInit {

  // faLocation = faLocation;
  // faShop = faShop;
  // faBoxes = faBoxes;
  // faMoneyBill = faMoneyBill;

  constructor() { }

  ngOnInit(): void {
  }

}