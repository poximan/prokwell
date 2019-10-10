const persistencia = require("./persistencia")
const tiempo = require("../tiempo")

// ------------------------------------
//
// ------------------------------------

let anterior

exports.comparar = (estado, id) => {

  if (anterior != estado){

    console.log((estado)? `\nexemys id${id} conectado` : `exemys id${id} desconectado`)

    tiempo.estampaTiempo((fecha) => {
      console.log("hora: " + fecha)
      persistencia.pedirTurno(estado, fecha)
    });
  }
  anterior = estado
}

exports.controlar = (propietario, valores) => {
  console.log(propietario)
  console.log(valores)
}
