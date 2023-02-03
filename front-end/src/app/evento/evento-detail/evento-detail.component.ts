import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Evento } from '../evento';

@Component({
  selector: 'app-evento-detail',
  templateUrl: './evento-detail.component.html',
  styleUrls: ['./evento-detail.component.css']
})
export class EventoDetailComponent implements OnInit {

  @Input() evento: Evento;
  @Output() deleteEvento = new EventEmitter();

  userId: number;
  token: string;

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.userId = parseInt(this.router.snapshot.params['userId'])
    this.token = this.router.snapshot.params['userToken']
  }

  goToEdit(){
    this.routerPath.navigate([`/eventos/edit/${this.evento.id}/${this.userId}/${this.token}`])
  }

  eliminarEvento(){
    this.deleteEvento.emit(this.evento.id)
  }

}
