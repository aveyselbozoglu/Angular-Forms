import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from 'src/app/models/customer.model';

@Component({
  selector: 'app-reactiv-form',
  templateUrl: './reactiv-form.component.html',
  styleUrls: ['./reactiv-form.component.scss']
})
export class ReactivFormComponent implements OnInit {

  customer : Customer = new Customer();
  constructor() { }

  ngOnInit(): void {
  }


  save(signupForm: NgForm) {
    // 
    console.log(signupForm);
    
    console.log(signupForm.form);
    
    console.log(JSON.stringify(signupForm.value));
    
  }
}
