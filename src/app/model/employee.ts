export interface Organization {
  id: number
  name: string
  coordinateX: number
  coordinateY: number
  creationDate: string
  annualTurnover: number
  type: OrganizationType
  officialAddress: string
}

export enum OrganizationType {
  PUBLIC = 1, GOVERNMENT = 2, TRUST = 3, PRIVATE_LIMITED_COMPANY = 4, OPEN_JOINT_STOCK_COMPANY = 5
}
