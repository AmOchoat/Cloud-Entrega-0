import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Evento, Categoria, Modalidad } from '../evento';
import { EventoService } from '../evento.service';

@Component({
  selector: 'app-evento-edit',
  templateUrl: './evento-edit.component.html',
  styleUrls: ['./evento-edit.component.css']
})
export class EventoEditComponent implements OnInit {

  userId: number;
  token: string;
  eventoId: number;
  eventoForm!: FormGroup;
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
    private routerPath: Router) { }

  ngOnInit() {
    if(!parseInt(this.router.snapshot.params['userId']) || this.router.snapshot.params['userToken'] === " "){
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else{
      this.eventoService.getEvento(parseInt(this.router.snapshot.params['eventoId']))
      .subscribe(evento => {
        this.eventoId = evento.id
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
      })
      this.userId = parseInt(this.router.snapshot.params['userId'])
      this.token = this.router.snapshot.params['userToken']
    }
  }

  cancelCreate(){
    this.eventoForm.reset()
    this.routerPath.navigate([`/eventos/${this.userId}/${this.token}`])
  }

  editarEvento(newEvento: Evento){
    console.log(newEvento)
    this.eventoService.editarEvento(this.userId, this.token, this.eventoId, newEvento)
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


  showError(error: string){
    this.toastr.error(error, "Error")
  }

  showWarning(warning: string){
    this.toastr.warning(warning, "Error de autenticación")
  }

  showSuccess(evento: Evento) {
    this.toastr.success(`El evento ${evento.nombre} fue editado`, "Edición exitosa");
  }

}
