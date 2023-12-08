import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Organization} from "../model/organization";
import {OrganizationRequest} from "../request/OrganizationRequest";
import {Result} from "../model/result";
import {SearchResult} from "../model/SearchResult";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private organizationUrl = 'http://localhost:8080/organizations';

  constructor(private http: HttpClient) {}

  public getOrganizations(pageNum?: number, pageSize?: number, sortType?: string, sortColumn?: string, filterOperation?: string,
                          filterField?: string, filterValue?: string) {
    return this.http.get<Result<SearchResult<Organization>>>(this.organizationUrl);
  }

  public deleteOrganization(id: number){
    return this.http.delete<Result<Organization>>(this.organizationUrl + "/" + id);
  }

  public createOrganization(organizationRequest: OrganizationRequest){
    return this.http.post<Result<Organization>>(this.organizationUrl, organizationRequest, httpOptions);
  }

  public updateOrganization(organizationRequest: OrganizationRequest) {
    return this.http.post<any>(this.organizationUrl, organizationRequest, httpOptions);
  }
}
