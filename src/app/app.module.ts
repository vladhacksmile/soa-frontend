import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { OrganizationComponent } from './component/organization/organization.component';
import { EmployeeComponent } from './component/employee/employee.component';
import {AppRoutingModule} from "./app-routing.module";
import {InputSwitchModule} from "primeng/inputswitch";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ChartModule} from "primeng/chart";
import {ProgressBarModule} from "primeng/progressbar";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {CarouselModule} from "primeng/carousel";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {DropdownModule} from "primeng/dropdown";
import {AvatarModule} from "primeng/avatar";
import {CardModule} from "primeng/card";
import {DialogModule} from "primeng/dialog";
import {HttpClientModule} from "@angular/common/http";
import {NgCreditCardModule} from "angular-credit-card";
import {InputMaskModule} from "primeng/inputmask";
import {RouterOutlet} from "@angular/router";
import {TableModule} from "primeng/table";

@NgModule({
  declarations: [
    AppComponent,
    OrganizationComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ChartModule,
    ProgressBarModule,
    ScrollPanelModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    InputSwitchModule,
    AvatarModule,
    CardModule,
    DialogModule,
    HttpClientModule,
    NgCreditCardModule,
    ToastModule,
    InputMaskModule,
    AppRoutingModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
