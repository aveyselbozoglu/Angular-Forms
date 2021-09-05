import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/customer.model';
import { debounceTime } from 'rxjs/operators';

// custom validator function
function rangeValidator2(c: AbstractControl): { [key: string]: boolean } | null {

  if (c.value !== null && (c.value < 1 || c.value > 5 || isNaN(c.value))) {

    return { range: true }

  }

  return null;

}

// custom validator with params
function rangeValidator(min: number, max: number): ValidatorFn {

  return (c: AbstractControl): { [key: string]: boolean } | null => {

    if (c.value !== null && (c.value < min || c.value > max || isNaN(c.value))) {

      return { range: true }

    }

    return null;

  }
}

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {

  const emailCtrl = c.get('eemail');
  const confirmEmailCtrl = c.get('confirmEmail');

  if (emailCtrl.pristine || confirmEmailCtrl.pristine)
    return null

  if (emailCtrl.value === confirmEmailCtrl.value)
    return null

  return { 'match': true }
}

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {

  customer: Customer = new Customer();
  customerForm: FormGroup;
  constructor(private readonly fb: FormBuilder) { }

  confirmMailMessage: string;

  confirmMailMessages = {
    email: 'Please enter mail format',
    required: 'Please enter your mail'
  }

  ngOnInit(): void {
    // this.customerForm = new FormGroup({
    //   firstName: new FormControl(),
    // });
    this.customerForm = this.fb.group({
      firstName: ['Mayk', [Validators.required]],
      notification: 'phone',
      emailGroup: this.fb.group({
        eemail: ['', Validators.email],
        confirmEmail: ['', [Validators.email, Validators.required]]
      }, { validator: emailMatcher }),
      rating: [null, rangeValidator(1, 5)],
      sendCatalog: true,
      addresses: this.fb.array([this.buildAdresses()])

    })

    const confirmMailControl = this.customerForm.get('emailGroup.confirmEmail');

    confirmMailControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(val => {
      this.setConfirmMailMessage(confirmMailControl);
    })

    const sendCatalogControl = this.customerForm.get('sendCatalog')

    sendCatalogControl.valueChanges.subscribe(val => {
      if (val === false)
        this.clearAdresses();
      if (val === true)
        this.addAddress();
    })

  }



  get addresses(): FormArray {
    return <FormArray>this.customerForm.get('addresses');
  }


  public setConfirmMailMessage(c: AbstractControl): void {

    this.confirmMailMessage = '';

    if ((c.touched || c.dirty) && c.errors) {
      this.confirmMailMessage = Object.keys(c.errors).map(
        key => this.confirmMailMessages[key]).join('')
    }

    console.log(this.confirmMailMessage);


  }

  save() {
    // console.log(this.customerForm);
    // console.log(this.customerForm.controls.firstName.valid);
    // console.log(this.customerForm.get('firstName').valid);
  }

  populateData() {
    this.customerForm.patchValue({
      firstName: 'Tommy'
    })
  }

  setNotification(values: string): void {

    const cc = this.customerForm.get('emailGroup.eemail');

    if (values === 'email') {
      cc.setValidators(Validators.required);
      cc.setValidators(Validators.email);
    }
    else
      cc.clearValidators();

    cc.updateValueAndValidity();

  }


  buildAdresses(): FormGroup {

    return this.fb.group({
      addressType: 'home',
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: '',
    })
  }

  addAddress(): void {
    this.addresses.push(this.buildAdresses());
  }

  clearAdresses(): void {
    this.addresses.clear();
  }

}


