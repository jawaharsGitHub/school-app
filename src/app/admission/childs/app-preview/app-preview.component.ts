import {Component, input, Input, OnInit} from '@angular/core';
import { UserProfile } from '../../../../shared/Models/UserModels';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [],
  templateUrl: './app-preview.component.html',
  styleUrl: './app-preview.component.scss'
})
export class AppPreviewComponent  implements OnInit {
  imageURL=input.required<string>();
  @Input() userProfile: UserProfile | any;


  constructor() {
    // Initialize any services or perform setup here if needed
  }
  ngOnInit(): void {
    console.log('AppPreviewComponent initialized');
    console.log('User Profile:', this.userProfile);
  }

  
}