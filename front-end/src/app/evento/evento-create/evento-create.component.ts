import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EventoService } from '../evento.service';
import { Evento, Categoria, Modalidad } from '../evento';

@Component({
  selector: 'app-evento-create',
  templateUrl: './evento-create.component.html',
  styleUrls: ['./evento-create.component.css']
})
export class EventoCreateComponent implements OnInit {

  userId: number
  token: string
  eventoForm: FormGroup
  categorias:Array<Categoria> = [
    {
      llave: "CONFERENCIA",
      valor: 1
    },
    {
      llave: "SEMINARIO",
      valor: 2
    },
    {
      llave: "CONGRESOS",
      valor: 3
    },
    {
      llave: "CURSO",
      valor: 4
    }
  ]
  medios:Array<Modalidad> = [
    {
      llave: "PRESENCIAL",
      valor: 1
    },
    {
      llave: "VIRTUAL",
      valor: 2
    }
  ]

  constructor(
    private eventoService: EventoService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private routerPath: Router
    ) { }


  ngOnInit() {
    if(!parseInt(this.router.snapshot.params['userId']) || this.router.snapshot.params['userToken'] === " "){
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else{
      this.userId = parseInt(this.router.snapshot.params['userId'])
      this.token = this.router.snapshot.params['userToken']
      this.eventoForm = this.formBuilder.group({
        nombre: ["", [Validators.required]],
        categoria: ["", [Validators.required]],
        lugar: ["", [Validators.required]],
        direccion: ["", [Validators.required]],
        fecha_creacion: ["", [Validators.required]],
        fecha_inicio: ["", [Validators.required]],
        fecha_fin: ["", [Validators.required]],
        modalidad: ["", [Validators.required]]
      })
    }
  }

  showError(error: string){
    this.toastr.error(error, "Error")
  }

  showWarning(warning: string){
    this.toastr.warning(warning, "Error de autenticación")
  }

  showSuccess(evento: Evento) {
    this.toastr.success(`El evento ${evento.nombre} fue creado`, "Creación exitosa");
  }

  cancelCreate(){
    this.eventoForm.reset()
    this.routerPath.navigate([`/eventos/${this.userId}/${this.token}`])
  }

  createEvento(newevento: Evento){
    this.eventoForm.get('anio')?.setValue(parseInt(this.eventoForm.get('anio')?.value))
    this.eventoService.crearEvento(this.userId, this.token, newevento)
    .subscribe(evento => {
      this.showSuccess(evento)
      this.eventoForm.reset()
      this.routerPath.navigate([`/eventos/${this.userId}/${this.token}`])
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
  }

}
