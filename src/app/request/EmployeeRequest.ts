export class EmployeeRequest {
  id?: number | undefined;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  organizationId: number;

  constructor(userName: string, firstName: string, lastName: string, email: string, organizationId: number, id?: number | undefined) {
    this.userName = userName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.organizationId = organizationId;
    if (id != undefined) {
        this.id = id;
    }
  }
}
