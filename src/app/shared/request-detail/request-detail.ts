import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import AuthStore from '@auth/auth-store';
import { RequestEnrolled } from '@interfaces/home.interfaces';
import { StatusResponse } from '@interfaces/interfaces';
import {
  RequestVotesResponse,
  RequestVotesSavedResponse,
  UserVote,
} from '@interfaces/request.interfaces';
import Request from '@model/request.model';
import Vote from '@model/vote.model';
import { getDate } from '@osumi/tools';
import ClassMapperService from '@services/class-mapper-service';
import RequestService from '@services/request-service';
import UserPhoto from '@shared/user-photo/user-photo';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-request-detail',
  imports: [UserPhoto, ButtonModule, RippleModule, DatePickerModule, FormsModule],
  templateUrl: './request-detail.html',
  styleUrl: './request-detail.scss',
})
export default class RequestDetail implements OnInit {
  private readonly ref: DynamicDialogRef = inject(DynamicDialogRef);
  private readonly config: DynamicDialogConfig = inject(DynamicDialogConfig);
  private readonly requestService: RequestService = inject(RequestService);
  private readonly classMapperService: ClassMapperService = inject(ClassMapperService);
  private readonly authStore: AuthStore = inject(AuthStore);

  step: WritableSignal<number> = signal<number>(-1);

  request: WritableSignal<Request | null> = signal<Request | null>(null);
  enrolled: WritableSignal<RequestEnrolled[]> = signal<RequestEnrolled[]>([]);

  completedAt: WritableSignal<Date> = signal<Date>(new Date());

  votes: WritableSignal<Vote[]> = signal([]);
  votesFinished: Signal<boolean> = computed((): boolean => {
    return this.votes().every((v: Vote): boolean => v.vote !== null && v.vote !== 0);
  });

  ngOnInit(): void {
    if (this.config && this.config.data) {
      const request: Request | undefined = this.config.data['request'];
      if (request) {
        this.enrolled.set(request.enrolled);
        this.request.set(request);
        if (request.status === 0) {
          this.step.set(0);
        } else {
          this.goToVotes();
        }
      }
    }
  }

  goToClose(): void {
    this.step.set(1);
  }

  async closeRequest(): Promise<void> {
    const completedAtDate: string = getDate({
      date: new Date(),
      separator: '-',
      withHours: true,
      withSeconds: true,
      pattern: 'ymdhis',
    });
    const id: number | null | undefined = this.request()?.id;
    if (id) {
      const response: StatusResponse = await this.requestService.requestClose(id, completedAtDate);
      if (response && response.status === 'ok') {
        this.step.set(2);
      }
    }
  }

  async goToVotes(): Promise<void> {
    this.step.set(2);
    const id: number | null | undefined = this.request()?.id;
    if (id) {
      const response: RequestVotesResponse = await this.requestService.requestVotes(id);
      if (response && response.status === 'ok') {
        this.votes.set(this.classMapperService.getVotes(response.votes));
      }
    }
  }

  setVoteValue(vote: Vote, value: number): Vote {
    const newVote: Vote = new Vote().fromInterface(vote.toInterface());
    newVote.vote = value;
    return newVote;
  }

  setVote(vote: Vote, value: number): void {
    this.votes.update((votes: Vote[]): Vote[] =>
      votes.map((v: Vote): Vote => (v.id === vote.id ? this.setVoteValue(v, value) : v))
    );
  }

  async vote(): Promise<void> {
    const votes: UserVote[] = this.votes().map((v: Vote): UserVote => {
      return { id: v.id ?? 0, vote: v.vote ?? 0 };
    });
    const response: RequestVotesSavedResponse = await this.requestService.saveRequestVotes(
      this.request()?.id ?? 0,
      votes
    );
    if (response.status === 'ok') {
      this.authStore.updateUser(response.user);
      this.ref.close(response.allVoted);
    }
  }
}
