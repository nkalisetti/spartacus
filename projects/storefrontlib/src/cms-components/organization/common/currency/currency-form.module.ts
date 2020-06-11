import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, UrlModule } from '@spartacus/core';
import { FormErrorsModule } from '../../../../shared/components/form/form-errors/form-errors.module';
import { CurrencyFormComponent } from './currency-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgSelectModule,
    UrlModule,
    I18nModule,
    ReactiveFormsModule,
    FormErrorsModule,
  ],
  declarations: [CurrencyFormComponent],
  exports: [CurrencyFormComponent],
  entryComponents: [CurrencyFormComponent],
})
export class CurrencyFormModule {}
