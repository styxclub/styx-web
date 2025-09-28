import { Provider } from '@angular/core';
import AuthService from '@services/auth-service';
import ClassMapperService from '@services/class-mapper-service';
import RequestService from '@services/request-service';
import UserCacheService from '@services/user-cache-service';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';

export default function provideCore(): Provider[] {
  return [
    AuthService,
    ClassMapperService,
    UserCacheService,
    RequestService,
    DialogService,
    DynamicDialogConfig,
  ];
}
