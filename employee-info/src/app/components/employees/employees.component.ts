import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ApiServiceService } from 'src/app/shared/api-service.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employeesForm!: FormGroup;
  employeesModel:any;
  employeesDetails: any;
  showAddBtn: boolean=true;
  showUpdateBtn: boolean=false;

  constructor(private api: ApiServiceService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAllEmployeesDetails();
    this.createEmployeesForm();
  }
  createEmployeesForm(){
    this.employeesForm = this.fb.group({
      id:[''],
      name:[''],
      email:[''],
      salary:[''],
      location:['']
    })
  }
  getAllEmployeesDetails(){
    this.api.getAllEmployees().subscribe(res=>{
      this.employeesDetails = res;
    },err=>{
      console.log(err);
    })
  }

  postEmployeesDetails(){
    this.employeesModel = Object.assign({},this.employeesForm.value);
    this.api.postEmployees(this.employeesModel).subscribe(res=>{
      alert("Employee Information added");
      let close = document.getElementById('close');
      close?.click();
      this.employeesForm.reset();
      this.getAllEmployeesDetails();
    }, err=>{
      alert("Error occured");
    })
  }

  deleteEmployeesDetails(id:any){
    this.api.deleteEmployees(id).subscribe(res=>{
      alert("Employee Information deleted!");
      this.getAllEmployeesDetails();
    },err=>{
      alert("Failed!");
    })
  }

  editEmployeesDetails(employee:any){
    this.showAddBtn = false;
    this.showUpdateBtn = true;
    this.employeesForm.controls['id'].setValue(employee.id);
    this.employeesForm.controls['name'].setValue(employee.name);
    this.employeesForm.controls['email'].setValue(employee.email);
    this.employeesForm.controls['salary'].setValue(employee.salary);
    this.employeesForm.controls['location'].setValue(employee.location);
  }
  updateEmployeesDetails(){
    this.employeesModel = Object.assign({}, this.employeesForm.value);
    this.api.updateEmployees(this.employeesModel, this.employeesModel.id).subscribe(res=>{
      alert("Employee Information updated!");
      let close = document.getElementById('close');
      close?.click();
      this.getAllEmployeesDetails();
      this.employeesForm.reset();
      this.employeesModel={};
    },
    err=>{
      alert("Error occured");
    })
  }
  onAddClick(){
    this.showAddBtn=true;
    this.showUpdateBtn=false;
  }
  reset(){
    this.employeesForm.reset();
    this.employeesModel={};
  }
}