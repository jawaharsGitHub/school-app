import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { remult } from 'remult';

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [RouterOutlet ],
  templateUrl: './master.component.html',
  styleUrl: './master.component.css'
})
export class MasterComponent {

  
remult = remult; // Initialize Remult instance


constructor(private router: Router) {
}

  logout() {
  this.remult.user = undefined;
  this.router.navigate(['/login']);
}

}
