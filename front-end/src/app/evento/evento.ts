export class Evento {

  id: number;
  nombre: string;
  categoria: Categoria;
  lugar: string;
  direccion: string;
  fecha_creacion: Date;
  fecha_inicio: Date;
  fecha_fin: Date;
  modalidad: Modalidad

  constructor(
    id: number,
    nombre: string,
    categoria: Categoria,
    lugar: string,
    direccion: string,
    fecha_creacion: Date,
    fecha_inicio: Date,
    fecha_fin: Date,
    modalidad: Modalidad
  ){
    this.id = id,
    this.nombre = nombre,
    this.categoria = categoria,
    this.lugar = lugar;
    this.direccion = direccion,
    this.fecha_creacion = fecha_creacion,
    this.fecha_inicio = fecha_inicio;
    this.fecha_fin = fecha_fin;
    this.modalidad = modalidad
  }
}


export class Categoria{
  llave: string
  valor: number

  constructor(
    llave: string,
    valor: number
  ) {
    this.llave = llave;
    this.valor = valor
  }
}

export class Modalidad{
  llave: string
  valor: number

  constructor(
    llave: string,
    valor: number
  ) {
    this.llave = llave;
    this.valor = valor
  }
}
