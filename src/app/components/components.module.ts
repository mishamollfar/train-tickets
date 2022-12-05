import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';
import { NamePageComponent } from './name-page/name-page.component';
import { MonitoringListComponent } from './monitoring-list/monitoring-list.component';
import { UserButtonComponent } from './user-button/user-button.component';
import { MonitoringItemComponent } from './monitoring-item/monitoring-item.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { LineOkComponent } from './line-ok/line-ok.component';
import { WorkStateComponent } from './work-state/work-state.component';
import { FooterCopyrightBlockComponent } from './footer-copyright-block/footer-copyright-block.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
  ],
  declarations: [
    TopToolbarComponent,
    NamePageComponent,
    MonitoringListComponent,
    UserButtonComponent,
    MonitoringItemComponent,
    TimePickerComponent,
    LineOkComponent,
    WorkStateComponent,
    FooterCopyrightBlockComponent,
  ],
  exports: [
    TopToolbarComponent,
    NamePageComponent,
    MonitoringListComponent,
    UserButtonComponent,
    MonitoringItemComponent,
    TimePickerComponent,
    LineOkComponent,
    WorkStateComponent,
    FooterCopyrightBlockComponent,
  ],
})
export class ComponentsModule {}
