import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { Evento } from '../evento';
import { EventoService } from '../evento.service';

@Component({
  selector: 'app-evento-list',
  templateUrl: './evento-list.component.html',
  styleUrls: ['./evento-list.component.css']
})
export class EventoListComponent implements OnInit {

  constructor(
    private eventoService: EventoService,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private routerPath: Router
  ) { }

  userId: number
  token: string
  eventos: Array<Evento>
  mostrarEventos: Array<Evento>
  eventoSeleccionado: Evento
  indiceSeleccionado: number

  ngOnInit() {
    if(!parseInt(this.router.snapshot.params['userId']) || this.router.snapshot.params['userToken'] === " "){
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else{
      this.userId = parseInt(this.router.snapshot.params['userId'])
      this.token = this.router.snapshot.params['userToken']
      this.getEventos();
    }
  }

  getEventos():void{
    this.eventoService.getEventos(this.userId, this.token)
    .subscribe(eventos => {
      this.eventos = eventos
      this.mostrarEventos = eventos
      if(eventos.length>0){
        this.onSelect(this.mostrarEventos[0], 0)
      }
    },
    error => {
      console.log(error)
      if(error.statusText === "UNAUTHORIZED"){
        this.showWarning("Su sesión ha caducado, por favor vuelva a iniciar sesión.")
      }
      else if(error.statusText === "UNPROCESSABLE ENTITY"){
        this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
      }
      else{
        this.showError("Ha ocurrido un error. " + error.message)
      }
    })

  }

  onSelect(a: Evento, index: number){
    this.indiceSeleccionado = index
    this.eventoSeleccionado = a
    this.eventoService.getEvento(a.id)
    .subscribe(evento => {
      this.eventoSeleccionado.nombre = evento.nombre
      this.eventoSeleccionado.fecha_inicio = evento.fecha_inicio
      this.eventoSeleccionado.fecha_fin = evento.fecha_fin
    },
    error =>{
      this.showError("Ha ocurrido un error, " + error.message)
    })
  }


  buscarEvento(busqueda: string){
    let eventosBusqueda: Array<Evento> = []
    this.eventos.map( albu => {
      if( albu.nombre.toLocaleLowerCase().includes(busqueda.toLowerCase())){
        eventosBusqueda.push(albu)
      }
    })
    this.mostrarEventos = eventosBusqueda
  }

  irCrearEvento(){
    this.routerPath.navigate([`/eventos/create/${this.userId}/${this.token}`])
  }

  eliminarEvento(){
    this.eventoService.eliminarEvento(this.userId, this.token, this.eventoSeleccionado.id)
    .subscribe(evento => {
      this.ngOnInit();
      this.showSuccess();
    },
    error=> {
      if(error.statusText === "UNAUTHORIZED"){
        this.showWarning("Su sesión ha caducado, por favor vuelva a iniciar sesión.")
      }
      else if(error.statusText === "UNPROCESSABLE ENTITY"){
        this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
      }
      else{
        this.showError("Ha ocurrido un error. " + error.message)
      }
    })
    this.ngOnInit()
  }

  showError(error: string){
    this.toastr.error(error, "Error de autenticación")
  }

  showWarning(warning: string){
    this.toastr.warning(warning, "Error de autenticación")
  }

  showSuccess() {
    this.toastr.success(`El evento fue eliminado`, "Eliminado exitosamente");
  }
}
