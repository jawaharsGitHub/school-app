import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http'; // Import provideHttpClient
import { routes } from './app.routes';
// Import Font Awesome modules and FaIconLibrary
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
// Import the specific icons you want to use globally
import { faGear, faFileLines, faChartBar, faUserCheck, faUser, faCircleUser, faUsers, faBook, faGraduationCap, faMoneyBill, faUserGraduate, faIdCard, faGaugeHigh, faSpinner,
  faPlus, faEye, faPencil, faTrash, faFilter, faSearch, faSave, faTimes, faCheckCircle, faXmarkCircle, faRightToBracket,
  faInfoCircle, faExclamationCircle, faThumbsUp, faThumbsDown, faClock, faCalendar, faBell, faFlag, faLock, faUnlock, faArrowRight, faArrowLeft, faArrowUp, faArrowDown
 } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons'; // Example for brand icons
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'; // Example for regular icons with alias
import { CdkStepperModule } from '@angular/cdk/stepper'; // Import CdkStepperModule if you need stepper functionality


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
          faGear, faFileLines, faChartBar, faUserCheck, faUser, faCircleUser, faInfoCircle,
          faGaugeHigh,
          faUsers, faBook, faFacebookF, faTwitter, farStar, faUserGraduate, 
          faPlus, faEye, faPencil, faTrash, faFilter, faSearch, faSave, faTimes,
        faSpinner, faCheckCircle, faXmarkCircle, faIdCard, faRightToBracket,
              faGraduationCap, faMoneyBill,  faExclamationCircle, faThumbsUp, faThumbsDown, faClock, faCalendar, faBell, faFlag, faLock, faUnlock, faArrowRight, faArrowLeft, faArrowUp, faArrowDown
        );
        return library;
      }
    }
  
  ]
};
