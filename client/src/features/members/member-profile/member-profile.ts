import { Component, HostListener, inject, OnDestroy, OnInit, signal, ViewChild, viewChild } from '@angular/core';
import { EditableMember, Member } from '../../../types/member';
import { DatePipe } from '@angular/common';
import { MemberService } from '../../../core/services/member-service';
import { ToastService } from '../../../core/services/toast-service';
import { FormsModule, NgForm } from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';
import { TimeAgoPipe } from '../../../core/pipes/time-ago-pipe';

@Component({
  selector: 'app-member-profile',
  imports: [DatePipe,FormsModule,TimeAgoPipe],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css'
})
export class MemberProfile implements OnInit ,OnDestroy {
  @ViewChild ('editForm') editForm?: NgForm;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm?.dirty) {
      $event.preventDefault();
    }
  }
  protected memberService = inject(MemberService);
  protected accountService = inject(AccountService); 
  private toast = inject(ToastService);
  protected editableMember : EditableMember ={
    displayName: '',
    city: '',
    country: '',
    description: ''
  }

  ngOnInit(): void {

    this.editableMember ={
      displayName: this.memberService.member()?.displayName || '',
      city: this.memberService.member()?.city || '',
      country: this.memberService.member()?.country || '',
      description: this.memberService.member()?.description || ''
    }
  }

  updateProfile(){
    if(!this.memberService.member()){
      return;
    }
    const updateMember = { ...this.memberService.member(),...this.editableMember}
    this.memberService.updateMember(this.editableMember).subscribe({
      next: ()=>{

            const currentUser = this.accountService.currentUser();
            if(currentUser && updateMember.displayName !== currentUser.displayName){
              currentUser.displayName = updateMember.displayName;
              this.accountService.setCurrentUser(currentUser);
            }
            this.toast.success("Profile updated successfully");
            this.memberService.editMode.set(false);
            this.memberService.member.set(updateMember as Member);
            this.editForm?.reset(updateMember);
      }
    })
  }
    ngOnDestroy(): void {
      this.memberService.editMode.set(false);
  }

}