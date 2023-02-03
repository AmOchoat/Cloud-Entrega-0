export class Usuario {
  id: number;
  nombre: string
  eventos: Array<any>

  constructor(
      id: number,
      nombre: string,
      eventos: Array<any>,
  ){
      this.id = id;
      this.nombre = nombre;
      this.eventos = eventos
  }
}
