import { Component, input, output, inject, OnInit, signal } from '@angular/core';
import { RegisterCreds, User } from '../../../types/user';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';
import { TextInput } from "../../../shared/text-input/text-input";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, TextInput],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  private accountService = inject(AccountService);
  private router = inject(Router)
  private fb = inject(FormBuilder);
  protected creds = {} as RegisterCreds;
  cancelRegister = output<boolean>();
  protected credentialForm: FormGroup;
  protected profileForm: FormGroup;
  protected currentStep = signal(1);
  protected validationErrors = signal<string[]>([]);


  constructor() {
    this.credentialForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      displayName: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ["", [Validators.required, this.matchValues('password')]]
    });
    this.credentialForm.controls['password'].valueChanges.subscribe(() => {
      this.credentialForm.controls['confirmPassword'].updateValueAndValidity()
    });

    this.profileForm = this.fb.group({
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = control.parent;
      if (!parent) return null;
      const matchvalue = parent.get(matchTo)?.value;
      return control.value === matchvalue ? null : { passwordsMismatch: true };

    }
  }

  nextStep() {
    if (this.credentialForm.valid) {
      this.currentStep.update(prevStep => prevStep + 1);
    }
  }

  prevStep() {
    this.currentStep.update(prevStep => prevStep - 1);
  }

  register() {

    if (this.credentialForm.valid && this.profileForm.valid) {
      const formData = { ...this.credentialForm.value, ...this.profileForm.value };
      this.accountService.register(formData).subscribe({
        next: () => {
          this.router.navigateByUrl('/members');

        },
        error: error => {
          console.log(error);
          this.validationErrors.set(error);
        },
        complete: () => console.log('Registration completed')
      });
    }

  }

  getMaxDate() {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today.toISOString().split('T')[0];
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
