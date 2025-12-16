import { Component, HostListener, inject, OnDestroy, OnInit, signal, ViewChild, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditableMember, Member } from '../../../types/member';
import { DatePipe } from '@angular/common';
import { MemberService } from '../../../core/services/member-service';
import { ToastService } from '../../../core/services/toast-service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-profile',
  imports: [DatePipe,FormsModule],
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
  private route = inject(ActivatedRoute);
  protected memberService = inject(MemberService);
  private toast = inject(ToastService);
  protected member = signal<Member | undefined>(undefined);
  protected editableMember : EditableMember ={
    displayName: '',
    city: '',
    country: '',
    description: ''
  }

  ngOnInit(): void {
    this.route.parent?.data.subscribe({
      next: data => {
        this.member.set(data['member']);
      }
    });
    this.editableMember ={
      displayName: this.member()?.displayName || '',
      city: this.member()?.city || '',
      country: this.member()?.country || '',
      description: this.member()?.description || ''
    }
  }

  updateProfile(){
    if(!this.member()){
      return;
    }
    const updateMember = { ...this.member(),...this.editableMember}
    console.log(updateMember);
    this.toast.success("Profile updated successfully");
    this.memberService.editMode.set(false);
  }
    ngOnDestroy(): void {
      this.memberService.editMode.set(false);
  }

}