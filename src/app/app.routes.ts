import { Routes } from "@angular/router";
import { MasterComponent } from "./features/layout/master/master.component";
import { SignInComponent } from "./features/sign-in/sign-in.component";
import { TodoComponent } from "./features/todo/todo.component";
import { AuthGuard } from "./core/auth.guard";
import { MainComponent } from "./features/main/main.component";
import { AdmissionListComponent } from "./features/admission/admission-list/admission-list.component";
import { AdmissionMainComponent } from "./features/admission/admission-form-main/admission-form-main.component";
import { ApplicationFormComponent } from "./features/admission/application-form/application-form.component";
import { DashboardSuganyaComponent } from "./dashboard-suganya/dashboard-suganya.component";

export const routes: Routes = [
  { path: 'login', component: SignInComponent },
  {
    path: '', 
    component: MasterComponent,
    //canActivate: [AuthGuard], // Optional: protect access, if we enable this, remult.user is undefined
    children: [
      { path: 'dashboard', component: MainComponent },
      { path: 'admin/applicants', component: AdmissionListComponent },
      { path: 'admin/applicants/new', component: AdmissionMainComponent },
      { path: 'admin/applicants/edit/:id', component: AdmissionMainComponent },
      { path: 'admin/application/new', component: ApplicationFormComponent },
      { path: 'admin/application/edit/:id', component: ApplicationFormComponent }, 
      { path: 'admin/dashboard-suganya', component: DashboardSuganyaComponent }, 
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
