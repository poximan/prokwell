const MongoClient = require("mongodb").MongoClient
const assert = require('assert');
const EventEmitter = require('events');

// ------------------------------------
// turnero para sacar las persistencias
// remotas en mongo
// ------------------------------------

var turnos = []

// ------------------------------------
// emisor de boludos
// ------------------------------------

const emisor = new EventEmitter();

// ------------------------------------
// api
// ------------------------------------

exports.pedirTurno = (estado, fecha) => {
  turnos.push({
    ultimo: true,
    estado:estado,
    fecha:fecha.getTime(),
    fecha_str:fecha.toLocaleString()
  })
  emisor.emit('persistir')
}

// ------------------------------------
// atendedor de boludos
// ------------------------------------

emisor.on('persistir', () => {
  conectar(actualizarAnterior, () => {
    conectar(insertarNuevo, () => {
      console.log("oper CRUD terminada")
    })
  })
})

insertarNuevo = (db, cb) => {

  let evento = turnos.pop()
  if(evento){
    let coleccion_obj = db.collection("coleccion")
    coleccion_obj.insertOne( evento,
      () => {
        console.log("nuevo -> guardado")
        cb()
      })
  }
}

actualizarAnterior = (db, cb) => {

  let coleccion_obj = db.collection("coleccion")
  coleccion_obj.updateOne(
    { ultimo: true }, { $set: { ultimo: false } },
    () => {
      console.log("viejo -> editado")
      cb()
    } )
}

// .......................
// persistencia
// .......................

conectar = (func, cb) => {
  MongoClient.connect(
    'mongodb+srv://mongousr:mongopass@cluster0-0ooek.azure.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      const db = client.db("bd")
      func(db, () => { client.close(() => { cb() }) })
    }
  )
}

//
// usr: poxi_man@yahoo.com
// contr: hugo13hugo
//
