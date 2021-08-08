import { Employee } from './../../../shared/models/employee.interface';
import { NavigationExtras, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  employee: Employee;
      
  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  constructor(private router: Router) {
    const navigation=this.router.getCurrentNavigation();
    this.employee=navigation?.extras?.state?.value;
   }

  ngOnInit(): void {
    if (typeof this.employee === 'undefined') {
      this.router.navigate(['list']);
    }
  }
  onGoToEdit():void{
    this.navigationExtras.state!.value = this.employee;
    this.router.navigate(['edit'], this.navigationExtras);

  }
  onDelete():void{
    alert('Deleted');
  }
  onGoBackToList():void{
    this.router.navigate(['list']);
  }

}
