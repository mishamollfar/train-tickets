import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { MaterialModule } from '../material/material.module';
import { DasboardComponent } from './dasboard/dasboard.component';
import { NewCheckComponent } from './new-check/new-check.component';
import { LoginComponent } from './login/login.component';
import { HelpComponent } from './help/help.component';

@NgModule({
  imports: [CommonModule, MaterialModule, ComponentsModule],
  declarations: [DasboardComponent, NewCheckComponent, LoginComponent, HelpComponent],
})
export class PagesModule {}
