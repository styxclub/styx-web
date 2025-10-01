import { Provider } from '@angular/core';
import AuthService from '@services/auth-service';
import ClassMapperService from '@services/class-mapper-service';
import DialogAlertService from '@services/dialog-alert-service';
import RequestService from '@services/request-service';
import UserCacheService from '@services/user-cache-service';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';

export default function provideCore(): Provider[] {
  return [
    AuthService,
    ClassMapperService,
    DialogAlertService,
    RequestService,
    UserCacheService,
    MessageService,
    DialogService,
    DynamicDialogConfig,
  ];
}
