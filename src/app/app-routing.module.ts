import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationComponent } from "./component/organization/organization.component";
import { EmployeeComponent } from "./component/employee/employee.component";

const routes: Routes = [
  {
    path: 'employee', component: EmployeeComponent,
  },
  {
    path: 'organization', component: OrganizationComponent,
  },
  {
    path: '',
    redirectTo: 'organization',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
