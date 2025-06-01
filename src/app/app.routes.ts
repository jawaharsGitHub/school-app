import { Routes } from "@angular/router";
import { MasterComponent } from "./layout/master/master.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { TodoComponent } from "./todo/todo.component";
import { AuthGuard } from "../auth.guard";
import { MainComponent } from "./main/main.component";
import { AdmissionListComponent } from "./admission/admission-list/admission-list.component";
import { AdmissionMainComponent } from "./admission/admission-form-main/admission-form-main.component";

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
      { path: 'admin/applicants/edit/:id', component: AdmissionMainComponent }, // <--- Important!
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
