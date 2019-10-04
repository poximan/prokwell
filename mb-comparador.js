const persistencia = require("./persistencia")

// ------------------------------------
//
// ------------------------------------

let anterior

exports.comparar = async(estado, id) => {

  if (anterior != estado){
    console.log((estado)? `exemys id${id} conectado` : `exemys id${id} desconectado`)
    console.log(new Date(Date.now()));
    await persistencia.pedirTurno(estado)
  }
  anterior = estado
}

exports.controlar = (propietario, valores) => {
  console.log(propietario)
  console.log(valores)
}
