import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs/operators';
import { RegisterCreds, User } from '../../types/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient)
  currentUser = signal<User | null>(null);

  baseUrl = "https://localhost:5001/api/"; 

  register(creds : RegisterCreds){
    return this.http.post<User>(this.baseUrl + "account/register" , creds).pipe(
      tap(user=>{
        if(user){
          this.setCurrentUser(user);
        }
      })
    )
  }

  login(creds : any){
    return this.http.post<User>(this.baseUrl + "account/login" , creds).pipe(
      tap(user=>{
        if(user){
          this.setCurrentUser(user);
        }
      })
    )
  }

  setCurrentUser(user: User){
    this.currentUser.set(user);
    localStorage.setItem('user' ,JSON.stringify(user))
  }

  logout(){
    localStorage.removeItem('user')
    this.currentUser.set(null);
  }
}
