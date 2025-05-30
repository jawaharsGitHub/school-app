import { Routes } from "@angular/router";
import { MasterComponent } from "./layout/master/master.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { TodoComponent } from "./todo/todo.component";
import { AuthGuard } from "../auth.guard";

export const routes: Routes = [
  { path: 'login', component: SignInComponent },
  {
    path: '', 
    component: MasterComponent,
    //canActivate: [AuthGuard], // Optional: protect access, if we enable this, remult.user is undefined
    children: [
      { path: 'todo', component: TodoComponent },
      { path: '', redirectTo: 'todo', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
