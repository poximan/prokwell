const MongoClient = require("mongodb").MongoClient

var turnos = []

exports.pedirTurno = (estado) => {
  turnos.push(estado)
  persistir()
}

persistir = async () => {

  let estado = turnos.pop()

  if(estado){
    await actualizarAnterior((conexion) => {
      conexion.close()
    })
    guardarNuevo(estado, (conexion) => {
      conexion.close()
    })
  }
}

actualizarAnterior = (cb) => {

  conectar(async(conexion) => {
    let coleccion_obj = conexion.db("bd").collection("coleccion")
    await coleccion_obj.updateOne(
      { ultimo: true },
      { $set: { ultimo: false } }
    )
    cb(conexion)
  })
}

guardarNuevo = (estado, cb) => {

  conectar(async(conexion) => {
    let coleccion_obj = conexion.db("bd").collection("coleccion")
    await coleccion_obj.insertOne(
      { ultimo: true, fecha: new Date(Date.now()), estado: estado }
    )
    cb(conexion)
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
  } catch(e) { console.error(e) }
}

//
// mongodb
// 	usr: poxi_man@yahoo.com
// 	contr: hugo13hugo
//
// conex bd
// 	usr: mongousr
// 	contr: mongopass
//
