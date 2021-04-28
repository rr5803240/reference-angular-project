import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AlertService, AuthenticationService } from '../services';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPassowordForm: FormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.forgotPassowordForm = this.formBuilder.group({
      email: ['', Validators.required]
    });

  }
  get f() { return this.forgotPassowordForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.forgotPassowordForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.validateEmail(this.f.email.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Thank you, A Password reset Link has been mailed to your Registered Email id')
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });

  }

}
