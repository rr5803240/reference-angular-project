import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import { AuthenticationService, AlertService } from '../../services';
import { first } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  addressForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  addressList:any[] =[];
  enterAddressArea= true;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    
    
  }

  ngOnInit() {
  
    this.addressForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required]
    });

  
  
  }

  // convenience getter for easy access to form fields
  get f() { return this.addressForm.controls; }

  addAddress(){
    this.addressList.push({
      name: this.f.name.value, address : this.f.address.value
    })
    this.f.name.reset();
    this.f.name.markAsPristine();
    this.f.address.reset();
    this.f.address.markAsPristine();
  }

  deleteAddress(index:number){
    this.addressList.splice(index,1);
    if(this.addressList.length==0){
      this.enterAddressArea= true;
      this.f.name.reset();
      this.f.name.markAsPristine();
      this.f.address.reset();
      this.f.address.markAsPristine();
    }
  }
  toggleAddress(){
    this.enterAddressArea= true;
   
  }

  editAddress(index:number){
    this.f.name.setValue(this.addressList[index].name);
    this.f.address.setValue(this.addressList[index].address);
    this.enterAddressArea= true;

  }
  onSubmit() {
    this.submitted = true;
    this.enterAddressArea= false;
    // stop here if form is invalid
    if (this.addressForm.invalid) {
      return;
    }

    this.loading = true;
    // this.authenticationService.login(this.f.name.value, this.f.address.value)
    //     .pipe(first())
    //     .subscribe(
    //         data => {
    //             this.router.navigate([`/home/food`]);
    //         },
    //         error => {
    //             this.alertService.error(error);
    //             this.loading = false;
    //         });
  }

}
