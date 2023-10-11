import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  FeaturesConfig,
  provideDefaultConfig,
} from '@spartacus/core';
import { OpfCtaScriptsComponent } from './opf-cta-scripts.component';

@NgModule({
  declarations: [OpfCtaScriptsComponent],
  providers: [
    // provideOutlet({
    //   id: 'cx-order-overview.top',
    //   component: OpfCtaScriptsComponent,
    // }),
    provideDefaultConfig(<CmsConfig | FeaturesConfig>{
      cmsComponents: {
        OpfCtaScriptsComponent: {
          component: OpfCtaScriptsComponent,
        },
      },
    }),
  ],
  exports: [OpfCtaScriptsComponent],
  imports: [CommonModule],
})
export class OpfCtaScriptsModule {}
