export interface CRUD<T> {
  fetch(): void;
  create(val: any): void;
  editRow(val: number): void;
  deleteRow(val: number): void;
}
export enum ROLES {
  DEVELOPER,
  QA,
  DevOps
}
export class Employee {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNo: number;
  role: ROLES;
  address: string;
}
export class fetchData {
  async fetch1() {
    let response = await fetch("data.json");
    let data = await response.json();
    return(data);
  }
} 

