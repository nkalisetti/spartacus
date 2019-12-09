import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { Config, ConfigModule } from '../config/config.module';
import { defaultGlobalMessageConfigFactory } from './config/default-global-message-config';
import { GlobalMessageConfig } from './config/global-message-config';
import { GlobalMessageService } from './facade/global-message.service';
import {
  errorHandlers,
  httpErrorInterceptors,
} from './http-interceptors/index';
import { GlobalMessageEffect } from './store/effects/global-message.effect';
import { GlobalMessageStoreModule } from './store/global-message-store.module';

@NgModule({
  imports: [
    GlobalMessageStoreModule,
    EffectsModule.forFeature([GlobalMessageEffect]),
    ConfigModule.withConfigFactory(defaultGlobalMessageConfigFactory),
  ],
  providers: [
    GlobalMessageService,
    { provide: GlobalMessageConfig, useExisting: Config },
  ],
})
export class GlobalMessageModule {
  static forRoot(): ModuleWithProviders<GlobalMessageModule> {
    return {
      ngModule: GlobalMessageModule,
      providers: [...errorHandlers, ...httpErrorInterceptors],
    };
  }
}
