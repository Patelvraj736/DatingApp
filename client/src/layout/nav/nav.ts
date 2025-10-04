import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { LoginCreds } from '../../types/user';
import { Router,RouterLink,RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  protected accountService = inject(AccountService)
  protected router = inject(Router);
  private toast = inject(ToastService);

  protected creds = {} as LoginCreds;

  login(){
    this.accountService.login(this.creds).subscribe({
      next: () =>{
        this.router.navigateByUrl('/members');
        this.toast.success("Login Successful");
        this.creds={} as LoginCreds;
      } ,
      error: error => {
        this.toast.error("Invalid Email or password");
        console.log(error);
      }

    })
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
