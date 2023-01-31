from flask_sqlalchemy import SQLAlchemy
import enum

db = SQLAlchemy()

class Categoria(enum.Enum):
    CONFERENCIA = 1
    SEMINARIO = 2
    CONGRESOS = 3
    CURSO = 4

class Modalidad(enum.Enum):
    PRESENCIAL = 1
    VIRTUAL = 2

class Evento(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(128))
    categoria = db.Column(db.Enum(Categoria))
    lugar = db.Column(db.String(50))
    direccion = db.Column(db.String(50))
    fecha_creacion = db.Column(db.DateTime())
    fecha_inicio = db.Column(db.DateTime())
    fecha_fin = db.Column(db.DateTime())
    modalidad = db.Column(db.Enum(Modalidad))

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre_usuario = db.Column(db.String(50))
    contrasena = db.Column(db.String(50))

def __repr__(self):
    return "Evento: {}-{}-{}-{}-{}-{}-{}-{}-{}".format(self.nombre,
                                                       self.categoria,
                                                       self.lugar,
                                                       self.direccion,
                                                       self.fecha_creacion,
                                                       self.fecha_inicio,
                                                       self.fecha_fin,
                                                       self.modalidad)