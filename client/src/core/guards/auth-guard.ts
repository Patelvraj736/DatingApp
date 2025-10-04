import { CanActivateFn } from '@angular/router';4
import { inject } from '@angular/core';
import { AccountService } from '../services/account-service';
import { ToastService } from '../services/toast-service';


export const authGuard: CanActivateFn = () => {
  const accountSerrvice = inject(AccountService);
  const toast = inject(ToastService);
  if(accountSerrvice.currentUser()) return true;

  else {
    toast.error('You must be logged in to access this page');
    return false;
  }

};
