import { Component, OnInit } from '@angular/core';
import { TopThreeProductsComponent } from "../top-three-products/top-three-products.component";
import { LastFewTransactionsComponent } from "../last-few-transactions/last-few-transactions.component";
import { SalesByMonthComponent } from "../sales-by-month/sales-by-month.component";
import { SalesByCategoryComponent } from "../sales-by-category/sales-by-category.component";
import { TopWidgetsComponent } from "../top-widgets/top-widgets.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  standalone: true,
  styleUrls: ['./main.component.css'],
  imports: [TopThreeProductsComponent, LastFewTransactionsComponent, SalesByMonthComponent, SalesByCategoryComponent, TopWidgetsComponent]
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}