import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioLoginComponent } from './usuario/usuario-login/usuario-login.component';
import { EventoListComponent } from './evento/evento-list/evento-list.component';
import { EventoCreateComponent } from './evento/evento-create/evento-create.component';
import { EventoEditComponent } from './evento/evento-edit/evento-edit.component';
import { UsuarioSignupComponent } from './usuario/usuario-signup/usuario-signup.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioLoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'signin',
    component: UsuarioLoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: UsuarioSignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'eventos/:userId/:userToken',
    component: EventoListComponent
  },
  {
    path: 'eventos/create/:userId/:userToken',
    component: EventoCreateComponent
  },
  {
    path: 'eventos/edit/:eventoId/:userId/:userToken',
    component: EventoEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
