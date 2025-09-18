import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { BoardResponse } from '@interfaces/home.interfaces';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class HomePageService {
  private http: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = environment.apiUrl;

  async getHome(page: number = 0, limit: number = 20): Promise<BoardResponse> {
    const url = `${this.apiUrl}/home/get-home`;
    return await firstValueFrom(this.http.post<BoardResponse>(url, { page, limit }));
  }
}
