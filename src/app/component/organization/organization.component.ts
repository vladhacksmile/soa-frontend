import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Organization, OrganizationType} from "../../model/organization";
import {OrganizationService} from "../../service/organization.service";
import {Result, Status} from "../../model/result";
import {OrganizationRequest} from "../../request/OrganizationRequest";
import {LazyLoadEvent, MessageService} from "primeng/api";

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css'],
  providers: [MessageService]
})
export class OrganizationComponent implements OnInit {
  form!: FormGroup;
  info: any;
  loading: boolean = false;
  totalRecords: number = 0;
  organizations!: Organization[] | undefined;
  selectedOrganization: Organization | null = null; // выбранная организация
  pageSize!: number;
  visibleCreate!: boolean;
  visibleEdit!: boolean;
  visibleCountLowerAnnualTurnover!: boolean;
  countLowerAnnualTurnoverValue: number = 0;
  first = 0;
  rows = 10;
  searchTerm: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private organizationService: OrganizationService,
    private msg: MessageService
  ) {
    this.form = this.formBuilder.group({
      name: "",
      coordinateX: 0,
      coordinateY: 0,
      creationDate: "",
      annualTurnover: 0,
      type: OrganizationType.PUBLIC,
      officialAddress: "",
      annualTurnoverLower: 0
    })
  }

  ngOnInit(): void {
    this.getOrganizations();
  }

  onSubmit(): void{
    console.log(this.form.value.type)
    console.log(this.selectedType)
    this.organizationService.createOrganization(new OrganizationRequest(this.form.value.name,
      this.form.value.coordinateX, this.form.value.coordinateY, this.form.value.annualTurnover, this.form.value.type,
      this.form.value.officialAddress)).subscribe(
      data => {
        let description = data.description;
        let status = data.status;
        if (status != undefined && status == "OK") {
          this.msg.add({severity:'success', summary: status, detail: description != undefined ? description : 'Организация добавлена!'});
          this.ngOnInit();
          this.toggleCreate();
        } else if (status != undefined) {
          this.msg.add({severity:'error', summary: status, detail: description != undefined ? description : 'Неизвестная ошибка!'});
        } else {
          this.msg.add({severity: 'error', summary: 'Сообщение', detail: 'Неизвестная ошибка data!'});
        }
      }, error => {
        this.dispatchError(error);
      }
    );
  }

  public dispatchError(error: any) {
    if (error.error instanceof ErrorEvent) {
      this.msg.add({severity: 'error', summary: 'Ошибка на стороне клиента!', detail: error.message});
    } else {
      if (this.isResult(error.error)) {
        let result = error.error as Result<any>;
        let description = result.description;
        let status = result.status;
        this.msg.add({
          severity: 'error',
          summary: status,
          detail: description != undefined ? description : 'Неизвестная ошибка!'
        });
      } else {
        this.msg.add({
          severity: 'error',
          summary: "Неизвестная ошибка!",
          detail: 'Неизвестная ошибка!'
        });
      }
    }
  }
  public isResult(obj: any): obj is Result<any> {
    return obj && obj.status !== undefined;
  }

  onUpdate(): void{
    console.log(this.selectedOrganization?.id)
    this.organizationService.updateOrganization(new OrganizationRequest(this.form.value.name,
      this.form.value.coordinateX, this.form.value.coordinateY, this.form.value.annualTurnover, this.form.value.type,
      this.form.value.officialAddress, this.selectedOrganization?.id)).subscribe(
      data => {
        let description = data.description;
        let status = data.status;
        if (status != undefined && status == "OK") {
          this.msg.add({severity:'success', summary: status, detail: description != undefined ? description : 'Организация обновлена!'});
        } else if (status != undefined) {
          this.msg.add({severity:'error', summary: status, detail: description != undefined ? description : 'Неизвестная ошибка!'});
        } else {
          this.msg.add({severity: 'error', summary: 'Сообщение', detail: 'Неизвестная ошибка data!'});
        }
        this.ngOnInit();
        this.toggleEdit();
      }, error => {
        this.dispatchError(error);
      }
    );
  }

  deleteAction(): void {
    const result = window.confirm('Вы уверены, что хотите удалить организацию?');
    if (result) {
      if (this.selectedOrganization) {
        this.organizationService.deleteOrganization(this.selectedOrganization.id).subscribe(
          data => {
            let description = data.description;
            let status = data.status;
            if (status != undefined && status == "OK") {
              this.msg.add({
                severity: 'success',
                summary: status,
                detail: description != undefined ? description : 'Организация удалена!'
              });
              this.toggleEdit();
              this.ngOnInit();
            } else if (status != undefined) {
              this.msg.add({
                severity: 'error',
                summary: status,
                detail: description != undefined ? description : 'Неизвестная ошибка!'
              });
            } else {
              this.msg.add({severity: 'error', summary: 'Сообщение', detail: 'Неизвестная ошибка data!'});
            }
          }, error => {
            this.dispatchError(error);
          }
        )
      }
    } else {

    }
  }

  showCreate() {
    this.visibleCreate = !this.visibleCreate;
  }

  editName: string | undefined = "";
  editCoordinateX: number | undefined = 0;
  editCoordinateY: number | undefined = 0;
  editAnnualTurnover: number | undefined = 0;
  editOrganizationType: string | undefined = "TRUST";
  editOfficialAddress: string | undefined = ""

  showEdit(event: any) {
    this.toggleEdit();
    this.selectedOrganization = event;
    this.editName = this.selectedOrganization?.name
    this.editCoordinateX = this.selectedOrganization?.coordinateX
    this.editCoordinateY = this.selectedOrganization?.coordinateY
    this.editAnnualTurnover = this.selectedOrganization?.annualTurnover
    console.log(this.selectedOrganization?.type + " " + typeof this.selectedOrganization?.type)
    this.editOrganizationType = String(this.selectedOrganization?.type)
    console.log("Изменённый " + this.editOrganizationType + " " + typeof this.editOrganizationType)
    this.editOfficialAddress = this.selectedOrganization?.officialAddress
    console.log(this.selectedOrganization)
  }

  toggleEdit() {
    this.visibleEdit = !this.visibleEdit;
  }

  toggleCreate() {
    this.visibleCreate = !this.visibleCreate;
  }

  toggleCountLowerAnnualTurnover() {
    this.visibleCountLowerAnnualTurnover = !this.visibleCountLowerAnnualTurnover;
  }

  closeCreate(event: any) {
    this.toggleEdit();
  }

  closeEdit(event: any) {
    this.toggleEdit();
  }

  loadLazyData(event: LazyLoadEvent) {
    if (event != undefined && event.rows != undefined && event.first != undefined) {
      this.first = event.first;
      this.rows = event.rows;
    }

    this.getOrganizations();
  }

  public getOrganizations() {
    this.organizationService.getOrganizations(this.first / this.rows + 1, this.rows,
      this.selectedSortingType.toString(), this.selectedSortingField.toString(), "greater_or_equal", "name", this.searchTerm).subscribe(
      data => {
        this.loading = false;
        let status = data.status;
        if (status != undefined && status == "OK") {
          if (data.object != undefined) {
            this.organizations = data.object.objects;
            this.totalRecords = data.object.totalElements;
          } else {
            this.organizations = undefined;
            this.totalRecords = 0;
          }
        } else {
          this.organizations = undefined;
          this.totalRecords = 0;
        }
      }, error => {
        this.organizations = undefined;
        this.totalRecords = 0;
        this.dispatchError(error);
      }
    )
  }

  protected readonly OrganizationType = OrganizationType;
  // organizationType = ["PUBLIC", "GOVERNMENT", "TRUST", "PRIVATE_LIMITED_COMPANY", "OPEN_JOINT_STOCK_COMPANY"];
  organizationType = [
    {label: "Публичный", value: "PUBLIC"},
    {label: "Государственный", value: "GOVERNMENT"},
    {label: "Доверенный", value: "TRUST"},
    {label: "Приватный", value: "PRIVATE_LIMITED_COMPANY"},
    {label: "ОАО", value: "OPEN_JOINT_STOCK_COMPANY"},
  ]
  selectedType: any;
  sortingType = [{label: "По возрастанию", value: "asc"}, {label: "По убыванию", value: "desc"}];
  sortingField = [
    {label: "ID", value: "id"},
    {label: "Имя", value: "name"},
    {label: "Координата X", value: "coordinateX"},
    {label: "Координата Y", value: "coordinateY"},
    {label: "Дата создания", value: "creationDate"},
    {label: "Годовой оборот", value: "annualTurnover"},
    {label: "Тип", value: "type"},
    {label: "Адрес", value: "officialAddress"}
  ];

  selectedSortingType: any = "asc";
  selectedSortingField: any = "id";

  countLowerAnnualTurnover() {
    this.organizationService.countLowerAnnualTurnover(this.form.value.annualTurnoverLower).subscribe(
      data => {
        let description = data.description;
        let status = data.status;
        let result = data.object;
        if (status != undefined && status == "OK") {
          this.msg.add({severity:'success', summary: status, detail: description != undefined ? description : 'Меньше заданного ' + result});
          if (result != undefined) {
            this.countLowerAnnualTurnoverValue = result;
          }
          this.ngOnInit();
          // this.toggleCountLowerAnnualTurnover();
        } else if (status != undefined) {
          this.msg.add({severity:'error', summary: status, detail: description != undefined ? description : 'Неизвестная ошибка!'});
        } else {
          this.msg.add({severity: 'error', summary: 'Сообщение', detail: 'Неизвестная ошибка data!'});
        }
      }, error => {
        this.dispatchError(error);
      }
    );
  }

  findSubstring() {
    this.getOrganizations();
  }

  uniqueLowerAnnualTurnover() {
    this.organizationService.uniqueAnnualTurnovers().subscribe(
      data => {
        let description = data.description;
        let status = data.status;
        let result = data.object;
        if (status != undefined && status == "OK") {
          this.msg.add({severity:'success', summary: status, detail: description != undefined ? description : 'Операция выполнена'});
          if (result != undefined) {
            window.alert("Список уникальных годовых оборотов: " + result?.join(", "));
          } else {
            window.alert("Список пуст!");
          }
        } else if (status != undefined) {
          this.msg.add({severity:'error', summary: status, detail: description != undefined ? description : 'Неизвестная ошибка!'});
        } else {
          this.msg.add({severity: 'error', summary: 'Сообщение', detail: 'Неизвестная ошибка data!'});
        }
      }, error => {
        this.dispatchError(error);
      }
    );
  }
}
