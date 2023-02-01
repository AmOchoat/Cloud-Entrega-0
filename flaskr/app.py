from flaskr import create_app
from datetime import datetime
from .modelos import db, Evento, Usuario, EventoSchema, UsuarioSchema

app = create_app('default')
app_context = app.app_context()
app_context.push

db.init_app(app)


with app.app_context():
    db.create_all()
    evento_schema = EventoSchema()
    usuario_schema = UsuarioSchema()
    e = Evento(nombre='nombre',
               categoria='CURSO',
               lugar="lugar",
               direccion="direccion",
               fecha_creacion=datetime(2020, 5, 17),
               fecha_inicio=datetime(2020, 5, 17),
               fecha_fin=datetime(2020, 5, 17),
               modalidad="PRESENCIAL")
    u = Usuario(nombre_usuario="nombre usuario",
                contrasena="1234")

    u.eventos.append(e)
    db.session.add(u)
    db.session.commit()

    print([usuario_schema.dumps(usuario) for usuario in Usuario.query.all()])