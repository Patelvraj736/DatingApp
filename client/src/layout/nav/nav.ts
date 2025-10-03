import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { LoginCreds } from '../../types/user';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  protected creds = {} as LoginCreds;
  protected accountService = inject(AccountService)

  login(){
    this.accountService.login(this.creds).subscribe({
      next: result =>{
        console.log(result);
        this.creds={} as LoginCreds;
      } ,
      error: error => alert(error.message)

    })
  }

  logout(){
    this.accountService.logout();
  }

}
