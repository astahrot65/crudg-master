import { EmployeesService } from './../../../pages/employees/employees.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Employee } from '../../models/employee.interface';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  employee: Employee;
  

  private isEmail = /\S+@\S+\.\S+/;
  empleadoForm: FormGroup;
  employeeForm: any;

  constructor(private fb: FormBuilder, private employeesSvc: EmployeesService,private router: Router) {

    this.empleadoForm = new FormGroup({
      nombres: new FormControl(),
      apellidos: new FormControl(),
      cedula: new FormControl(),
      email: new FormControl(),
      fecha: new FormControl(),
   });
    const navigation = this.router.getCurrentNavigation();
    this.employee = navigation?.extras?.state?.value;
    this.initForm();
  }

  ngOnInit(): void {
    if (typeof this.employee === 'undefined') {
      this.router.navigate(['new']);
    } else {
      this.employeeForm.patchValue(this.employee);
    }
  }

  onSave(): void {
    console.log('Saved', this.employeeForm.value);
    if (this.employeeForm.valid) {
      const employee = this.employeeForm.value;
      const employeeId = this.employee?.id || '';
         this.employeesSvc.onSaveEmployee(employee, employeeId);
      this.employeeForm.reset();
    }

  }

  onGoBackToList(): void {
    this.router.navigate(['list']);
  }

  isValidField(field: string): string {
    const validatedField = this.employeeForm.get(field);
    return (!validatedField.valid && validatedField.touched)
      ? 'is-invalid' : validatedField.touched ? 'is-valid' : '';
  }

  private initForm(): void {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      startDate: ['', [Validators.required]],
    });
  }

  employees$ = this.employeesSvc.employees;
  
  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  onGoToNew(): void {

    this.router.navigate(['new'], this.navigationExtras);
  }
  onGoToEdit(item: any): void {
    this.navigationExtras.state!.value = item;
    this.router.navigate(['edit'], this.navigationExtras);
  }

  onGoToSee(item: any): void {
    this.navigationExtras.state!.value = item;
    this.router.navigate(['details'], this.navigationExtras);
  }
  
   onGoToDelete(empId:any): void {
    
    try {
       this.employeesSvc.onDeleteEmployees(empId);
      alert('Deleted');
    } catch (err) {
      console.log(err);
    }

  }


  


}
