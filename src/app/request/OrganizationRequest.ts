import {OrganizationType} from "../model/organization";

export class OrganizationRequest {
  name: string;
  coordinateX: number;
  coordinateY: number;
  annualTurnover: number;
  type: OrganizationType;
  officialAddress: string;

  constructor(name: string, coordinateX: number, coordinateY: number, annualTurnover: number, type: OrganizationType, officialAddress: string) {
    this.name = name;
    this.coordinateX = coordinateX;
    this.coordinateY = coordinateY;
    this.annualTurnover = annualTurnover;
    this.type = type;
    this.officialAddress = officialAddress;
  }
}