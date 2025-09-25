import { Provider } from '@angular/core';
import AuthService from '@services/auth-service';
import ClassMapperService from '@services/class-mapper-service';
import { DialogService } from 'primeng/dynamicdialog';

export default function provideCore(): Provider[] {
  return [AuthService, ClassMapperService, DialogService];
}
