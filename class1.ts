import * as Imp from "./class2.js";
// import * as Imp1 from "./class3.js";
let obj1 = new Imp.fetchData();
class actions {
  flag: boolean;
  copy: any[];
  cols: number;
  arrHeaders: any;
  rows: number;
  removeRow: boolean[];
  //cell:any[]=[];
  constructor() {
    this.flag = true;
    this.copy = [];
    this.arrHeaders = [];
    this.removeRow = [];
    let j = document.getElementById("b1")!;
    j.addEventListener("click", this.loadData);
  }
  loadData() {
    if (document.getElementById("b1")!.innerHTML == "LOAD DATA") {
      document.getElementById("b1")!.innerHTML = "REFRESH DATA";
    } else {
      let div = document.getElementById("d1")!;
      div.innerHTML = " ";
    }
    obj1.fetch1().then(data => obj.create(data));
    // let data1=obj1.fetch1();
    // obj.create(data1);
  }
  create(Emp: any) {
    // document.getElementById("LOAD").innerHTML = "REFRESH DATA";
    // let div = document.getElementById("id1");
    // div.innerHTML = " ";
    let table = document.createElement("table");
    obj.arrHeaders = [
      "FirstName",
      "MiddleName",
      "LastName",
      "Email",
      "Phoneno",
      "Role",
      "Address"
    ];
    obj.rows = Emp.length;
    obj.cols = obj.arrHeaders.length;
    obj.removeRow = [];
    let tr = table.insertRow(-1);
    for (let h = 0; h < obj.cols + 2; h++) {
      let th = document.createElement("th");
      if (h < obj.cols) {
        th.innerHTML = obj.arrHeaders[h];
        tr.appendChild(th);
      } else {
        th.innerHTML = "Action";
        tr.appendChild(th);
      }
    }
    for (let c = 0; c < obj.rows; c++) {
      tr = table.insertRow(-1);
      tr.setAttribute("id", "row" + c);
      tr.innerHTML =
        '<td class="cell' + c + '">' + Emp[c].FirstName +"</td>" +
        '<td class="cell' + c + '">' + Emp[c].MiddleName + "</td>" +
        '<td class="cell' + c + '">' + Emp[c].LastName + "</td>" +
        '<td class="cell' + c + '">' + Emp[c].Email + "</td>" +
        '<td class="cell' + c + '">' + Emp[c].phoneno + "</td>" +
        '<td class="cell' + c + '">' + Imp.ROLES[Emp[c].role] + "</td>" +
        '<td class="cell' + c + '">' + Emp[c].Address + "</td>" +
        '<td> <button type="button" id="edit' + c + '"> edit data</button></td>' +
        '<td> <button type="button"  id="delete' + c + '"> delete data </button></td>';
    }
    document.getElementById("d1")!.appendChild(table);
    for (let i = 0; i < obj.rows; i++) {
        let edit_button = "edit" + i;
        let delete_button = "delete" + i;
        let n = i;
        let edit = document.getElementById(edit_button);
        edit!.onclick = () => {
          this.editRow(n);
        }
        let deletef=document.getElementById(delete_button);
        deletef!.onclick = () => {
            this.deleteRow(n);
          }
     }
  }
  editRow(val: number) {
    // let rInd = ((event!.target as HTMLTableCellElement)
    //   .parentNode as HTMLTableRowElement).rowIndex;
    // console.log(rInd);
    let cellClass = "cell" + val;
    //  let rowId = 'row' + val;
    let cell = document.getElementsByClassName(cellClass);
    this.copyLastRow(val);
    if (this.flag) {
      this.flag = false;
      for (let i = 0; i < this.cols; i++) {
        cell[i].setAttribute("contenteditable", "true");
      }
      this.changeButton(val);
      this.disableButtons(val);
    } else {
      this.flag = true;
      this.copy = [];
      for (let i = 0; i < this.cols; i++) {
        cell[i].setAttribute("contenteditable", "false");
      }
      this.changeAgain(val);
      this.enableButtons(val);
    }
  }
  deleteRow(val: number) {
    let row_id = "row" + val;
    let cellClass = "cell" + val;
    let cell = document.getElementsByClassName(cellClass)!;
    if (this.flag) {
      let delete_row = document.getElementById(row_id)!;
      delete_row.parentNode!.removeChild(delete_row);
      this.removeRow[val] = true;
    } else {
      this.flag = true;
      this.pasteLastRow(val);
      this.copy = [];
      for (let i = 0; i < this.rows; i++) {
        cell[i].setAttribute("contenteditable", "false");
      }
      this.changeAgain(val);
      this.enableButtons(val);
    }
  }
  copyLastRow(val: number) {
    let cellClass = "cell" + val;
    let cell = document.getElementsByClassName(cellClass);
    //console.log(cell);
    for (let i = 0; i < this.cols; i++) {
      this.copy[i] = cell[i].innerHTML;
    }
  }
  pasteLastRow(val: number) {
    let cellClass = "cell" + val;
    let cell = document.getElementsByClassName(cellClass);
    for (let i = 0; i < this.cols; i++) {
      cell[i].innerHTML = this.copy[i];
    }
  }
  changeButton(val: number) {
    let edit_btn = "edit" + val;
    let delete_btn = "delete" + val;
    document.getElementById(edit_btn)!.innerHTML = "Save";
    document.getElementById(delete_btn)!.innerHTML = "cancel";
  }
  changeAgain(val: number) {
    let edit_btn = "edit" + val;
    let delete_btn = "delete" + val;
    document.getElementById(edit_btn)!.innerHTML = "edit data";
    document.getElementById(delete_btn)!.innerHTML = "delete data";
  }
  enableButtons(val: number) {
    for (let i = 0; i < this.rows; i++) {
      if (this.removeRow[i] !== true && i !== val) {
        document.getElementById("edit" + i)!.toggleAttribute("disabled");
        document.getElementById("delete" + i)!.toggleAttribute("disabled");
      }
    }
  }
  disableButtons(val: number) {
    for (let i = 0; i < this.rows; i++) {
      if (this.removeRow[i] !== true && i !== val) {
        document.getElementById("edit" + i)!.toggleAttribute("disabled");
        document.getElementById("delete" + i)!.toggleAttribute("disabled");
      }
    }
  }
}
export let obj = new actions();
