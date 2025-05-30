import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faDashboard,
  faLocation,
  faShop,
  faBox,
  faMoneyBill,
  faChartBar,
  faContactBook,
  faHand,
  faUserGraduate,
  faUsers, faPeopleGroup, faUserTie,
   faGear,          // For Settings
  faFileLines,     // For Reports
  faUserCheck,     // For Admission
  faRightToBracket, // For Admission
  faIdCard,        // For Admission
  faUser,          // For Profile
  faCircleUser     // For Profile 
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  faDashboard = faDashboard;
  faLocation = faLocation;
  faShop = faShop;
  faBox = faBox;
  faMoneyBill = faMoneyBill;
  faChartBar = faChartBar;
  faContactBook = faContactBook;
  faHand = faHand;
  faUserGraduate = faUserGraduate;
  faUsers = faUsers;
  faPeopleGroup = faPeopleGroup;
  faUserTie = faUserTie;
  faGear = faGear;
  faFileLines = faFileLines;
  faUserCheck = faUserCheck;
  faRightToBracket = faRightToBracket;
  faIdCard = faIdCard;
  faUser = faUser;
  faCircleUser = faCircleUser;


}
