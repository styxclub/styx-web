import { Provider } from '@angular/core';
import AuthService from '@services/auth-service';
import ClassMapperService from '@services/class-mapper-service';

export default function provideCore(): Provider[] {
  return [AuthService, ClassMapperService];
}
