const MongoClient = require("mongodb").MongoClient
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

exports.pedirTurno = (estado) => {
  estampaTiempo((fecha) => {
    turnos.push({ estado:estado, fecha:fecha })
  })
  emisor.emit('persistir')
}

estampaTiempo = (cb) => {
  let tiempo = new Date(Date.now())
  cb(new Date(tiempo - (180 * 60 * 1000)))
}

// ------------------------------------
// atendedor de boludos
// ------------------------------------

emisor.on('persistir', async() => {
  let evento = turnos.pop()
  if(evento){
    actualizarAnterior((conexion) => {
      let coleccion_obj = conexion.db("bd").collection("coleccion")
      coleccion_obj.insertOne( { ultimo: true, estado:evento.estado, fecha:evento.fecha },
        () => {
          conexion.close()
          console.log("nuevo -> guardado")
        }
      )
    })
  }
})

// esta tarea manifesto problemas de sincronizacion
actualizarAnterior = (cb) => {
  conectar( async(conexion) => {
    let coleccion_obj = conexion.db("bd").collection("coleccion")
    await coleccion_obj.updateOne(
      { ultimo: true }, { $set: { ultimo: false } },
      () => { cb(conexion); console.log("viejo -> editado"); }
    )
  })
}

/*
......... persistencia
*/
const uri = 'mongodb+srv://mongousr:mongopass@cluster0-0ooek.azure.mongodb.net/test?retryWrites=true&w=majority';

conectar = async(cb) => {
  try {
    const client = await MongoClient.connect(
      uri,{ useNewUrlParser: true, useUnifiedTopology: true }
    )
    cb(client)
  } catch(e) { console.log("err conexion"); console.error(e) }
}

//
// usr: poxi_man@yahoo.com
// contr: hugo13hugo
//
