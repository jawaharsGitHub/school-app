import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { remult, UserInfo } from 'remult';
import { retry } from 'rxjs';

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './master.component.html',
  styleUrl: './master.component.css'
})
export class MasterComponent {

  
remult = remult; // Initialize Remult instance


constructor(private router: Router, private http: HttpClient) {
  // You can initialize any services or perform setup here if needed
}

 ngOnInit() {  
    
    this.http.get<UserInfo>('api/currentUser')
    .pipe(retry(50)) 
    .subscribe(
      (user) => 
      {
        console.log('Current user:', user);
        this.remult.user = user; // Set the current user in Remult
      }
      
    );
  }

  logout() {
  this.remult.user = undefined;
  this.router.navigate(['/login']);
}

}
