import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Organization} from "../model/organization";
import {OrganizationRequest} from "../request/OrganizationRequest";
import {Result} from "../model/result";
import {SearchResult} from "../model/SearchResult";
import {Employee} from "../model/employee";
import {EmployeeRequest} from "../request/EmployeeRequest";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private organizationUrl = 'https://localhost:8080/organizations';
  private employeeUrl = 'https://localhost:8080/employees';
  private orgManagerUrl = 'http://localhost:8443/orgmanager';

  constructor(private http: HttpClient) {}

  public getOrganizations(pageNum?: number | null | undefined,
                          pageSize?: number | null | undefined,
                          sortType?: string | null | undefined,
                          sortColumn?: string | null | undefined,
                          filterOperation?: string | null | undefined,
                          filterField?: string | null | undefined,
                          filterValue?: string | null | undefined) {
    const hasParams = pageNum !== undefined || pageSize !== undefined || sortType !== undefined || sortColumn !== undefined ||
      filterOperation !== undefined || filterField !== undefined || filterValue !== undefined;

    var queryString = [
      pageNum !== null && pageNum !== undefined ? `page_num=${encodeURIComponent(pageNum)}` : '',
      pageSize !== null && pageSize !== undefined ? `page_size=${encodeURIComponent(pageSize)}` : '',
      sortType !== null && sortType !== undefined ? `sort_type=${encodeURIComponent(sortType)}` : '',
      sortColumn !== null && sortColumn !== undefined ? `sort_column=${encodeURIComponent(sortColumn)}` : '',
      filterOperation !== null && filterOperation !== undefined ? `filter_operation=${encodeURIComponent(filterOperation)}` : '',
      filterField !== null && filterField !== undefined ? `filter_field=${encodeURIComponent(filterField)}` : '',
      filterValue !== null && filterValue !== undefined ? `filter_value=${encodeURIComponent(filterValue)}` : ''
    ].filter(Boolean).join('&');

    return this.http.get<Result<SearchResult<Organization>>>(`${this.organizationUrl}${hasParams ? '?' + queryString : ''}`);
  }

  public getEmployeesByOrganizationId(pageNum?: number | null | undefined,
                          pageSize?: number | null | undefined,
                          organizationId?: number) {
    const hasParams = pageNum !== undefined || pageSize !== undefined;

    var queryString = [
      pageNum !== null && pageNum !== undefined ? `page_num=${encodeURIComponent(pageNum)}` : '',
      pageSize !== null && pageSize !== undefined ? `page_size=${encodeURIComponent(pageSize)}` : '',
    ].filter(Boolean).join('&');
    const organizationUrl = "/organization/";
    return this.http.get<Result<SearchResult<Employee>>>(`${this.employeeUrl + organizationUrl}${hasParams ? '?' + queryString : ''}`);
  }

  public deleteOrganization(id: number){
    return this.http.delete<Result<Organization>>(this.organizationUrl + "/" + id);
  }

  public hireRequest(orgId: number, employee: EmployeeRequest){
    return this.http.post<any>(this.orgManagerUrl + "/hire/" + orgId, employee, httpOptions);
  }

  public createOrganization(organizationRequest: OrganizationRequest){
    return this.http.post<Result<Organization>>(this.organizationUrl, organizationRequest, httpOptions);
  }

  public updateOrganization(organizationRequest: OrganizationRequest) {
    return this.http.put<Result<Organization>>(this.organizationUrl, organizationRequest, httpOptions);
  }

  public updateEmployee(employeeRequest: EmployeeRequest) {
    return this.http.put<Result<Employee>>(this.employeeUrl, employeeRequest, httpOptions);
  }

  public deleteEmployee(id: number){
    return this.http.delete<Result<Employee>>(this.employeeUrl + "/" + id);
  }

  public countLowerAnnualTurnover(annualTurnover: number){
    return this.http.post<Result<number>>(this.organizationUrl + "/operations/count-lower-annual-turnover?annual-turnover=" + annualTurnover, httpOptions);
  }

  public uniqueAnnualTurnovers(){
    return this.http.post<Result<number[]>>(this.organizationUrl + "/operations/unique-annual-turnovers", httpOptions);
  }
}
