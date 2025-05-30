import { Routes } from "@angular/router";
import { MasterComponent } from "./layout/master/master.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { TodoComponent } from "./todo/todo.component";
import { AuthGuard } from "../auth.guard";
import { MainComponent } from "./main/main.component";
import { AdmissionListComponent } from "./admission/admission-list/admission-list.component";
import { AdmissionFormComponent } from "./admission/admission-form/admission-form.component";

export const routes: Routes = [
  { path: 'login', component: SignInComponent },
  {
    path: '', 
    component: MasterComponent,
    //canActivate: [AuthGuard], // Optional: protect access, if we enable this, remult.user is undefined
    children: [
      { path: 'dashboard', component: MainComponent },
      { path: 'admin/admissions', component: AdmissionListComponent },
      { path: 'admin/admissions/new', component: AdmissionFormComponent },
      { path: 'admin/admissions/edit/:id', component: AdmissionFormComponent }, // <--- Important!
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
