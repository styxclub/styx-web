import { Injectable } from '@angular/core';
import User from '@model/user.model';

@Injectable({
  providedIn: 'root',
})
export default class UserCacheService {
  private cache: Record<number, User> = {};

  getUser(userId: number): User | undefined {
    return this.cache[userId];
  }

  addUser(user: User): void {
    if (user.id !== null) {
      this.cache[user.id] = user;
    }
  }
}
