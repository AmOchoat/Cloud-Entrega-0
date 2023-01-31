from flaskr import create_app
from modelos.modelos import db, Evento

app = create_app('default')
app_context = app.app_context()
app_context.push

db.init_app(app)


with app.app_context():
    db.create_all()
    e = Evento(nombre='nombre',
               categoria='CURSO',
               lugar="lugar",
               direccion="direccion",
               fecha_creacion="01-01-2023",
               fecha_inicio="02-01-2023",
               fecha_fin="03-01-2023",
               modalidad="PRESENCIAL")
    db.session.add(e)
    db.session.commit()
    print(Evento.query.all())
