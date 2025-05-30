import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { remult } from 'remult';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  remult = remult; // Initialize Remult instance
  
  
  constructor(private router: Router, private http: HttpClient) {
    // You can initialize any services or perform setup here if needed
  }

  
 logout() {
  this.remult.user = undefined;
  this.router.navigate(['/login']);
}

}
