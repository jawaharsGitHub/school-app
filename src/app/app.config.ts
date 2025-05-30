import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http'; // Import provideHttpClient
import { routes } from './app.routes';
// Import Font Awesome modules and FaIconLibrary
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
// Import the specific icons you want to use globally
import { faGear, faFileLines, faChartBar, faUserCheck, faUser, faCircleUser, faUsers, faBook, faGraduationCap, faMoneyBill, faUserGraduate, faIdCard, faGaugeHigh, faSpinner,
  faPlus, faEye, faPencil, faTrash, faFilter, faSearch, faSave, faTimes, faCheckCircle, faXmarkCircle, faRightToBracket
 } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons'; // Example for brand icons
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'; // Example for regular icons with alias


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(), // Provide HttpClient for making HTTP requests
    // Provide Font Awesome Icons globally
     {
      provide: FaIconLibrary,
      useFactory: () => {
        const library = new FaIconLibrary();
        library.addIcons(
          faGear, faFileLines, faChartBar, faUserCheck, faUser, faCircleUser,
          faGaugeHigh,
          faUsers, faBook, faGraduationCap, faFacebookF, faTwitter, farStar, faMoneyBill, faUserGraduate, faIdCard,
          faPlus, faEye, faPencil, faTrash, faFilter, faSearch, faSave, faTimes,
        faSpinner, faCheckCircle, faXmarkCircle, faIdCard, faUserCheck, faRightToBracket,
        faGear, faFileLines, faChartBar, faUser, faCircleUser, faUsers, faBook, faGraduationCap, faMoneyBill, faGaugeHigh
        );
        return library;
      }
    }
  
  ]
};
