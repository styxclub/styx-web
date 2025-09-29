import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { StatusResponse } from '@interfaces/interfaces';
import {
  RequestVotesResponse,
  RequestVotesSavedResponse,
  UserVote,
} from '@interfaces/request.interfaces';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class RequestService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = environment.apiUrl;

  async requestClose(id: number, completedAt: string): Promise<StatusResponse> {
    return firstValueFrom(
      this.http.post<StatusResponse>(`${this.apiUrl}/request/request-close`, {
        id,
        completedAt,
      })
    );
  }

  async requestVotes(id: number): Promise<RequestVotesResponse> {
    return firstValueFrom(
      this.http.post<RequestVotesResponse>(`${this.apiUrl}/request/request-votes`, {
        id,
      })
    );
  }

  async saveRequestVotes(idRequest: number, votes: UserVote[]): Promise<RequestVotesSavedResponse> {
    return firstValueFrom(
      this.http.post<RequestVotesSavedResponse>(`${this.apiUrl}/request/save-request-votes`, {
        idRequest,
        votes,
      })
    );
  }
}
