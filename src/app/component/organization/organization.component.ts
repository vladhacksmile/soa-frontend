import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Organization, OrganizationType} from "../../model/organization";
import {OrganizationService} from "../../service/organization.service";
import {SearchResult} from "../../model/SearchResult";
import {Result} from "../../model/result";
import {single} from "rxjs";
import {OrganizationRequest} from "../../request/OrganizationRequest";

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  form!: FormGroup;

  organizationData: Organization = {
    id: 0,
    name: "",
    coordinateX: 0,
    coordinateY: 0,
    creationDate: "",
    annualTurnover: 0,
    type: OrganizationType.PUBLIC,
    officialAddress: ""
  };
  info: any;
  isUsedCashbackModel!: boolean;
  isPercentageOnBalanceModel!: boolean;
  isEvenDistributionModel!: boolean;
  organizations!: Organization[] | undefined;
  selectedOrganization: Organization | null = null; // выбранная организация
  pageSize!: number;
  visibleCreate!: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private organizationService: OrganizationService
  ) {
    this.form = this.formBuilder.group({
      name: "",
      coordinateX: 0,
      coordinateY: 0,
      creationDate: "",
      annualTurnover: 0,
      type: OrganizationType.PUBLIC,
      officialAddress: ""
    })
  }

  ngOnInit(): void {
    this.getOrganizations();
    // this.organizations = [
    //   {
    //     id: 1,
    //     name: 'Company A',
    //     coordinateX: 10,
    //     coordinateY: 20,
    //     creationDate: "дата",
    //     annualTurnover: 1000000,
    //     type: OrganizationType.PUBLIC,
    //     officialAddress: '123 Main Street',
    //   },
    //   {
    //     id: 2,
    //     name: 'Company B',
    //     coordinateX: 30,
    //     coordinateY: 40,
    //     creationDate: "дата",
    //     annualTurnover: 2000000,
    //     type: OrganizationType.GOVERNMENT,
    //     officialAddress: '456 Oak Avenue',
    //   },
    //   {
    //     id: 3,
    //     name: 'Company C',
    //     coordinateX: 50,
    //     coordinateY: 60,
    //     creationDate: "дата",
    //     annualTurnover: 3000000,
    //     type: OrganizationType.TRUST,
    //     officialAddress: '789 Pine Road',
    //   },
    // ];
  }

  getOrganizations(): void {
    this.organizationService.getOrganizations().subscribe(
        data => {
          this.organizations = data.object?.objects;
        },
    )
  }

  onSubmit(): void{
    this.organizationService.createOrganization(new OrganizationRequest(this.form.value.name,
        this.form.value.coordinateX, this.form.value.coordinateY, this.form.value.annualTurnover, this.form.value.type,
        this.form.value.officialAddress)).subscribe(
      data => {
        this.ngOnInit();
        // this.msg.add({severity:'success', summary: 'Настройки', detail: 'Настройки успешно обновлены!'});
      }, error => {

      }
    );
  }

  deleteAction(): void {
    if (this.selectedOrganization) {
      this.organizationService.deleteOrganization(this.selectedOrganization.id).subscribe(
          data => {
            if (data.object != null) {
              this.selectedOrganization = null;
              this.getOrganizations();
            }
          },
      )
    }
  }

  onRowSelect(event: any) {
    // Обработчик выбора строки
    if (this.selectedOrganization && this.selectedOrganization !== event.data) {
      // Если уже есть выбранная организация и выбрана другая, снимите галочку с предыдущей
      this.selectedOrganization = null;
    }
    this.selectedOrganization = event.data;
    console.log('Row selected', this.selectedOrganization);
  }

  onRowUnselect(event: any) {
    this.selectedOrganization = null;
  }

  showCreate() {
    this.visibleCreate = !this.visibleCreate;
  }

  protected readonly OrganizationType = OrganizationType;
}
