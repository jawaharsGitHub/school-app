import {Component, input, Input} from '@angular/core';
import { UserProfile } from '../../../../shared/Models/UserModels';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [],
  templateUrl: './app-preview.component.html',
  styleUrl: './app-preview.component.scss'
})
export class AppPreviewComponent {
  imageURL=input.required<string>();
  @Input() userProfile: UserProfile | any;
}