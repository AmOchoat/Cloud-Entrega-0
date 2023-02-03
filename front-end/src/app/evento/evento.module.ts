import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EventoListComponent } from './evento-list/evento-list.component';
import { EventoDetailComponent } from './evento-detail/evento-detail.component';
import { EventoCreateComponent } from './evento-create/evento-create.component';
import { EventoEditComponent } from './evento-edit/evento-edit.component';
import { AppHeaderModule } from '../app-header/app-header.module';

@NgModule({
  declarations: [EventoListComponent, EventoDetailComponent, EventoCreateComponent, EventoEditComponent],
  imports: [
    CommonModule, ReactiveFormsModule, AppHeaderModule
  ],
  exports:[EventoListComponent, EventoDetailComponent, EventoCreateComponent, EventoEditComponent]
})
export class EventoModule { }
