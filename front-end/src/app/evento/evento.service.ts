import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from './evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private backUrl: string = "http://localhost:5000"

  constructor(private http: HttpClient) { }

  getEventos(usuario: number, token: string): Observable<Evento[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<Evento[]>(`${this.backUrl}/usuario/${usuario}/eventos`, {headers: headers})
  }

  crearEvento(idUsuario: number, token: string, evento: Evento):Observable<Evento>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<Evento>(`${this.backUrl}/usuario/${idUsuario}/eventos`, evento, {headers: headers})
  }

  getEvento(eventoId: number): Observable<Evento>{
    return this.http.get<Evento>(`${this.backUrl}/evento/${eventoId}`)
  }

  editarEvento(idUsuario: number, token: string, eventoId: number, evento: Evento): Observable<Evento>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    console.log(evento)
    return this.http.put<Evento>(`${this.backUrl}/evento/${eventoId}`, evento, {headers: headers})
  }

  eliminarEvento(idUsuario: number, token: string, eventoId: number): Observable<Evento>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.delete<Evento>(`${this.backUrl}/evento/${eventoId}`, {headers: headers})
  }

}
